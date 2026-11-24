import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';
mkdirSync('screenshots',{recursive:true});

test('Beliefs and Figures is accessible from homepage and new story library',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  await expect(page.getByRole('link',{name:/Explore beliefs & figures/})).toHaveAttribute('href','/figures/');
  await page.getByRole('navigation',{name:'Main sections'}).getByRole('link',{name:'Beliefs & Figures'}).click();
  await expect(page).toHaveURL(/\/figures\/$/);
  await expect(page.getByRole('heading',{level:1})).toContainText('Who are the figures');
  await expect(page.locator('.figure-card')).toHaveCount(28);
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex,nofollow');
  await expect(page.locator('form,input[type=file],textarea')).toHaveCount(0);
  await expect(page.locator('.figures-context')).toContainText('What did you grow up hearing?');
});
test('Èṣù is described as òrìṣà, not reduced to Satan or merely an invented hat tale',async({page})=>{
  await page.goto('/figures/esu/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Èṣù');
  await expect(page.getByText('ÒRÌṢÀ · LIVING CULTURAL KNOWLEDGE')).toBeVisible();
  await expect(page.getByText(/carries messages and offerings between human beings/)).toBeVisible();
  await expect(page.getByRole('heading',{name:/Why did so many people grow up hearing/})).toBeVisible();
  await expect(page.getByRole('link',{name:'Read the hat story'})).toHaveAttribute('href','/tales/esu-hat-two-views/');
  await expect(page.getByText(/This private preview does not collect submissions/)).toBeVisible();
  await expect(page.locator('.figure-scholar')).toHaveCount(0);
  await expect(page.locator('.figure-role')).toHaveCount(4);
  await expect(page.locator('.figure-name')).toHaveCount(4);
  await expect(page.locator('.figure-discussion-list li')).toHaveCount(4);
});
test('Olódùmarè is distinguished from specialised òrìṣà and heroes from sacred figures',async({page})=>{
  await page.goto('/figures/olodumare/');
  await expect(page.getByRole('heading',{level:1})).toHaveText('Olódùmarè');
  await expect(page.locator('.figure-detail')).toContainText('supreme source');
  await expect(page.locator('.figure-detail')).toContainText('not normally classified as a specialised òrìṣà');
  await page.goto('/figures/efunsetan-aniwura/');
  await expect(page.locator('.figure-detail')).toContainText('HISTORICAL PERSON');
  await expect(page.locator('.figure-detail')).toContainText('plays and films');
  await page.goto('/collections/sacred/');
  await expect(page.locator('.profile')).toHaveCount(24);
});
test('documentary and stories retain their original navigation and separate meaning',async({page})=>{
  await page.goto('/tales/esu-hat-two-views/');
  await expect(page.getByRole('link',{name:/Explore different accounts of/})).toHaveAttribute('href','/figures/esu/');
  await page.goto('/tales/olodumare-many-meanings/');
  await expect(page.getByRole('link',{name:/Explore different accounts of/})).toHaveAttribute('href','/figures/olodumare/');
});
for(const width of [320,390,1440]){
  test('figures hub and Èṣù profile remain readable without horizontal overflow at '+width+'px',async({page})=>{
    await page.setViewportSize({width,height:850});
    for(const [path,name] of [['/figures/','hub'],['/figures/esu/','esu']] as const){
      await page.goto(path);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
      await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex,nofollow');
      await page.screenshot({path:'screenshots/cultural-'+name+'-'+width+'.png'});
    }
  });
}

test('all fifteen uploaded illustrations load in the directory and their own profiles',async({page})=>{
  const slugs=['esu','orunmila','obatala','oduduwa','ogun','sango','osun','yemoja','oya','olokun','oba','osanyin','orisa-oko','erinle','moremi-ajasoro'];
  await page.goto('/figures/');
  for(const slug of slugs){
    const image=page.locator(`.figure-card a[href="/figures/${slug}/"] img`);
    await expect(image).toHaveCount(1);
    const src=await image.getAttribute('src');
    expect(src).toMatch(/^\/images\/.+\.webp$/);
    expect((await page.request.get(src!)).ok()).toBe(true);
  }
  for(const slug of slugs){
    await page.goto(`/figures/${slug}/`);
    const image=page.locator('.figure-artwork img');
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveCount(1);
    await expect.poll(()=>image.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
  }
  for(const slug of ['esu-hat-two-views','moremi-fire-in-the-reeds','sango-when-thunder-answered']){
    await page.goto(`/tales/${slug}/`);
    const image=page.locator('article.tale-reader figure img[src^="/images/"]');
    await expect(image).toHaveCount(1);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(()=>image.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
  }
});
