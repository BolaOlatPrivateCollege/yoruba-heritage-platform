import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  contributionTypes,learningPaths,ageGroups,displayCredits,storyContexts,spokenLanguages,
  validatePrototypeDraft,explainPreviewOnly
} from '../src/lib/community-intake.ts';

const example=()=>({
  type:'another-version',context:'esu-hat-two-views',
  title:'Two sides of a tale',
  account:'In this fictional example, two friends heard the same story and remembered different endings.',
  broadPlace:'Imagined town',language:'yo',howLearned:'family',
  ageGroup:'adult',credit:'anonymous',rightsAcknowledged:true
});
test('all Community Voices entry types remain explicit, no academic truth/falsity vote',()=>{
  assert.deepEqual(contributionTypes.map(x=>x.id),[
    'another-version','correction','firsthand-memory','inherited-account','folktale','belief','question','original-fiction'
  ]);
  assert.ok(contributionTypes.every(x=>x.label.length>9&&x.prompt.length>20));
  assert.equal(new Set(contributionTypes.map(x=>x.id)).size,contributionTypes.length);
  for(const t of contributionTypes)assert.doesNotMatch(t.prompt,/true or false|scholarly approval|scientific proof/i);
});
test('future protected attributes are preferences, not an actual stored consent record',()=>{
  assert.ok(ageGroups.some(x=>x.id==='under18'));
  assert.ok(displayCredits.some(x=>x.id==='anonymous'));
  assert.equal(storyContexts.length,4);
  assert.ok(learningPaths.length>=5);
  assert.ok(spokenLanguages.some(x=>x.id==='yo'));
  assert.match(explainPreviewOnly('under18'),/guardian|teacher/i);
  assert.match(explainPreviewOnly('adult'),/not a submission/);
});
test('local example validation fails closed for missing permission and unsafe enum values',()=>{
  assert.deepEqual(validatePrototypeDraft(example()),[]);
  assert.match(validatePrototypeDraft({...example(),rightsAcknowledged:false}).join(' '),/permission/i);
  assert.match(validatePrototypeDraft({...example(),title:'x',account:'short'}).join(' '),/title.*account/i);
  assert.match(validatePrototypeDraft({...example(),broadPlace:'x'.repeat(91)}).join(' '),/90/);
  assert.match(validatePrototypeDraft({...example(),type:'unknown'}).join(' '),/Choose how/);
  assert.match(validatePrototypeDraft({...example(),ageGroup:'unknown'}).join(' '),/age band/);
});
test('prototype client has no submission, collection or unsafe dynamic HTML sink',()=>{
  const client=readFileSync('src/lib/community-preview-client.ts','utf8');
  const page=readFileSync('src/pages/community/share.astro','utf8');
  const executable=client.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
  assert.doesNotMatch(executable,/\bfetch\s*\(|sendBeacon|XMLHttpRequest|localStorage|sessionStorage|document\.cookie|indexedDB|WebSocket|\.submit\s*\(|innerHTML|insertAdjacentHTML|navigator\.clipboard/i);
  assert.doesNotMatch(page,/<form\b|<input[^>]*type="file"|<iframe\b|<audio\b/i);
  assert.doesNotMatch(page,/action\s*=/i);
  assert.match(client,/\.textContent=/);
  assert.match(page,/nothing is submitted|not a live submission form/i);
  assert.match(page,/PRIVATE WALKTHROUGH/);
});
