// Browser-safe controller. No archive, speech recognition, network or storage.
export interface SpeechUnit {text:string;section:string;label:string}
export type NarrationState='ready'|'starting'|'playing'|'paused'|'stopped'|'finished'|'error';
export const speechRates=[0.75,1,1.25,1.5] as const;
export function splitSpeech(text:string,max=300){
  if(max<32||!Number.isInteger(max))throw new RangeError('Invalid speech chunk size');
  const words=text.trim().split(/\s+/u).filter(Boolean),chunks:string[]=[];
  let current='';
  for(const word of words){if(current&&current.length+word.length+1>max){chunks.push(current);current='';}current+=(current?' ':'')+word;}
  if(current)chunks.push(current);return chunks;
}
export function localEnglishVoices<T extends {lang:string;localService:boolean}>(voices:T[]){return voices.filter(v=>v.localService===true&&/^en(?:-|$)/i.test(v.lang));}
type Port=Pick<SpeechSynthesis,'speak'|'cancel'|'pause'|'resume'>;
export class NarrationController {
  state:NarrationState='ready';index=0;units:SpeechUnit[]=[];
  private epoch=0;private timer:ReturnType<typeof setTimeout>|undefined;private disposed=false;
  // Retain the active utterance while the browser owns asynchronous playback.
  utterance:SpeechSynthesisUtterance|undefined;
  private voice:SpeechSynthesisVoice|undefined;private rate=1;
  private port:Port;private create:(text:string)=>SpeechSynthesisUtterance;private update:(state:NarrationState,unit:SpeechUnit|undefined,message:string)=>void;
  constructor(port:Port,create:(text:string)=>SpeechSynthesisUtterance,update:(state:NarrationState,unit:SpeechUnit|undefined,message:string)=>void){this.port=port;this.create=create;this.update=update;}
  private clear(){clearTimeout(this.timer);this.timer=undefined;}
  private announce(state:NarrationState,message:string){this.state=state;this.update(state,this.units[this.index],message);}
  private deadline(ms:number){this.clear();const epoch=this.epoch;this.timer=setTimeout(()=>{if(epoch===this.epoch)this.fail('The device did not finish responding. Playback stopped; try another local English voice or continue reading.');},ms);}
  private cancel(){this.epoch++;this.clear();this.utterance=undefined;try{this.port.cancel();}catch{/* Reading remains available. */}}
  private fail(message:string){this.cancel();this.announce('error',message);}
  start(units:SpeechUnit[],voice:SpeechSynthesisVoice,rate:number){
    if(this.disposed||this.state==='starting'||this.state==='playing'||this.state==='paused')return;
    if(!localEnglishVoices([voice]).length||!speechRates.some(r=>r===rate)){this.fail('A local English voice and a supported speed are required.');return;}
    this.cancel();this.units=units.filter(u=>u.text.trim());this.index=0;this.voice=voice;this.rate=rate;
    if(!this.units.length){this.fail('No visible story text is available for this selection.');return;}
    try{this.port.resume();this.next();}catch{this.fail('Device narration is unavailable. The complete story remains readable.');}
  }
  private next(){
    const unit=this.units[this.index];if(!unit){this.epoch++;this.clear();this.utterance=undefined;this.announce('finished','Finished the selected story reading.');return;}
    const epoch=++this.epoch;
    const current=()=>!this.disposed&&epoch===this.epoch;
    const utterance=this.create(unit.text);this.utterance=utterance;utterance.voice=this.voice!;utterance.lang=this.voice!.lang;utterance.rate=this.rate;
    utterance.onstart=()=>{if(current()){this.announce('playing',`Playing: ${unit.label}.`);this.deadline(60000/this.rate);}};
    utterance.onend=()=>{if(current()){this.epoch++;this.clear();this.utterance=undefined;this.index++;if(this.state==='paused')return;try{this.next();}catch{this.fail('The device could not continue. Press Play to try again.');}}};
    utterance.onerror=()=>{if(current())this.fail('The device could not speak this passage. Try another local English voice; pronunciation of embedded Yorùbá names is not verified.');};
    this.announce('starting',`Starting: ${unit.label}.`);this.deadline(8000);
    try{this.port.speak(utterance);}catch{this.fail('Device speech playback failed. Continue reading or try another local English voice.');}
  }
  pause(){if(this.state!=='playing')return;try{this.port.pause();this.clear();this.announce('paused','Paused. Resume continues the current passage.');}catch{this.fail('The device could not pause playback. Playback stopped.');}}
  resume(){if(this.state!=='paused')return;try{this.port.resume();if(!this.utterance){this.next();return;}this.announce('playing','Resumed the current passage.');this.deadline(60000/this.rate);}catch{this.fail('The device could not resume playback. Press Play to restart.');}}
  stop(message='Stopped. Play restarts at the chosen section.'){if(this.disposed)return;this.cancel();this.announce('stopped',message);}
  destroy(){this.cancel();this.disposed=true;}
}
