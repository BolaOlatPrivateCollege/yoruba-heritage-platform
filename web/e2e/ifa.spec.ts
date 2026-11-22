import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const route = '/learning/ifa-matrix/';

test('all 256 buttons select exact names, addresses and four-bit codes without errors', async ({page}) => {
  const errors:string[]=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto(route);
  const names=await page.locator('#ifa-row option').allTextContents();
  expect(names).toHaveLength(16);
  for (let i=0;i<256;i++) {
    const button=page.locator(`[data-pair="${i+1}"]`);
    await button.evaluate(el=>el.scrollIntoView({block:'nearest',inline:'center'}));
    await button.click();
    await expect(page.locator('#ifa-status')).toContainText(`Pair ${i+1} of 256.`);
    await expect(page.locator('#ifa-row-name')).toHaveText(names[Math.floor(i/16)]!);
    await expect(page.locator('#ifa-column-name')).toHaveText(names[i%16]!);
    await expect(page.locator('#ifa-row-code')).toHaveText(`${Math.floor(i/16).toString(2).padStart(4,'0')} (index ${Math.floor(i/16)})`);
    await expect(page.locator('#ifa-column-code')).toHaveText(`${(i%16).toString(2).padStart(4,'0')} (index ${i%16})`);
    await expect(button).toBeFocused();
    await expect(page.locator('[data-pair][aria-pressed="true"]')).toHaveCount(1);
    await expect(page.locator('[data-pair][tabindex="0"]')).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test('roving keyboard focus, boundaries, activation and live announcement', async ({page}) => {
  await page.goto(route); const first=page.locator('[data-pair="1"]'); await first.focus();
  await page.keyboard.press('ArrowLeft'); await expect(first).toBeFocused();
  await page.keyboard.press('ArrowUp'); await expect(first).toBeFocused();
  await page.keyboard.press('ArrowRight'); await expect(page.locator('[data-pair="2"]')).toBeFocused();
  await expect(first).toHaveAttribute('aria-pressed','true');
  await page.keyboard.press('Space'); await expect(page.locator('#ifa-status')).toContainText('Pair 2 of 256.');
  await page.keyboard.press('ArrowDown'); await expect(page.locator('[data-pair="18"]')).toBeFocused();
  await page.keyboard.press('Home'); await expect(page.locator('[data-pair="17"]')).toBeFocused();
  await page.keyboard.press('End'); await expect(page.locator('[data-pair="32"]')).toBeFocused();
  await page.keyboard.press('ArrowRight'); await expect(page.locator('[data-pair="32"]')).toBeFocused();
  await page.keyboard.press('Control+End'); await expect(page.locator('[data-pair="256"]')).toBeFocused();
  await page.keyboard.press('ArrowDown'); await expect(page.locator('[data-pair="256"]')).toBeFocused();
  await page.keyboard.press('Enter'); await expect(page.locator('#ifa-status')).toContainText('Pair 256 of 256.');
  await expect(page.locator('#ifa-status')).toHaveAttribute('aria-live','polite');
  await expect(page.locator('#ifa-status [lang="yo"]')).toHaveCount(2);
  await page.keyboard.press('Control+Home'); await expect(first).toBeFocused();
  await page.keyboard.press('Tab'); await expect(page.getByRole('link',{name:'Ifá, Odù and mathematical comparisons'})).toBeFocused();
});

test('selectors cover all 256 pairs on 320px and reset roving focus without stealing selector focus', async ({page}) => {
  await page.setViewportSize({width:320,height:900}); await page.goto(route);
  await page.locator('[data-pair="1"]').focus(); await page.keyboard.press('ArrowRight');
  await page.locator('#ifa-row').focus();
  for(let r=0;r<16;r++) {
    await page.selectOption('#ifa-row',String(r));
    for(let c=0;c<16;c++) {
      await page.selectOption('#ifa-column',String(c));
      await expect(page.locator('#ifa-status')).toContainText(`Pair ${r*16+c+1} of 256.`);
      await expect(page.locator('[data-pair][tabindex="0"]')).toHaveCount(1);
    }
  }
  await expect(page.locator('#ifa-row')).toBeFocused();
  await page.reload(); await expect(page.locator('#ifa-status')).toContainText('Pair 1 of 256.');
});

for (const width of [1440,320,390]) test(`responsive controls, contained matrix, labels and screenshot at ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:1000}); await page.goto(route);
  await page.selectOption('#ifa-row','15'); await page.selectOption('#ifa-column','15');
  await expect(page.locator('#ifa-status')).toContainText('Pair 256 of 256.');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for (const selector of ['#ifa-row','#ifa-column','[data-pair="1"]']) {
    const box=await page.locator(selector).boundingBox(); expect(box!.height).toBeGreaterThanOrEqual(44); expect(box!.width).toBeGreaterThanOrEqual(44);
  }
  if (width < 1000) expect(await page.locator('.ifa-scroll').evaluate(el=>el.scrollWidth>el.clientWidth)).toBe(true);
  await page.locator('[data-pair="256"]').focus(); await page.keyboard.press('ArrowLeft');
  await expect(page.locator('[data-pair="255"]')).toBeInViewport();
  await expect(page.locator('tbody th').last()).toBeInViewport();
  await mkdir('screenshots',{recursive:true});
  await page.screenshot({path:`screenshots/ifa-${width}.png`,fullPage:true});
});

test('no-JavaScript fallback hides inactive controls and retains labels, maths and sources', async ({browser}) => {
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:900}});
  try {
    const page=await context.newPage(); await page.goto('http://127.0.0.1:4321'+route);
    await expect(page.locator('#ifa-fallback')).toBeVisible(); await expect(page.locator('#ifa-controls')).toBeHidden();
    await expect(page.locator('.odu-list li')).toHaveCount(16);
    await expect(page.getByText(/2⁴ = 16/)).toBeVisible();
    await page.getByRole('link',{name:'Ifá, Odù and mathematical comparisons'}).click();
    await expect(page.locator('.evidence-type')).toBeVisible();
  } finally {await context.close();}
});

test('hostile option text is inert; selection makes no external requests or persistent storage', async ({page}) => {
  const external:string[]=[]; page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4321'))external.push(r.url());});
  await page.goto(route);
  await page.locator('#ifa-row option').first().evaluate(el=>el.textContent='<img src=x onerror="window.injected=true">');
  await page.selectOption('#ifa-row','1'); await page.selectOption('#ifa-row','0');
  await expect(page.locator('#ifa-row-name')).toContainText('<img src=x');
  await expect(page.locator('#ifa-status img,#ifa-row-name img')).toHaveCount(0);
  expect(await page.evaluate(()=>('injected' in window))).toBe(false);
  expect(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie])).toEqual([0,0,'']);
  expect(external).toEqual([]);
});

test('desktop and mobile navigation discover explorer and source-backed chapters', async ({page}) => {
  await page.setViewportSize({width:1440,height:1000}); await page.goto('/learning/');
  await page.getByRole('navigation',{name:'Live learning tools'}).getByRole('link',{name:'Illustrative Ifá explorer'}).click();
  await expect(page.getByRole('navigation',{name:'Main sections'}).getByRole('link',{name:'Ifá explorer'})).toHaveAttribute('aria-current','page');
  await page.setViewportSize({width:390,height:844}); await page.goto('/');
  await page.locator('.mobile-menu summary').click();
  await page.getByRole('navigation',{name:'Mobile sections'}).getByRole('link',{name:'Ifá explorer'}).click();
  await expect(page).toHaveURL(/\/learning\/ifa-matrix\/$/);
  await page.getByRole('link',{name:'Ifá tradition and source context'}).click();
  await expect(page.locator('.evidence-note')).toBeVisible();
});

test('200-percent text layout and reduced motion retain keyboard selection without overflow', async ({page}) => {
  await page.setViewportSize({width:720,height:900}); await page.emulateMedia({reducedMotion:'reduce'}); await page.goto(route);
  await page.evaluate(()=>{document.documentElement.style.fontSize='32px';});
  await page.locator('[data-pair="1"]').focus(); await page.keyboard.press('Control+End'); await page.keyboard.press('Enter');
  await expect(page.locator('#ifa-status')).toContainText('Pair 256 of 256.');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('[data-pair="256"]')).toBeInViewport();
});
