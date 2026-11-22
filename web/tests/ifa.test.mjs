import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';
import {indexCode, pairing, movedIndex} from '../src/lib/ifa-matrix.ts';
import {archive} from '../src/lib/archive.ts';
import {importDocument} from '../../scripts/import-archive.mjs';
import {canonical, digest, readManifest} from '../../scripts/preservation.mjs';
const html = () => load(readFileSync(new URL('../dist/learning/ifa-matrix/index.html', import.meta.url), 'utf8'));

test('exact original labels, Unicode, sequence and all frozen per-record/full hashes', () => {
  const original = importDocument().archive;
  assert.equal(archive.oduMainNames.length, 16);
  assert.equal(canonical(archive.oduMainNames), canonical(original.oduMainNames));
  assert.equal(digest(archive.oduMainNames), '92b877e266d6d66cc9a62dc9b00ed9c257ef65c175e0d055f30aaa18b0887ddb');
  assert.equal(digest(archive), '89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2');
  archive.oduMainNames.forEach((name, i) => assert.equal(digest(name), readManifest().collections.oduMainNames.records[i].sha256));
});

test('bijection across all 256 ordered pairs, exact addresses and four-bit indices', () => {
  const numbers = new Set(), codes = new Set();
  for (let row = 0; row < 16; row++) for (let column = 0; column < 16; column++) {
    const p = pairing(row, column);
    assert.equal(p.number, row * 16 + column + 1);
    assert.equal(p.rowCode.length, 4); assert.equal(p.columnCode.length, 4);
    assert.equal(parseInt(p.rowCode, 2), row); assert.equal(parseInt(p.columnCode, 2), column);
    numbers.add(p.number); codes.add(p.rowCode + p.columnCode);
  }
  assert.deepEqual([...numbers], Array.from({length:256}, (_, i) => i + 1));
  assert.equal(codes.size, 256);
  assert.equal(indexCode(0), '0000'); assert.equal(indexCode(15), '1111');
});

test('invalid row, column and navigation indices fail closed', () => {
  for (const bad of [-1,16,NaN,Infinity,-Infinity,0.5,'1',null,undefined,{},true]) {
    assert.throws(() => indexCode(bad), RangeError);
    assert.throws(() => pairing(bad,0), RangeError);
    assert.throws(() => pairing(0,bad), RangeError);
  }
  for (const bad of [-1,256,NaN,Infinity,1.5,'0',null]) assert.throws(() => movedIndex(bad,'Home'), RangeError);
});

test('all navigation cells respect row/column edges and Home/End semantics', () => {
  for (let i = 0; i < 256; i++) {
    const r = Math.floor(i/16), c = i%16;
    assert.equal(movedIndex(i,'ArrowLeft'), r*16 + Math.max(0,c-1));
    assert.equal(movedIndex(i,'ArrowRight'), r*16 + Math.min(15,c+1));
    assert.equal(movedIndex(i,'ArrowUp'), Math.max(0,r-1)*16+c);
    assert.equal(movedIndex(i,'ArrowDown'), Math.min(15,r+1)*16+c);
    assert.equal(movedIndex(i,'Home'), r*16); assert.equal(movedIndex(i,'End'), r*16+15);
    assert.equal(movedIndex(i,'Home',true),0); assert.equal(movedIndex(i,'End',true),255);
    assert.equal(movedIndex(i,'Tab'),i);
  }
});

test('static page escapes labels with exact axis/button parity and semantic navigation', () => {
  const $ = html(), names = archive.oduMainNames;
  assert.equal($('[data-pair]').length,256);
  assert.equal($('th[scope="row"]').length,16); assert.equal($('th[scope="col"]').length,17);
  names.forEach((name,i) => {
    assert.equal($('.odu-list li').eq(i).text(),name); assert.equal($('.odu-list li').eq(i).attr('lang'),'yo');
    assert.equal($('th[scope="row"] [lang="yo"]').eq(i).text(),name);
    assert.equal($('th[scope="col"] [lang="yo"]').eq(i).text(),name);
    for (const id of ['ifa-row','ifa-column']) assert.equal($(`#${id} option`).eq(i).text(),name);
  });
  $('[data-pair]').each((i,el) => {
    assert.equal($(el).attr('data-pair'),String(i+1));
    assert.equal($(el).attr('aria-label'),`Pair ${i+1}: row ${names[Math.floor(i/16)]}, column ${names[i%16]}`);
    assert.equal($(el).attr('type'),'button');
  });
  assert.equal($('[data-pair][tabindex="0"]').length,1);
  assert.equal($('#ifa-status[role="status"][aria-live="polite"][aria-atomic="true"]').length,1);
  for (const selector of ['#ifa-row-name','#ifa-column-name']) assert.equal($(selector).attr('lang'),'yo');
});

test('honest static fallback, mathematics, cultural limits and resolving source links', () => {
  const $ = html();
  assert.equal($('#ifa-controls[hidden]').length,1); assert.equal($('#ifa-fallback[hidden]').length,0);
  assert.match($('#ifa-fallback').text(),/Interaction requires JavaScript/);
  assert.match($('main').text(),/2⁴ = 16/); assert.match($('main').text(),/16 × 16 = 2⁸ = 256/);
  assert.match($('#ifa-caveat').text(),/not authenticated ritual sign mappings/);
  assert.match($('#ifa-caveat').text(),/no liturgical ranking/);
  assert.match($('#ifa-caveat').text(),/No complete verse texts, divination or predictions/);
  for (const id of ['deep-ifa-odu-binary','deep-ifa-tradition']) {
    assert.ok($(`a[href="/articles/${id}/"]`).length);
    assert.ok(archive.articles.some(a => a.id === id));
  }
});

test('client exposes no full archive, HTML sinks, storage, network or media side effects', () => {
  const source = readFileSync(new URL('../src/lib/ifa-client.ts',import.meta.url),'utf8');
  assert.doesNotMatch(source,/innerHTML|outerHTML|insertAdjacentHTML|localStorage|sessionStorage|document\.cookie|fetch\(|XMLHttpRequest|sendBeacon|speechSynthesis|getUserMedia|from ['"].*archive/);
  assert.doesNotMatch(html().html(),/supplementarySourceText|window\.HISTORY_DATA|ADMIN_PASSWORD|YORUBA_DB_PATH/);
  assert.equal(html()('audio,video,iframe,form').length,0);
});

test('matrix uses established high-contrast theme and persistent non-colour selection cue', () => {
  const css = readFileSync(new URL('../src/styles/ifa.css',import.meta.url),'utf8');
  const theme = readFileSync(new URL('../src/styles/site.css',import.meta.url),'utf8');
  const luminance = hex => {
    const c=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
    return c[0]*.2126+c[1]*.7152+c[2]*.0722;
  };
  const value = name => theme.match(new RegExp('--'+name+':#([0-9a-f]{6})'))[1];
  for (const [fg,bg] of [['cream','panel'],['cream','panel2'],['muted','ink'],['ink','bronze']]) {
    const a=luminance(value(fg)),b=luminance(value(bg));
    assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,fg+'/'+bg);
  }
  assert.match(css,/\[aria-pressed=true\] \.ifa-check\{display:inline\}/);
  assert.match(css,/forced-colors:active/);
  assert.equal(html()('.ifa-check').first().text(),' ✓');
});
