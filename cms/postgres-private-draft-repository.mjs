/**
 * Private PostgreSQL draft/review repository. No HTTP routes or credentials.
 *
 * The caller supplies a PostgreSQL-compatible pool whose connect() returns a
 * client with query(sql,values) and release(). This module never accepts roles
 * or rights clearance from browser requests; any future API MUST resolve the
 * actor and the entire permission context from a trusted server-side session.
 *
 * All writes use one transaction, row locking, optimistic revisions, snapshots,
 * and audit events. Publication, community intake and uploads are NOT provided.
 */
import {editorialRecordSchema} from '../web/src/lib/editorial-content-contract.ts';
import {planEditorialChange} from '../web/src/lib/editorial-workflow.ts';

const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function requireActor(actor){
  if(!actor||!UUID.test(actor.id)||!['owner','editor','reviewer'].includes(actor.role)){
    throw new Error('A trusted authenticated editorial actor is required');
  }
}
const safeCopy=value=>structuredClone(value);
async function transaction(pool,work){
  const client=await pool.connect();
  let started=false;
  try{
    await client.query('BEGIN'); started=true;
    const value=await work(client);
    await client.query('COMMIT'); started=false;
    return safeCopy(value);
  }catch(error){
    if(started){
      try{await client.query('ROLLBACK')}
      catch(rollbackError){error.cause=rollbackError}
    }
    throw error;
  }finally{client.release()}
}
async function insertEditions(client,record){
  for(const edition of record.editions){
    await client.query(
      'INSERT INTO editorial_private.content_editions(record_id,language,title,summary,body_markdown) VALUES ($1,$2,$3,$4,$5)',
      [record.id,edition.language,edition.title,edition.summary,edition.bodyMarkdown]);
  }
}
async function getLockedRecord(client,id){
  const found=await client.query(
    'SELECT * FROM editorial_private.content_records WHERE id=$1 FOR UPDATE',[id]);
  if(found.rows.length!==1)throw new Error('Editorial record not found');
  const row=found.rows[0];
  const editions=(await client.query(
    'SELECT language,title,summary,body_markdown FROM editorial_private.content_editions WHERE record_id=$1 ORDER BY language',[id])).rows;
  const provenance=(await client.query(
    'SELECT source_category,description,broad_community,attributed_teller FROM editorial_private.provenance WHERE record_id=$1',[id])).rows[0];
  if(!provenance)throw new Error('Private provenance record missing');
  const media=(await client.query(
    'SELECT m.id,m.kind,m.rights_status,m.alt_or_transcript FROM editorial_private.content_media cm JOIN editorial_private.media_assets m ON m.id=cm.asset_id WHERE cm.record_id=$1 ORDER BY cm.position',[id])).rows;
  return editorialRecordSchema.parse({
    id:row.id,slug:row.slug,contentKind:row.kind,genre:row.genre,
    primaryLanguage:row.primary_language,editorialState:row.state,
    revision:row.revision,lastEditorId:row.last_editor_id,
    rightsReview:row.rights_status,
    editions:editions.map(e=>({language:e.language,title:e.title,summary:e.summary,bodyMarkdown:e.body_markdown})),
    provenance:{sourceCategory:provenance.source_category,description:provenance.description,
      ...(provenance.broad_community==null?{}:{broadCommunity:provenance.broad_community}),
      ...(provenance.attributed_teller==null?{}:{attributedTeller:provenance.attributed_teller})},
    media:media.map(m=>({assetId:m.id,kind:m.kind,rightsStatus:m.rights_status,altOrTranscript:m.alt_or_transcript}))
  });
}
async function addAuditAndSnapshot(client,record,actorId,audit){
  await client.query(
    'INSERT INTO editorial_private.content_revisions(record_id,revision,snapshot,actor_id) VALUES ($1,$2,$3::jsonb,$4)',
    [record.id,record.revision,JSON.stringify(record),actorId]);
  await client.query(
    'INSERT INTO editorial_private.audit_events(record_id,action,from_revision,to_revision,from_state,to_state,actor_id) VALUES ($1,$2,$3,$4,$5,$6,$7)',
    [record.id,audit.action,audit.fromRevision,audit.toRevision,audit.fromState,audit.toState,actorId]);
}
export function createPostgresDraftRepository(pool){
  if(!pool||typeof pool.connect!=='function')throw new Error('A private PostgreSQL pool is required');
  return {
    async createDraft(actor,input){
      requireActor(actor);
      if(!['owner','editor'].includes(actor.role))throw new Error('Draft creation denied');
      const draft=editorialRecordSchema.parse(input);
      if(draft.editorialState!=='draft'||draft.revision!==1||draft.lastEditorId!==actor.id){
        throw new Error('New drafts must be revision 1 and owned by the actor');
      }
      // Media attachment and consent evidence need separate protected storage.
      if(draft.media.length)throw new Error('Media attachment is not enabled yet');
      return transaction(pool,async(client)=>{
        await client.query(
          'INSERT INTO editorial_private.content_records (id,slug,kind,genre,primary_language,state,revision,author_id,last_editor_id,rights_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
          [draft.id,draft.slug,draft.contentKind,draft.genre,draft.primaryLanguage,
            draft.editorialState,draft.revision,actor.id,actor.id,draft.rightsReview]);
        await insertEditions(client,draft);
        await client.query(
          'INSERT INTO editorial_private.provenance(record_id,source_category,description,broad_community,attributed_teller) VALUES ($1,$2,$3,$4,$5)',
          [draft.id,draft.provenance.sourceCategory,draft.provenance.description,
            draft.provenance.broadCommunity??null,draft.provenance.attributedTeller??null]);
        await addAuditAndSnapshot(client,draft,actor.id,{
          action:'create_draft',fromRevision:0,toRevision:1,fromState:null,toState:'draft'
        });
        return draft;
      });
    },
    async applyAction(actor,recordId,action){
      requireActor(actor);
      if(!UUID.test(recordId))throw new Error('Invalid record identifier');
      return transaction(pool,async(client)=>{
        const current=await getLockedRecord(client,recordId);
        const {record,audit}=planEditorialChange(current,actor,action);
        const updated=await client.query(
          'UPDATE editorial_private.content_records SET state=$2,revision=$3,last_editor_id=$4,approved_by=$5,updated_at=now() WHERE id=$1 AND revision=$6',
          [record.id,record.editorialState,record.revision,record.lastEditorId,
            action.kind==='approve_review'?actor.id:null,current.revision]);
        if(updated.rowCount!==1)throw new Error('Revision conflict');
        if(action.kind==='revise_draft'){
          await client.query('DELETE FROM editorial_private.content_editions WHERE record_id=$1',[record.id]);
          await insertEditions(client,record);
        }
        await addAuditAndSnapshot(client,record,actor.id,audit);
        return record;
      });
    }
  };
}
