import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {orisaOkoLivingProfile as p} from '../src/lib/orisa-oko-living-profile.ts';
import {heritageFigures} from '../src/lib/heritage-figures.ts';

test('Ọ̀rìṣà Oko has a navigable, substantial farming and community profile',()=>{
 assert.equal(p.slug,'orisa-oko');
 assert.equal(p.sections.length,10);
 assert.ok(p.sections.every(s=>s.paragraphs.length>=3));
 assert.equal(p.tales.length,3);
 assert.ok(p.questions.length>=5);
 assert.ok(p.references.length>=4);
 assert.ok(heritageFigures.some(f=>f.slug==='orisa-oko'));
 const route=readFileSync(new URL('../src/pages/figures/[slug].astro',import.meta.url),'utf8');
 assert.match(route,/f.slug==='orisa-oko'\?orisaOkoLivingProfile/);
});

test('museum evidence, disputed origin tales and visual approvals stay distinct',()=>{
 const prose=p.sections.flatMap(s=>s.paragraphs).join(' ');
 assert.match(prose,/Smithsonian/);
 assert.match(prose,/shrine/);
 assert.match(prose,/not independently verified historical/i);
 assert.match(p.notes.join(' '),/witchcraft accusations/);
 assert.match(p.notes.join(' '),/not.*factual authority/);
 const approval=readFileSync(new URL('../../docs/ORISA_OKO_ILLUSTRATION_REVIEW.md',import.meta.url),'utf8');
 assert.match(approval,/Not approved for publication/);
});
