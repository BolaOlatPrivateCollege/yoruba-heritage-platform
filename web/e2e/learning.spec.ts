import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';
mkdirSync('screenshots',{recursive:true});

test('alphabet filters and selection preserve keyboard focus and exact guidance',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/learning/alphabet/');
 await expect(page.locator('.letter-card:visible')).toHaveCount(25);
 const vowels=page.getByRole('button',{name:'Vowels 7',exact:true});await vowels.focus();await page.keyboard.press('Enter');await expect(vowels).toBeFocused();
 await expect(page.locator('.letter-card:visible')).toHaveCount(7);await expect(page.locator('#alphabet-status')).toHaveText('7 letters shown. Vowels 7.');
 const select=page.getByRole('button',{name:'Select Ẹ',exact:true});await select.focus();await page.keyboard.press('Space');await expect(select).toBeFocused();await expect(select).toHaveAttribute('aria-pressed','true');await expect(page.locator('#letter-detail')).toHaveText('Ẹ · vowel · open e /ɛ/');
 await page.getByRole('button',{name:'Consonants 18'}).click();await expect(page.locator('.letter-card:visible')).toHaveCount(18);
 await page.getByRole('button',{name:'Select GB',exact:true}).click();await expect(page.locator('#letter-detail')).toContainText('single labiovelar consonant /ɡ͡b/');
 await page.getByRole('button',{name:'All 25'}).click();await expect(page.locator('.letter-card:visible')).toHaveCount(25);
 await page.screenshot({path:'screenshots/desktop-alphabet.png',fullPage:true});
});
test('tone practice gives accessible feedback, cycles and resets without focus loss',async({page})=>{
 await page.goto('/learning/alphabet/#tones');
 const high=page.getByRole('button',{name:'High',exact:true});await high.focus();await page.keyboard.press('Enter');await expect(high).toBeFocused();await expect(page.locator('#practice-feedback')).toHaveText('Correct. Acute accent · high pitch.');
 await page.getByRole('button',{name:'Next character'}).click();await expect(page.locator('#practice-character')).toHaveText('a');
 await high.click();await expect(page.locator('#practice-feedback')).toContainText('Try again.');
 await page.getByRole('button',{name:'Mid',exact:true}).click();await expect(page.locator('#practice-feedback')).toContainText('Correct.');
 await page.getByRole('button',{name:'Next character'}).click();await expect(page.locator('#practice-character')).toHaveText('à');await page.getByRole('button',{name:'Low',exact:true}).click();await expect(page.locator('#practice-feedback')).toHaveText('Correct. Grave accent · low pitch.');
 await page.getByRole('button',{name:'Next character'}).click();await expect(page.locator('#practice-character')).toHaveText('á');
 const reset=page.getByRole('button',{name:'Reset practice'});await reset.focus();await page.keyboard.press('Enter');await expect(reset).toBeFocused();await expect(page.locator('#practice-feedback')).toHaveText('Practice reset. Character 1 of 3. Choose a tone.');
});
test('pronunciation filtering retains spelling, handles hostile input and keyboard reset',async({page})=>{
 await page.goto('/learning/pronunciation/');const input=page.getByRole('searchbox',{name:'Find a reference (tone marks optional)'});
 await input.fill('Olodumare');await expect(page.locator('.pronunciation-reference:visible')).toHaveCount(1);await expect(page.locator('.pronunciation-reference:visible h3')).toHaveText('Olódùmarè');await expect(input).toBeFocused();
 await input.fill('<img src=x onerror=alert(1)>');await expect(page.getByRole('status')).toHaveText('0 references shown.');await expect(page.locator('main img')).toHaveCount(0);
 const reset=page.getByRole('button',{name:'Show all references'});await reset.focus();await page.keyboard.press('Enter');await expect(reset).toBeFocused();await expect(page.locator('.pronunciation-reference:visible')).toHaveCount(15);await expect(page.getByText('Native recording pending',{exact:true})).toHaveCount(15);
 await page.screenshot({path:'screenshots/desktop-pronunciation.png',fullPage:true});
});
test('320 and 390 mobile layouts, reduced motion and semantic accessibility diagnostics',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [320,390])for(const route of ['alphabet','pronunciation']){
  await page.setViewportSize({width,height:844});await page.goto(`/learning/${route}/`);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.getByRole('main')).toHaveCount(1);await expect(page.getByRole('heading',{level:1})).toHaveCount(1);
  const diagnostics=await page.evaluate(()=>{
   const ids=Array.from(document.querySelectorAll('[id]')).map(el=>el.id);
   const unnamed=Array.from(document.querySelectorAll('button')).filter(b=>!b.textContent?.trim()&&!b.getAttribute('aria-label')).length;
   const tiny=Array.from(document.querySelectorAll('main button')).filter(b=>b.getBoundingClientRect().height>0&&b.getBoundingClientRect().height<44).length;
   return {duplicateIds:ids.length-new Set(ids).size,unnamed,tiny};
  });expect(diagnostics).toEqual({duplicateIds:0,unnamed:0,tiny:0});
  await page.screenshot({path:`screenshots/mobile-${width}-${route}.png`,fullPage:true});
 }
});
test('learning makes no external, media or mutation requests and stores no progress',async({page})=>{
 const requests:{url:string;method:string;type:string}[]=[];const errors:string[]=[];
 page.on('request',r=>requests.push({url:r.url(),method:r.method(),type:r.resourceType()}));page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{Object.defineProperty(window,'Audio',{value:()=>{throw new Error('Audio forbidden');}});if(navigator.mediaDevices)navigator.mediaDevices.getUserMedia=async()=>{throw new Error('Microphone forbidden');};});
 for(const route of ['alphabet','pronunciation']){await page.goto(`/learning/${route}/`);await expect(page.locator('audio,video,iframe,[data-audio]')).toHaveCount(0);expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});}
 expect(requests.filter(r=>!r.url.startsWith('http://127.0.0.1:4321')||r.method!=='GET'||['media','websocket'].includes(r.type))).toEqual([]);expect(errors).toEqual([]);
});
test('no-JavaScript fallback exposes all exact learning content and hides inactive controls',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,baseURL:'http://127.0.0.1:4321'});const page=await context.newPage();await page.goto('/learning/alphabet/');await expect(page.locator('.letter-card:visible')).toHaveCount(25);await expect(page.locator('.letter-guidance:visible')).toHaveCount(25);await expect(page.getByRole('button',{name:'All 25'})).not.toBeVisible();await expect(page.locator('.tone-grid .tone-character')).toHaveCount(3);
 await page.goto('/learning/pronunciation/');await expect(page.locator('.pronunciation-reference:visible')).toHaveCount(15);await expect(page.getByRole('searchbox')).not.toBeVisible();await context.close();
});
