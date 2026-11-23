import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,stat,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {openPrivateDraftRepository} from '../../cms/private-draft-repository.mjs';

const editor={id:'248dce42-71f2-4504-a9a2-713cc3e86c86',role:'editor'};
const reviewer={id:'d97e7d69-16b3-4973-9d89-c932d365ef57',role:'reviewer'};
const owner={id:'97c39bda-f233-4264-8e4c-63385624159b',role:'owner'};
function draft(){
 return {
  id:'b2c611df-f4f2-4e18-9c66-24320d8fcbf7',slug:'itan-ile-ife',
  contentKind:'story',genre:'original-fiction',primaryLanguage:'yo',
  editions:[{language:'yo',title:'Ìtàn Ilé-Ifẹ̀',
   summary:'Ìtàn àwọn ènìyàn láti ìlú kan.',
   bodyMarkdown:'Àwọn èèyàn sọ ìtàn Yorùbá pẹ̀lú ìfẹ́ àti ìbáṣepọ̀.'}],
  provenance:{description:'Original fictional sample; no elder interview was performed.',sourceCategory:'original-author'},
  media:[],editorialState:'draft',revision:1,lastEditorId:editor.id,rightsReview:'cleared'
 };
}
async function withStore(fn){
 const path=await mkdtemp(join(tmpdir(),'asa-private-cms-'));
 try{await fn(path,await openPrivateDraftRepository(path))}
 finally{await rm(path,{recursive:true,force:true})}
}
test('private store persists Yoruba drafts and audit across process-like reopen',async()=>{
 await withStore(async(path,store)=>{
  const created=await store.createDraft(editor,draft());
  assert.equal(created.editions[0].title,'Ìtàn Ilé-Ifẹ̀');
  created.editions[0].title='External mutation';
  assert.equal((await store.getRecord(owner,draft().id)).editions[0].title,'Ìtàn Ilé-Ifẹ̀');
  const reopened=await openPrivateDraftRepository(path);
  assert.equal((await reopened.getRecord(owner,draft().id)).editions[0].title,'Ìtàn Ilé-Ifẹ̀');
  assert.equal((await reopened.auditHistory(reviewer))[0].action,'create_draft');
  const stats=await stat(join(path,'editorial-private-state.json'));
  if(process.platform!=='win32')assert.equal(stats.mode&0o777,0o600);
 });
});
test('revision conflicts are rejected and do not advance persisted data',async()=>{
 await withStore(async(path,store)=>{
  await store.createDraft(editor,draft());
  const action={kind:'submit_for_review',expectedRevision:1};
  await store.applyAction(editor,draft().id,action);
  await assert.rejects(store.applyAction(editor,draft().id,action),/Revision conflict/);
  const reopened=await openPrivateDraftRepository(path);
  assert.equal((await reopened.getRecord(owner,draft().id)).revision,2);
  assert.equal((await reopened.auditHistory(owner)).length,2);
 });
});
test('untrusted, unauthorised and mismatched author cannot create a draft',async()=>{
 await withStore(async(path,store)=>{
  await assert.rejects(store.createDraft({id:editor.id,role:'visitor'},draft()),/actor/);
  await assert.rejects(store.createDraft(reviewer,draft()),/creation denied/);
  await assert.rejects(store.createDraft(owner,draft()),/authenticated author/);
  await store.createDraft(editor,draft());
  await assert.rejects(store.createDraft(editor,draft()),/Duplicate/);
  await assert.rejects(store.auditHistory(editor),/Audit access denied/);
 });
});
test('only independent reviewers can approve after cleared rights',async()=>{
 await withStore(async(path,store)=>{
  await store.createDraft(editor,draft());
  await store.applyAction(editor,draft().id,{kind:'submit_for_review',expectedRevision:1});
  await assert.rejects(store.applyAction(editor,draft().id,{kind:'approve_review',expectedRevision:2}),/Review permission denied/);
  const result=await store.applyAction(reviewer,draft().id,{kind:'approve_review',expectedRevision:2});
  assert.equal(result.editorialState,'approved');
  await assert.rejects(store.applyAction(owner,draft().id,{kind:'publish',expectedRevision:3}),/Unknown editorial action/);
  const reopened=await openPrivateDraftRepository(path);
  assert.equal((await reopened.getRecord(owner,draft().id)).editorialState,'approved');
  assert.equal((await reopened.auditHistory(owner)).length,3);
 });
});

test('storage refuses a directory in a public build tree',async()=>{
 const root=await mkdtemp(join(tmpdir(),'asa-cms-public-test-'));
 try{
  await assert.rejects(openPrivateDraftRepository(join(root,'dist','cms')),/public build directory/);
  await assert.rejects(openPrivateDraftRepository(join(root,'public','cms')),/public build directory/);
 }finally{await rm(root,{recursive:true,force:true})}
});
test('concurrent actions on one instance cannot lose a revision',async()=>{
 await withStore(async(path,store)=>{
  await store.createDraft(editor,draft());
  const action={kind:'submit_for_review',expectedRevision:1};
  const responses=await Promise.allSettled([
   store.applyAction(editor,draft().id,action),
   store.applyAction(editor,draft().id,action)
  ]);
  assert.equal(responses.filter(x=>x.status==='fulfilled').length,1);
  assert.equal(responses.filter(x=>x.status==='rejected').length,1);
  const again=await openPrivateDraftRepository(path);
  assert.equal((await again.getRecord(owner,draft().id)).revision,2);
  assert.equal((await again.auditHistory(owner)).length,2);
 });
});
