import {test,expect} from '@playwright/test';
test('daily discovery selects one story and one illustrated figure with valid destinations',async({page})=>{
 await page.goto('/');
 for(const kind of ['story','figure']){
  const panel=page.locator(`[data-daily-list="${kind}"]`);
  const visible=panel.locator('[data-daily-item]:visible');
  await expect(visible).toHaveCount(1);
  const href=await visible.locator('h3 a').getAttribute('href');
  expect(href).toMatch(kind==='story'?/^\/tales\/[a-z0-9-]+\/$/:/^\/figures\/[a-z0-9-]+\/$/);
  expect((await page.request.get(href!)).ok()).toBeTruthy();
 }
 const image=page.locator('[data-daily-list="figure"] [data-daily-item]:visible img');
 await image.scrollIntoViewIfNeeded();
 await expect.poll(()=>image.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
});
test('daily discovery has a readable non-JavaScript fallback',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 try{
 const page=await context.newPage();
 await page.goto('/');
 await expect(page.locator('[data-daily-item]:visible')).toHaveCount(2);
 }finally{await context.close();}
});
test('story library includes six illustrated cards and reading estimates',async({page})=>{
 await page.goto('/tales/');
 await expect(page.locator('.tales-new-card img')).toHaveCount(6);
 for(const card of await page.locator('.tales-new-card').all())await expect(card).toContainText('min read');
});
