import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateOwnerPublication} from '../src/lib/editorial-release-gate.ts';

const ownerId='97c39bda-f233-4264-8e4c-63385624159b';
const recordId='b2c611df-f4f2-4e18-9c66-24320d8fcbf7';
const editorId='248dce42-71f2-4504-a9a2-713cc3e86c86';
const reviewerId='d97e7d69-16b3-4973-9d89-c932d365ef57';
function context(){
 return {
  actor:{userId:ownerId,role:'owner',active:true,mfaVerified:true,freshOwnerMfaVerified:true},
  ownerUserId:ownerId,
  record:{id:recordId,revision:4,state:'approved',rightsCleared:true,mediaRightsCleared:true,
    consentCleared:true,independentReviewRequired:true,reviewerId,authorId:editorId,lastEditorId:editorId},
  intent:{recordId,expectedRevision:4,confirmAction:'PUBLISH_APPROVED_REVISION'}
 };
}
test('owner can authorise only the specifically approved revision',()=>{
 assert.deepEqual(evaluateOwnerPublication(context()),
  {allowed:true,recordId,expectedRevision:4});
});
test('other users, a fake owner role, disabled account and no MFA are refused',()=>{
 for(const [part,value] of [
  ['userId',editorId],['role','editor'],['active',false],['mfaVerified',false],['freshOwnerMfaVerified',false]
 ]){
  const c=context();c.actor[part]=value;
  assert.equal(evaluateOwnerPublication(c).allowed,false,part);
 }
});
test('explicit confirmation and fresh session are required',()=>{
 const c=context();
 c.intent.confirmAction='save_draft';
 assert.equal(evaluateOwnerPublication(c).allowed,false);
 const d=context();d.actor.freshOwnerMfaVerified=false;
 assert.equal(evaluateOwnerPublication(d).allowed,false);
 const e=context();e.intent.extraRole='owner';
 assert.equal(evaluateOwnerPublication(e).allowed,false);
});
test('unapproved, withdrawn, stale or different records cannot be published',()=>{
 for(const state of ['draft','in_review','published','withdrawn']){
  const c=context();c.record.state=state;
  assert.equal(evaluateOwnerPublication(c).allowed,false,state);
 }
 const c=context();c.intent.expectedRevision=3;
 assert.equal(evaluateOwnerPublication(c).allowed,false);
 const d=context();d.intent.recordId=editorId;
 assert.equal(evaluateOwnerPublication(d).allowed,false);
});
test('missing rights or independent approval blocks manual publication',()=>{
 for(const key of ['rightsCleared','mediaRightsCleared','consentCleared']){
  const c=context();c.record[key]=false;
  assert.equal(evaluateOwnerPublication(c).allowed,false,key);
 }
 const c=context();c.record.reviewerId=editorId;
 assert.equal(evaluateOwnerPublication(c).allowed,false);
});
