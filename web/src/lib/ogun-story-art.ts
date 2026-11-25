import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
const dir='stories/ogun/';
const caption='Owner-approved AI-generated illustration of an imagined story scene; not an archival photograph.';
const cover={filename:dir+'ogun-cover.webp',width:1024,height:1536,alt:'Adéwálé, Bàbá Fálọlá, Bísí and the traveller beside the forge and blocked forest path.',caption};
const descriptions=['Adéwálé and villagers examine a fallen tree blocking the rain-damaged road.','Adéwálé and Bàbá Fálọlá examine a damaged hoe as the traveller watches.','Bísí warns Adéwálé as earth collapses into the gully.','Mọ́júbà points towards a higher path as Bísí studies a map.','Adéwálé repairs a hoe while villagers work on the new route.','Bàbá Fálọlá watches Adéwálé mark the repaired hoe.'];
const chapters=descriptions.map((alt,i)=>({filename:dir+'ogun-chapter-'+String(i+1).padStart(2,'0')+'.webp',width:1600,height:900,alt,caption}));
export function illustratedOgun(slug:string){
 if(slug!=='ogun-path-nobody-could-open')return undefined;
 return [cover,...chapters].every(a=>existsSync(resolve(process.cwd(),'public','images',a.filename)))?{cover,chapters}:undefined;
}
