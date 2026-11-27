import {existsSync,statSync} from 'node:fs';
import {resolve} from 'node:path';
const dir='stories/osun/';
const caption='Owner-approved AI-generated illustration of an imagined story scene; not an archival photograph.';
const cover={filename:dir+'osun-cover.webp',width:1600,height:900,alt:'Àyọ̀ and Mórẹ́nikẹ́ converse beside an empty wooden stool at the river at sunset.',caption};
const descriptions=['An empty wooden stool stands among council members beneath the great tree.','Àyọ̀ observes the flooded market courtyard.','Villagers listen as Mórẹ́nikẹ́ speaks beside the river and examine the market drawing.','The elderly potter moves his wooden stool to make room for the waterkeepers.','People use the reopened market and the restored path to the river.','Àyọ̀ and Mórẹ́nikẹ́ walk beside the river at sunset.'];
const chapters=descriptions.map((alt,i)=>({filename:dir+'osun-chapter-'+String(i+1).padStart(2,'0')+'.webp',width:1600,height:900,alt,caption}));
export function illustratedOsun(slug:string){
 if(slug!=='osun-when-the-world-forgot-her')return undefined;
 return [cover,...chapters].every(a=>{const p=resolve(process.cwd(),'public','images',a.filename);return existsSync(p)&&statSync(p).isFile()&&statSync(p).size>0;})?{cover,chapters}:undefined;
}
