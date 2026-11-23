import test from 'node:test';
import assert from 'node:assert/strict';
import {decideEditorialAction} from '../src/lib/editorial-workflow-policy.ts';

const sample=(overrides={})=>({
  actor:{userId:'owner-1',role:'owner'},
  action:'submit-review',currentState:'draft',
  authorId:'writer-1',lastEditorId:'writer-1',
  rightsCleared:true,mediaRightsCleared:true,consentCleared:true,
  independentReviewRequired:false,...overrides
});

test('owner can submit draft to review but cannot skip to publish',()=>{
 assert.deepEqual(decideEditorialAction(sample()),{allowed:true,nextState:'in_review'});
 assert.equal(decideEditorialAction(sample({action:'publish'})).allowed,false);
});
test('editor cannot publish, withdraw or self-grant owner privileges',()=>{
 for(const action of ['publish','withdraw','approve']){
  assert.equal(decideEditorialAction(sample({action,actor:{userId:'editor-1',role:'editor'},currentState:'approved'})).allowed,false);
 }
});
test('reviewer cannot approve authored or last-edited material when independence required',()=>{
 const base={action:'approve',currentState:'in_review',independentReviewRequired:true};
 assert.equal(decideEditorialAction(sample({...base,actor:{userId:'writer-1',role:'reviewer'}})).allowed,false);
 assert.equal(decideEditorialAction(sample({...base,actor:{userId:'second-1',role:'reviewer'}})).allowed,true);
});
test('approval requires rights, consent and media clearance',()=>{
 for(const key of ['rightsCleared','mediaRightsCleared','consentCleared']){
  assert.equal(decideEditorialAction(sample({action:'approve',currentState:'in_review',[key]:false})).allowed,false,key);
 }
});
test('published state requires independent review evidence when mandated',()=>{
 const base={action:'publish',currentState:'approved',independentReviewRequired:true};
 assert.equal(decideEditorialAction(sample(base)).allowed,false);
 assert.equal(decideEditorialAction(sample({...base,lastReviewerId:'writer-1'})).allowed,false);
 assert.deepEqual(decideEditorialAction(sample({...base,lastReviewerId:'reviewer-2'})),{allowed:true,nextState:'published'});
});
test('withdrawal is limited to owner and published material',()=>{
 assert.deepEqual(decideEditorialAction(sample({action:'withdraw',currentState:'published'})),{allowed:true,nextState:'withdrawn'});
 assert.equal(decideEditorialAction(sample({action:'withdraw',currentState:'draft'})).allowed,false);
 assert.equal(decideEditorialAction(sample({action:'withdraw',currentState:'published',actor:{userId:'editor-1',role:'editor'}})).allowed,false);
});
test('editing only allowed for drafts; create requires future storage service',()=>{
 assert.equal(decideEditorialAction(sample({action:'edit'})).allowed,true);
 assert.equal(decideEditorialAction(sample({action:'edit',currentState:'published'})).allowed,false);
 assert.equal(decideEditorialAction(sample({action:'create'})).allowed,false);
});
