import {test,expect} from '@playwright/test';

test('stories library links to a distinct heroes, heroines and mystery collection',async({page})=>{
 await page.goto('/tales/');
 await page.getByRole('link',{name:/Explore Warriors, Heroines & Legendary Mysteries/}).click();
 await expect(page).toHaveURL(/\/tales\/legendary-figures\//);
 await expect(page.getByRole('heading',{level:1})).toContainText('Warriors, heroines');
});

test('legendary discovery offers reader-friendly but properly labelled accounts',async({page})=>{
 await page.setViewportSize({width:320,height:780});
 await page.goto('/tales/legendary-figures/');
 const cards=page.locator('.heritage-lead-card');
 await expect(cards).toHaveCount(30);
 await expect(page.locator('#origins')).toBeVisible();
 await expect(page.locator('#heroines')).toHaveCount(1);
 await expect(page.locator('#commanders')).toHaveCount(1);
 await expect(page.locator('#rivalries')).toHaveCount(1);
 await expect(page.locator('#unsung')).toHaveCount(1);
 await expect(page.locator('#mystical')).toHaveCount(1);
 await expect(page.getByText(/not complete stories, first-hand interviews or verified accounts/)).toBeVisible();
 await expect(page.getByText('Efúnsetán Aníwúrà')).toBeVisible();
 await expect(page.getByText('Ṣàngó',{exact:true})).toBeVisible();
 await expect(page.getByText(/no live community contribution or publication/)).toHaveCount(1);
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
 expect(overflow).toBe(false);
});

test('legend cards and navigation remain plain public-reading content without intake',async({page})=>{
 await page.goto('/tales/legendary-figures/');
 await expect(page.locator('form')).toHaveCount(0);
 await expect(page.locator('input[type=file]')).toHaveCount(0);
 await expect(page.locator('button[type=submit]')).toHaveCount(0);
 await page.getByRole('link',{name:/Women whose stories refuse to disappear/}).click();
 await expect(page).toHaveURL(/#heroines$/);
});

test('four featured legendary figures lead to complete six-chapter stories',async({page})=>{
 await page.goto('/tales/legendary-figures/');
 const hrefs=['moremi-fire-in-the-reeds','lisabi-farmers-promise','sango-when-thunder-answered','timi-gbonka-two-champions'];
 const links=page.locator('.heritage-lead-read');
 await expect(links).toHaveCount(hrefs.length);
 for(const slug of hrefs){
  await expect(page.locator(`.heritage-lead-read[href="/tales/${slug}/"]`)).toHaveCount(1);
 }
 await page.locator('.heritage-lead-read[href="/tales/moremi-fire-in-the-reeds/"]').click();
 await expect(page).toHaveURL(/\/tales\/moremi-fire-in-the-reeds\//);
 await expect(page.locator('.tale-chapter')).toHaveCount(6);
 await expect(page.getByText(/Story type:/)).toBeVisible();
});
