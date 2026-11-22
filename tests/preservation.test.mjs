import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { loadArchive } from '../scripts/load-archive.mjs';
import { importDocument, writeImport } from '../scripts/import-archive.mjs';
import { ROOT, canonical, digest, readManifest, describeArchive, verifyArchive, verifyFiles, loadPreservedArchive } from '../scripts/preservation.mjs';

const manifest = readManifest();
const copy = () => JSON.parse(canonical(loadArchive(ROOT)));
test('full archive round-trip preserves every field, ordered record and exact string', () => {
  const legacy = copy();
  const imported = JSON.parse(canonical(importDocument()));
  assert.deepEqual(imported.archive, legacy);
  for (const [path,text] of Object.entries(imported.supplementarySourceText)) assert.equal(text,readFileSync(join(ROOT,path),'utf8'));
  for (const [key, value] of Object.entries(legacy)) {
    assert.equal(digest(imported.archive[key]), digest(value), key);
    if (Array.isArray(value)) {
      assert.deepEqual(imported.archive[key].map(x => x?.id ?? null), value.map(x => x?.id ?? null), `${key} ordered ID set`);
      value.forEach((record, i) => assert.equal(digest(imported.archive[key][i]), manifest.collections[key].records[i].sha256));
    }
  }
  assert.deepEqual(imported.reviewDefaults, {claimsVerification:'unreviewed',rights:'unknown',publicationApproval:'not-granted'});
});
test('exact learning and study inventories are frozen from the real baseline', () => {
  const expected = { articles:113, sources:128, communityVoices:6, sacredProfiles:24,
    timeline:24, places:11, people:12, glossary:30, quiz:15, deepTracks:10,
    oduMainNames:16, pronunciationEntries:15, knowledgeCategories:12, knowledgeChapters:95,
    sacredArticles:24, deepHeritageArticles:16, nameOriginArticles:2, researchAuthorArticles:3, categories:29 };
  const a = loadPreservedArchive();
  for (const [key, count] of Object.entries(expected)) assert.equal(a[key].length, count, key);
  assert.deepEqual(Object.keys(a).sort(), Object.keys(manifest.collections).sort());
});
test('serialization is deterministic, object-key order independent, Unicode-sensitive', () => {
  assert.equal(canonical({b:1,a:'ọ'}), canonical({a:'ọ',b:1}));
  assert.notEqual(digest('ọ'), digest('ọ'.normalize('NFD')));
  assert.notEqual(digest('Àṣà'), digest('Asa'));
  assert.throws(() => canonical({missing:undefined}), /lossy/);
});
test('import CLI writes reproducible UTF-8 and refuses altered output', () => {
  const path = writeImport(), first = readFileSync(path);
  writeImport(); assert.deepEqual(readFileSync(path), first);
  assert.deepEqual(JSON.parse(first).archive, copy());
  // Test the refusal with a temporary changed generated artifact, then restore bytes.
  try {writeFileSync(path, '{}'); assert.throws(writeImport, /Existing import differs/);}
  finally {writeFileSync(path, first);}
  const p = spawnSync(process.execPath, ['scripts/import-archive.mjs', '--source', 'private_data'], {cwd:ROOT});
  assert.notEqual(p.status, 0);
});

const mutations = {
  'wording edited': a => {a.articles[0].sections[0].p += ' changed';},
  'tone marks normalized': a => {const x=a.articles.find(x=>x.title!==x.title.normalize('NFD')); x.title=x.title.normalize('NFD');},
  'underdot removed': a => {const x=a.articles.find(x=>/[ẹọṣ]/.test(x.title)); x.title=x.title.replace(/ọ/g,'o').replace(/ẹ/g,'e').replace(/ṣ/g,'s');},
  'whitespace trimmed': a => {a.articles[0].sections[0].p += ' ';},
  'sections shuffled': a => {a.articles[0].sections.reverse();},
  'field dropped': a => {delete a.articles[0].evidenceNote;},
  'field added': a => {a.articles[0].rights = 'approved';},
  'duplicate ID': a => {a.articles[1].id = a.articles[0].id;},
  'ID replaced at same count': a => {a.articles[0].id = 'replacement';},
  'dangling section source': a => {a.articles[0].sections[0].sourceIds.push('missing');},
  'link overwritten': a => {a.sources[0].url += '#changed';},
  'record dropped': a => {a.communityVoices.pop();},
  'learning record edited': a => {a.quiz[0].why += ' changed';},
  'pathway dangling': a => {a.deepTracks[0].ids.push('missing');},
  'profile relation dangling': a => {a.sacredProfiles[0].articleId = 'missing';},
  'scalar metadata changed': a => {a.review = 'verified';},
  'excluded authority added': a => {a.sources[0].institution = 'Samuel Johnson';},
};
for (const [label, mutate] of Object.entries(mutations)) test(`fails closed: ${label}`, () => {
  const a = copy(); mutate(a); assert.throws(() => verifyArchive(a, manifest));
});
test('protected bytes are checked before any altered module can execute', () => {
  const dir = mkdtempSync(join(tmpdir(), 'heritage-hash-'));
  try {writeFileSync(join(dir,'content.js'), 'throw new Error("untrusted")'); assert.throws(() => verifyFiles(manifest,dir));}
  finally {rmSync(dir,{recursive:true,force:true});}
});
test('all relationships validate independent of the frozen hash', () => {
  const a=copy(); a.articles[0].sections[0].sourceIds=['not-registered'];
  assert.throws(() => describeArchive(a), /Dangling sourceIds/);
});
test('private/generated paths ignored; legitimate archive artifacts remain eligible', () => {
  const dir=mkdtempSync(join(tmpdir(),'heritage-ignore-'));
  try {
    assert.equal(spawnSync('git',['init','--quiet',dir]).status,0);
    writeFileSync(join(dir,'.gitignore'),readFileSync(join(ROOT,'.gitignore')));
    const ignored=['private_data/community.sqlite3','web/.env.local','.env','snapshot.sqlite3-wal','backups/snapshot.zip','generated/archive/archive.json','node_modules/a.js','__pycache__/server.pyc','web/dist/index.html'];
    const allowed=['content.js','assets/archive/source.pdf','assets/archive/source.zip','preservation/baseline.json','docs/BASELINE.md'];
    for (const p of ignored) assert.equal(spawnSync('git',['check-ignore','--no-index',p],{cwd:dir}).status,0,p);
    for (const p of allowed) assert.equal(spawnSync('git',['check-ignore','--no-index',p],{cwd:dir}).status,1,p);
  } finally {rmSync(dir,{recursive:true,force:true});}
});
