import {archive,articleHref,sourceFor} from './archive.ts';

export type CulturalFigure={
  slug:string;name:string;kind:string;scope:string;role:string;
  beliefs:string[];differences:string;question:string;
  mistaken:string;clarification:string;relatedTerms:string[];
  archiveHref?:string;storyHref?:string;sources:{title:string;url:string}[];
  status:string;
};
type Explainer={role:string;beliefs:string[];differences:string;question?:string;storyHref?:string};
const explainers:Record<string,Explainer>={
 'sac-esu':{
   role:'Messenger, intermediary and a figure of crossroads, choice and consequence',
   beliefs:[
     'In many Yorùbá Ifá-related traditions, Èṣù is an important òrìṣà associated with carrying messages between human beings and sacred powers. Accounts connect him with communication, offerings, obligations and the consequences of choices.',
     'Èṣù is associated with crossroads, chance and the unexpected. Stories may show him exposing pride, unsettling an easy assumption or challenging someone to face the result of their actions. Calling him only a trickster leaves out his roles in mediation and ritual life.',
     'Some Yorùbá religious practitioners honour Èṣù in rites of communication with other sacred powers. Names, practices, images and interpretations differ by lineage and community.'
   ],
   differences:'In nineteenth-century Yorùbá Christian translation, Èṣù became associated with the English word Satan or devil. That later religious usage must not be mistaken for a complete description of Èṣù as an òrìṣà. Different traditional and Christian speakers continue to interpret the name differently; Èṣù is not simply always benevolent or always malicious.',
   question:'How was Èṣù described to you: in a family story, a religious setting, a sermon, a festival or school?',
   storyHref:'/tales/esu-hat-two-views/'
 },
 'sac-olodumare':{
   role:'Supreme divine source in many Yorùbá religious traditions',
   beliefs:[
     'Olódùmarè is widely understood as the supreme source of existence and authority in many Yorùbá religious and Ifá-related accounts. Olódùmarè is not normally classified as a specialised òrìṣà like Ògún or Ọ̀ṣun.',
     'Other titles such as Ọlọ́run and Ẹlẹ́dàá sometimes overlap with this usage. They are important expressions, although their equivalence can differ between speakers and contexts.',
     'Explanations of the name sometimes describe everlasting fullness or supreme authority. The explanations carry different meanings for the people who use the name.'
   ],
   differences:'Views on divine mediation, prayer and how the name was formed differ across religious communities. Different families and religious communities may offer different word-breakdowns and meanings.',
   question:'What explanation of the name Olódùmarè did you grow up hearing?',
   storyHref:'/tales/olodumare-many-meanings/'
 },
 'sac-orunmila':{
   role:'Wisdom, knowledge of destiny and the interpretive tradition of Ifá',
   beliefs:['Ọ̀rúnmìlà is closely associated with wisdom and knowledge of destiny in many Yorùbá Ifá traditions.','Ifá can refer to a sacred personage, extensive oral-literary material and divinatory practice, depending on context. Trained interpreters preserve and transmit its traditions.'],
   differences:'Different practitioners and communities have their own histories and understandings. An educational numerical model is not a complete Ifá corpus.',
   question:'How have people in your community explained Ọ̀rúnmìlà and Ifá?'
 },
 'sac-obatala':{
   role:'A central figure in creation accounts and the shaping of humanity',
   beliefs:['Ọbàtálá, also called Òrìṣàńlá in relevant accounts, features in many creation traditions and is linked with shaping human beings.','White clothing or materials, calm authority and clarity are important associations in several practices.'],
   differences:'The roles of Ọbàtálá and Odùduwà vary across tellings. Some communities place greater emphasis on Ọbàtálá and others on Odùduwà when telling how the world began.',
   question:'What creation story involving Ọbàtálá did you first hear?'
 },
 'sac-oduduwa':{
   role:'An origin and ancestral figure in Ilé-Ifẹ̀ and royal traditions',
   beliefs:['Odùduwà has an important place in Ilé-Ifẹ̀ origin accounts and royal memories across parts of Yorùbáland.','Different traditions present Odùduwà through cosmological stories, ancestral memory and claims about political authority.'],
   differences:'These accounts do not establish a single universally dated biography or one uncontested genealogy for all Yorùbá kingdoms.',
   question:'Which account of Odùduwà does your town or family tell?'
 },
 'sac-ogun':{
   role:'Iron, tools, roads, work and the power of making',
   beliefs:['Ògún is an òrìṣà associated with iron, smithing, tools and occupations that use them, as well as paths, hunting and conflict in many tellings.','Stories and religious observances can emphasise strength, obligation and the dangers that powerful tools can bring.'],
   differences:'Specific practices vary with community and occupation. Stories also connect Ògún with craft, paths and people’s responsibilities when using iron.',
   question:'What story about Ògún have you heard from workers, elders or family?'
 },
 'sac-sango':{
   role:'Thunder, lightning, power and remembered Ọ̀yọ́ kingship',
   beliefs:['Ṣàngó is associated with thunder and lightning in many Yorùbá religious traditions, along with themes of power and justice.','Other narratives connect Ṣàngó with royal memories of Ọ̀yọ́. Sacred tradition and a dated biography of a human ruler are different kinds of accounts.'],
   differences:'Details of Ṣàngó as òrìṣà and remembered king vary between communities and across the Atlantic diaspora.',
   question:'How does your community explain Ṣàngó and his connection to Ọ̀yọ́?'
 },
 'sac-osun':{
   role:'River, vitality and sacred relationships in Ọ̀ṣun traditions',
   beliefs:['Ọ̀ṣun is associated with rivers and with ideas of vitality, care and fertility in several Yorùbá traditions.','The Ọ̀ṣun–Òṣogbo Sacred Grove is especially important within living practices connected to Òṣogbo.'],
   differences:'Different communities tell different accounts of rivers, care, fertility and sacred relationships with Ọ̀ṣun.',
   question:'What does your community tell about Ọ̀ṣun and the river?'
 },
 'sac-yemoja':{
   role:'Motherhood and water in differing Yorùbá traditions',
   beliefs:['Yemọja is associated with motherhood and water in several religious traditions.','Nigerian traditions may connect Yemọja with particular rivers, while some diaspora traditions emphasise the sea.'],
   differences:'Ask which river, waterway or sea is part of the story as told in the community you know.',
   question:'Which water or family tradition is Yemọja linked to in the version you know?'
 },
 'sac-oya':{
   role:'Winds, changing circumstances and river memories',
   beliefs:['Ọya appears in traditions associated with powerful winds, changes and particular rivers and towns.','Some tellings describe relationships involving Ṣàngó, but individual stories should be attributed to communities.'],
   differences:'Names, symbols and relationships vary by region and between Yorùbá and diaspora tellings.',
   question:'What did people in your household teach about Ọya?'
 }
};
function splitMisconception(value:string):{mistaken:string;clarification:string}{
  const text=value.replace(/^MISCONCEPTION:\s*/u,'');
  const index=text.indexOf(' CORRECTION: ');
  return index<0?{mistaken:text,clarification:''}:{mistaken:text.slice(0,index),clarification:text.slice(index+13)};
}
const sacred:CulturalFigure[]=archive.sacredProfiles.map(p=>{
  const e=explainers[p.id];
  const m=splitMisconception(p.misconceptions[0]??'Local accounts may differ.');
  return {
    slug:p.id.replace(/^sac-/u,''),name:p.name,kind:p.kind,scope:p.scope,
    role:e?.role??p.summary,beliefs:e?.beliefs??[p.summary],
    differences:e?.differences??'Different families and communities tell and remember this in their own ways. Which explanation have you heard?',
    question:e?.question??('What does your community say about '+p.name+'?'),
    mistaken:m.mistaken,clarification:m.clarification,
    relatedTerms:('relatedTerms' in p&&Array.isArray(p.relatedTerms))?p.relatedTerms.filter((x):x is string=>typeof x==='string'):[],
    archiveHref:articleHref(p.articleId),storyHref:e?.storyHref,
    sources:p.sourceIds.map(id=>{const source=sourceFor(id);return {title:source.title,url:source.url}}),
    status:p.confidence
  };
});
const heroes:CulturalFigure[]=[
 {
  slug:'moremi-ajasoro',name:'Mọremí Àjàṣorò',kind:'Heroine of oral tradition',scope:'Ilé-Ifẹ̀ traditions and public commemoration',
  role:'Courage and difficult sacrifice in Ilé-Ifẹ̀ cultural memory',
  beliefs:['Mọremí Àjàṣorò is remembered in widely known Ilé-Ifẹ̀ traditions as a courageous woman who sought a way to protect her community.','Her story is retold in different forms through oral narration, theatre and public remembrance.'],
  differences:'Family details, opponents, sacrifices and endings differ among tellings. The different tellings show which parts of Mọremí’s story communities remember and emphasise.',
  question:'Which version of Mọremí’s courage was told in your family or town?',
  mistaken:'Every scene in a modern play about Mọremí happened exactly as shown.',
  clarification:'The cultural importance of a heroine can be distinguished from claims about precise dates and incidents.',
  relatedTerms:['Ilé-Ifẹ̀','Mọremí'],status:'Named figure of oral tradition; exact chronology and variants require local review',
  sources:[{title:'The Historical Position of Moremi Ajasoro Within the Yoruba Nation (bibliographic lead)',url:'https://books.google.com/books/about/The_Historical_Position_of_Moremi_Ajasor.html?hl=en&id=cHMxAAAAIAAJ&output=html_text'}]
 },
 {
  slug:'lisabi',name:'Lísàbí',kind:'Cultural hero in Ẹ̀gbá tradition',scope:'Ẹ̀gbá histories, including Abẹ́òkúta',
  role:'A symbol of collective Ẹ̀gbá identity and resistance',
  beliefs:['Lísàbí is celebrated in Ẹ̀gbá cultural memory as a figure associated with unity, leadership and opposition to domination.','Different oral accounts bring their own details about the people, places and events remembered in the story.'],
  differences:'Ask which companions, places and events your family’s version remembers, and listen to how neighbouring communities tell it.',
  question:'How does your Ẹ̀gbá family or community remember Lísàbí?',
  mistaken:'All stories about Lísàbí have one agreed chronology.',
  clarification:'Shared remembrance does not require every detail of different oral tellings to be identical.',
  relatedTerms:['Ẹ̀gbá','Abẹ́òkúta'],status:'Celebrated community hero; precise events require community and historical review',
  sources:[{title:'An Historical Sketch of Egba Traditional Authorities (research lead)',url:'https://www.cambridge.org/core/journals/africa/article/abs/an-historical-sketch-of-egba-traditional-authorities/618424D37520AE3C4B5C8788775B09E3'}]
 },
 {
  slug:'efunsetan-aniwura',name:'Ẹfúnṣetán Aníwúrà',kind:'Historical person',scope:'Nineteenth-century Ìbàdàn',
  role:'Influential Ìyálóde and important woman in Yorùbá political memory',
  beliefs:['Ẹfúnṣetán Aníwúrà held the Ìyálóde title in nineteenth-century Ìbàdàn and is remembered for wealth, leadership and political influence.','Accounts of her life appear in historical writing as well as plays and films, and in plays and films that portray her in different ways.'],
  differences:'People remember her influence, conflicts and personal character in different ways. Which accounts have been told in your community?',
  question:'What accounts of Ìyálóde Ẹfúnṣetán have you encountered, and who passed them on?',
  mistaken:'A popular play records every event and conversation from her life.',
  clarification:'Historical drama is not a literal record; invented scenes need to be distinguished from documented events.',
  relatedTerms:['Ìyálóde','Ìbàdàn'],status:'Historically attested; dramatic depictions and interpretations vary',
  sources:[{title:'Framing Female Leadership on Stage and Screen in Yorubaland',url:'https://api-ir.unilag.edu.ng/server/api/core/bitstreams/3689d25f-eaae-4ade-b69f-7085b4d5ac30/content'},{title:'Efúnsetán Aníwúrà and Tinúubú: Yoruba Historical Dramas (catalogue)',url:'https://digitalcommons.unomaha.edu/goodrichfacbooks/2/'}]
 }
];
const additionalSacred:CulturalFigure[]=[
 {
  slug:'olokun',name:'Olókun',kind:'Òrìṣà and sacred figure',scope:'Ilé-Ifẹ̀, Edo/Benin and coastal/diaspora traditions',
  role:'Great waters, wealth, mystery and sacred depths across differing communities',
  beliefs:[
   'Olókun is associated with great waters, prosperity and mysterious depth in several Yorùbá and Edo traditions.',
   'In some Ilé-Ifẹ̀ accounts Olókun is female, while Edo and other traditions may describe a male or differently gendered sacred figure.',
   'The Ìgbò Olókun area has independent archaeological evidence of local glassmaking; oral traditions give the landscape sacred meanings.'
  ],
  differences:'The gender, genealogies and sacred boundaries associated with Olókun vary among communities. Archaeological glassmaking does not prove a religious origin story.',
  question:'What stories do local custodians tell about Olókun and Ìgbò Olókun?',
  mistaken:'The so-called Olókun bronze head is a proven portrait of the deity.',
  clarification:'The identification and provenance of sculpture known by that name are debated; the supplied photograph should not be treated as authenticated proof.',
  relatedTerms:['Ìgbò Olókun','Ilé-Ifẹ̀','Benin City','Olókun'],
  status:'Rich cultural profile in editorial review; regional testimony needed',
  sources:[
   {title:'Ile-Ife and Igbo Olokun in the history of glass in West Africa',url:'https://www.cambridge.org/core/journals/antiquity/article/abs/ileife-and-igbo-olokun-in-the-history-of-glass-in-west-africa/271A101DC136996C91364464ED61A258'},
   {title:'Smithsonian — Olókun shrine vessel in Edo traditions',url:'https://africa.si.edu/collection/object/nmafa_2008-9-11'}
  ]
 }
];
const obaSacredProfile:CulturalFigure={
 slug:'oba',name:'Ọbà',kind:'Òrìṣà and sacred figure',scope:'Yorùbá Ọbà River traditions and related diaspora accounts',
 role:'Sacred river, devotion, suffering, renewal and dignity',
 beliefs:[
  'Ọbà is associated with the river of her name in Yorùbá sacred traditions, and is more than a character in a marital rivalry story.',
  'Some accounts connect her with Ṣàngó and Ọ̀ṣun through a painful story about trust and the injury of an ear.',
  'Different communities and diaspora lineages tell divergent versions; other associations include healing, fertility and renewal.'
 ],
 differences:'The wording, moral and outcome of the ear story vary. Do not treat one narrative as a verified origin of the river or a complete sacred biography.',
 question:'What would local Ọbà River communities and custodians tell us about her own sacred identity?',
 mistaken:'Ọbà is only the wife in the story about a severed ear.',
 clarification:'Ọbà is also an independent sacred figure associated with a river and living traditions.',
 relatedTerms:['Ọbà River','Ṣàngó','Ọ̀ṣun'],status:'Rich cultural profile in draft; locally attributed testimony needed',
 sources:[
  {title:'Water in Yorùbá (Southwest Nigeria) religious belief and practices',url:'https://link.springer.com/article/10.1007/s44282-024-00054-8'},
  {title:'University of Kansas study of variations of Ọbà traditions',url:'https://kuscholarworks.ku.edu/server/api/core/bitstreams/5b3a2aa0-08f0-43fc-95c8-6ac4c58b6cd5/content'}
 ]
};
const osanyinSacredProfile:CulturalFigure={
 slug:'osanyin',name:'Òsányìn',kind:'Òrìṣà and sacred figure',
 scope:'Yorùbá medicinal-plant, forest and healing traditions; related diaspora accounts',
 role:'Sacred knowledge of ewé, forests, healing and responsible gathering of plants',
 beliefs:[
  'Òsányìn is linked with medicinal leaves, herbal specialists and sacred forest knowledge in Yorùbá traditions.',
  'The iron herbalist’s staff with bird motifs is recorded in museum collections, with regional and artistic variation.',
  'The field that could not be weeded and the scattered gourd are oral story families, not documented historical events.'
 ],
 differences:'Stories about Òsányìn, Ọ̀rúnmìlà and Àrọ̀ni vary. Sacred plant uses do not make any untested preparation medically safe.',
 question:'Which accounts do elders or herbalists in your community share about Òsányìn?',
 mistaken:'Every herbal medicine is safe because it is sacred or natural.',
 clarification:'Traditional knowledge should be documented respectfully while medical safety and efficacy are evaluated independently.',
 relatedTerms:['ewé','àgbo','oníṣègùn','ọ̀pá Òsányìn','Àrọ̀ni'],
 status:'Detailed editorial draft; local custodial testimony required',
 sources:[
  {title:'Smithsonian — Ọ̀pá Ọ̀sanyìn (herbalist staff)',url:'https://africa.si.edu/collection/object/nmafa_2014-31-1'},
  {title:'Yoruba folk medicine study',url:'https://psnnjp.org/index.php/home/article/view/182'}
 ]
};
const orisaOkoSacredProfile:CulturalFigure={
 slug:'orisa-oko',name:'Ọ̀rìṣà Oko',kind:'Òrìṣà and sacred figure',
 scope:'Ìràwọ̀ and varied Yorùbá farming and harvest traditions',
 role:'Agriculture, cultivated land, food production, harvest and community moral authority',
 beliefs:[
  'Ọ̀rìṣà Oko is revered as a patron of agricultural land and the work of cultivation in several Yorùbá traditions.',
  'Museum records document distinctive iron staffs forged by Ìràwọ̀ blacksmiths from hoes supplied for shrines.',
  'His shrine has also been associated with difficult communal judgments, whose histories require critical examination.'
 ],
 differences:'Local harvest observances and stories about the outcast hunter, bees and Ọ̀ṣun vary; a sacred origin story is not independently established history.',
 question:'How do farmers, smiths and shrine custodians in Ìràwọ̀ remember Ọ̀rìṣà Oko?',
 mistaken:'The story of the hunter and famine proves that one individual invented all farming.',
 clarification:'The story preserves community values concerning dignity and generosity; agricultural history is studied using other evidence.',
 relatedTerms:['Ìràwọ̀','ìṣu','ọ̀pá Ọ̀rìṣà Oko','Ọdún Iṣu','àgbẹ̀'],
 status:'Full editorial draft with museum sources; community review required',
 sources:[
  {title:'Smithsonian — Staff for Orisha Oko',url:'https://africa.si.edu/collection/object/nmafa_2005-6-71.1'},
  {title:'Metropolitan Museum — Sheath for ọ̀pá Oko',url:'https://www.metmuseum.org/art/collection/search/844646'}
 ]
};
export const heritageFigures:CulturalFigure[]=[...sacred,...additionalSacred,obaSacredProfile,osanyinSacredProfile,orisaOkoSacredProfile,...heroes];
const slugs=new Set(heritageFigures.map(x=>x.slug));
if(slugs.size!==heritageFigures.length)throw new Error('Duplicate cultural figure ID');
export function figureHref(slug:string){
  if(!/^[a-z0-9-]+$/u.test(slug)||!slugs.has(slug))throw new Error('Unknown figure slug');
  return '/figures/'+slug+'/';
}
