import {test,expect} from '@playwright/test';
test('living stories entry is readable and keeps documentary archive accessible',async({page})=>{
  await page.goto('/');
  await expect(page.getByRole('heading',{name:/Every town has a tale/i})).toBeVisible();
  await page.getByRole('link',{name:/Explore living stories/}).click();
  await expect(page).toHaveURL(/\/tales\/$/);
  await expect(page.getByRole('heading',{name:/Who tells it differently/i})).toBeVisible();
  await expect(page.getByRole('link',{name:'Read the complete six-chapter story'})).toBeVisible();
  await expect(page.getByText('This prototype has no working submission form', {exact:false})).toBeVisible();
  await expect(page.getByRole('link',{name:/Read the documentary edition/})).toHaveAttribute('href','/stories/');
});
test('complete story renders six chapters with clear fiction status and no bibliography in body',async({page})=>{
  await page.goto('/tales/laughing-mask/');
  await expect(page.getByRole('heading',{level:1,name:'Who Was the Laughing Mask Talking About?'})).toBeVisible();
  await expect(page.locator('.tale-chapter')).toHaveCount(6);
  await expect(page.locator('.tale-disclosure')).toContainText('fictional');
  await expect(page.locator('.tale-chapter').first()).toContainText('By breakfast');
  await expect(page.locator('.tale-chapter').last()).toContainText('room for their version');
  await expect(page.locator('.tale-paper')).not.toContainText('Bibliography');
  await expect(page.locator('.tale-outro')).toContainText('No personal information is collected');
  await expect(page.locator('audio')).toHaveCount(0);
  await expect(page.locator('form')).toHaveCount(0);
});
for(const width of [320,390,1440]){
  test('living stories and complete fictional tale have no horizontal document overflow at '+width+'px',async({page})=>{
    await page.setViewportSize({width,height:840});
    for(const path of ['/tales/','/tales/laughing-mask/']){
      await page.goto(path);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
      expect(overflow).toBe(false);
      await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex,nofollow');
    }
  });
}