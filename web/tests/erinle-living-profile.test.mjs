import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {erinleLivingProfile as p} from '../src/lib/erinle-living-profile.ts';
import {heritageFigures} from '../src/lib/heritage-figures.ts';

test('Èrìnlẹ̀ has a deep, navigable, community-centred long-form profile',()=>{
 assert.equal(p.slug,'erinle');
 assert.equal(p.sections.length,9);
 assert.ok(p.sections.every(s=>s.paragraphs.length>=3));
 assert.equal(p.tales.length,3);
 assert.ok(p.questions.length>=5);
 assert.ok(p.references.length>=4);
 assert.ok(heritageFigures.some(f=>f.slug==='erinle'));
 const route=readFileSync(new URL('../src/pages/figures/[slug].astro',import.meta.url),'utf8');
 assert.match(route,/f.slug==='erinle'\?erinleLivingProfile/);
});

test('history, ritual objects and unapproved generated artwork stay distinct',()=>{
 const prose=p.sections.flatMap(s=>s.paragraphs).join(' ');
 assert.match(prose,/Metropolitan Museum/);
 assert.match(prose,/North Carolina Museum/);
 assert.match(prose,/not a geological explanation/);
 assert.match(prose,/not clinical evidence/);
 assert.match(p.notes.join(' '),/not uploaded/);
 const doc=readFileSync(new URL('../../docs/ERINLE_ILLUSTRATION_REVIEW.md',import.meta.url),'utf8');
 assert.match(doc,/not yet owner-approved/);
});
