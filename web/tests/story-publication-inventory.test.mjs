import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {livingEpisodes} from '../src/lib/living-episodes.ts';

const root=resolve(import.meta.dirname,'../..');
const read=(path)=>readFileSync(resolve(root,path),'utf8');
const expected=[
 'esu-hat-two-views',
 'olodumare-many-meanings',
 'ijapa-feast-nobody-could-finish',
 'moremi-fire-in-the-reeds',
 'lisabi-farmers-promise',
 'sango-when-thunder-answered',
 'timi-gbonka-two-champions'
];
const newTales=expected.slice(2);

test('private public-release inventory contains each reader story and all five art concepts',()=>{
 const inventory=read('docs/story-first/PUBLICATION_RELEASE_INVENTORY.md');
 for(const slug of expected)assert.ok(inventory.includes('/tales/'+slug+'/'),'missing reader inventory: '+slug);
 for(const slug of newTales)assert.ok(inventory.includes(slug.replaceAll('-','-')),'missing concept register: '+slug);
 assert.match(inventory,/NOT AUTHORISED FOR DEPLOYMENT/);
 assert.match(inventory,/not yet part of the website/i);
 assert.match(inventory,/CMS.*NOT included/i);
 assert.match(inventory,/113 archived articles and 128 source records/);
});

test('every new full-length story has 6 chapters, visible attribution and no claimed historic certification',()=>{
 assert.deepEqual(livingEpisodes.map(e=>e.slug),expected);
 for(const episode of livingEpisodes){
  assert.equal(episode.body.chapters.length,6);
  assert.ok(episode.body.words>=1200,episode.slug);
  assert.ok(episode.fictionalStatus.length>=90,episode.slug);
  assert.match(episode.genre,/fiction|retelling/i,episode.slug);
  assert.match(episode.fictionalStatus,/invent|imagined/i,episode.slug);
 }
 const route=read('web/src/pages/tales/[slug].astro');
 assert.match(route,/Story type:/);
 assert.match(route,/No submission, personal data or audio is collected/);
 assert.match(route,/This written version has no matching narrated audio yet/);
});

test('no release inventory points the reader at uncommitted artwork or a live intake API',()=>{
 const tales=read('web/src/pages/tales/index.astro');
 const reader=read('web/src/pages/tales/[slug].astro');
 for(const src of [tales,reader]){
  assert.doesNotMatch(src,/ijapa-feast-concept\.webp|moremi-forest-concept\.webp|lisabi-farmers-concept\.webp|sango-thunder-concept\.webp|timi-gbonka-duel-concept\.webp/);
 }
 const readerLayout=read('web/src/layouts/Site.astro');
 assert.match(readerLayout,/noindex,nofollow/);
 const release=read('docs/story-first/PUBLICATION_RELEASE_INVENTORY.md');
 assert.match(release,/owner approves the exact release SHA/i);
});
