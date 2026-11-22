export interface SearchEntry {id:string;title:string;deck:string;category:string;key:string}
// This applies only to derived search keys. Display/canonical strings never change.
export const normalize=(value:string)=>value.normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase('en');
export function matches(entries:SearchEntry[],query:string):SearchEntry[]{
  const terms=normalize(query.trim()).split(/\s+/).filter(Boolean);
  return terms.length?entries.filter(entry=>terms.every(term=>entry.key.includes(term))):[];
}
