export interface SearchEntry {id:string;title:string;deck:string;category:string;key:string}
// This applies only to derived search keys. Display/canonical strings never change.
export const normalize=(value:string)=>value.normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase('en');
export function matches(entries:SearchEntry[],query:string):SearchEntry[]{
  const terms=normalize(query.trim()).split(/\s+/).filter(Boolean);
  const phrase=normalize(query.trim());
  const rank=(entry:SearchEntry)=>{
    const title=normalize(entry.title);
    return title===phrase?0:title.startsWith(phrase)?1:terms.every(term=>title.includes(term))?2:3;
  };
  return terms.length?entries.filter(entry=>terms.every(term=>entry.key.includes(term))).sort((a,b)=>rank(a)-rank(b)):[];
}
