import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {oyaLivingProfile as p} from '../src/lib/oya-living-profile.ts';
test('Ọya retains nine substantial sections and attributed story variants',()=>{
assert.equal(p.slug,'oya');
assert.equal(p.sections.length,9);
assert.ok(p.sections.every(s=>s.paragraphs.length>=3));
assert.equal(p.tales.length,3);
assert.ok(p.references.length>=3);
assert.match(p.sections.flatMap(s=>s.paragraphs).join(' '),/not an established origin of all masquerades/);
assert.match(readFileSync(new URL('../src/pages/figures/[slug].astro',import.meta.url),'utf8'),/f.slug==='oya'\?oyaLivingProfile/);
});
