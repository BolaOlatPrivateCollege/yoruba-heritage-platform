// Production transcript preparation only. Does not authorise or load audio.
import type {StoryRecord} from './stories.ts';
import type {RegionalStoryRecord} from './regions.ts';
export interface NarrationBlock {id:string;label:string;text:string}
export interface NarrationTranscript {id:string;kind:'story'|'regional';contentVersion:string;title:string;blocks:NarrationBlock[]}
export const recordedNarrationExclusions=['subtitle and promotional deck','source registers and citations','navigation','glossary','private editorial/legal notices','optional questions and research-voices prompts'] as const;
const block=(id:string,label:string,parts:string[]):NarrationBlock=>({id,label,text:parts.join('\n\n')});
export function storyNarration(s:StoryRecord):NarrationTranscript {
  return {id:s.id,kind:'story',contentVersion:s.revision,title:s.title,blocks:[
    block('title',s.title,[s.title]),block(s.opening.id,'Opening',[s.opening.text]),
    ...s.sections.map(section=>block(section.id,section.title,[section.title,...section.paragraphs.map(p=>p.text)])),
    block('look-closely',s.lookCloser.title,[s.lookCloser.title,...s.lookCloser.paragraphs.map(p=>p.text)]),
    block('tradition-evidence','Tradition and evidence',['Tradition and evidence',s.traditionEvidence.text])
  ]};
}
export function regionalNarration(s:RegionalStoryRecord):NarrationTranscript {
  return {id:s.id,kind:'regional',contentVersion:String(s.version),title:s.title,blocks:[
    block('title',s.title,[s.title]),block(s.opening.id,'Opening',[s.opening.text]),
    ...s.sections.map(section=>block(section.id,section.title,[section.title,...section.paragraphs.map(p=>p.text)])),
    block('look-closely',s.lookCloser.title,[s.lookCloser.title,s.lookCloser.text]),
    block('tradition-evidence','Tradition & evidence',['Tradition & evidence',s.traditionEvidence])
  ]};
}
export const narrationTranscriptText=(s:NarrationTranscript)=>s.blocks.map(b=>b.text).join('\n\n');
