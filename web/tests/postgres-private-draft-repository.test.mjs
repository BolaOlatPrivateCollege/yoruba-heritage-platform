import test from 'node:test';
import assert from 'node:assert/strict';
import {createPostgresDraftRepository} from '../../cms/postgres-private-draft-repository.mjs';

const editor={id:'248dce42-71f2-4504-a9a2-713cc3e86c86',role:'editor'};
const reviewer={id:'d97e7d69-16b3-4973-9d89-c932d365ef57',role:'reviewer'};
const documentId='b2c611df-f4f2-4e18-9c66-24320d8fcbf7';
const draft=()=>({
  id:documentId,slug:'itan-ile-ife',contentKind:'story',genre:'original-fiction',
  primaryLanguage:'yo',editorialState:'draft',revision:1,lastEditorId:editor.id,
  rightsReview:'cleared',
  editions:[{language:'yo',title:'Ìtàn Ilé-Ifẹ̀',
    summary:'Àwọn ìtàn Yorùbá nínú ìwé yìí.',
    bodyMarkdown:'Ìtàn ìròyìn kì í ṣe ìjẹ́rìí àgbà; ó jẹ́ àpẹẹrẹ ìtàn aláròsọ.'}],
  provenance:{sourceCategory:'original-author',
    description:'An original invented story; not a collected oral-history testimony.'},
  media:[]
});
function makePool({failOn='',stored=draft(),updateCount=1}={}){
  const calls=[];
  let releases=0;
  const client={
    async query(sql,values=[]){
      calls.push({sql,values});
      if(failOn&&sql.includes(failOn))throw new Error('Database write refused');
      if(sql.startsWith('SELECT * FROM editorial_private.content_records')){
        return {rows:[{
          id:stored.id,slug:stored.slug,kind:stored.contentKind,genre:stored.genre,
          primary_language:stored.primaryLanguage,state:stored.editorialState,
          revision:stored.revision,last_editor_id:stored.lastEditorId,rights_status:stored.rightsReview
        }]};
      }
      if(sql.startsWith('SELECT language,title,summary'))return {rows:stored.editions.map(e=>({
        language:e.language,title:e.title,summary:e.summary,body_markdown:e.bodyMarkdown
      }))};
      if(sql.startsWith('SELECT source_category'))return {rows:[{
        source_category:stored.provenance.sourceCategory,description:stored.provenance.description,
        broad_community:null,attributed_teller:null
      }]};
      if(sql.startsWith('SELECT m.id,m.kind'))return {rows:[]};
      if(sql.startsWith('UPDATE editorial_private.content_records'))return {rowCount:updateCount,rows:[]};
      return {rowCount:1,rows:[]};
    },
    release(){releases++}
  };
  return {calls,get releases(){return releases},async connect(){return client}};
}
test('creating a private Yoruba draft writes data, snapshot and audit in one transaction',async()=>{
 const pool=makePool();
 const created=await createPostgresDraftRepository(pool).createDraft(editor,draft());
 assert.equal(created.editions[0].title,'Ìtàn Ilé-Ifẹ̀');
 assert.equal(pool.calls[0].sql,'BEGIN');
 assert.equal(pool.calls.at(-1).sql,'COMMIT');
 assert.equal(pool.releases,1);
 assert.ok(pool.calls.some(x=>x.sql.includes('INSERT INTO editorial_private.content_revisions')));
 assert.ok(pool.calls.some(x=>x.sql.includes('INSERT INTO editorial_private.audit_events')));
 assert.equal(pool.calls.some(x=>x.sql==='ROLLBACK'),false);
 assert.equal(pool.calls.find(x=>x.sql.includes('content_editions(')).values[2],'Ìtàn Ilé-Ifẹ̀');
});
test('a failed database write rolls back content and audit as a unit',async()=>{
 const pool=makePool({failOn:'INSERT INTO editorial_private.audit_events'});
 await assert.rejects(createPostgresDraftRepository(pool).createDraft(editor,draft()),/Database write refused/);
 assert.equal(pool.calls.at(-1).sql,'ROLLBACK');
 assert.equal(pool.calls.some(x=>x.sql==='COMMIT'),false);
 assert.equal(pool.releases,1);
});
test('unauthorised draft creation never connects to database',async()=>{
 const pool=makePool();
 await assert.rejects(createPostgresDraftRepository(pool).createDraft(reviewer,draft()),/creation denied/);
 assert.equal(pool.calls.length,0);
});
test('submitted review uses locked record and revision-controlled update',async()=>{
 const pool=makePool();
 const result=await createPostgresDraftRepository(pool).applyAction(editor,documentId,
   {kind:'submit_for_review',expectedRevision:1});
 assert.equal(result.editorialState,'in_review');
 assert.equal(result.revision,2);
 assert.ok(pool.calls.some(x=>x.sql.includes('FOR UPDATE')));
 const update=pool.calls.find(x=>x.sql.startsWith('UPDATE editorial_private.content_records'));
 assert.equal(update.values[5],1);
 assert.equal(pool.calls.at(-1).sql,'COMMIT');
});
test('optimistic revision conflict aborts the entire transaction',async()=>{
 const pool=makePool({updateCount:0});
 await assert.rejects(createPostgresDraftRepository(pool).applyAction(editor,documentId,
   {kind:'submit_for_review',expectedRevision:1}),/Revision conflict/);
 assert.equal(pool.calls.at(-1).sql,'ROLLBACK');
});
test('approval is never possible without independent reviewer and cleared rights',async()=>{
 const inReview={...draft(),editorialState:'in_review',revision:2};
 const pool=makePool({stored:inReview});
 await assert.rejects(createPostgresDraftRepository(pool).applyAction(editor,documentId,
   {kind:'approve_review',expectedRevision:2}),/Review permission denied/);
 assert.equal(pool.calls.at(-1).sql,'ROLLBACK');
 const pending=makePool({stored:{...inReview,rightsReview:'pending'}});
 await assert.rejects(createPostgresDraftRepository(pending).applyAction(reviewer,documentId,
   {kind:'approve_review',expectedRevision:2}),/Rights review not complete/);
 assert.equal(pending.calls.at(-1).sql,'ROLLBACK');
});
test('repository has no publish, upload or unauthenticated network interface',()=>{
 const repository=createPostgresDraftRepository(makePool());
 assert.deepEqual(Object.keys(repository).sort(),['applyAction','createDraft']);
});
