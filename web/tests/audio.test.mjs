import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,mkdirSync,writeFileSync,rmSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve,dirname,basename} from 'node:path';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import {archive} from '../src/lib/archive.ts';
import {stories} from '../src/lib/stories.ts';
import {regions} from '../src/lib/regions.ts';
import {NarrationController,splitSpeech,localEnglishVoices} from '../src/lib/narration.ts';
import {AudioRecord,validateAudioManifest,textHash,wavDuration,eligibleAudio,recordings,approvedRecordings,audioContents,narrationContents} from '../src/lib/audio-recordings.ts';
const html=path=>load(readFileSync(resolve('dist',path,'index.html'),'utf8'));
const clean=dir=>{assert.equal(resolve(dirname(dir)),resolve(tmpdir()));assert.match(basename(dir),/^asa-audio-(?:test|path)-/);rmSync(dir,{recursive:true,force:true});};
const voice={name:'Synthetic test adapter only',lang:'en-GB',localService:true};
function engine(){const spoken=[],events=[];let cancellations=0;const port={speak:u=>spoken.push(u),cancel:()=>cancellations++,pause:()=>{},resume:()=>{}};return {port,spoken,events,get cancellations(){return cancellations;},controller:new NarrationController(port,text=>({text}),(...event)=>events.push(event))};}
const units=[{text:'Ilé-Ifẹ̀ remains tone-marked.',section:'opening',label:'Opening'},{text:'The next paragraph.',section:'context',label:'Context'}];
// Synthetic silence is a test fixture, never a voice sample or shipped asset.
function fixture(){
  const bytes=Buffer.alloc(44+16000);bytes.write('RIFF');bytes.writeUInt32LE(bytes.length-8,4);bytes.write('WAVEfmt ',8);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);bytes.writeUInt32LE(8000,24);bytes.writeUInt32LE(16000,28);bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(16000,40);
  const content=audioContents[0],sha256=createHash('sha256').update(bytes).digest('hex');
  const r={id:'synthetic-test',purpose:'pronunciation',contentKey:content.key,text:content.text,textSha256:textHash(content.text),contentVersion:content.version,language:'yo',variety:'Synthetic metadata fixture only',community:'Not an actual community recording',credit:'Test fixture, not a real speaker',narratorKind:'native-speaker',voiceOrProvider:'No actual voice',recorded:'2026-11-22',licence:'project-permission',usageScope:'private-review-only',rightsEvidence:'held-in-private-editorial-register',linguisticReview:{credit:'Synthetic test reviewer',date:'2026-11-22',status:'approved'},audioQC:{credit:'Synthetic test reviewer',date:'2026-11-22',status:'approved'},editorialReview:'approved-for-private-review',file:'/audio/approved/synthetic-test-v1.wav',sha256,mediaType:'audio/wav',duration:1,contentClass:'ordinary-language',sensitiveFlags:[],publicationApproval:'not-granted',version:1,updated:'2026-11-22',status:'private-review',withdrawal:null,history:[{version:1,date:'2026-11-22',action:'created'}]};
  const approval={id:r.id,version:1,sha256,textSha256:r.textSha256,consent:'granted',scope:'private-review-only',linguisticReview:'approved',audioQC:'approved',editorialReview:'approved'};
  return {bytes,r,approval};
}

test('speech chunks retain every tone-marked word and never select a remote or non-English voice',()=>{
  const text=Array(40).fill('Àdìrẹ Ilé-Ifẹ̀ Gẹ̀lẹ̀dẹ́ Ọ̀ṣun–Òṣogbo').join(' '),chunks=splitSpeech(text);assert.ok(chunks.length>1);assert.ok(chunks.every(c=>c.length<=300));assert.equal(chunks.join(' '),text);assert.deepEqual(splitSpeech('  '),[]);assert.throws(()=>splitSpeech('x',0));assert.deepEqual(localEnglishVoices([voice,{...voice,localService:false},{...voice,lang:'yo-NG'},{...voice,lang:'french'}]),[voice]);
});
test('real speech API adapter queues successive chunks, pauses, resumes, stops and ignores late cancelled events',()=>{
  const e=engine(),c=e.controller;c.start(units,voice,1);assert.equal(e.spoken.length,1);assert.equal(e.spoken[0].text,units[0].text);assert.equal(e.spoken[0].lang,'en-GB');assert.equal(c.state,'starting');e.spoken[0].onstart();assert.equal(c.state,'playing');c.pause();assert.equal(c.state,'paused');c.resume();assert.equal(c.state,'playing');e.spoken[0].onend();assert.equal(e.spoken.length,2);assert.equal(e.spoken[1].text,units[1].text);const old=e.spoken[1];c.stop();old.onend();old.onerror();assert.equal(c.state,'stopped');assert.equal(e.spoken.length,2);c.destroy();
});
test('rapid play, empty text, invalid voice/speed, thrown API calls, errors and disposal fail safely',()=>{
  const e=engine(),c=e.controller;c.start(units,voice,1.25);c.start(units,voice,1);assert.equal(e.spoken.length,1);assert.equal(e.spoken[0].rate,1.25);e.spoken[0].onerror();assert.equal(c.state,'error');c.start([],voice,1);assert.equal(c.state,'error');c.start(units,{...voice,localService:false},1);assert.equal(c.state,'error');c.start(units,voice,4);assert.equal(c.state,'error');e.port.speak=()=>{throw Error('synthetic');};c.start(units,voice,1);assert.equal(c.state,'error');c.destroy();c.start(units,voice,1);assert.equal(e.spoken.length,1);
});
test('speech completion is distinct from failure and a nonresponding engine times out without autoplay',t=>{
  t.mock.timers.enable({apis:['setTimeout']});const e=engine(),c=e.controller;assert.equal(e.spoken.length,0);c.start([units[0]],voice,1);t.mock.timers.tick(8001);assert.equal(c.state,'error');c.start([units[0]],voice,1);e.spoken.at(-1).onstart();e.spoken.at(-1).onend();assert.equal(c.state,'finished');c.destroy();
});
test('all five story pages have an honest hidden no-JS narrator and exact section pointers to visible prose',()=>{
  for(const [prefix,set]of [['stories',stories],['places',regions]])for(const s of set){const $=html(prefix+'/'+s.id);assert.equal($('[data-narrator]').length,1);assert.equal($('.narrator-controls').attr('hidden'),'');assert.equal($('.narrator-actions button').length,5);assert.match($('[data-narrator]').text(),/may mispronounce Yorùbá/);assert.match($('[data-narrator]').text(),/not a historical narrator/);assert.equal($('.narrator-status').attr('role'),'status');for(const id of $('#narrator-section option').map((_,e)=>$(e).attr('value')).get()){assert.equal($('#'+id).length,1);assert.ok($('#'+id).find('h2,.story-prose,[data-narration-text]').length);assert.equal($('#'+id).find('.story-source').length,0);}assert.equal($('audio[autoplay]').length,0);assert.equal($('meta[name="robots"]').attr('content'),'noindex,nofollow');}
});
test('pronunciation entries preserve exact original text and expose only unavailable controls, not fake audio',()=>{
  assert.equal(recordings.length,0);assert.equal(approvedRecordings.length,0);const $=html('learning/pronunciation');assert.equal($('[data-recording-unavailable]').length,15);assert.equal($('[data-recording-unavailable] button:disabled').length,15);assert.equal($('audio,source,iframe,video').length,0);archive.pronunciationEntries.forEach((p,i)=>assert.equal($('.pronunciation-reference h3').eq(i).text(),p.text));assert.equal($('.pronunciation-resource a[href="https://africa.uga.edu/Yoruba/pronunciation.html"]').length,1);assert.match($('.pronunciation-resource').text(),/not established/);assert.equal($('[src*="uga.edu"]').length,0);
});
test('produced-narration manifest texts mirror ordered narrative sections and do not copy source registers',()=>{
  assert.equal(narrationContents.length,5);for(const s of stories){const c=narrationContents.find(c=>c.key==='story:'+s.id);assert.equal(c.version,s.revision);assert.ok(c.text.startsWith(s.opening.text));let last=-1;for(const section of s.sections)for(const p of section.paragraphs){const index=c.text.indexOf(p.text);assert.ok(index>last);last=index;}assert.ok(!c.text.includes('DRAFT SOURCE REGISTER'));}assert.equal(audioContents.filter(c=>c.purpose==='pronunciation').length,15);
});
test('strict audio model rejects unknown licensing, unsafe paths, protected content and unreviewed pronunciation',()=>{
  const {r}=fixture();assert.equal(AudioRecord.safeParse(r).success,true);for(const [key,value]of [['file','https://example.com/voice.wav'],['file','/audio/approved/../secret.wav'],['file','/audio/approved/%2e%2e/voice.wav'],['file','/audio/approved/synthetic-test-v1.mp3'],['licence','unknown'],['language','en'],['narratorKind','licensed-tts'],['sensitiveFlags',['sacred']],['contentClass','sacred-verse'],['mediaType','audio/mpeg'],['publicationApproval','granted'],['version',2]]){assert.equal(AudioRecord.safeParse({...r,[key]:value}).success,false,key);}assert.equal(AudioRecord.safeParse({...r,consentDocument:'private data'}).success,false);assert.equal(AudioRecord.safeParse({...r,linguisticReview:{...r.linguisticReview,status:'pending'}}).success,false);
});
test('recording target gates reject wrong diacritics, stale revisions/hash and unknown text even for a valid file',()=>{
  const {r}=fixture();validateAudioManifest([r]);for(const change of [{contentKey:'unknown'},{contentVersion:'stale'},{text:r.text+'x',textSha256:textHash(r.text+'x')},{textSha256:'0'.repeat(64)}])assert.throws(()=>validateAudioManifest([{...r,...change}]));assert.throws(()=>validateAudioManifest([r,r]),/Duplicate/);
});
test('audio eligibility requires actual matching bytes, correct WAV type/timing and independent private approvals',()=>{
  const {r,bytes,approval}=fixture(),dir=mkdtempSync(join(tmpdir(),'asa-audio-test-'));try{mkdirSync(join(dir,'audio/approved'),{recursive:true});const path=join(dir,r.file.slice(1));assert.equal(eligibleAudio(r,approval,dir),false);writeFileSync(path,bytes);assert.equal(wavDuration(bytes),1);assert.equal(eligibleAudio(r,approval,dir),true);assert.equal(eligibleAudio(r,undefined,dir),false);for(const change of [{consent:'revoked'},{version:2},{sha256:'0'.repeat(64)},{textSha256:'0'.repeat(64)},{linguisticReview:'pending'},{audioQC:'pending'},{editorialReview:'pending'}])assert.equal(eligibleAudio(r,{...approval,...change},dir),false);assert.equal(eligibleAudio({...r,duration:2},approval,dir),false);writeFileSync(path,'<html>not audio</html>');assert.equal(eligibleAudio(r,approval,dir),false);assert.throws(()=>wavDuration(Buffer.from('not-a-wav')));}finally{clean(dir);}
});
test('withdrawal and version rules remove a previously eligible recording and reject missing reasons',()=>{
  const {r,approval}=fixture();assert.equal(AudioRecord.safeParse({...r,status:'withdrawn'}).success,false);const withdrawn={...r,status:'withdrawn',version:2,file:'/audio/approved/synthetic-test-v2.wav',withdrawal:{date:'2026-11-22',reason:'withdrawn-by-editor'},history:[...r.history,{version:2,date:'2026-11-22',action:'withdrawn'}]};assert.equal(AudioRecord.safeParse(withdrawn).success,true);assert.equal(eligibleAudio(withdrawn,{...approval,version:2},'.'),false);
});
test('approved-path resolution refuses a symlink escape from the owned audio directory',t=>{
  const {r,bytes,approval}=fixture(),dir=mkdtempSync(join(tmpdir(),'asa-audio-path-'));try{mkdirSync(join(dir,'public/audio/approved'),{recursive:true});const outside=join(dir,'outside.wav');writeFileSync(outside,bytes);try{symlinkSync(outside,join(dir,'public',r.file.slice(1)));}catch(e){if(process.platform==='win32'){t.skip('Windows symlink privilege unavailable; Linux CI executes this gate');return;}throw e;}assert.equal(eligibleAudio(r,approval,join(dir,'public')),false);}finally{clean(dir);}
});
test('browser narration bundle has no service requests, tracking, voice cloning, microphone or unsafe HTML sinks',()=>{
  const source=readFileSync('src/lib/narration-client.ts','utf8')+readFileSync('src/lib/narration.ts','utf8');assert.doesNotMatch(source,/fetch\(|XMLHttpRequest|localStorage|sessionStorage|innerHTML|SpeechRecognition|getUserMedia|sendBeacon/);assert.match(source,/localEnglishVoices/);assert.match(source,/pagehide/);assert.match(source,/visibilitychange/);assert.match(source,/textContent/);assert.match(readFileSync('src/data/audio-manifest.ts','utf8'),/audioManifest:unknown\[\]=\[\]/);
});
