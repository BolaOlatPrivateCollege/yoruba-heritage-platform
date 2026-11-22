import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';

test('article context keyboard disclosure opens and closes with visible focus and evidence',async({page})=>{
  await page.goto('/articles/ile-ife/');const summary=page.locator('.context-card summary');await summary.focus();await expect(summary).toBeFocused();await summary.press('Enter');await expect(page.locator('.context-card')).toHaveAttribute('open','');await expect(page.getByRole('heading',{name:'Evidence and limits',exact:true})).toBeVisible();await expect(page.locator('.context-card summary')).toHaveCSS('outline-style','solid');
  await page.locator('.context-source a').focus();await expect(page.locator('.context-source a')).toBeFocused();await summary.focus();await summary.press('Space');await expect(page.locator('.context-card')).not.toHaveAttribute('open');
});

test('native disclosures retain full reading and provenance without JavaScript',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  try{const page=await context.newPage();for(const id of ['ile-ife','know-adire']){await page.goto('http://127.0.0.1:4321/articles/'+id+'/');await page.locator('.context-card summary').click();await expect(page.locator('.context-summary')).toBeVisible();await expect(page.locator('.context-provenance')).toContainText('unknown');await expect(page.locator('.context-source a')).toHaveAttribute('href',/^https:/);await expect(page.locator('.context-draft')).toContainText('no public release granted');}}finally{await context.close();}
});

for(const width of [1440,320,390])test(`tradition context is usable with desktop/mobile screenshots at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await mkdir('screenshots',{recursive:true});
  for(const [id,name] of [['ile-ife','ife'],['know-adire','adire']] as const){await page.goto('/articles/'+id+'/');await page.locator('.context-card summary').click();await page.locator('.context-review').scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.locator('.article-context').scrollIntoViewIfNeeded();await page.locator('.article-context').screenshot({path:`screenshots/traditions-${name}-${width}.png`});}
});

test('articles without cleared entries have no empty section or internal narrative',async({page})=>{
  for(const id of ['heritage','how-we-know','know-gelede']){await page.goto('/articles/'+id+'/');await expect(page.locator('.article-context')).toHaveCount(0);await expect(page.locator('body')).not.toContainText('INTERNAL-OSUN-CONTEXT');await expect(page.locator('.bibliography')).toBeVisible();}
});

test('context browsing is local, stateless and readable with enlarged text',async({page})=>{
  const external:string[]=[],mutations:string[]=[];page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4321'))external.push(r.url());if(!['GET','HEAD'].includes(r.method()))mutations.push(r.method());});
  await page.setViewportSize({width:720,height:900});await page.goto('/articles/know-adire/');await page.locator('.context-card summary').click();await page.evaluate(()=>{document.documentElement.style.fontSize='32px';});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('.context-summary')).toBeVisible();
  expect(external).toEqual([]);expect(mutations).toEqual([]);expect(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie])).toEqual([0,0,'']);await expect(page.locator('.article-context form,.article-context input,.article-context iframe')).toHaveCount(0);
});

test('corrected pilot classifications remain accurate before and after keyboard disclosure',async({page})=>{
  for(const [id,heading,status,label] of [
    ['ile-ife','Unresolved object interpretations','Unresolved object interpretation','no documented historical dispute'],
    ['know-adire','Museum-mediated reports','Museum-mediated report','intermediary']
  ] as const){
    await page.goto('/articles/'+id+'/');const module=page.locator('.article-context');
    await expect(module.getByRole('heading',{level:3,name:heading,exact:true})).toBeVisible();
    await expect(module.getByRole('heading',{name:'Disputed histories',exact:true})).toHaveCount(0);await expect(module.getByRole('heading',{name:'Community traditions',exact:true})).toHaveCount(0);
    await expect(module.locator('.context-card-label')).toContainText(label);await module.locator('summary').focus();await page.keyboard.press('Enter');
    await expect(module.locator('.context-status')).toContainText(status);await expect(module.locator('.context-status')).toContainText('Version 2');await expect(module.locator('.context-provenance')).toContainText('unknown');
  }
});
