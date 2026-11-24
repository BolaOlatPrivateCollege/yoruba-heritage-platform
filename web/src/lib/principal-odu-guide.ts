// Editorial summaries of owner-supplied material, not authenticated sacred interpretations.
export type PrincipalGuide={slug:string;aliases:string;theme:string;narrative:string;reflection:string;ire:string;ibi:string;associations:string};
export const principalGuides:Record<string,PrincipalGuide>=Object.fromEntries(([
  {
    "slug": "ogbe",
    "aliases": "Ogbè Méjì; Èjì Onílẹ̀; Baba Ejiogbe",
    "theme": "Light, clarity, leadership and alignment with Orí.",
    "narrative": "Accounts supplied describe Àkalamàgbò establishing authority and Obì succeeding on a mission after an offering.",
    "reflection": "Authority is sustained by humility, patience and good character, not status alone.",
    "ire": "Honour, children, livelihood and overcoming adversity.",
    "ibi": "Pride, anger and impatience.",
    "associations": "Ọ̀rúnmìlà, Olódùmarè, Olókun, Èṣù and Orí"
  },
  {
    "slug": "oyeku",
    "aliases": "Oyekun Meyi (diaspora spelling)",
    "theme": "Night, endings, renewal and ancestral transition.",
    "narrative": "The supplied Pẹ̀rẹ̀gẹ̀dẹ́ account connects morning prayer with blessing; another account warns against delayed care.",
    "reflection": "Recognise transitions and respond to warning signs rather than treating endings as inevitable.",
    "ire": "Relief from hardship, family stability and longevity.",
    "ibi": "Loss, illness and neglect of counsel.",
    "associations": "Egúngún, Ọ̀rúnmìlà and Èṣù"
  },
  {
    "slug": "iwori",
    "aliases": "Iwori Meyi",
    "theme": "Inner sight, perception and discernment.",
    "narrative": "The supplied account of Orí-Mọ́níkẹ̀ẹ́ emphasises carefulness; another theme concerns mastery of one's own heart.",
    "reflection": "Examine motives and appearances with self-honesty.",
    "ire": "Insight, sound judgement and favour.",
    "ibi": "Conceit, slander and deception.",
    "associations": "Ọ̀rúnmìlà, Orí and Èṣù"
  },
  {
    "slug": "odi",
    "aliases": "Odi Meyi",
    "theme": "Enclosure, foundation and protection.",
    "narrative": "The supplied narrative motifs concern secure spaces, hazardous ground and nurturing growth.",
    "reflection": "Establish boundaries and foundations before expanding.",
    "ire": "Stability, protection and growth.",
    "ibi": "Feeling trapped, hidden snares and vulnerability.",
    "associations": "Ọ̀rúnmìlà, Ilẹ̀ and Èṣù"
  },
  {
    "slug": "irosun",
    "aliases": "Irosun Meyi",
    "theme": "Ancestral memory, devotion and steadfastness.",
    "narrative": "The supplied accounts connect service and generosity amid difficulty with eventual recognition.",
    "reflection": "Maintain commitments and help others without neglecting one's own care.",
    "ire": "Recognition, skilled work and support.",
    "ibi": "Setbacks, strain and overextension.",
    "associations": "Ọ̀rúnmìlà, Orí and ancestors"
  },
  {
    "slug": "owonrin",
    "aliases": "Ojuani Meyi (diaspora label supplied)",
    "theme": "Change, reversal and movement.",
    "narrative": "The supplied accounts warn against ingratitude, hypocrisy and public disputes.",
    "reflection": "Adapt with discretion and gratitude when circumstances change.",
    "ire": "Renewal, adaptability and breakthroughs.",
    "ibi": "Duplicity, rashness and indiscretion.",
    "associations": "Ọ̀rúnmìlà, Èṣù and Egúngún"
  },
  {
    "slug": "obara",
    "aliases": "Obara Meyi",
    "theme": "Speech, generosity and abundance.",
    "narrative": "The supplied accounts contrast honest speech and generosity with deceit and boasting.",
    "reflection": "Treat words and authority as responsibilities; patience sustains trust.",
    "ire": "Recognition, prosperity and creativity.",
    "ibi": "Falsehood, betrayal and arrogance.",
    "associations": "Ọ̀rúnmìlà, Ṣàngó and Èṣù"
  },
  {
    "slug": "okanran",
    "aliases": "Okana Meyi (diaspora label supplied)",
    "theme": "Courage, resolve and confronting obstacles.",
    "narrative": "The supplied motifs concern moral judgement and standing firm against disgrace.",
    "reflection": "Act decisively without abandoning fairness or reflection.",
    "ire": "Resilience and courage.",
    "ibi": "Impulsiveness, conflict and misjudgement.",
    "associations": "Ọ̀rúnmìlà, Èṣù and Ògún"
  },
  {
    "slug": "ogunda",
    "aliases": "Ogunda Meyi",
    "theme": "Iron, labour and clearing paths.",
    "narrative": "The supplied motif depicts opening a path through dense bush and balancing force with wisdom.",
    "reflection": "Work and tools support progress; restraint prevents harmful conflict.",
    "ire": "Livelihood, effort and overcoming obstacles.",
    "ibi": "Quarrels, rashness and betrayal.",
    "associations": "Ògún, Ọ̀rúnmìlà and Ọbàtálá"
  },
  {
    "slug": "osa",
    "aliases": "Osa Meyi",
    "theme": "Wind, intuition and respect for maternal elders.",
    "narrative": "The supplied motifs concern respectful speech around elders and sacred spaces.",
    "reflection": "Exercise humility and respect for others rather than relying on force.",
    "ire": "Discernment, vindication and advancement.",
    "ibi": "Gossip, disrespect and carelessness.",
    "associations": "Ọ̀rúnmìlà, Àwọn Ìyá, Ọbàtálá and Ṣàngó"
  },
  {
    "slug": "ika",
    "aliases": "Ika Meyi",
    "theme": "Restraint, patience and strategic resolution.",
    "narrative": "The supplied motifs depict patience untangling difficulties and Èṣù advocating for young Ìká.",
    "reflection": "Resolve complex problems with self-control rather than impulsive force.",
    "ire": "Endurance, assistance and resolution.",
    "ibi": "Envy, traps and hasty decisions.",
    "associations": "Ọ̀rúnmìlà and Èṣù"
  },
  {
    "slug": "oturupon",
    "aliases": "Oturupon Meyi",
    "theme": "Care, endurance and restoration.",
    "narrative": "The supplied motifs concern carrying burdens, recovering and bringing responsibilities to completion.",
    "reflection": "Patient care and appropriate support matter during difficult seasons.",
    "ire": "Relief, restoration and completion.",
    "ibi": "Exhaustion and prolonged strain.",
    "associations": "Ọ̀rúnmìlà, Èṣù and healing/earth forces"
  },
  {
    "slug": "otura",
    "aliases": "Otura Meyi",
    "theme": "Wisdom, prayer, diplomacy and truth.",
    "narrative": "The supplied accounts contrast patient action with haste or greed and emphasise sincerity in prayer.",
    "reflection": "Cultivate integrity and gratitude instead of hurry or pride.",
    "ire": "Peace, wisdom and advancement.",
    "ibi": "Impatience, carelessness and ingratitude.",
    "associations": "Ọ̀rúnmìlà, Olódùmarè and Èṣù"
  },
  {
    "slug": "irete",
    "aliases": "Irete Meyi",
    "theme": "Persistence, discipline and thoughtful action.",
    "narrative": "The supplied Làdébù (Yèyé Òkè) narrative lead concerns maternal prayers and navigating opposition wisely.",
    "reflection": "Persistence and intelligent navigation can be more effective than confrontation.",
    "ire": "Honour, adaptability and persistence rewarded.",
    "ibi": "Selfishness and contentious disputes.",
    "associations": "Ọ̀rúnmìlà, Orí, Ilẹ̀ and Ṣàngó"
  },
  {
    "slug": "ose",
    "aliases": "Oshe Meyi",
    "theme": "Sweetness, harmony and restorative care.",
    "narrative": "The supplied motifs associate Ọ̀ṣun, water and sweetness with nurturing rather than harshness.",
    "reflection": "Gentleness and diplomacy can be effective alongside healthy boundaries.",
    "ire": "Harmony, favour and abundance.",
    "ibi": "Greed, rash temper and betrayal.",
    "associations": "Ọ̀ṣun, Ọ̀rúnmìlà and Èṣù"
  },
  {
    "slug": "ofun",
    "aliases": "Ọ̀ràngún Méjì; Ofun Meyi",
    "theme": "Completion, purity and elder wisdom.",
    "narrative": "The supplied motifs describe elder dignity without clinging to office and peaceful resolution of tension.",
    "reflection": "Respect predecessors and exercise calm authority rather than coercion.",
    "ire": "Peace, completion and longevity.",
    "ibi": "Stubbornness, greed and overreach.",
    "associations": "Ọ̀rúnmìlà, Ọbàtálá, Èṣù and elders"
  }
] as PrincipalGuide[]).map(g=>[g.slug,g]));
