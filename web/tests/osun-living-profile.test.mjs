import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {osunLivingProfile as p} from '../src/lib/osun-living-profile.ts';
const root=resolve(import.meta.dirname,'../..');
const read=path=>readFileSync(resolve(root,path),'utf8');

test('Ọ̀ṣun page has full narrative sections, distinct tellings and references',()=>{
 assert.equal(p.slug,'osun');
 assert.ok(p.intro.length>200);
 assert.deepEqual(p.sections.map(s=>s.id),['river','creation','character','symbols','grove','diaspora','voices']);
 assert.ok(p.sections.every(s=>s.paragraphs.length>=3));
 assert.ok(p.tales.length>=3);
 assert.ok(p.questions.length>=4);
 assert.ok(p.references.length>=3);
});
test('profile distinguishes sacred meaning, variant practices and artistic reconstruction',()=>{
 const text=p.sections.flatMap(s=>s.paragraphs).join(' ');
 assert.match(text,/seventeen primordial beings/);
 assert.match(text,/World Heritage List in 2005/);
 assert.match(text,/Ochún/);
 assert.match(text,/Oxum/);
 assert.match(p.notes.join(' '),/not a historical photograph/);
 assert.match(p.notes.join(' '),/not yet been approved/);
 const route=read('web/src/pages/figures/[slug].astro');
 assert.match(route,/import \{osunLivingProfile\}/);
 assert.match(route,/f.slug==='osun'\?osunLivingProfile/);
 const record=read('docs/OSUN_ILLUSTRATION_REVIEW.md');
 assert.match(record,/do \*\*not\*\* upload/i);
});
