/**
 * Reader-facing cultural explanation. Based on the owner's supplied Èṣù
 * description and earlier source-intake leads. Neither an authenticated
 * oral transcript nor a universal ritual manual. Scholar citations remain
 * in the separately maintained Sacred World record.
 */
export const esuLivingProfile={
  lead:'In Yorùbá culture and spirituality, Èṣù (also written Esu or Eshu) is a major òrìṣà: a divine messenger, intermediary, guardian of crossroads and choices, and—in many tellings—an enforcer of sacred order and the consequences of human actions.',
  invitation:'A familiar name can mean very different things depending on who tells the story. Is Èṣù a messenger, a mischievous teacher, a keeper of the crossroads—or simply “the devil”, as some of us heard growing up? The answer opens a fascinating conversation about Yorùbá belief, language and the ways stories change.',
  roles:[
    {
      id:'messenger',title:'Divine messenger',
      body:'Èṣù carries messages and offerings between human beings, other òrìṣà and Olódùmarè, the Supreme Being, in many traditional accounts. The idea of a messenger places Èṣù at the meeting point of the human and sacred worlds.',
      conversation:'When a message passes through a messenger, why does the messenger’s role matter?'
    },
    {
      id:'crossroads',title:'Crossroads and choice',
      body:'Èṣù is associated with thresholds, markets and crossroads (oríta)—places where paths meet and decisions must be made. Such crossroads are also a way of talking about human agency: the choices people make, the paths they follow and what follows afterwards.',
      conversation:'Have you heard a story in which a small choice changed everything?'
    },
    {
      id:'order',title:'Order, balance and consequences',
      body:'In many Yorùbá tellings, Èṣù is not a figure who creates trouble simply for its own sake. He can test character, challenge broken obligations, uphold moral or sacred order and make people face what their actions bring. Different tellers explain that justice and balance in different ways.',
      conversation:'When someone is tested, does the result reveal their character—or change it?'
    },
    {
      id:'trickster',title:'Trickster, perspective and surprise',
      body:'Èṣù can overturn assumptions and expose the limits of what people think they know. A famous family of tales tells of a traveller whose differently coloured hat causes two observers to quarrel, although each saw one side correctly. The lesson is not simply about trickery; it is about certainty, pride and the danger of hearing only one side.',
      conversation:'Can two witnesses disagree and still both describe something they truly saw?'
    }
  ],
  language:{
    title:'What does “Èṣù” mean?',
    text:'Some interpretations of the name connect it with ideas of rounding, shaping, gathering or encircling—images that can suggest completeness, balance and cause and effect. These are meaningful explanations that circulate in discussions of Yorùbá language and spirituality; they should be identified as proposed interpretations rather than one settled, word-for-word historical derivation.',
    prompt:'Does your community explain the name differently? Tell us the Yorùbá words, tones and meaning you were taught.'
  },
  translation:{
    title:'Why did so many people grow up hearing that Èṣù means “devil”?',
    opening:'In everyday Yorùbá speech, especially in Christian contexts, Èṣù is often used for Satan or the devil. That is familiar to many Nigerians. But the Èṣù of traditional Yorùbá religious accounts has a very different history and a much wider range of roles.',
    story:'During nineteenth-century missionary translation and dictionary work—including the influential work of Bishop Samuel Ajayi Crowther—the word Èṣù became associated with Christian terms for Satan. Subsequent preaching, language use and popular storytelling helped the association spread. This history does not make the traditional òrìṣà simply identical to the Biblical Satan, although some Christians continue to use the name in that translated sense.',
    closer:'This is why two people can hear the same name and picture very different things. One may remember a sermon about the devil. Another may remember an account of a messenger, a crossroads or the consequences of a choice. Understanding each account begins with asking who told it and which tradition they were speaking from.'
  },
  names:{
    title:'One name, several ways of speaking about Èṣù',
    items:[
      {name:'Èṣù',note:'The principal name used across many Yorùbá tellings and religious contexts.'},
      {name:'Èṣù Ọ̀dàrà',note:'An appellation encountered in some accounts; its role and meaning should be understood through the teller’s tradition.'},
      {name:'Èṣù Láàlú',note:'A name heard in certain regional or oral accounts, not proof of one universal list of separate deities.'},
      {name:'Ẹlẹ́gbára',note:'A name or title associated with Èṣù in related traditions; pronunciations and uses vary.'}
    ]
  },
  misunderstandings:[
    {heard:'“Èṣù is exactly the Christian Satan.”',another:'That is one influential translation and religious usage, not a complete description of Èṣù in traditional Yorùbá spirituality.'},
    {heard:'“If Èṣù is a trickster, he must be entirely evil.”',another:'Many tales use surprise, contradiction and testing to explore character, fairness and the limits of certainty; other accounts may also describe disturbing or harmful powers.'},
    {heard:'“Èṣù makes people do wrong things.”',another:'Some everyday expressions blame Èṣù for bad decisions. Stories of choice and consequence also invite the opposite question: what responsibility belongs to the person who chose?'}
  ],
  discussion:{
    title:'What did you grow up hearing about Èṣù?',
    lead:'A traditional practitioner, a family storyteller, a church member, an elder, a student and a historian may bring different accounts. This is where the conversation should begin—not end.',
    prompts:[
      'Was Èṣù described to you as a messenger, a trickster, a guardian of crossroads or the devil?',
      'Who first told you that version—family, an elder, school, a sermon or another source?',
      'Have you heard the tale of the differently coloured hat? What colours and ending did your teller use?',
      'Does your community have another name, praise expression or explanation? Where did it come from?'
    ],
    note:'We welcome the prospect of attributed family and first-hand accounts, competing tellings and respectful corrections. The private preview does not yet accept submissions; secure moderation and permission controls must be ready first.'
  }
} as const;
