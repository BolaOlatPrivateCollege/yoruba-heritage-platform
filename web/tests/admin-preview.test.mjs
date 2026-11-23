import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {categories,example,draftSummary,previewText} from '../../cms/admin-preview/editor.js';

const page=readFileSync(resolve(process.cwd(),'../cms/admin-preview/index.html'),'utf8');
test('admin prototype remains outside public Astro routes and is visibly non-operational',()=>{
 assert.match(page,/NOT CONNECTED/);
 assert.match(page,/not a working administrator login/i);
 assert.match(page,/Save to database \(disabled\)/);
 assert.match(page,/type="button" disabled/);
 assert.match(page,/Nothing is sent, saved or published/);
 assert.match(page,/<meta name="robots" content="noindex,nofollow,noarchive">/);
 assert.doesNotMatch(page,/<form[^>]+action=/i);
 assert.doesNotMatch(page,/\bfetch\s*\(|\bXMLHttpRequest\b|localStorage|sessionStorage|indexedDB/i);
});
test('editor categories cover broad cultural heritage, not only schools',()=>{
 assert.deepEqual(categories.map(c=>c[0]),[
  'story','belief','figure','place','research','learning','editorial-page'
 ]);
});
test('Yorùbá Unicode remains intact in the private example preview',()=>{
 const record=draftSummary(example);
 assert.equal(record.title,'Ìtàn àṣà Yorùbá');
 assert.match(previewText(example),/Ìtàn àṣà Yorùbá/);
 assert.equal(record.status,'Unpublished local example');
});
test('preview cannot accidentally render markup as HTML',()=>{
 assert.match(page,/\.textContent=value\.body/);
 assert.match(page,/\.textContent=value\.title/);
 assert.match(page,/\.textContent=value\.summary/);
 assert.doesNotMatch(page,/\.innerHTML\s*=/);
});
