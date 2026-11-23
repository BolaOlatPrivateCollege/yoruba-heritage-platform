import {
  contributionTypes,storyContexts,learningPaths,ageGroups,displayCredits,spokenLanguages,
  validatePrototypeDraft,explainPreviewOnly,type PrototypeDraft
} from './community-intake';

/**
 * Deliberately local-only: NO fetch, storage, cookies, clipboard, form submit,
 * uploads or hidden data collection. The preview is not a consent record.
 * Inputs are inserted using textContent, never innerHTML.
 */
const root=document.querySelector<HTMLElement>('[data-community-preview]');
if(root){
  const get=<T extends HTMLElement>(id:string):T=>{
    const element=root.querySelector<HTMLElement>('#'+id);
    if(!element)throw new Error('Missing private demo field '+id);
    return element as T;
  };
  const type=get<HTMLSelectElement>('cv-type');
  const context=get<HTMLSelectElement>('cv-context');
  const title=get<HTMLInputElement>('cv-title');
  const account=get<HTMLTextAreaElement>('cv-account');
  const place=get<HTMLInputElement>('cv-place');
  const learned=get<HTMLSelectElement>('cv-learned');
  const language=get<HTMLSelectElement>('cv-language');
  const age=get<HTMLSelectElement>('cv-age');
  const credit=get<HTMLSelectElement>('cv-credit');
  const rights=get<HTMLInputElement>('cv-rights');
  const prompt=get<HTMLElement>('cv-prompt');
  const feedback=get<HTMLElement>('cv-feedback');
  const result=get<HTMLElement>('cv-result');
  const kindOutput=get<HTMLElement>('cv-result-type');
  const nameOutput=get<HTMLElement>('cv-result-name');
  const accountOutput=get<HTMLElement>('cv-result-account');
  const contextOutput=get<HTMLElement>('cv-result-context');
  const originOutput=get<HTMLElement>('cv-result-origin');
  const creditOutput=get<HTMLElement>('cv-result-credit');
  const noteOutput=get<HTMLElement>('cv-result-note');
  const preview=get<HTMLButtonElement>('cv-preview');
  const clear=get<HTMLButtonElement>('cv-clear');

  const allowedStory=storyContexts.find(x=>x.id===new URLSearchParams(location.search).get('story'));
  if(allowedStory)context.value=allowedStory.id;
  const updatePrompt=()=>{
    prompt.textContent=contributionTypes.find(x=>x.id===type.value)?.prompt??'Tell the account in your own words.';
  };
  type.addEventListener('change',updatePrompt);
  updatePrompt();

  const read=():PrototypeDraft=>({
    type:type.value as PrototypeDraft['type'],
    context:context.value as PrototypeDraft['context'],
    title:title.value,
    account:account.value,
    broadPlace:place.value,
    language:language.value as PrototypeDraft['language'],
    howLearned:learned.value as PrototypeDraft['howLearned'],
    ageGroup:age.value as PrototypeDraft['ageGroup'],
    credit:credit.value as PrototypeDraft['credit'],
    rightsAcknowledged:rights.checked
  });

  const hidePreview=()=>{result.hidden=true;};
  for(const field of [type,context,title,account,place,learned,language,age,credit,rights]){
    field.addEventListener('input',hidePreview);
    field.addEventListener('change',hidePreview);
  }
  preview.addEventListener('click',()=>{
    const draft=read();
    const problems=validatePrototypeDraft(draft);
    if(problems.length){
      hidePreview();
      feedback.textContent='For this example: '+problems.join(' ');
      return;
    }
    kindOutput.textContent=contributionTypes.find(x=>x.id===draft.type)?.label??'Community account';
    nameOutput.textContent=draft.title.trim();
    accountOutput.textContent=draft.account.trim();
    const story=storyContexts.find(x=>x.id===draft.context);
    const languageLabel=spokenLanguages.find(x=>x.id===draft.language);
    contextOutput.textContent=(story?.label??'Another telling')+' · '+(languageLabel?.label??'Language not listed');
    const learnedLabel=learningPaths.find(x=>x.id===draft.howLearned);
    originOutput.textContent='How learned: '+(learnedLabel?.label??'')+
      (draft.broadPlace.trim()?' · Broad place: '+draft.broadPlace.trim():'');
    const creditLabel=displayCredits.find(x=>x.id===draft.credit);
    creditOutput.textContent='Possible future credit preference: '+(creditLabel?.label??'Anonymous');
    noteOutput.textContent=explainPreviewOnly(draft.ageGroup);
    feedback.textContent='Local preview shown below. No story, name, permission or account has been sent or saved.';
    result.hidden=false;
    result.scrollIntoView({block:'nearest',behavior:'auto'});
  });
  clear.addEventListener('click',()=>{
    title.value='';account.value='';place.value='';rights.checked=false;
    type.value=contributionTypes[0].id;
    context.value=storyContexts[0].id;
    learned.value=learningPaths[0].id;
    language.value=spokenLanguages[0].id;
    age.value=ageGroups[0].id;
    credit.value=displayCredits[0].id;
    updatePrompt();
    hidePreview();
    for(const el of [nameOutput,accountOutput,contextOutput,originOutput,creditOutput,noteOutput]){
      el.textContent='';
    }
    feedback.textContent='Example cleared from this page. Nothing was ever sent or stored.';
    title.focus();
  });
  root.dataset.previewReady='true';
}
