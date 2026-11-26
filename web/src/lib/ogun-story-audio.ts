import {existsSync,statSync} from 'node:fs';
import {resolve} from 'node:path';
export const ogunNarrationDurations=[87.875918,100.675918,106.109388,97.071020,97.306122,112.274286] as const;
export const ogunNarrationFiles=ogunNarrationDurations.map((seconds,i)=>({seconds,src:'/audio/stories/ogun/ogun-chapter-'+String(i+1).padStart(2,'0')+'.mp3'}));
export function narratedOgun(slug:string){
 if(slug!=='ogun-path-nobody-could-open')return undefined;
 return ogunNarrationFiles.every(a=>{const p=resolve(process.cwd(),'public',a.src.slice(1));return existsSync(p)&&statSync(p).isFile()&&statSync(p).size>0;})?ogunNarrationFiles:undefined;
}
