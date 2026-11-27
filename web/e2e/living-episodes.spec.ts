import {test,expect} from '@playwright/test';
import {mkdirSync,existsSync} from 'node:fs';
import {narratedOgun} from '../src/lib/ogun-story-audio';
import {illustratedOgun} from '../src/lib/ogun-story-art';
mkdirSync('screenshots',{recursive:true});
const episodes=[
  {slug:'esu-hat-two-views',title:'The Hat That Divided the Road'},
  {slug:'olodumare-many-meanings',title:'The Name That Would Not Fit Into One Answer'},
  {slug:'ijapa-feast-nobody-could-finish',title:'Ìjàpá and the Feast Nobody Could Finish'},
  {slug:'moremi-fire-in-the-reeds',title:'Mọ́remí and the Fire in the Reeds'},
  {slug:'lisabi-farmers-promise',title:"Lísàbí and the Farmers' Promise"},
  {slug:'sango-when-thunder-answered',title:'Ṣàngó: When Thunder Answered'},
  {slug:'timi-gbonka-two-champions',title:'Tìmì and Gbónká: The Duel That Would Not End'},
  {slug:'ogun-path-nobody-could-open',title:'Ògún: The Path Nobody Could Open'},
  {slug:'osun-when-the-world-forgot-her',title:'Ọ̀ṣun: When the World Forgot Her'},
  {slug:'yemoja-river-that-remembered',title:'Yemọja: The River That Remembered'},
  {slug:'oya-before-the-wind-changed',title:'Ọya: Before the Wind Changed'},
  {slug:'olokun-secrets-beneath-the-water',title:'Olókun: The Secrets Beneath the Water'}
];

test('the library offers twelve complete linked stories and preserves Gẹ̀lẹ̀dẹ́',async({page})=>{
  await page.goto('/tales/');
  await expect(page.locator('.tales-new-card')).toHaveCount(12);
  await expect(page.getByRole('link',{name:'Read the complete six-chapter story'})).toHaveAttribute('href','/tales/laughing-mask/');
  for(const e of episodes){
    await expect(page.locator('.tales-new-card h3').getByRole('link',{name:e.title})).toHaveAttribute('href','/tales/'+e.slug+'/');
  }
});
for(const e of episodes){
  test(e.slug+' is complete, clearly typed and offers community questions without collecting data',async({page})=>{
    await page.goto('/tales/'+e.slug+'/');
    await expect(page.getByRole('heading',{level:1,name:e.title})).toBeVisible();
    await expect(page.locator('.tale-chapter')).toHaveCount(6);
    await expect(page.locator('.tale-disclosure')).toContainText(/not|no literal|invented|invents|imagined/i);
    await expect(page.locator('.tale-outro')).toContainText('No submission, personal data or audio is collected');
    const narrated=narratedOgun(e.slug);
    await expect(page.locator('main form, main input:not([data-continuous])')).toHaveCount(0);
    const fullOsun=e.slug==='osun-when-the-world-forgot-her'&&existsSync('public/audio/stories/osun/osun-full-narration.mp3');
    await expect(page.locator('main audio')).toHaveCount(narrated?6:fullOsun?1:0);
    if(fullOsun){
      const player=page.locator('main audio');
      await expect(player).toHaveAttribute('src','/audio/stories/osun/osun-full-narration.mp3');
      await expect(player).toHaveAttribute('preload','none');
      expect((await page.request.get('/audio/stories/osun/osun-full-narration.mp3')).ok()).toBe(true);
    }
    await expect(page.locator('.tale-scene')).toHaveCount(illustratedOgun(e.slug)?6:0);
    if(narrated){
      await expect(page.locator('[data-continuous]')).not.toBeChecked();
      for(const [i,track] of narrated.entries()){
        const audio=page.locator('main audio').nth(i);
        await expect(audio).toHaveAttribute('src',track.src);
        await expect(audio).toHaveAttribute('preload','none');
        expect((await page.request.get(track.src)).ok()).toBe(true);
      }
    }
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex,nofollow');
    await expect(page.locator('.tale-paper')).not.toContainText('Bibliography');
    await expect(page.locator('.tale-chapter').last()).not.toBeEmpty();
  });
}
for(const width of [320,390,1440]){
  test('new tales remain readable without document overflow at '+width+'px',async({page})=>{
    await page.setViewportSize({width,height:900});
    for(const e of episodes){
      await page.goto('/tales/'+e.slug+'/');
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
      await expect(page.getByRole('navigation',{name:'Story chapters'})).toBeVisible();
      await page.screenshot({path:'screenshots/'+e.slug+'-'+width+'.png',fullPage:true});
    }
  });
}