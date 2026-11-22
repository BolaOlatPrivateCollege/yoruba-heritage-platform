import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadArchive } from '../scripts/load-archive.mjs';

const archive = loadArchive();
const knownSources = new Set(archive.sources.map(x => x.id));
const knownArticles = new Set(archive.articles.map(x => x.id));
const requiredFiles = ['index.html','app.js','styles.css','content.js','knowledge.js','extended-sacred-arts.js','sacred-atlas.js','sacred-atlas-ui.js','community.js','deep-heritage.js','names-etymology.js','deep-heritage-ui.js','research-authors.js','server.py','EDITORIAL_POLICY.md','AGENTS.md'];

function checkSourceLinks(ids, label) {
  for (const sourceId of ids || []) assert.ok(knownSources.has(sourceId), `${label}: unknown source ${sourceId}`);
}

test('preserves the complete signed-off 2026-11-22 source baseline', () => {
  assert.equal(archive.articles.length, 113, '110 signed-off baseline chapters plus three author dossiers must be preserved');
  assert.equal(archive.sources.length, 128, '113 signed-off baseline source records plus 15 critically catalogued author references');
  assert.equal(archive.communityVoices.length, 6, 'six community history records must be preserved');
  assert.equal(archive.timeline.length, 24);
  assert.equal(archive.places.length, 11);
  assert.equal(archive.people.length, 12);
  assert.equal(archive.quiz.length, 15);
});

test('source and article IDs are non-empty and unique', () => {
  assert.equal(knownSources.size, archive.sources.length);
  assert.equal(knownArticles.size, archive.articles.length);
  for (const s of archive.sources) assert.ok(typeof s.id === 'string' && s.id.length > 0);
  for (const a of archive.articles) assert.ok(typeof a.id === 'string' && a.id.length > 0);
});

test('every article and community history points to registered source records', () => {
  for (const article of archive.articles) {
    assert.ok(article.title && article.deck && article.sections?.length, `${article.id}: incomplete article`);
    assert.ok(article.evidenceType && article.evidenceNote, `${article.id}: evidence metadata missing`);
    assert.ok(article.sourceIds?.length, `${article.id}: source metadata missing`);
    checkSourceLinks(article.sourceIds, article.id);
    for (const section of article.sections) {
      assert.ok(section.h && section.p, `${article.id}: incomplete section`);
      assert.ok(section.sourceIds?.length, `${article.id} / ${section.h}: unsourced section`);
      checkSourceLinks(section.sourceIds, `${article.id} / ${section.h}`);
    }
  }
  for (const voice of archive.communityVoices) {
    assert.ok(voice.community && voice.status, `${voice.id}: provenance incomplete`);
    checkSourceLinks(voice.sourceIds, voice.id);
  }
});

test('sources are secure HTTP references and no excluded authored works are cited', () => {
  for (const source of archive.sources) {
    assert.match(source.url, /^https:\/\//, `${source.id}: expected HTTPS reference`);
    // The phrase can appear in the documented editorial policy; this gate only
    // prohibits a bibliographic record by the expressly excluded author.
    assert.doesNotMatch(`${source.institution} ${source.title}`, /(?:samuel\s+johnson|johnson[,\s]+samuel)/i, `excluded author in ${source.id}`);
  }
});

test('timeline, atlas and figure links remain resolvable', () => {
  for (const item of archive.timeline) checkSourceLinks([item.source], item.title);
  for (const place of archive.places) if (place.article) assert.ok(knownArticles.has(place.article), `place ${place.id}: broken article`);
  for (const person of archive.people) if (person.article) assert.ok(knownArticles.has(person.article), `person ${person.name}: broken article`);
});

test('Yoruba orthography remains present in canonical data', () => {
  const combined = archive.articles.map(a => `${a.title} ${a.deck}`).join(' ');
  for (const symbol of ['ọ', 'ẹ', 'ṣ']) assert.ok(combined.includes(symbol), `canonical Unicode letter ${symbol} disappeared`);
  assert.ok(archive.articles.some(a => a.title.includes('Yorùbá')));
});

test('quiz answers are in bounds and legacy entry points remain present', () => {
  for (const q of archive.quiz) {
    assert.ok(q.q && q.why && q.a?.length >= 2);
    assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.a.length, `invalid answer for ${q.q}`);
  }
  for (const p of requiredFiles) assert.ok(existsSync(resolve(p)), `missing legacy file ${p}`);
  const entry = readFileSync(resolve('index.html'),'utf8');
  for (const moduleName of ['content.js','knowledge.js','extended-sacred-arts.js','sacred-atlas.js','sacred-atlas-ui.js','community.js','app.js']) assert.ok(entry.includes(moduleName), `entry point missing ${moduleName}`);
});

test('Sacred World taxonomy and corrections are transparent and navigable', () => {
  assert.equal(archive.sacredProfiles.length, 24);
  assert.equal(archive.sacredArticles.length, 24);
  const kinds = new Set(archive.sacredProfiles.map(x => x.kind));
  for (const kind of ['Supreme source','Òrìṣà','Regional òrìṣà','Spiritual concept','Ancestral tradition']) assert.ok(kinds.has(kind));
  for (const p of archive.sacredProfiles) {
    assert.ok(p.name && p.scope && p.confidence && p.misconceptions.length && p.communityNeeded);
    assert.ok(knownArticles.has(p.articleId));
    checkSourceLinks(p.sourceIds, p.name);
    const a=archive.articles.find(x=>x.id===p.articleId);
    assert.equal(a.sections.length, 7, p.name);
    assert.ok(a.sections.some(s=>/Misconception/i.test(s.h)));
    assert.ok(a.sections.every(s=>s.p.length > 75), `short unverified section in ${p.name}`);
  }
  const esu=archive.sacredProfiles.find(x=>x.id==='sac-esu');
  assert.ok(esu.misconceptions[0].includes('Èṣù is Satan'));
  assert.ok(esu.misconceptions[0].includes('CORRECTION:'));
  assert.ok(archive.sacredProfiles.find(x=>x.id==='sac-olodumare').kind === 'Supreme source');
  const page=readFileSync(resolve('index.html'),'utf8');
  assert.ok(page.includes('href="#sacred"'));
  assert.ok(readFileSync(resolve('app.js'),'utf8').includes("case 'sacred'"));
});


test('all requested deep-research disciplines are integrated with working source links', () => {
  assert.equal(archive.deepHeritageArticles.length, 16);
  assert.equal(archive.nameOriginArticles.length, 2);
  const expected = [
    'myths-origins','myths-storytelling','pronunciation','faith-connections',
    'islam-history','christianity-history','ghost-dna','cave-ashes',
    'ifa-tradition','ifa-odu-binary','geez','political-system',
    'names-morphology','eleye-mothers','obatala-deep','modern-spiritual-world',
    'name-olodumare','name-orisa'
  ];
  for (const item of expected) assert.ok(knownArticles.has(`deep-${item}`), `missing study deep-${item}`);
  for (const article of [...archive.deepHeritageArticles,...archive.nameOriginArticles]) {
    assert.ok(article.sections.length >= 4, `${article.id} has insufficient development`);
    assert.ok(article.evidenceNote && article.sourceIds.length, `${article.id} requires evidence limits`);
    checkSourceLinks(article.sourceIds, article.title);
  }
  assert.equal(archive.deepTracks.length, 10);
  assert.ok(archive.deepTracks.flatMap(x => x.ids).every(id=>knownArticles.has(id)));
  const html = readFileSync(resolve('index.html'),'utf8');
  for (const file of ['deep-heritage.js','names-etymology.js','research-authors.js','deep-heritage-ui.js']) assert.ok(html.includes(`src="${file}"`));
  assert.ok(html.includes('href="#research"'));
  assert.match(readFileSync(resolve('app.js'),'utf8'), /case 'research'/);
});

test('the 256 Odù grid is explicitly illustrative and audibly honest',()=>{
  assert.equal(archive.oduMainNames.length, 16);
  assert.equal(new Set(archive.oduMainNames).size,16);
  assert.equal(archive.oduMainNames.length ** 2,256);
  assert.ok(archive.pronunciationEntries.length >= 12);
  const ui=readFileSync(resolve('deep-heritage-ui.js'),'utf8');
  assert.match(ui, /not an authenticated ordering|illustrative only/i);
  assert.match(ui, /Native recording pending/);
  assert.match(ui, /approved===true/);
  assert.match(ui, /coerll\.utexas\.edu/);
});

test('the sacred name studies distinguish linguistic hypotheses from secure meaning',()=>{
  const one=archive.nameOriginArticles.find(a=>a.id==='deep-name-olodumare');
  const two=archive.nameOriginArticles.find(a=>a.id==='deep-name-orisa');
  assert.equal(one.sections.length,9);
  assert.equal(two.sections.length,9);
  assert.match(one.sections.map(x=>x.p).join(' '),/Bamgbose/);
  assert.match(two.sections.map(x=>x.p).join(' '),/folk interpretation|folk analysis/i);
  assert.match(one.evidenceNote,/not established/i);
  assert.match(two.evidenceNote,/not established/i);
});


test('three author dossiers are integrated with source-critical book notes',()=>{
  assert.equal(archive.researchAuthorArticles.length,3);
  for(const article of archive.researchAuthorArticles){
    assert.ok(article.sections.length >=5);
    checkSourceLinks(article.sourceIds,article.id);
    for(const section of article.sections)checkSourceLinks(section.sourceIds,`${article.id} ${section.h}`);
  }
  const sophie=archive.researchAuthorArticles.find(a=>a.id==='author-sophie-oluwole');
  assert.match(sophie.sections.map(s=>s.p).join(' '),/Samuel Johnson/);
  assert.match(sophie.sections.map(s=>s.p).join(' '),/not settled|not independently|not automatically/i);
  assert.ok(archive.sources.find(s=>s.id==='authors-abi-cv'));
  assert.ok(archive.sources.find(s=>s.id==='authors-eleb-obatala'));
  assert.ok(readFileSync(resolve('index.html'),'utf8').includes('src="research-authors.js"'));
  assert.ok(readFileSync(resolve('deep-heritage-ui.js'),'utf8').includes('D.researchAuthorArticles'));
});
