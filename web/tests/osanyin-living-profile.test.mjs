import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {osanyinLivingProfile as p} from '../src/lib/osanyin-living-profile.ts';
import {heritageFigures} from '../src/lib/heritage-figures.ts';
test('Òsányìn has a substantial independent cultural profile',()=>{
 assert.equal(p.slug,'osanyin');
 assert.equal(p.sections.length,10);
 assert.ok(p.sections.every(s=>s.paragraphs.length>=3));
 assert.equal(p.tales.length,3);
 assert.ok(p.questions.length>=4);
 assert.ok(p.references.length>=4);
 assert.ok(heritageFigures.some(f=>f.slug==='osanyin'));
 const route=readFileSync(new URL('../src/pages/figures/[slug].astro',import.meta.url),'utf8');
 assert.match(route,/f.slug==='osanyin'\?osanyinLivingProfile/);
});
test('documented iron staff variation and medical boundaries remain explicit',()=>{
 const prose=p.sections.flatMap(s=>s.paragraphs).join(' ');
 assert.match(prose,/Smithsonian/);
 assert.match(prose,/sixteen/);
 assert.match(p.intro,/not automatically safe/);
 assert.match(p.notes.join(' '),/not medical guidance/);
 assert.match(p.notes.join(' '),/No figure illustration is approved/);
});
