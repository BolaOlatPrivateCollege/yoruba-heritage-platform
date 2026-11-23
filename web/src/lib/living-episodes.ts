import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {parsePilotStory,type ReaderPilot} from './reader-pilot.ts';

export type LivingEpisode={
  slug:string;
  label:string;
  name:string;
  deck:string;
  genre:string;
  fictionalStatus:string;
  world:string;
  question:string;
  manuscript:string;
  body:ReaderPilot;
};
type EpisodeSpec=Omit<LivingEpisode,'body'>;
const manifest:EpisodeSpec[]=[
  {
    slug:'esu-hat-two-views',
    label:'Èṣù · The story of two viewpoints',
    name:'The Hat That Divided the Road',
    deck:'Two friends saw one traveller. They told two different truths—and nearly lost each other.',
    genre:'Original imaginative retelling of a traditional story motif',
    fictionalStatus:'The two farmers, dialogue, colour choices and events in this written version are imagined. The Èṣù hat story has different collected tellings, but this is not a verbatim or community-authenticated version.',
    world:'Living tales · Èṣù',
    question:'What colours or ending did you hear in the version told to you?',
    manuscript:'the-hat-that-divided-the-road.md'
  },
  {
    slug:'olodumare-many-meanings',
    label:'Olódùmarè · Names and belief',
    name:'The Name That Would Not Fit Into One Answer',
    deck:'One sacred name. Several explanations. A school challenge turns into a mystery about who we listen to.',
    genre:'Original educational fiction — not an oral-history transcript',
    fictionalStatus:'Fẹ́mi, Zárà and the family/classroom discussions are invented. Their explanations introduce real questions about sacred usage and proposed word origins; no fictional speaker represents an authenticated community tradition.',
    world:'Living beliefs · Olódùmarè',
    question:'What meaning of Olódùmarè did you learn, and who taught it to you?',
    manuscript:'the-name-with-more-than-one-answer.md'
  }
];
export const livingEpisodes:LivingEpisode[]=manifest.map(entry=>{
  if(!/^[a-z0-9-]+$/u.test(entry.slug)||!/^[a-z0-9-]+\.md$/u.test(entry.manuscript))throw new Error('Unsafe episode ID or path');
  const markdown=readFileSync(resolve(process.cwd(),'../docs/story-first/',entry.manuscript),'utf8');
  const body=parsePilotStory(markdown);
  if(body.title!==entry.name)throw new Error('Manuscript title mismatch: '+entry.slug);
  return {...entry,body};
});
export function episodeHref(slug:string){if(!livingEpisodes.some(x=>x.slug===slug))throw new Error('Unknown story ID');return '/tales/'+slug+'/';}
