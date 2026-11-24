import {test,expect} from '@playwright/test';
test('Odù library has 256 entries and diacritic-insensitive filtering',async({page})=>{
 await page.goto('/learning/ifa/odu/');
 await expect(page.locator('.odu-card')).toHaveCount(256);
 await expect(page.locator('[data-odu]')).toHaveCount(240);
 await page.locator('#odu-search').fill('11110000');
 await expect(page.locator('[data-odu]:visible')).toHaveCount(1);
 await page.locator('[data-odu]:visible a').click();
 await expect(page).toHaveURL(/ogbe-oyeku\/$/);
 await expect(page.locator('main')).toContainText('11110000');
 await page.getByRole('link',{name:/Explore reversed pairing/}).click();
 await expect(page).toHaveURL(/oyeku-ogbe\/$/);
 await expect(page.locator('main')).toContainText('00001111');
});
test('library is readable without scripts and links to every static entry',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:850}});
 try{const page=await context.newPage();await page.goto('/learning/ifa/odu/');
 await expect(page.locator('.odu-card:visible')).toHaveCount(256);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const links=await page.locator('.odu-card a').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')!));
 for(const href of links)expect((await page.request.get(href)).ok()).toBe(true);
 }finally{await context.close();}
});