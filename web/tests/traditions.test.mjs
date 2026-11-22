import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {load} from 'cheerio';
import {ContextEntry,ContextSource,validateContext,previewEntries,entryCitations,categoryLabels,claimLabels} from '../src/lib/traditions.ts';
import {contextEntries,contextSources,contextFor} from '../src/data/article-context.ts';
import {archive} from '../src/lib/archive.ts';
import {digest} from '../../scripts/preservation.mjs';
const clone=()=>structuredClone(contextEntries[0]);
const html=id=>load(readFileSync(resolve('dist/articles',id,'index.html'),'utf8'));
const walk=dir=>readdirSync(dir).flatMap(n=>{const p=join(dir,n);return statSync(p).isDirectory()?walk(p):[p];});

test('context is a separate validated versioned collection with two bounded preview articles',()=>{
  validateContext(contextEntries,contextSources);
  assert.equal(contextEntries.length,3);assert.equal(contextSources.length,3);
  assert.deepEqual(archive.articles.filter(a=>contextFor(a.id).length).map(a=>a.id).sort(),['ile-ife','know-adire']);
  for(const e of contextEntries){assert.equal(e.history.at(-1).version,e.version);assert.equal(e.history.at(-1).date,e.updated);for(const c of entryCitations(e))assert.ok(contextSources.find(s=>s.id===c.sourceId).passages.some(p=>p.id===c.passageId));}
});

test('unknown article, passage, duplicate IDs, unsafe URL and excluded dependencies fail closed',()=>{
  for(const mutate of [e=>e.articleId='missing',e=>e.citations[0].passageId='missing',e=>e.citations[0].sourceId='missing']){const e=clone();mutate(e);assert.throws(()=>validateContext([e],contextSources));}
  assert.throws(()=>validateContext([clone(),clone()],contextSources),/Duplicate/);
  const s=structuredClone(contextSources);s[0].dependencyReview='unchecked';assert.throws(()=>validateContext([clone()],s),/Unchecked/);
  s[0].dependencyReview='excluded';assert.throws(()=>validateContext([clone()],s));
  const source=structuredClone(contextSources[0]);source.url='javascript:alert(1)';assert.equal(ContextSource.safeParse(source).success,false);
  source.url=contextSources[0].url;source.author='Samuel Johnson';assert.throws(()=>validateContext([clone()],[source]),/Excluded/);
});

test('rights, consent, translation, source and safety state independently gate private preview',()=>{
  for(const [key,value] of [['rights','unknown'],['rights','restricted'],['consent','unknown'],['consent','withheld'],['translationReview','pending'],['provenanceReview','pending'],['safety','pending'],['safety','blocked']]){
    const e=clone();e[key]=value;assert.equal(ContextEntry.safeParse(e).success,false,key);assert.equal(previewEntries(e.articleId,[e]).length,0);
    e.release='internal';assert.equal(ContextEntry.safeParse(e).success,true);assert.equal(previewEntries(e.articleId,[e]).length,0);
  }
});

test('all prohibited harm and sensitivity flags block display even with a release label',()=>{
  for(const flag of ['restricted-sacred','living-person-allegation','witchcraft-identification','medical','ethnic-tension','children','private-property','sexual-allegation','criminal-allegation','private-testimony']){
    const e=clone();e.sensitivityFlags=[flag];assert.equal(ContextEntry.safeParse(e).success,false);assert.deepEqual(previewEntries(e.articleId,[e]),[]);
  }
});

test('category requirements do not turn testimony into event proof or invent an unsourced controversy',()=>{
  const e=clone();e.perspectives=[];assert.equal(ContextEntry.safeParse(e).success,false);
  e.perspectives=structuredClone(contextEntries[0].perspectives);e.claimStatus='reviewed';assert.equal(ContextEntry.safeParse(e).success,false);
  const oral=structuredClone(contextEntries[1]);oral.claimStatus='reviewed';assert.equal(ContextEntry.safeParse(oral).success,false);
  const folk=structuredClone(contextEntries[2]);delete folk.variant;assert.equal(ContextEntry.safeParse(folk).success,false);
  assert.match(contextEntries[0].counterevidence,/not equal independent corroboration/);
  assert.match(contextEntries[1].narrator,/unknown/);assert.match(contextEntries[1].sourceType,/not an authenticated/);
});

test('circulating claim stays internal unless every independent publication gate is documented',()=>{
  const e=clone();e.category='circulating-claim';e.claimStatus='uncorroborated';e.perspectives=[];e.release='internal';
  e.circulation={documented:false,evidence:[],independentReview:null,communityReview:null,decision:null,factCheckOutcome:null};
  assert.equal(ContextEntry.safeParse(e).success,true);assert.equal(previewEntries(e.articleId,[e]).length,0);
  e.release='approved-for-private-preview';assert.equal(ContextEntry.safeParse(e).success,false);
  const review={reviewer:'Synthetic gate-test reviewer — not a real approval',date:'2026-11-22',note:'Synthetic nonhistorical schema fixture only'};
  e.circulation={documented:true,evidence:structuredClone(e.citations),independentReview:review,communityReview:{...review,reviewer:'Synthetic community gate fixture'},decision:{...review,reviewer:'Synthetic editor gate fixture'},factCheckOutcome:'Synthetic validation outcome only'};
  assert.equal(ContextEntry.safeParse(e).success,true);
  const selfReview=structuredClone(e);selfReview.circulation.independentReview.reviewer=e.review.reviewer;assert.equal(ContextEntry.safeParse(selfReview).success,false);
  for(const key of ['documented','evidence','independentReview','communityReview','decision','factCheckOutcome']){const v=structuredClone(e);v.circulation[key]=key==='documented'?false:key==='evidence'?[]:null;assert.equal(ContextEntry.safeParse(v).success,false,key);assert.equal(previewEntries(v.articleId,[v]).length,0);}
});

test('withdrawals and correction history cannot silently erase or release a withdrawn item',()=>{
  const e=clone();e.release='withdrawn';assert.equal(ContextEntry.safeParse(e).success,false);
  e.version+=1;e.history.push({version:e.version,date:e.updated,action:'withdrawn',note:'Synthetic test withdrawal'});e.withdrawal={date:e.updated,reason:'Synthetic test'};
  assert.equal(ContextEntry.safeParse(e).success,true);assert.equal(previewEntries(e.articleId,[e]).length,0);
  e.release='approved-for-private-preview';assert.equal(ContextEntry.safeParse(e).success,false);
  const bad=clone();bad.version=3;assert.equal(ContextEntry.safeParse(bad).success,false);
});

test('all 113 original article strings and source lists remain unchanged with no empty modules',()=>{
  assert.equal(digest(archive),'89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2');
  for(const a of archive.articles){const $=html(a.id);assert.equal($('.canonical-title').text(),a.title);assert.equal($('.canonical-deck').text(),a.deck);assert.deepEqual($('.canonical-body').map((_,e)=>$(e).text()).get(),a.sections.map(s=>s.p));
    assert.deepEqual($('.bibliography li>a').map((_,e)=>$(e).attr('href')).get(),a.sourceIds.map(id=>`/sources/${id}/`));
    assert.equal($('.article-context').length,contextFor(a.id).length?1:0);
    if(contextFor(a.id).length)assert.ok($('.bibliography').next().hasClass('article-context'),'New layer follows original bibliography');
  }
});

test('preview cards render exact safe prose, evidence locations, uncertainty and review boundaries',()=>{
  for(const e of contextEntries.filter(e=>e.release==='approved-for-private-preview')){const $=html(e.articleId),card=$(`#context-${e.id}`);assert.equal(card.length,1);assert.equal(card.find('summary .context-card-title').text(),e.title);assert.equal(card.find('.context-summary').text(),e.summary);assert.match(card.text(),/No public release|No public release|No public|no public|public release/i);assert.match(card.text(),/What remains unknown/);assert.match(card.text(),/Codex/);assert.match(card.text(),/Version 1/);
    for(const c of entryCitations(e)){const s=contextSources.find(s=>s.id===c.sourceId);assert.ok(card.find(`a[href="${s.url}"]`).length);assert.ok(card.find(`[id="context-source-${e.id}-${s.id}-${c.passageId}"]`).length);}
    assert.match(card.find('.context-status').text(),new RegExp(`Version ${e.version}`));assert.equal(card.find('script,iframe,form,input').length,0);
  }
});

test('internal narrative and unused sources never reach static pages, scripts, search or assets',()=>{
  for(const p of walk('dist').filter(p=>/\.(html|js|json|css|xml|txt)$/.test(p))){const text=readFileSync(p,'utf8');for(const secret of ['INTERNAL-OSUN-CONTEXT','osun-story-research-gap','context-osun-aot'])assert.ok(!text.includes(secret),`${secret} leaked into ${p}`);}
  assert.equal(html('heritage')('.article-context').length,0);assert.equal(html('ile-ife')('.context-circulating-claim').length,0);
});

test('native disclosure and heading structure need no script, HTML sink or private intake',()=>{
  const source=readFileSync('src/components/ArticleContext.astro','utf8');assert.doesNotMatch(source,/set:html|innerHTML|client:|<script|<form|<iframe|JSON\.stringify/);assert.match(source,/previewEntries/);
  for(const id of ['ile-ife','know-adire']){const $=html(id),m=$('.article-context');assert.equal(m.find('details>summary').length,1);assert.equal(m.find('summary button,summary a').length,0);assert.equal(m.find('[role="tab"]').length,0);assert.ok(m.find('h2,h3,h4,h5').length>6);assert.ok($('#'+m.attr('aria-labelledby')).length);assert.ok(m.html().includes('&amp;'));}
});

test('Yoruba Unicode, unknown provenance and revision fields survive without invented personal data',()=>{
  const $=html('know-adire');assert.ok($('.article-context').text().includes('Ìbàdàn'));assert.ok(html('ile-ife')('.article-context').text().includes('Ilé-Ifẹ̀'));
  for(const e of contextEntries){assert.match(e.review.reviewer,/Codex/);assert.equal(e.version,e.release==='internal'?1:2);assert.ok(e.unknown.length);assert.equal(Object.hasOwn(e,'email'),false);assert.equal(Object.hasOwn(e,'signedConsent'),false);}
  const e=clone();e.signedConsent='not permitted';assert.equal(ContextEntry.safeParse(e).success,false);
});

test('one-source object possibilities never acquire disputed-history category or status without disagreement evidence',()=>{
  const e=clone();assert.equal(e.category,'object-interpretation');assert.equal(e.claimStatus,'unresolved');assert.equal(new Set(entryCitations(e).map(c=>c.sourceId)).size,1);
  const $=html(e.articleId);assert.equal($('.context-category>h3').text(),'Unresolved object interpretations');assert.equal($('.context-contested-interpretation').length,0);assert.match($('.context-status').text(),/Unresolved object interpretation/);assert.doesNotMatch($('.context-status').text(),/Contested|Recorded tradition/);assert.match($('.context-card-label').text(),/no documented historical dispute/);
  e.category='contested-interpretation';e.claimStatus='contested';assert.equal(ContextEntry.safeParse(e).success,false,'Two possibilities alone are not evidence of disagreement');
  e.disputeBasis={description:'Synthetic schema fixture only — no historical dispute asserted',citations:[{sourceId:'missing-dispute-source',passageId:'missing'}]};assert.throws(()=>validateContext([e],contextSources),/Unresolved context passage/);
  assert.match(claimLabels.contested,/Documented disagreement/);assert.equal(categoryLabels['contested-interpretation'],'Disputed histories');
});

test('anonymous museum-mediated report cannot silently become an inherited oral tradition',()=>{
  const e=structuredClone(contextEntries[1]);assert.equal(e.category,'mediated-report');assert.equal(e.claimStatus,'reported-account');assert.match(e.narrator,/unknown/);assert.equal(e.primaryLanguage,'unknown');
  const $=html(e.articleId);assert.equal($('.context-category>h3').text(),'Museum-mediated reports');assert.equal($('.context-community-tradition').length,0);assert.match($('.context-status').text(),/Museum-mediated report/);assert.doesNotMatch($('.context-status').text(),/Recorded tradition|Contested/);assert.match($('.context-card-label').text(),/intermediary/);
  e.category='community-tradition';e.claimStatus='recorded-tradition';assert.equal(ContextEntry.safeParse(e).success,false,'A purchase-time remark supplies no transmission basis');
  e.traditionBasis={description:'Synthetic schema fixture only — no inherited account asserted',citations:[{sourceId:'missing-tradition-source',passageId:'missing'}]};assert.throws(()=>validateContext([e],contextSources),/Unresolved context passage/);
});

test('classification corrections preserve pilot identity and provenance while appending dated version history',()=>{
  const provenance=e=>{const {category,claimStatus,version,history,...rest}=e;return rest;};
  assert.deepEqual(contextEntries.slice(0,2).map(e=>digest(provenance(e))),['b4027af1ccf388b3e02dfa2e322a8c23280f710ef6dc78372682ea4f6f89a8d1','a49f169b25904166cfdd9d0f4aafc1c796e682524c3a3544bfe67d829b222206']);
  assert.equal(digest(contextSources.map(({version,recordStatus,...rest})=>rest)),'b9d0b9ccda1ce39ce3ce0fc6eb93f177353cc56b78a0f27dad5150c579556ab2');
  assert.deepEqual(contextEntries.map(e=>e.id),['ife-attachment-readings','adire-purchase-memory','osun-story-research-gap']);
  assert.deepEqual(contextEntries.slice(0,2).map(e=>e.citations),[[{sourceId:'context-ife-head',passageId:'attachments'}],[{sourceId:'context-adire-vam',passageId:'purchase-account'}]]);
  for(const e of contextEntries.slice(0,2)){assert.equal(e.version,2);assert.deepEqual(e.history.map(h=>h.action),['created','corrected']);assert.deepEqual(e.history.map(h=>h.version),[1,2]);assert.equal(e.history[1].date,'2026-11-22');assert.equal(e.release,'approved-for-private-preview');assert.equal(e.safety,'reviewed-for-safety');assert.ok(e.unknown.length);assert.equal(e.withdrawal,null);}
  assert.ok(contextEntries[0].geography.includes('NCMM 1999.2.3'));assert.ok(contextEntries[1].geography.includes('Circ.591-1965'));
  assert.equal(contextSources[0].url,'https://archive.artic.edu/benin/artwork/189474');assert.equal(contextSources[1].url,'https://www.vam.ac.uk/articles/adire-tied-and-dyed-indigo-textiles/');
  assert.ok(contextSources.every(s=>s.version===1&&s.accessed==='2026-11-22'));assert.equal(contextEntries[2].version,1);assert.equal(contextEntries[2].release,'internal');
});
