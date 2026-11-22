import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadPreservedArchive,digest,canonical} from './preservation.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const a=loadPreservedArchive();
const notes=JSON.parse(readFileSync(resolve(root,'scripts/editorial-notes.json'),'utf8'));
const words=text=>text.trim().split(/\s+/u).filter(Boolean).length;
const key=text=>text.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();
const places=['Ilé-Ifẹ̀','Ọ̀yọ́','Ìbàdàn','Abẹ́òkúta','Ìjẹ̀bú','Ọ̀wọ̀','Èkìtì','Ìjẹ̀ṣà','Ilọrin','Òṣogbo','Ìlọbú','Ketu','Benin','Togo','Brazil','Cuba','Lagos','Kogi','Ethiopia'];
const sourceMap=new Map(a.sources.map(s=>[s.id,s]));
const mentionMap=new Map(a.articles.map(article=>[article.id,places.filter(place=>key(article.title+' '+article.sections.map(s=>s.p).join(' ')).includes(key(place)))]));
const coverage=new Map(places.map(place=>[place,[...mentionMap.values()].filter(v=>v.includes(place)).length]));
const pilotIds=['ile-ife','know-adire','know-gelede','heritage'];
function access(s){
 const t=key(s.kind+' '+s.detail);
 if(/not (?:independently )?(?:read|reviewed|verified|inspected|retrievable)|not been|could not|abstract|catalogue|bibliograph|publisher record|repository record|partial|limited preview|book record|listing/.test(t))return 'metadata-or-limited-text-declared';
 if(/full text|full article|open access|openly readable/.test(t))return 'full-text-declared-not-rechecked';
 if(/object|collection/.test(t))return 'object-record-declared-not-rechecked';
 if(/heritage|unesco|official/.test(t))return 'heritage-or-institutional-record-declared-not-rechecked';
 return 'access-unknown-until-inspected';
}
const records=a.articles.map(article=>{
 assert.ok(notes[article.id],article.id);const wordCount=words(article.sections.map(s=>s.p).join(' '));
 const ids=[...new Set([...article.sourceIds,...article.sections.flatMap(s=>s.sourceIds)])];
 const sourceRecords=ids.map(id=>{const s=sourceMap.get(id);assert.ok(s,id);return {id,title:s.title,type:s.kind,url:s.url,declaredDetail:s.detail,accessClassification:access(s),accessVerifiedThisTask:false,sourceOfSource:/johnson/i.test(s.detail)?'known-exclusion-dependency-warning-in-metadata':'unchecked',rights:'unknown'};});
 const text=key(article.title+' '+article.category+' '+article.sections.map(s=>s.p).join(' '));
 const sensitivity=[];
 if(/sacred|orisa|ifa|ritual|deity|deities|spiritual|gelede|egungun|aje|creation/.test(text))sensitivity.push('sacred/custodial');
 if(/medicin|healing|therap|midwif|smallpox|clinical|herb|genom|dna|fossil/.test(text))sensitivity.push('health/science-specialist');
 if(/slav|war|colonial|accusat|gender|marriage|family|child|twins/.test(text))sensitivity.push('harm/identity/consent');
 if(/etymolog|dialect|phonolog|pronunciation|tone|morpholog|translation/.test(text))sensitivity.push('language/translation');
 const mentioned=mentionMap.get(article.id),metadataOnly=sourceRecords.filter(s=>s.accessClassification==='metadata-or-limited-text-declared').length;
 const score={thinness:wordCount<200?5:wordCount<250?4:wordCount<400?3:wordCount<600?2:1,
   readerInterest:pilotIds.includes(article.id)?5:/cities|history|art|language|women|food|name|performance/.test(key(article.title+' '+article.category))?4:3,
   significance:/how-we-know|research-method|future-archive|regional-states|medicine|public-health|ghost-dna|cave-ashes/.test(article.id)?5:4,
   evidenceReadiness:Math.max(1,Math.min(5,1+sourceRecords.length-metadataOnly)),
   regionalCoverage:mentioned.length===0?4:Math.max(...mentioned.map(place=>coverage.get(place)<=4?5:coverage.get(place)<=12?4:2)),
   communityReviewPriority:sensitivity.includes('sacred/custodial')||sensitivity.includes('health/science-specialist')?5:sensitivity.length?4:3};
 const priorityScore=score.thinness*3+score.readerInterest+score.significance+score.evidenceReadiness*2+score.regionalCoverage*2+score.communityReviewPriority*3;
 const focus=article.sections.length>1?2:1,section=article.sections[focus-1];
 const linkedVoices=a.communityVoices.filter(v=>v.sourceIds.some(id=>ids.includes(id)));
 const phase=pilotIds.includes(article.id)?'pilot-parallel-story':article.id.startsWith('author-')||article.id.startsWith('deep-name-')?'P4-editions-and-language':sensitivity.includes('health/science-specialist')||sensitivity.includes('sacred/custodial')?'P3-specialist-and-custodial-gate':mentioned.some(p=>coverage.get(p)<=12)?'P2-local-and-regional':'P1-evidence-led-readable-cases';
 return {id:article.id,title:article.title,category:article.category,era:article.era??'unknown',explicitRegions:article.regions??'unknown',
   placeMentions:mentioned.map(place=>({place,sections:article.sections.flatMap((s,i)=>key(s.h+' '+s.p).includes(key(place))?[i+1]:[]),status:'text-mention-not-coverage-verification'})),
   sectionCount:article.sections.length,estimatedProseWords:wordCount,wordCountMethod:'Whitespace-separated section prose only; excludes title/deck/headers/citations',
   sourceIds:ids,sourceRecords,evidenceType:article.evidenceType,evidenceNote:article.evidenceNote,
   reviewStatus:'unreviewed',rights:'unknown',publicationApproval:'not-granted',
   communityTestimony:{authenticatedTranscriptPresent:false,status:'No individually authenticated/consented transcript identified in article fields',linkedResearchLeads:linkedVoices.map(v=>({id:v.id,status:v.status,context:v.context})),caveat:'Lead linkage by shared source ID is not proof of incorporated testimony or permission.'},
   sensitivities:sensitivity.length?sensitivity:['historical-source-review'],
   sectionAudit:article.sections.map((s,i)=>({section:i+1,heading:s.h,estimatedWords:words(s.p),sourceIds:s.sourceIds,
     gap:words(s.p)<60?'Brief synthesis: add a directly supported case or process example if available.':'Inspect each claim/passage before expansion; length is not evidence quality.',
     reference:`/articles/${article.id}/#section-${i+1}`})),
   researchQuestion:`What inspected passage, named locality and permitted perspective can substantiate and deepen “${section.h}”?`,
   topicRecommendation:notes[article.id],
   recommendationReferences:[{articleId:article.id,section:focus,sourceIds:section.sourceIds},{articleId:article.id,section:article.sections.length,sourceIds:article.sections.at(-1).sourceIds}],
   readingFlowOpportunity:`Use “${article.sections[0].h}” as a starting question; develop one concrete case before “${article.sections.at(-1).h}”. Keep original wording in the canonical route.`,
   priorityFactors:score,priorityScore,priorityBasis:'Editorial triage judgement plus measured thinness/metadata readiness; not popularity, factual verification or permission to publish.',phase,
   canonicalRecordSha256:digest(article)};
}).sort((x,y)=>y.priorityScore-x.priorityScore||x.id.localeCompare(y.id,'en'));
assert.equal(records.length,113);assert.equal(Object.keys(notes).length,113);
records.forEach((r,i)=>{r.priorityRank=i+1;});
const sortedWords=records.map(r=>r.estimatedProseWords).sort((a,b)=>a-b);
const audit={formatVersion:1,task:'001F',date:'2026-11-22',baseCommit:'7253a6af6a2face9b0304fa6935aa460bc8b0ad1',archiveSha256:digest(a),
  scope:'Internal reproducible editorial triage, metrics and topic-specific research recommendations. Not 113 independently fact-checked or publication-cleared articles. No source full-text availability inferred from a citation.',
  estimation:'Estimated whitespace-separated prose words. Place mentions are string matches used as review leads, not verified geographical coverage.',
  priorityFormula:'3*thinness + readerInterest + significance + 2*evidenceReadiness + 2*regionalCoverage + 3*communityReviewPriority; each factor 1–5',
  sourceAuditLimit:'Canonical source access classifications reflect frozen source descriptions only; accessVerifiedThisTask=false for every canonical record. New pilot passage examinations are separately registered in web/src/data/story-sources.ts, not silently applied to the old catalogue.',
  summary:{articleCount:records.length,remainingAfterFourPilotTopics:records.length-pilotIds.length,minProseWords:sortedWords[0],medianProseWords:sortedWords[Math.floor(sortedWords.length/2)],maxProseWords:sortedWords.at(-1),under250Words:records.filter(r=>r.estimatedProseWords<250).length,missingExplicitRegion:records.filter(r=>r.explicitRegions==='unknown').length,
    textualPlaceMentions:Object.fromEntries(coverage),phaseCounts:Object.fromEntries([...new Set(records.map(r=>r.phase))].map(phase=>[phase,records.filter(r=>r.phase===phase).length]))},records};
const out=resolve(root,'docs/editorial');
let md='# Task 001F — 113-article editorial audit\n\n'+audit.scope+'\n\n'+audit.sourceAuditLimit+'\n\n';
md+='## Measurements and representation\n\n'+`All ${records.length} records retain their canonical SHA-256. Section-prose median ${audit.summary.medianProseWords} words; ${audit.summary.under250Words} records below 250. All ${audit.summary.missingExplicitRegion} lack an explicit regions field; this does not mean their prose mentions no places.\n\n`;
md+='| Textual place lead | Articles mentioning it |\n| --- | ---: |\n'+[...coverage].map(([p,n])=>`| ${p} | ${n} |`).join('\n')+'\n\nSubstring matching is only a regional triage aid; review article/section context before making a coverage claim. Overlapping places are not distinct communities counted.\n\n';
md+='## Ranked review inventory\n\nPriority is a six-factor editorial judgement, not a claim that high-ranked material can be published. '+audit.priorityFormula+'. Metadata-only sources and unknown rights remain blockers.\n\n';
for(const r of records){
 md+=`### ${r.priorityRank}. ${r.id} — ${r.title}\n\n`;
 md+=`- Category: ${r.category}; era: ${r.era}; explicit region: ${JSON.stringify(r.explicitRegions)}.\n- ${r.sectionCount} sections; approximately ${r.estimatedProseWords} prose words; evidence: ${r.evidenceType}.\n- Frozen caveat: ${r.evidenceNote}\n- Review: unreviewed; rights: unknown; authenticated transcript: not identified; sensitivities: ${r.sensitivities.join(', ')}.\n- Place mentions (not verified scope): ${r.placeMentions.map(p=>p.place).join(', ')||'unknown'}.\n- Sources: ${r.sourceRecords.map(s=>`${s.id} (${s.accessClassification}; source-of-source ${s.sourceOfSource})`).join('; ')}.\n- Recommendation: ${r.topicRecommendation}\n- Research question: ${r.researchQuestion}\n- Reading flow: ${r.readingFlowOpportunity}\n- Trace: ${r.recommendationReferences.map(ref=>`[${ref.articleId}/section-${ref.section}](../../web/src/pages/articles/[id].astro), source IDs ${ref.sourceIds.join(', ')}`).join('; ')}.\n- Priority ${r.priorityScore}: ${Object.entries(r.priorityFactors).map(([k,v])=>`${k}=${v}`).join(', ')}; phase ${r.phase}.\n- Community source leads: ${r.communityTestimony.linkedResearchLeads.map(v=>v.id+' — '+v.status).join('; ')||'none linked; seek appropriate local provenance'}.\n\n`;
}
assert.ok(process.argv.length===2||(process.argv.length===3&&process.argv[2]==='--check'),'Only optional --check is accepted');
if(process.argv[2]==='--check'){
 assert.equal(readFileSync(resolve(out,'001f-article-audit.json'),'utf8'),JSON.stringify(audit,null,2)+'\n','Audit JSON drift');
 assert.equal(readFileSync(resolve(out,'001f-article-audit.md'),'utf8'),md,'Audit Markdown drift');
}else{
 mkdirSync(out,{recursive:true});
 writeFileSync(resolve(out,'001f-article-audit.json'),JSON.stringify(audit,null,2)+'\n','utf8');
 writeFileSync(resolve(out,'001f-article-audit.md'),md,'utf8');
}
console.log(JSON.stringify(audit.summary));
