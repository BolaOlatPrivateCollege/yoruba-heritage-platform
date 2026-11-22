import type {QuizQuestion} from './quiz';
export interface QuizState {readonly index:number;readonly answers:readonly (number|null)[];readonly finished:boolean}
export function startQuiz(count:number):QuizState {
  if(!Number.isInteger(count)||count<1)throw new Error('Quiz requires questions');
  return {index:0,answers:Array<number|null>(count).fill(null),finished:false};
}
export function answerQuestion(state:QuizState,quiz:readonly QuizQuestion[],choice:number):QuizState {
  const question=quiz[state.index];
  if(state.finished||!question||state.answers[state.index]!==null||!Number.isInteger(choice)||choice<0||choice>=question.a.length)return state;
  const answers=[...state.answers];answers[state.index]=choice;
  return {...state,answers};
}
export function nextQuestion(state:QuizState):QuizState {
  if(state.finished||state.answers[state.index]===null)return state;
  return state.index===state.answers.length-1?{...state,finished:true}:{...state,index:state.index+1};
}
export function quizScore(state:QuizState,quiz:readonly QuizQuestion[]):number {
  return state.answers.reduce<number>((score,choice,index)=>score+Number(choice!==null&&choice===quiz[index]?.correct),0);
}
