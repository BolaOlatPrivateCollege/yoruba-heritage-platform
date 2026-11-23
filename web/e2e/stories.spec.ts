import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const ids=['ile-ife-art-city-evidence','adire-indigo-design','gelede-performance-knowledge','osun-osogbo-living-landscape'];

test('Research tab preserves all four documentary stories and reading journeys',async({page})=>{
  await page.goto('/research/');await expect(page.locator('.story-card')).toHaveCount(4);await expect(page.locator('.reader-journey')).toHaveCount(4);await expect(page.locator('.reader-journey li')).toHaveCount(20);
  await page.getByRole('link',{name:'All documentary stories and reading journeys →'}).click();await expect(page).toHaveURL(/\/stories\/$/);
  await expect(page.getByRole('heading',{level:1})).toContainText('Stay for');
  await page.getByRole('link',{name:'Read A face, a city, a thousand questions'}).click();await expect(page.locator('[data-story]')).toHaveAttribute('data-story',ids[0]!);
});

test('keyboard moves through a story, section anchor, exact evidence passage and next reading',async({page})=>{
  await page.goto('/stories/'+ids[0]+'/');
  const toc=page.locator('.story-toc summary');await toc.focus();await toc.press('Enter');
  const section=page.getByRole('navigation',{name:'Story sections'}).getByRole('link',{name:'The evidence in a small hole'});await section.focus();await section.press('Enter');await expect(page).toHaveURL(/#holes$/);
  const source=page.locator('#holes-record .story-trace a');await source.focus();await source.press('Enter');await expect(page).toHaveURL(/#evidence-f-ife-chicago-holes$/);
  await expect(page.locator('#evidence-f-ife-chicago-holes')).toBeInViewport();
  const next=page.locator('.story-next h2 a');await next.focus();await next.press('Enter');await expect(page).toHaveURL(/\/stories\/adire-indigo-design\/$/);
});

test('all four long-form drafts work without JavaScript and retain evidence and archive links',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  try{const page=await context.newPage();for(const id of ids){await page.goto('http://127.0.0.1:4321/stories/'+id+'/');await expect(page.locator('.draft-banner')).toHaveText('Editorial research draft · not reviewed for public release');await expect(page.locator('.story-section')).toHaveCount(12);await expect(page.locator('#read-evidence')).toBeVisible();await expect(page.locator('.story-related a').first()).toHaveAttribute('href',/^\/articles\/.+#section-\d+$/);await expect(page.locator('.story-prose').first()).toBeVisible();}
  }finally{await context.close();}
});

for(const width of [1440,320,390])test(`editorial discovery and long-form reading stay usable with screenshots at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await mkdir('screenshots',{recursive:true});
  for(const [route,name] of [['/','home'],['/stories/','index'],['/stories/adire-indigo-design/','adire']] as const){
    await page.goto(route);await page.locator('footer').scrollIntoViewIfNeeded();await page.evaluate(()=>scrollTo(0,0));
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    for(const image of await page.locator('main img').all()){await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);}
    await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`screenshots/stories-${name}-${width}.png`,fullPage:true});
  }
  if(width===1440){await page.goto('/stories/'+ids[0]+'/');await page.screenshot({path:'screenshots/stories-ife-1440.png',fullPage:true});}
  if(width===390)for(const id of ids.slice(2)){await page.goto('/stories/'+id+'/');await page.locator('.story-diagram').scrollIntoViewIfNeeded();await page.evaluate(()=>scrollTo(0,0));expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`screenshots/stories-${id}-390.png`,fullPage:true});}
});

test('mobile navigation reaches Stories and journeys return to unchanged canonical prose',async({page})=>{
  await page.setViewportSize({width:320,height:900});await page.goto('/');await page.locator('.mobile-menu summary').click();
  await page.getByRole('navigation',{name:'Mobile sections'}).getByRole('link',{name:'Stories',exact:true}).click();
  await page.locator('.mobile-menu summary').click();
  await expect(page.getByRole('navigation',{name:'Mobile sections'}).getByRole('link',{name:'Stories',exact:true})).toHaveAttribute('aria-current','page');
  await page.locator('.mobile-menu summary').click();
  await expect(page.getByRole('heading',{name:/Who tells it differently/})).toBeVisible();
  await page.goto('/stories/');
  await page.locator('#journey-objects li').nth(1).getByRole('link').click();await expect(page).toHaveURL(/\/articles\/ile-ife\/$/);await expect(page.locator('.canonical-title')).toContainText('Ilé-Ifẹ̀');
  await expect(page.locator('.canonical-body')).toHaveCount(4);
});

test('story images and browsing send no third-party requests or mutations and store no state',async({page})=>{
  const external:string[]=[],mutations:string[]=[];page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4321'))external.push(r.url());if(!['GET','HEAD'].includes(r.method()))mutations.push(r.method());});
  await page.goto('/stories/adire-indigo-design/');await page.locator('.story-diagram').scrollIntoViewIfNeeded();
  await expect(page.locator('.editorial-image img')).toBeVisible();
  expect(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie])).toEqual([0,0,'']);
  expect(external).toEqual([]);expect(mutations).toEqual([]);await expect(page.locator('main form,main input,main iframe')).toHaveCount(0);
});

test('200-percent text remains readable without overflow and research-draft status survives navigation',async({page})=>{
  await page.setViewportSize({width:720,height:900});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/stories/osun-osogbo-living-landscape/');
  await page.evaluate(()=>{document.documentElement.style.fontSize='32px';});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('.story-next h2 a').focus();await page.keyboard.press('Enter');await expect(page.locator('.draft-banner')).toContainText('not reviewed for public release');
  await expect(page.locator('.story-reading-meta')).toContainText('Rights unknown');
});
