"""SEC-01: real HTTP on 127.0.0.1:0, synthetic files, no database access."""
import http.client
import io
import importlib.util
import os
from pathlib import Path
import re
import socket
import tempfile
import threading
import unittest
from unittest.mock import patch

REPO=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('pilot',REPO/'server.py')
pilot=importlib.util.module_from_spec(spec)
spec.loader.exec_module(pilot)

class FileServingTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp=tempfile.TemporaryDirectory(prefix='sec01-')
        cls.root=Path(cls.temp.name)/'public'
        cls.root.mkdir()
        cls.payloads={}
        for name,_ in pilot.PUBLIC_FILES.values():
            p=cls.root/name;p.parent.mkdir(parents=True,exist_ok=True)
            payload=('Synthetic public fixture: '+name+'\n').encode()
            p.write_bytes(payload);cls.payloads[name]=payload
        cls.sentinel=b'SYNTHETIC_PRIVATE_SENTINEL_NEVER_PUBLIC'
        for name in ['server.py','.env','.git/config','private_data/community.sqlite3',
                     'private_data/community.sqlite3-wal','generated/archive/archive.json',
                     'preservation/baseline.json','docs/SECRET.md','backup.sqlite3.bak',
                     'assets/unapproved.svg']:
            p=cls.root/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(cls.sentinel)
        cls.outside=Path(cls.temp.name)/'outside';cls.outside.mkdir()
        (cls.outside/'app.js').write_bytes(cls.sentinel)
        (cls.outside/'favicon.svg').write_bytes(cls.sentinel)
        cls.root_patch=patch.object(pilot,'ROOT',cls.root);cls.root_patch.start()
        cls.db_patch=patch.object(pilot,'connect',side_effect=AssertionError('No database access allowed'));cls.db_patch.start()
        cls.memory=os.getenv('SEC01_TEST_TRANSPORT')=='memory'
        if cls.memory and os.getenv('CI'):raise RuntimeError('CI must exercise real loopback HTTP')
        if not cls.memory:
            cls.http=pilot.ThreadingHTTPServer(('127.0.0.1',0),pilot.Handler)
            cls.thread=threading.Thread(target=cls.http.serve_forever,daemon=True);cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        if not cls.memory:
            cls.http.shutdown();cls.http.server_close();cls.thread.join(timeout=5)
        cls.db_patch.stop();cls.root_patch.stop();cls.temp.cleanup()

    def request(self,method,target,headers=''):
        request=f'{method} {target} HTTP/1.0\r\nHost: localhost\r\n{headers}\r\n'.encode('ascii')
        class MemorySocket:
            def __init__(self,raw):self.input=io.BytesIO(raw);self.output=io.BytesIO()
            def makefile(self,*args,**kwargs):return self.input
            def sendall(self,data):self.output.write(data)
        if self.memory:
            connection=MemorySocket(request)
            pilot.Handler(connection,('127.0.0.1',12345),object())
            raw=connection.output.getvalue()
        else:
            with socket.create_connection(self.http.server_address,timeout=5) as sock:
                sock.sendall(request);raw=b''
                while chunk:=sock.recv(65536):raw+=chunk
        if method=='HEAD':self.assertEqual(raw.partition(b'\r\n\r\n')[2],b'')
        response=http.client.HTTPResponse(MemorySocket(raw),method=method);response.begin()
        result=(response.status,dict(response.getheaders()),response.read())
        response.close();return result

    def deny_both(self,target):
        for method in ('GET','HEAD'):
            with self.subTest(method=method,target=target):
                status,headers,body=self.request(method,target)
                self.assertEqual(status,404)
                self.assertNotIn(self.sentinel,body)
                if method=='HEAD':self.assertEqual(body,b'')

    def test_every_allowed_asset_get_head_parity(self):
        for path,(name,mime) in pilot.PUBLIC_FILES.items():
            with self.subTest(path=path):
                get=self.request('GET',path);head=self.request('HEAD',path)
                self.assertEqual(get[0],200);self.assertEqual(head[0],200)
                self.assertEqual(get[2],self.payloads[name]);self.assertEqual(head[2],b'')
                for field in ['Content-Type','Content-Length','X-Content-Type-Options','X-Frame-Options','Content-Security-Policy']:
                    self.assertEqual(get[1][field],head[1][field])
                self.assertEqual(get[1]['Content-Type'],mime)

    def test_legacy_shell_assets_all_explicitly_allowlisted(self):
        shell=(REPO/'index.html').read_text(encoding='utf8')
        refs=re.findall(r'(?:src|href)="([^"#]+)"',shell)
        for ref in refs:
            if '://' not in ref:self.assertIn('/'+ref,pilot.PUBLIC_FILES)

    def test_private_and_nonallowlisted_files(self):
        for path in ['/server.py','/.env','/.git/config','/.github/workflows/quality.yml',
                     '/private_data','/private_data/','/private_data/community.sqlite3',
                     '/private_data/community.sqlite3-wal','/private_data/community.sqlite3-shm',
                     '/backup.sqlite3.bak','/server.py~','/package.json',
                     '/preservation/baseline.json','/generated/archive/archive.json',
                     '/docs/SECRET.md','/assets/unapproved.svg','/assets','/assets/']:
            self.deny_both(path)

    def test_encoded_paths_and_mixed_escape_case(self):
        for path in ['/%73erver%2epy','/%73erver%2Epy','/%70rivate_data/community.sqlite%33',
                     '/%69ndex.html','/%2569ndex.html','/%2e%2e/server.py',
                     '/assets%2ffavicon.svg','/assets%2Ffavicon.svg','/index.html%00',
                     '/%u0069ndex.html','/index.html%','/index.html%ZZ']:
            self.deny_both(path)

    def test_traversal_and_noncanonical_targets(self):
        for path in ['/../server.py','/assets/../../server.py','/./index.html',
                     '/assets/../index.html','//index.html','/assets//favicon.svg',
                     '/assets\\favicon.svg','/index.html:stream','/index.html/extra',
                     '/INDEX.HTML','/index.html;anything','/index.html#fragment',
                     'http://localhost/index.html','/index.html\x00']:
            self.deny_both(path)

    def test_query_is_not_a_filesystem_path(self):
        for method in ('GET','HEAD'):
            self.assertEqual(self.request(method,'/index.html?v=%2e%2e')[0],200)
        self.deny_both('/server.py?name=index.html')

    def test_health_and_admin_head_use_same_dispatch(self):
        get=self.request('GET','/api/health');head=self.request('HEAD','/api/health')
        self.assertEqual(get[0],200);self.assertEqual(head[0],200)
        self.assertEqual(get[1]['Content-Length'],head[1]['Content-Length'])
        self.assertEqual(head[2],b'')
        with patch.object(pilot,'PASSWORD','synthetic-test-only'):
            for method in ('GET','HEAD'):
                status,headers,body=self.request(method,'/admin')
                self.assertEqual(status,401);self.assertIn('WWW-Authenticate',headers)
                if method=='HEAD':self.assertEqual(body,b'')
        self.deny_both('/api/%68ealth')

    def test_post_cannot_bypass_path_gate(self):
        self.assertEqual(self.request('POST','/%73erver%2epy')[0],404)

    def test_missing_and_directory_in_allowed_location(self):
        p=self.root/'app.js';saved=p.read_bytes();p.unlink()
        try:
            self.deny_both('/app.js');p.mkdir();self.deny_both('/app.js');p.rmdir()
        finally:p.write_bytes(saved)

    def test_symlink_file_inside_and_outside_root(self):
        p=self.root/'app.js';saved=p.read_bytes();p.unlink()
        try:
            for target in [self.outside/'app.js',self.root/'index.html']:
                try:p.symlink_to(target)
                except OSError as exc:
                    if os.getenv('CI'):raise
                    self.skipTest(f'Symlink creation unavailable: {exc.errno}')
                try:self.deny_both('/app.js')
                finally:p.unlink()
        finally:p.write_bytes(saved)

    def test_symlink_parent_directory_escape(self):
        assets=self.root/'assets';saved=self.root/'assets-saved';assets.rename(saved)
        try:
            try:assets.symlink_to(self.outside,target_is_directory=True)
            except OSError as exc:
                if os.getenv('CI'):raise
                self.skipTest(f'Symlink creation unavailable: {exc.errno}')
            self.deny_both('/assets/favicon.svg')
        finally:
            if assets.is_symlink():assets.unlink()
            saved.rename(assets)

    @unittest.skipUnless(os.name=='posix','POSIX no-follow FIFO case')
    def test_fifo_is_not_a_public_regular_file(self):
        p=self.root/'app.js';saved=p.read_bytes();p.unlink()
        try:os.mkfifo(p);self.deny_both('/app.js')
        finally:p.unlink();p.write_bytes(saved)

    def test_main_rejects_public_bind_before_database_or_listener(self):
        with patch.object(pilot,'HOST','0.0.0.0'),patch.object(pilot,'init') as init:
            with self.assertRaises(ValueError):pilot.main()
            init.assert_not_called()

if __name__=='__main__':unittest.main()
