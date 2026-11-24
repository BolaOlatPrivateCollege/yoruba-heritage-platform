import {test,expect} from '@playwright/test';

for(const slug of ['laughing-mask','esu-hat-two-views','olodumare-many-meanings','ijapa-feast-nobody-could-finish','moremi-fire-in-the-reeds','lisabi-farmers-promise','sango-when-thunder-answered','timi-gbonka-two-champions']){
  test('six chapter story has direct accessible chapter navigation: '+slug,async({page})=>{
    await page.goto('/tales/'+slug+'/');
    const chapters=page.locator('.tale-chapter');
    await expect(chapters).toHaveCount(6);
    const index=page.locator('#chapter-index');
    await expect(index).toBeVisible();
    await expect(page.locator('.tale-chapter-next')).toHaveCount(6);
    await expect(chapters.first().getByRole('link',{name:/Previous chapter/})).toHaveCount(0);
    await expect(chapters.last().getByRole('link',{name:/Next chapter/})).toHaveCount(0);
    for(let i=0;i<6;i++){
      const chapter=chapters.nth(i);
      const id=await chapter.getAttribute('id');
      expect(id).toBeTruthy();
      await expect(chapter.getByRole('link',{name:/Chapter index/})).toHaveAttribute('href','#chapter-index');
      if(i<5){
        const nextId=await chapters.nth(i+1).getAttribute('id');
        await expect(chapter.getByRole('link',{name:/Next chapter/})).toHaveAttribute('href','#'+nextId);
      }
      if(i>0){
        const previousId=await chapters.nth(i-1).getAttribute('id');
        await expect(chapter.getByRole('link',{name:/Previous chapter/})).toHaveAttribute('href','#'+previousId);
      }
    }
    await chapters.first().getByRole('link',{name:/Next chapter/}).click();
    await expect(page).toHaveURL(new RegExp('#'+await chapters.nth(1).getAttribute('id')+'$'));
    await chapters.nth(1).getByRole('link',{name:/Chapter index/}).click();
    await expect(page).toHaveURL(/#chapter-index$/);
  });
}
