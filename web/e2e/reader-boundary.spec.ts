import {test,expect} from '@playwright/test';

const livingRoutes=[
  '/', '/tales/', '/tales/laughing-mask/','/tales/esu-hat-two-views/',
  '/tales/olodumare-many-meanings/','/figures/','/figures/esu/',
  '/figures/olodumare/','/places/','/community/','/learning/'
];
test('Stories, Beliefs, Places, Community and Learning have no embedded research/claim apparatus',async({page})=>{
  for(const route of livingRoutes){
    await page.goto(route);
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex,nofollow');
    await expect(page.locator('main .story-source,main .section-sources,main .figure-scholar,main .evidence-note')).toHaveCount(0);
    await expect(page.locator('main a[href^="/sources/"],main a[href^="/articles/"],main a[href^="/collections/"],main a[href^="/stories/"],main a[href="/about/"]')).toHaveCount(0);
    await expect(page.locator('main form,main input[type="file"],main textarea')).toHaveCount(0);
  }
});
test('Research is the exclusive navigation entry to scholarly sources and old documentary material',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  const nav=page.getByRole('navigation',{name:'Main sections'});
  await expect(nav.getByRole('link',{name:'Research',exact:true})).toHaveAttribute('href','/research/');
  await expect(nav.getByRole('link',{name:'Sources',exact:true})).toHaveCount(0);
  await expect(nav.getByRole('link',{name:'Library',exact:true})).toHaveCount(0);
  await nav.getByRole('link',{name:'Research',exact:true}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText('Research & Documentary Archive');
  await expect(page.locator('a[href="/sources/"]')).toHaveCount(1);
  await expect(page.locator('a[href="/research/community-leads/"]')).toHaveCount(1);
  await expect(page.locator('.story-card')).toHaveCount(4);
  await expect(page.locator('.reader-journey')).toHaveCount(4);
  await page.getByRole('link',{name:/Community-history provenance/}).click();
  await expect(page.locator('.community-record')).toHaveCount(6);
});
test('Community invites first-hand and inherited accounts without collecting or ranking them',async({page})=>{
  await page.goto('/community/');
  await expect(page.getByRole('heading',{level:1})).toHaveText('What did your people tell you?');
  await expect(page.getByText('“I was there.”')).toBeVisible();
  await expect(page.getByText('“My grandparents used to say…”')).toBeVisible();
  await expect(page.getByText(/Not a contest over whose story wins/)).toBeVisible();
  await expect(page.locator('main form,main input,main textarea,main audio')).toHaveCount(0);
});
for(const width of [320,390,1440]){
 test('Reader/Research boundary stays usable at '+width+'px',async({page})=>{
   await page.setViewportSize({width,height:900});
   for(const route of ['/','/community/','/places/','/research/']){
     await page.goto(route);
     expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
   }
 });
}