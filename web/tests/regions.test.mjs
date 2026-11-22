import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import {regions,RegionalStory,RegionalSource,validateRegions,regionalCitations,regionalParagraphs,regionalWordCount,evidenceGroups,privateRegionalStories,places} from '../src/lib/regions.ts';
import {regionalSources} from '../src/data/regional-content.ts';
import {archive} from '../src/lib/archive.ts';
import {stories} from '../src/lib/stories.ts';
import {digest} from '../../scripts/preservation.mjs';
const clone=()=>structuredClone(regions[0]);
const html=route=>load(readFileSync(resolve('dist',route,'index.html'),'utf8'));
const walk=dir=>readdirSync(dir).flatMap(n=>{const p=join(dir,n);return statSync(p).isDirectory()?walk(p):[p];});

test('one substantive bounded regional draft resolves every factual passage and versioned source',()=>{
  assert.equal(regions.length,1);assert.equal(regionalSources.length,6);validateRegions(regions,regionalSources);
  for(const p of regionalParagraphs(regions[0]))assert.equal(p.citations.length>0,p.kind!=='editorial-reflection');
  assert.ok(regionalWordCount(regions[0])>=900);assert.ok(regionalWordCount(regions[0])<1600);
  for(const c of regionalCitations(regions[0]))assert.ok(regionalSources.some(s=>s.id===c.sourceId&&s.passageId===c.passageId));
});
test('regional schema rejects missing citations, unsafe sources and mismatched local scope',()=>{
  for(const mutate of [s=>s.opening.citations=[],s=>s.placeId='ibadan',s=>s.archiveLinks[0].section=999,s=>s.next.href='https://external.invalid',s=>s.sections[0].id=s.opening.id,s=>s.opening.citations[0].passageId='missing']){const s=clone();mutate(s);assert.throws(()=>validateRegions([s],regionalSources));}
  const sources=structuredClone(regionalSources);sources[0].url='javascript:alert(1)';assert.equal(RegionalSource.safeParse(sources[0]).success,false);assert.throws(()=>validateRegions(regions,sources));
  sources[0].url=regionalSources[0].url;sources[0].author='Samuel Johnson';assert.throws(()=>validateRegions(regions,sources),/Excluded/);
  sources[0].author=regionalSources[0].author;sources[0].dependencyStatus='unchecked';assert.throws(()=>validateRegions(regions,sources),/Unchecked/);
});
test('related reports and repeated parliamentary records are not counted independent by website',()=>{
  assert.equal(evidenceGroups(regions[0]).size,3);assert.equal(regionalSources.filter(s=>s.group==='colonial-parliamentary-record').length,3);
  assert.equal(regionalSources.find(s=>s.id==='region-abba').group,regionalSources.find(s=>s.id==='region-byfield-report').group);
  assert.match(regions[0].sections.find(s=>s.id==='future').paragraphs[1].text,/cannot be counted as two independent/);
});
test('private release, unknown rights, sensitive flags and withdrawal gates fail closed',()=>{
  for(const mutate of [s=>s.rights='unknown',s=>s.safety='pending',s=>s.sensitiveFlags=['identifying-allegation'],s=>s.withdrawal={date:'2026-11-22',reason:'Synthetic withdrawal fixture'}]){const s=clone();mutate(s);assert.equal(RegionalStory.safeParse(s).success,false);assert.equal(privateRegionalStories([s]).length,0);s.release='internal';assert.equal(RegionalStory.safeParse(s).success,true);}
  const s=clone();s.release='withdrawn';assert.equal(RegionalStory.safeParse(s).success,false);s.withdrawal={date:s.updated,reason:'Test only'};assert.equal(privateRegionalStories([RegionalStory.parse(s)]).length,0);
  s.release='published';assert.equal(RegionalStory.safeParse(s).success,false);
});
test('all original 113 article bodies, bibliography and archive hash remain unchanged',()=>{
  assert.equal(digest(archive),'89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2');
  for(const a of archive.articles){const $=html('articles/'+a.id);assert.deepEqual($('.canonical-body').map((_,e)=>$(e).text()).get(),a.sections.map(s=>s.p));assert.deepEqual($('.bibliography li>a').map((_,e)=>$(e).attr('href')).get(),a.sourceIds.map(id=>`/sources/${id}/`));}
});
test('four earlier stories and both corrected Task 001G modules remain intact',()=>{
  assert.equal(stories.length,4);for(const s of stories)assert.equal(html('stories/'+s.id)('[data-story]').attr('data-story'),s.id);
  assert.equal(html('articles/ile-ife')('.context-category>h3').text(),'Unresolved object interpretations');assert.equal(html('articles/know-adire')('.context-category>h3').text(),'Museum-mediated reports');
  for(const route of ['', 'stories'])assert.equal(html(route)('a.places-discovery-link[href="/places/"]').length,1);
});
test('original conceptual media bytes, captions and safe local image paths are traceable',()=>{
  const media=JSON.parse(readFileSync('src/data/regional-media.json','utf8'));assert.equal(media.length,1);const m=media[0],bytes=readFileSync(m.path);assert.equal(bytes.length,m.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),m.sha256);assert.equal(m.documentary,false);assert.equal(m.externalMediaCopied,false);assert.equal(m.publicRelease,'not-granted');assert.doesNotMatch(bytes.toString(),/<script|foreignObject|(?:href|src)=["']https?:|onload=/i);
  for(const route of ['places','places/'+regions[0].id]){const $=html(route);assert.equal($('main img').length,1);assert.match($('main img').attr('alt'),/[Cc]onceptual/);assert.match($('figcaption').text(),/[Cc]onceptual/);assert.equal($('main img').attr('src'),'/editorial/representation-reading.svg');}
});
test('built regional prose, inspected evidence anchors and original article links resolve safely',()=>{
  const s=regions[0],$=html('places/'+s.id);for(const p of regionalParagraphs(s))assert.equal($('#'+p.id+' .story-prose').text(),p.text);
  for(const c of regionalCitations(s))assert.equal($(`#evidence-${c.sourceId}-${c.passageId}`).length,1);
  for(const a of s.archiveLinks)assert.equal(html('articles/'+a.id)('#section-'+a.section).length,1);
  for(const f of ['src/components/RegionalParagraph.astro','src/pages/places/[id].astro'])assert.doesNotMatch(readFileSync(f,'utf8'),/set:html|innerHTML|client:|<script|<iframe|<form/);
  assert.ok($.html().includes('&amp;'));assert.match($('.regional-status').text(),/private review only/);assert.equal($('meta[name="robots"]').attr('content'),'noindex,nofollow');
});
test('place discovery preserves Unicode, independent scopes and actual section pointers',()=>{
  const $=html('places');assert.equal($('.place-card').length,2);assert.deepEqual($('.place-card h2').map((_,e)=>$(e).text()).get(),['Abẹ́òkúta','Ìbàdàn']);
  assert.equal($('#ibadan a.place-story-link').length,0);assert.equal($('#abeokuta a.place-story-link').attr('href'),'/places/'+regions[0].id+'/');
  for(const p of places)assert.equal($(`#${p.id} a[href="/articles/${p.articleId}/#section-${p.section}"]`).length,1);
  assert.equal(Number(html('places/'+regions[0].id)('.regional-meta').attr('data-word-count')),regionalWordCount(regions[0]));
});
test('internal research dossiers and ineligible fixture text never enter static output',()=>{
  for(const file of walk('dist').filter(p=>/\.(html|js|json|css|txt|xml)$/.test(p))){const text=readFileSync(file,'utf8');for(const marker of ['INTERNAL-001H-DOSSIER','Research voices needed: internal regional queue'])assert.ok(!text.includes(marker),file);}
  const s=clone();s.release='internal';s.opening.text='INTERNAL-001H-DOSSIER synthetic selector fixture';assert.equal(privateRegionalStories([RegionalStory.parse(s)]).length,0);
  assert.deepEqual(readdirSync('dist/places').filter(n=>statSync(join('dist/places',n)).isDirectory()),[regions[0].id]);
});
