import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {olokunLivingProfile as p} from '../src/lib/olokun-living-profile.ts';
import {heritageFigures} from '../src/lib/heritage-figures.ts';
test('Olókun has extensive, locally qualified sections and community questions',()=>{
 assert.equal(p.slug,'olokun');
 assert.ok(p.intro.length>230);
 assert.equal(p.sections.length,9);
 assert.ok(p.sections.every(s=>s.paragraphs.length>=3));
 assert.equal(p.tales.length,3);
 assert.ok(p.questions.length>=4);
 assert.ok(p.references.length>=4);
 assert.ok(heritageFigures.some(f=>f.slug==='olokun'));
});
test('archaeology is not mistaken for proof of a sacred person or an authenticated head',()=>{
 const text=p.sections.flatMap(s=>s.paragraphs).join(' ');
 assert.match(text,/glassmaking|glass production|glass-making/i);
 assert.match(text,/not archaeological proof/);
 assert.match(text,/bronze head/);
 assert.match(p.notes.join(' '),/not.*verified/i);
 const route=readFileSync(new URL('../src/pages/figures/[slug].astro',import.meta.url),'utf8');
 assert.match(route,/f.slug==='olokun'\?olokunLivingProfile/);
 const record=readFileSync(new URL('../../docs/OLOKUN_ILLUSTRATION_REVIEW.md',import.meta.url),'utf8');
 assert.match(record,/Owner approved the generated sepia Olókun illustration/);
});
