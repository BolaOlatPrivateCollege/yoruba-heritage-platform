import {test,expect,type Page} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const first='/stories/ile-ife-art-city-evidence/';
// Deterministic adapter for browser controls, not a claim of audible CI output.
async function installSpeech(page:Page,kind='normal'){
  await page.addInitScript(kind=>{
    const voice={name:'Deterministic test voice',voiceURI:'test-local',lang:'en-GB',localService:true,default:true};
    const events=new EventTarget();
    const state={calls:[] as {text:string;rate:number;lang:string}[],utterances:[] as SpeechSynthesisUtterance[],cancelled:0,pauses:0,resumes:0,kind,voices:kind==='empty'?[]:kind==='remote'?[{...voice,localService:false}]:[voice]};
    class Utterance {text:string;rate=1;lang='';voice=null;onstart:(()=>void)|null=null;onend:(()=>void)|null=null;onerror:(()=>void)|null=null;constructor(text:string){this.text=text;}}
    Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:Utterance});
    Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{getVoices:()=>state.voices,addEventListener:events.addEventListener.bind(events),cancel:()=>state.cancelled++,pause:()=>state.pauses++,resume:()=>state.resumes++,speak:(u:SpeechSynthesisUtterance)=>{if(state.kind==='throw')throw Error('Synthetic test failure');state.calls.push({text:u.text,rate:u.rate,lang:u.lang});state.utterances.push(u);if(state.kind==='error')queueMicrotask(()=>u.onerror?.(new Event('error') as SpeechSynthesisErrorEvent));else if(state.kind!=='never')queueMicrotask(()=>u.onstart?.(new Event('start') as SpeechSynthesisEvent));}}});
    Object.assign(window,{__speechTest:{state,finish:()=>state.utterances.at(-1)?.onend?.(new Event('end') as SpeechSynthesisEvent),late:()=>{state.utterances[0]?.onend?.(new Event('end') as SpeechSynthesisEvent);state.utterances[0]?.onerror?.(new Event('error') as SpeechSynthesisErrorEvent);},load:()=>{state.voices=[voice];events.dispatchEvent(new Event('voiceschanged'));}}});
  },kind);
}
declare global {interface Window {__speechTest:{state:{calls:{text:string;rate:number;lang:string}[];utterances:SpeechSynthesisUtterance[];cancelled:number;pauses:number;resumes:number;kind:string};finish:()=>void;late:()=>void;load:()=>void}}}
const control=(page:Page,name:string)=>page.locator(`[data-speech="${name}"]`);

test('English narration requires Play and supports keyboard pause/resume/stop, speed and safe rapid controls',async({page})=>{
  await installSpeech(page);await page.goto(first);expect(await page.evaluate(()=>window.__speechTest.state.calls)).toEqual([]);await expect(control(page,'pause')).toBeDisabled();
  await control(page,'play').focus();await page.keyboard.press('Enter');await expect(page.locator('.narrator-status')).toContainText('Playing: Opening');await expect(control(page,'play')).toBeDisabled();await control(page,'pause').focus();await page.keyboard.press('Enter');await expect(page.locator('.narrator-status')).toContainText('Paused');await control(page,'resume').click();await expect(page.locator('.narrator-status')).toContainText('Resumed');
  await control(page,'stop').click();await page.evaluate(()=>window.__speechTest.late());await expect(page.locator('.narrator-status')).toContainText('Stopped');expect(await page.evaluate(()=>window.__speechTest.state.calls.length)).toBe(1);
  await page.locator('#narrator-speed').selectOption('1.25');await control(page,'play').click();expect(await page.evaluate(()=>window.__speechTest.state.calls.at(-1)?.rate)).toBe(1.25);await control(page,'stop').click();
});
test('all five readers speak the actual visible narrative in section order and finish without reading sources',async({page})=>{
  await installSpeech(page);await page.goto('/stories/');const links=await page.locator('main a[href^="/stories/"]').evaluateAll(nodes=>[...new Set(nodes.map(n=>n.getAttribute('href')!).filter(h=>/^\/stories\/[^/]+\/$/.test(h)))]);expect(links.length).toBe(4);
  for(const path of [...links,'/places/abeokuta-tax-and-representation/']){
    await page.goto(path);const expected=await page.locator('#narrator-section option').evaluateAll(options=>options.flatMap(o=>Array.from(document.getElementById((o as HTMLOptionElement).value)!.querySelectorAll('h2,.story-prose,[data-narration-text]')).map(e=>e.textContent!.trim().replace(/\s+/gu,' '))).join(' '));
    await control(page,'play').click();await expect(page.locator('.narrator-status')).toContainText('Playing');
    await page.evaluate(()=>{for(let n=0;n<1000;n++){const before=window.__speechTest.state.calls.length;window.__speechTest.finish();if(before===window.__speechTest.state.calls.length)break;}});
    await expect(page.locator('.narrator-status')).toContainText('Finished');const spoken=await page.evaluate(()=>window.__speechTest.state.calls.map(c=>c.text).join(' '));expect(spoken).toBe(expected);expect(spoken).not.toContain('DRAFT SOURCE REGISTER');expect(spoken).not.toContain('Publication approval not granted');
  }
});
test('long same-section speech changes live status only for section or playback transitions',async({page})=>{
  await installSpeech(page);await page.goto(first);
  await page.evaluate(()=>{
    const opening=document.querySelector<HTMLSelectElement>('#narrator-section')!.value;
    const paragraph=document.getElementById(opening)!.querySelector<HTMLElement>('.story-prose')!;
    paragraph.textContent=Array(150).fill('A source-aware classroom reading continues.').join(' ');
    const status=document.querySelector<HTMLElement>('.narrator-status')!;
    const messages:string[]=[];
    new MutationObserver(()=>messages.push(status.textContent??'')).observe(status,{childList:true,characterData:true,subtree:true});
    Object.assign(window,{__narratorAnnouncements:messages});
  });
  await control(page,'play').click();await expect(page.locator('.narrator-status')).toContainText('Playing: Opening.');
  for(let i=0;i<5;i++){
    await page.evaluate(()=>window.__speechTest.finish());
    await expect(page.locator('.narrator-status')).toContainText('Playing: Opening.');
  }
  const announcements=await page.evaluate(()=>(window as Window&{__narratorAnnouncements:string[]}).__narratorAnnouncements);
  expect(announcements.filter(message=>message==='Starting: Opening.')).toHaveLength(1);
  expect(announcements.filter(message=>message==='Playing: Opening.')).toHaveLength(1);
  await control(page,'pause').click();await expect(page.locator('.narrator-status')).toContainText('Paused');
  await control(page,'resume').click();await expect(page.locator('.narrator-status')).toContainText('Resumed');
  await control(page,'stop').click();await expect(page.locator('.narrator-status')).toContainText('Stopped');
});

test('section selection stops playback, starts at the selected visible heading and offers its reading link',async({page})=>{
  await installSpeech(page);await page.goto(first);await control(page,'play').click();await page.locator('#narrator-section').selectOption('city');await expect(control(page,'play')).toBeEnabled();await expect(page.locator('.narrator-jump')).toHaveAttribute('href','#city');await control(page,'play').click();expect(await page.evaluate(()=>window.__speechTest.state.calls.at(-1)?.text)).toBe(await page.locator('#city h2').textContent());await control(page,'stop').click();
});
test('missing API, delayed voices and remote-only voices have honest failure states with no automatic speech',async({page})=>{
  await page.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});});await page.goto(first);await expect(page.locator('.narrator-status')).toContainText('unavailable');await expect(page.locator('.narrator-controls')).toBeHidden();
});
test('late local voices become available without starting playback; remote voices remain blocked',async({page})=>{
  await installSpeech(page,'remote');await page.goto(first);await expect(control(page,'play')).toBeDisabled();await expect(page.locator('.narrator-status')).toContainText('No local English voice');await page.evaluate(()=>window.__speechTest.load());await expect(control(page,'play')).toBeEnabled();expect(await page.evaluate(()=>window.__speechTest.state.calls.length)).toBe(0);
});
test('device failures and empty selections stop cleanly rather than claiming successful audio',async({page})=>{
  await installSpeech(page,'error');await page.goto(first);await control(page,'play').click();await expect(page.locator('.narrator-status')).toContainText('could not speak');await expect(control(page,'play')).toBeEnabled();
  await page.locator('#narrator-section').evaluate((select:HTMLSelectElement)=>{select.replaceChildren(new Option('Missing text','does-not-exist'));select.dispatchEvent(new Event('change'));});await control(page,'play').click();await expect(page.locator('.narrator-status')).toContainText('No visible story text');
});
test('hiding or leaving the page cancels narration, and a native recording takes over exclusively',async({page})=>{
  await installSpeech(page);await page.goto(first);await control(page,'play').click();await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});await expect(page.locator('.narrator-status')).toContainText('hidden');await control(page,'play').click();await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));await expect(page.locator('.narrator-status')).toContainText('leaving');
  await control(page,'play').click();await page.evaluate(()=>{const media=document.createElement('audio');document.body.append(media);media.dispatchEvent(new Event('play',{bubbles:false}));});await expect(page.locator('.narrator-status')).toContainText('recording playback');
});
test('no-JS story reading and all 15 unapproved pronunciation entries retain honest usable fallbacks',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,baseURL:'http://127.0.0.1:4321'});try{const page=await context.newPage();await page.goto(first);await expect(page.locator('.narrator-controls')).toBeHidden();await expect(page.locator('.story-prose').first()).toBeVisible();await page.goto('/learning/pronunciation/');await expect(page.locator('[data-recording-unavailable] button:disabled')).toHaveCount(15);await expect(page.locator('audio,video,iframe')).toHaveCount(0);await expect(page.locator('a[href="https://africa.uga.edu/Yoruba/pronunciation.html"]')).toBeVisible();}finally{await context.close();}
});
for(const width of [1440,390,320])test(`narration and pronunciation remain accessible without overflow, with ${width}px screenshots`,async({page})=>{
  await installSpeech(page);await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await mkdir('screenshots',{recursive:true});await page.goto(first);await page.locator('[data-narrator]').scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await control(page,'play').click();await expect(page.locator('.narrator-status')).toContainText('Playing');await page.screenshot({path:`screenshots/voice-narration-${width}.png`});await page.locator('.narrator-controls').scrollIntoViewIfNeeded();await page.screenshot({path:`screenshots/voice-narration-controls-${width}.png`});await control(page,'stop').click();
  const diagnostics=await page.evaluate(()=>{const ids=Array.from(document.querySelectorAll('[id]')).map(e=>e.id);const buttons=Array.from(document.querySelectorAll<HTMLButtonElement>('.narrator-actions button'));const unwrapped=buttons.filter(b=>{const range=document.createRange();range.selectNodeContents(b);const rects=Array.from(range.getClientRects()).filter(r=>r.width>0);return getComputedStyle(b).whiteSpace!=='nowrap'||rects.length!==1||b.scrollWidth>b.clientWidth+1;}).length;return {duplicates:ids.length-new Set(ids).size,tiny:buttons.filter(b=>b.getBoundingClientRect().height<44).length,unlabelled:Array.from(document.querySelectorAll('[data-narrator] select')).filter(s=>!document.querySelector(`label[for="${s.id}"]`)).length,unwrapped};});expect(diagnostics).toEqual({duplicates:0,tiny:0,unlabelled:0,unwrapped:0});
  await page.goto('/learning/pronunciation/');await page.locator('#reference-1').scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`screenshots/voice-pronunciation-${width}.png`});await page.locator('.pronunciation-resource').scrollIntoViewIfNeeded();await page.screenshot({path:`screenshots/voice-uga-reference-${width}.png`});
});
test('audio pages at enlarged text size make no external/media/mutation requests or storage writes',async({page})=>{
  await installSpeech(page);const disallowed:string[]=[];page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4321')||r.method()!=='GET'||r.resourceType()==='media')disallowed.push(r.url());});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:720,height:1000});
  for(const path of [first,'/learning/pronunciation/']){await page.goto(path);await page.evaluate(()=>document.documentElement.style.fontSize='32px');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie])).toEqual([0,0,'']);}expect(disallowed).toEqual([]);expect(errors).toEqual([]);
});
