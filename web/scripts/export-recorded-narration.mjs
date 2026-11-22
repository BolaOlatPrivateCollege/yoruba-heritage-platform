// Run from web/: node --experimental-strip-types scripts/export-recorded-narration.mjs
// Writes review transcripts outside public/ and dist/. Never calls a provider.
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {importDocument} from '../../scripts/import-archive.mjs';
import {storyDrafts} from '../src/data/story-content.ts';
import {regionalDrafts} from '../src/data/regional-content.ts';
import {storyNarration,regionalNarration,narrationTranscriptText,recordedNarrationExclusions} from '../src/lib/recorded-narration-text.ts';
importDocument(); // Verify frozen archive before deriving any production text.
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const candidates=[...storyDrafts.map(storyNarration),...regionalDrafts.filter(s=>s.release==='private-review'&&!s.withdrawal&&s.safety==='screened-for-private-review'&&!s.sensitiveFlags.length).map(regionalNarration)];
const directory=new URL('../.generated/narration-review/',import.meta.url);mkdirSync(directory,{recursive:true});
const index=candidates.map(s=>{
  const text=narrationTranscriptText(s),file=s.id+'.txt';writeFileSync(new URL(file,directory),text,'utf8');
  const sourceFile=s.kind==='story'?'story-content.ts':'regional-content.ts';
  return {id:s.id,title:s.title,kind:s.kind,contentVersion:s.contentVersion,file,transcriptSha256:hash(text),sourceFile:'web/src/data/'+sourceFile,sourceFileSha256:hash(readFileSync(new URL('../src/data/'+sourceFile,import.meta.url))),words:text.split(/\s+/u).length,characters:text.length,blocks:s.blocks.map(b=>({id:b.id,label:b.label,sha256:hash(b.text)})),exclusions:recordedNarrationExclusions,recordingStatus:'not-authorised-by-transcript'};
});
writeFileSync(new URL('index.json',directory),JSON.stringify(index,null,2)+'\n');
console.log(JSON.stringify({count:index.length,transcripts:index.map(({id,words,transcriptSha256})=>({id,words,transcriptSha256}))}));
