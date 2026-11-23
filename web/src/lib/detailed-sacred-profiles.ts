export type LivingProfileSection={id:string;heading:string;paragraphs:string[];points?:{term:string;explanation:string}[]};
export type LivingSacredProfile={slug:string;name:string;aliases:string;lead:string;intro:string;sections:LivingProfileSection[];tales:{title:string;account:string;context:string}[];questions:string[];notes:string[];references:{title:string;url:string;scope:string}[];};

export const detailedSacredProfiles:Record<string,LivingSacredProfile>={
 orunmila:{
  slug:'orunmila',name:'Ọ̀rúnmìlà',aliases:'Ifá · Ọ̀rúnlá / Orúla (in some diaspora communities)',
  lead:'Ọ̀rúnmìlà is revered in Ifá traditions as an òrìṣà of wisdom, insight, divination and the understanding of human destiny.',
  intro:'The name Ọ̀rúnmìlà opens a world of questions: What is a good life? How should a person respond to uncertainty? How does someone discover an obligation they cannot yet see? In Yorùbá Ifá communities, these questions are explored through stories, sacred learning, divination and counsel. Different lineages explain his origins, names and relationship to Ifá in their own ways.',
  sections:[
   {id:'destiny',heading:'Witness to destiny: Ẹlẹ́rìí Ìpín',paragraphs:[
    'In accounts that describe Ọ̀rúnmìlà as Ẹlẹ́rìí Ìpín (“witness to the allotment of destiny”), he is remembered as knowing what people may forget about the path of their lives. Some tellings place him among the primordial divine beings, the irúnmọlẹ̀, present in the earliest moments of the world.',
    'A familiar teaching says that a person’s Orí—the personal inner head or destiny—matters deeply to how life unfolds. One account describes the choosing of destiny before birth and forgetting it on entering earthly life. These are religious and philosophical traditions, not testable descriptions of events before birth.',
    'Some people consult Ifá in a time of difficulty to ask not only what may happen, but how they should live: which duties they have neglected, what relationships need care and what character they must cultivate.'
   ]},
   {id:'ifa',heading:'Ọ̀rúnmìlà and the Ifá system',paragraphs:[
    'Ọ̀rúnmìlà and Ifá are closely related names. In some communities Ifá refers both to the sacred figure and the living system of divination, interpretation and orally transmitted teaching. In others, speakers make a more explicit distinction between Ọ̀rúnmìlà as the revered divine knower and Ifá as the knowledge corpus and practice.',
    'The sacred literature is arranged around 256 odù, each associated with a recognised configuration. This does not mean there are only 256 verses: numerous ẹsẹ Ifá are remembered, performed and interpreted through different lineages. A short website overview cannot reproduce that immense tradition.',
    'Diviners learn far more than a mechanical pattern: interpretation involves remembered verses, context, ethical judgement, the questions asked and the community of training.'
   ],points:[
    {term:'Odù Ifá',explanation:'The 256 configurations through which the oral corpus is organised; each can be associated with many verses and interpretations.'},
    {term:'Babaláwo and Ìyánífá',explanation:'Trained Ifá practitioners and interpreters. Training, the recognition of women practitioners and the roles permitted to individuals vary across communities.'},
    {term:'Ìkín and Ọ̀pẹ̀lẹ̀',explanation:'Consecrated palm nuts and a divining chain used in recognised methods of obtaining signs; practice is taught within a lineage.'},
    {term:'Ọpọ́n Ifá',explanation:'A divination tray used in certain forms of Ifá practice, often with specially prepared divining powder.'}
   ]},
   {id:'ethics',heading:'Wisdom, Ìwà and the choices people make',paragraphs:[
    'Stories linked with Ọ̀rúnmìlà frequently turn on how a person behaves when knowledge arrives. A warning is only useful if somebody listens. An explanation is only wise if it leads to thought, restraint and responsibility.',
    'Ìwà, character, is an important ethical idea in Yorùbá thought. In Ifá teaching, the desire to know one’s way can sit alongside practical advice, changing harmful behaviour, making amends and, in some traditions, offering ẹbọ. The meaning and practice of ẹbọ belong to living religious communities, not to a simplified instruction list.',
    'Ọ̀rúnmìlà and Èṣù appear together in many Ifá-related tellings, with roles in interpretation, communication, carrying offerings and the consequences of choices. Their relationship should not be reduced to a fixed equation that every community must accept.'
   ]},
   {id:'places',heading:'Sacred centres and journeys across the Atlantic',paragraphs:[
    'Ilé-Ifẹ̀ holds a central place in many accounts of Ọ̀rúnmìlà and the Ifá heritage. Communities connected with Òkè-Ìtasẹ̀ honour this relationship through ceremony and public celebration. The date and form of festivals should be checked with organisers for the particular year before the site advertises a schedule.',
    'Through displacement, migration and ongoing cultural exchange, Ọ̀rúnmìlà/Orúla traditions continue in parts of the Americas. Lucumí communities in Cuba and some Afro-Brazilian traditions maintain distinct vocabularies, initiation practices and interpretations. They should be described in their own voices rather than treated as exact copies of any single Nigerian lineage.'
   ]}
  ],
  tales:[{title:'The witness who remembers',account:'In one teaching, a person comes to earth with a destiny but does not arrive with a written map. When uncertainty comes, the remembered wisdom associated with Ọ̀rúnmìlà points towards reflection, responsibility and attention to Orí.',context:'A thematic retelling of a frequently discussed destiny motif; this paragraph is not a quoted or authenticated ẹsẹ Ifá.'}],
  questions:['How did your family explain Orí and Ẹlẹ́rìí Ìpín?','Which names for Ọ̀rúnmìlà and Ifá are used by practitioners in your community?','Do people where you live emphasise divination, ethics, origin stories or a combination of these?'],
  notes:['Living religious teachings differ by lineage. Nothing in this article grants permission to republish restricted Ifá verses or impersonate a practitioner.','The supplied visual reference has not been authenticated as an historical photograph or licensed for public distribution.'],
  references:[
   {title:'UNESCO — Ifá divination system',url:'https://ich.unesco.org/en/RL/ifa-divination-system-00146',scope:'256 odù, interpretive framework and cultural significance'},
   {title:'University of Bayreuth — Socio-Political Thoughts of Ọ̀rúnmìlà',url:'https://www.africamultiple.uni-bayreuth.de/en/1_2-Research/Research-Projects/Knowledges/socio-political-thoughts/index.html',scope:'Practitioner perspectives and diaspora research'}
  ]
 },
 obatala:{
  slug:'obatala',name:'Ọbàtálá',aliases:'Òrìṣàńlá · Òrìṣà Nlá (among other regional forms)',
  lead:'Ọbàtálá is revered in many Yorùbá traditions as a primordial òrìṣà associated with the formation of human bodies, coolness, white cloth and measured character.',
  intro:'Imagine a world not yet shaped into familiar places. Who makes the land? Who forms the human body? What happens when the power to create is met with human frailty? These questions animate several Ọbàtálá traditions. Rather than one agreed sequence, they offer a family of creation stories, moral teachings and local histories.',
  sections:[
   {id:'creation',heading:'The maker of human form',paragraphs:[
    'In widely shared Yorùbá creation accounts, Ọbàtálá forms human bodies from clay, while Olódùmarè is the source of life itself. The image of moulding invites reflection on care, diversity and the responsibility of a creator towards those he makes.',
    'One well-known variant tells that Ọbàtálá was meant to undertake a work of world-making but became delayed or incapacitated after drinking palm wine, and Odùduwà completed a decisive stage. Other tellings give the two figures different roles, or explain their relationship through the political memory of Ilé-Ifẹ̀. These stories should not be collapsed into a single factual chronology.',
    'Some devotees speak of a special sacred relationship between Ọbàtálá and people born with particular bodily differences. In presenting this belief we must avoid suggesting that disability is a mistake or a punishment, or that all communities use the same terms. Every person deserves dignity regardless of religious explanation.'
   ]},
   {id:'symbols',heading:'White cloth, coolness and sacred restraint',paragraphs:[
    'White clothing and the idea of tútù—coolness or composure—are prominent in many Ọbàtálá traditions. They express peaceful authority, clarity and a spirit that refuses to be driven by anger.',
    'Offerings and taboos differ between lineages, festivals and diaspora settings. Accounts frequently connect Ọbàtálá with white materials, water and snails, and some prohibit palm wine and palm oil. These are descriptions of living religious practices, not instructions for visitors to imitate a ceremony.'
   ],points:[
    {term:'White cloth',explanation:'An emblem of clarity, sacred dignity and calm, with specific meanings in particular communities.'},
    {term:'Tútù',explanation:'Coolness: a valued quality of composure and restraint, not merely physical temperature.'},
    {term:'Ìwà pẹ̀lẹ́',explanation:'Gentle or balanced character; a virtue that informs stories of patience, fairness and moral authority.'}
   ]},
   {id:'character',heading:'What gentleness can mean',paragraphs:[
    'Ọbàtálá is repeatedly associated with patience, even when a story places him in a humiliating or unjust situation. Gentleness here need not mean weakness: it can be a deliberate refusal to answer injury with more injury.',
    'A story about calm authority may also ask an uncomfortable question. When a respected person remains silent, who notices the harm being done? Different tellers may offer different lessons about endurance, justice and responsibility.'
   ]},
   {id:'ife',heading:'Ilé-Ifẹ̀ and the voices of different lineages',paragraphs:[
    'Accounts of Ọbàtálá and Odùduwà sometimes place them in competition over creation or authority at Ilé-Ifẹ̀. Other tellings emphasise accommodation, ritual precedence, different responsibilities or memories of earlier settlements.',
    'Scholars study these traditions as sources of religious meaning and political memory, while community custodians may explain them from ritual and inherited perspectives. Neither approach should be misrepresented as a transcript of all Ifẹ̀ voices.'
   ]}
  ],
  tales:[
   {title:'The visitor who did not answer an insult',account:'A widely circulating cycle tells of Ọbàtálá travelling towards Ṣàngó’s domain, being wrongly accused or detained, and refusing to abandon his composure. Some versions connect the injustice with later misfortune and recognition. The familiar “seven years” and horse details belong to particular retellings, not an independently verified date or universally attested account.',context:'Story-family synopsis only; source lineage, names, details and current festival connections require confirmation by a teller or custodian.'},
   {title:'The making of land and the contest of duties',account:'In some creation tellings, Ọbàtálá begins a task that Odùduwà finishes. Other communities give a different sequence. The story can be heard as a sacred account of origin, and some scholars read it beside political memories of the Ifẹ̀ region.',context:'Distinct creation and political-memory traditions are not asserted as one historical event.'},
   {title:'The fragments and Atọ́wọ́dá',account:'A circulating tale describes an attack on a divine figure and pieces gathered after a great fall. The identity of the figure, the servant, and the meaning of the fragments should be attributed to a named telling before any full dramatic version is published.',context:'Unverified variant lead. The site deliberately avoids presenting specific dramatic details as universal Ọbàtálá doctrine.'}
  ],
  questions:['Which Ọbàtálá creation account did the elders in your community tell?','What do white cloth, tútù and ìwà pẹ̀lẹ́ signify where you live?','Do you know a local telling of the journey to Ṣàngó or the conflict with Odùduwà?'],
  notes:['Individual sayings and oríkì from the supplied draft are not published as authenticated proverbs without a named speaker, verified transcription or locally attributable source.','Descriptions of disability must be dignified and must not imply that a human body is a failed or defective creation.'],
  references:[
   {title:'Indiana University Press — Global Yorùbá: Early History and Mythologies of Networks',url:'https://publish.iupress.indiana.edu/read/global-yoruba-regional-and-diasporic-networks/section/32debc5b-6966-4af5-9e3a-a8856a9f5c8d',scope:'Different Ilé-Ifẹ̀ origin and Ọbàtálá/Odùduwà accounts'},
   {title:'Cambridge — The Historiography of Yoruba Myth and Ritual',url:'https://www.cambridge.org/core/journals/history-in-africa/article/abs/historiography-of-yoruba-myth-and-ritual/09E8E2D405ADD582658F81FFC57B4757',scope:'How narrative traditions and historical interpretation need careful separation'}
  ]
 }
};
