/**
 * Private editorial workflow policy, not an API, authentication system,
 * persistence layer or publishing service.
 *
 * IMPORTANT: actor identity and role MUST come from a trusted server session
 * in a future private API, never from a public browser request.
 */
export const editorialRoles=[
  'owner','editor','reviewer','translator','media-editor','viewer'
] as const;
export const editorialActions=[
  'create','edit','submit-review','request-changes','approve',
  'publish','withdraw','read-draft'
] as const;
export const editorialWorkflowStates=[
  'draft','in_review','approved','published','withdrawn'
] as const;

export type EditorialRole=typeof editorialRoles[number];
export type EditorialAction=typeof editorialActions[number];
export type EditorialWorkflowState=typeof editorialWorkflowStates[number];

const permissions:Readonly<Record<EditorialAction,readonly EditorialRole[]>>={
  'create':['owner','editor'],
  'edit':['owner','editor'],
  'submit-review':['owner','editor'],
  'request-changes':['owner','reviewer'],
  'approve':['owner','reviewer'],
  'publish':['owner'],
  'withdraw':['owner'],
  'read-draft':['owner','editor','reviewer','translator','media-editor','viewer']
};
const transitions:Readonly<Record<Exclude<EditorialAction,'create'|'edit'|'read-draft'>,
  readonly [EditorialWorkflowState,EditorialWorkflowState][]>>={
  'submit-review':[['draft','in_review']],
  'request-changes':[['in_review','draft'],['approved','draft']],
  'approve':[['in_review','approved']],
  'publish':[['approved','published']],
  'withdraw':[['published','withdrawn']]
};
export interface TrustedEditorialActor {
  userId:string;
  role:EditorialRole;
}
export interface EditorialWorkflowContext {
  actor:TrustedEditorialActor;
  action:EditorialAction;
  currentState:EditorialWorkflowState;
  authorId:string;
  lastEditorId:string;
  rightsCleared:boolean;
  mediaRightsCleared:boolean;
  consentCleared:boolean;
  /** Whether the item requires an independent second reviewer. */
  independentReviewRequired:boolean;
  /** Server-verified prior review actor, if any. */
  lastReviewerId?:string;
}
export type EditorialDecision=
  {allowed:true;nextState:EditorialWorkflowState}|
  {allowed:false;reason:string};

export function decideEditorialAction(context:EditorialWorkflowContext):EditorialDecision {
  const {actor,action,currentState}=context;
  if(!actor.userId||!context.authorId||!context.lastEditorId){
    return {allowed:false,reason:'Trusted actor and content ownership are required'};
  }
  if(!permissions[action]?.includes(actor.role)){
    return {allowed:false,reason:'Role is not permitted to perform this action'};
  }
  if(action==='create'){
    return {allowed:false,reason:'Creating content requires an authenticated storage transaction'};
  }
  if(action==='read-draft')return {allowed:true,nextState:currentState};
  if(action==='edit'){
    if(currentState!=='draft')return {allowed:false,reason:'Only drafts may be edited'};
    return {allowed:true,nextState:currentState};
  }
  const allowedTransition=transitions[action]?.find(([from])=>from===currentState);
  if(!allowedTransition){
    return {allowed:false,reason:'Invalid editorial state transition'};
  }
  if(action==='approve'){
    if(context.independentReviewRequired&&
      (actor.userId===context.authorId||actor.userId===context.lastEditorId)){
      return {allowed:false,reason:'Independent review cannot be self-approved'};
    }
    if(!context.rightsCleared||!context.mediaRightsCleared||!context.consentCleared){
      return {allowed:false,reason:'Rights, media and contributor permission must be cleared'};
    }
  }
  if(action==='publish'){
    if(!context.rightsCleared||!context.mediaRightsCleared||!context.consentCleared){
      return {allowed:false,reason:'Publishing requires current rights and permission clearance'};
    }
    if(context.independentReviewRequired&&
      (!context.lastReviewerId||
        context.lastReviewerId===context.authorId||
        context.lastReviewerId===context.lastEditorId)){
      return {allowed:false,reason:'Independent review evidence is required'};
    }
  }
  return {allowed:true,nextState:allowedTransition[1]};
}
