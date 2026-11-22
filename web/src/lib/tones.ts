// Character-only examples already present in community.js renderAlphabet and
// know-alphabet. These are visual labels, not new words or translations.
export const toneExamples=[{character:'á',answer:'high',explanation:'Acute accent · high pitch'},{character:'a',answer:'mid',explanation:'Usually no tone accent · mid pitch'},{character:'à',answer:'low',explanation:'Grave accent · low pitch'}] as const;
export type Tone=typeof toneExamples[number]['answer'];
export function toneFeedback(index:number,answer:string):string {
  const example=toneExamples[index];
  if(!example)throw new Error('Unknown tone example');
  return answer===example.answer ? `Correct. ${example.explanation}.` : `Try again. Look above the character for a tone accent.`;
}
