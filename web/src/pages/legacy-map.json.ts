import type { APIRoute } from 'astro';
import {archive,articleHref} from '../lib/archive';
export const GET:APIRoute=()=>new Response(JSON.stringify(Object.fromEntries(archive.articles.flatMap(a=>[
  ['#article/'+a.id,articleHref(a.id)],
  ...a.sections.map((_,i)=>['#article/'+a.id+'/section-'+(i+1),articleHref(a.id)+'#section-'+(i+1)]),
]))),{headers:{'Content-Type':'application/json; charset=utf-8'}});
