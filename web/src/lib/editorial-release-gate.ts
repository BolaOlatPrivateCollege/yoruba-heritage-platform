/**
 * Owner-controlled release gate for the future Àṣà & Ìtàn Yorùbá CMS.
 *
 * Policy/validation only. NO authentication, database, HTTP endpoint, deploy,
 * build trigger or publication. A future private backend must derive the actor,
 * account status, rights and approval metadata from trusted storage/session.
 */
import {z} from 'zod';

const uuid=z.string().uuid();
export const ownerPublicationIntentSchema=z.object({
  recordId:uuid,
  expectedRevision:z.number().int().positive(),
  confirmAction:z.literal('PUBLISH_APPROVED_REVISION'),
  // Prevent a UI checkbox becoming the sole authority; the server must
  // independently confirm a fresh MFA-backed owner session.
  freshOwnerSessionVerified:z.literal(true)
}).strict();

export type OwnerPublishContext={
  actor:{userId:string;role:string;active:boolean;mfaVerified:boolean};
  ownerUserId:string;
  record:{
    id:string;revision:number;state:string;
    rightsCleared:boolean;mediaRightsCleared:boolean;consentCleared:boolean;
    independentReviewRequired:boolean;reviewerId?:string;
    authorId:string;lastEditorId:string;
  };
  intent:unknown;
};

export type OwnerPublishDecision=
  |{allowed:true;recordId:string;expectedRevision:number}
  |{allowed:false;reason:string};

export function evaluateOwnerPublication(context:OwnerPublishContext):OwnerPublishDecision{
  const {actor,record}=context;
  // Reject unauthorised callers before parsing any user-supplied intent.
  if(!actor.active||actor.role!=='owner'||actor.userId!==context.ownerUserId||
     !actor.mfaVerified||!uuid.safeParse(actor.userId).success||
     !uuid.safeParse(context.ownerUserId).success){
    return {allowed:false,reason:'A verified, active owner session is required'};
  }
  const parsed=ownerPublicationIntentSchema.safeParse(context.intent);
  if(!parsed.success)return {allowed:false,reason:'Explicit owner publication confirmation required'};
  const intent=parsed.data;
  if(record.id!==intent.recordId||record.revision!==intent.expectedRevision){
    return {allowed:false,reason:'Publication revision conflict'};
  }
  if(record.state!=='approved'){
    return {allowed:false,reason:'Only an approved revision may be published'};
  }
  if(!record.rightsCleared||!record.mediaRightsCleared||!record.consentCleared){
    return {allowed:false,reason:'Rights, media and contributor consent must be cleared'};
  }
  if(record.independentReviewRequired&&
     (!record.reviewerId||record.reviewerId===record.authorId||
      record.reviewerId===record.lastEditorId)){
    return {allowed:false,reason:'Independent review is incomplete'};
  }
  return {allowed:true,recordId:record.id,expectedRevision:record.revision};
}
