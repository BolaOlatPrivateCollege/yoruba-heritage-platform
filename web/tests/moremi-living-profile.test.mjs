import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {moremiLivingProfile as p} from '../src/lib/moremi-living-profile.ts';
import {heritageFigures} from '../src/lib/heritage-figures.ts';

test('Mọremí reader builds full community-aware profile without a duplicate slug',()=>{
 assert.equal(p.slug,'moremi-ajasoro');
 assert.equal(p.sections.length,9);
 assert.ok(p.sections.every(s=>s.paragraphs.length>=3));
 assert.ok(p.tales.length>=3);
 assert.ok(p.questions.length>=5);
 assert.ok(p.references.length>=5);
 assert.equal(heritageFigures.filter(f=>f.slug===p.slug).length,1);
 const route=readFileSync(new URL('../src/pages/figures/[slug].astro',import.meta.url),'utf8');
 assert.match(route,/f.slug==='moremi-ajasoro'\?moremiLivingProfile/);
});

test('Ugbò identity, Olúorogbo sacrifice and visual provenance remain qualified',()=>{
 const prose=p.sections.flatMap(s=>s.paragraphs).join(' ');
 assert.match(prose,/contemporary southeastern Nigerian Igbo identity/);
 assert.match(prose,/not a dated eyewitness battle report/);
 assert.match(prose,/not.*parents should imitate/);
 assert.match(p.notes.join(' '),/not an archival portrait/);
 const approval=readFileSync(new URL('../../docs/MOREMI_ILLUSTRATION_REVIEW.md',import.meta.url),'utf8');
 assert.match(approval,/not yet approved/);
});
