import type {QuizQuestion} from './quiz';
import {startQuiz,answerQuestion,nextQuestion,quizScore} from './quiz-state';

// Read only the escaped, build-validated quiz DOM. No archive/source bundle or
// fetched payload. Missing or malformed markup leaves the static readings usable.
export function initializeQuiz(root:HTMLElement):void {
  const required=<T extends HTMLElement>(selector:string):T=>{
    const node=root.querySelector<T>(selector);if(!node)throw new Error('Missing quiz markup');return node;
  };
  const cards=Array.from(root.querySelectorAll<HTMLElement>('.quiz-question'));
  const start=required<HTMLButtonElement>('#quiz-start'),stage=required<HTMLElement>('#quiz-stage');
  const next=required<HTMLButtonElement>('#quiz-next'),restart=required<HTMLButtonElement>('#quiz-restart');
  const verdict=required<HTMLElement>('#quiz-verdict'),explanation=required<HTMLElement>('#quiz-explanation');
  const progressText=required<HTMLElement>('#quiz-progress-text'),scoreText=required<HTMLElement>('#quiz-score');
  const progress=required<HTMLProgressElement>('#quiz-progress'),summary=required<HTMLElement>('#quiz-summary');
  const summaryHeading=required<HTMLElement>('#quiz-summary-heading'),summaryScore=required<HTMLElement>('#quiz-summary-score');
  const help=required<HTMLElement>('#quiz-next-help');
  const quiz:QuizQuestion[]=cards.map((card,index)=>{
    const q=card.querySelector<HTMLElement>('h2')?.textContent??'';
    const a=Array.from(card.querySelectorAll<HTMLElement>('.option-text')).map(el=>el.textContent??'');
    const correct=Number(card.dataset.correct),why=card.querySelector('[data-original-explanation]')?.textContent??'';
    const href=card.querySelector('a[data-related]')?.getAttribute('href')??'';
    const match=/^\/articles\/([a-z0-9-]+)\/$/.exec(href);
    const buttons=Array.from(card.querySelectorAll<HTMLButtonElement>('[data-choice]'));
    if(card.dataset.originalIndex!==String(index)||!q.trim()||!why.trim()||a.length<2||a.some(s=>!s.trim())||new Set(a).size!==a.length||!/^\d+$/.test(card.dataset.correct??'')||correct>=a.length||!match||buttons.length!==a.length||buttons.some((b,i)=>b.dataset.choice!==String(i)||!b.querySelector('.option-status')))throw new Error('Invalid quiz markup');
    return {q,a,correct,why,link:match[1]!};
  });
  if(quiz.length!==15||new Set(quiz.map(q=>q.q)).size!==15)throw new Error('Invalid quiz inventory');
  let state=startQuiz(quiz.length);
  const render=(moveFocus:boolean)=>{
    const score=quizScore(state,quiz),answered=state.answers.filter(a=>a!==null).length;
    progress.value=answered;progressText.textContent=state.finished?'15 of 15 answered':`Question ${state.index+1} of 15 · ${answered} answered`;
    scoreText.textContent=`Archive-key score: ${score} / 15`;
    cards.forEach((card,index)=>{card.hidden=state.finished||index!==state.index;});
    summary.hidden=!state.finished;next.hidden=state.finished;help.hidden=state.finished;
    verdict.textContent='';explanation.textContent='';
    if(state.finished){summaryScore.textContent=`${score} of 15 answers match the archived key.`;if(moveFocus)summaryHeading.focus();return;}
    const card=cards[state.index]!,question=quiz[state.index]!,choice=state.answers[state.index]!,answeredCurrent=choice!==null;
    card.querySelectorAll<HTMLButtonElement>('[data-choice]').forEach((button,index)=>{
      button.setAttribute('aria-disabled',String(answeredCurrent));button.setAttribute('aria-pressed',String(choice===index));
      const key=answeredCurrent&&index===question.correct;
      button.dataset.result=key?'key':choice===index?'chosen':'';
      button.querySelector<HTMLElement>('.option-status')!.textContent=[choice===index?'Your choice':'',key?'Archive key':''].filter(Boolean).join(' · ');
    });
    const related=card.querySelector<HTMLAnchorElement>('[data-related]')!;related.hidden=!answeredCurrent;
    next.setAttribute('aria-disabled',String(!answeredCurrent));next.textContent=state.index===14?'View results':'Next question';
    if(answeredCurrent){verdict.textContent=`${choice===question.correct?'Matches the archived key.':'Does not match the archived key.'} Archive answer ${String.fromCharCode(65+question.correct)}: ${question.a[question.correct]}.`;explanation.textContent=question.why;}
    if(moveFocus)card.querySelector<HTMLElement>('h2')!.focus();
  };
  start.addEventListener('click',()=>{start.hidden=true;stage.hidden=false;render(true);});
  cards.forEach(card=>card.querySelectorAll<HTMLButtonElement>('[data-choice]').forEach(button=>button.addEventListener('click',()=>{
    if(card.hidden)return;
    const updated=answerQuestion(state,quiz,Number(button.dataset.choice));if(updated===state)return;
    state=updated;render(false);
  })));
  next.addEventListener('click',()=>{const updated=nextQuestion(state);if(updated===state)return;state=updated;render(true);});
  restart.addEventListener('click',()=>{state=startQuiz(quiz.length);render(true);});
  start.hidden=false;
}
const root=document.querySelector<HTMLElement>('[data-quiz]');
if(root){try{initializeQuiz(root);}catch{
  const start=root.querySelector<HTMLElement>('#quiz-start'),stage=root.querySelector<HTMLElement>('#quiz-stage');
  if(start)start.hidden=true;if(stage)stage.hidden=true;
  const error=root.querySelector<HTMLElement>('#quiz-error');
  if(error)error.textContent='The interactive quiz could not be loaded. Use the related readings below, or reload this page to try again.';
}}
