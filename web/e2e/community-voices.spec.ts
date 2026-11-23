import {test,expect} from '@playwright/test';

const routes=['/community/','/community/contribute/','/tales/esu-hat-two-views/','/figures/esu/'];
test('guidance is reachable from Community, stories and beliefs but has no data submission mechanisms',async({page})=>{
 await page.goto('/community/');
 await page.getByRole('link',{name:/Explore how to share your version/}).click();
 await expect(page).toHaveURL(/\/community\/contribute\/$/);
 await expect(page.getByRole('heading',{level:1})).toHaveText('Tell it as you heard it.');
 await expect(page.locator('.voice-guide')).toHaveCount(5);
 await expect(page.locator('.voice-guide ol li')).toHaveCount(15);
 await expect(page.getByText(/Preview only:/)).toBeVisible();
 await expect(page.locator('form,input,textarea,select,[contenteditable],audio,video,iframe')).toHaveCount(0);
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex,nofollow');
});
test('story and Èṣù profile offer a safe discussion path instead of a live form',async({page})=>{
 await page.goto('/tales/esu-hat-two-views/');
 await expect(page.getByRole('link',{name:/Explore how to tell another version/})).toHaveAttribute('href','/community/contribute/#another-telling');
 await page.goto('/figures/esu/');
 await expect(page.getByRole('link',{name:/Explore how to share your community/})).toHaveAttribute('href','/community/contribute/#belief-name');
});
test('reader cannot transmit, persist or publish a contribution in this prototype',async({page,context})=>{
 const requests:string[]=[];
 page.on('request',r=>{if(!['GET','HEAD'].includes(r.method()))requests.push(r.method()+' '+r.url());});
 for(const route of routes){await page.goto(route);await expect(page.locator('main form,main input,main textarea,main [contenteditable]')).toHaveCount(0);}
 await page.goto('/community/contribute/');
 await page.getByRole('link',{name:/A story from my family/}).click();
 await expect(page).toHaveURL(/#family-memory$/);
 expect(requests).toEqual([]);
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
 expect(await context.cookies()).toEqual([]);
});
for(const width of [320,390,1440]){
 test('contribution guide remains legible with no horizontal overflow at '+width+'px',async({page})=>{
   await page.setViewportSize({width,height:900});
   await page.goto('/community/contribute/');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
   await expect(page.getByRole('heading',{level:1})).toBeVisible();
 });
}
