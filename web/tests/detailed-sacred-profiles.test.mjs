import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {detailedSacredProfiles} from '../src/lib/detailed-sacred-profiles.ts';
const root=resolve(import.meta.dirname,'../..');
const reader=(p)=>readFileSync(resolve(root,p),'utf8');

test('Ọ̀rúnmìlà and Ọbàtálá both have substantial structured living profiles',()=>{
 assert.deepEqual(Object.keys(detailedSacredProfiles).sort(),['obatala','orunmila']);
 for(const profile of Object.values(detailedSacredProfiles)){
  assert.ok(profile.lead.length>80);
  assert.ok(profile.intro.length>150);
  assert.ok(profile.sections.length>=4);
  assert.ok(profile.sections.every(s=>s.paragraphs.length>=2));
  assert.ok(profile.tales.length>0);
  assert.ok(profile.references.length>=2);
  assert.ok(profile.questions.length>=3);
  assert.ok(profile.sections.every(s=>s.id&&s.heading));
 }
});
test('religious variants remain labelled and sourced, no mistaken claim of archival image identity',()=>{
 const orunmila=detailedSacredProfiles.orunmila;
 assert.match(orunmila.sections.map(x=>x.paragraphs.join(' ')).join(' '),/256 odù/);
 assert.match(orunmila.notes.join(' '),/not been authenticated/);
 const obatala=detailedSacredProfiles.obatala;
 assert.match(obatala.tales[0].account,/not an independently verified date or universally attested account/);
 const route=reader('web/src/pages/figures/[slug].astro');
 assert.match(route,/detailedSacredProfiles/);
 assert.match(route,/Stories and their different versions/);
 assert.match(route,/Where this account comes from/);
});
