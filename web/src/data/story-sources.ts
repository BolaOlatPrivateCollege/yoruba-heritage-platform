// Separate draft register. Never added to the frozen 128-source catalogue.
const accessed = '2026-11-22';
function record(id:string, title:string, publisher:string, url:string, material:string,
  locality:string, johnsonAssessment:string, passages:{id:string;locator:string;supports:string;limits:string}[], rightsNote = 'Text paraphrased; no media copied. Reproduction and publication rights remain unreviewed.') {
  return {id,title,publisher,url,material,locality,accessed,accessStatus:'inspected-passages' as const,
    reviewStatus:'unreviewed' as const,rightsStatus:'unknown' as const,rightsNote,johnsonStatus:'bounded-scope-examined' as const,johnsonAssessment,passages};
}
export const storySources = [
  record('f-ife-head','Ife head: Brass head of a ruler','British Museum, via Google Arts & Culture',
    'https://artsandculture.google.com/asset/ife-head-brass-head-of-a-ruler/rQGTIZwDJn4lCg?hl=en',
    'Museum object record, Af1939,34.1','Ilé-Ifẹ̀; Wunmonije Compound',
    'Bounded object/find record: use catalogued material, dated find and stated uncertainty; ancient city origins and dynastic passages excluded.',[
      {id:'find',locator:'Description, first three paragraphs; Details',supports:'1938 find at Wunmonije; brass head, catalogue date 1300–1450; identity/function uncertain; pigment traces.',limits:'Museum dating and interpretation are attributed; no named ruler or precise production year established.'},
      {id:'reception',locator:'Description, paragraph beginning The finds from Wunmonije',supports:'Museum reports earlier European disbelief in African authorship.',limits:'Not evidence for every European response; no Atlantis narrative adopted.'}]),
  record('f-ife-overview','Ife (from ca. 6th Century)','The Metropolitan Museum of Art, Department of Arts of Africa, Oceania, and the Americas',
    'https://www.metmuseum.org/pt/essays/ife-from-ca-6th-century','Museum essay; revised 2014','Ilé-Ifẹ̀, southwestern Nigeria',
    'Use only artistic-period/material claims compared with independent object records. Creation accounts, thirteen-hamlet origins and universal kingship claims excluded.',[
      {id:'art',locator:'Final main paragraph, Between ca. 1200 and 1500',supports:'Artistic production in bronze, terracotta and stone; broad flourishing period.',limits:'No claim of a directly dated foundation or independently verified early royal genealogy.'}]),
  record('f-ife-terracotta','Ife Terracottas (1000–1400 A.D.)','Alice Apley / The Metropolitan Museum of Art',
    'https://www.metmuseum.org/ja/essays/ife-terracottas-1000-1400-a-d','Museum research essay; 2001','Ilé-Ifẹ̀',
    'Selected material/context observations and explicitly uncertain interpretations only. Bibliography inspected; indirect historical dependencies not universally cleared.',[
      {id:'context',locator:'Main text, paragraphs 1–2',supports:'Diverse subjects/scales; secondary contexts complicate original-function claims; finds not limited to palace vicinity.',limits:'This is the author’s published synthesis, not a newly inspected excavation dataset.'},
      {id:'makers',locator:'Main text, final two paragraphs',supports:'Women as possible makers and collaboration as hypotheses, not identified archaeological authors.',limits:'No inference that a particular surviving object has a known maker or maker gender.'}]),
  record('f-ife-horse','Horse head','The Metropolitan Museum of Art',
    'https://www.metmuseum.org/art/collection/search/935750','Museum object record, L.2026.23.1','Ilé-Ifẹ̀, Nigeria',
    'Bounded physical/object metadata; political-origin and lineage claims excluded.',[
      {id:'object',locator:'Description paragraphs 1–2; Artwork Details',supports:'Terracotta; catalogued 12th–15th century; bridle, mane and forehead plate; interpretation relating horses to status.',limits:'No identified rider, owner, individual maker or original event.'}]),
  record('f-ife-chicago','Head','Art Institute of Chicago; loan credited to NCMM Nigeria',
    'https://archive.artic.edu/benin/artwork/189474','Exhibition object record, NCMM 1999.2.3','Ilé-Ifẹ̀, Nigeria',
    'Object metadata and explicitly conditional physical-function interpretation only; Benin origin traditions excluded.',[
      {id:'holes',locator:'Head label, last three sentences',supports:'Small and neck holes; proposed attachments for regalia or a body; hypotheses expressed conditionally.',limits:'No demonstrated reconstruction or burial use asserted.'}]),
  record('f-ife-female','Female Head, Barbier-Mueller exhibition','The Metropolitan Museum of Art',
    'https://www.metmuseum.org/exhibitions/listings/2009/barbier-mueller-museum/photo-gallery','Exhibition catalogue entry, Female Head','Ilé-Ifẹ̀, Nigeria',
    'Only material, ear ornament and stated collection trail used; genesis analogy excluded.',[
      {id:'entry',locator:'Female Head subsection; caption and Provenance',supports:'Terracotta head, 12th–14th century attribution; ear ornament; recorded ownership trail starts in private collection in 1980s.',limits:'Ownership trail is not excavation provenance or proof of lawful original removal.'}]),
  record('f-ife-ncmm','NCMM and The Met: loan, display and study agreement','The Metropolitan Museum of Art / NCMM announcement',
    'https://www.metmuseum.org/press-releases/ncmm-landmark-agreement','Joint institutional announcement, 21 September 2026','Nigeria; New York',
    'Contemporary institutional event and attributed NCMM position, independent of ancient narrative. No quoted speech reproduced.',[
      {id:'agreement',locator:'Opening; paragraphs 29–41; NCMM director statement',supports:'Announced transfer/loan arrangement, 25-year period and collaborative documentation; stated Nigerian institutional perspective.',limits:'Announcement reports institutional intentions; no audit of implementation, ownership resolution or all community views.'}]),
  record('f-ife-icom','Ife head, terracotta','International Council of Museums',
    'https://icom.museum/en/object/ife-head-terracotta/','Red List category record','Ifẹ̀ and Ọ̀wọ̀, southwestern Nigeria',
    'Contemporary heritage-protection classification; no origin tradition used.',[
      {id:'category',locator:'Object heading; Period; Red List; Category',supports:'Ife terracotta category appears in Red List – Africa, with Ife/Owo scope.',limits:'A category alert is not a declaration that a particular object was stolen.'}]),
  record('f-adire-vam','Àdìrẹ – tied and dyed indigo textiles','Victoria and Albert Museum',
    'https://www.vam.ac.uk/articles/adire-tied-and-dyed-indigo-textiles/','Museum textile essay; updated 17 April 2024','Ìbàdàn and southwestern Nigeria',
    'Physical processes and identified collection examples used; sweeping invention-date claims excluded.',[
      {id:'process',locator:'Creating pattern; Stitch resist; Starch resist',supports:'Tied, stitched and cassava-starch resist methods; preparation before dyeing.',limits:'Explanatory process, not a chemical recipe or a universal maker practice.'},
      {id:'signature',locator:'Hand painting, final paragraph; Circ.588-1965 caption',supports:'Unidentified scorpion-like maker marks recorded; maker name unresolved.',limits:'No invented identity, quotation or spiritual pattern meaning.'},
      {id:'names',locator:'Creating pattern, Ibadan examples',supports:'Pattern names can vary by town and time; named 1960s collection examples.',limits:'Names are collection-specific; no universal motif dictionary inferred.'}]),
  record('f-adire-fashion','Africa fashion: cloth of a continent','Victoria and Albert Museum',
    'https://www.vam.ac.uk/articles/cloth-of-a-continent-africa-fashion','Museum exhibition essay','Southwestern Nigeria; contemporary fashion',
    'Bounded textile/process account and attributed uncertainty; no Johnson-derived chronology adopted.',[
      {id:'adire',locator:'Àdìrẹ subsection, paragraphs 1–4 and technique list',supports:'Origins described as unknown; factory cotton, handwork and fashion adaptations; ìró as wrapped skirt.',limits:'Not a verified first inventor/date or proof that all contemporary cloth uses one dye.'}]),
  record('f-adire-met','Ibadandun Wrapper (Adire Eleko)','The Metropolitan Museum of Art',
    'https://www.metmuseum.org/art/collection/search/318969','Museum object record, 2004.347','Abẹ́òkúta region, Nigeria (catalogue attribution)',
    'Primary catalogue metadata only; no town-of-invention or motif-meaning assertion.',[
      {id:'object',locator:'Artwork Details',supports:'Cotton wrapper; 20th-century attribution; Abeokuta-region geography; generic Yoruba-artist credit.',limits:'The title does not prove a specific maker, workshop or the exclusive geography of a design.'}]),
  record('f-adire-nike','Nike Art Foundation: mission and teaching','Nike Art Foundation',
    'https://nikeartfoundation.com/','Practitioner-led organisation’s public account','Nigeria; Òṣogbo and other centres',
    'Primary contemporary self-description; only stated teaching mission used, not independent impact verification.',[
      {id:'teaching',locator:'Our Founder; Our Mission; About Us',supports:'Organisation describes apprenticeship and master teachers in adire, batik and other crafts.',limits:'Not independently audited income, employment or training outcomes.'}]),
  record('f-adire-artisans','The Artisans','Adirelounge',
    'https://www.adirelounge.com/pages/the-artisans','Textile business’s public artisan/process account','Nigeria-linked textile practice; no individual town inferred',
    'Primary contemporary commercial self-description; not historical authority or independent sustainability certification.',[
      {id:'practice',locator:'Crafting with Purpose; Empowering Local Communities',supports:'Business describes resist work, time, training and an aspiration to fair pay.',limits:'No named worker interview or independently verified labour/environmental outcomes.'}]),
  record('f-adire-biography','Nike Monica Okundaye','Nike Art Foundation',
    'https://nikeartfoundation.com/nike-monica-okundaye/','Organisation biography and selected works','Ogidi-Ijumu, Kogi; Nigeria',
    'Attributed modern biography and art catalogue; no remote origin claims.',[
      {id:'range',locator:'Biography, opening paragraph; Works: Market Women and Basket Weavers',supports:'Foundation situates textile work in Ogidi-Ijumu as well as other centres; selected works name everyday occupations.',limits:'Self-reported employment numbers not adopted; individual painting subjects not treated as documentary portraits.'}]),
  record('f-gelede-met','Gẹ̀lẹ̀dẹ́ helmet mask','The Metropolitan Museum of Art',
    'https://www.metmuseum.org/art/collection/search/316460','Museum object study, 1990.336','Ketu region: southwestern Nigeria or Republic of Benin',
    'Physical features, catalogue locality and attributed curatorial interpretation only; eighteenth-century origin claim excluded.',[
      {id:'object',locator:'Description paragraphs 1–3; Artwork Details',supports:'Intertwined creatures above a face; women’s power and metaphor as museum interpretation; uncertain Nigeria/Benin attribution.',limits:'Not an authenticated ritual transcript or universal animal-symbol code.'}]),
  record('f-gelede-yewa','Helmet Mask (Gelede), Yewa-Yoruba artist','The Metropolitan Museum of Art',
    'https://www.metmuseum.org/art/collection/search/310975','Museum object record, 1978.412.514','Meko region, Nigeria; Yewa-Yoruba',
    'Object-specific material and locality metadata, not a universal ritual description.',[
      {id:'record',locator:'Artwork Details',supports:'Yewa-Yoruba attribution, Meko region, wood/pigment/metal staples; 19th–20th-century catalogue date.',limits:'No maker name, original performance or repair date established by this record.'}]),
  record('f-gelede-cleveland','Mask, Duga of Mẹkọ','Cleveland Museum of Art',
    'https://www.clevelandart.org/art/1975.168.1','Museum object study, 1975.168.1','Mẹkọ; Ketu training association',
    'Object/artist research with explicit attribution to museum; no universal origin chronology or supernatural assertion.',[
      {id:'carver',locator:'Did You Know?; Description; Copyright',supports:'Named carver Duga; museum account of sponsored apprenticeship; jointed crocodile tails and multiple paint layers.',limits:'Biography remains museum-reported; object under copyright, so image not copied.'}]),
  record('f-gelede-umma','Gelede Mask','University of Michigan Museum of Art',
    'https://umma.umich.edu/objects/gelede-mask-tc2008-2/','Museum object record, TC2008.2','Western Yoruba scope in label; object locality unspecified',
    'Physical Description and material fields only. Broad spiritual explanations and faulty/unmarked lexical glosses not adopted.',[
      {id:'physical',locator:'Artwork Details; Physical Description',supports:'Wood, pigment and sand; pierced pupils; cheek and forehead marks; late-20th-century record.',limits:'No inference of wearer identity, lineage, town or meaning of facial marks.'}]),
  record('f-gelede-olaniyan','The Philosophical Essence of GẸ̀LẸ̀DẸ́','Adeola Seleem Olaniyan / Journal of Cultures and Ideas',
    'https://journal.ias-ife.com/index.php/journal/article/download/8/14','Open PDF, volume 2(1), pp.39–58; journal page published 2025','Ìgbóòrà, Ọ̀yọ́ State; author at University of Ibadan',
    'Selected author argument and dated interview references inspected; text/reference search found no Johnson. Broad historical introduction and upstream historical retellings excluded.',[
      {id:'argument',locator:'Printed pp.52–54 (PDF pp.14–16), discussion of Laisi Adeogun and conclusion; Works Cited pp.57–58',supports:'Author’s argument about performance/reasoning and interview context; distinguishing explanation from conclusion.',limits:'No verses/translations copied; author-mediated testimony, not our interview or blanket philosophical/practitioner consensus.'}],
    'Journal states CC BY-NC 4.0. Only a short original summary of argument is used; interview, verse, translation and public-release permissions remain unreviewed.'),
  record('f-osun-unesco','Osun-Osogbo Sacred Grove','UNESCO World Heritage Centre',
    'https://whc.unesco.org/en/list/1118/','Heritage listing; Outstanding Universal Value','Òṣogbo, Ọ̀ṣun State, Nigeria',
    'Bounded site/conservation description; origin chronology and universal theological statements excluded.',[
      {id:'landscape',locator:'Brief synthesis; Integrity; Authenticity; Protection and management requirements',supports:'River/forest/shrines; living religious use; modern art; maintenance and visitor-pressure concerns.',limits:'Belief attributed to worshippers; not environmental measurements or clinical proof; historic management-plan dates not treated as current policy.'}]),
  record('f-osun-welcome','Ẹ káàbọ̀! Welcome to the Sacred Ọ̀ṣun Òṣogbo Groves','Adunni Olorisha Trust / Adunni Osun Foundation',
    'https://artsandculture.google.com/story/JwVR9LSh2LnG0A','Community-associated conservation organisation’s authored exhibit','Òṣogbo',
    'Attributed contemporary conservation/artist account only; mythical founding-pact and universal-origin passages excluded.',[
      {id:'custodians',locator:'Shrines deteriorated; Preservation and transformation; Restoration',supports:'Organisation places priestess and Nigerian artists in preservation history; intergenerational restoration.',limits:'Not a new interview, a complete community position or permission to reuse credited media.'}]),
  record('f-osun-artists','The New Sacred Art Movement','Adunni Olorisha Trust / Adunni Osun Foundation',
    'https://artsandculture.google.com/story/lQUBIZiu5BLXNQ','Organisation-authored artist exhibit','Òṣogbo',
    'Primary organisational account of its artists and collaborations; theology is attributed belief, not empirical claim.',[
      {id:'akanji',locator:'Opening movement account; Adebisi Akanji subsection',supports:'Akanji’s collaboration and cement-sculpture practice; distinct named contributors.',limits:'Does not establish sole authorship of an entire landscape or all custodians’ views.'}]),
  record('f-osun-restoration','The Art of Restoration','Adunni Olorisha Trust / Adunni Osun Foundation',
    'https://artsandculture.google.com/story/4wWBaimI-4Jf8g','Restoration team’s public process account','Òṣogbo',
    'Contemporary first-party process documentation; regulatory assertions treated as this organisation’s account, not legal guidance.',[
      {id:'process',locator:'Restoration team; Archival photographs; How will restored works last?; Shrine wall paintings',supports:'Team roles, photographs, drainage/repair and knowledge transmission; Kujenyo Kehinde named in wall-painting account.',limits:'No restricted ritual details, chemical treatment instructions or unverified current conservation claims reproduced.'}]),
  record('f-osun-cyark','Osun Osogbo Sacred Groves','CyArk',
    'https://www.cyark.org/projects/osun-osogbo-sacred-groves/overview','Project team’s documentation report','Òṣogbo; 2019 documentation',
    'First-party technical account of dated recording work; no traditional origin history used.',[
      {id:'recording',locator:'About the site, final paragraph',supports:'September 2019 work with IMISI3D, AOT and NCMM; photogrammetry/laser scanning and local artist interviews.',limits:'Models/interviews not independently examined or embedded; a dated condition record is not present condition.'}]),
  record('f-osun-ministry','Osun-Osogbo Sacred Grove','Federal Ministry of Art, Culture and the Creative Economy, Nigeria',
    'https://www.fmacce.gov.ng/heritage-site/osun-osogbo-sacred-grove','Government heritage-site description','Ọ̀ṣun State, Nigeria',
    'Contemporary official description; attributed religious association and listing date, no universal sacred history.',[
      {id:'site',locator:'Heritage Site, two descriptive paragraphs',supports:'2005 World Heritage recognition; shrines, paths and continuing festival/religious significance.',limits:'Not a first-person custodian interview, current event schedule or public-release consent.'}]),
];

// Blocked leads are disclosed rather than silently upgraded to factual evidence.
export const researchGaps = [
  {topic:'Gẹ̀lẹ̀dẹ́ across Benin, Nigeria and Togo',url:'https://ich.unesco.org/en/RL/oral-heritage-of-gelede-00002',status:'blocked-direct-access',note:'Search index identifies the multinational listing; direct page/linked PDF returned a human-verification page. No ritual account or inscription-date assertion is sourced to it in this pilot. Obtain accessible official text and authorised Yoruba-Nago voices, especially from Togo.'},
  {topic:'Gẹ̀lẹ̀dẹ́ safeguarding project',url:'https://ich.unesco.org/en/projects/action-plan-for-the-safeguarding-and-promotion-of-the-oral-tradition-of-gelede-00006',status:'blocked-direct-access',note:'Search excerpt is a lead only; no project outcomes claimed.'},
  {topic:'Other museum photographs',url:'https://opencollection.brooklynmuseum.org/objects/3014',status:'stale-link',note:'Live page returned 404 despite indexed licence text. No image copied or permission inferred.'},
];
