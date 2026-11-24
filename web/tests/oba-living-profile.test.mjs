import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {obaLivingProfile as p} from '../src/lib/oba-living-profile.ts';
import {heritageFigures} from '../src/lib/heritage-figures.ts';
test('Ọbà is an independently navigable, substantive profile',()=>{
 assert.equal(p.slug,'oba');
 assert.equal(p.sections.length,8);
 assert.ok(p.sections.every(s=>s.paragraphs.length>=3));
 assert.ok(p.tales.length>=3);
 assert.ok(p.questions.length>=4);
 assert.ok(p.references.length>=3);
 assert.ok(heritageFigures.some(f=>f.slug==='oba'));
 const route=readFileSync(new URL('../src/pages/figures/[slug].astro',import.meta.url),'utf8');
 assert.match(route,/f.slug==='oba'\?obaLivingProfile/);
});
test('sensitive material and archaeology are not presented as universal doctrine',()=>{
 const prose=p.sections.flatMap(s=>s.paragraphs).join(' ');
 assert.match(prose,/The story is not a recommendation for self-sacrifice/);
 assert.match(prose,/not an independently verified geological origin/);
 assert.match(p.notes.join(' '),/No illustration has been selected or approved/);
});
