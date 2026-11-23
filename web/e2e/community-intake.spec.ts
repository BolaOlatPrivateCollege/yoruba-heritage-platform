import {test,expect} from '@playwright/test';

test('community practice is visible from the public reader but cannot submit',async({page})=>{
  await page.goto('/community/');
  await expect(page.getByRole('heading',{level:1})).toHaveText('What did your people tell you?');
  const link=page.getByRole('link',{name:/Try the contribution walkthrough/});
  await expect(link).toHaveAttribute('href','/community/share/');
  await link.click();
  await expect(page).toHaveURL(/\/community\/share\/$/);
  await expect(page.getByRole('heading',{level:1})).toContainText('How would you');
  await expect(page.getByText(/not a live submission form/)).toBeVisible();
  await expect(page.locator('main form,main input[type=file],main iframe')).toHaveCount(0);
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex,nofollow');
  await expect(page.locator('#cv-preview')).toBeVisible();
});

test('a pre-linked Èṣù story allows a safe local preview with no network, cookies or storage',async({page,context})=>{
  const unsafe:string[]=[],errors:string[]=[];
  page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4321')||r.method()!=='GET')unsafe.push(r.url());});
  page.on('websocket',w=>unsafe.push(w.url()));
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/tales/esu-hat-two-views/');
  await page.getByRole('link',{name:/Practise telling another version/}).click();
  await expect(page).toHaveURL(/\/community\/share\/\?story=esu-hat-two-views$/);
  await expect(page.locator('#cv-context')).toHaveValue('esu-hat-two-views');
  await page.locator('#cv-type').selectOption('inherited-account');
  await expect(page.locator('#cv-prompt')).toContainText('remember hearing');
  await page.locator('#cv-title').fill('A tale with two sides');
  await page.locator('#cv-account').fill('A fictional teller in an imagined village remembered a different ending to the traveller story.');
  await page.locator('#cv-place').fill('Imagined village');
  await page.locator('#cv-age').selectOption('under18');
  await page.getByRole('button',{name:'Preview my example locally'}).click();
  await expect(page.locator('#cv-result')).toBeHidden();
  await expect(page.locator('#cv-feedback')).toContainText('permission');
  await page.locator('#cv-rights').check();
  await page.getByRole('button',{name:'Preview my example locally'}).click();
  await expect(page.locator('#cv-result')).toBeVisible();
  await expect(page.locator('#cv-result-name')).toHaveText('A tale with two sides');
  await expect(page.locator('#cv-result-account')).toContainText('A fictional teller');
  await expect(page.locator('#cv-result-note')).toContainText('trusted teacher or guardian');
  await expect(page.locator('#cv-feedback')).toContainText('No story, name, permission or account has been sent or saved');
  expect(unsafe).toEqual([]);expect(errors).toEqual([]);
  expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
  expect(await context.cookies()).toEqual([]);
  await page.reload();
  await expect(page.locator('#cv-account')).toHaveValue('');
  await expect(page.locator('#cv-result')).toBeHidden();
});

test('sample narrative with HTML-like hostile strings is literal and never injected',async({page})=>{
  await page.goto('/community/share/?story=invalid');
  await expect(page.locator('#cv-context')).toHaveValue('none');
  const hostile='<img src=x onerror=alert(1)> A storyteller remembers a made-up village tale.';
  await page.locator('#cv-title').fill('A fictional sample');
  await page.locator('#cv-account').fill(hostile);
  await page.locator('#cv-rights').check();
  await page.getByRole('button',{name:'Preview my example locally'}).click();
  await expect(page.locator('#cv-result-account')).toHaveText(hostile);
  await expect(page.locator('#cv-result img, #cv-result script')).toHaveCount(0);
  await page.getByRole('button',{name:'Clear this example'}).click();
  await expect(page.locator('#cv-result')).toBeHidden();
  await expect(page.locator('#cv-account')).toHaveValue('');
  await expect(page.locator('#cv-rights')).not.toBeChecked();
});

test('without JavaScript the guided preview does not expose a working submission path',async({browser})=>{
  const context=await browser.newContext({baseURL:'http://127.0.0.1:4321',javaScriptEnabled:false});
  try{
    const page=await context.newPage();
    await page.goto('/community/share/');
    await expect(page.locator('.community-nojs')).toBeVisible();
    await expect(page.locator('#cv-preview')).not.toBeVisible();
    await expect(page.locator('main form,main input[type=file]')).toHaveCount(0);
  }finally{await context.close();}
});

for(const width of [320,390,1440]){
  test('community walkthrough has no horizontal overflow at '+width+'px',async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto('/community/share/');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await expect(page.getByRole('main')).toHaveCount(1);
    await expect(page.getByRole('heading',{level:1})).toHaveCount(1);
    const controls=page.locator('#cv-preview,#cv-clear');
    for(const control of await controls.all())expect(await control.evaluate(el=>el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
    await page.screenshot({path:'screenshots/community-preview-'+width+'.png',fullPage:true});
  });
}
