/* Àṣà & Ìtàn Sacred World: source-checked editorial research drafts. Review all community-specific accounts before institutional publication. */
(()=>{
"use strict";
const D=window.HISTORY_DATA;
const supplement={
  "sources": [
    {
      "id": "sac-ethics",
      "institution": "Cambridge University Press / Africa",
      "title": "Èṣù and ethics in the Yorùbá world view",
      "kind": "Peer-reviewed journal abstract",
      "url": "https://www.cambridge.org/core/journals/africa/article/abs/esu-and-ethics-in-the-yoruba-world-view/0D54711001F9F2C963F7C69F3A02DAFF",
      "detail": "Academic analysis of Èṣù, ethics and the harms of reducing his role to Satan; abstract may not include every argument."
    },
    {
      "id": "sac-nickel",
      "institution": "University of Leeds",
      "title": "Spreading which word? Nineteenth-century Bible translation into Yorùbá",
      "kind": "Academic analysis · full text",
      "url": "https://www.latl.leeds.ac.uk/wp-content/uploads/sites/49/2019/05/Nickel_2013-1.pdf",
      "detail": "Traces missionary translation choices, including the historical rendering of Èṣù as Satan; this analysis is not a devotional authority."
    },
    {
      "id": "sac-esu-staff",
      "institution": "Metropolitan Museum of Art",
      "title": "Esu Staff (Ogo Elegba)",
      "kind": "Museum object record",
      "url": "https://www.metmuseum.org/art/collection/search/312523",
      "detail": "Documents an Oyo-Yoruba Èṣù staff and its place in artistic and devotional material culture."
    },
    {
      "id": "sac-olodumare",
      "institution": "Cambridge University Press",
      "title": "Rethinking the concept of God and the problem of evil from the perspective of African thought",
      "kind": "Scholarly analysis",
      "url": "https://www.cambridge.org/core/journals/religious-studies/article/rethinking-the-concept-of-god-and-the-problem-of-evil-from-the-perspective-of-african-thought/043946FF141F8E601FA6D08EF369F880",
      "detail": "Discusses theological interpretation and important disagreements concerning the supreme being in Yoruba thought."
    },
    {
      "id": "sac-theologians",
      "institution": "AfricaBib / Journal of Religion in Africa",
      "title": "Traditional Theologians and the Practice of Orisa Religion in Yorubaland",
      "kind": "Academic bibliography / summary",
      "url": "https://www.africabib.org/rec.php?RID=087427257",
      "detail": "Highlights the diversity and possible historical development of beliefs concerning Olódùmarè and the òrìṣà."
    },
    {
      "id": "sac-orisa-book",
      "institution": "Indiana University Press · Global Yorùbá",
      "title": "Òrìṣà: Spiritual Networks and Practices",
      "kind": "Academic open-access chapter",
      "url": "https://publish.iupress.indiana.edu/read/global-yoruba-regional-and-diasporic-networks/section/8bbfb2c8-c763-4978-8c90-fe8310856004",
      "detail": "Explains sacred traditions and how icons, communities and diaspora interpretations vary; individual claims still require close reading."
    },
    {
      "id": "sac-creation",
      "institution": "Metropolitan Museum of Art",
      "title": "Ifẹ̀ (from ca. 6th Century)",
      "kind": "Museum historical essay",
      "url": "https://www.metmuseum.org/pt/essays/ife-from-ca-6th-century",
      "detail": "Distinguishes creation narratives involving Odùduwà, Ọbàtálá and Olódùmarè from archaeological chronology."
    },
    {
      "id": "sac-ogun",
      "institution": "Metropolitan Museum of Art",
      "title": "The Age of Iron in West Africa",
      "kind": "Museum historical essay",
      "url": "https://www.metmuseum.org/it/essays/the-age-of-iron-in-west-africa",
      "detail": "Places ironmaking and Ògún in historical and cultural context; does not prove miraculous claims."
    },
    {
      "id": "sac-sango",
      "institution": "Metropolitan Museum of Art",
      "title": "Ṣàngó Staff: Kneeling Female Figure (Ọ̀ṣé Ṣàngó)",
      "kind": "Museum collection record",
      "url": "https://www.metmuseum.org/art/collection/search/314326",
      "detail": "Describes the double-axe symbol and the staff’s use in Ṣàngó devotional festivals."
    },
    {
      "id": "sac-osun",
      "institution": "UNESCO World Heritage Centre",
      "title": "Ọ̀ṣun-Òṣogbo Sacred Grove",
      "kind": "UNESCO heritage record",
      "url": "https://whc.unesco.org/en/list/1118/",
      "detail": "Documents a sacred cultural landscape of shrines, sculptures and community heritage."
    },
    {
      "id": "sac-yemoja",
      "institution": "Adetunbi Richard Ogunleye / Inkanyiso",
      "title": "Cultural identity in the throes of modernity: an appraisal of Yemọja among the Yoruba in Nigeria",
      "kind": "Peer-reviewed journal article",
      "url": "https://uzspace.unizulu.ac.za/items/5d742f7e-66ff-4586-a639-e683cba2c611",
      "detail": "Specifies indigenous Yemọja river associations; useful counterpoint to ocean-only diaspora depictions."
    },
    {
      "id": "sac-oyaoba",
      "institution": "Oxford Academic",
      "title": "Oshun/Ochún, Oya/Oyá, and Oba/Oba",
      "kind": "Academic book chapter abstract",
      "url": "https://academic.oup.com/florida-scholarship-online/book/21720/chapter-abstract/181656865",
      "detail": "Comparative scholarship on three water-related sacred figures and diaspora variations; full chapter not verified."
    },
    {
      "id": "sac-water",
      "institution": "Springer / Discover Global Society",
      "title": "Water in Yorùbá religious belief and practices",
      "kind": "Peer-reviewed academic study",
      "url": "https://link.springer.com/article/10.1007/s44282-024-00054-8",
      "detail": "Documents regionally situated water-associated sacred figures including Ọ̀ṣun, Ọya, Ọbà, Olókun and others."
    },
    {
      "id": "sac-olokun",
      "institution": "Metropolitan Museum of Art",
      "title": "Lidded Vessel, Òwò-Yoruba",
      "kind": "Museum collection record",
      "url": "https://www.metmuseum.org/art/collection/search/316594",
      "detail": "Relates Olókun to coastal water, wealth and royal art in Òwò; local meaning is not universal."
    },
    {
      "id": "sac-osanyin",
      "institution": "Metropolitan Museum of Art",
      "title": "Òsányìn Puppet",
      "kind": "Museum collection record",
      "url": "https://www.metmuseum.org/art/collection/search/314956",
      "detail": "Relates Òsányìn to forest leaves and traditional therapeutic knowledge without verifying clinical efficacy."
    },
    {
      "id": "sac-sopona",
      "institution": "Oxford Academic / Social History of Medicine",
      "title": "Culture and Colonial Medicine: Smallpox in Abeokuta, Western Nigeria",
      "kind": "Peer-reviewed historical article",
      "url": "https://doi.org/10.1093/shm/hkw010",
      "detail": "Contextualises Ṣọ̀pọ̀ná beliefs, smallpox and colonial health programmes."
    },
    {
      "id": "sac-sopona-cdc",
      "institution": "US Centers for Disease Control and Prevention Museum",
      "title": "Shapona, the Yoruba god of smallpox",
      "kind": "Public health museum history",
      "url": "https://www.cdc.gov/museum/history/shapona.html",
      "detail": "Documents the history of a Ṣọ̀pọ̀ná object and twentieth-century smallpox control; official public-health perspective is not a full indigenous theology."
    },
    {
      "id": "sac-oko",
      "institution": "Smithsonian National Museum of African Art",
      "title": "Staff for Ọ̀rìṣà Oko",
      "kind": "Museum collection record",
      "url": "https://africa.si.edu/collection/object/nmafa_2005-6-71.1",
      "detail": "Describes farming-tool iron staffs commissioned for Ọ̀rìṣà Oko shrines."
    },
    {
      "id": "sac-erinle",
      "institution": "Metropolitan Museum of Art",
      "title": "Ẹlẹ́ṣin Figure for an Erinlẹ̀ Shrine",
      "kind": "Museum collection record",
      "url": "https://www.metmuseum.org/art/collection/search/844650",
      "detail": "Locates Èrìnlẹ̀ worship in Ìlọbú and explains shrine sculpture provenance."
    },
    {
      "id": "sac-ibeji",
      "institution": "Metropolitan Museum of Art",
      "title": "Ìbejì Twin Figure",
      "kind": "Museum collection record",
      "url": "https://www.metmuseum.org/art/collection/search/314505",
      "detail": "Provides a regional material record of twin commemoration and family practice."
    },
    {
      "id": "sac-gelede",
      "institution": "UNESCO Intangible Cultural Heritage",
      "title": "Oral Heritage of Gẹ̀lẹ̀dẹ́",
      "kind": "UNESCO heritage record",
      "url": "https://ich.unesco.org/en/RL/oral-heritage-gelede-00002",
      "detail": "Explains Yoruba-Nago performance, respect for Ìyá Nlá and women’s social power."
    },
    {
      "id": "sac-diaspora",
      "institution": "Wiley / Religion Compass",
      "title": "Yoruba Religions in Diaspora",
      "kind": "Scholarly review abstract",
      "url": "https://compass.onlinelibrary.wiley.com/doi/10.1111/j.1749-8171.2010.00223.x",
      "detail": "Reviews transformation and continuity of Yoruba devotional forms in the Atlantic world."
    },
    {
      "id": "sac-ori",
      "institution": "Oxford Academic",
      "title": "Yorùbá Indigenous Religion",
      "kind": "Academic handbook chapter abstract",
      "url": "https://academic.oup.com/edited-volume/61663/chapter-abstract/553394165",
      "detail": "Offers an overview of evolving Yoruba indigenous religious institutions."
    },
    {
      "id": "sac-orunmila",
      "institution": "UNESCO Intangible Cultural Heritage",
      "title": "Ifá Divination System",
      "kind": "UNESCO heritage record",
      "url": "https://ich.unesco.org/en/RL/ifa-divination-system-00146",
      "detail": "Documents the Ifá corpus, 256 odù, specialists and oral transmission."
    },
    {
      "id": "sac-esu-archive",
      "institution": "Cleveland Museum of Art",
      "title": "Dance staff for Èṣù (Ògò Èlẹ́gba)",
      "kind": "Museum object record",
      "url": "https://www.clevelandart.org/print/art/2018.34",
      "detail": "Documents material portrayal of Èṣù and difference between art object and a universal sacred likeness."
    },
    {
      "id": "sac-aja",
      "institution": "Centre for African Studies · University of Leeds",
      "title": "Re-thinking the Calabash; Yorùbá Women as Containers",
      "kind": "Academic cultural essay",
      "url": "https://lucas.leeds.ac.uk/article/re-thinking-the-calabash-emma-christina-rice/",
      "detail": "Context for women, social power and the complexity of Àjẹ́; not permission to stereotype or accuse individuals."
    },
    {
      "id": "sac-unihist",
      "institution": "University of California eScholarship",
      "title": "Ajé & Àjé: Gender and Female Power in Yorùbáland",
      "kind": "Academic study",
      "url": "https://escholarship.org/uc/item/60b6p51f",
      "detail": "Distinguishes concepts involving women’s power and discusses risks of English mistranslation."
    },
    {
      "id": "sac-rainbow",
      "institution": "Smithsonian Institution Archives",
      "title": "Henry John Drewal and Margaret Thompson Drewal Yoruba fieldwork photographs",
      "kind": "Archival collection finding aid",
      "url": "https://sirismm.si.edu/EADpdfs/EEPA.1992-028.pdf",
      "detail": "Archive includes recorded references to Ọ̀ṣùmàrè imagery; no general account can be inferred from its catalogue alone."
    }
  ],
  "profiles": [
    {
      "id": "sac-olodumare",
      "name": "Olódùmarè",
      "kind": "Supreme source",
      "scope": "Broad Yoruba religious philosophy; especially theological and Ifá-linked interpretations",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Olódùmarè is merely the Christian God translated into Yoruba, or a separate “god of the sky” in an unchanging pantheon. CORRECTION: many Yoruba traditions articulate a supreme source, but scholarly debates examine how divine attributes, mediation, evil and worship are understood differently from Christian or Islamic categories. Identity across traditions cannot be assumed solely from a shared English translation."
      ],
      "sourceIds": [
        "sac-olodumare",
        "sac-theologians",
        "sac-orisa-book",
        "sac-creation"
      ],
      "relatedTerms": [
        "Ọlọ́run",
        "Ẹlẹ́dàá",
        "àṣẹ"
      ],
      "articleId": "sac-olodumare",
      "summary": "Olódùmarè is widely described in Ifá and other Yoruba theological discourse as the supreme source of existence and authority. Olódùmarè is not ordinarily listed as a single specialised òrìṣà alongside Ògún or Ọ̀ṣun. The terms Olódùmarè, Ọlọ́run and Ẹlẹ́dàá can overlap in use, but their exact equivalence is a question for named speakers and traditions, not an assumption."
    },
    {
      "id": "sac-esu",
      "name": "Èṣù / Ẹlẹ́gbára",
      "kind": "Òrìṣà",
      "scope": "Yoruba Ifá and regional Èṣù-Ẹlẹ́gbára traditions; diaspora parallels require separate attribution",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Èṣù is Satan, Lucifer or the Christian devil. CORRECTION: that equation reflects a major history of missionary and Bible-translation choices and fails to describe Èṣù’s traditional role. His ethical complexity should not be sanitised into “always good”, either. A responsible account explains mediation, agency, morally challenging narratives and the history of the mistranslation, without calling an indigenous religion demonic."
      ],
      "sourceIds": [
        "sac-nickel",
        "sac-ethics",
        "sac-esu-staff",
        "sac-esu-archive",
        "sac-orisa-book"
      ],
      "relatedTerms": [
        "Èṣù",
        "Ẹlẹ́gbára",
        "ẹbọ"
      ],
      "articleId": "sac-esu",
      "summary": "Èṣù occupies a complex place in Yoruba religious thought: a figure of mediation, communication, consequence, ambiguity and the testing of human conduct. In Ifá-linked traditions Èṣù is frequently discussed in relation to ritual messages and the effectiveness or consequences of human action. Calling him only a “trickster” leaves out this wider ethical and relational role."
    },
    {
      "id": "sac-orunmila",
      "name": "Ọ̀rúnmìlà / Ifá",
      "kind": "Òrìṣà",
      "scope": "Ifá-related practices across Yoruba-speaking communities and traditions carried abroad",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Ifá’s 256 odù proves ancient Yoruba practitioners invented computers or modern binary electronics. CORRECTION: the system has analysable mathematical structure, but structural resemblance is not historical evidence of technical descent. Likewise, Ifá and Èṣù have interrelated roles without being the same sacred being."
      ],
      "sourceIds": [
        "sac-orunmila",
        "sac-orisa-book",
        "unescoifa2"
      ],
      "relatedTerms": [
        "odù",
        "ẹsẹ̀ Ifá",
        "babaláwo"
      ],
      "articleId": "sac-orunmila",
      "summary": "Ọ̀rúnmìlà is associated with wisdom, knowledge of destiny and the interpretive corpus of Ifá. In common public usage “Ifá” may refer to a divination system, its literary body or a sacred personage, depending on context. Those senses overlap but should not be carelessly treated as interchangeable."
    },
    {
      "id": "sac-obatala",
      "name": "Ọbàtálá / Òrìṣàńlá",
      "kind": "Òrìṣà",
      "scope": "Ilé-Ifẹ̀-centred creation narratives and other Yoruba communities with distinct local accounts",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: the creation narratives are a dated, scientifically demonstrated record of the first human or that Ọbàtálá and Odùduwà have identical roles everywhere. CORRECTION: they are meaningful religious narratives with significant variations, and historical archaeology provides different kinds of evidence."
      ],
      "sourceIds": [
        "sac-creation",
        "sac-orisa-book",
        "metwhite"
      ],
      "relatedTerms": [
        "Òrìṣàńlá",
        "Ìfẹ̀"
      ],
      "articleId": "sac-obatala",
      "summary": "Ọbàtálá is an important figure in Yoruba creation accounts and is frequently linked with the shaping of human beings, purity, calm authority and the significance of white materials or clothing. These are religious associations, not scientific claims about anatomy or inherited physical traits."
    },
    {
      "id": "sac-oduduwa",
      "name": "Odùduwà",
      "kind": "Òrìṣà",
      "scope": "Ilé-Ifẹ̀ narratives, royal traditions and lineages with different genealogies",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: archaeologists have conclusively dated Odùduwà’s life or every Yoruba state has one verified bloodline back to a single historical individual. CORRECTION: royal traditions and historical scholarship address different questions; individual biographical details remain disputed or undated."
      ],
      "sourceIds": [
        "sac-creation",
        "sac-orisa-book",
        "ogundiran2020"
      ],
      "relatedTerms": [
        "Ilé-Ifẹ̀",
        "orírun"
      ],
      "articleId": "sac-oduduwa",
      "summary": "Odùduwà is central to a range of Yoruba origin traditions, especially those connecting Ilé-Ifẹ̀, sacred kingship and the historical imagination of descent. The figure’s standing as a deity, primordial agent, founder or ancestral king differs by account; the website will not impose one classification on every lineage."
    },
    {
      "id": "sac-ogun",
      "name": "Ògún",
      "kind": "Òrìṣà",
      "scope": "Widespread Yoruba contexts with distinctive local smithing, occupational and shrine histories",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Ògún is only a destructive war god or the inventor of all modern industry. CORRECTION: his associations include productive labour, metalwork, tools and serious ethical duties. These meanings are real as cultural history without establishing an impossible direct patent lineage."
      ],
      "sourceIds": [
        "sac-ogun",
        "metiron",
        "sac-orisa-book"
      ],
      "relatedTerms": [
        "irin",
        "alágbẹ̀dẹ"
      ],
      "articleId": "sac-ogun",
      "summary": "Ògún is strongly associated with iron, blacksmithing, implements, clearing pathways, technical labour and the dangers and obligations surrounding sharp tools. The link extends beyond warfare: farm tools, craft skill and the social world of those who work metal matter to understanding the tradition."
    },
    {
      "id": "sac-sango",
      "name": "Ṣàngó",
      "kind": "Òrìṣà",
      "scope": "Ọ̀yọ́ and other Yoruba Ṣàngó traditions, with significant Atlantic diaspora histories",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Ṣàngó was literally a thunderstorm, or has one historically proven biography, or is interchangeable with Greek Zeus. CORRECTION: religious, royal and atmospheric meanings coexist, while the comparisons with foreign mythologies are interpretive analogies rather than identities."
      ],
      "sourceIds": [
        "sac-sango",
        "sac-orisa-book",
        "sac-diaspora"
      ],
      "relatedTerms": [
        "ọ̀ṣé Ṣàngó",
        "àrá"
      ],
      "articleId": "sac-sango",
      "summary": "Ṣàngó is associated with thunder and lightning, power, kingship, charisma and public ritual performance. In Ọ̀yọ́-centred traditions he also has a historical-royal dimension. No single sentence such as “Ṣàngó is electricity” adequately explains the figure."
    },
    {
      "id": "sac-osun",
      "name": "Ọ̀ṣun",
      "kind": "Òrìṣà",
      "scope": "Òṣogbo, Èdè and other Ọ̀ṣun-associated communities; Atlantic diaspora traditions",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Ọ̀ṣun is simply “Yoruba Aphrodite”, only concerned with romance, or that ritual water is a clinically established cure. CORRECTION: her associations are much broader, and claims about physical treatment require separate scientific evaluation."
      ],
      "sourceIds": [
        "sac-osun",
        "sac-water",
        "sac-orisa-book"
      ],
      "relatedTerms": [
        "Òṣogbo",
        "ìbù"
      ],
      "articleId": "sac-osun",
      "summary": "Ọ̀ṣun is closely associated with the Ọ̀ṣun River and devotional landscapes including Òṣogbo. Many traditions connect her with fertility, care, prosperity, relational power, aesthetics and community guardianship. She is not reducible to the modern internet label “goddess of love”."
    },
    {
      "id": "sac-yemoja",
      "name": "Yemọja / Yemonja",
      "kind": "Òrìṣà",
      "scope": "River-associated Yoruba settings, including southwestern Nigeria, and ocean-oriented Atlantic diaspora communities",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Yemọja has always and everywhere been solely an ocean goddess, or that she and Olókun are identical. CORRECTION: documented Nigerian river settings and diaspora ocean settings differ, and Olókun has separate though sometimes connected regional histories."
      ],
      "sourceIds": [
        "sac-yemoja",
        "sac-orisa-book",
        "sac-diaspora",
        "sac-water"
      ],
      "relatedTerms": [
        "Òògùn",
        "ìyá"
      ],
      "articleId": "sac-yemoja",
      "summary": "Yemọja is a powerful maternal and water-associated sacred figure. A critical distinction matters: Nigerian Yoruba accounts connect her strongly with rivers, including the Ògùn River; in important diaspora traditions she is commonly associated with the ocean. Both have histories and neither should silently replace the other."
    },
    {
      "id": "sac-oya",
      "name": "Ọya",
      "kind": "Òrìṣà",
      "scope": "River and town traditions including Irá, and related diaspora interpretations",
      "confidence": "Academic associations supported; local genealogies unverified",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Ọya is only a cartoon “storm goddess”, equivalent to the weather itself, or that one colour scheme and one myth apply globally. CORRECTION: the Niger association, community-specific narratives and diaspora developments require separate documentation."
      ],
      "sourceIds": [
        "sac-oyaoba",
        "sac-water",
        "sac-orisa-book"
      ],
      "relatedTerms": [
        "Odò Ọya",
        "Irá"
      ],
      "articleId": "sac-oya",
      "summary": "Ọya is associated in important Yoruba traditions with the Niger River and powerful winds, storms, change and transformative force. Some narratives place her in relation to Ṣàngó. These are attributed religious traditions, not universal meteorological explanations or a single fixed biography."
    },
    {
      "id": "sac-olokun",
      "name": "Olókun",
      "kind": "Òrìṣà",
      "scope": "Òwò, coastal Yoruba, neighbouring Edo traditions and wider diaspora contexts",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Olókun is exactly the same everywhere, always male or always female, or that all underwater wealth stories are demonstrable events. CORRECTION: these are living regional religious traditions with real differences and symbolic meanings."
      ],
      "sourceIds": [
        "sac-olokun",
        "sac-water",
        "sac-orisa-book"
      ],
      "relatedTerms": [
        "Òwò",
        "Òkun"
      ],
      "articleId": "sac-olokun",
      "summary": "Olókun is associated with deep water, wealth, prosperity and the symbolism of maritime connections. Olókun belongs to traditions in Yoruba- and Edo-speaking settings and beyond; these communities should not be treated as having one identical god, gender, shrine or origin history."
    },
    {
      "id": "sac-osanyin",
      "name": "Òsányìn",
      "kind": "Òrìṣà",
      "scope": "Yoruba local knowledge traditions involving forest materials and ritual specialists",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Òsányìn is simply a “medicine god” whose plants are therefore scientifically proven harmless. CORRECTION: cultural expertise deserves research and credit, while therapeutic safety and effectiveness need independent testing."
      ],
      "sourceIds": [
        "sac-osanyin",
        "plants",
        "whomed",
        "whointeract"
      ],
      "relatedTerms": [
        "ewé",
        "oníṣègùn"
      ],
      "articleId": "sac-osanyin",
      "summary": "Òsányìn is associated with leaves, forests and sacred plant knowledge. The public historical record connects this figure with forms of ritual expertise and therapeutic practice. It is essential to keep spiritual significance, botanical knowledge and medical effectiveness as three different claims."
    },
    {
      "id": "sac-sopona",
      "name": "Ṣọ̀pọ̀ná / Ọbalúayé",
      "kind": "Òrìṣà",
      "scope": "Yoruba smallpox histories, including Abẹ́òkúta and other south-western communities; connected regional variants",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: smallpox was literally caused by a deity, or a shrine can cure it instead of medical prevention; equally false is the blanket claim that traditional communities possessed no medical knowledge. CORRECTION: separate historical belief, documented social health practices and modern virology. Smallpox is caused by variola virus; it was eradicated through public-health work including vaccination."
      ],
      "sourceIds": [
        "sac-sopona",
        "sac-sopona-cdc",
        "sac-ori"
      ],
      "relatedTerms": [
        "Ṣọ̀pọ̀ná",
        "abẹ́rẹ́ ajẹ́sára"
      ],
      "articleId": "sac-sopona",
      "summary": "Ṣọ̀pọ̀ná is a sacred figure historically associated with smallpox, disease, social fear and healing. Names such as Ọbalúayé appear in connected but regionally varying traditions. This history cannot be reduced to “Africans believed gods caused viruses,” nor can traditional ritual replace vaccination or outbreak control."
    },
    {
      "id": "sac-orisa-oko",
      "name": "Ọ̀rìṣà Oko",
      "kind": "Regional òrìṣà",
      "scope": "Named shrine traditions including Ìràwò and other agricultural communities",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Ọ̀rìṣà Oko is simply identical to Ògún because both use iron or “invented agriculture”. CORRECTION: their sacred associations overlap at materials but remain distinct, and agriculture emerged through many historical processes."
      ],
      "sourceIds": [
        "sac-oko",
        "metoko",
        "sac-ogun"
      ],
      "relatedTerms": [
        "ọ̀pá Oko",
        "ìṣẹ́ àgbẹ̀"
      ],
      "articleId": "sac-orisa-oko",
      "summary": "Ọ̀rìṣà Oko is connected to agriculture, farmland, tools and fertility of the land in named Yoruba communities. Farming tools and forged iron staffs are central to his documented ritual material culture. This is a valuable regional profile, not a claim that the same rite was universal."
    },
    {
      "id": "sac-erinle",
      "name": "Èrìnlẹ̀",
      "kind": "Regional òrìṣà",
      "scope": "Ìlọbú and other specific Yoruba communities; regional usage varies",
      "confidence": "Documented shrine and art; broader theology awaiting community review",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Èrìnlẹ̀ is obscure or unimportant because global internet lists rarely mention the name. CORRECTION: importance is local and historical; a securely documented Ìlọbú shrine deserves central attention."
      ],
      "sourceIds": [
        "sac-erinle",
        "meterinle",
        "sac-ori"
      ],
      "relatedTerms": [
        "Ìlọbú"
      ],
      "articleId": "sac-erinle",
      "summary": "Èrìnlẹ̀ is a locally important òrìṣà associated with particular Yoruba shrine communities, including Ìlọbú. Public descriptions connect the figure with waters and aspects of hunting or healing, but these descriptions must not erase locally specific identities and narratives."
    },
    {
      "id": "sac-oba-river",
      "name": "Ọbà",
      "kind": "Regional òrìṣà",
      "scope": "River Ọbà and towns including Ògbómọ̀ṣọ́, with Atlantic diaspora variants",
      "confidence": "Water association documented; detailed legends vary by region",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Ọbà is only a foolish or inferior wife in a moral fable. CORRECTION: this is one reductive modern presentation of narrative material; the figure also has river, community and devotional significance."
      ],
      "sourceIds": [
        "sac-water",
        "sac-oyaoba"
      ],
      "relatedTerms": [
        "Odò Ọbà"
      ],
      "articleId": "sac-oba-river",
      "summary": "Ọbà is a river-associated sacred figure whose traditions are especially meaningful in particular Yoruba communities. Some narratives describe relationships involving Ṣàngó and Ọ̀ṣun. The popular single-story treatment of her as a jealous wife is reductive and can reinforce unfair stereotypes about women."
    },
    {
      "id": "sac-ibeji",
      "name": "Ìbejì",
      "kind": "Regional òrìṣà",
      "scope": "Yoruba communities with varying family traditions, including Ọ̀yọ́-linked carving histories",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: ìbejì is merely a doll, or every Yoruba family must worship twin figures, or twins are dangerous. CORRECTION: figures may have profound memorial meaning in particular contexts, but practices are diverse and no family should be stereotyped."
      ],
      "sourceIds": [
        "sac-ibeji",
        "mettwins",
        "sac-ori"
      ],
      "relatedTerms": [
        "ẹ̀jìrẹ́"
      ],
      "articleId": "sac-ibeji",
      "summary": "Ìbejì means twins and describes a significant complex of religious and familial meanings. In a number of Yoruba communities, twins have special social and spiritual importance; carved twin figures were sometimes made to honour deceased children. This category is not equivalent to one universal god with a single personality."
    },
    {
      "id": "sac-oshosi",
      "name": "Ọ̀ṣọ́ọ̀sì",
      "kind": "Regional òrìṣà",
      "scope": "Selected Yoruba and Atlantic diaspora hunting-related traditions; local evidence needs expansion",
      "confidence": "Provisional research entry: specific claims awaiting primary-source verification",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: one modern social-media description settles all of Ọ̀ṣọ́ọ̀sì’s origin, colour, relationships and rites. CORRECTION: record the difference between a community tradition, a diaspora development and an unsourced online assertion."
      ],
      "sourceIds": [
        "sac-orisa-book",
        "sac-diaspora"
      ],
      "relatedTerms": [
        "ọdẹ"
      ],
      "articleId": "sac-oshosi",
      "summary": "Ọ̀ṣọ́ọ̀sì is often associated in regional and diaspora narratives with hunting, tracking and forest skill. The precise spelling, status and extent of individual traditions should be documented with named Yoruba and diaspora voices instead of assuming a single global hunter deity biography."
    },
    {
      "id": "sac-osumare",
      "name": "Ọ̀ṣùmàrè",
      "kind": "Regional òrìṣà",
      "scope": "Selected Yoruba and Atlantic diaspora contexts; source-based geographic limitations",
      "confidence": "Archive lead only; requires practitioner/source verification",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: all rainbow serpent traditions across West Africa and Brazil are the same being, or that a rainbow confirms a divine physical event. CORRECTION: similarities invite comparative research; they are not proof of identity or supernatural causation."
      ],
      "sourceIds": [
        "sac-rainbow",
        "sac-diaspora",
        "sac-ori"
      ],
      "relatedTerms": [
        "òṣùmàrè"
      ],
      "articleId": "sac-osumare",
      "summary": "Ọ̀ṣùmàrè is associated with rainbow imagery and, in some traditional and diaspora settings, serpentine symbolism. The name and related images should be studied in their particular cultural setting, rather than treated as proof of one pan-African “rainbow god” shared without distinction by every community."
    },
    {
      "id": "sac-ori",
      "name": "Orí / Orí inú",
      "kind": "Spiritual concept",
      "scope": "Widespread Yoruba language and philosophical traditions; many interpretive approaches",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Orí is just “fate”, eliminating choice, or is literally the same as one of the named òrìṣà everywhere. CORRECTION: the concept has a substantial philosophical discussion about personhood and agency, and is not reducible to one English word."
      ],
      "sourceIds": [
        "sac-ori",
        "sac-orisa-book",
        "sac-orunmila"
      ],
      "relatedTerms": [
        "orí inú",
        "ìpín"
      ],
      "articleId": "sac-ori",
      "summary": "Orí literally means head, and Yoruba philosophical and religious discussions also use it for an inner or personal dimension associated with destiny, character and the person. Orí is not simply interchangeable with a head-shaped deity or a Western horoscope."
    },
    {
      "id": "sac-egungun",
      "name": "Egúngún",
      "kind": "Ancestral tradition",
      "scope": "Many Yoruba communities, with substantial differences among regional and lineage institutions",
      "confidence": "General introduction; local ritual histories pending",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Egúngún is merely a theatrical costume with no sacred meaning, or alternatively the literal unexamined proof of returning dead people. CORRECTION: it is a complex living ritual and artistic institution whose religious meanings must be attributed to participants."
      ],
      "sourceIds": [
        "sac-orisa-book",
        "sac-ori",
        "sac-diaspora"
      ],
      "relatedTerms": [
        "àwọn baba ńlá"
      ],
      "articleId": "sac-egungun",
      "summary": "Egúngún refers to important Yoruba ancestral masquerade and commemoration practices, not one standard deity who appears identically in every town. The traditions address memory, family, power, public performance and sometimes relationships between living communities and ancestors."
    },
    {
      "id": "sac-gelede",
      "name": "Gẹ̀lẹ̀dẹ́ / Ìyá Nlá",
      "kind": "Ancestral tradition",
      "scope": "Yoruba-Nago communities across parts of Nigeria, Benin and Togo",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: Gẹ̀lẹ̀dẹ́ is simply a witch cult or an ordinary tourist dance. CORRECTION: it is a complex social, sacred and artistic tradition whose public descriptions centre the power of mothers and community life."
      ],
      "sourceIds": [
        "sac-gelede",
        "sac-aja",
        "sac-orisa-book"
      ],
      "relatedTerms": [
        "Ìyá Nlá",
        "egbado"
      ],
      "articleId": "sac-gelede",
      "summary": "Gẹ̀lẹ̀dẹ́ is a living Yoruba-Nago oral, musical and masked performance tradition honouring the power of mothers and community relationships. It is not one separate goddess named “Gelede”, and Ìyá Nlá should not be flattened into a generic European witch archetype."
    },
    {
      "id": "sac-ajee",
      "name": "Àjẹ́ / Ìyámi",
      "kind": "Spiritual concept",
      "scope": "Variable Yoruba-language and ritual contexts; especially traditions concerning mothers and social power",
      "confidence": "Contested concepts; terminology requires native-language editorial review",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: àjẹ́ always means an evil woman and any accused person is legitimately dangerous. CORRECTION: cultural vocabulary is more complex; allegations of witchcraft can endanger people and must never be treated as evidence of wrongdoing."
      ],
      "sourceIds": [
        "sac-aja",
        "sac-unihist",
        "sac-gelede"
      ],
      "relatedTerms": [
        "Ìyámi",
        "àjẹ́"
      ],
      "articleId": "sac-ajee",
      "summary": "Àjẹ́ is a complex Yoruba term associated in different settings with potent spiritual agency, often connected in public discourse with the powers of mothers. Translation as “witch” can be misleading and dangerous; it imports an English category that does not fully express indigenous distinctions."
    },
    {
      "id": "sac-categories",
      "name": "Òrìṣà, Irúnmọlẹ̀ and Ancestors",
      "kind": "Spiritual concept",
      "scope": "Comparative study across Yoruba communities, including Ifá and local religious institutions",
      "confidence": "Documented associations; theology varies",
      "communityNeeded": "Public oral histories from identified custodians remain to be collected",
      "misconceptions": [
        "MISCONCEPTION: every Yoruba spiritual being can be mapped one-to-one onto Greek or Roman gods, or that every sacred figure belongs to a universally agreed set of “401 deities”. CORRECTION: famous numbers and pantheon diagrams need source, context and evidence."
      ],
      "sourceIds": [
        "sac-orisa-book",
        "sac-ori",
        "sac-theologians"
      ],
      "relatedTerms": [
        "irúnmọlẹ̀",
        "òrìṣà",
        "egúngún"
      ],
      "articleId": "sac-categories",
      "summary": "“Yoruba deities” is a convenient English phrase, but it can hide the internal diversity of sacred categories. Depending on a community or narrator, òrìṣà, irúnmọlẹ̀, ancestor, divine agent, river power or protective institution may denote different relationships. A glossary should never substitute a foreign pantheon for indigenous terms."
    }
  ],
  "articles": [
    {
      "id": "sac-olodumare",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Olódùmarè: Sacred Meaning and Misconceptions",
      "deck": "Olódùmarè is widely described in Ifá and other Yoruba theological discourse as the supreme source of existence and authority. Olódùmarè is not ordinarily listed as a single specialised òrìṣà…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Olódùmarè?",
          "p": "Olódùmarè is widely described in Ifá and other Yoruba theological discourse as the supreme source of existence and authority. Olódùmarè is not ordinarily listed as a single specialised òrìṣà alongside Ògún or Ọ̀ṣun. The terms Olódùmarè, Ọlọ́run and Ẹlẹ́dàá can overlap in use, but their exact equivalence is a question for named speakers and traditions, not an assumption.",
          "sourceIds": [
            "sac-olodumare",
            "sac-theologians",
            "sac-orisa-book",
            "sac-creation"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Creation stories often describe divine initiative followed by the work of sacred agents. Some accounts make Ọbàtálá responsible for moulding bodies, while others give Odùduwà prominence in establishing the habitable world. The place of Olódùmarè is usually overarching. These narratives explain religious relationships and origins; they are neither a dated history of the physical Earth nor a laboratory account of human biology.",
          "sourceIds": [
            "sac-olodumare",
            "sac-theologians",
            "sac-orisa-book",
            "sac-creation"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Devotion to the supreme being does not always take the same public form as worship directed to particular òrìṣà shrines. Names for the divine appear in prayers, personal names, proverbs and theological discussions. The absence of a single universal temple pattern should not be interpreted as absence of belief. It is equally misleading to presume that every community has always taught an identical supreme-being theology.",
          "sourceIds": [
            "sac-olodumare",
            "sac-theologians",
            "sac-orisa-book",
            "sac-creation"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Historical and contemporary scholarship records substantial disagreement about the development of a unified Yoruba theology. Theological language is also shaped by long encounters with Christianity, Islam, Ifá and indigenous local practice. The archive must preserve town, community, narrator, date and religious context whenever someone says “the Yoruba believe”.",
          "sourceIds": [
            "sac-olodumare",
            "sac-theologians",
            "sac-orisa-book",
            "sac-creation"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Olódùmarè is merely the Christian God translated into Yoruba, or a separate “god of the sky” in an unchanging pantheon. CORRECTION: many Yoruba traditions articulate a supreme source, but scholarly debates examine how divine attributes, mediation, evil and worship are understood differently from Christian or Islamic categories. Identity across traditions cannot be assumed solely from a shared English translation.",
          "sourceIds": [
            "sac-olodumare",
            "sac-theologians",
            "sac-orisa-book",
            "sac-creation"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "Yoruba reflections on responsibility, order and the relation between humans and the sacred can be explored in philosophy and comparative religion. Such study should not claim that divine existence or interventions have been scientifically proved. It can, however, document sophisticated moral argument and indigenous conceptual vocabulary.",
          "sourceIds": [
            "sac-olodumare",
            "sac-theologians",
            "sac-orisa-book",
            "sac-creation"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Read Yoruba philosophical accounts alongside regional histories; note which statements come from Ifá literature, named practitioners or modern philosophers. The cited studies disagree on important points. This chapter is a map of attested discussion rather than a doctrinal verdict, and it needs recorded interviews with willing Yoruba-language scholars and custodians.",
          "sourceIds": [
            "sac-olodumare",
            "sac-theologians",
            "sac-orisa-book",
            "sac-creation"
          ]
        }
      ],
      "sourceIds": [
        "sac-olodumare",
        "sac-theologians",
        "sac-orisa-book",
        "sac-creation"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-esu",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Èṣù / Ẹlẹ́gbára: Sacred Meaning and Misconceptions",
      "deck": "Èṣù occupies a complex place in Yoruba religious thought: a figure of mediation, communication, consequence, ambiguity and the testing of human conduct. In Ifá-linked traditions Èṣù is frequ…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Èṣù / Ẹlẹ́gbára?",
          "p": "Èṣù occupies a complex place in Yoruba religious thought: a figure of mediation, communication, consequence, ambiguity and the testing of human conduct. In Ifá-linked traditions Èṣù is frequently discussed in relation to ritual messages and the effectiveness or consequences of human action. Calling him only a “trickster” leaves out this wider ethical and relational role.",
          "sourceIds": [
            "sac-nickel",
            "sac-ethics",
            "sac-esu-staff",
            "sac-esu-archive",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Narratives depict Èṣù as capable of exposing careless speech, conflicting perspectives and neglected obligations. The famous type of story in which observers describe an encounter differently is best read as an ethical narrative about partial knowledge, not as a verified historical incident. His unpredictability is not equivalent to a theology of an independent cosmic enemy opposed to goodness.",
          "sourceIds": [
            "sac-nickel",
            "sac-ethics",
            "sac-esu-staff",
            "sac-esu-archive",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Collections preserve carved staffs and figures associated with Èṣù, including nineteenth- and twentieth-century Yoruba objects. Material attributes vary: coiffures, beads, staffs and ritual placement are not a single mandated portrait of a spirit. Museum objects document artisanship and worship practice, not one exclusive or literal appearance of the sacred figure. Some shrine knowledge remains restricted.",
          "sourceIds": [
            "sac-nickel",
            "sac-ethics",
            "sac-esu-staff",
            "sac-esu-archive",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Names including Èṣù, Ẹlẹ́gbára and Èlẹ́gbá are related in specific contexts, while diaspora traditions such as Exu or Eleguá have their own histories. They should never be flattened into one universal identity or set of ritual instructions. We need community voices from Yoruba towns and separately attributed Brazilian and Cuban practitioners to describe continuities and divergences.",
          "sourceIds": [
            "sac-nickel",
            "sac-ethics",
            "sac-esu-staff",
            "sac-esu-archive",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Èṣù is Satan, Lucifer or the Christian devil. CORRECTION: that equation reflects a major history of missionary and Bible-translation choices and fails to describe Èṣù’s traditional role. His ethical complexity should not be sanitised into “always good”, either. A responsible account explains mediation, agency, morally challenging narratives and the history of the mistranslation, without calling an indigenous religion demonic.",
          "sourceIds": [
            "sac-nickel",
            "sac-ethics",
            "sac-esu-staff",
            "sac-esu-archive",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "Èṣù offers a serious lens for discussing translation ethics, human communication, divided perspectives and responsibility. He is not proof that Yoruba religion predicted modern telecommunications or computing. Teaching these narratives as philosophy and living religious heritage does not require reducing them to a Christian moral binary.",
          "sourceIds": [
            "sac-nickel",
            "sac-ethics",
            "sac-esu-staff",
            "sac-esu-archive",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "The Leeds study establishes that nineteenth-century translators mapped Èṣù onto a Christian category; Cambridge scholarship debates his ethical profile. Two museum records document worship objects. Further work should add named Yoruba-language exegesis of public Ifá verses, peer-reviewed translation commentary and reviews by community specialists—never an invented “original prayer” or secret rite.",
          "sourceIds": [
            "sac-nickel",
            "sac-ethics",
            "sac-esu-staff",
            "sac-esu-archive",
            "sac-orisa-book"
          ]
        }
      ],
      "sourceIds": [
        "sac-nickel",
        "sac-ethics",
        "sac-esu-staff",
        "sac-esu-archive",
        "sac-orisa-book"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-orunmila",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ọ̀rúnmìlà / Ifá: Sacred Meaning and Misconceptions",
      "deck": "Ọ̀rúnmìlà is associated with wisdom, knowledge of destiny and the interpretive corpus of Ifá. In common public usage “Ifá” may refer to a divination system, its literary body or a sacred per…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ọ̀rúnmìlà / Ifá?",
          "p": "Ọ̀rúnmìlà is associated with wisdom, knowledge of destiny and the interpretive corpus of Ifá. In common public usage “Ifá” may refer to a divination system, its literary body or a sacred personage, depending on context. Those senses overlap but should not be carelessly treated as interchangeable.",
          "sourceIds": [
            "sac-orunmila",
            "sac-orisa-book",
            "unescoifa2"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "In accounts of human destiny, consultation is meaningful because events require interpretation, counsel and morally serious choice. Ifá has a large corpus of verses, histories, proverbs and narratives. A diviner’s knowledge arises through training, memory and interpretation; UNESCO specifically distinguishes its sign system from a model based solely on spontaneous spirit mediumship.",
          "sourceIds": [
            "sac-orunmila",
            "sac-orisa-book",
            "unescoifa2"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "The 256 odù are a formal system of signs connected with extensive orally transmitted verse bodies. Specialists may employ consecrated palm nuts or a divination chain. Describing these public facts is different from publishing restricted invocations, presenting ritual prescriptions as medical advice or pretending that knowing a few signs makes an initiated specialist.",
          "sourceIds": [
            "sac-orunmila",
            "sac-orisa-book",
            "unescoifa2"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Ifá literature has many lineages and differences of recitation, training and interpretation. It is inappropriate to declare one internet list of all meanings the uniquely authentic canon. Diaspora institutions have distinct histories of transmission, translation and reform. Interviews should record lineage and permissions without demanding disclosure of restricted material.",
          "sourceIds": [
            "sac-orunmila",
            "sac-orisa-book",
            "unescoifa2"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Ifá’s 256 odù proves ancient Yoruba practitioners invented computers or modern binary electronics. CORRECTION: the system has analysable mathematical structure, but structural resemblance is not historical evidence of technical descent. Likewise, Ifá and Èṣù have interrelated roles without being the same sacred being.",
          "sourceIds": [
            "sac-orunmila",
            "sac-orisa-book",
            "unescoifa2"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "Ifá offers rich material for comparative literature, combinatorics, oral pedagogy, information organisation and ethical reasoning. These are important fields of inquiry in their own right. Digital archiving must include correct diacritics, recordings with consent, provenance and intellectual rights; it must not scrape or reveal restricted corpus elements.",
          "sourceIds": [
            "sac-orunmila",
            "sac-orisa-book",
            "unescoifa2"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "UNESCO’s official register documents the heritage system and the 256 odù, not every claim made online in its name. Community expert review and specialist scholarship are required to discuss verses and regional interpretations in depth. This article is a public overview rather than a guide to performing divination.",
          "sourceIds": [
            "sac-orunmila",
            "sac-orisa-book",
            "unescoifa2"
          ]
        }
      ],
      "sourceIds": [
        "sac-orunmila",
        "sac-orisa-book",
        "unescoifa2"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-obatala",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ọbàtálá / Òrìṣàńlá: Sacred Meaning and Misconceptions",
      "deck": "Ọbàtálá is an important figure in Yoruba creation accounts and is frequently linked with the shaping of human beings, purity, calm authority and the significance of white materials or clothi…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ọbàtálá / Òrìṣàńlá?",
          "p": "Ọbàtálá is an important figure in Yoruba creation accounts and is frequently linked with the shaping of human beings, purity, calm authority and the significance of white materials or clothing. These are religious associations, not scientific claims about anatomy or inherited physical traits.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "metwhite"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Some accounts relate that Ọbàtálá moulds human forms while the supreme source grants life; other versions assign different responsibilities to Odùduwà. Narrative tensions are part of the history of religious interpretation. Editors should never choose a single version and label other communities liars simply because it is familiar in a school textbook.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "metwhite"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "White cloth, beads and other substances can communicate ritual and ethical ideals in contexts linked with Ọbàtálá. Art historians examine these meanings through particular objects. General colour symbolism is not permission to prescribe rituals or infer the personal faith of someone wearing white clothing.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "metwhite"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Shrines and narratives differ across towns and diaspora settings. In some communities, Ọbàtálá’s relation to physical difference and disability has ethical importance; a respectful account must centre the dignity and full humanity of disabled people, not repeat stigmatizing folklore without context or endorsement.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "metwhite"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: the creation narratives are a dated, scientifically demonstrated record of the first human or that Ọbàtálá and Odùduwà have identical roles everywhere. CORRECTION: they are meaningful religious narratives with significant variations, and historical archaeology provides different kinds of evidence.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "metwhite"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "The ethical themes of patience, dignity, embodied difference and the responsibilities of creators can inform cultural study and inclusive education. Presenting these as lessons is valuable; declaring a divine mechanism proven is not.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "metwhite"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "The Met’s historical essay documents multiple Ifẹ̀-associated versions. A full chapter needs Yoruba-language narration, dated interviews and a community review panel to avoid oversimplifying Ọbàtálá’s worship and stories.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "metwhite"
          ]
        }
      ],
      "sourceIds": [
        "sac-creation",
        "sac-orisa-book",
        "metwhite"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-oduduwa",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Odùduwà: Sacred Meaning and Misconceptions",
      "deck": "Odùduwà is central to a range of Yoruba origin traditions, especially those connecting Ilé-Ifẹ̀, sacred kingship and the historical imagination of descent. The figure’s standing as a deity, …",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Odùduwà?",
          "p": "Odùduwà is central to a range of Yoruba origin traditions, especially those connecting Ilé-Ifẹ̀, sacred kingship and the historical imagination of descent. The figure’s standing as a deity, primordial agent, founder or ancestral king differs by account; the website will not impose one classification on every lineage.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "ogundiran2020"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Creation traditions may give Odùduwà responsibility for spreading land over primordial waters, while rival or complementary narratives foreground Ọbàtálá. Royal genealogies also invoke Odùduwà to discuss legitimacy and political identity. A statement about descent must always identify the court, narrator and source, particularly when two towns preserve differing memories.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "ogundiran2020"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Art, commemorative practice, royal speech and local festivals provide evidence of the figure’s enduring importance. Neither a depiction nor a palace tradition independently dates an individual founder in the way a securely dated excavation can date an object or settlement.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "ogundiran2020"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Different communities tell different stories of Odùduwà’s arrival, identity and relationship to other founders. Such accounts are primary evidence for community memory even if they do not establish a single literal route of migration or one birth date.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "ogundiran2020"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: archaeologists have conclusively dated Odùduwà’s life or every Yoruba state has one verified bloodline back to a single historical individual. CORRECTION: royal traditions and historical scholarship address different questions; individual biographical details remain disputed or undated.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "ogundiran2020"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "This material is essential to studying political legitimacy, heritage landscapes, genealogical claims and what collective ancestry means. It does not establish genetic uniformity or erase the independent histories of regional Yoruba peoples.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "ogundiran2020"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Use source-attributed local records alongside archaeological studies and independently documented historical contexts. No assertion here is borrowed from Samuel Johnson’s books; the work requires independent oral-history provenance.",
          "sourceIds": [
            "sac-creation",
            "sac-orisa-book",
            "ogundiran2020"
          ]
        }
      ],
      "sourceIds": [
        "sac-creation",
        "sac-orisa-book",
        "ogundiran2020"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-ogun",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ògún: Sacred Meaning and Misconceptions",
      "deck": "Ògún is strongly associated with iron, blacksmithing, implements, clearing pathways, technical labour and the dangers and obligations surrounding sharp tools. The link extends beyond warfare…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ògún?",
          "p": "Ògún is strongly associated with iron, blacksmithing, implements, clearing pathways, technical labour and the dangers and obligations surrounding sharp tools. The link extends beyond warfare: farm tools, craft skill and the social world of those who work metal matter to understanding the tradition.",
          "sourceIds": [
            "sac-ogun",
            "metiron",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Ògún-related stories can explore the double character of technology: tools sustain agriculture, travel and livelihood, but can also injure and destroy. Ethical readings of skill, discipline, responsibility and consequence belong alongside narratives of fierce power. It is simplistic to translate every such account as “god of war” and end there.",
          "sourceIds": [
            "sac-ogun",
            "metiron",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Iron objects, smithing tools, ritual swords and archaeological evidence speak to technical and symbolic worlds. The Metropolitan Museum links iron production to West African societies and Ògún’s importance. Religious identification and engineering measurements must be kept separate: an object proves material culture, not supernatural causation.",
          "sourceIds": [
            "sac-ogun",
            "metiron",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Regional trade networks, smithing lineages and local cult histories can differ. Where practitioners associate Ògún with travel or contemporary machines, that is a living extension of an iron-and-tools theme, not proof of ancient inventorship of engines, cars or aircraft.",
          "sourceIds": [
            "sac-ogun",
            "metiron",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Ògún is only a destructive war god or the inventor of all modern industry. CORRECTION: his associations include productive labour, metalwork, tools and serious ethical duties. These meanings are real as cultural history without establishing an impossible direct patent lineage.",
          "sourceIds": [
            "sac-ogun",
            "metiron",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "An educational module can examine forging, metal fatigue, tool safety and the social position of craftspeople while clearly distinguishing religion from metallurgy. Collaborations with blacksmiths can document indigenous technical knowledge with permission and proper credit.",
          "sourceIds": [
            "sac-ogun",
            "metiron",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Museum sources support iron associations; they do not speak for every town or ceremonial lineage. Further interviews should distinguish public craftsmanship from restricted ritual procedure.",
          "sourceIds": [
            "sac-ogun",
            "metiron",
            "sac-orisa-book"
          ]
        }
      ],
      "sourceIds": [
        "sac-ogun",
        "metiron",
        "sac-orisa-book"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-sango",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ṣàngó: Sacred Meaning and Misconceptions",
      "deck": "Ṣàngó is associated with thunder and lightning, power, kingship, charisma and public ritual performance. In Ọ̀yọ́-centred traditions he also has a historical-royal dimension. No single sente…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ṣàngó?",
          "p": "Ṣàngó is associated with thunder and lightning, power, kingship, charisma and public ritual performance. In Ọ̀yọ́-centred traditions he also has a historical-royal dimension. No single sentence such as “Ṣàngó is electricity” adequately explains the figure.",
          "sourceIds": [
            "sac-sango",
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Traditions about Ṣàngó’s power and kingship belong to specific oral narratives. Their versions may differ in matters of genealogy, conduct and political context. The figure’s relationship with thunder does not make a weather event a recorded physical intervention in the scientific sense.",
          "sourceIds": [
            "sac-sango",
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "The double-headed axe motif is familiar in Ṣàngó shrine staffs and performance. The Met describes a staff carried in festivals by devotees, showing that visual objects, songs and movement help create religious meaning. Objects should be dated and attributed to their makers and communities, never presented as the universal appearance of Ṣàngó.",
          "sourceIds": [
            "sac-sango",
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "In Nigeria, Cuba, Brazil and other communities, Ṣàngó traditions have distinctive names, institutions and performance histories. Diaspora transformations should be documented as living religious developments, not judged automatically to be defective copies of a supposed timeless original.",
          "sourceIds": [
            "sac-sango",
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Ṣàngó was literally a thunderstorm, or has one historically proven biography, or is interchangeable with Greek Zeus. CORRECTION: religious, royal and atmospheric meanings coexist, while the comparisons with foreign mythologies are interpretive analogies rather than identities.",
          "sourceIds": [
            "sac-sango",
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "Explore music, performance, political authority and how societies interpret dangerous weather while keeping meteorological explanation separate from belief. The significance of Ṣàngó’s symbol in design does not prove ancient discovery of electrical engineering.",
          "sourceIds": [
            "sac-sango",
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Museum art and comparative religious research support specific public associations; community-grounded histories must be sourced before details about particular courts or rites are asserted.",
          "sourceIds": [
            "sac-sango",
            "sac-orisa-book",
            "sac-diaspora"
          ]
        }
      ],
      "sourceIds": [
        "sac-sango",
        "sac-orisa-book",
        "sac-diaspora"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-osun",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ọ̀ṣun: Sacred Meaning and Misconceptions",
      "deck": "Ọ̀ṣun is closely associated with the Ọ̀ṣun River and devotional landscapes including Òṣogbo. Many traditions connect her with fertility, care, prosperity, relational power, aesthetics and co…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ọ̀ṣun?",
          "p": "Ọ̀ṣun is closely associated with the Ọ̀ṣun River and devotional landscapes including Òṣogbo. Many traditions connect her with fertility, care, prosperity, relational power, aesthetics and community guardianship. She is not reducible to the modern internet label “goddess of love”.",
          "sourceIds": [
            "sac-osun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Publicly discussed stories sometimes emphasise that collective work fails when female spiritual authority is ignored, raising questions about reciprocity, respect and the limits of exclusion. Individual narrations need specific attribution. Sacred stories should not be rewritten as biological proof that river water cures infertility.",
          "sourceIds": [
            "sac-osun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "The UNESCO-recognised Ọ̀ṣun-Òṣogbo Sacred Grove is a cultural landscape of shrines, sculpture, natural environment and active religious heritage. It documents the interaction between people, belief and landscape. The grove is not merely a decorative tourist park; visitors must respect local custodians and conservation rules.",
          "sourceIds": [
            "sac-osun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Other towns maintain their own Ọ̀ṣun histories. In Caribbean and Brazilian traditions, ritual names and symbolism can develop distinctive meanings. We must preserve geographic specificity rather than merging all water-associated women into an undifferentiated “water goddess”.",
          "sourceIds": [
            "sac-osun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Ọ̀ṣun is simply “Yoruba Aphrodite”, only concerned with romance, or that ritual water is a clinically established cure. CORRECTION: her associations are much broader, and claims about physical treatment require separate scientific evaluation.",
          "sourceIds": [
            "sac-osun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "Community-controlled heritage preservation, water quality, ecological protection and women’s public authority are fruitful contemporary questions. Sacred environmental significance can motivate conservation without replacing hydrology or medicine.",
          "sourceIds": [
            "sac-osun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "UNESCO documents the grove and its historical-cultural setting; it does not establish supernatural efficacy. Further chapters should include authorised voices from Òṣogbo and neighbouring communities and avoid leaking ritual knowledge.",
          "sourceIds": [
            "sac-osun",
            "sac-water",
            "sac-orisa-book"
          ]
        }
      ],
      "sourceIds": [
        "sac-osun",
        "sac-water",
        "sac-orisa-book"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-yemoja",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Yemọja / Yemonja: Sacred Meaning and Misconceptions",
      "deck": "Yemọja is a powerful maternal and water-associated sacred figure. A critical distinction matters: Nigerian Yoruba accounts connect her strongly with rivers, including the Ògùn River; in impo…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Yemọja / Yemonja?",
          "p": "Yemọja is a powerful maternal and water-associated sacred figure. A critical distinction matters: Nigerian Yoruba accounts connect her strongly with rivers, including the Ògùn River; in important diaspora traditions she is commonly associated with the ocean. Both have histories and neither should silently replace the other.",
          "sourceIds": [
            "sac-yemoja",
            "sac-orisa-book",
            "sac-diaspora",
            "sac-water"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Stories and songs may connect Yemọja with motherhood, nourishment, water, kinship and the responsibilities of care. Narratives of her relationships to other spiritual beings vary; repeating a single online genealogy as universal doctrine would misrepresent living communities.",
          "sourceIds": [
            "sac-yemoja",
            "sac-orisa-book",
            "sac-diaspora",
            "sac-water"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Scholarly work by a Nigerian researcher explicitly identifies Yemọja as a river goddess in Yoruba settings. Devotional arts and annual observances need to be discussed through named communities. Images from Brazil or Cuba are meaningful diaspora evidence but cannot substitute for an interview with a Nigerian river-community custodian.",
          "sourceIds": [
            "sac-yemoja",
            "sac-orisa-book",
            "sac-diaspora",
            "sac-water"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Water-associated religion varies across river and coastal towns. Diachronic change, migration and the Atlantic slave trade shaped religious forms. This is why we should label imagery and narratives by region and period, not simply “the original Yemọja”.",
          "sourceIds": [
            "sac-yemoja",
            "sac-orisa-book",
            "sac-diaspora",
            "sac-water"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Yemọja has always and everywhere been solely an ocean goddess, or that she and Olókun are identical. CORRECTION: documented Nigerian river settings and diaspora ocean settings differ, and Olókun has separate though sometimes connected regional histories.",
          "sourceIds": [
            "sac-yemoja",
            "sac-orisa-book",
            "sac-diaspora",
            "sac-water"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "A current chapter can explore waterways, care ethics, art and diaspora memory. It should never present river immersion as a substitute for safe swimming practices or treatment of illness.",
          "sourceIds": [
            "sac-yemoja",
            "sac-orisa-book",
            "sac-diaspora",
            "sac-water"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "The Nigerian peer-reviewed study and a comparative chapter help establish why origin and diaspora need separate subsections. We still need primary recorded testimony and permissioned documentation of public local practice.",
          "sourceIds": [
            "sac-yemoja",
            "sac-orisa-book",
            "sac-diaspora",
            "sac-water"
          ]
        }
      ],
      "sourceIds": [
        "sac-yemoja",
        "sac-orisa-book",
        "sac-diaspora",
        "sac-water"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-oya",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ọya: Sacred Meaning and Misconceptions",
      "deck": "Ọya is associated in important Yoruba traditions with the Niger River and powerful winds, storms, change and transformative force. Some narratives place her in relation to Ṣàngó. These are a…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ọya?",
          "p": "Ọya is associated in important Yoruba traditions with the Niger River and powerful winds, storms, change and transformative force. Some narratives place her in relation to Ṣàngó. These are attributed religious traditions, not universal meteorological explanations or a single fixed biography.",
          "sourceIds": [
            "sac-oyaoba",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Regional oral accounts connect Ọya with movement, force and transition; the way she is portrayed differs across communities and retellings. Descriptions of her as fiercely active need not erase the complex ceremonial, familial and geographic associations maintained by practitioners.",
          "sourceIds": [
            "sac-oyaoba",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Scholarly treatments study Ọya with Ọ̀ṣun and Ọbà as river-related figures. Ritual objects, festivals and musical performances should be described with exact provenance, and outsiders should not claim authority to publish secret ceremonial details.",
          "sourceIds": [
            "sac-oyaoba",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Some diasporic representations foreground cemeteries or particular colours and weapons. It would be misleading to project every such marker backwards onto all nineteenth-century Nigerian Yoruba communities without independent evidence.",
          "sourceIds": [
            "sac-oyaoba",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Ọya is only a cartoon “storm goddess”, equivalent to the weather itself, or that one colour scheme and one myth apply globally. CORRECTION: the Niger association, community-specific narratives and diaspora developments require separate documentation.",
          "sourceIds": [
            "sac-oyaoba",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "The chapters can support study of rivers, place names, landscape and environmental memory while distinguishing sacred attributions from measured storm science.",
          "sourceIds": [
            "sac-oyaoba",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Academic chapter and recent water-religion research support broad associations; the detailed history of particular community shrines requires additional primary evidence.",
          "sourceIds": [
            "sac-oyaoba",
            "sac-water",
            "sac-orisa-book"
          ]
        }
      ],
      "sourceIds": [
        "sac-oyaoba",
        "sac-water",
        "sac-orisa-book"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-olokun",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Olókun: Sacred Meaning and Misconceptions",
      "deck": "Olókun is associated with deep water, wealth, prosperity and the symbolism of maritime connections. Olókun belongs to traditions in Yoruba- and Edo-speaking settings and beyond; these commun…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Olókun?",
          "p": "Olókun is associated with deep water, wealth, prosperity and the symbolism of maritime connections. Olókun belongs to traditions in Yoruba- and Edo-speaking settings and beyond; these communities should not be treated as having one identical god, gender, shrine or origin history.",
          "sourceIds": [
            "sac-olokun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Stories about hidden depth, wealth or the sea express religious and moral relationships with uncertain, potentially prosperous water environments. They are not records of an underwater historical kingdom that archaeologists have proved existed.",
          "sourceIds": [
            "sac-olokun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "The Met describes an Òwò royal ivory vessel linking sacred water symbolism, fertility and kingship. Such objects help us understand patronage, regional art and political meaning. The object’s name or imagery should not be taken as proof that the physical head represented in every Yoruba artwork is Olókun.",
          "sourceIds": [
            "sac-olokun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Accounts disagree about gender, status and the relation between Olókun and Yemọja. Neighboring Edo, Yoruba and Fon traditions must be distinguished even where they share names or maritime themes.",
          "sourceIds": [
            "sac-olokun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Olókun is exactly the same everywhere, always male or always female, or that all underwater wealth stories are demonstrable events. CORRECTION: these are living regional religious traditions with real differences and symbolic meanings.",
          "sourceIds": [
            "sac-olokun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "Olókun’s material culture is relevant to trade history, beads, royal prestige and ways coastal communities conceptualised water and risk. It does not predict modern oceanographic findings.",
          "sourceIds": [
            "sac-olokun",
            "sac-water",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "An Òwò object supports one documented association, not universal doctrine. Future work should invite coastal Yoruba and Edo specialists to review comparative accounts and avoid claiming exclusive ownership of a shared name.",
          "sourceIds": [
            "sac-olokun",
            "sac-water",
            "sac-orisa-book"
          ]
        }
      ],
      "sourceIds": [
        "sac-olokun",
        "sac-water",
        "sac-orisa-book"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-osanyin",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Òsányìn: Sacred Meaning and Misconceptions",
      "deck": "Òsányìn is associated with leaves, forests and sacred plant knowledge. The public historical record connects this figure with forms of ritual expertise and therapeutic practice. It is essent…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Òsányìn?",
          "p": "Òsányìn is associated with leaves, forests and sacred plant knowledge. The public historical record connects this figure with forms of ritual expertise and therapeutic practice. It is essential to keep spiritual significance, botanical knowledge and medical effectiveness as three different claims.",
          "sourceIds": [
            "sac-osanyin",
            "plants",
            "whomed",
            "whointeract"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Oral accounts relate Òsányìn to the power and knowledge contained in leaves. The details of these stories and how plant use is transmitted depend on lineages, specialists and local ethics. A formula published without consent may violate a keeper’s rights or create a health risk.",
          "sourceIds": [
            "sac-osanyin",
            "plants",
            "whomed",
            "whointeract"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "The Met’s Òsányìn puppet connects sacred symbolism and the material arts of healing performance. Its presence proves that historical communities invested artistic knowledge in this tradition; it does not prove that any named herbal preparation treats an illness.",
          "sourceIds": [
            "sac-osanyin",
            "plants",
            "whomed",
            "whointeract"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Herbal practices differ widely and plants may be known under multiple vernacular names. Botanical identification, toxicology, dosage and clinical research remain necessary, even when a use is deeply respected within a community.",
          "sourceIds": [
            "sac-osanyin",
            "plants",
            "whomed",
            "whointeract"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Òsányìn is simply a “medicine god” whose plants are therefore scientifically proven harmless. CORRECTION: cultural expertise deserves research and credit, while therapeutic safety and effectiveness need independent testing.",
          "sourceIds": [
            "sac-osanyin",
            "plants",
            "whomed",
            "whointeract"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "Preserving interviews with medicinal-plant specialists can inform ethnobotany, conservation and intellectual-property debates. The site will not publish untested prescriptions, dangerous dosing or medical substitution advice.",
          "sourceIds": [
            "sac-osanyin",
            "plants",
            "whomed",
            "whointeract"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Art objects and academic ethnobotany can provide starting points. The archive must request explicit consent for formulas and comply with benefit-sharing norms; use medical review for any treatment claim.",
          "sourceIds": [
            "sac-osanyin",
            "plants",
            "whomed",
            "whointeract"
          ]
        }
      ],
      "sourceIds": [
        "sac-osanyin",
        "plants",
        "whomed",
        "whointeract"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-sopona",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ṣọ̀pọ̀ná / Ọbalúayé: Sacred Meaning and Misconceptions",
      "deck": "Ṣọ̀pọ̀ná is a sacred figure historically associated with smallpox, disease, social fear and healing. Names such as Ọbalúayé appear in connected but regionally varying traditions. This histor…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ṣọ̀pọ̀ná / Ọbalúayé?",
          "p": "Ṣọ̀pọ̀ná is a sacred figure historically associated with smallpox, disease, social fear and healing. Names such as Ọbalúayé appear in connected but regionally varying traditions. This history cannot be reduced to “Africans believed gods caused viruses,” nor can traditional ritual replace vaccination or outbreak control.",
          "sourceIds": [
            "sac-sopona",
            "sac-sopona-cdc",
            "sac-ori"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Religious explanations of disease belonged to a world of social obligation and uncertainty. Some public traditions speak of affliction and appeasement. Colonial medical officers interpreted these traditions through their own political interests, and historians have challenged accounts that portray local people as passive or irrational.",
          "sourceIds": [
            "sac-sopona",
            "sac-sopona-cdc",
            "sac-ori"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Historical public-health museums and academic work document social conflicts over vaccination and regulation. These sources reflect specific perspectives and decades; they do not give authority to revive hazardous practices or to expose restricted shrines.",
          "sourceIds": [
            "sac-sopona",
            "sac-sopona-cdc",
            "sac-ori"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Names and ceremonial histories differ within Nigeria and across West Africa and the diaspora. Never assume that every Ọbalúayé interpretation is simply interchangeable with every Ṣọ̀pọ̀ná account, or assign a single chronological “origin” without evidence.",
          "sourceIds": [
            "sac-sopona",
            "sac-sopona-cdc",
            "sac-ori"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: smallpox was literally caused by a deity, or a shrine can cure it instead of medical prevention; equally false is the blanket claim that traditional communities possessed no medical knowledge. CORRECTION: separate historical belief, documented social health practices and modern virology. Smallpox is caused by variola virus; it was eradicated through public-health work including vaccination.",
          "sourceIds": [
            "sac-sopona",
            "sac-sopona-cdc",
            "sac-ori"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "This chapter is valuable for teaching how medicine, colonial governance, community power and risk communication interact. It must not offer diagnosis or medical advice and should link readers to qualified public-health guidance.",
          "sourceIds": [
            "sac-sopona",
            "sac-sopona-cdc",
            "sac-ori"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Sources include independent academic medical history and a public-health museum, both read critically. Further oral histories must come from consenting families or practitioners and must not include actionable dangerous material.",
          "sourceIds": [
            "sac-sopona",
            "sac-sopona-cdc",
            "sac-ori"
          ]
        }
      ],
      "sourceIds": [
        "sac-sopona",
        "sac-sopona-cdc",
        "sac-ori"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-orisa-oko",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ọ̀rìṣà Oko: Sacred Meaning and Misconceptions",
      "deck": "Ọ̀rìṣà Oko is connected to agriculture, farmland, tools and fertility of the land in named Yoruba communities. Farming tools and forged iron staffs are central to his documented ritual mater…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ọ̀rìṣà Oko?",
          "p": "Ọ̀rìṣà Oko is connected to agriculture, farmland, tools and fertility of the land in named Yoruba communities. Farming tools and forged iron staffs are central to his documented ritual material culture. This is a valuable regional profile, not a claim that the same rite was universal.",
          "sourceIds": [
            "sac-oko",
            "metoko",
            "sac-ogun"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Public traditions place the responsibilities and risks of cultivation within sacred social relationships. Farming is not merely food production: it concerns land rights, seasonality, cooperation and survival.",
          "sourceIds": [
            "sac-oko",
            "metoko",
            "sac-ogun"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Smithsonian and Met sources describe staffs created from iron farm implements; some were commissioned by people founding shrines. The objects provide evidence for craft, patronage and specific institutions, not a biological explanation for soil fertility.",
          "sourceIds": [
            "sac-oko",
            "metoko",
            "sac-ogun"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Variations in local ceremonial roles, materials and the involvement of farmers or priests must be documented rather than inferred from one collection object.",
          "sourceIds": [
            "sac-oko",
            "metoko",
            "sac-ogun"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Ọ̀rìṣà Oko is simply identical to Ògún because both use iron or “invented agriculture”. CORRECTION: their sacred associations overlap at materials but remain distinct, and agriculture emerged through many historical processes.",
          "sourceIds": [
            "sac-oko",
            "metoko",
            "sac-ogun"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "The modern bridge is the study of traditional cultivation, environmental observation and specialist blacksmith skill, not an unverified ancestry claim about modern tractors.",
          "sourceIds": [
            "sac-oko",
            "metoko",
            "sac-ogun"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Museum records provide unusually concrete geographic leads. Next steps require an identified community and source permissions; no ritual recipe is included.",
          "sourceIds": [
            "sac-oko",
            "metoko",
            "sac-ogun"
          ]
        }
      ],
      "sourceIds": [
        "sac-oko",
        "metoko",
        "sac-ogun"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-erinle",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Èrìnlẹ̀: Sacred Meaning and Misconceptions",
      "deck": "Èrìnlẹ̀ is a locally important òrìṣà associated with particular Yoruba shrine communities, including Ìlọbú. Public descriptions connect the figure with waters and aspects of hunting or heali…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Èrìnlẹ̀?",
          "p": "Èrìnlẹ̀ is a locally important òrìṣà associated with particular Yoruba shrine communities, including Ìlọbú. Public descriptions connect the figure with waters and aspects of hunting or healing, but these descriptions must not erase locally specific identities and narratives.",
          "sourceIds": [
            "sac-erinle",
            "meterinle",
            "sac-ori"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "A shrine’s traditions are held in songs, festivals, accounts of founding and relationships among families and specialists. They deserve first-person documentation from named custodians rather than broad internet claims.",
          "sourceIds": [
            "sac-erinle",
            "meterinle",
            "sac-ori"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "The Met has an equestrian figure originally commissioned for an Èrìnlẹ̀ shrine in Ìlọbú. The museum information allows a precise place and art-historical discussion, but an individual sculpture cannot tell us the entire theology of the shrine.",
          "sourceIds": [
            "sac-erinle",
            "meterinle",
            "sac-ori"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "The same name may be used in different towns or associated with different emphases. The archive will record town-specific accounts separately, not concatenate them into a fictional global biography.",
          "sourceIds": [
            "sac-erinle",
            "meterinle",
            "sac-ori"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Èrìnlẹ̀ is obscure or unimportant because global internet lists rarely mention the name. CORRECTION: importance is local and historical; a securely documented Ìlọbú shrine deserves central attention.",
          "sourceIds": [
            "sac-erinle",
            "meterinle",
            "sac-ori"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "This profile supports cultural mapping, art history, heritage rights and oral-history collection. It is not a licence to publicise protected places or rituals without permission.",
          "sourceIds": [
            "sac-erinle",
            "meterinle",
            "sac-ori"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Only the public shrine-object association is presently well documented in our research set. A fuller narrative remains explicitly pending conversations with community custodians.",
          "sourceIds": [
            "sac-erinle",
            "meterinle",
            "sac-ori"
          ]
        }
      ],
      "sourceIds": [
        "sac-erinle",
        "meterinle",
        "sac-ori"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-oba-river",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ọbà: Sacred Meaning and Misconceptions",
      "deck": "Ọbà is a river-associated sacred figure whose traditions are especially meaningful in particular Yoruba communities. Some narratives describe relationships involving Ṣàngó and Ọ̀ṣun. The pop…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ọbà?",
          "p": "Ọbà is a river-associated sacred figure whose traditions are especially meaningful in particular Yoruba communities. Some narratives describe relationships involving Ṣàngó and Ọ̀ṣun. The popular single-story treatment of her as a jealous wife is reductive and can reinforce unfair stereotypes about women.",
          "sourceIds": [
            "sac-water",
            "sac-oyaoba"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Competing narratives about marriages, rivalry, suffering or transformation deserve contextual reading: storytellers use relationships to explore power, loyalty, uncertainty and change. No tale should be presented as a universally dated historical incident.",
          "sourceIds": [
            "sac-water",
            "sac-oyaoba"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Academic research on Yoruba water belief identifies Ọbà among rivers associated with female sacred figures. A comparative chapter examines Ọbà, Ọya and Ọ̀ṣun across Atlantic settings. Its publicly accessible abstract does not license claims about unexamined pages.",
          "sourceIds": [
            "sac-water",
            "sac-oyaoba"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Specific motifs vary between Yoruba towns, Cuba and Brazil. Naming the place and narrator is essential when presenting a version of a tale involving Ọbà and Ṣàngó.",
          "sourceIds": [
            "sac-water",
            "sac-oyaoba"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Ọbà is only a foolish or inferior wife in a moral fable. CORRECTION: this is one reductive modern presentation of narrative material; the figure also has river, community and devotional significance.",
          "sourceIds": [
            "sac-water",
            "sac-oyaoba"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "This is an entry point for gender-sensitive folklore study, river heritage and the ethics of storytelling. It should not read relationship stories as literal explanations of geology.",
          "sourceIds": [
            "sac-water",
            "sac-oyaoba"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Regional primary oral evidence is still required, and the article deliberately does not retell disputed episodes in unverified detail.",
          "sourceIds": [
            "sac-water",
            "sac-oyaoba"
          ]
        }
      ],
      "sourceIds": [
        "sac-water",
        "sac-oyaoba"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-ibeji",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ìbejì: Sacred Meaning and Misconceptions",
      "deck": "Ìbejì means twins and describes a significant complex of religious and familial meanings. In a number of Yoruba communities, twins have special social and spiritual importance; carved twin f…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ìbejì?",
          "p": "Ìbejì means twins and describes a significant complex of religious and familial meanings. In a number of Yoruba communities, twins have special social and spiritual importance; carved twin figures were sometimes made to honour deceased children. This category is not equivalent to one universal god with a single personality.",
          "sourceIds": [
            "sac-ibeji",
            "mettwins",
            "sac-ori"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Names, praise, commemorations and relationships around twins are deeply social. They may honour life, loss, responsibility and familial continuity. The archive should not romanticise grief, claim all twins are supernaturally identical or imply that contemporary families must follow one rite.",
          "sourceIds": [
            "sac-ibeji",
            "mettwins",
            "sac-ori"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Museum collections preserve many carved ìbejì figures, and regional styles can reveal workshop practice and changing aesthetics. An object must be documented as a specific family or collector’s history where available, not interpreted as “the portrait of the twins” in all contexts.",
          "sourceIds": [
            "sac-ibeji",
            "mettwins",
            "sac-ori"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "The meaning of twin commemoration varies across regions, religious affiliations and generations. Recording a family’s story requires explicit consent, particularly where photographs of children or deceased relatives are involved.",
          "sourceIds": [
            "sac-ibeji",
            "mettwins",
            "sac-ori"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: ìbejì is merely a doll, or every Yoruba family must worship twin figures, or twins are dangerous. CORRECTION: figures may have profound memorial meaning in particular contexts, but practices are diverse and no family should be stereotyped.",
          "sourceIds": [
            "sac-ibeji",
            "mettwins",
            "sac-ori"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "Modern museum ethics, family archives and arts education can explore how communities commemorate children without making medical or supernatural claims.",
          "sourceIds": [
            "sac-ibeji",
            "mettwins",
            "sac-ori"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Museum evidence supports documented carving traditions; private family traditions must come from willing contributors, with the right to withhold material.",
          "sourceIds": [
            "sac-ibeji",
            "mettwins",
            "sac-ori"
          ]
        }
      ],
      "sourceIds": [
        "sac-ibeji",
        "mettwins",
        "sac-ori"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-oshosi",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ọ̀ṣọ́ọ̀sì: Sacred Meaning and Misconceptions",
      "deck": "Ọ̀ṣọ́ọ̀sì is often associated in regional and diaspora narratives with hunting, tracking and forest skill. The precise spelling, status and extent of individual traditions should be document…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ọ̀ṣọ́ọ̀sì?",
          "p": "Ọ̀ṣọ́ọ̀sì is often associated in regional and diaspora narratives with hunting, tracking and forest skill. The precise spelling, status and extent of individual traditions should be documented with named Yoruba and diaspora voices instead of assuming a single global hunter deity biography.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Where public narratives connect sacred hunting with skill, foresight or protection, they can be studied in relation to community life. A story about hunting is not evidence that a contemporary wildlife practice is automatically sustainable or safe.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Our current documentary evidence for this profile is thinner than for Ògún or Ṣàngó. Until we secure direct interviews or authoritative object records, the site must explicitly mark emblem, festival and precise shrine claims as under review rather than invent them.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Diaspora representations including Oxóssi may not correspond to each historic Yoruba village practice. Comparative work should be named and dated; online repetition alone is not independent confirmation.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: one modern social-media description settles all of Ọ̀ṣọ́ọ̀sì’s origin, colour, relationships and rites. CORRECTION: record the difference between a community tradition, a diaspora development and an unsourced online assertion.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "The modern connection is research into hunting professions, ecology, indigenous environmental knowledge and cultural rights, without confusing religious meaning with proof of a biological or conservation claim.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-diaspora"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "This is a provisional public research entry requiring at least one recorded community or peer-reviewed primary analysis before expansion into a fully certified narrative. The profile does not publish speculative ritual detail.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-diaspora"
          ]
        }
      ],
      "sourceIds": [
        "sac-orisa-book",
        "sac-diaspora"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-osumare",
      "category": "Òrìṣà & Sacred Beings",
      "title": "Ọ̀ṣùmàrè: Sacred Meaning and Misconceptions",
      "deck": "Ọ̀ṣùmàrè is associated with rainbow imagery and, in some traditional and diaspora settings, serpentine symbolism. The name and related images should be studied in their particular cultural s…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Ọ̀ṣùmàrè?",
          "p": "Ọ̀ṣùmàrè is associated with rainbow imagery and, in some traditional and diaspora settings, serpentine symbolism. The name and related images should be studied in their particular cultural setting, rather than treated as proof of one pan-African “rainbow god” shared without distinction by every community.",
          "sourceIds": [
            "sac-rainbow",
            "sac-diaspora",
            "sac-ori"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Rainbow imagery can carry sacred meanings of continuity, transition and the relation between realms. The exact narratives are not settled by a brief English museum caption or an early colonial dictionary.",
          "sourceIds": [
            "sac-rainbow",
            "sac-diaspora",
            "sac-ori"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "The Smithsonian’s fieldwork finding aid records an Ọ̀ṣùmàrè-associated image in the Drewal collection. It is a traceable archival lead rather than a full published theology. We will not copy restricted images or create ritual instructions from a catalogue line.",
          "sourceIds": [
            "sac-rainbow",
            "sac-diaspora",
            "sac-ori"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Names and figures resemble, but are not automatically identical to, rainbow-serpent traditions in neighbouring West African religious worlds or in Brazilian Candomblé. Geographic, historical and linguistic attribution is vital.",
          "sourceIds": [
            "sac-rainbow",
            "sac-diaspora",
            "sac-ori"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: all rainbow serpent traditions across West Africa and Brazil are the same being, or that a rainbow confirms a divine physical event. CORRECTION: similarities invite comparative research; they are not proof of identity or supernatural causation.",
          "sourceIds": [
            "sac-rainbow",
            "sac-diaspora",
            "sac-ori"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "A careful comparison can explore art, rainfall, optics and symbolic ecology, while explaining the physical formation of rainbows independently of faith.",
          "sourceIds": [
            "sac-rainbow",
            "sac-diaspora",
            "sac-ori"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "The archive identifies this as a limited evidence entry pending accessible community narratives and specialist research. It avoids claiming an invented universal biography.",
          "sourceIds": [
            "sac-rainbow",
            "sac-diaspora",
            "sac-ori"
          ]
        }
      ],
      "sourceIds": [
        "sac-rainbow",
        "sac-diaspora",
        "sac-ori"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-ori",
      "category": "Mysticism & Worldview",
      "title": "Orí / Orí inú: Sacred Meaning and Misconceptions",
      "deck": "Orí literally means head, and Yoruba philosophical and religious discussions also use it for an inner or personal dimension associated with destiny, character and the person. Orí is not simp…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Orí / Orí inú?",
          "p": "Orí literally means head, and Yoruba philosophical and religious discussions also use it for an inner or personal dimension associated with destiny, character and the person. Orí is not simply interchangeable with a head-shaped deity or a Western horoscope.",
          "sourceIds": [
            "sac-ori",
            "sac-orisa-book",
            "sac-orunmila"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Public narratives and proverbs link orí to human possibility, choice, responsibility and life direction. Some thinkers emphasise destiny, while others emphasise human agency; the degree of predetermination is contested.",
          "sourceIds": [
            "sac-ori",
            "sac-orisa-book",
            "sac-orunmila"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Objects, gestures, prayers, arts and language practices may express the significance of the head. Any description of specialised ritual practice must come from a permitted community source rather than generic internet instructions.",
          "sourceIds": [
            "sac-ori",
            "sac-orisa-book",
            "sac-orunmila"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Diaspora and modern philosophical treatments can differ in whether they emphasise inner divinity, personal responsibility or destiny. The site will show those differences as interpretations rather than demand a single definitive metaphysics.",
          "sourceIds": [
            "sac-ori",
            "sac-orisa-book",
            "sac-orunmila"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Orí is just “fate”, eliminating choice, or is literally the same as one of the named òrìṣà everywhere. CORRECTION: the concept has a substantial philosophical discussion about personhood and agency, and is not reducible to one English word.",
          "sourceIds": [
            "sac-ori",
            "sac-orisa-book",
            "sac-orunmila"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "Orí invites comparative study of ethics, human development and concepts of the self. It does not scientifically predict a person’s future or justify discriminatory treatment.",
          "sourceIds": [
            "sac-ori",
            "sac-orisa-book",
            "sac-orunmila"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "An introductory academic source supports general religious framing; fuller philosophical sources and consented oral testimony remain needed for advanced interpretations.",
          "sourceIds": [
            "sac-ori",
            "sac-orisa-book",
            "sac-orunmila"
          ]
        }
      ],
      "sourceIds": [
        "sac-ori",
        "sac-orisa-book",
        "sac-orunmila"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-egungun",
      "category": "Mysticism & Worldview",
      "title": "Egúngún: Sacred Meaning and Misconceptions",
      "deck": "Egúngún refers to important Yoruba ancestral masquerade and commemoration practices, not one standard deity who appears identically in every town. The traditions address memory, family, powe…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Egúngún?",
          "p": "Egúngún refers to important Yoruba ancestral masquerade and commemoration practices, not one standard deity who appears identically in every town. The traditions address memory, family, power, public performance and sometimes relationships between living communities and ancestors.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-diaspora"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Communities may preserve narratives of ancestor presence, protection or sanction. Respectful ethnographic writing should report the religious claim as a claim by particular custodians; it should not assert it as an experimentally established event.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-diaspora"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Costume, textile skill, drumming, movement, speech and public processions are central to many manifestations. Some aspects are restricted. The fact that a masquerade appears in a publicly accessible festival does not mean all rites, names or recordings are open for unrestricted reuse.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-diaspora"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Lineage, gendered roles, material histories and civic authority vary. Avoid presenting one festival recording as proof of a generic “Yoruba ancestor ceremony”.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-diaspora"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Egúngún is merely a theatrical costume with no sacred meaning, or alternatively the literal unexamined proof of returning dead people. CORRECTION: it is a complex living ritual and artistic institution whose religious meanings must be attributed to participants.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-diaspora"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "Ancestral performance can be researched through textile history, music, social memory and safeguarding, while prioritising copyright, consent and community voice.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-diaspora"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Current sources provide broad religious context. This entry is intentionally an introductory guide; public regional case studies should be added after custodian interviews.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-diaspora"
          ]
        }
      ],
      "sourceIds": [
        "sac-orisa-book",
        "sac-ori",
        "sac-diaspora"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-gelede",
      "category": "Mysticism & Worldview",
      "title": "Gẹ̀lẹ̀dẹ́ / Ìyá Nlá: Sacred Meaning and Misconceptions",
      "deck": "Gẹ̀lẹ̀dẹ́ is a living Yoruba-Nago oral, musical and masked performance tradition honouring the power of mothers and community relationships. It is not one separate goddess named “Gelede”, an…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Gẹ̀lẹ̀dẹ́ / Ìyá Nlá?",
          "p": "Gẹ̀lẹ̀dẹ́ is a living Yoruba-Nago oral, musical and masked performance tradition honouring the power of mothers and community relationships. It is not one separate goddess named “Gelede”, and Ìyá Nlá should not be flattened into a generic European witch archetype.",
          "sourceIds": [
            "sac-gelede",
            "sac-aja",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Traditions discuss maternal power, the responsibilities of the living community and consequences of social imbalance. Their performance can include comedy, warning, respect and remembrance, depending on occasion and locality.",
          "sourceIds": [
            "sac-gelede",
            "sac-aja",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "UNESCO documents the public tradition, including carved masks, music, dance and seasonal or communal observances. These records provide evidence of sophisticated performed heritage, not permission to digitise every restricted song or ceremony.",
          "sourceIds": [
            "sac-gelede",
            "sac-aja",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Community participation, the roles of women and men, performance form and local timing vary. Safeguarding decisions should be led by practising communities, including women whose authority is recognised in the tradition.",
          "sourceIds": [
            "sac-gelede",
            "sac-aja",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: Gẹ̀lẹ̀dẹ́ is simply a witch cult or an ordinary tourist dance. CORRECTION: it is a complex social, sacred and artistic tradition whose public descriptions centre the power of mothers and community life.",
          "sourceIds": [
            "sac-gelede",
            "sac-aja",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "This material supports theatre studies, heritage education, art history, gender analysis and community-based media archiving.",
          "sourceIds": [
            "sac-gelede",
            "sac-aja",
            "sac-orisa-book"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "UNESCO recognises a heritage practice, not a supernatural causal claim. A responsible archive should commission public translation with performers’ approval and respect restrictions.",
          "sourceIds": [
            "sac-gelede",
            "sac-aja",
            "sac-orisa-book"
          ]
        }
      ],
      "sourceIds": [
        "sac-gelede",
        "sac-aja",
        "sac-orisa-book"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-ajee",
      "category": "Mysticism & Worldview",
      "title": "Àjẹ́ / Ìyámi: Sacred Meaning and Misconceptions",
      "deck": "Àjẹ́ is a complex Yoruba term associated in different settings with potent spiritual agency, often connected in public discourse with the powers of mothers. Translation as “witch” can be mis…",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Àjẹ́ / Ìyámi?",
          "p": "Àjẹ́ is a complex Yoruba term associated in different settings with potent spiritual agency, often connected in public discourse with the powers of mothers. Translation as “witch” can be misleading and dangerous; it imports an English category that does not fully express indigenous distinctions.",
          "sourceIds": [
            "sac-aja",
            "sac-unihist",
            "sac-gelede"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Accounts of power, secrecy, protection, fear and social obligation need to be identified as specific narratives. The site will not repeat rumours about living women or children as factual accusations, and will not invite identification of alleged “witches”.",
          "sourceIds": [
            "sac-aja",
            "sac-unihist",
            "sac-gelede"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Academic work on gender and power and UNESCO’s Gẹ̀lẹ̀dẹ́ record provide contexts for understanding the complexity. No object, performance or social disagreement proves a private individual exercises supernatural harm.",
          "sourceIds": [
            "sac-aja",
            "sac-unihist",
            "sac-gelede"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Words with similar-looking spelling or different tones can carry different meanings. Yoruba-speaking reviewers must check orthography and context before assigning a single English label.",
          "sourceIds": [
            "sac-aja",
            "sac-unihist",
            "sac-gelede"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: àjẹ́ always means an evil woman and any accused person is legitimately dangerous. CORRECTION: cultural vocabulary is more complex; allegations of witchcraft can endanger people and must never be treated as evidence of wrongdoing.",
          "sourceIds": [
            "sac-aja",
            "sac-unihist",
            "sac-gelede"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "The contemporary stakes include gender justice, language literacy, misinformation and protections against harmful accusations. The archive will be moderated against harassment and incitement.",
          "sourceIds": [
            "sac-aja",
            "sac-unihist",
            "sac-gelede"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "University sources explain why translation is contested. Community testimony must be handled sensitively, with confidentiality and the right not to participate.",
          "sourceIds": [
            "sac-aja",
            "sac-unihist",
            "sac-gelede"
          ]
        }
      ],
      "sourceIds": [
        "sac-aja",
        "sac-unihist",
        "sac-gelede"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    },
    {
      "id": "sac-categories",
      "category": "Mysticism & Worldview",
      "title": "Òrìṣà, Irúnmọlẹ̀ and Ancestors: Sacred Meaning and Misconceptions",
      "deck": "“Yoruba deities” is a convenient English phrase, but it can hide the internal diversity of sacred categories. Depending on a community or narrator, òrìṣà, irúnmọlẹ̀, ancestor, divine agent, …",
      "era": "Living traditions · historical and contemporary",
      "eyebrow": "SACRED WORLD / CRITICAL SOURCE EDITION",
      "sections": [
        {
          "h": "Who is Òrìṣà, Irúnmọlẹ̀ and Ancestors?",
          "p": "“Yoruba deities” is a convenient English phrase, but it can hide the internal diversity of sacred categories. Depending on a community or narrator, òrìṣà, irúnmọlẹ̀, ancestor, divine agent, river power or protective institution may denote different relationships. A glossary should never substitute a foreign pantheon for indigenous terms.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-theologians"
          ]
        },
        {
          "h": "Accounts and sacred meaning",
          "p": "Devotional categories have histories. Some spiritual figures are described through creation traditions, others through royal or community memory. They should not all be classified by imported concepts of “minor gods”, ranked in one fictional family tree or arranged as one universal central authority.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-theologians"
          ]
        },
        {
          "h": "Practices, artistic evidence and public heritage",
          "p": "Objects in shrines mediate relationships; one image does not necessarily claim to be the whole bodily form of a sacred figure. Material culture can be studied carefully without reducing devotion to worship of a piece of wood or iron.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-theologians"
          ]
        },
        {
          "h": "Regional voices and living variation",
          "p": "Terminology and religious meanings change across towns, generations, Christianity, Islam and diaspora. Archive metadata should record original word, tone marks, gloss, speaker, date and place.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-theologians"
          ]
        },
        {
          "h": "Misconception and correction",
          "p": "MISCONCEPTION: every Yoruba spiritual being can be mapped one-to-one onto Greek or Roman gods, or that every sacred figure belongs to a universally agreed set of “401 deities”. CORRECTION: famous numbers and pantheon diagrams need source, context and evidence.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-theologians"
          ]
        },
        {
          "h": "Connections with life today",
          "p": "This classification is a foundation for culturally literate teaching and a database design that avoids embedding a false single doctrine into software.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-theologians"
          ]
        },
        {
          "h": "Evidence, limits and responsible research",
          "p": "Academic and museum studies support the need for contextual classification. Detailed named community accounts should be invited and editorially reviewed.",
          "sourceIds": [
            "sac-orisa-book",
            "sac-ori",
            "sac-theologians"
          ]
        }
      ],
      "sourceIds": [
        "sac-orisa-book",
        "sac-ori",
        "sac-theologians"
      ],
      "question": "Which aspects of this account are community testimony, documented practice and outside interpretation?",
      "evidenceType": "Community traditions and source-recorded material; not experimental proof of spiritual claims",
      "evidenceNote": "Editorial research draft. Historic objects and publications support specified associations, not a universal theology; community custodial review is still needed. Local accounts are not invented.",
      "knowledge": true
    }
  ]
};
D.sources.push(...supplement.sources);D.sacredProfiles=supplement.profiles;D.sacredArticles=supplement.articles;D.articles.push(...supplement.articles);D.knowledgeChapters.push(...supplement.articles);D.categories=[...new Set(D.articles.map(a=>a.category))];
})();
