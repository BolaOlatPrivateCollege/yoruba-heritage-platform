import test from 'node:test';
import assert from 'node:assert/strict';
import {ogunNarrationFiles,narratedOgun} from '../src/lib/ogun-story-audio.ts';
test('exactly six ordered local Olu tracks, no narration on unrelated tales',()=>{
 assert.equal(ogunNarrationFiles.length,6);
 assert.deepEqual(ogunNarrationFiles.map(t=>t.src),Array.from({length:6},(_,i)=>'/audio/stories/ogun/ogun-chapter-0'+(i+1)+'.mp3'));
 assert.equal(Math.round(ogunNarrationFiles.reduce((a,t)=>a+t.seconds,0)),601);
 assert.equal(narratedOgun('osun-when-the-world-forgot-her'),undefined);
});
