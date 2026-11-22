import {z} from 'zod';
import {archive,Id} from './archive.ts';
import {storyDrafts} from '../data/story-content.ts';
import {storySources,researchGaps} from '../data/story-sources.ts';
const Nonempty=z.string().min(1);
export const Paragraph=z.object({id:Id,text:Nonempty,
  kind:z.enum(['documented-record','scholarly-interpretation','community-account','editorial-reflection']),
  citations:z.array(z.object({sourceId:Id,passageId:Id}))
}).strict().refine(p=>p.kind==='editorial-reflection'?p.citations.length===0:p.citations.length>0,'Factual paragraphs need passage citations; reflections must be identified separately');
export const Story=z.object({id:Id,title:Nonempty,subtitle:Nonempty,deck:Nonempty,place:Nonempty,
  theme:z.enum(['clay','indigo','performance','river']),illustration:Nonempty,illustrationAlt:Nonempty,
  editorialStatus:z.literal('research-draft'),reviewStatus:z.literal('unreviewed'),rightsStatus:z.literal('unknown'),publicationApproval:z.literal('not-granted'),revision:Nonempty,
  opening:Paragraph,sections:z.array(z.object({id:Id,title:Nonempty,paragraphs:z.array(Paragraph).min(1)}).strict()).min(5).max(8),
  lookCloser:z.object({title:Nonempty,paragraphs:z.array(Paragraph).min(1)}).strict(),
  traditionEvidence:Paragraph,questions:z.array(Nonempty).min(2),voices:Nonempty,
  glossary:z.array(z.object({term:Nonempty,meaning:Nonempty,citation:z.object({sourceId:Id,passageId:Id}).strict()}).strict()).min(2),
  archiveLinks:z.array(z.object({id:Id,section:z.number().int().positive(),reason:Nonempty}).strict()).min(3),next:Id
}).strict();
export const EvidenceSource=z.object({id:Id,title:Nonempty,publisher:Nonempty,url:z.url().refine(v=>new URL(v).protocol==='https:'),
  material:Nonempty,locality:Nonempty,accessed:z.literal('2026-11-22'),accessStatus:z.literal('inspected-passages'),reviewStatus:z.literal('unreviewed'),rightsStatus:z.literal('unknown'),rightsNote:Nonempty,johnsonStatus:z.enum(['bounded-scope-examined','unchecked']),johnsonAssessment:Nonempty,
  passages:z.array(z.object({id:Id,locator:Nonempty,supports:Nonempty,limits:Nonempty}).strict()).min(1)
}).strict();
export type StoryRecord=z.infer<typeof Story>;
export type ParagraphRecord=z.infer<typeof Paragraph>;
export type SourceRecord=z.infer<typeof EvidenceSource>;
export const stories=Story.array().length(4).parse(storyDrafts);
export const sources=EvidenceSource.array().parse(storySources);
export {researchGaps};
export const storyHref=(id:string)=>`/stories/${Id.parse(id)}/`;
export function storyFor(id:string){const s=stories.find(s=>s.id===id);if(!s)throw new Error('Unknown story');return s;}
export function evidenceFor(id:string){const s=sources.find(s=>s.id===id);if(!s)throw new Error('Unknown story source');return s;}
export const paragraphsFor=(s:StoryRecord)=>[s.opening,...s.sections.flatMap(section=>section.paragraphs),...s.lookCloser.paragraphs,s.traditionEvidence];
export const wordCount=(text:string)=>text.trim().split(/\s+/u).filter(Boolean).length;
export const storyText=(s:StoryRecord)=>[...paragraphsFor(s).map(p=>p.text),...s.questions,s.voices,...s.glossary.flatMap(g=>[g.term,g.meaning])].join(' ');
export const storyWordCount=(s:StoryRecord)=>wordCount(storyText(s));
export const readingMinutes=(words:number)=>{
  if(!Number.isInteger(words)||words<0)throw new RangeError('Expected nonnegative word count');
  return Math.max(1,Math.ceil(words/200));
};
export const sourcesFor=(s:StoryRecord)=>sources.filter(source=>paragraphsFor(s).some(p=>p.citations.some(c=>c.sourceId===source.id)));
export const paragraphLabels:Record<ParagraphRecord['kind'],string>={
  'documented-record':'Documented source record','scholarly-interpretation':'Attributed scholarly / curatorial interpretation',
  'community-account':'Published organisation account','editorial-reflection':'Editorial reflection · a question or reading approach'
};
export function validateEditorial(storySet:StoryRecord[],sourceSet:SourceRecord[]){
  const ids=new Set(storySet.map(s=>s.id)),sourceIds=new Set(sourceSet.map(s=>s.id));
  if(ids.size!==storySet.length||sourceIds.size!==sourceSet.length)throw new Error('Duplicate editorial ID');
  for(const source of sourceSet){
    if(/samuel\s+johnson|history of the yorubas/i.test(source.title+' '+source.publisher))throw new Error('Excluded authority');
    if(new Set(source.passages.map(p=>p.id)).size!==source.passages.length)throw new Error('Duplicate passage ID');
  }
  for(const story of storySet){
    if(!ids.has(story.next)||story.next===story.id)throw new Error('Invalid next story');
    if(!/^[a-z-]+\.svg$/.test(story.illustration))throw new Error('Unregistered illustration path');
    const anchors=[...story.sections.map(s=>s.id),...paragraphsFor(story).map(p=>p.id)];
    if(new Set(anchors).size!==anchors.length)throw new Error('Duplicate story anchor');
    for(const p of paragraphsFor(story)){
      Paragraph.parse(p);
      for(const c of p.citations){
        const source=sourceSet.find(s=>s.id===c.sourceId);
        if(!source||!source.passages.some(p=>p.id===c.passageId))throw new Error('Unresolved evidence passage');
        if(source.johnsonStatus!=='bounded-scope-examined')throw new Error('Unchecked dependency cannot support factual prose');
        EvidenceSource.parse(source);
      }
    }
    for(const link of story.archiveLinks){
      const a=archive.articles.find(a=>a.id===link.id);
      if(!a||!a.sections[link.section-1])throw new Error('Unresolved canonical section');
    }
    for(const term of story.glossary){const source=sourceSet.find(s=>s.id===term.citation.sourceId);if(!source||!source.passages.some(p=>p.id===term.citation.passageId)||source.johnsonStatus!=='bounded-scope-examined')throw new Error('Unresolved glossary evidence');}
  }
}
validateEditorial(stories,sources);

export const journeys=[
  {id:'objects',title:'Objects reveal history',intro:'Begin with a face, then follow materials, making and the evidence behind a museum label.',steps:[
    {kind:'story',id:'ile-ife-art-city-evidence',why:'Meet specific objects and the questions their records leave open.'},
    {kind:'archive',id:'ile-ife',why:'Read the preserved introduction to the city and its art.'},
    {kind:'archive',id:'art',why:'Ask about form, use and stewardship.'},
    {kind:'archive',id:'know-metallurgy',why:'Continue into the history and interpretation of skilled work.'},
    {kind:'archive',id:'how-we-know',why:'Return to the methods used to read material evidence.'}]},
  {id:'cloth',title:'Cloth, work and ingenuity',intro:'Follow a protected patch of cotton into design, apprenticeship and the social life of dress.',steps:[
    {kind:'story',id:'adire-indigo-design',why:'Read the new process-led Àdìrẹ feature.'},
    {kind:'archive',id:'know-adire',why:'Compare the original design-intelligence overview.'},
    {kind:'archive',id:'know-learning-pathways',why:'Ask how knowledge moves between skilled workers.'},
    {kind:'archive',id:'know-clothing',why:'Explore dress and social identity.'},
    {kind:'archive',id:'know-enterprise',why:'Consider livelihoods, attribution and value.'}]},
  {id:'living',title:'Performance and living landscapes',intro:'Move between a collected mask and a cared-for grove, with each community’s context kept visible.',steps:[
    {kind:'story',id:'gelede-performance-knowledge',why:'Look beyond a mask to performance and reasoning.'},
    {kind:'archive',id:'know-gelede',why:'Compare the original performance overview.'},
    {kind:'archive',id:'know-performance',why:'Explore movement, music and public knowledge.'},
    {kind:'story',id:'osun-osogbo-living-landscape',why:'Meet the work and records of grove restoration.'},
    {kind:'archive',id:'heritage',why:'Consider care, visitors and the limits of a heritage label.'}]},
  {id:'voices',title:'Who gets to tell the story?',intro:'A route through authorship, oral knowledge and the questions that make an archive accountable.',steps:[
    {kind:'archive',id:'how-we-know',why:'Start with different kinds of evidence.'},
    {kind:'archive',id:'know-oral-literature',why:'Consider what performance records can preserve.'},
    {kind:'archive',id:'deep-myths-storytelling',why:'Read the community-first recording protocol.'},
    {kind:'archive',id:'regional-states',why:'Keep different places and local archives in view.'},
    {kind:'archive',id:'know-future-archive',why:'Ask what consent and correction require next.'}]},
] as const;
for(const journey of journeys)for(const step of journey.steps){
  if(step.kind==='story')storyFor(step.id);
  else if(!archive.articles.some(a=>a.id===step.id))throw new Error('Unresolved journey article');
}
export function journeyStep(step:{kind:'story'|'archive';id:string}){
  if(step.kind==='story'){const s=storyFor(step.id);return {title:s.title,href:storyHref(s.id),minutes:readingMinutes(storyWordCount(s)),draft:true};}
  const a=archive.articles.find(a=>a.id===step.id);if(!a)throw new Error('Unknown article');
  return {title:a.title,href:`/articles/${a.id}/`,minutes:readingMinutes(wordCount(a.sections.map(s=>s.p).join(' '))),draft:false};
}
