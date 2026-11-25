import test from 'node:test';
import assert from 'node:assert/strict';
import {livingEpisodes,episodeHref} from '../src/lib/living-episodes.ts';

test('ten complete tales keep distinct genres, stable IDs and 6 rich chapters each',()=>{
  assert.deepEqual(livingEpisodes.map(x=>x.slug),['esu-hat-two-views','olodumare-many-meanings','ijapa-feast-nobody-could-finish','moremi-fire-in-the-reeds','lisabi-farmers-promise','sango-when-thunder-answered','timi-gbonka-two-champions','ogun-path-nobody-could-open','osun-when-the-world-forgot-her','yemoja-river-that-remembered']);
  assert.equal(new Set(livingEpisodes.map(x=>x.slug)).size,10);
  for(const e of livingEpisodes){
    assert.equal(e.body.title,e.name);
    assert.ok(e.body.words>=1200,e.slug+': full length');
    assert.deepEqual(e.body.chapters.map(c=>c.number),[1,2,3,4,5,6]);
    assert.ok(e.body.chapters.every(c=>c.passages.length>=4));
    assert.match(e.fictionalStatus,/invented|imagined|invents|invention/i);
    assert.equal(episodeHref(e.slug),'/tales/'+e.slug+'/');
    const text=e.body.chapters.flatMap(c=>c.passages).map(p=>p.plain).join(' ');
    assert.doesNotMatch(text,/source register|museum accession|bibliography|http(s)?:\/\//i);
    assert.doesNotMatch(text,/<script|<iframe|<style/i);
  }
});
test('provenance of traditional variant and original educational fiction never conflated',()=>{
  const hat=livingEpisodes[0];
  const name=livingEpisodes[1];
  assert.match(hat.genre,/retelling/i);
  assert.match(hat.fictionalStatus,/not.*verbatim|not.*authenticated/i);
  assert.match(name.genre,/fiction/i);
  assert.match(name.fictionalStatus,/no fictional speaker.*authenticated/i);
  assert.match(hat.body.chapters.at(-1).passages.at(-1).plain,/room for two/i);
  assert.match(name.body.chapters.at(-1).passages.at(-1).plain,/too interesting to close/i);
});
test('only known static episode IDs are allowed',()=>{
  assert.throws(()=>episodeHref('nonexistent'),/Unknown story ID/);
  assert.throws(()=>episodeHref('../private-data'),/Unknown story ID/);
});
test('eight added manuscripts are full, openly literary tellings and are not silent historical claims',()=>{
 const added=livingEpisodes.slice(2);
 assert.equal(added.length,8);
 for(const episode of added){
  assert.match(episode.genre,/fiction|retelling/i,episode.slug);
  assert.match(episode.fictionalStatus,/invented|invention|imagined|invents/i,episode.slug);
  assert.ok(episode.question.length>20);
  assert.ok(episode.body.chapters.every(ch=>ch.passages.length>=4),episode.slug);
 }
});
