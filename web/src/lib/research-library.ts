import {z} from 'zod';
import {archive,Id,sourceFor,sourceHref} from './archive.ts';
import {sources as storySources,stories,paragraphsFor} from './stories.ts';
import {regionalSources,regionalDrafts} from '../data/regional-content.ts';
import {libraryAssessments,guideEvidence} from '../data/research-library.ts';
const Text=z.string().trim().min(1),DateText=z.iso.date();
export const accessLevels=['not-assessed','catalogue-only','abstract-only','limited-preview','selected-passages-inspected','full-text-inspected'] as const;
export const accessLabels:Record<typeof accessLevels[number],string>={
  'not-assessed':'Not assessed in this explorer','catalogue-only':'Bibliography / catalogue only','abstract-only':'Abstract only',
  'limited-preview':'Limited preview — not the complete book','selected-passages-inspected':'Selected passages recorded as inspected','full-text-inspected':'Full text inspected — not historical verification'
};
export const roleLabels={
  'not-assessed':'Role not assessed','scholarly-book':'Scholarly book','practitioner-writing':'Practitioner-authored work',
  'author-bibliography':'Author bibliography','museum-commentary':'Museum commentary','institutional-record':'Institutional record'
};
export const supportLabels={
  'bibliographic-lead':'Bibliographic / research lead — not inspected claim evidence',
  'curatorial-interpretation':'Curatorial interpretation or collection record — its limits remain visible',
  'scholarly-interpretation':'Attributed scholarly interpretation — underlying originals not independently examined',
  'documentary-attestation':'A dated statement is recorded — its contents are not automatically proven'
};
export const Target=z.object({register:z.enum(['canonical','story','regional']),sourceId:Id}).strict();
export const LibraryAssessment=z.object({target:Target,basisId:Id,support:z.enum(['bibliographic-lead','curatorial-interpretation','scholarly-interpretation','documentary-attestation']),creator:Text,workTitle:Text,edition:Text,workPublisher:Text,
  role:z.enum(['scholarly-book','practitioner-writing','author-bibliography','museum-commentary','institutional-record']),access:z.enum(accessLevels),note:Text,authorArticle:Id.nullable(),passageIds:z.array(Id),
  relations:z.array(z.object({sourceId:Id,kind:Id,note:Text}).strict()),version:z.number().int().positive(),updated:DateText,
  release:z.enum(['internal','private-review','withdrawn']).default('internal'),review:z.literal('pending-independent-review'),rights:z.literal('unknown'),publicationApproval:z.literal('not-granted'),eventEvidence:z.literal('not-established-by-access'),
  withdrawal:z.object({date:DateText,reason:Text}).strict().nullable(),history:z.array(z.object({version:z.number().int().positive(),date:DateText,action:z.enum(['created','corrected','withdrawn']),note:Text}).strict()).min(1)
}).strict().superRefine((a,ctx)=>{
  const fail=(message:string)=>ctx.addIssue({code:'custom',message});
  if(a.history.some((h,i)=>h.version!==i+1)||a.history.at(-1)?.version!==a.version||a.history.at(-1)?.date!==a.updated)fail('Assessment version history mismatch');
  if(a.release==='withdrawn'&&(!a.withdrawal||a.history.at(-1)?.action!=='withdrawn'))fail('Withdrawal needs dated reason and event');
  if(a.withdrawal&&a.release!=='withdrawn')fail('Withdrawn assessment cannot be released');
  if(new Set(a.passageIds).size!==a.passageIds.length)fail('Duplicate passage pointer');
});
export type Assessment=z.infer<typeof LibraryAssessment>;
export interface RecordedPassage {id:string;locator:string;supports:string;limits:string;href:string}
export const targetKey=(target:z.infer<typeof Target>)=>`${target.register}:${target.sourceId}`;
export const excludedAuthority=(creator:string,title:string)=>/\bsamuel\s+johnson\b|\bthe\s+history\s+of\s+the\s+yorubas\b/iu.test(creator+' '+title);

export function resolveLibraryTarget(target:z.infer<typeof Target>){
  Target.parse(target);
  if(target.register==='canonical'){
    const s=sourceFor(target.sourceId);return {title:s.title,host:s.institution,url:s.url,sourceVersion:null,accessed:null,scope:'Locality/community not newly assessed; original source notes retained.',dependency:'Source-of-source dependence remains a claim-level research question.',rightsNote:'Bibliographic metadata does not establish permission to reproduce the work or community material.',passages:[] as RecordedPassage[],group:targetKey(target)};
  }
  if(target.register==='story'){
    const s=storySources.find(s=>s.id===target.sourceId);if(!s)throw new Error('Unknown draft story source');
    const passages=s.passages.map(p=>{
      const story=stories.find(story=>paragraphsFor(story).some(paragraph=>paragraph.citations.some(c=>c.sourceId===s.id))||story.glossary.some(g=>g.citation.sourceId===s.id));
      if(!story)throw new Error('Story source passage has no existing on-site use');
      return {id:p.id,locator:p.locator,supports:p.supports,limits:p.limits,href:`/stories/${story.id}/#evidence-${s.id}-${p.id}`};
    });
    return {title:s.title,host:s.publisher,url:s.url,sourceVersion:null,accessed:s.accessed,scope:s.locality,dependency:s.johnsonAssessment,rightsNote:s.rightsNote,passages,group:s.id==='f-adire-vam'?'museum-vam-commentary':'relationship-not-assessed'};
  }
  const s=regionalSources.find(s=>s.id===target.sourceId);if(!s)throw new Error('Unknown regional draft source');
  const draft=regionalDrafts.find(d=>[d.opening,...d.sections.flatMap(section=>section.paragraphs)].some(p=>p.citations.some(c=>c.sourceId===s.id)));
  if(!draft||draft.release!=='private-review'||draft.withdrawal||draft.sensitiveFlags.length)throw new Error('Regional passage is not available for private reading');
  return {title:s.title,host:s.publisher,url:s.url,sourceVersion:s.version,accessed:s.accessed,scope:s.scope,dependency:s.dependency,rightsNote:s.rights,passages:[{id:s.passageId,locator:s.locator,supports:s.supports,limits:s.limits,href:`/places/${draft.id}/#evidence-${s.id}-${s.passageId}`}],group:s.group};
}

export function validateLibraryAssessments(raw:unknown[]){
  const items=LibraryAssessment.array().parse(raw);
  if(new Set(items.map(a=>targetKey(a.target))).size!==items.length)throw new Error('Duplicate library target');
  for(const a of items){
    if(excludedAuthority(a.creator,a.workTitle))throw new Error('Excluded authority is not admissible as factual evidence');
    const source=resolveLibraryTarget(a.target);
    if(new URL(source.url).protocol!=='https:')throw new Error('Unsafe source URL');
    if(a.authorArticle&&!archive.articles.some(article=>article.id===a.authorArticle))throw new Error('Unknown author study');
    for(const relation of a.relations)sourceFor(relation.sourceId);
    if(a.target.register==='canonical'){
      if(a.support!=='bibliographic-lead')throw new Error('Guide metadata cannot become factual passage evidence');
      const basis=guideEvidence.find(b=>b.id===a.basisId&&b.sourceId===a.target.sourceId);
      if(!basis)throw new Error('Guide evidence does not match work/edition');
      const allowed=basis.ceiling==='limited-preview'?['not-assessed','catalogue-only','limited-preview']:['not-assessed','catalogue-only'];
      if(!allowed.includes(a.access)||a.passageIds.length)throw new Error('Guide metadata cannot promote a book to passage/full-text inspection');
    }else{
      const expectedSupport=a.role==='institutional-record'?'documentary-attestation':a.role==='museum-commentary'?'curatorial-interpretation':'scholarly-interpretation';
      if(a.support!==expectedSupport)throw new Error('Source role and evidence support mismatch');
      const expected=a.target.register==='story'?'prior-story-passages':'prior-regional-passages';
      if(a.basisId!==expected||a.access!=='selected-passages-inspected'||!a.passageIds.length)throw new Error('Draft access must remain selected recorded passages');
      for(const id of a.passageIds)if(!source.passages.some(p=>p.id===id))throw new Error('Unknown inspected passage');
    }
  }
  return items;
}
export const assessments=validateLibraryAssessments(libraryAssessments);
export const eligibleAssessments=(items:Assessment[])=>items.filter(a=>a.release==='private-review'&&!a.withdrawal);
export const activeAssessments=eligibleAssessments(assessments);
export function assessmentFor(sourceId:string){return activeAssessments.find(a=>a.target.register==='canonical'&&a.target.sourceId===sourceId);}
export function passagesForAssessment(a:Assessment){return resolveLibraryTarget(a.target).passages.filter(p=>a.passageIds.includes(p.id));}
export function guideFor(a:Assessment){return guideEvidence.find(g=>g.id===a.basisId);}
export const guideHref=(path:string)=>{if(!guideEvidence.some(g=>g.guide===path))throw new Error('Unknown reading guide');return `https://github.com/BolaOlatPrivateCollege/yoruba-heritage-platform/blob/425780d19ae3dda3e478310eecf7e3107099ceba/${path}`;};
export function usagesFor(sourceId:string){return archive.articles.flatMap(article=>article.sections.flatMap((section,i)=>section.sourceIds.includes(sourceId)?[{title:article.title,section:section.h,href:`/articles/${article.id}/#section-${i+1}`}]:[]));}
export const draftAssessments=activeAssessments.filter(a=>a.target.register!=='canonical');
export const unassessedCount=archive.sources.filter(s=>!assessmentFor(s.id)).length;
export const authorPaths=[
  {name:'Akinwumi Ogundiran',scope:'Historical synthesis: contents and limited previews, not a fully audited monograph.',ids:['ogundiran2020']},
  {name:'Sophie Bọ́sẹ̀dé Olúwọlé',scope:'Philosophical interpretation: keep 2014 catalogue and 2017 alternate-rendition assessment separate.',ids:['authors-oluw-iu','authors-oluw-book']},
  {name:'Wándé Abímbọ́lá',scope:'Bibliography and textual-scholarship leads: no new verses, translations or authenticated signs.',ids:['authors-abi-cv','authors-abi-poems','authors-abi-ifa']},
  {name:'Ifáyẹmí Ẹlẹ́buìbọn',scope:'Practitioner-authored work leads, alongside a clearly separate book by Toyin Falola about him.',ids:['authors-eleb-custodian','authors-eleb-iyere','authors-eleb-bio']}
];
for(const path of authorPaths)for(const id of path.ids)sourceFor(id);
export function makePetitionTrace(items:Assessment[]){
  const assessment=eligibleAssessments(items).find(a=>a.target.register==='regional'&&a.target.sourceId==='region-women-biography');if(!assessment)return null;
  const paragraph=regionalDrafts[0]!.sections.flatMap(s=>s.paragraphs).find(p=>p.id==='organisation-record');
  if(!paragraph?.citations.some(c=>c.sourceId===assessment.target.sourceId))throw new Error('Petition trace unresolved');
  return {storyHref:'/places/abeokuta-tax-and-representation/#organisation-record',paragraph,assessment};
}
export const petitionTrace=makePetitionTrace(activeAssessments);
export function libraryCard(sourceId:string){
  const s=sourceFor(sourceId),a=assessmentFor(sourceId);
  return {id:sourceId,title:s.title,host:s.institution,kind:s.kind,href:sourceHref(s.id),access:a?.access??'not-assessed',role:a?.role??'not-assessed',creator:a?.creator??s.institution,key:[s.title,s.institution,s.kind,a?.creator,a?.workTitle,a?.note].filter(Boolean).join(' '),assessment:a};
}
