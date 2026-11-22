/* Sacred World directory — independent of publishing backend. */
(()=>{
'use strict';
const D=window.HISTORY_DATA;
const html=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[ẹọṣ]/g,c=>({ẹ:'e',ọ:'o',ṣ:'s'}[c])).toLowerCase();
const categories=['All','Supreme source','Òrìṣà','Regional òrìṣà','Spiritual concept','Ancestral tradition'];
let current='All',term='';
function makeCard(p,index){
  const wrong=p.misconceptions?.[0]||'';
  const correction=wrong.split('CORRECTION:')[1]?.trim()||'Read the chapter for context.';
  return `<article class="sacred-card"><div class="sacred-card-top"><span>${String(index+1).padStart(2,'0')} / ${html(p.kind)}</span><span aria-hidden="true">✦</span></div><h3 lang="yo">${html(p.name)}</h3><p>${html(p.summary)}</p><div class="sacred-correction"><small>WHAT THE EVIDENCE CORRECTS</small><p>${html(correction)}</p></div><div class="sacred-card-foot"><span>${p.sourceIds.length} cited research leads</span><a href="#article/${encodeURIComponent(p.articleId)}" aria-label="Read full chapter on ${html(p.name)}">Read chapter ↗</a></div></article>`;
}
function render(main){
main.innerHTML=`<section class="hub-hero sacred-hero"><div class="container"><div class="eyebrow">Àṣà & Ìtàn · Sacred World</div><h1 class="display">The sacred world.<br/><em>Beyond the myths about it.</em></h1><p class="lead">Meet Olódùmarè, Èṣù, Ọ̀rúnmìlà and other sacred figures on their own terms: history, oral traditions, artistry, regional differences and common misrepresentations.</p><div class="hub-pills"><span>${D.sacredProfiles.length} source-linked profiles</span><span>7 sections per chapter</span><span>No unreviewed ritual instructions</span></div><div class="hub-links"><a class="btn" href="#article/sac-esu">Why Èṣù is not Satan ↗</a><a class="btn btn-outline" href="#article/sac-olodumare">Begin with Olódùmarè →</a><a class="btn btn-outline" href="#article/deep-name-orisa">Origins of “òrìṣà” →</a></div></div></section>
<section class="container sacred-intro"><div><span class="eyebrow">Respectful, not sensational</span><h2>Preserve the voices.<br/><em>Correct the confusion.</em></h2><p>Yoruba communities are not a single timeless congregation. A sacred figure may be described differently across towns, lineages and the Atlantic diaspora. We identify a source, its place and its limits—without declaring living testimony invalid because it differs from an English textbook.</p></div><aside class="sacred-principles"><div><strong>01 / Oral history</strong><p>Record names, location, context and permission. Never invent an elder’s testimony.</p></div><div><strong>02 / Historical evidence</strong><p>Separate museum objects and historical records from sacred belief and oral interpretation.</p></div><div><strong>03 / No forced equivalence</strong><p>Èṣù is not Satan; an òrìṣà is not automatically a Greek or Roman god.</p></div></aside></section>
<section class="container sacred-browser"><div class="section-heading"><div><div class="eyebrow">Structured profiles</div><h2 class="display">Explore the <em>knowledge.</em></h2></div><p>Search names with or without tone marks and filter by type. Names are kept in correct Yoruba orthography where verified.</p></div><label for="sacredQuery" class="sacred-search-label">Search profiles and misconceptions</label><input type="search" id="sacredQuery" class="text-input sacred-search" placeholder="Try Esu, Ogun, Yemoja, Orunmila…" autocomplete="off"/><div class="filter-bar sacred-filters" id="sacredFilters" role="group" aria-label="Filter sacred profiles">${categories.map((c,i)=>`<button type="button" class="filter ${current===c?'active':''}" data-type="${html(c)}" aria-pressed="${current===c}">${html(c)}</button>`).join('')}</div><div class="results-label" id="sacredCount" aria-live="polite"></div><div class="sacred-grid" id="sacredList"></div></section>
<section class="container sacred-research"><div><div class="eyebrow">What remains to be done</div><h2 class="display">The archive is <em>never closed.</em></h2><p>These are editorial research drafts with source-linked associations, not claims of complete religious authority. Some region-specific traditions need direct interviews and some academic links provide abstracts only. Numerous other regional òrìṣà are not yet profiled.</p><p>We welcome community historians, women elders, shrine custodians, language specialists and traditional practitioners willing to provide <strong>public, permissioned</strong> accounts. Submissions and comments require editorial review before publication.</p><div class="hub-links"><a class="btn" href="#forum/submit">Submit public evidence ↗</a><a class="btn btn-outline" href="#sources">Explore research catalogue →</a></div></div><div class="sacred-research-note"><strong>Editorial safeguards</strong><p>We do not cite Samuel Johnson’s books as factual authorities, treat social-media repetition as verification, equate spiritually meaningful stories with clinical or archaeological proof, or disclose restricted material without permission.</p><p>Source references are research leads, not proof that every sentence has been independently checked.</p></div></section>`;
  const query=main.querySelector('#sacredQuery'), filters=main.querySelector('#sacredFilters');
  query.value=term;
  function draw(){
    const found=D.sacredProfiles.filter(p=>(current==='All'||current===p.kind)&&norm([p.name,p.kind,p.scope,p.summary,p.misconceptions?.join(' ')].join(' ')).includes(norm(term)));
    main.querySelector('#sacredList').innerHTML=found.length?found.map(makeCard).join(''):'<p class="sacred-empty">No matching profiles. Search another spelling or browse all types.</p>';
    main.querySelector('#sacredCount').textContent=`${found.length} of ${D.sacredProfiles.length} profiles`;
    filters.querySelectorAll('button').forEach(x=>{let selected=x.dataset.type===current;x.classList.toggle('active',selected);x.setAttribute('aria-pressed',String(selected));});
  }
  query.addEventListener('input',()=>{term=query.value;draw()});
  filters.addEventListener('click',e=>{let btn=e.target.closest('[data-type]');if(!btn)return;current=btn.dataset.type;draw()});
  draw();
}
window.YorubaSacredWorld={render};
})();
