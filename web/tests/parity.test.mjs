import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {load} from 'cheerio';
import {archive,Archive,validateReferences} from '../src/lib/archive.ts';
import {normalize,matches} from '../src/lib/search.ts';
import {importDocument} from '../../scripts/import-archive.mjs';
import {canonical,digest,readManifest} from '../../scripts/preservation.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),dist=resolve(root,'dist');
const html=route=>readFileSync(resolve(dist,route,'index.html'),'utf8');
function walk(dir){return readdirSync(dir).flatMap(name=>{const p=join(dir,name);return statSync(p).isDirectory()?walk(p):[p];});}

test('typed adapter is a full lossless parse of the approved importer, including all supplements',()=>{
  const original=importDocument().archive;
  assert.equal(canonical(archive),canonical(original));
  assert.equal(digest(archive),readManifest().archiveSha256);
  for(const [key,value]of Object.entries(original)){
    assert.equal(digest(archive[key]),digest(value),key);
    // VM-origin arrays have a different prototype; compare exact ordered data,
    // not runtime realm identity. The full object hash above is also required.
    if(Array.isArray(value))assert.equal(canonical(archive[key].map(r=>r?.id??null)),canonical(value.map(r=>r?.id??null)));
  }
  assert.equal(archive.communityVoices.length,6);assert.equal(archive.sacredProfiles.length,24);
});
test('typed validation rejects broken schema, duplicate IDs and unresolved references',()=>{
  const a=structuredClone(importDocument().archive);delete a.articles[0].title;
  assert.throws(()=>Archive.parse(a));
  const b=structuredClone(archive);b.articles[0].sections[0].sourceIds=['not-registered'];
  assert.throws(()=>validateReferences(b),/Unresolved/);
  const c=structuredClone(archive);c.articles[1].id=c.articles[0].id;
  assert.throws(()=>validateReferences(c),/Duplicate/);
});
test('all 113 article routes retain exact titles, decks, evidence, ordered section prose and citations',()=>{
  assert.equal(archive.articles.length,113);
  const folders=readdirSync(join(dist,'articles')).filter(n=>statSync(join(dist,'articles',n)).isDirectory());
  assert.deepEqual(folders.sort(),archive.articles.map(a=>a.id).sort());
  for(const a of archive.articles){
    const $=load(html('articles/'+a.id));
    assert.equal($('.canonical-title').text(),a.title,a.id);
    assert.equal($('.canonical-deck').text(),a.deck,a.id);
    assert.equal($('.evidence-type').text(),a.evidenceType,a.id);
    assert.equal($('.evidence-note').text(),a.evidenceNote,a.id);
    assert.equal($('.article-section').length,a.sections.length,a.id);
    a.sections.forEach((s,i)=>{
      const node=$('#section-'+(i+1));
      assert.equal(node.find('.section-heading').text(),s.h,a.id);
      assert.equal(node.find('.canonical-body').text(),s.p,a.id+' '+s.h);
      assert.deepEqual(node.find('.section-sources a').map((_,el)=>$(el).attr('href')).get(),s.sourceIds.map(id=>'/sources/'+id+'/'));
    });
  }
});
test('all 128 source routes retain exact metadata and original external links',()=>{
  assert.equal(archive.sources.length,128);
  const folders=readdirSync(join(dist,'sources')).filter(n=>statSync(join(dist,'sources',n)).isDirectory());
  assert.deepEqual(folders.sort(),archive.sources.map(s=>s.id).sort());
  for(const s of archive.sources){const $=load(html('sources/'+s.id));
    assert.equal($('.canonical-source-title').text(),s.title);
    assert.equal($('.canonical-source-kind').text(),s.kind);
    assert.equal($('.canonical-source-detail').text(),s.detail);
    assert.ok($('a').toArray().some(el=>$(el).attr('href')===s.url));
  }
});
test('every generated internal link and section anchor resolves',()=>{
  for(const file of walk(dist).filter(f=>f.endsWith('.html'))){
    const $=load(readFileSync(file,'utf8'));
    for(const node of $('a[href]').toArray()){
      const href=$(node).attr('href');if(!href||(!href.startsWith('/')&&!href.startsWith('#')))continue;
      const [path,fragment]=href.split('#');
      const target=path?resolve(dist,'.'+path+(path.endsWith('/')?'index.html':'')):file;
      assert.ok(existsSync(target),`${file}: ${href}`);
      if(fragment){const page=load(readFileSync(target,'utf8'));assert.ok(page('[id]').toArray().some(el=>page(el).attr('id')===fragment),href);}
    }
  }
});
test('public output excludes server/developer source, archive dumps, private files and raw source bundles',()=>{
  for(const file of walk(dist)){
    const path=file.slice(dist.length).replaceAll('\\','/');
    assert.doesNotMatch(path,/\.env|private_data|server\.py|archive\.json|baseline\.json|security-revisions|\.map$/);
    const body=readFileSync(file,'utf8');
    assert.doesNotMatch(body,/ADMIN_PASSWORD|YORUBA_DB_PATH|supplementarySourceText|window\.HISTORY_DATA|CREATE TABLE IF NOT EXISTS/);
    if(path.endsWith('.js'))assert.doesNotMatch(body,/canonical-body|History is a conversation among sources/);
  }
  const index=JSON.parse(readFileSync(join(dist,'search-index.json'),'utf8'));
  assert.equal(index.length,113);
  assert.ok(index.every(e=>Object.keys(e).sort().join(',')==='category,deck,id,key,title'));
  assert.ok(readFileSync(join(dist,'search-index.json')).length<150000,'Keep lazy search metadata compact');
});
test('diacritic-insensitive search preserves display and handles names, partial words and empty queries',()=>{
  const index=JSON.parse(readFileSync(join(dist,'search-index.json'),'utf8'));
  assert.equal(normalize('Ọ̀ṢUN'),normalize('osun'));
  assert.ok(matches(index,'Olodumare').some(e=>e.title.includes('Olódùmarè')));
  assert.ok(matches(index,'Olodumare')[0].title.includes('Olódùmarè'),'Title matches precede incidental heading matches');
  assert.ok(matches(index,'orisa').length>0);assert.ok(matches(index,'ifa').length>0);
  assert.equal(matches(index,'').length,0);
  assert.equal(matches(index,'<script>alert(1)</script>').length,0);
});
test('legacy mapping retains all article IDs and original section suffixes without auto-redirects',()=>{
  const map=JSON.parse(readFileSync(join(dist,'legacy-map.json'),'utf8'));
  for(const a of archive.articles){assert.equal(map['#article/'+a.id],'/articles/'+a.id+'/');
    a.sections.forEach((_,i)=>assert.equal(map['#article/'+a.id+'/section-'+(i+1)],'/articles/'+a.id+'/#section-'+(i+1)));
  }
  assert.ok(existsSync(join(dist,'404.html')));
});
