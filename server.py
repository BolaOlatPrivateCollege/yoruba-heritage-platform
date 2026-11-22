#!/usr/bin/env python3
"""Àṣà & Ìtàn community server. Python 3.10+, no third-party packages.

Local/start-up deployment only: for public exposure, use a TLS reverse proxy,
strong ADMIN_PASSWORD and a production security and privacy review. All public
community contributions are moderated. Uploaded files are NOT accepted.
"""
import base64
import hmac
import hashlib
import html
import json
import os
import secrets
import sqlite3
import sys
import time
import urllib.parse
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT=Path(__file__).resolve().parent
DATA=Path(os.getenv('YORUBA_DB_PATH',str(ROOT/'private_data'/'community.sqlite3'))).resolve()
PASSWORD=os.getenv('ADMIN_PASSWORD','')
PORT=int(os.getenv('PORT','8765'))
HOST=os.getenv('HOST','127.0.0.1')
SALT=os.getenv('RATE_LIMIT_SALT') or secrets.token_hex(24)
MAX_BODY=12000

SCHEMA='''
CREATE TABLE IF NOT EXISTS threads (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 author_name TEXT NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL,
 category TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending',
 created_at TEXT NOT NULL, reviewed_at TEXT);
CREATE TABLE IF NOT EXISTS comments (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 author_name TEXT NOT NULL, body TEXT NOT NULL, source_url TEXT,
 target_type TEXT NOT NULL, target_id TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending', created_at TEXT NOT NULL, reviewed_at TEXT);
CREATE TABLE IF NOT EXISTS submissions (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 author_name TEXT NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL,
 community TEXT NOT NULL, source_type TEXT NOT NULL, source_url TEXT, contact TEXT,
 consent INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'pending',
 created_at TEXT NOT NULL, reviewed_at TEXT);
CREATE TABLE IF NOT EXISTS limits (
 id INTEGER PRIMARY KEY AUTOINCREMENT, ip_hash TEXT, action TEXT, created_at INTEGER);
CREATE INDEX IF NOT EXISTS idx_threads_status ON threads(status,created_at);
CREATE INDEX IF NOT EXISTS idx_comments_target ON comments(target_type,target_id,status);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status,created_at);
CREATE INDEX IF NOT EXISTS idx_limits ON limits(ip_hash,action,created_at);
'''

def connect():
    DATA.parent.mkdir(parents=True,exist_ok=True)
    db=sqlite3.connect(DATA,timeout=10)
    db.row_factory=sqlite3.Row
    db.execute('PRAGMA journal_mode=WAL')
    db.execute('PRAGMA busy_timeout=10000')
    return db

def init():
    with connect() as db:db.executescript(SCHEMA)

def now():return datetime.now(timezone.utc).isoformat(timespec='seconds')

def value(obj,key,maxlen,required=False,minlen=0):
    s=obj.get(key,'')
    if not isinstance(s,str):raise ValueError(f'{key} must be text')
    s=s.strip()
    if (required and not s) or len(s)<minlen:raise ValueError(f'{key} is required or too short')
    if len(s)>maxlen:raise ValueError(f'{key} exceeds length limit')
    if any(ord(c)<32 and c not in '\n\r\t' for c in s):raise ValueError(f'{key} contains invalid characters')
    return s

def valid_url(s):
    if not s:return ''
    u=urllib.parse.urlparse(s)
    if u.scheme not in ('http','https') or not u.netloc:raise ValueError('Use a valid http(s) source URL')
    return s

class Handler(SimpleHTTPRequestHandler):
    server_version='YorubaHeritage/1.0'
    def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
    def log_message(self,fmt,*args):
        # No user-post content in access logs; only route, method, status.
        super().log_message(fmt,*args)
    def end_headers(self):
        self.send_header('X-Content-Type-Options','nosniff')
        self.send_header('X-Frame-Options','DENY')
        self.send_header('Referrer-Policy','strict-origin-when-cross-origin')
        self.send_header('Content-Security-Policy',"default-src 'self' https: data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'")
        self.send_header('Cache-Control','no-store' if self.path.startswith('/api') or self.path.startswith('/admin') else 'max-age=120')
        super().end_headers()
    def reply(self,status,payload):
        body=json.dumps(payload,ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type','application/json; charset=utf-8')
        self.send_header('Content-Length',str(len(body)))
        self.end_headers();self.wfile.write(body)
    def page(self,status,body,auth=False):
        b=body.encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type','text/html; charset=utf-8')
        self.send_header('Content-Length',str(len(b)))
        if auth:self.send_header('WWW-Authenticate','Basic realm="Yoruba Heritage Editors"')
        self.end_headers();self.wfile.write(b)
    def authenticated(self):
        if not PASSWORD:return False
        auth=self.headers.get('Authorization','')
        if not auth.startswith('Basic '):return False
        try:
            user,pwd=base64.b64decode(auth.split(' ',1)[1],validate=True).decode('utf-8').split(':',1)
            return hmac.compare_digest(user,'editor') and hmac.compare_digest(pwd,PASSWORD)
        except (ValueError,UnicodeError,Exception):return False
    def admin_guard(self):
        if not PASSWORD:
            self.page(503,'<!doctype html><meta charset="utf-8"><h1>Admin dashboard is disabled</h1><p>Set ADMIN_PASSWORD in your server environment, restart the server, then open /admin.</p>')
            return False
        if not self.authenticated():
            self.page(401,'<!doctype html><meta charset="utf-8"><h1>Editor authentication required</h1><p>Username: editor. Use the ADMIN_PASSWORD configured on this server.</p>',True)
            return False
        return True
    def same_origin(self):
        # Browsers send Origin or Referer for form POST. Reject cross-site browser posts.
        host=self.headers.get('Host','')
        if not host:return False
        origin=self.headers.get('Origin','') or self.headers.get('Referer','')
        if origin:
            try:return urllib.parse.urlparse(origin).netloc==host
            except ValueError:return False
        return True  # Allows non-browser API clients; site rate limits still apply.
    def body_json(self):
        if 'application/json' not in self.headers.get('Content-Type',''):raise ValueError('JSON request required')
        try:n=int(self.headers.get('Content-Length','0'))
        except ValueError:raise ValueError('Invalid content length')
        if n<=0 or n>MAX_BODY:raise ValueError('Payload is empty or too large')
        data=json.loads(self.rfile.read(n))
        if not isinstance(data,dict):raise ValueError('JSON object required')
        if data.get('website'):raise ValueError('Spam field detected')
        return data
    def rate(self,db,action,count,window=3600):
        ip=self.client_address[0]
        # Salted short-lived pseudonymous server-side hash, no raw IP storage.
        ip_hash=hashlib.sha256((SALT+ip).encode()).hexdigest()
        stamp=int(time.time())
        db.execute('DELETE FROM limits WHERE created_at<?',(stamp-2*86400,))
        used=db.execute('SELECT COUNT(*) FROM limits WHERE ip_hash=? AND action=? AND created_at>?',(ip_hash,action,stamp-window)).fetchone()[0]
        if used>=count:return False
        db.execute('INSERT INTO limits(ip_hash,action,created_at) VALUES(?,?,?)',(ip_hash,action,stamp))
        return True
    def do_GET(self):
        path=urllib.parse.urlparse(self.path).path
        query=urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        if path=='/api/health':return self.reply(200,{'service':'yoruba-community','status':'moderated','version':1})
        if path=='/api/threads':
            with connect() as db:
                items=[dict(r) for r in db.execute("SELECT id,author_name,title,body,category,created_at FROM threads WHERE status='approved' ORDER BY created_at DESC,id DESC LIMIT 100")]
            return self.reply(200,{'items':items})
        if path.startswith('/api/threads/'):
            try:key=int(path.rsplit('/',1)[-1])
            except ValueError:return self.reply(404,{'error':'Discussion not found'})
            with connect() as db:r=db.execute("SELECT id,author_name,title,body,category,created_at FROM threads WHERE id=? AND status='approved'",(key,)).fetchone()
            if not r:return self.reply(404,{'error':'Discussion is not published'})
            return self.reply(200,{'item':dict(r)})
        if path=='/api/comments':
            aid=query.get('article_id',[''])[0];tid=query.get('thread_id',[''])[0]
            if bool(aid)==bool(tid):return self.reply(400,{'error':'Choose article_id or thread_id'})
            k='article' if aid else 'thread';target=aid if aid else tid
            if len(target)>130:return self.reply(400,{'error':'Invalid target'})
            with connect() as db:
                rows=[dict(r) for r in db.execute("SELECT id,author_name,body,source_url,created_at FROM comments WHERE target_type=? AND target_id=? AND status='approved' ORDER BY id ASC LIMIT 200",(k,target))]
            return self.reply(200,{'items':rows})
        if path=='/admin' or path=='/admin/':
            if not self.admin_guard():return
            return self.render_admin()
        if path.startswith('/api/') or path.startswith('/admin/'):
            return self.reply(404,{'error':'Not found'})
        if path in ('/server.py','/knowledge.js.map','/private_data') or path.startswith('/private_data/') or path.endswith('.sqlite3') or path.endswith('-wal') or path.endswith('-shm') or path.endswith('.py'):
            return self.send_error(404,'Not found')
        return super().do_GET()
    def do_POST(self):
        path=urllib.parse.urlparse(self.path).path
        if not self.same_origin():return self.reply(403,{'error':'Cross-origin request blocked'})
        if path=='/admin/moderate':
            if not self.admin_guard():return
            try:
                n=int(self.headers.get('Content-Length','0'))
                if n<=0 or n>1024:raise ValueError('Invalid form')
                d=urllib.parse.parse_qs(self.rfile.read(n).decode())
                kind=d.get('kind',[''])[0];key=int(d.get('id',[''])[0]);action=d.get('action',[''])[0]
                if kind not in ('threads','comments','submissions') or action not in ('approved','rejected','pending'):raise ValueError('Bad moderation action')
                with connect() as db:db.execute(f"UPDATE {kind} SET status=?,reviewed_at=? WHERE id=?",(action,now(),key))
                self.send_response(303);self.send_header('Location','/admin');self.send_header('Content-Length','0');self.end_headers()
            except (ValueError,UnicodeError):self.reply(400,{'error':'Invalid moderation request'})
            return
        if path not in ('/api/threads','/api/comments','/api/submissions'):return self.reply(404,{'error':'Not found'})
        try:
            d=self.body_json();when=now()
            with connect() as db:
                if path=='/api/threads':
                    name=value(d,'author_name',90,True);title=value(d,'title',160,True,minlen=8);body=value(d,'body',4000,True,minlen=30);category=value(d,'category',60,True)
                    if category not in ('History','Language','Religion & Belief','Oral testimony','Education','Technology','Arts & Culture','Marriage & Society','Corrections'):raise ValueError('Unknown category')
                    if not self.rate(db,'threads',3,3600):return self.reply(429,{'error':'Too many submissions. Try again later.'})
                    db.execute('INSERT INTO threads(author_name,title,body,category,created_at) VALUES(?,?,?,?,?)',(name,title,body,category,when))
                elif path=='/api/comments':
                    name=value(d,'author_name',90,True);body=value(d,'body',2000,True,minlen=15);url=valid_url(value(d,'source_url',700))
                    kind=value(d,'target_type',10,True);target=value(d,'target_id',130,True)
                    if kind not in ('thread','article'):raise ValueError('Invalid target')
                    if kind=='article' and not target.startswith(('know-','ile-','oyo','wars','faith','atlantic','how-','heritage','language','arts','life','trade','people','schools','women','colonial','diaspora','religion','identity','devotion')):
                        # All article ids are bounded by known client content; prevent arbitrary publication targets.
                        if len(target)>70:raise ValueError('Invalid article')
                    if kind=='thread' and (not target.isdecimal() or not db.execute("SELECT 1 FROM threads WHERE id=? AND status='approved'",(int(target),)).fetchone()):raise ValueError('Discussion unavailable')
                    if not self.rate(db,'comments',10,3600):return self.reply(429,{'error':'Comment rate limit reached'})
                    db.execute('INSERT INTO comments(author_name,body,source_url,target_type,target_id,created_at) VALUES(?,?,?,?,?,?)',(name,body,url,kind,target,when))
                else:
                    name=value(d,'author_name',90,True);title=value(d,'title',160,True,minlen=8);body=value(d,'body',9000,True,minlen=60);community=value(d,'community',130,True);stype=value(d,'source_type',80,True);url=valid_url(value(d,'source_url',700));contact=value(d,'contact',200)
                    if not d.get('consent'):raise ValueError('Contributor permission must be confirmed')
                    if contact and ('@' not in contact or '\n' in contact):raise ValueError('Invalid contact email')
                    if not self.rate(db,'submissions',5,86400):return self.reply(429,{'error':'Submission limit reached today'})
                    db.execute('INSERT INTO submissions(author_name,title,body,community,source_type,source_url,contact,consent,created_at) VALUES(?,?,?,?,?,?,?,?,?)',(name,title,body,community,stype,url,contact,1,when))
            return self.reply(202,{'status':'pending','message':'Received for editorial review; not publicly visible'})
        except (ValueError,json.JSONDecodeError) as exc:return self.reply(400,{'error':str(exc)})
        except sqlite3.Error:return self.reply(500,{'error':'Database error'})
    def render_admin(self):
        esc=lambda x:html.escape(str(x or ''),quote=True)
        parts=[]
        with connect() as db:
            for kind in ('submissions','threads','comments'):
                rows=db.execute(f"SELECT * FROM {kind} WHERE status='pending' ORDER BY id DESC LIMIT 100").fetchall()
                parts.append(f'<h2>{esc(kind.title())} awaiting review <span class="number">{len(rows)}</span></h2>')
                if not rows:parts.append('<p class="empty">Nothing awaiting review.</p>')
                for r in rows:
                    id=r['id'];data=dict(r)
                    title=data.get('title') or ('Comment on '+str(data.get('target_type'))+': '+str(data.get('target_id')))
                    meta=' · '.join([data.get('author_name',''),data.get('community',''),data.get('category',''),data.get('source_type',''),data.get('created_at','')])
                    content=esc(data.get('body',''))
                    links=esc(data.get('source_url',''))
                    contact=esc(data.get('contact',''))
                    buttons=''.join(f'<button type="submit" name="action" value="{action}" class="{action}">{action.title()}</button>' for action in ('approved','rejected'))
                    parts.append(f'<article class="review"><small>{esc(meta)}</small><h3>{esc(title)}</h3><p>{content}</p>{f"<p>Source: {links}</p>" if links else ""}{f"<p>Private editorial contact: {contact}</p>" if contact else ""}<form method="post" action="/admin/moderate"><input type="hidden" name="kind" value="{kind}"><input type="hidden" name="id" value="{id}">{buttons}</form></article>')
        page='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Yoruba heritage · moderation</title><style>body{background:#0d1d21;color:#f4ead7;font:15px/1.6 system-ui;padding:25px;max-width:1050px;margin:auto}h1{font:45px Georgia}h2{margin:50px 0 18px;color:#f1c995}.number{color:#fff;font:16px system-ui}.review{padding:24px;background:#172a2c;border:1px solid #49605a;margin:14px 0;overflow-wrap:anywhere}.review small{color:#c5aa84}.review h3{font:26px Georgia;margin:10px 0}.review p{white-space:pre-wrap}.review form{display:flex;gap:12px}.review button{border:none;border-radius:3px;padding:11px 20px;font-weight:700;cursor:pointer}.approved{background:#a5e2bf}.rejected{background:#ecaf9d}.empty{color:#aab7b0}.warning{background:#483529;padding:14px}a{color:#f1c995}</style><h1>Editorial moderation</h1><p>Only approved discussions and comments appear publicly. Source submissions are stored for editorial review and are <b>not automatically published</b>, even when approved.</p><p class="warning">Respect contributor consent, privacy and custodianship. Approval only marks content as suitable for further consideration; it does not certify historical truth.</p>'''+''.join(parts)+'</html>'
        return self.page(200,page)

def main():
    init()
    if not PASSWORD:print('WARNING: ADMIN_PASSWORD not set; admin moderation dashboard disabled.',file=sys.stderr)
    print(f'Yoruba heritage site: http://{HOST}:{PORT}/')
    print(f'Editor dashboard: http://{HOST}:{PORT}/admin')
    print('Keep this address behind HTTPS and an appropriate security layer for public use.')
    server=ThreadingHTTPServer((HOST,PORT),Handler)
    try:server.serve_forever()
    except KeyboardInterrupt:pass
    finally:server.server_close()
if __name__=='__main__':main()
