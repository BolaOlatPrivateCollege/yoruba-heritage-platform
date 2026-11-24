import test from 'node:test';
import assert from 'node:assert/strict';
import {principalOdu,oduLibrary,oduHref} from '../src/lib/odu-library.ts';
test('all sixteen supplied signatures are transcribed exactly in supplied order',()=>{
 assert.deepEqual(principalOdu.map(o=>[o.slug,o.code]),[['ogbe','1111'],['oyeku','0000'],['iwori','0110'],['odi','1001'],['irosun','1100'],['owonrin','0011'],['obara','1000'],['okanran','0001'],['ogunda','1110'],['osa','0111'],['ika','0100'],['oturupon','0010'],['otura','1011'],['irete','1101'],['ose','1010'],['ofun','0101']]);
});
test('all ordered pairs have distinct routes and codes, and exactly sixteen match',()=>{
 assert.equal(oduLibrary.length,256);
 assert.equal(oduLibrary.filter(o=>o.principal).length,16);
 assert.equal(new Set(oduLibrary.map(o=>o.slug)).size,256);
 assert.deepEqual(oduLibrary.map(o=>o.decimal).sort((a,b)=>a-b),Array.from({length:256},(_,i)=>i));
 for(const o of oduLibrary){assert.equal(o.bits,o.right.code+o.left.code);assert.ok(oduLibrary.some(x=>x.right.slug===o.left.slug&&x.left.slug===o.right.slug));assert.match(oduHref(o.slug),/^\/learning\/ifa\/odu\/[a-z-]+\/$/);}
 assert.equal(oduLibrary.find(o=>o.slug==='ogbe-oyeku').bits,'11110000');
 assert.equal(oduLibrary.find(o=>o.slug==='oyeku-ogbe').bits,'00001111');
});