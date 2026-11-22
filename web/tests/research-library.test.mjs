import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {load} from 'cheerio';
import {archive} from '../src/lib/archive.ts';
import {digest} from '../../scripts/preservation.mjs';
import {assessments,activeAssessments,draftAssessments,assessmentFor,unassessedCount,authorPaths,LibraryAssessment,validateLibraryAssessments,resolveLibraryTarget,passagesForAssessment,guideFor,guideHref,usagesFor,eligibleAssessments,makePetitionTrace,excludedAuthority,libraryCard} from '../src/lib/research-library.ts';
import {matchesLibrary} from '../src/lib/library-filter.ts';
const html=route=>load(readFileSync(resolve('dist',route,'index.html'),'utf8'));
const clone=id=>structuredClone(assessmentFor(id));
const walk=dir=>readdirSync(dir).flatMap(n=>{const p=join(dir,n);return statSync(p).isDirectory()?walk(p):[p];});

test('research overlay reconciles exactly nine original records and three prior draft pointers, leaving 119 unassessed',()=>{
  assert.equal(assessments.length,12);assert.equal(activeAssessments.length,12);assert.equal(draftAssessments.length,3);assert.equal(unassessedCount,119);assert.equal(archive.sources.length,128);
  validateLibraryAssessments(assessments);const $=html('sources');assert.equal($('.source-directory [data-library-entry]').length,128);assert.equal($('.draft-evidence-card').length,3);
  assert.equal($('.source-directory [data-library-access="not-assessed"]').length,119);assert.equal($('.source-directory [data-library-access="full-text-inspected"]').length,0);
});

test('four author paths preserve edition differences, named creators and reported rather than universal authority',()=>{
  assert.equal(authorPaths.length,4);assert.equal(assessmentFor('ogundiran2020').access,'limited-preview');assert.match(assessmentFor('ogundiran2020').note,/not inspected evidence/);
  const first=assessmentFor('authors-oluw-iu'),third=assessmentFor('authors-oluw-book');assert.equal(first.access,'catalogue-only');assert.match(first.edition,/2014/);assert.match(third.edition,/2017 third edition/);assert.equal(third.access,'limited-preview');assert.match(third.note,/stable alternate passage links and exact page locators are not recorded/);assert.match(third.note,/Samuel Johnson bibliography/);
  for(const id of ['authors-abi-cv','authors-abi-poems','authors-abi-ifa','authors-eleb-custodian','authors-eleb-iyere','authors-eleb-bio'])assert.equal(assessmentFor(id).access,'catalogue-only');
  assert.equal(assessmentFor('authors-eleb-bio').creator,'Toyin Falola');assert.match(assessmentFor('authors-eleb-bio').note,/not a book authored by/);assert.equal(assessmentFor('authors-eleb-custodian').creator,'Ifáyẹmí Ẹlẹ́buìbọn');assert.equal(assessmentFor('authors-abi-poems').creator,'Wándé Abímbọ́lá');
});

test('bibliographic and preview assessments cannot silently upgrade books or swap edition evidence',()=>{
  for(const original of activeAssessments)for(const access of ['selected-passages-inspected','full-text-inspected']){
    if(original.target.register!=='canonical')continue;const a=structuredClone(original);a.access=access;a.passageIds=['invented-page'];assert.throws(()=>validateLibraryAssessments([a]),/cannot promote/);
  }
  const a=clone('authors-oluw-iu');a.basisId='guide-oluwole-2017';assert.throws(()=>validateLibraryAssessments([a]),/work\/edition/);
  a.basisId='guide-oluwole-2014';a.access='limited-preview';assert.throws(()=>validateLibraryAssessments([a]),/cannot promote/);
  const draft=structuredClone(draftAssessments[0]);draft.access='full-text-inspected';assert.throws(()=>validateLibraryAssessments([draft]),/selected recorded passages/);
});

test('unknown pointers, unsafe fields, missing guides and fabricated passage IDs fail closed',()=>{
  const a=clone('ogundiran2020');a.target.sourceId='unknown';assert.throws(()=>validateLibraryAssessments([a]));
  const b=clone('ogundiran2020');b.url='javascript:alert(1)';assert.equal(LibraryAssessment.safeParse(b).success,false);
  b.target={register:'regional',sourceId:'unknown'};delete b.url;assert.throws(()=>validateLibraryAssessments([b]));
  const c=structuredClone(draftAssessments[0]);c.passageIds=['unseen'];assert.throws(()=>validateLibraryAssessments([c]),/Unknown inspected passage/);
  const d=clone('ogundiran2020');d.authorArticle='missing';assert.throws(()=>validateLibraryAssessments([d]),/author study/);
  d.authorArticle=null;d.relations=[{sourceId:'missing',kind:'bibliographic-relationship',note:'Test'}];assert.throws(()=>validateLibraryAssessments([d]));
  assert.throws(()=>guideHref('../../private_data'),/Unknown/);assert.throws(()=>guideHref('javascript:alert(1)'),/Unknown/);
});

test('selected passage examples reuse real prior locators including printed page 78 and PDF page 106',()=>{
  const $=html('sources');
  for(const a of draftAssessments)for(const p of passagesForAssessment(a)){
    const [path,anchor]=p.href.split('#');assert.equal(html(path)('#'+anchor).length,1);assert.ok($(`a[href="${p.href}"]`).length);
  }
  const book=draftAssessments.find(a=>a.target.sourceId==='region-women-biography');assert.equal(resolveLibraryTarget(book.target).sourceVersion,2);assert.match(passagesForAssessment(book)[0].locator,/Printed pp.73–75 and 78 \(PDF pp.101–103,106\)/);
  assert.match($('.trace-locator').text(),/and 78 \(PDF pp.101–103,106\)/);assert.match($('.trace-claim p').first().text(),/petition/);assert.equal($('.trace-claim a').attr('href'),'/places/abeokuta-tax-and-representation/#organisation-record');assert.match($('.trace-claim .fine').text(),/not independently inspected AWU papers/);
});

test('all original source titles, notes, URLs, order and detail routes remain byte-faithful in display',()=>{
  const $=html('sources');assert.deepEqual($('.source-directory article h2').map((_,e)=>$(e).text()).get(),archive.sources.map(s=>s.title));
  for(const s of archive.sources){const page=html('sources/'+s.id);assert.equal(page('.canonical-source-title').text(),s.title);assert.equal(page('.canonical-source-kind').text(),s.kind);assert.equal(page('.canonical-source-detail').text(),s.detail);assert.ok(page(`a[href="${s.url}"]`).length);assert.equal(page('meta[name="robots"]').attr('content'),'noindex,nofollow');
    assert.equal(page('.library-assessment .access-chip').text(),assessmentFor(s.id)?({ 'limited-preview':'Limited preview — not the complete book','catalogue-only':'Bibliography / catalogue only'}[assessmentFor(s.id).access]):'Not assessed in this explorer');
  }
});

test('frozen archive and earlier reading layers are unchanged and remain linked',()=>{
  assert.equal(digest(archive),'89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2');assert.equal(archive.researchAuthorArticles.length,3);
  assert.equal(html('articles/ile-ife')('.context-category>h3').text(),'Unresolved object interpretations');assert.equal(html('articles/know-adire')('.context-category>h3').text(),'Museum-mediated reports');
  assert.equal(Number(html('places/abeokuta-tax-and-representation')('.regional-meta').attr('data-word-count')),940);
  assert.ok(html('collections/research')('a[href="/sources/"]').length);assert.equal(readdirSync('dist/stories').filter(n=>statSync(join('dist/stories',n)).isDirectory()).length,4);
});

test('guide and author-study connections resolve to existing records without inventing passage pages',()=>{
  for(const a of activeAssessments.filter(a=>a.target.register==='canonical')){
    const g=guideFor(a);assert.ok(g);assert.ok(existsSync(resolve('..',g.guide)));assert.ok(readFileSync(resolve('..',g.guide),'utf8').length>1000);assert.match(guideHref(g.guide),/^https:\/\/github.com\//);assert.equal(a.passageIds.length,0);
    if(a.authorArticle)assert.equal(html('articles/'+a.authorArticle)('.canonical-title').length,1);
    for(const u of usagesFor(a.target.sourceId)){const [path,anchor]=u.href.split('#');assert.equal(html(path)('#'+anchor).length,1);}
  }
});

test('internal and withdrawn overlays reveal no assessment data or guided trace while canonical originals remain',()=>{
  const items=structuredClone(assessments),a=items.find(a=>a.target.sourceId==='region-women-biography');a.release='internal';a.note='INTERNAL-001I-ASSESSMENT synthetic private note';assert.equal(makePetitionTrace(items),null);assert.ok(!eligibleAssessments(items).includes(a));
  a.release='withdrawn';assert.equal(LibraryAssessment.safeParse(a).success,false);a.version=2;a.history.push({version:2,date:a.updated,action:'withdrawn',note:'Synthetic test only'});a.withdrawal={date:a.updated,reason:'Test'};assert.equal(LibraryAssessment.safeParse(a).success,true);assert.equal(makePetitionTrace(items),null);
  for(const file of walk('dist').filter(p=>/\.(html|js|json|css|txt|xml)$/.test(p)))assert.ok(!readFileSync(file,'utf8').includes('INTERNAL-001I-ASSESSMENT'),file);
});

test('strict assessment versions cannot acquire public release, verification or permissions by label',()=>{
  assert.throws(()=>validateLibraryAssessments([assessments[0],assessments[0]]),/Duplicate/);
  for(const [key,value] of [['version',3],['release','published'],['rights','permission-granted'],['eventEvidence','verified'],['review','community-approved'],['support','verified-history']]){const a=clone('ogundiran2020');a[key]=value;assert.equal(LibraryAssessment.safeParse(a).success,false,key);}
  const a=clone('ogundiran2020');a.fullText=true;assert.equal(LibraryAssessment.safeParse(a).success,false);
});

test('Samuel Johnson exclusion is precise and does not condemn Cheryl Johnson-Odim or every citing author',()=>{
  assert.equal(excludedAuthority('Samuel Johnson','A historical book'),true);assert.equal(excludedAuthority('Unknown','The History of the Yorubas'),true);assert.equal(excludedAuthority('Cheryl Johnson-Odim and Nina Emma Mba','For Women and the Nation'),false);assert.equal(excludedAuthority('Sophie Olúwọlé','Socrates and Ọ̀rúnmìlà'),false);
  const a=clone('ogundiran2020');a.creator='Samuel Johnson';assert.throws(()=>validateLibraryAssessments([a]),/Excluded/);assert.match(html('sources')('.library-policy').text(),/bibliography alone does not prove/);
});

test('derived filtering handles author diacritics, intersecting criteria and hostile literal input without altering display',()=>{
  const c=libraryCard('authors-eleb-custodian');assert.ok(matchesLibrary(c,'Elebuibon','catalogue-only','practitioner-writing'));assert.ok(matchesLibrary(c,'Ẹlẹ́buìbọn','all','all'));assert.ok(!matchesLibrary(c,'Elebuibon','full-text-inspected','all'));assert.ok(!matchesLibrary(c,'Elebuibon','all','institutional-record'));assert.ok(!matchesLibrary(c,'<script>alert(1)</script>','all','all'));assert.ok(c.creator.includes('Ẹlẹ́buìbọn'));
  const page=readFileSync('src/pages/sources/index.astro','utf8');assert.doesNotMatch(page,/innerHTML|set:html|localStorage|sessionStorage|fetch\(|XMLHttpRequest/);assert.match(page,/status\.textContent/);assert.match(page,/entry\.hidden/);
});
