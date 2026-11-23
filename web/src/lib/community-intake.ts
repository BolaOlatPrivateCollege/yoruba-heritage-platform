/**
 * Community Voices: small review-safe field vocabulary for the private
 * guided prototype. This module creates NO submissions, records or uploads.
 * The eventual authenticated backend must have a separately reviewed schema.
 */
export const contributionTypes=[
  {id:'another-version',label:'Another version of a story',prompt:'Which details or ending did your people tell differently?'},
  {id:'correction',label:'Add or correct a detail',prompt:'What would you add or change, and what version do you know?'},
  {id:'firsthand-memory',label:'A memory I witnessed',prompt:'What happened in your own experience?'},
  {id:'inherited-account',label:'A story an elder or family member told me',prompt:'Tell the account as you remember hearing it.'},
  {id:'folktale',label:'A folktale or local mystery',prompt:'Tell the tale or mystery people share in your community.'},
  {id:'belief',label:'A traditional belief or sacred-name explanation',prompt:'How do people in your family or community explain this belief or name?'},
  {id:'question',label:'A question for the community',prompt:'What have you heard, and what would you like to ask other tellers?'},
  {id:'original-fiction',label:'My own original fictional story',prompt:'Tell the story you invented, with its scenes and characters.'}
] as const;
export const learningPaths=[
  {id:'witnessed',label:'I experienced or witnessed this myself'},
  {id:'family',label:'A relative or elder told me'},
  {id:'community',label:'It is told in my community'},
  {id:'other',label:'I heard it in another setting'},
  {id:'created',label:'I created this story myself'}
] as const;
export const ageGroups=[
  {id:'adult',label:'Adult (18 or older)'},
  {id:'under18',label:'Under 18 — parent, guardian or appropriately supervised youth channel required for any future real submission'}
] as const;
export const displayCredits=[
  {id:'anonymous',label:'Anonymous: no public name'},
  {id:'pseudonym',label:'Pseudonym: a chosen public name if approved later'},
  {id:'named',label:'Named: only with clear, separate public-credit consent'}
] as const;
export const storyContexts=[
  {id:'none',label:'A new account (not linked to a story)'},
  {id:'laughing-mask',label:'The Laughing Mask (original fiction)'},
  {id:'esu-hat-two-views',label:'The Hat That Divided the Road'},
  {id:'olodumare-many-meanings',label:'The Name That Would Not Fit Into One Answer'}
] as const;
export const spokenLanguages=[
  {id:'yo',label:'Yorùbá'},
  {id:'en',label:'English'},
  {id:'mix',label:'Yorùbá and English'},
  {id:'other',label:'Another language'}
] as const;
export type ContributionType=typeof contributionTypes[number]['id'];
export type LearningPath=typeof learningPaths[number]['id'];
export type AgeGroup=typeof ageGroups[number]['id'];
export type DisplayCredit=typeof displayCredits[number]['id'];
export type StoryContext=typeof storyContexts[number]['id'];
export type SpokenLanguage=typeof spokenLanguages[number]['id'];
export interface PrototypeDraft {
  type:ContributionType;context:StoryContext;title:string;account:string;
  broadPlace:string;language:SpokenLanguage;howLearned:LearningPath;
  ageGroup:AgeGroup;credit:DisplayCredit;rightsAcknowledged:boolean;
}
const includes=<T extends {id:string}>(entries:readonly T[],value:unknown):boolean=>
  typeof value==='string'&&entries.some(x=>x.id===value);
export function validatePrototypeDraft(value:PrototypeDraft):string[]{
  const issues:string[]=[];
  if(!includes(contributionTypes,value.type))issues.push('Choose how you want to contribute.');
  if(!includes(storyContexts,value.context))issues.push('Choose a story context.');
  if(!includes(spokenLanguages,value.language))issues.push('Choose a language.');
  if(!includes(learningPaths,value.howLearned))issues.push('Choose how you learned this account.');
  if(!includes(ageGroups,value.ageGroup))issues.push('Choose an age band.');
  if(!includes(displayCredits,value.credit))issues.push('Choose a future public-credit preference.');
  if(typeof value.title!=='string'||value.title.trim().length<4||value.title.length>120)issues.push('Give the account a title between 4 and 120 characters.');
  if(typeof value.account!=='string'||value.account.trim().length<30||value.account.length>5000)issues.push('Write between 30 and 5,000 characters of the account.');
  if(typeof value.broadPlace!=='string'||value.broadPlace.length>90)issues.push('Keep community or town to 90 characters or fewer.');
  if(!value.rightsAcknowledged)issues.push('Review the permission reminder before previewing.');
  return issues;
}
export function explainPreviewOnly(ageGroup:AgeGroup):string{
 return ageGroup==='under18'
 ?'A younger visitor could discuss this outline with a trusted parent, guardian or responsible adult. Nothing has been sent, saved or published.'
 :'This is a local example, not a submission. Nothing has been sent, saved or published.';
}
