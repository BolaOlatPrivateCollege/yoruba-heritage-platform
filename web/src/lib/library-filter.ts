import {normalize} from './search.ts';
export interface LibraryFilterItem {key:string;access:string;role:string}
export function matchesLibrary(item:LibraryFilterItem,query:string,access:string,role:string){
  const terms=normalize(query.trim()).split(/\s+/u).filter(Boolean);
  return (access==='all'||item.access===access)&&(role==='all'||item.role===role)&&terms.every(term=>normalize(item.key).includes(term));
}
