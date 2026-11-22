import {z} from 'zod';
import {archive,Id} from './archive.ts';

const Text=z.string().trim().min(1);
const DateText=z.iso.date();
const Citation=z.object({sourceId:Id,passageId:Id}).strict();
export const ContextSource=z.object({id:Id,title:Text,author:Text,type:Text,url:z.url().refine(s=>new URL(s).protocol==='https:'),accessed:DateText,
  version:z.number().int().positive(),recordStatus:z.literal('inspected-passage-record'),
  dependencyReview:z.enum(['bounded-passages-checked','unchecked','excluded']),dependencyNote:Text,
  passages:z.array(z.object({id:Id,locator:Text,support:Text,limit:Text}).strict()).min(1)}).strict();
export const categories=['community-tradition','mediated-report','folklore','object-interpretation','contested-interpretation','circulating-claim'] as const;
export const categoryLabels={
  'mediated-report':'Museum-mediated reports',
  'object-interpretation':'Unresolved object interpretations',
  'community-tradition':'Community traditions','folklore':'Folklore & legends',
  'contested-interpretation':'Disputed histories','circulating-claim':'Circulating claims & what we know'
};
export const categoryDescriptions={
  'community-tradition':'Attributed oral tradition — transmission context recorded',
  'mediated-report':'Reported local account — an intermediary’s record',
  'folklore':'Attested narrative variant — scope matters',
  'object-interpretation':'Alternative object readings — no documented historical dispute',
  'contested-interpretation':'Documented historical disagreement — compare the evidence',
  'circulating-claim':'Individually reviewed claim — see the fact-check outcome'
};
export const claimLabels={
  unresolved:'Unresolved object interpretation — no documented historical dispute',
  'reported-account':'Museum-mediated report — original testimony not authenticated',
  'recorded-tradition':'Recorded tradition — events not independently corroborated',
  contested:'Documented disagreement — historical interpretations remain contested',
  uncorroborated:'Uncorroborated — evidence is insufficient',
  contradicted:'Contradicted — the cited evidence weighs against this version',
  reviewed:'Reviewed within the stated scope — not universal verification'
};
const Perspective=z.object({label:Text,account:Text,evidenceWeight:Text,citations:z.array(Citation).min(1)}).strict();
const Review=z.object({reviewer:Text,date:DateText,note:Text}).strict();
export const ContextEntry=z.object({
  id:Id,articleId:Id,category:z.enum(categories),title:Text,summary:Text,
  community:Text,geography:Text,narrator:Text,sourceAuthorship:Text,sourceType:Text,collectionContext:Text,
  primaryLanguage:Text,translationReview:z.enum(['not-applicable-original-english-paraphrase','pending','reviewed']),translationNote:Text,period:Text,
  known:z.array(Text).min(1),unknown:z.array(Text).min(1),counterevidence:Text,
  citations:z.array(Citation).min(1),perspectives:z.array(Perspective),variant:Text.optional(),culturalMeaning:Text.optional(),
  disputeBasis:z.object({description:Text,citations:z.array(Citation).min(1)}).strict().optional(),
  traditionBasis:z.object({description:Text,citations:z.array(Citation).min(1)}).strict().optional(),
  claimStatus:z.enum(['recorded-tradition','reported-account','unresolved','contested','uncorroborated','contradicted','reviewed']),
  sensitivityFlags:z.array(z.enum(['restricted-sacred','living-person-allegation','witchcraft-identification','medical','ethnic-tension','children','private-property','sexual-allegation','criminal-allegation','private-testimony'])),
  provenanceReview:z.enum(['bounded-source-checked','pending']),safety:z.enum(['reviewed-for-safety','pending','blocked']),
  rights:z.enum(['original-paraphrase-no-media','permission-recorded','unknown','restricted']),
  consent:z.enum(['published-nonidentifying-source-summary','permission-recorded','unknown','withheld']),
  consentNote:Text,review:Review,communityReview:z.enum(['pending','recorded','not-required-nonritual-object-reading']),communityReviewNote:Text,
  release:z.enum(['internal','approved-for-private-preview','withdrawn']).default('internal'),releaseNote:Text,
  circulation:z.object({documented:z.boolean(),evidence:z.array(Citation),independentReview:Review.nullable(),communityReview:Review.nullable(),decision:Review.nullable(),factCheckOutcome:Text.nullable()}).strict().optional(),
  version:z.number().int().positive(),updated:DateText,history:z.array(z.object({version:z.number().int().positive(),date:DateText,action:z.enum(['created','corrected','withdrawn','reinstated']),note:Text}).strict()).min(1),
  withdrawal:z.object({date:DateText,reason:Text}).strict().nullable()
}).strict().superRefine((e,ctx)=>{
  const fail=(message:string)=>ctx.addIssue({code:'custom',message});
  if(e.category==='contested-interpretation'&&(e.perspectives.length<2||e.claimStatus!=='contested'||!e.disputeBasis))fail('Disputed histories require cited evidence of actual disagreement, two sourced perspectives and contested status');
  if(e.category==='object-interpretation'&&(e.claimStatus!=='unresolved'||!e.perspectives.length))fail('Open object readings require unresolved status and a sourced interpretation');
  if(e.category==='mediated-report'&&e.claimStatus!=='reported-account')fail('Intermediary reports must not be labelled inherited traditions');
  if(e.category==='folklore'&&(!e.variant||!e.culturalMeaning))fail('Folklore requires an attested variant and scoped cultural meaning');
  if(e.category==='community-tradition'&&(e.claimStatus!=='recorded-tradition'||!e.traditionBasis))fail('Oral traditions require cited attribution/transmission context, not merely a mediated remark');
  if(e.disputeBasis&&e.category!=='contested-interpretation')fail('Disagreement evidence belongs to an explicitly disputed history');
  if(e.traditionBasis&&e.category!=='community-tradition')fail('Transmission evidence belongs to an explicitly attributed oral tradition');
  if(e.category==='circulating-claim'&&!e.circulation)fail('Circulating claims require a circulation record');
  if(new Set(e.history.map(h=>h.version)).size!==e.history.length||e.history.at(-1)?.version!==e.version||e.history.at(-1)?.date!==e.updated)fail('Revision history must end at current version/date');
  if(e.history.some((h,i)=>h.version!==i+1))fail('Revision history must be consecutive');
  if(e.history.some((h,i)=>i>0&&h.date<e.history[i-1]!.date))fail('Revision dates must be chronological');
  if(e.release==='withdrawn'&&(!e.withdrawal||e.history.at(-1)?.action!=='withdrawn'))fail('Withdrawal requires a dated reason and history event');
  if(e.withdrawal&&e.release!=='withdrawn')fail('Withdrawn material cannot be released');
  if(e.release==='approved-for-private-preview'&&!eligibleState(e))fail('Preview release gates are incomplete');
});
export type Entry=z.infer<typeof ContextEntry>;
export type ContextSourceRecord=z.infer<typeof ContextSource>;

// This is a private PR-review state, never a public-publication authorisation.
function eligibleState(e:{safety:string;provenanceReview:string;rights:string;consent:string;translationReview:string;sensitivityFlags:string[];category:string;communityReview:string;review:{reviewer:string};circulation?:{documented:boolean;evidence:unknown[];independentReview:{reviewer:string}|null;communityReview:{reviewer:string}|null;decision:{reviewer:string}|null;factCheckOutcome:string|null}}){
  if(e.safety!=='reviewed-for-safety'||e.provenanceReview!=='bounded-source-checked'||['unknown','restricted'].includes(e.rights)||['unknown','withheld'].includes(e.consent)||e.translationReview==='pending'||e.sensitivityFlags.length)return false;
  if(e.category==='folklore'&&e.communityReview!=='recorded')return false;
  if(e.category==='circulating-claim'){
    const c=e.circulation;
    if(!c?.documented||!c.evidence.length||!c.independentReview||!c.communityReview||!c.decision||!c.factCheckOutcome)return false;
    if(c.independentReview.reviewer===e.review.reviewer||c.independentReview.reviewer===c.decision.reviewer)return false;
  }
  return true;
}
export const entryCitations=(e:Entry)=>[...e.citations,...e.perspectives.flatMap(p=>p.citations),...(e.disputeBasis?.citations??[]),...(e.traditionBasis?.citations??[]),...(e.circulation?.evidence??[])];
export function validateContext(rawEntries:unknown[],rawSources:unknown[]){
  const entries=ContextEntry.array().parse(rawEntries),sources=ContextSource.array().parse(rawSources);
  if(new Set(entries.map(e=>e.id)).size!==entries.length||new Set(sources.map(s=>s.id)).size!==sources.length)throw new Error('Duplicate context ID');
  for(const source of sources){
    if(new Set(source.passages.map(p=>p.id)).size!==source.passages.length)throw new Error('Duplicate passage ID');
    if(/samuel\s+johnson|history of the yorubas/i.test(source.title+' '+source.author))throw new Error('Excluded authority');
  }
  for(const e of entries){
    if(!archive.articles.some(a=>a.id===e.articleId))throw new Error('Unknown canonical article');
    for(const c of entryCitations(e)){
      const source=sources.find(s=>s.id===c.sourceId);
      if(!source?.passages.some(p=>p.id===c.passageId))throw new Error('Unresolved context passage');
      if(e.release==='approved-for-private-preview'&&source.dependencyReview!=='bounded-passages-checked')throw new Error('Unchecked dependency cannot be released');
    }
  }
  return {entries,sources};
}
export function previewEntries(articleId:string,entries:Entry[]){return entries.filter(e=>e.articleId===articleId&&e.release==='approved-for-private-preview'&&!e.withdrawal&&eligibleState(e));}
export function sourcesForEntry(e:Entry,sources:ContextSourceRecord[]){const ids=new Set(entryCitations(e).map(c=>c.sourceId));return sources.filter(s=>ids.has(s.id));}
