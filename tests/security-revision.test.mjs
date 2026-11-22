import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT, MANIFEST, sha256, readManifest, revisedFiles, securityRevision, sourceFiles, makeManifest } from '../scripts/preservation.mjs';
import { loadArchive } from '../scripts/load-archive.mjs';

test('SEC-01 is an exact, separate server-only revision of the immutable baseline',()=>{
  const baseline=readManifest(),r=securityRevision();
  assert.equal(sha256(readFileSync(MANIFEST)),r.baselineSha256);
  const original=baseline.files.find(f=>f.path==='server.py');
  assert.equal(original.sha256,r.changes[0].oldSha256);
  assert.equal(sha256(readFileSync(resolve(ROOT,'server.py'))),r.changes[0].newSha256);
  assert.deepEqual(sourceFiles(),revisedFiles(baseline));
  assert.equal(baseline.archiveSha256,'89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2');
  assert.throws(()=>makeManifest(loadArchive(ROOT)),/security revisions stay separate/);
});
for(const [name,mutate] of Object.entries({
  'content exception':r=>{r.changes[0].path='content.js';},
  'additional exception':r=>{r.changes.push({...r.changes[0]});},
  'bad parent hash':r=>{r.changes[0].oldSha256='0'.repeat(64);},
  'changed baseline':r=>{r.baselineSha256='0'.repeat(64);},
  'changed archive':r=>{r.archiveSha256='0'.repeat(64);},
  'unknown revision':r=>{r.revision='unreviewed-v2';},
  'unversioned new server hash':r=>{r.changes[0].newSha256='1'.repeat(64);},
  'original vulnerable bytes':r=>{r.changes[0].newSha256=r.changes[0].oldSha256;},
}))test(`security revision refuses ${name}`,()=>{
  const r=securityRevision();mutate(r);assert.throws(()=>revisedFiles(readManifest(),r));
});
