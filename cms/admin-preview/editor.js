/**
 * PRIVATE CMS DESIGN PREVIEW — IN-MEMORY DEMO ONLY.
 *
 * No API, authentication, persistence, uploads, network, or publication.
 * This is deliberately not imported by the public Astro site.
 */
export const categories=Object.freeze([
 ['story','Stories & folktales'],['belief','Beliefs & traditions'],
 ['figure','Cultural figures'],['place','Places & memories'],
 ['research','Research'],['learning','Language & learning'],
 ['editorial-page','Website pages']
]);
export const example=Object.freeze({
 title:'Ìtàn àṣà Yorùbá',slug:'itan-asa-yoruba',category:'story',
 language:'yo',summary:'A sample editorial draft for demonstrating the private dashboard.',
 body:'This is a fictional sample written for a private design preview. It is not community testimony, and it is not published.'
});
export function cleanTitle(value){return String(value).trim().slice(0,180);}
export function draftSummary(record){
 const title=cleanTitle(record.title);
 return {
  title:title||'Untitled draft',
  slug:String(record.slug).trim(),
  category:String(record.category),
  language:String(record.language),
  summary:String(record.summary).trim(),
  body:String(record.body),
  status:'Unpublished local example'
 };
}
export function previewText(record){
 const v=draftSummary(record);
 return [v.title,v.summary,v.body].join('\n\n');
}
