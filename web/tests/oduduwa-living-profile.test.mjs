import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {oduduwaLivingProfile as p} from '../src/lib/oduduwa-living-profile.ts';
const root=resolve(import.meta.dirname,'../..');
const read=(path)=>readFileSync(resolve(root,path),'utf8');

test('Odùduwà article is a detailed reader profile with multiple distinct named accounts',()=>{
 assert.equal(p.slug,'oduduwa');
 assert.ok(p.intro.length>220);
 assert.ok(p.sections.length>=5);
 assert.ok(p.sections.every(x=>x.paragraphs.length>=3));
 assert.ok(p.tales.length>=3);
 assert.ok(p.questions.length>=4);
 assert.ok(p.references.length>=3);
 const ids=p.sections.map(x=>x.id);
 assert.deepEqual(ids,['two-accounts','land','crowns','gender','identity']);
});

test('Origin traditions are differentiated from claims of corroborated history',()=>{
 const text=p.sections.map(x=>x.paragraphs.join(' ')).join(' ');
 assert.match(text,/creation/i);
 assert.match(text,/female divine presence/);
 assert.match(text,/beaded crowns/);
 assert.match(text,/not.*proven facts/);
 assert.match(text,/not.*legal test/);
 assert.match(p.notes.join(' '),/disallowed historical source/);
 assert.match(p.notes.join(' '),/AI-generated artistic interpretation/);
});

test('Detailed figure route is wired to Odùduwà without changing the existing Èṣù page',()=>{
 const route=read('web/src/pages/figures/[slug].astro');
 assert.match(route,/import \{oduduwaLivingProfile\}/);
 assert.match(route,/f.slug==='oduduwa'\?oduduwaLivingProfile/);
 assert.match(route,/isEsu\?/);
});
