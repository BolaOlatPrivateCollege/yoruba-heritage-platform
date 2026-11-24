import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {sangoLivingProfile as p} from '../src/lib/sango-living-profile.ts';
const root=resolve(import.meta.dirname,'../..');
const read=file=>readFileSync(resolve(root,file),'utf8');

test('Ṣàngó narrative has substantial distinct cultural and story sections',()=>{
 assert.equal(p.slug,'sango');
 assert.ok(p.intro.length>200);
 assert.ok(p.sections.length>=7);
 assert.ok(p.sections.every(s=>s.paragraphs.length>=3));
 assert.ok(p.sections.some(s=>s.points?.length>=3));
 assert.ok(p.tales.length>=3);
 assert.ok(p.questions.length>=4);
 assert.ok(p.references.length>=2);
 assert.deepEqual(p.sections.map(s=>s.id),['royal-memory','thunder','timi-gbonka','oba-ko-so','relationships','observance','everyday']);
});
test('historical claims, sacred traditions and image provenance have explicit limits',()=>{
 const text=p.sections.map(s=>s.paragraphs.join(' ')).join(' ');
 assert.match(text,/Ọba Kò So/);
 assert.match(text,/Tìmì/);
 assert.match(text,/Ọ̀ṣẹ́ Ṣàngó/);
 assert.match(text,/not.*verified historical account|not.*verified history|not.*independently established history/i);
 assert.match(p.notes.join(' '),/AI-generated sepia artistic interpretation/);
 const approval=read('docs/SANGO_ILLUSTRATION_APPROVAL.md');
 assert.match(approval,/not.*historical photograph/i);
 const route=read('web/src/pages/figures/[slug].astro');
 assert.match(route,/import \{sangoLivingProfile\}/);
 assert.match(route,/f.slug==='sango'\?sangoLivingProfile/);
});
