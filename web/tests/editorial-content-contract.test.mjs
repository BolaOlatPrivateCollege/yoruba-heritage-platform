import test from 'node:test';
import assert from 'node:assert/strict';
import {validateEditorialRecord} from '../src/lib/editorial-content-contract.ts';

const valid=()=>({
  id:'b2c611df-f4f2-4e18-9c66-24320d8fcbf7',
  slug:'itan-ile-ife',
  contentKind:'story',
  genre:'imaginative-retelling',
  primaryLanguage:'yo',
  editions:[
    {language:'yo',title:'Ìtàn Ilé-Ifẹ̀',summary:'Ìtàn tó ní ìtumọ̀ fún àwọn ènìyàn.',bodyMarkdown:'Àwọn ìtàn Yorùbá lè yàtọ̀ láti ìlú dé ìlú. A ó tẹ́tí sí wọn.'},
    {language:'en',title:'A Story of Ilé-Ifẹ̀',summary:'An account shared as a storytelling example.',bodyMarkdown:'This fictional sample preserves distinct tellings without making up an elder interview.'}
  ],
  provenance:{description:'Original imaginative retelling; not testimony from an interviewed community elder.',sourceCategory:'original-author'},
  media:[],editorialState:'draft',revision:1,
  lastEditorId:'248dce42-71f2-4504-a9a2-713cc3e86c86',
  rightsReview:'pending'
});
test('Yorùbá diacritics survive draft contract validation',()=>{
 const r=validateEditorialRecord(valid());
 assert.equal(r.success,true,JSON.stringify(r.success?null:r.error.issues));
 if(r.success) assert.equal(r.data.editions[0].title,'Ìtàn Ilé-Ifẹ̀');
});
test('unrecognised private fields and invalid slugs are rejected',()=>{
 assert.equal(validateEditorialRecord({...valid(),adminPassword:'secret'}).success,false);
 assert.equal(validateEditorialRecord({...valid(),slug:'../secrets'}).success,false);
});
test('duplicate editions and missing primary edition are rejected',()=>{
 const record=valid();
 assert.equal(validateEditorialRecord({...record,editions:[record.editions[0],record.editions[0]]}).success,false);
 assert.equal(validateEditorialRecord({...record,primaryLanguage:'fr'}).success,false);
});
test('cannot validate published record with outstanding rights or uncleared media',()=>{
 const r=valid();
 assert.equal(validateEditorialRecord({...r,editorialState:'published'}).success,false);
 assert.equal(validateEditorialRecord({...r,editorialState:'published',rightsReview:'cleared',media:[{
  assetId:'1f493936-e95e-4de0-a77f-ddecb56d21b2',kind:'audio',rightsStatus:'restricted',altOrTranscript:'Example'
 }]}).success,false);
});
test('schema accepts review-cleared content but does not confer publish permission',()=>{
 const r=valid();
 assert.equal(validateEditorialRecord({...r,editorialState:'published',rightsReview:'cleared'}).success,true);
 // Publishing must still be a separately authenticated and audited server action.
});
