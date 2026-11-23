/**
 * Real PostgreSQL integration checks, run only against a disposable CI DB.
 * Never point CMS_TEST_DATABASE_URL at a production or shared database.
 * Requires the private schema migration to have been applied beforehand.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import pg from 'pg';
import {createPostgresDraftRepository} from '../postgres-private-draft-repository.mjs';

const url=process.env.CMS_TEST_DATABASE_URL;
if(!url)throw new Error('A disposable CMS_TEST_DATABASE_URL is required');
const pool=new pg.Pool({connectionString:url,max:5,connectionTimeoutMillis:5000});
const actor={id:randomUUID(),role:'editor'};
const owner={id:randomUUID(),role:'owner'};
function makeDraft(slug='test-'+randomUUID()){
 return {
  id:randomUUID(),slug,contentKind:'story',genre:'original-fiction',
  primaryLanguage:'yo',editorialState:'draft',revision:1,lastEditorId:actor.id,
  rightsReview:'cleared',
  editions:[{
   language:'yo',title:'Ìtàn Ilé-Ifẹ̀',
   summary:'Àwọn ìtàn Yorùbá ni a ń pín.',
   bodyMarkdown:'Àṣà Yorùbá jẹ́ ohun tó níye. Èyí jẹ́ ìtàn àròsọ, kì í ṣe ẹ̀rí àgbà.'
  }],
  provenance:{sourceCategory:'original-author',
   description:'Original fictional CI fixture; no community testimony or elder interview.'},
  media:[]
 };
}
const repository=createPostgresDraftRepository(pool);

test('real PostgreSQL persists Yorùbá Unicode, immutable revisions and audit events',async()=>{
 const input=makeDraft();
 const saved=await repository.createDraft(actor,input);
 assert.equal(saved.id,input.id);
 const rows=await pool.query(
  'SELECT title,body_markdown FROM editorial_private.content_editions WHERE record_id=$1',[input.id]);
 assert.equal(rows.rows[0].title,'Ìtàn Ilé-Ifẹ̀');
 assert.match(rows.rows[0].body_markdown,/Àṣà Yorùbá/);
 const revised=await repository.applyAction(actor,input.id,{kind:'revise_draft',expectedRevision:1,
  editions:[{...input.editions[0],title:'Ìtàn Ilé-Ifẹ̀ àti Àṣà'}]});
 assert.equal(revised.revision,2);
 const records=await pool.query('SELECT state,revision FROM editorial_private.content_records WHERE id=$1',[input.id]);
 assert.deepEqual(records.rows[0],{state:'draft',revision:2});
 const audits=await pool.query('SELECT action,to_revision FROM editorial_private.audit_events WHERE record_id=$1 ORDER BY to_revision',[input.id]);
 assert.deepEqual(audits.rows.map(row=>row.action),['create_draft','revise_draft']);
 const history=await pool.query('SELECT revision,snapshot FROM editorial_private.content_revisions WHERE record_id=$1 ORDER BY revision',[input.id]);
 assert.deepEqual(history.rows.map(row=>row.revision),[1,2]);
 assert.equal(history.rows[0].snapshot.editions[0].title,'Ìtàn Ilé-Ifẹ̀');
 assert.equal(history.rows[1].snapshot.editions[0].title,'Ìtàn Ilé-Ifẹ̀ àti Àṣà');
});

test('concurrent same-revision commands have exactly one successful commit',async()=>{
 const input=makeDraft();
 await repository.createDraft(actor,input);
 const results=await Promise.allSettled([
  repository.applyAction(actor,input.id,{kind:'submit_for_review',expectedRevision:1}),
  repository.applyAction(actor,input.id,{kind:'submit_for_review',expectedRevision:1})
 ]);
 assert.equal(results.filter(item=>item.status==='fulfilled').length,1);
 assert.equal(results.filter(item=>item.status==='rejected').length,1);
 const state=await pool.query('SELECT state,revision FROM editorial_private.content_records WHERE id=$1',[input.id]);
 assert.deepEqual(state.rows[0],{state:'in_review',revision:2});
 const revisions=await pool.query('SELECT revision FROM editorial_private.content_revisions WHERE record_id=$1',[input.id]);
 assert.equal(revisions.rowCount,2);
});

test('audit uniqueness failure rolls back record and revision changes atomically',async()=>{
 const input=makeDraft();
 await repository.createDraft(actor,input);
 // Simulates an audit collision after the record has been updated and
 // the revision snapshot written inside the application transaction.
 await pool.query(
  `INSERT INTO editorial_private.audit_events
   (record_id,action,from_revision,to_revision,from_state,to_state,actor_id)
   VALUES ($1,'reserved-test',1,2,'draft','in_review',$2)`,[input.id,actor.id]);
 await assert.rejects(repository.applyAction(actor,input.id,
   {kind:'submit_for_review',expectedRevision:1}),/duplicate key|unique constraint/i);
 const state=await pool.query('SELECT state,revision FROM editorial_private.content_records WHERE id=$1',[input.id]);
 assert.deepEqual(state.rows[0],{state:'draft',revision:1});
 const snapshot=await pool.query('SELECT revision FROM editorial_private.content_revisions WHERE record_id=$1',[input.id]);
 assert.deepEqual(snapshot.rows.map(row=>row.revision),[1]);
});

test('an owner may review another author draft but cannot use this repository to publish',async()=>{
 const input=makeDraft();
 await repository.createDraft(actor,input);
 await repository.applyAction(actor,input.id,{kind:'submit_for_review',expectedRevision:1});
 const approved=await repository.applyAction(owner,input.id,{kind:'approve_review',expectedRevision:2});
 assert.equal(approved.editorialState,'approved');
 await assert.rejects(repository.applyAction(owner,input.id,
  {kind:'publish',expectedRevision:3}),/Unknown editorial action/);
 const state=await pool.query('SELECT state FROM editorial_private.content_records WHERE id=$1',[input.id]);
 assert.equal(state.rows[0].state,'approved');
});

test.after(async()=>{await pool.end()});
