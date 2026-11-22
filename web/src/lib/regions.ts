import {z} from 'zod';
import {archive,Id} from './archive.ts';
import {regionalDrafts,regionalSources} from '../data/regional-content.ts';
import {stories} from './stories.ts';
const Text=z.string().trim().min(1),DateText=z.iso.date();
const Citation=z.object({sourceId:Id,passageId:Id}).strict();
export const RegionalSource=z.object({id:Id,placeId:z.enum(['abeokuta','ibadan']),author:Text,publisher:Text,title:Text,url:z.url().refine(v=>new URL(v).protocol==='https:'),material:Text,group:Id,scope:Text,locator:Text,supports:Text,limits:Text,dependency:Text,rights:Text,version:z.number().int().positive(),status:z.literal('inspected-passages'),accessed:DateText,passageId:Id,dependencyStatus:z.enum(['bounded-passages-checked','unchecked'])}).strict();
export const RegionalParagraph=z.object({id:Id,kind:z.enum(['documented-record','attributed-scholarship','mediated-report','editorial-reflection']),text:Text,citations:z.array(Citation)}).strict().refine(p=>p.kind==='editorial-reflection'?p.citations.length===0:p.citations.length>0,'Distinguish cited claims from editorial reflection');
export const RegionalStory=z.object({id:Id,placeId:z.enum(['abeokuta','ibadan']),title:Text,subtitle:Text,deck:Text,scope:Text,version:z.number().int().positive(),updated:DateText,editorialStatus:z.literal('research-draft'),release:z.enum(['internal','private-review','withdrawn']).default('internal'),publicationApproval:z.literal('not-granted'),review:z.literal('pending-independent-review'),rights:z.enum(['original-paraphrase-no-media','unknown']),safety:z.enum(['screened-for-private-review','pending']),sensitiveFlags:z.array(Text),withdrawal:z.object({date:DateText,reason:Text}).strict().nullable(),history:z.array(z.object({version:z.number().int().positive(),date:DateText,action:z.enum(['created','corrected','withdrawn']),note:Text}).strict()).min(1),opening:RegionalParagraph,sections:z.array(z.object({id:Id,title:Text,paragraphs:z.array(RegionalParagraph).min(1)}).strict()).min(5),lookCloser:z.object({title:Text,text:Text,citations:z.array(Citation).min(1)}).strict(),traditionEvidence:Text,questions:z.array(Text).min(2),glossary:z.array(z.object({term:Text,meaning:Text,citation:Citation}).strict()).min(2),archiveLinks:z.array(z.object({id:Id,section:z.number().int().positive(),label:Text}).strict()).min(1),next:z.object({href:Text,label:Text}).strict(),illustration:z.literal('representation-reading.svg')}).strict().superRefine((s,ctx)=>{
  const fail=(message:string)=>ctx.addIssue({code:'custom',message});
  if(s.release==='private-review'&&(s.safety!=='screened-for-private-review'||s.rights==='unknown'||s.sensitiveFlags.length||s.withdrawal))fail('Private review gates incomplete');
  if(s.release==='withdrawn'&&!s.withdrawal)fail('Withdrawal needs a dated reason');
  if(s.history.some((h,i)=>h.version!==i+1)||s.history.at(-1)?.version!==s.version||s.history.at(-1)?.date!==s.updated)fail('Version history mismatch');
});
export type RegionalStoryRecord=z.infer<typeof RegionalStory>;
export type RegionalParagraphRecord=z.infer<typeof RegionalParagraph>;
export const regionalParagraphs=(s:RegionalStoryRecord)=>[s.opening,...s.sections.flatMap(section=>section.paragraphs)];
export const regionalCitations=(s:RegionalStoryRecord)=>[...regionalParagraphs(s).flatMap(p=>p.citations),...s.lookCloser.citations,...s.glossary.map(g=>g.citation)];
export function validateRegions(rawStories:unknown[],rawSources:unknown[]){
  const drafts=RegionalStory.array().parse(rawStories),sources=RegionalSource.array().parse(rawSources);
  if(new Set(drafts.map(s=>s.id)).size!==drafts.length||new Set(sources.map(s=>s.id)).size!==sources.length)throw new Error('Duplicate regional ID');
  for(const source of sources)if(/samuel\s+johnson|history of the yorubas/i.test(source.author+' '+source.title))throw new Error('Excluded authority');
  for(const s of drafts){
    const anchors=[...s.sections.map(section=>section.id),...regionalParagraphs(s).map(p=>p.id)];if(new Set(anchors).size!==anchors.length)throw new Error('Duplicate regional anchor');
    for(const c of regionalCitations(s)){const source=sources.find(source=>source.id===c.sourceId&&source.passageId===c.passageId);if(!source)throw new Error('Unresolved regional passage');if(source.placeId!==s.placeId)throw new Error('Regional source scope mismatch');if(s.release==='private-review'&&source.dependencyStatus!=='bounded-passages-checked')throw new Error('Unchecked source dependency');}
    for(const link of s.archiveLinks)if(!archive.articles.find(a=>a.id===link.id)?.sections[link.section-1])throw new Error('Unresolved regional archive anchor');
    if(!stories.some(old=>s.next.href===`/stories/${old.id}/`))throw new Error('Unknown next reading');
  }
  return {drafts,sources};
}
const checked=validateRegions(regionalDrafts,regionalSources);
export const privateRegionalStories=(drafts:RegionalStoryRecord[])=>drafts.filter(s=>s.release==='private-review'&&s.safety==='screened-for-private-review'&&s.rights==='original-paraphrase-no-media'&&!s.sensitiveFlags.length&&!s.withdrawal);
export const regions=privateRegionalStories(checked.drafts);
export const sourcesForRegion=(s:RegionalStoryRecord)=>checked.sources.filter(source=>regionalCitations(s).some(c=>c.sourceId===source.id));
export function regionalSource(id:string){const s=checked.sources.find(s=>s.id===id);if(!s)throw new Error('Unknown regional source');return s;}
export const regionalText=(s:RegionalStoryRecord)=>[...regionalParagraphs(s).map(p=>p.text),s.lookCloser.text,s.traditionEvidence,...s.questions,...s.glossary.map(g=>g.meaning)].join(' ');
export const regionalWordCount=(s:RegionalStoryRecord)=>regionalText(s).split(/\s+/u).length;
export const evidenceGroups=(s:RegionalStoryRecord)=>new Set(sourcesForRegion(s).map(source=>source.group));
export const places=[
  {id:'abeokuta',name:'Abẹ́òkúta',context:'Public money, women’s organising and a changing local council. Follow a bounded 1946–1953 documentary reading, then return to the preserved archive.',articleId:'ibadan-abeokuta',section:2,storyId:'abeokuta-tax-and-representation'},
  {id:'ibadan',name:'Ìbàdàn',context:'Read the preserved town section in its own context. This pilot does not supply a newly verified town-origin narrative or transfer Abẹ́òkúta’s institutions to Ìbàdàn.',articleId:'ibadan-abeokuta',section:1,storyId:null}
] as const;
for(const p of places){if(!archive.articles.find(a=>a.id===p.articleId)?.sections[p.section-1])throw new Error('Invalid place archive anchor');if(p.storyId&&!regions.some(s=>s.id===p.storyId))throw new Error('Place story is not eligible');}
