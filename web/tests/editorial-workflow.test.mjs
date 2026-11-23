import test from 'node:test';
import assert from 'node:assert/strict';
import {planEditorialChange} from '../src/lib/editorial-workflow.ts';

const owner={id:'97c39bda-f233-4264-8e4c-63385624159b',role:'owner'};
const editor={id:'248dce42-71f2-4504-a9a2-713cc3e86c86',role:'editor'};
const reviewer={id:'d97e7d69-16b3-4973-9d89-c932d365ef57',role:'reviewer'};
const sample=()=>({
 id:'b2c611df-f4f2-4e18-9c66-24320d8fcbf7',slug:'itan-ile-ife',
 contentKind:'story',genre:'imaginative-retelling',primaryLanguage:'yo',
 editions:[{language:'yo',title:'Ìtàn Ilé-Ifẹ̀',summary:'Àwọn ọ̀rọ̀ ìtàn wa ń tẹ̀síwájú.',
  bodyMarkdown:'Ẹ jẹ́ ká tẹ́tí sí àwọn ìtàn tí a pín ní àwọn agbègbè Yorùbá.'}],
 provenance:{description:'Original literary fiction, not attributed oral testimony.',sourceCategory:'original-author'},
 media:[],editorialState:'draft',revision:1,lastEditorId:editor.id,rightsReview:'cleared'
});
const call=(record,actor,kind,extras={})=>planEditorialChange(record,actor,{kind,expectedRevision:record.revision,...extras});
test('a Yorùbá edit returns immutable content revision and audit intent',()=>{
 const before=sample();
 const editions=structuredClone(before.editions);
 editions[0].title='Ìtàn Ilé-Ifẹ̀ àti Àṣà';
 const {record,audit}=call(before,editor,'revise_draft',{editions});
 assert.equal(record.editions[0].title,'Ìtàn Ilé-Ifẹ̀ àti Àṣà');
 assert.equal(before.editions[0].title,'Ìtàn Ilé-Ifẹ̀');
 assert.equal(record.revision,2);
 assert.deepEqual([audit.fromRevision,audit.toRevision],[1,2]);
 assert.equal(audit.actorId,editor.id);
});
test('optimistic concurrency prevents lost edits',()=>{
 assert.throws(()=>planEditorialChange(sample(),editor,
  {kind:'submit_for_review',expectedRevision:9}),/Revision conflict/);
});
test('review cannot self-approve or accept uncleared rights',()=>{
 const inReview={...sample(),editorialState:'in_review'};
 assert.throws(()=>call(inReview,editor,'approve_review'),/Review permission denied/);
 assert.throws(()=>call(inReview,{...reviewer,id:editor.id},'approve_review'),/Author cannot approve/);
 assert.throws(()=>call({...inReview,rightsReview:'pending'},reviewer,'approve_review'),/Rights review/);
});
test('reviewer can approve independently reviewed original fiction, but not publish it',()=>{
 const start=sample();
 const submitted=call(start,editor,'submit_for_review').record;
 const approved=call(submitted,reviewer,'approve_review');
 assert.equal(approved.record.editorialState,'approved');
 assert.equal(approved.record.revision,3);
 assert.equal(approved.audit.action,'approve_review');
 assert.throws(()=>call(approved.record,owner,'publish'),/Unknown editorial action/);
});
test('a reviewer cannot edit text, and editors cannot approve',()=>{
 assert.throws(()=>call(sample(),reviewer,'revise_draft',{editions:sample().editions}),/Editing permission denied/);
 assert.throws(()=>call({...sample(),editorialState:'in_review'},editor,'return_to_draft'),/Review permission denied/);
});
test('community testimony cannot be approved by this prototype',()=>{
 const inReview={...sample(),editorialState:'in_review',
  provenance:{description:'Permission evidence is not verified by this module.',sourceCategory:'community-oral-account'}};
 assert.throws(()=>call(inReview,reviewer,'approve_review'),/consent workflow/);
});
test('published and withdrawn records are immutable',()=>{
 for(const editorialState of ['published','withdrawn']){
  const r={...sample(),editorialState};
  assert.throws(()=>call(r,owner,'submit_for_review'),/immutable/);
 }
});
test('submission, return, and invalid role checks preserve draft protections',()=>{
 const submitted=call(sample(),owner,'submit_for_review').record;
 const returned=call(submitted,reviewer,'return_to_draft').record;
 assert.equal(returned.editorialState,'draft');
 assert.throws(()=>call(sample(),{...owner,role:'visitor'},'submit_for_review'),/Unknown editorial role/);
});
