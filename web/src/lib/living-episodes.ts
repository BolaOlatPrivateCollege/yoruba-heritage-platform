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
  },
  {
    slug:'ijapa-feast-nobody-could-finish',
    label:'Ìjàpá · A feast of promises',
    name:'Ìjàpá and the Feast Nobody Could Finish',
    deck:'A tortoise invents an honoured guest to steal a feast. But what happens when the story he tells becomes the lie everybody believes?',
    genre:'Original imaginative Ìjàpá folktale-inspired fiction',
    fictionalStatus:'This is an original story using the familiar tortoise trickster motif. Its contest, characters, feast and dialogue were invented; it is not an authenticated transcript of a named Yoruba storyteller.',
    world:'Àlọ́ · Ìjàpá',
    question:'What Ìjàpá tale did you hear at home, and how does your teller end it?',
    manuscript:'ijapa-feast-nobody-could-finish.md'
  },
  {
    slug:'moremi-fire-in-the-reeds',
    label:'Mọ́remí · Courage and the price of a promise',
    name:'Mọ́remí and the Fire in the Reeds',
    deck:'A city fears the figures arriving from the forest. One woman dares to follow them, only to discover that saving her people may cost her more than she can bear.',
    genre:'Original dramatic retelling inspired by Mọ́remí commemorative traditions',
    fictionalStatus:'Inspired by tales remembered in Ilé-Ifẹ̀, with invented dialogue, scenes and supporting characters. Local traditions differ about the vow and its meaning. This is a literary telling, not an authenticated elder testimony or historical reconstruction.',
    world:'Heroic tales · Mọ́remí',
    question:'How does your community remember Mọ́remí, and which part of the story is most important?',
    manuscript:'moremi-fire-in-the-reeds.md'
  },
  {
    slug:'lisabi-farmers-promise',
    label:'Lísàbí · The farmers who joined hands',
    name:"Lísàbí and the Farmers' Promise",
    deck:'When tribute baskets are emptied season after season, a farmer begins asking one question that could change the way his neighbours face fear.',
    genre:'Original historical-memory fiction inspired by Ẹ̀gbá Lísàbí traditions',
    fictionalStatus:'The character Yẹ́mí, conversations and specific events are invented. Ẹ̀gbá accounts of Lísàbí differ; this dramatisation does not claim to reproduce a documented battle plan or a named community telling.',
    world:'Heroic tales · Lísàbí',
    question:'Which version of Lísàbí do the Ẹ̀gbá families you know tell, and what is remembered about solidarity?',
    manuscript:'lisabi-the-farmers-promise.md'
  },
  {
    slug:'sango-when-thunder-answered',
    label:'Ṣàngó · Thunder and the weight of power',
    name:'Ṣàngó: When Thunder Answered',
    deck:'Thunder interrupts a gathering, and a visitor discovers that a royal legend, a sacred emblem and a family's belief can carry very different meanings.',
    genre:'Original framed fiction inspired by living Ṣàngó traditions',
    fictionalStatus:'The festival framing, characters and imagined kingly dialogue are literary inventions. Living sacred traditions and royal accounts vary; this story does not claim to reproduce sacred verses, a ceremony, or a factual biography.',
    world:'Living beliefs · Ṣàngó',
    question:'What name, emblem or story of Ṣàngó do people around you remember?',
    manuscript:'sango-when-thunder-answered.md'
  },
  {
    slug:'timi-gbonka-two-champions',
    label:'Tìmì and Gbónká · The endless rivalry',
    name:'Tìmì and Gbónká: The Duel That Would Not End',
    deck:'A royal contest sets two champions against one another. When the crowd demands a miracle, who has the courage to refuse?',
    genre:'Original imaginative retelling inspired by Ṣàngó-era rivalry motifs',
    fictionalStatus:'This version invents the witness Aṣàkẹ́, dialogue and a possible ending. Teller traditions differ over the contest, supernatural deeds and fates of the champions. No literal historical or miraculous claim is being made.',
    world:'Rivalries · Tìmì and Gbónká',
    question:'What happens to Tìmì and Gbónká in the version you have heard?',
    manuscript:'timi-gbonka-two-champions.md'
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
