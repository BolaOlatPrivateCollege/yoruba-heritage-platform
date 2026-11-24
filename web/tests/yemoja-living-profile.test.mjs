import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {yemojaLivingProfile as p} from '../src/lib/yemoja-living-profile.ts';
const root=resolve(import.meta.dirname,'../..');
const read=path=>readFileSync(resolve(root,path),'utf8');

test('Yemọja profile offers full locally aware explanations and story families',()=>{
 assert.equal(p.slug,'yemoja');
 assert.equal(p.name,'Yemọja');
 assert.ok(p.intro.length>250);
 assert.deepEqual(p.sections.map(section=>section.id),['names','river-ocean','saki','mother','protection','ibadan','diaspora','voices']);
 assert.ok(p.sections.every(section=>section.paragraphs.length>=3));
 assert.ok(p.tales.length>=3);
 assert.ok(p.questions.length>=4);
 assert.ok(p.references.length>=4);
});
test('Yemọja section distinguishes Nigerian rivers, diaspora seas and named oral variants',()=>{
 const text=p.sections.flatMap(x=>x.paragraphs).join(' ');
 assert.match(text,/Ògùn River/);
 assert.match(text,/Olókun/);
 assert.match(text,/Ṣakí/);
 assert.match(text,/Ọ̀kẹ́rẹ́/);
 assert.match(text,/Popoyemọja/);
 assert.match(text,/2 February/);
 assert.match(text,/New Year’s Eve/);
 assert.match(text,/Mami Wata/);
 assert.match(p.notes.join(' '),/not.*independently established historical/i);
 assert.match(p.notes.join(' '),/not.*approved/);
});
test('figure reader selects Yemọja profile with no unapproved image binding',()=>{
 const route=read('web/src/pages/figures/[slug].astro');
 assert.match(route,/import \{yemojaLivingProfile\}/);
 assert.match(route,/f.slug==='yemoja'\?yemojaLivingProfile/);
 const art=read('web/src/lib/approved-figure-illustrations.ts');
 assert.doesNotMatch(art,/\byemoja\s*:\s*\{/);
});
