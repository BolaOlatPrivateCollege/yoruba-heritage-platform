import type { APIRoute } from 'astro';
import { archive } from '../lib/archive';
import { normalize } from '../lib/search';
export const GET:APIRoute=()=>new Response(JSON.stringify(archive.articles.map(a=>({
  id:a.id,title:a.title,deck:a.deck,category:a.category,
  key:normalize([a.title,a.deck,a.category,...a.sections.map(s=>s.h)].join(' ')),
}))),{headers:{'Content-Type':'application/json; charset=utf-8'}});
