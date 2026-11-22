// Build-time only: never import this module into a browser script.
import {z} from 'zod';
import {createHash} from 'node:crypto';
import {readFileSync,realpathSync,statSync} from 'node:fs';
import {resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {archive,Id} from './archive.ts';
import {stories} from './stories.ts';
import {regions} from './regions.ts';
import {audioManifest} from '../data/audio-manifest.ts';
const Text=z.string().trim().min(1).max(2000),DateText=z.iso.date(),Hash=z.string().regex(/^[a-f0-9]{64}$/);
export const textHash=(text:string)=>createHash('sha256').update(text,'utf8').digest('hex');
export const AudioRecord=z.object({
  id:Id,purpose:z.enum(['pronunciation','narration']),contentKey:Text,text:z.string().min(1),textSha256:Hash,contentVersion:Text,
  language:z.enum(['yo','en']),variety:Text,community:Text,credit:Text,narratorKind:z.enum(['native-speaker','human-narrator','licensed-tts']),voiceOrProvider:Text,
  recorded:DateText,licence:z.enum(['CC0-1.0','CC-BY-4.0','project-permission','licensed-tts-commercial']),usageScope:z.literal('private-review-only'),rightsEvidence:z.literal('held-in-private-editorial-register'),
  linguisticReview:z.object({credit:Text,date:DateText,status:z.literal('approved')}).strict(),audioQC:z.object({credit:Text,date:DateText,status:z.literal('approved')}).strict(),editorialReview:z.literal('approved-for-private-review'),
  file:z.string().regex(/^\/audio\/approved\/[a-z0-9]+(?:-[a-z0-9]+)*-v[1-9][0-9]*\.wav$/),sha256:Hash,mediaType:z.literal('audio/wav'),duration:z.number().positive().max(7200),
  contentClass:z.enum(['ordinary-language','existing-editorial-prose']),sensitiveFlags:z.array(Text).max(0),publicationApproval:z.literal('not-granted'),
  version:z.number().int().positive(),updated:DateText,status:z.enum(['private-review','withdrawn']),withdrawal:z.object({date:DateText,reason:z.literal('withdrawn-by-editor')}).strict().nullable(),
  history:z.array(z.object({version:z.number().int().positive(),date:DateText,action:z.enum(['created','corrected','withdrawn'])}).strict()).min(1)
}).strict().superRefine((r,ctx)=>{
  const fail=(message:string)=>ctx.addIssue({code:'custom',message});
  if(r.file!==`/audio/approved/${r.id}-v${r.version}.wav`)fail('File must match recording ID/version');
  if(r.history.some((h,i)=>h.version!==i+1)||r.history.at(-1)?.version!==r.version||r.history.at(-1)?.date!==r.updated)fail('Recording version history mismatch');
  if((r.status==='withdrawn')!==Boolean(r.withdrawal)||(r.status==='withdrawn'&&r.history.at(-1)?.action!=='withdrawn'))fail('Withdrawal record mismatch');
  if(r.history.some(h=>h.action==='withdrawn')&&r.status!=='withdrawn')fail('Withdrawn history cannot silently reactivate');
  if(r.purpose==='pronunciation'&&(r.language!=='yo'||r.narratorKind!=='native-speaker'||r.contentClass!=='ordinary-language'))fail('Pronunciation requires reviewed native Yorùbá ordinary language');
  if(r.purpose==='narration'&&(r.language!=='en'||r.contentClass!=='existing-editorial-prose'))fail('Narration must follow the English editorial text');
  if(r.narratorKind==='licensed-tts'&&r.licence!=='licensed-tts-commercial')fail('Produced TTS needs licensed provider/voice rights');
  if(textHash(r.text)!==r.textSha256)fail('Transcript hash mismatch');
  for(const date of [r.recorded,r.linguisticReview.date,r.audioQC.date])if(date>r.updated)fail('Review dates cannot be after this revision');
});
export type Recording=z.infer<typeof AudioRecord>;
export interface AudioContent {key:string;text:string;version:string;purpose:'pronunciation'|'narration'}
// Optional future produced narration transcript: exactly the prose selected by the
// device reader, with stable order. No source registers/glossary/consent warnings.
export const narrationContents:AudioContent[]=[
  ...stories.map(s=>({key:`story:${s.id}`,version:s.revision,purpose:'narration' as const,text:[s.opening.text,...s.sections.flatMap(section=>[section.title,...section.paragraphs.map(p=>p.text)]),s.lookCloser.title,...s.lookCloser.paragraphs.map(p=>p.text),'Tradition and evidence',s.traditionEvidence.text,'Questions still open',...s.questions,'Research voices needed',s.voices].join('\n')})),
  ...regions.map(s=>({key:`regional:${s.id}`,version:String(s.version),purpose:'narration' as const,text:[s.opening.text,...s.sections.flatMap(section=>[section.title,...section.paragraphs.map(p=>p.text)]),s.lookCloser.title,s.lookCloser.text,'Tradition & evidence',s.traditionEvidence,'What remains unknown',...s.questions].join('\n')}))
];
export const audioContents:AudioContent[]=[...archive.pronunciationEntries.map((p,i)=>({key:`pronunciation:${i+1}`,text:p.text,version:'frozen-2026-11-22',purpose:'pronunciation' as const})),...narrationContents];
export function validateAudioManifest(raw:unknown[],contents:AudioContent[]=audioContents){
  const records=AudioRecord.array().parse(raw);
  if(new Set(records.map(r=>r.id)).size!==records.length||new Set(records.map(r=>r.contentKey)).size!==records.length)throw new Error('Duplicate recording or content key');
  for(const r of records){const content=contents.find(c=>c.key===r.contentKey);if(!content||content.purpose!==r.purpose||content.text!==r.text||content.version!==r.contentVersion||textHash(content.text)!==r.textSha256)throw new Error('Recording has unknown, stale or misspelled content');}
  return records;
}
// Resolved by an authorised editor from the private rights register, NOT manifest
// self-approval. No private reference, consent form, identity/contact data in Git.
export interface PrivateAudioApproval {id:string;version:number;sha256:string;textSha256:string;consent:'granted'|'revoked';scope:'private-review-only';linguisticReview:'approved'|'pending';audioQC:'approved'|'pending';editorialReview:'approved'|'pending'}
export function wavDuration(bytes:Buffer){
  // Initial accepted format: canonical 44-byte PCM WAV header, mono/16-bit.
  // Other encodings require a separately reviewed decoder, never trust suffixes.
  if(bytes.length<46||bytes.toString('ascii',0,4)!=='RIFF'||bytes.readUInt32LE(4)!==bytes.length-8||bytes.toString('ascii',8,12)!=='WAVE'||bytes.toString('ascii',12,16)!=='fmt '||bytes.readUInt32LE(16)!==16||bytes.readUInt16LE(20)!==1||bytes.readUInt16LE(22)!==1||bytes.readUInt16LE(34)!==16||bytes.toString('ascii',36,40)!=='data'||bytes.readUInt32LE(40)!==bytes.length-44)throw new Error('Unsupported or invalid PCM WAV file');
  const sampleRate=bytes.readUInt32LE(24);if(sampleRate<8000||sampleRate>96000||bytes.readUInt32LE(28)!==sampleRate*2||bytes.readUInt16LE(32)!==2||(bytes.length-44)%2)throw new Error('Invalid WAV timing');
  return (bytes.length-44)/(sampleRate*2);
}
export function eligibleAudio(record:Recording,approval:PrivateAudioApproval|undefined,publicRoot:string){
  if(record.status!=='private-review'||record.withdrawal||!approval||approval.id!==record.id||approval.version!==record.version||approval.sha256!==record.sha256||approval.textSha256!==record.textSha256||approval.consent!=='granted'||approval.scope!=='private-review-only'||approval.linguisticReview!=='approved'||approval.audioQC!=='approved'||approval.editorialReview!=='approved')return false;
  try{
    const root=realpathSync(publicRoot),base=realpathSync(resolve(publicRoot,'audio/approved')),path=realpathSync(resolve(publicRoot,record.file.slice(1)));
    if(!base.startsWith(root+sep)||!path.startsWith(base+sep)||!statSync(path).isFile()||statSync(path).size>32*1024*1024)return false;
    const bytes=readFileSync(path);if(createHash('sha256').update(bytes).digest('hex')!==record.sha256)return false;
    return Math.abs(wavDuration(bytes)-record.duration)<0.01;
  }catch{return false;}
}
export const recordings=validateAudioManifest(audioManifest);
// Deliberately no private approvals supplied by this task. A later authorised
// acquisition task must resolve real rights records before any asset is exposed.
const privateApprovals:PrivateAudioApproval[]=[];
const publicRoot=fileURLToPath(new URL('../../public/',import.meta.url));
export const approvedRecordings=recordings.filter(r=>eligibleAudio(r,privateApprovals.find(a=>a.id===r.id),publicRoot));
export function recordingForTerm(text:string){return approvedRecordings.find(r=>r.purpose==='pronunciation'&&r.text===text);}
