import test from 'node:test';
import assert from 'node:assert/strict';
import {archive} from '../src/lib/archive.ts';
import {heritageFigures,figureHref} from '../src/lib/heritage-figures.ts';

test('all 24 preserved Sacred World records have distinct readable cultural pages and three hero entries',()=>{
  assert.equal(archive.sacredProfiles.length,24);
  assert.ok(heritageFigures.length>=27);
  assert.equal(new Set(heritageFigures.map(x=>x.slug)).size,heritageFigures.length);
  assert.deepEqual(heritageFigures.slice(-3).map(x=>x.slug),['moremi-ajasoro','lisabi','efunsetan-aniwura']);
  assert.deepEqual(heritageFigures.slice(0,24).map(x=>x.slug),archive.sacredProfiles.map(x=>x.id.replace(/^sac-/,'')));
  for(const f of heritageFigures){
    assert.ok(f.name.length>1);
    assert.ok(f.scope.length>4);
    assert.ok(f.beliefs.length>=1);
    assert.ok(f.beliefs.every(x=>x.length>15));
    assert.ok(f.differences.length>20);
    assert.ok(f.question.endsWith('?'));
    assert.ok(f.sources.length>=1);
    assert.ok(f.sources.every(x=>new URL(x.url).protocol==='https:'));
    assert.equal(figureHref(f.slug),'/figures/'+f.slug+'/');
  }
});
test('religious classifications and human heroes are not conflated',()=>{
  const esu=heritageFigures.find(x=>x.slug==='esu');
  const olodumare=heritageFigures.find(x=>x.slug==='olodumare');
  const moremi=heritageFigures.find(x=>x.slug==='moremi-ajasoro');
  const efunsetan=heritageFigures.find(x=>x.slug==='efunsetan-aniwura');
  assert.equal(esu?.kind,'Òrìṣà');
  assert.equal(olodumare?.kind,'Supreme source');
  assert.match(esu?.beliefs.join(' ')??'',/messag|communication/i);
  assert.match(esu?.differences??'',/Christian|Satan/);
  assert.equal(esu?.storyHref,'/tales/esu-hat-two-views/');
  assert.equal(olodumare?.storyHref,'/tales/olodumare-many-meanings/');
  assert.match(moremi?.kind??'',/oral tradition/);
  assert.equal(efunsetan?.kind,'Historical person');
});
test('unrecognised and unsafe figure identifiers fail closed',()=>{
  assert.throws(()=>figureHref('../unreviewed'),/Unknown figure slug/);
  assert.throws(()=>figureHref('fake-orisa'),/Unknown figure slug/);
});