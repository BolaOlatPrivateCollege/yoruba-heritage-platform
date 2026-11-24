import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {ogunLivingProfile as p} from '../src/lib/ogun-living-profile.ts';
const root=resolve(import.meta.dirname,'../..');
const read=(file)=>readFileSync(resolve(root,file),'utf8');

test('Ògún reader has complete long-form and variant-aware sections',()=>{
 assert.equal(p.slug,'ogun');
 assert.equal(p.name,'Ògún');
 assert.ok(p.sections.length>=6);
 assert.ok(p.sections.every(section=>section.paragraphs.length>=3));
 assert.ok(p.tales.length>=3);
 assert.ok(p.questions.length>=4);
 assert.ok(p.references.length>=3);
 assert.deepEqual(p.sections.map(x=>x.id),['pathfinder','iron-work','ire','relationships','symbols','truth']);
});

test('difficult legends, oaths and visual material retain documented limitations',()=>{
 const text=p.sections.map(x=>x.paragraphs.join(' ')).join(' ');
 assert.match(text,/Ìrè-Èkìtì/);
 assert.match(text,/Ṣàngó/);
 assert.match(text,/Ọya/);
 assert.match(text,/oath/);
 assert.match(p.notes.join(' '),/not.*historical photograph/i);
 assert.match(p.notes.join(' '),/held for native-speaker transcription/);
 const route=read('web/src/pages/figures/[slug].astro');
 assert.match(route,/ogunLivingProfile/);
 assert.match(route,/f.slug==='ogun'\?ogunLivingProfile/);
 const approval=read('docs/OGUN_ILLUSTRATION_APPROVAL.md');
 assert.match(approval,/not.*real historic photograph/i);
});
