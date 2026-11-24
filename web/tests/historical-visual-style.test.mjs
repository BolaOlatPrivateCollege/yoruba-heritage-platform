import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'../..');
const read=p=>readFileSync(resolve(root,p),'utf8');

test('historical visual policy includes provenance, monochrome and reconstruction labelling',()=>{
 const guide=read('docs/HISTORICAL_VISUAL_STYLE_GUIDE.md');
 assert.match(guide,/greyscale or restrained sepia/i);
 assert.match(guide,/never present it as an actual period photograph/i);
 assert.match(guide,/preserve an unaltered master/i);
 assert.match(guide,/approved by project owner/i);
});
test('historical scenes render sepia while documentary originals remain unchanged',()=>{
 const css=read('web/src/styles/heritage-visuals.css');
 assert.match(css,/heritage-visual--historical\s*\{filter:grayscale\(1\) sepia\(/);
 assert.match(css,/heritage-visual--archive-original[^\n]*\{filter:none\}/);
 const feature=read('web/src/styles/story-home-feature.css');
 assert.match(feature,/\.story-fire-scene\{filter:grayscale\(1\) sepia\(/);
 const site=read('web/src/layouts/Site.astro');
 assert.match(site,/heritage-visuals\.css/);
});
