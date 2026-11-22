import {test,expect} from '@playwright/test';
import {readFileSync,mkdirSync} from 'node:fs';
import type {QuizQuestion} from '../src/lib/quiz';
const quiz:QuizQuestion[]=JSON.parse(readFileSync('.generated/archive.json','utf8')).quiz;
mkdirSync('screenshots',{recursive:true});
const card=(page:import('@playwright/test').Page)=>page.locator('.quiz-question:visible');
const begin=async(page:import('@playwright/test').Page)=>{await page.goto('/learning/quiz/');await page.getByRole('button',{name:'Start 15-question review'}).click();};

test('quiz navigation, keyboard feedback, locked answers and source-linked explanation',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/learning/');await page.getByRole('link',{name:'Knowledge quiz · 15 questions'}).click();
 await expect(page.getByRole('navigation',{name:'Main sections'}).getByRole('link',{name:'Quiz',exact:true})).toHaveAttribute('aria-current','page');
 await page.getByRole('button',{name:'Start 15-question review'}).focus();await page.keyboard.press('Enter');
 await expect(card(page).getByRole('heading')).toBeFocused();await expect(card(page).getByRole('group')).toHaveAccessibleName(quiz[0]!.q);
 const next=page.getByRole('button',{name:'Next question'});await next.click();await expect(page.locator('#quiz-progress-text')).toHaveText('Question 1 of 15 · 0 answered');
 await card(page).getByRole('heading').focus();await page.keyboard.press('Tab');const first=card(page).getByRole('button').first();await expect(first).toBeFocused();await page.keyboard.press('Space');await expect(first).toBeFocused();
 await expect(page.getByRole('status')).toContainText('Does not match the archived key.');await expect(page.locator('#quiz-explanation')).toHaveText(quiz[0]!.why);await expect(page.locator('#quiz-score')).toHaveText('Archive-key score: 0 / 15');
 await expect(first).toHaveAttribute('aria-disabled','true');await expect(first).toHaveAttribute('aria-pressed','true');await expect(card(page).getByText('Archive key',{exact:true})).toBeVisible();
 await card(page).getByRole('button').nth(quiz[0]!.correct).click();await first.press('Enter');await expect(page.locator('#quiz-score')).toHaveText('Archive-key score: 0 / 15');
 await page.screenshot({path:'screenshots/desktop-quiz-feedback.png',fullPage:true});
 const related=card(page).getByRole('link',{name:'Read related source-linked article'});await related.focus();await page.keyboard.press('Enter');await expect(page).toHaveURL('/articles/'+quiz[0]!.link+'/');await expect(page.locator('.section-sources a').first()).toBeVisible();
});
test('all 15 questions score once, finish with a bounded summary and restart from zero',async({page})=>{
 await begin(page);
 for(let index=0;index<quiz.length;index++){
  const q=quiz[index]!;await expect(card(page).getByRole('heading')).toHaveText(q.q);await expect(card(page).locator('.option-text')).toHaveText(q.a);
  const answer=card(page).getByRole('button').nth(q.correct);await answer.focus();await answer.press(index%2?'Space':'Enter');await expect(answer).toBeFocused();
  await expect(page.locator('#quiz-explanation')).toHaveText(q.why);await expect(page.locator('#quiz-score')).toHaveText(`Archive-key score: ${index+1} / 15`);
  await answer.press('Enter');await expect(page.locator('#quiz-score')).toHaveText(`Archive-key score: ${index+1} / 15`);
  const next=page.getByRole('button',{name:index===14?'View results':'Next question'});await next.focus();await page.keyboard.press('Enter');
  if(index<14)await expect(card(page).getByRole('heading')).toBeFocused();
 }
 await expect(page.locator('#quiz-summary-heading')).toBeFocused();await expect(page.locator('#quiz-summary-score')).toHaveText('15 of 15 answers match the archived key.');await expect(page.getByRole('progressbar')).toHaveAttribute('value','15');
 await page.screenshot({path:'screenshots/desktop-quiz-summary.png',fullPage:true});
 const restart=page.getByRole('button',{name:'Restart quiz'});await restart.focus();await page.keyboard.press('Enter');await expect(card(page).getByRole('heading')).toBeFocused();await expect(page.locator('#quiz-score')).toHaveText('Archive-key score: 0 / 15');await expect(page.locator('#quiz-explanation')).toBeEmpty();await expect(card(page).getByRole('button').first()).toHaveAttribute('aria-disabled','false');await expect(page.getByRole('progressbar')).toHaveAttribute('value','0');
 await card(page).getByRole('button').nth(1).click();await restart.click();await expect(page.locator('#quiz-progress-text')).toHaveText('Question 1 of 15 · 0 answered');
});
test('320/390px quiz layouts and accessibility diagnostics, reduced motion and mobile navigation',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [320,390,1024]){
  await page.setViewportSize({width,height:844});await begin(page);await card(page).getByRole('button').first().click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const diagnostics=await page.evaluate(()=>{
   const ids=Array.from(document.querySelectorAll('[id]')).map(n=>n.id);
   const buttons=Array.from(document.querySelectorAll<HTMLButtonElement>('main button')).filter(b=>b.getBoundingClientRect().height>0);
   return {duplicates:ids.length-new Set(ids).size,small:buttons.filter(b=>b.getBoundingClientRect().height<44).length,unnamed:buttons.filter(b=>!b.textContent?.trim()&&!b.getAttribute('aria-label')).length};
  });expect(diagnostics).toEqual({duplicates:0,small:0,unnamed:0});await expect(page.getByRole('main')).toHaveCount(1);await expect(page.getByRole('heading',{level:1})).toHaveCount(1);await expect(page.getByRole('status')).toHaveAttribute('aria-atomic','true');
  if(width<400){await page.screenshot({path:`screenshots/mobile-${width}-quiz.png`,fullPage:true});const menu=page.locator('.mobile-menu summary');await menu.focus();await menu.press('Enter');await expect(page.getByRole('navigation',{name:'Mobile sections'}).getByRole('link',{name:'Quiz',exact:true})).toBeVisible();await menu.press('Escape');await expect(menu).toBeFocused();}
 }
});
test('no-JavaScript quiz has honest static fallback, no playable controls and usable article links',async({browser})=>{
 const context=await browser.newContext({baseURL:'http://127.0.0.1:4321',javaScriptEnabled:false});const page=await context.newPage();await page.goto('/learning/quiz/');await expect(page.getByText('The interactive quiz requires JavaScript.',{exact:false})).toBeVisible();await expect(page.locator('#quiz-stage')).not.toBeVisible();await expect(page.getByRole('button')).toHaveCount(0);await expect(page.locator('#quiz-readings a')).toHaveCount(new Set(quiz.map(q=>q.link)).size);await page.locator('#quiz-readings a').first().click();await expect(page.locator('.canonical-title')).toBeVisible();await context.close();
});
test('malformed quiz markup fails closed with accessible error and usable readings',async({page})=>{
 await page.route('**/learning/quiz/',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('data-correct="1"','data-correct="invalid"')});});
 await page.goto('/learning/quiz/');await expect(page.getByRole('alert')).toContainText('The interactive quiz could not be loaded.');await expect(page.locator('#quiz-start')).not.toBeVisible();await expect(page.locator('#quiz-stage')).not.toBeVisible();await expect(page.locator('#quiz-readings a').first()).toBeVisible();
});
test('hostile question, option and explanation fixture remains literal text',async({page})=>{
 const attack='<img src=x onerror=alert(1)><script>alert(1)</script>';const escaped=attack.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');const dialogs:string[]=[];page.on('dialog',d=>{dialogs.push(d.message());void d.dismiss();});
 await page.route('**/learning/quiz/',async route=>{const response=await route.fetch();let body=await response.text();body=body.replace(quiz[0]!.q,escaped).replace(quiz[0]!.a[0]!,escaped).replace(quiz[0]!.why,escaped);await route.fulfill({response,body});});
 await begin(page);await expect(card(page).getByRole('heading')).toHaveText(attack);await expect(card(page).locator('.option-text').first()).toHaveText(attack);await card(page).getByRole('button').first().click();await expect(page.locator('#quiz-explanation')).toHaveText(attack);await expect(page.locator('[data-quiz] img,[data-quiz] script')).toHaveCount(0);expect(dialogs).toEqual([]);
});
test('quiz interactions use page memory only and send no external, media or mutation requests',async({page,context})=>{
 const bad:string[]=[];page.on('request',r=>{if(new URL(r.url()).origin!=='http://127.0.0.1:4321'||r.method()!=='GET'||r.resourceType()==='media')bad.push(r.url());});page.on('websocket',w=>bad.push(w.url()));const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await begin(page);await card(page).getByRole('button').first().click();await page.getByRole('button',{name:'Next question'}).click();await card(page).getByRole('button').first().click();await page.getByRole('button',{name:'Restart quiz'}).click();
 await expect(page.locator('audio,video,iframe,form')).toHaveCount(0);expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});expect(await context.cookies()).toEqual([]);
 await page.reload();await expect(page.getByRole('button',{name:'Start 15-question review'})).toBeVisible();await expect(page.locator('#quiz-stage')).not.toBeVisible();expect(bad).toEqual([]);expect(errors).toEqual([]);
});
