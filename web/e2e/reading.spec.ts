import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';
mkdirSync('screenshots',{recursive:true});

test('desktop overview, static reading links and keyboard skip link',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width:1440,height:1000});await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Every town has a tale.');
  await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
  await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
  await page.screenshot({path:'screenshots/desktop-home.png',fullPage:true});
  await page.getByRole('navigation',{name:'Main sections'}).getByRole('link',{name:'Research'}).click();
  await page.getByRole('link',{name:/All 113 archive articles/}).click();
  await expect(page.locator('.reading-card')).toHaveCount(113);expect(errors).toEqual([]);
});
test('search without diacritics, keyboard result navigation and exact article title',async({page})=>{
  await page.goto('/search/');const input=page.getByRole('searchbox',{name:'Words, place or subject'});
  await input.fill('Olodumare');await input.press('Enter');
  await expect(page.getByRole('status')).toHaveText(/\d+ readings? found\./);
  const first=page.locator('#search-results a').first();await expect(first).toContainText('Olódùmarè');
  await first.focus();await page.keyboard.press('Enter');await expect(page.locator('.canonical-title')).toContainText('Olódùmarè');
});
test('full article, section anchors and keyboard source citation navigation',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await page.goto('/articles/how-we-know/');
  await expect(page.locator('.canonical-body').first()).toContainText('A historian might begin');
  await page.getByRole('navigation',{name:'On this page'}).getByRole('link').first().click();
  await expect(page).toHaveURL(/#section-1$/);
  await page.screenshot({path:'screenshots/desktop-article.png',fullPage:true});
  const citation=page.locator('.section-sources a').first();await citation.focus();await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/sources\/[a-z0-9-]+\/$/);await expect(page.locator('.canonical-source-title')).not.toBeEmpty();
});
test('mobile native navigation, Escape focus return and narrow-screen article',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');
  const summary=page.locator('.mobile-menu summary');await summary.focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation',{name:'Mobile sections'})).toBeVisible();
  await page.screenshot({path:'screenshots/mobile-navigation.png',fullPage:true});
  await page.keyboard.press('Escape');await expect(summary).toBeFocused();
  await expect(page.getByRole('navigation',{name:'Mobile sections'})).not.toBeVisible();
  await page.screenshot({path:'screenshots/mobile-home.png',fullPage:true});
  await summary.press('Enter');await page.getByRole('navigation',{name:'Mobile sections'}).getByRole('link',{name:'Research',exact:true}).click();
  await page.locator('a.collection[href="/sources/"]').click();
  await expect(page.getByRole('heading',{level:1})).toContainText('Sources');
  await page.goto('/articles/deep-name-olodumare/');await expect(page.locator('.canonical-title')).toBeVisible();
  await page.locator('.mobile-toc summary').focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation',{name:'Article sections'})).toBeVisible();
  await page.locator('.mobile-toc summary').press('Enter');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.screenshot({path:'screenshots/mobile-article.png',fullPage:true});
});
test('read-only learning boundaries, sacred taxonomy and real not-found route',async({page})=>{
  await page.goto('/collections/sacred/');await expect(page.locator('.profile')).toHaveCount(24);
  await expect(page.locator('.profile').first()).toContainText('Supreme source');
  await page.goto('/learning/');await expect(page.getByRole('link',{name:/Alphabet & tone practice/})).toHaveAttribute('href','/learning/alphabet/');
  await expect(page.locator('audio')).toHaveCount(0);await expect(page.locator('form')).toHaveCount(0);
  const response=await page.goto('/does-not-exist/');expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading',{level:1})).toContainText('This reading isn’t here.');
});
test('search treats hostile input as text and makes no external requests',async({page})=>{
  const external:string[]=[];page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4321'))external.push(r.url());});
  await page.goto('/search/');await page.getByRole('searchbox').fill('<img src=x onerror=alert(1)>');
  await expect(page.getByRole('status')).toHaveText('0 readings found.');
  await expect(page.locator('#search-results img')).toHaveCount(0);expect(external).toEqual([]);
});
