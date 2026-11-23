/**
 * Private CMS domain workflow prototype, NOT an authenticated backend.
 *
 * This module has no route, network access, persistence or publication ability.
 * A future protected service must derive actors from verified server sessions,
 * apply database transactions and write durable audit events. Never trust a
 * role or approval supplied by an untrusted browser.
 */
import {editorialRecordSchema,type EditorialRecord} from './editorial-content-contract.ts';

export type EditorialRole='owner'|'editor'|'reviewer';
export type EditorialActor={id:string;role:EditorialRole};
export type EditorialAction=
 | {kind:'revise_draft';expectedRevision:number;editions:EditorialRecord['editions']}
 | {kind:'submit_for_review';expectedRevision:number}
 | {kind:'return_to_draft';expectedRevision:number}
 | {kind:'approve_review';expectedRevision:number};

export type EditorialAuditIntent={
 recordId:string;fromRevision:number;toRevision:number;
 fromState:EditorialRecord['editorialState'];
 toState:EditorialRecord['editorialState'];
 action:EditorialAction['kind'];actorId:string;
};

/** Must only be invoked by a future authenticated and transactionally audited API. */
export function planEditorialChange(
 input:unknown,actor:EditorialActor,action:EditorialAction
):{record:EditorialRecord;audit:EditorialAuditIntent}{
 const record=editorialRecordSchema.parse(input);
 if(!/^[0-9a-f-]{36}$/i.test(actor.id))throw new Error('Invalid server actor identifier');
 if(!['owner','editor','reviewer'].includes(actor.role))throw new Error('Unknown editorial role');
 if(action.expectedRevision!==record.revision)throw new Error('Revision conflict');
 if(record.editorialState==='published'||record.editorialState==='withdrawn'){
  throw new Error('Published or withdrawn content is immutable in this prototype');
 }
 if(action.kind==='revise_draft'){
  if(record.editorialState!=='draft')throw new Error('Editing requires a draft');
  if(actor.role!=='owner'&&actor.role!=='editor')throw new Error('Editing permission denied');
 }else if(action.kind==='submit_for_review'){
  if(record.editorialState!=='draft')throw new Error('Only drafts can enter review');
  if(actor.role!=='owner'&&actor.role!=='editor')throw new Error('Submission permission denied');
 }else if(action.kind==='return_to_draft'||action.kind==='approve_review'){
  if(record.editorialState!=='in_review')throw new Error('Content is not in review');
  if(actor.role!=='owner'&&actor.role!=='reviewer')throw new Error('Review permission denied');
  if(action.kind==='approve_review'){
   if(record.lastEditorId===actor.id)throw new Error('Author cannot approve own revision');
   if(record.rightsReview!=='cleared'&&record.rightsReview!=='not-required'){
    throw new Error('Rights review not complete');
   }
   if(record.media.some(media=>media.rightsStatus!=='cleared')){
    throw new Error('Uncleared media cannot be approved');
   }
   // Consent evidence is outside this contract: never approve real community testimony here.
   if(['community-oral-account','firsthand-account','permissioned-family-account'].includes(record.provenance.sourceCategory)){
    throw new Error('Community accounts require a separate, verified consent workflow');
   }
  }
 }else{
  throw new Error('Unknown editorial action');
 }
 const newState:EditorialRecord['editorialState']=
  action.kind==='submit_for_review'?'in_review':
  action.kind==='return_to_draft'?'draft':
  action.kind==='approve_review'?'approved':record.editorialState;
 const next=editorialRecordSchema.parse({
  ...record,
  editions:action.kind==='revise_draft'?structuredClone(action.editions):record.editions,
  editorialState:newState,
  revision:record.revision+1,
  lastEditorId:action.kind==='revise_draft'?actor.id:record.lastEditorId
 });
 return {
  record:next,
  audit:{
   recordId:record.id,fromRevision:record.revision,toRevision:next.revision,
   fromState:record.editorialState,toState:next.editorialState,
   action:action.kind,actorId:actor.id
  }
 };
}

/** Deliberately no publish/withdraw/export functions until secure backend gates exist. */
