// Adapt a static Astro build for GitHub's project Pages subdirectory.
// This modifies ONLY generated dist files, never source or archived manuscripts.
import {readFileSync,writeFileSync,readdirSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';

const base=process.env.GITHUB_PAGES_BASE;
if(!base||!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(base)){
 throw new Error('GITHUB_PAGES_BASE must be a simple GitHub repository name');
}
const prefix='/'+base;
const dist=resolve(import.meta.dirname,'../dist');
let htmlCount=0, replacements=0;
function walk(dir){
 for(const entry of readdirSync(dir)){
  const filepath=join(dir,entry);
  if(statSync(filepath).isDirectory()){walk(filepath);continue;}
  if(!/\.(html|css|js)$/.test(filepath))continue;
  let content=readFileSync(filepath,'utf8'),before=content;
  if(filepath.endsWith('.html')){
   // Static Astro-generated markup: root-relative internal page and asset links.
   content=content.replace(/\b(href|src|action|poster)=(["'])\/(?!\/)/gi,(_match,attr,quote)=>`${attr}=${quote}${prefix}/`);
   // Responsive image links may use srcset lists.
   content=content.replace(/\bsrcset=(["'])([^"']+)\1/gi,(_whole,quote,values)=>
    `srcset=${quote}${values.replace(/(^|,\s*)\/(?!\/)/g,(_m,sep)=>sep+prefix+'/')}${quote}`);
   htmlCount++;
  }
  if(filepath.endsWith('.css')){
   content=content.replace(/url\((["']?)\/(?!\/)/gi,(_match,quote)=>`url(${quote}${prefix}/`);
  }
  // Inline and bundled client scripts also contain internal navigation URLs.
  // Rewrite only quoted absolute URL paths, leaving protocol-relative and
  // already-prefixed URLs unchanged.
  content=content.replace(/(["'`])\/(?!\/|[a-z]+:)(?=[a-zA-Z0-9_]|_astro\/)/g,(_match,quote)=>quote+prefix+'/');
  // Avoid double prefix from the earlier attribute rewrite.
  const doublePrefix=prefix+prefix+'/';
  content=content.split(doublePrefix).join(prefix+'/');
  if(content!==before){writeFileSync(filepath,content);replacements++;}
 }
}
walk(dist);
if(htmlCount<10)throw new Error('Unexpectedly small static output; refusing Pages package');
for(const entry of ['index.html','tales/index.html','tales/moremi-fire-in-the-reeds/index.html']){
 const file=join(dist,entry);
 if(!statSync(file).isFile())throw new Error('Expected story route missing: '+entry);
}
console.log(`Prepared ${htmlCount} HTML pages and rewrote ${replacements} files for ${prefix}/`);
