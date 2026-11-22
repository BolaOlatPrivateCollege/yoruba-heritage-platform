import {toneExamples,toneFeedback} from './tones';
import {normalize} from './search';
document.querySelectorAll<HTMLElement>('[data-enhanced]').forEach(el=>{el.hidden=false;});
const alphabet=document.querySelector<HTMLElement>('[data-alphabet]');
if(alphabet){
  const cards=Array.from(alphabet.querySelectorAll<HTMLElement>('[data-letter]'));
  const filters=Array.from(alphabet.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const status=document.querySelector<HTMLElement>('#alphabet-status')!;
  filters.forEach(button=>button.addEventListener('click',()=>{
    filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    cards.forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.kind!==button.dataset.filter;});
    status.textContent=`${cards.filter(c=>!c.hidden).length} letters shown. ${button.textContent}.`;
  }));
  cards.forEach(card=>card.querySelector<HTMLButtonElement>('[data-select]')!.addEventListener('click',()=>{
    cards.forEach(c=>c.querySelector('[data-select]')!.setAttribute('aria-pressed',String(c===card)));
    const text=`${card.dataset.letter} · ${card.dataset.kind} · ${card.querySelector('.letter-guidance')!.textContent}`;
    document.querySelector<HTMLElement>('#letter-detail')!.textContent=text;
    status.textContent=`Selected ${text}.`;
  }));
}
const practice=document.querySelector<HTMLElement>('[data-practice]');
if(practice){
  let index=0;
  const feedback=document.querySelector<HTMLElement>('#practice-feedback')!;
  const display=()=>{document.querySelector<HTMLElement>('#practice-character')!.textContent=toneExamples[index]!.character;document.querySelector<HTMLElement>('#practice-progress')!.textContent=`Character ${index+1} of ${toneExamples.length}`;};
  display();
  practice.querySelectorAll<HTMLButtonElement>('[data-answer]').forEach(b=>b.addEventListener('click',()=>{feedback.textContent=toneFeedback(index,b.dataset.answer??'');}));
  document.querySelector('#practice-next')!.addEventListener('click',()=>{index=(index+1)%toneExamples.length;display();feedback.textContent=`Next: character ${index+1} of ${toneExamples.length}. Choose a tone.`;});
  document.querySelector('#practice-reset')!.addEventListener('click',()=>{index=0;display();feedback.textContent='Practice reset. Character 1 of 3. Choose a tone.';});
}
const query=document.querySelector<HTMLInputElement>('#pronunciation-query');
if(query){
  const cards=Array.from(document.querySelectorAll<HTMLElement>('.pronunciation-reference'));
  const update=()=>{const key=normalize(query.value.trim());cards.forEach(c=>{c.hidden=!normalize(c.textContent??'').includes(key);});document.querySelector<HTMLElement>('#pronunciation-status')!.textContent=`${cards.filter(c=>!c.hidden).length} references shown.`;};
  query.addEventListener('input',update);
  document.querySelector('#pronunciation-reset')!.addEventListener('click',()=>{query.value='';update();});
}
