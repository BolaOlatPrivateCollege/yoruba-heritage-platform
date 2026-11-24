import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {approvedFigureIllustrations as art} from '../src/lib/approved-figure-illustrations.ts';
const root=resolve(import.meta.dirname,'../..');
const read=p=>readFileSync(resolve(root,p),'utf8');

test('fifteen supplied images have individual truthful descriptions and exact filenames',()=>{
 assert.deepEqual(Object.keys(art).sort(),['erinle','esu','moremi-ajasoro','oba','obatala','oduduwa','ogun','olokun','orisa-oko','orunmila','osanyin','osun','oya','sango','yemoja']);
 for(const [slug,item] of Object.entries(art)){
  assert.match(item.filename,/^[a-z0-9-]+\.webp$/);
  assert.ok(item.width>=600&&item.height>=600);
  assert.ok(item.alt.length>=60&&item.caption.length>=80);
  assert.match(item.caption,/AI-generated/);
  assert.match(item.caption,/Not an archival photograph|Not a historical photograph|Not a photograph of an original monument/);
  const file=resolve(root,'web/public/images',item.filename);
  if(existsSync(file))assert.ok(readFileSync(file).length>10000,`Empty artwork: ${slug}`);
 }
});
test('figure route never serves a nonexistent image reference',()=>{
 const route=read('web/src/pages/figures/[slug].astro');
 assert.match(route,/approvedFigureIllustrations\[f.slug\]/);
 assert.match(route,/existsSync\(resolve\(process.cwd\(\),'public','images',artCandidate.filename\)\)/);
 assert.match(route,/\{art&&<figure class="figure-artwork">/);
 assert.match(route,/art.caption/);
});
