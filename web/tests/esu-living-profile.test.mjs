import test from 'node:test';
import assert from 'node:assert/strict';
import {esuLivingProfile as esu} from '../src/lib/esu-living-profile.ts';

test('Èṣù reader explanation includes the four owner-requested living traditions and roles',()=>{
  assert.equal(esu.roles.length,4);
  assert.deepEqual(esu.roles.map(x=>x.title),[
    'Divine messenger','Crossroads and choice','Order, balance and consequences','Trickster, perspective and surprise'
  ]);
  assert.match(esu.lead,/major òrìṣà/i);
  assert.match(esu.roles[0].body,/Olódùmarè/);
  assert.match(esu.roles[1].body,/crossroads|oríta/);
  assert.match(esu.roles[2].body,/moral or sacred order/);
  assert.match(esu.roles[3].body,/hat/);
});
test('historic translation and varied name explanations are discussed without asserting one universal derivation',()=>{
  assert.match(esu.translation.story,/Samuel Ajayi Crowther/);
  assert.match(esu.translation.story,/nineteenth-century missionary translation/);
  assert.match(esu.translation.opening,/Satan or the devil/);
  assert.match(esu.language.text,/Some|gathering or encircling/);
  assert.equal(esu.names.items.length,4);
  assert.equal(esu.waysPeopleSpeak.length,3);
});
test('the owner-facing cultural page is intended to invite community discussion rather than pretend a submission form is live',()=>{
  assert.equal(esu.discussion.prompts.length,4);
  assert.match(esu.discussion.title,/grow up hearing/);
  assert.match(esu.discussion.note,/moderation|private preview|contribution/i);
});