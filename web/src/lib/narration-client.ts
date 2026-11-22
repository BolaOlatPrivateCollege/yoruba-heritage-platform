import {NarrationController,localEnglishVoices,splitSpeech,type SpeechUnit} from './narration';
const root=document.querySelector<HTMLElement>('[data-narrator]');
if(root){
  const status=root.querySelector<HTMLElement>('.narrator-status')!;
  const controls=root.querySelector<HTMLElement>('.narrator-controls')!;
  const section=root.querySelector<HTMLSelectElement>('#narrator-section')!;
  const voices=root.querySelector<HTMLSelectElement>('#narrator-voice')!;
  const speed=root.querySelector<HTMLSelectElement>('#narrator-speed')!;
  const jump=root.querySelector<HTMLAnchorElement>('.narrator-jump')!;
  const button=(name:string)=>root.querySelector<HTMLButtonElement>(`[data-speech="${name}"]`)!;
  const deviceSpeech=(()=>{try{return window.speechSynthesis;}catch{return undefined;}})();
  if(!deviceSpeech||typeof window.SpeechSynthesisUtterance!=='function'||typeof deviceSpeech.getVoices!=='function'||typeof deviceSpeech.speak!=='function'||typeof deviceSpeech.cancel!=='function'||typeof deviceSpeech.pause!=='function'||typeof deviceSpeech.resume!=='function'||typeof deviceSpeech.addEventListener!=='function')status.textContent='Device speech is unavailable in this browser. The full story and section links remain readable.';
  else{
    const synth=deviceSpeech;let available:SpeechSynthesisVoice[]=[];
    const controller=new NarrationController(synth,text=>new SpeechSynthesisUtterance(text),(state,unit,message)=>{
      status.textContent=message;root.dataset.playback=state;
      button('play').disabled=!available.length||['starting','playing','paused'].includes(state);
      button('pause').disabled=state!=='playing';button('resume').disabled=state!=='paused';button('stop').disabled=!['starting','playing','paused'].includes(state);
      if(unit)jump.href='#'+unit.section;
    });
    const refresh=()=>{
      if(['starting','playing','paused'].includes(controller.state))controller.stop('Voices changed; playback stopped. Select a voice and press Play.');
      try{available=localEnglishVoices(synth.getVoices());}catch{available=[];}
      const previous=voices.value;voices.replaceChildren();
      if(!available.length)voices.add(new Option('No local English voice available',''));
      available.forEach((voice,index)=>voices.add(new Option(`${voice.name} — ${voice.lang} — device-generated`,String(index))));
      if(previous&&available[Number(previous)])voices.value=previous;
      button('play').disabled=!available.length;
      status.textContent=available.length?'Ready. Choose a section and press Play for English device narration.':'No local English voice is available yet. Check your device voice settings, then Check voices. Remote voices are not used; reading is unaffected.';
    };
    function units(){
      const options=Array.from(section.options),start=options.findIndex(o=>o.value===section.value);
      if(start<0)return [];
      return options.slice(start).flatMap(option=>{
        const group=document.getElementById(option.value);if(!group)return [];
        return Array.from(group.querySelectorAll<HTMLElement>('h2,.story-prose,[data-narration-text]')).filter(el=>!el.closest('[hidden]')&&getComputedStyle(el).display!=='none'&&getComputedStyle(el).visibility!=='hidden').flatMap(el=>splitSpeech(el.textContent??'').map(text=>({text,section:option.value,label:option.textContent??'Story'} satisfies SpeechUnit)));
      });
    }
    controls.classList.remove('narrator-pending');controls.inert=false;refresh();
    button('play').addEventListener('click',()=>{
      const voice=available[Number(voices.value)];if(!voice)return;
      document.querySelectorAll<HTMLMediaElement>('audio,video').forEach(media=>media.pause());
      controller.start(units(),voice,Number(speed.value));
    });
    button('pause').addEventListener('click',()=>controller.pause());button('resume').addEventListener('click',()=>controller.resume());button('stop').addEventListener('click',()=>controller.stop());button('refresh').addEventListener('click',refresh);
    for(const select of [section,voices,speed])select.addEventListener('change',()=>{controller.stop('Selection changed. Press Play to restart at the chosen section.');jump.href='#'+section.value;});
    synth.addEventListener('voiceschanged',refresh);
    document.addEventListener('play',event=>{if(event.target instanceof HTMLMediaElement){controller.stop('Story narration stopped for recording playback.');document.querySelectorAll<HTMLMediaElement>('audio,video').forEach(media=>{if(media!==event.target)media.pause();});}},true);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)controller.stop('Playback stopped while this page is hidden.');});
    window.addEventListener('pagehide',()=>controller.stop('Playback stopped on leaving this page.'));
    window.addEventListener('beforeunload',()=>controller.destroy());
  }
}
