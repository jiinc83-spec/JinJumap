import {test,expect} from '@playwright/test';
test('reference-inspired lime UI preserves action filters, details and no external requests',async({page})=>{
 const external:string[]=[];
 page.on('request',r=>{if(!['127.0.0.1','localhost'].includes(new URL(r.url()).hostname))external.push(new URL(r.url()).hostname);});
 await page.goto('/?preview=fresh');
 await expect(page.getByRole('heading',{name:/작은 실천 하나/})).toBeVisible();
 await expect(page.locator('.fresh-card-art')).toHaveCount(12);
 await page.getByRole('button',{name:'자원순환',exact:true}).click();
 await expect(page.locator('.action-store-card')).toHaveCount(2);
 await page.locator('.action-store-card').first().click();
 await expect(page.getByRole('dialog')).toContainText('올리브영 진주평거점');
 await expect(page.getByRole('dialog')).toContainText('현장 확인 전');
 await page.keyboard.press('Escape');
 await page.getByLabel('실천 장소 검색').fill('없는매장');
 await expect(page.getByText('조건에 맞는 조사 후보가 없어요')).toBeVisible();
 await page.getByRole('button',{name:'전체 다시 보기'}).click();
 if(test.info().project.name==='mobile'){
  await page.getByRole('navigation',{name:'모바일 메뉴'}).getByRole('button',{name:'이용 안내'}).click();
  await expect(page.getByRole('dialog')).toContainText('작은 실천, 정확한 정보');
  await page.keyboard.press('Escape');
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(external).toEqual([]);
});
