import {z} from 'zod';
// Validate without trimming, Unicode normalization or rewriting archived strings.
const Nonempty=z.string().refine(value=>value.trim().length>0,'Empty archive text');
export const QuizRecord=z.object({
  q:Nonempty,a:z.array(Nonempty).min(2),correct:z.number().int().nonnegative(),
  why:Nonempty,link:z.string().regex(/^[a-z0-9-]+$/)
}).strict().superRefine((record,ctx)=>{
  if(record.correct>=record.a.length)ctx.addIssue({code:'custom',message:'Answer index outside option list',path:['correct']});
  if(new Set(record.a).size!==record.a.length)ctx.addIssue({code:'custom',message:'Duplicate answer option',path:['a']});
});
export const QuizSet=z.array(QuizRecord).length(15).superRefine((records,ctx)=>{
  if(new Set(records.map(record=>record.q)).size!==records.length)ctx.addIssue({code:'custom',message:'Duplicate quiz question'});
});
export type QuizQuestion=z.infer<typeof QuizRecord>;
// Display identity only: original unkeyed array positions remain authoritative.
export function quizDisplayId(index:number):string {
  if(!Number.isInteger(index)||index<0||index>=15)throw new Error('Invalid original quiz position');
  return `quiz-${String(index+1).padStart(2,'0')}`;
}
