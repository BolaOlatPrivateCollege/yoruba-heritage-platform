import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {stories} from '../src/lib/stories.ts';
import {regions} from '../src/lib/regions.ts';
import {storyNarration,regionalNarration,narrationTranscriptText,recordedNarrationExclusions} from '../src/lib/recorded-narration-text.ts';
const hash=t=>createHash('sha256').update(t).digest('hex');
const candidates=[...stories.map(storyNarration),...regions.map(regionalNarration)];
const approvedBaselineTexts={
  'ile-ife-art-city-evidence':['9960736123caef4a361d930a738814c7964568a55cf11ece42d8fa53f22bce75',962],
  'adire-indigo-design':['9d565159c58645dd22e728268a18af397584ffabc1b5e92c3e2ee198563c92b4',877],
  'gelede-performance-knowledge':['b4cba18e218258530bd431d975e7e88aeff644415e2604fd75f39ea887f0d159',977],
  'osun-osogbo-living-landscape':['94b93906bcf93d414c98c12a8813c89dc590687199c481f0da767a8e2ce58c4e',990],
  'abeokuta-tax-and-representation':['b2746e8efb9fa5546e98d109b5bb2ea59b76fa769ca342565b72f9ccf33654bd',930]
};
test('production transcripts preserve exact approved narrative wording, diacritics and section order for all five stories',()=>{
  assert.equal(candidates.length,5);
  for(const transcript of candidates){const text=narrationTranscriptText(transcript);assert.equal(hash(text),approvedBaselineTexts[transcript.id][0]);assert.equal(text.split(/\s+/u).length,approvedBaselineTexts[transcript.id][1]);assert.equal(new Set(transcript.blocks.map(b=>b.id)).size,transcript.blocks.length);assert.equal(transcript.blocks[0].text,transcript.title);}
  assert.ok(narrationTranscriptText(candidates[0]).includes('Ilé-Ifẹ̀'));assert.ok(narrationTranscriptText(candidates[0]).includes('Ọ̀wọ̀'));
});
test('recorded main narrative has explicit boundaries and omits optional prompts, source metadata and private notices',()=>{
  for(const s of stories){const t=storyNarration(s),text=narrationTranscriptText(t);assert.equal(t.contentVersion,s.revision);assert.ok(text.includes(s.opening.text));for(const q of s.questions)assert.ok(!text.includes(q));assert.ok(!text.includes(s.voices));for(const section of s.sections)for(const p of section.paragraphs)assert.ok(text.includes(p.text));assert.ok(!text.includes('Publication approval not granted'));assert.ok(!text.includes('DRAFT SOURCE REGISTER'));}
  for(const s of regions){const t=regionalNarration(s),text=narrationTranscriptText(t);assert.equal(t.contentVersion,String(s.version));assert.ok(text.includes(s.lookCloser.text));for(const q of s.questions)assert.ok(!text.includes(q));}
  assert.ok(recordedNarrationExclusions.includes('optional questions and research-voices prompts'));
});
test('offline export produces exact UTF-8 review files and source/text attestations without shipping or authorising tracks',()=>{
  execFileSync(process.execPath,['--experimental-strip-types','scripts/export-recorded-narration.mjs'],{encoding:'utf8'});
  const index=JSON.parse(readFileSync('.generated/narration-review/index.json','utf8'));assert.equal(index.length,5);
  for(const record of index){const text=readFileSync('.generated/narration-review/'+record.file,'utf8');assert.equal(text,narrationTranscriptText(candidates.find(c=>c.id===record.id)));assert.equal(hash(text),record.transcriptSha256);assert.equal(record.sourceFileSha256,hash(readFileSync('../'+record.sourceFile)));assert.equal(record.recordingStatus,'not-authorised-by-transcript');assert.ok(!JSON.stringify(record).includes('audio/wav'));}
});
