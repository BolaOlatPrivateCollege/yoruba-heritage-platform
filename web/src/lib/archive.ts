import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { z } from 'zod';

export const Id = z.string().regex(/^[a-z0-9-]+$/);
const Text = z.string();
export const Section = z.object({h:Text,p:Text,sourceIds:z.array(Id).min(1)}).catchall(z.unknown());
export const Article = z.object({id:Id,title:Text,deck:Text,category:Text,
  sections:z.array(Section).min(1),sourceIds:z.array(Id).min(1),evidenceType:Text,
  evidenceNote:Text,era:Text.optional(),question:Text.optional(),regions:z.array(Text).optional()}).catchall(z.unknown());
export const Source = z.object({id:Id,institution:Text,title:Text,kind:Text,detail:Text,
  url:z.url().refine(value=>new URL(value).protocol==='https:')}).catchall(z.unknown());
const Profile=z.object({id:Id,name:Text,kind:Text,scope:Text,summary:Text,confidence:Text,
  communityNeeded:Text,misconceptions:z.array(Text),sourceIds:z.array(Id),articleId:Id}).catchall(z.unknown());
const Voice=z.object({id:Id,community:Text,type:Text,title:Text,summary:Text,context:Text,
  status:Text,sourceIds:z.array(Id),readUrl:z.url()}).catchall(z.unknown());
export const Archive=z.object({articles:z.array(Article),sources:z.array(Source),
  knowledgeChapters:z.array(Article),sacredProfiles:z.array(Profile),communityVoices:z.array(Voice),
  sacredArticles:z.array(Article),deepHeritageArticles:z.array(Article),
  nameOriginArticles:z.array(Article),researchAuthorArticles:z.array(Article),
  deepTracks:z.array(z.object({title:Text,desc:Text,ids:z.array(Id)}).catchall(z.unknown())),
  oduMainNames:z.array(Text),pronunciationEntries:z.array(z.object({text:Text,meaning:Text,note:Text}).catchall(z.unknown())),
  glossary:z.array(z.object({term:Text,meaning:Text}).catchall(z.unknown()))}).catchall(z.unknown());
export type ArticleRecord=z.infer<typeof Article>;
// Build and tests run from web/. A bundled import.meta.url moves during
// prerendering; keep this server-only build input anchored to the package cwd.
const input:unknown=JSON.parse(readFileSync(resolve(process.cwd(),'.generated/archive.json'),'utf8'));
export const archive=Archive.parse(input);
export function validateReferences(data:z.infer<typeof Archive>){
  const ids=new Set(data.articles.map(a=>a.id)),sources=new Set(data.sources.map(s=>s.id));
  if(ids.size!==data.articles.length||sources.size!==data.sources.length)throw new Error('Duplicate canonical ID');
  for(const a of data.articles)for(const id of [...a.sourceIds,...a.sections.flatMap(s=>s.sourceIds)])if(!sources.has(id))throw new Error('Unresolved source ID');
  for(const p of data.sacredProfiles){if(!ids.has(p.articleId))throw new Error('Unresolved sacred article');for(const id of p.sourceIds)if(!sources.has(id))throw new Error('Unresolved profile source');}
  for(const v of data.communityVoices)for(const id of v.sourceIds)if(!sources.has(id))throw new Error('Unresolved community source');
  for(const t of data.deepTracks)for(const id of t.ids)if(!ids.has(id))throw new Error('Unresolved research pathway');
}
validateReferences(archive);
const sourceMap=new Map(archive.sources.map(source=>[source.id,source]));
export function sourceFor(id:string) {
  const source=sourceMap.get(id);
  if(!source)throw new Error(`Unresolved source: ${id}`);
  return source;
}
export const articleHref=(id:string)=>`/articles/${Id.parse(id)}/`;
export const sourceHref=(id:string)=>`/sources/${Id.parse(id)}/`;
const knowledgeIds=new Set(archive.knowledgeChapters.map(a=>a.id));
export const collections=[
  {id:'history',title:'History',intro:'Origins, places and historical evidence.',articles:archive.articles.filter(a=>!knowledgeIds.has(a.id))},
  {id:'language',title:'Language',intro:'Language, writing, names and pronunciation research.',articles:archive.articles.filter(a=>/language|linguistic|alphabet|pronunciation|tone/i.test(a.category+' '+a.title))},
  {id:'sacred',title:'Sacred World',intro:'Read the original distinctions, regional scope and evidence limits.',articles:archive.sacredArticles},
  {id:'research',title:'Deep Research',intro:'Source-linked studies and curated research pathways.',articles:archive.deepHeritageArticles},
  {id:'names',title:'Sacred Names',intro:'The two original studies of contested name origins.',articles:archive.nameOriginArticles},
  {id:'authors',title:'Author Studies',intro:'Three distinct intellectual voices and their source-critical book notes.',articles:archive.researchAuthorArticles},
];
