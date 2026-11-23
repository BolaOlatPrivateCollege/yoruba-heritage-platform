// Public-reader package audit, after project-path conversion.
// Private community intake is a local demo and must never ship in the public artifact.
import {readFileSync,writeFileSync,readdirSync,statSync,rmSync,existsSync} from 'node:fs';
import {resolve,join,relative,sep} from 'node:path';
const base=process.env.GITHUB_PAGES_BASE;
if(!base||!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(base))throw new Error('Missing safe Pages base');
const prefix='/'+base+'/';
const dist=resolve(import.meta.dirname,'../dist');
const walkway=join(dist,'community/share');
if(existsSync(walkway))rmSync(walkway,{recursive:true,force:true});
const errors=[];let htmlCount=0;let changed=0;
const sensitive=/(?:^|\/)(?:\.env(?:\..*)?|\.git|\.github|admin-preview|private|secrets?|credentials?)(?:\/|$)|\.(?:sql|sqlite|pem|key|p12|pfx|bak|map|md|ts|tsx)$/i;
const excluded=/(?:^|\/)(?:admin|api|cms|internal)(?:\/|$)/i;
const missingPrefix=new RegExp('\\b(?:href|src|action|poster)=(["\\\'])\\/(?!\\/|'+base+'\\/)','i');
function walk(dir){
 for(const entry of readdirSync(dir)){
  const file=join(dir,entry),rel=relative(dist,file).split(sep).join('/');
  if(statSync(file).isDirectory()){
   if(excluded.test(rel))errors.push('Private route included: '+rel);
   else walk(file);
   continue;
  }
  if(sensitive.test(rel))errors.push('Non-public file included: '+rel);
  if(!rel.endsWith('.html'))continue;
  htmlCount++;
  let html=readFileSync(file,'utf8');
  // Remove entry links to the now-absent private walkthrough, keeping Community accessible.
  const redirected=html.replaceAll(prefix+'community/share/',prefix+'community/');
  if(redirected!==html){writeFileSync(file,redirected);changed++;html=redirected;}
  if(/<form\b|<textarea\b|type\s*=\s*["']file["']/i.test(html)) errors.push('Unexpected form/upload element: '+rel);
  if(missingPrefix.test(html))errors.push('Unexpected unprefixed internal path: '+rel);
  if(!/<meta\s+name=["']robots["']\s+content=["']noindex,nofollow["']/i.test(html))
   errors.push('Noindex marker not found: '+rel);
 }
}
walk(dist);
if(htmlCount<120)errors.push('Unexpectedly few static HTML pages: '+htmlCount);
for(const name of ['index.html','community/index.html','tales/index.html','tales/moremi-fire-in-the-reeds/index.html']){
 if(!existsSync(join(dist,name)))errors.push('Missing mandatory reader page: '+name);
}
if(existsSync(join(dist,'community/share/index.html')))errors.push('Community walkthrough still published');
if(errors.length){console.error('Public-reader audit failed:\n'+errors.slice(0,80).join('\n'));process.exit(1);}
console.log('Public reader artifact: '+htmlCount+' HTML pages, '+changed+' private-demo links redirected, no private intake route.');
