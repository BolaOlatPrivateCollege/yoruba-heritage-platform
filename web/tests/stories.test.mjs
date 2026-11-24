import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import {stories,sources,Story,Paragraph,validateEditorial,paragraphsFor,storyText,wordCount,storyWordCount,readingMinutes,journeys,journeyStep} from '../src/lib/stories.ts';
import {archive} from '../src/lib/archive.ts';
import {digest,loadPreservedArchive} from '../../scripts/preservation.mjs';
const dist=resolve('dist');
const html=id=>load(readFileSync(resolve(dist,'stories',id,'index.html'),'utf8'));
const audit=JSON.parse(readFileSync('../docs/editorial/001f-article-audit.json','utf8'));
const media=JSON.parse(readFileSync('src/data/story-media.json','utf8'));
const walk=dir=>readdirSync(dir).flatMap(n=>{const p=join(dir,n);return statSync(p).isDirectory()?walk(p):[p];});

test('four distinct editorial stories resolve each factual paragraph to inspected bounded evidence',()=>{
  assert.equal(stories.length,4);assert.equal(sources.length,25);
  assert.equal(new Set(stories.map(s=>s.id)).size,4);
  validateEditorial(stories,sources);
  assert.equal(digest(archive),'89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2');
  assert.equal(digest(archive),digest(loadPreservedArchive()));
  for(const story of stories){
    assert.equal(story.reviewStatus,'unreviewed');assert.equal(story.rightsStatus,'unknown');assert.equal(story.publicationApproval,'not-granted');
    assert.ok(story.sections.length>=5&&story.sections.length<=8);
    for(const p of paragraphsFor(story))if(p.kind!=='editorial-reflection'){
      assert.ok(p.citations.length);for(const c of p.citations){const s=sources.find(s=>s.id===c.sourceId);assert.ok(s.passages.some(p=>p.id===c.passageId));assert.equal(s.accessStatus,'inspected-passages');assert.equal(s.johnsonStatus,'bounded-scope-examined');}
    }
  }
});

test('editorial schema and reference gates reject uncited facts, unsafe URLs, unknown passages and dependencies',()=>{
  const p=structuredClone(stories[0].opening);p.citations=[];assert.equal(Paragraph.safeParse(p).success,false);
  const s=structuredClone(stories[0]);delete s.reviewStatus;assert.equal(Story.safeParse(s).success,false);
  for(const mutate of [
    set=>{set[0].opening.citations[0].sourceId='missing';},
    set=>{set[0].opening.citations[0].passageId='missing';},
    set=>{set[0].archiveLinks[0].section=999;},
    set=>{set[0].next='missing';},
    set=>{set[0].sections[0].id='opening';},
    set=>{set[0].illustration='https://external.invalid/image.svg';},
  ]){const set=structuredClone(stories);mutate(set);assert.throws(()=>validateEditorial(set,sources));}
  const unchecked=structuredClone(sources);unchecked[0].johnsonStatus='unchecked';assert.throws(()=>validateEditorial(stories,unchecked),/Unchecked/);
  const unsafe=structuredClone(sources);unsafe[0].url='javascript:alert(1)';assert.throws(()=>validateEditorial(stories,unsafe));
  const excluded=structuredClone(sources);excluded[0].publisher='Samuel Johnson';assert.throws(()=>validateEditorial(stories,excluded),/Excluded/);
});

test('honest reading times match substantial rendered editorial prose with deterministic counting',()=>{
  for(const s of stories){
    const text=storyText(s);assert.equal(storyWordCount(s),wordCount(text));assert.ok(storyWordCount(s)>=850,'Substantive draft, not placeholder');
    const $=html(s.id);assert.equal(Number($('.story-reading-meta').attr('data-word-count')),storyWordCount(s));
    assert.match($('.story-reading-meta').text(),new RegExp(`about ${readingMinutes(storyWordCount(s))} min read`));
  }
  assert.equal(readingMinutes(0),1);assert.equal(readingMinutes(200),1);assert.equal(readingMinutes(201),2);
  for(const n of [-1,1.5,NaN,Infinity,'200'])assert.throws(()=>readingMinutes(n));
});

test('all four static story outputs preserve exact Unicode prose, source anchors, evidence distinctions and fallbacks',()=>{
  for(const s of stories){const $=html(s.id);
    assert.equal($('h1').text(),s.title);assert.match($('.draft-banner').text(),/Editorial research draft · not reviewed for public release/);
    for(const p of paragraphsFor(s)){
      assert.equal($(`[id="${p.id}"] .story-prose`).text(),p.text,p.id);
      assert.equal($(`[id="${p.id}"]`).attr('data-evidence-kind'),p.kind);
      for(const c of p.citations){const id=`evidence-${c.sourceId}-${c.passageId}`;assert.equal($(`[id="${id}"]`).length,1);assert.equal($(`[id="${p.id}"] a[href="#${id}"]`).length,1);}
    }
    for(const id of ['look-closely','tradition-evidence','questions-open','voices-needed','key-terms','original-archive','read-evidence'])assert.equal($(`[id="${id}"]`).length,1);
    assert.equal($('main form,main input,main iframe,main audio,main video').length,0);
    assert.equal($('main [hidden]').length,0);
    for(const link of s.archiveLinks)assert.equal($(`a[href="/articles/${link.id}/#section-${link.section}"]`).length,1);
    assert.ok($('[lang="yo"]').length>=2);
  }
});

test('113-record audit covers every canonical record, section, source and trace without invented region or rights',()=>{
  assert.equal(audit.records.length,113);assert.equal(audit.summary.remainingAfterFourPilotTopics,109);
  assert.deepEqual(audit.records.map(r=>r.id).sort(),archive.articles.map(a=>a.id).sort());
  for(const r of audit.records){const a=archive.articles.find(a=>a.id===r.id);
    assert.equal(r.canonicalRecordSha256,digest(a));assert.equal(r.estimatedProseWords,wordCount(a.sections.map(s=>s.p).join(' ')));
    assert.equal(r.sectionCount,a.sections.length);assert.equal(r.sectionAudit.length,a.sections.length);
    assert.equal(r.rights,'unknown');assert.equal(r.reviewStatus,'unreviewed');assert.equal(r.explicitRegions,'unknown');
    assert.equal(r.communityTestimony.authenticatedTranscriptPresent,false);assert.ok(r.topicRecommendation.length>65);
    for(const ref of r.recommendationReferences){assert.equal(ref.articleId,r.id);assert.ok(a.sections[ref.section-1]);assert.deepEqual(ref.sourceIds,a.sections[ref.section-1].sourceIds);}
    for(const source of r.sourceRecords){assert.ok(archive.sources.some(s=>s.id===source.id));assert.equal(source.accessVerifiedThisTask,false);assert.equal(source.rights,'unknown');}
    assert.equal(Object.keys(r.priorityFactors).length,6);
  }
  assert.equal(audit.summary.under250Words,77);assert.equal(audit.summary.medianProseWords,216);
  assert.ok(audit.scope.includes('Not 113 independently fact-checked'));
});

test('machine and human audits reproduce byte-for-byte and remain internal repository artefacts',()=>{
  execFileSync(process.execPath,['scripts/editorial-audit.mjs','--check'],{cwd:resolve('..'),stdio:'pipe'});
  const md=readFileSync('../docs/editorial/001f-article-audit.md','utf8');
  for(const a of archive.articles)assert.ok(md.includes(a.id));
  const originalHome=readFileSync('../docs/editorial/001e-home-reference.astro.txt');
  const blob=createHash('sha1').update(`blob ${originalHome.length}\0`).update(originalHome).digest('hex');
  assert.equal(blob,'c8f6fcb0e404fb3b66b1c97449a2b1e6a9e41fb5','Exact original homepage retained as internal reference');
  for(const file of walk(dist))assert.doesNotMatch(file.replaceAll('\\','/'),/001f-article-audit|editorial-notes\.json/);
});

test('journeys contain actual distinct readings, useful introductions and valid next-reading links',()=>{
  assert.equal(journeys.length,4);
  for(const j of journeys){assert.equal(j.steps.length,5);assert.ok(j.intro.length>50);assert.equal(new Set(j.steps.map(s=>s.kind+s.id)).size,5);
    for(const step of j.steps){const r=journeyStep(step);assert.ok(r.title);assert.ok(r.minutes>0);assert.ok(existsSync(resolve(dist,'.'+r.href,'index.html')));assert.ok(step.why.length>30);}
  }
  for(const story of stories){const $=html(story.id);assert.equal($(`.story-next a[href="/stories/${story.next}/"]`).length,1);}
  const research=load(readFileSync(resolve(dist,'research','index.html'),'utf8'));assert.equal(research('.story-card').length,4);assert.equal(research('.reader-journey').length,4);
  const home=load(readFileSync(resolve(dist,'index.html'),'utf8'));assert.equal(home('.story-card').length,0);assert.equal(home('.reader-journey').length,0);
});

test('original illustration provenance, hashes, local image sources and explicit non-documentary captions remain intact',()=>{
  assert.equal(media.length,5);
  for(const m of media){const bytes=readFileSync(m.path);assert.equal(createHash('sha256').update(bytes).digest('hex'),m.sha256);assert.equal(m.documentary,false);assert.equal(m.externalMediaCopied,false);assert.equal(m.publicationApproval,'not-granted');
    if(m.path.endsWith('.svg'))assert.doesNotMatch(bytes.toString('utf8'),/<script|<foreignObject|<image|onload=|href=["']https?:/i);
  }
  for(const s of stories){const $=html(s.id);assert.match($('.story-diagram figcaption').text(),/not a historic object/);
    $('main img').each((_,el)=>{const src=$(el).attr('src');assert.ok(src.startsWith('/'));assert.ok(existsSync(resolve(dist,'.'+src)));assert.ok($(el).attr('alt').length>35);assert.ok(Number($(el).attr('width'))>0);assert.ok(Number($(el).attr('height'))>0);});
  }
  const $=html('adire-indigo-design');assert.ok($('.editorial-image img').attr('src').endsWith('.webp'));assert.match($('.editorial-image figcaption').text(),/AI-generated/);
});

test('story rendering escapes hostile text through Astro and introduces no HTML sink or client-side archive',()=>{
  const component=readFileSync('src/components/StoryParagraph.astro','utf8');assert.ok(component.includes('{p.text}'));assert.doesNotMatch(component,/set:html|innerHTML|is:inline/);
  for(const path of ['src/lib/stories.ts','src/pages/stories/index.astro','src/pages/stories/[id].astro','src/components/StoryCards.astro','src/components/ReaderJourneys.astro']){
    const text=readFileSync(path,'utf8');assert.doesNotMatch(text,/set:html|innerHTML|localStorage|sessionStorage|fetch\(|XMLHttpRequest|client:load|client:visible/);
  }
  for(const s of stories){const $=html(s.id);assert.doesNotMatch($.html(),/supplementarySourceText|canonicalRecordSha256|authenticatedTranscriptPresent|ADMIN_PASSWORD|YORUBA_DB_PATH/);}
});

test('explicit story display theme text maintains calculated contrast and text alternatives for all figures',()=>{
  const css=readFileSync('src/styles/site.css','utf8');
  const lum=hex=>{const c=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
  const value=name=>css.match(new RegExp('--'+name+':#([0-9a-f]{6})'))[1];
  for(const [fg,bg] of [['cream','panel2'],['muted','panel'],['bronze','panel'],['cream','ink']]){const x=lum(value(fg)),y=lum(value(bg));assert.ok((Math.max(x,y)+.05)/(Math.min(x,y)+.05)>=4.5);}
  for(const s of stories)assert.ok(s.illustrationAlt.length>70);
});
