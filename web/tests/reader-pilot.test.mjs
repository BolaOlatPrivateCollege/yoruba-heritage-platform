import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {parsePilotStory} from '../src/lib/reader-pilot.ts';
const manuscript=readFileSync(resolve(process.cwd(),'../docs/story-first/the-laughter-beneath-the-mask.md'),'utf8');
test('story-first pilot has six complete ordered chapters and a real ending',()=>{
  const tale=parsePilotStory(manuscript);
  assert.equal(tale.title,'Who Was the Laughing Mask Talking About?');
  assert.deepEqual(tale.chapters.map(c=>c.number),[1,2,3,4,5,6]);
  assert.ok(tale.words>1200);
  assert.ok(tale.chapters.every(c=>c.passages.length>=4));
  assert.match(tale.chapters[0].passages[0].plain,/By breakfast/);
  assert.match(tale.chapters.at(-1).passages.at(-1).plain,/room for their version/);
});
test('content parser excludes separate editorial and documentary notes',()=>{
  const tale=parsePilotStory(manuscript);
  const story=tale.chapters.flatMap(c=>c.passages).map(p=>p.plain).join(' ');
  assert.doesNotMatch(story,/UNESCO|source register|bibliography|editorial research lead/i);
  assert.ok(tale.chapters.every(c=>c.id==='chapter-'+c.number));
  assert.ok(tale.chapters.flatMap(c=>c.passages).some(p=>p.segments.some(s=>s.strong&&s.text==='IT KNOWS WHO DID IT.')));
});
test('missing chapters and short content fail closed',()=>{
  assert.throws(()=>parsePilotStory(manuscript.replace('## Chapter 6 —','## Chapter VI —')),/six complete chapters/);
  assert.throws(()=>parsePilotStory('# Stub\n## Chapter 1 — Start\nOne line.'),/six complete chapters/);
});