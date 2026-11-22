import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';
import {extractAlphabet} from '../scripts/alphabet.mjs';
import {importDocument} from '../../scripts/import-archive.mjs';
import {canonical} from '../../scripts/preservation.mjs';
import {toneExamples,toneFeedback} from '../src/lib/tones.ts';
const original=importDocument();
const source=original.supplementarySourceText['community.js'];
const html=route=>load(readFileSync(new URL('../dist/'+route+'/index.html',import.meta.url),'utf8'));

test('exact 25-letter inventory, 7/18 classification and distinct underdot/digraph letters',()=>{
 const rows=extractAlphabet(source);
 assert.equal(rows.map(r=>r.letter).join(' '),'A B D E Ẹ F G GB H I J K L M N O Ọ P R S Ṣ T U W Y');
 assert.equal(rows.filter(r=>r.kind==='vowel').map(r=>r.letter).join(' '),'A E Ẹ I O Ọ U');
 assert.equal(rows.filter(r=>r.kind==='consonant').length,18);
 for(const row of rows)assert.ok(source.includes(`${row.letter}:['${row.kind}','${row.guidance}']`));
 assert.equal(canonical(JSON.parse(readFileSync(new URL('../.generated/alphabet.json',import.meta.url),'utf8'))),canonical(rows));
});
test('alphabet extraction rejects missing, duplicate and changed literal syntax',()=>{
 assert.throws(()=>extractAlphabet(source.replace('const letters=','const missing=')));
 assert.throws(()=>extractAlphabet(source+"\nconst letters='A'.split(' ');\n"));
 assert.throws(()=>extractAlphabet(source.replace("A:['vowel'","A:['other'")));
});
test('static alphabet fallback retains every exact original guidance and lang tag',()=>{
 const $=html('learning/alphabet');const rows=extractAlphabet(source);
 assert.equal($('.letter-card').length,25);
 rows.forEach((r,i)=>{const card=$('.letter-card').eq(i);assert.equal(card.find('h3').text(),r.letter);assert.equal(card.find('h3').attr('lang'),'yo');assert.equal(card.find('.letter-kind').text(),r.kind);assert.equal(card.find('.letter-guidance').text(),r.guidance);assert.equal(card.attr('hidden'),undefined);});
 assert.equal($('.tone-grid .tone-character').map((_,el)=>$(el).text()).get().join('|'),'á|a|à');
});
test('all 15 pronunciation records retain exact text, meaning and note in original order',()=>{
 const $=html('learning/pronunciation');assert.equal($('.pronunciation-reference').length,15);
 original.archive.pronunciationEntries.forEach((p,i)=>{const card=$('.pronunciation-reference').eq(i);assert.equal(card.find('h3').text(),p.text);assert.equal(card.find('h3').attr('lang'),'yo');assert.equal(card.find('.reference-meaning').text(),p.meaning);assert.equal(card.find('.reference-note').text(),p.note);assert.equal(card.find('.label').text(),'Native recording pending');assert.equal(card.attr('hidden'),undefined);});
 assert.equal($('audio,video,iframe').length,0);
});
test('visual tone feedback handles all correct/incorrect choices and rejects missing examples',()=>{
 toneExamples.forEach((p,i)=>{assert.ok(source.includes(p.character));for(const answer of ['high','mid','low'])assert.equal(toneFeedback(i,answer).startsWith('Correct.'),answer===p.answer);});
 assert.throws(()=>toneFeedback(3,'high'));assert.throws(()=>toneFeedback(-1,'low'));
});
test('learning theme text pairs meet 4.5:1 calculated sRGB contrast',()=>{
 const luminance=hex=>{const c=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
 const css=readFileSync(new URL('../src/styles/site.css',import.meta.url),'utf8');
 const value=name=>css.match(new RegExp('--'+name+':#([0-9a-f]{6})'))[1];
 for(const [fg,bg]of [['cream','panel'],['muted','panel'],['bronze','panel'],['cream','ink'],['muted','ink'],['bronze','ink'],['ink','bronze']]){const a=luminance(value(fg)),b=luminance(value(bg));assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,fg+'/'+bg);}
});
