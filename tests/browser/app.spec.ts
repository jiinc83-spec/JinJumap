import {readFileSync} from 'node:fs';
import {test,expect} from '@playwright/test';
test('search, filters, details, directions, source and history work',async({page})=>{
 await page.goto('/');
 await expect(page.getByRole('heading',{name:'우리 동네 실천지도 평거동'})).toBeVisible();
 await expect(page.locator('.store-card')).toHaveCount(12);
 await page.getByRole('button',{name:'탄소중립포인트',exact:true}).click();
 await expect(page.locator('.store-card')).toHaveCount(3);
 await page.getByLabel('매장명 또는 주소 검색').fill('한살림');
 await expect(page.locator('.store-card')).toHaveCount(1);
 await page.locator('.store-card').click();
 const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
 await expect(dialog.getByRole('heading',{name:'한살림 진주매장',exact:true})).toBeVisible();
 await expect(dialog).toContainText('500원/건');await expect(dialog).toContainText('미실시');
 await dialog.getByRole('button',{name:'카카오맵 길찾기',exact:true}).click();
 await expect(dialog.getByRole('status').filter({hasText:'길찾기 위치가 아직 제공되지 않았어요'})).toBeVisible();
 const href=await dialog.getByRole('link',{name:/카카오맵에서 찾기/}).getAttribute('href');expect(decodeURIComponent(href!)).toContain('경남 진주시 평거로9번길 18');expect(new URL(href!).hostname).toBe('map.kakao.com');
 await expect(dialog.getByRole('link',{name:/첨부 조사보고서/})).toHaveAttribute('href','/research/report.pdf#page=10');
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();
 await page.getByLabel('매장명 또는 주소 검색').fill('없는매장');await expect(page.getByText('검색 결과가 없어요')).toBeVisible();
 await page.getByRole('button',{name:'필터 초기화'}).click();await expect(page.locator('.store-card')).toHaveCount(12);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await expect(page.locator('.map-note')).toBeVisible();
 if(test.info().project.name==='desktop'){expect(await page.locator('.map-panel').evaluate(e=>e.getBoundingClientRect().height)).toBeLessThan(600);}
 await page.screenshot({path:`/tmp/green-map-${test.info().project.name}.png`,fullPage:true});
});
test('deep links and guide remain accessible',async({page})=>{
 await page.goto('/#store=oliveyoung');await expect(page.getByRole('dialog')).toContainText('올리브영 진주평거점');
 await page.getByRole('button',{name:'상세 닫기'}).click();
 await page.getByRole('button',{name:/이용 안내/}).click();await expect(page.getByRole('dialog')).toContainText('공식 친환경 인증점');
 await page.keyboard.press('Escape');
 if(test.info().project.name==='mobile'){await page.getByRole('button',{name:'목록',exact:true}).click();await expect(page.locator('.map-panel')).not.toBeVisible();await page.getByRole('button',{name:'지도',exact:true}).click();await expect(page.locator('.map-panel')).toBeVisible();}
});

test('requested activity groups use only sourced candidates and empty state', async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'제로웨이스트·리필',exact:true}).click();
 await expect(page.locator('.store-card')).toHaveCount(0);
 await expect(page.getByText('검색 결과가 없어요')).toBeVisible();
 await page.getByRole('button',{name:'친환경 교통·에너지',exact:true}).click();
 await expect(page.locator('.store-card')).toHaveCount(2);
 await expect(page.locator('.store-list')).toContainText('바이크타니');
 await expect(page.locator('.store-list')).toContainText('삼천리자전거 서진주점');
 await page.getByRole('button',{name:'다회용기',exact:true}).click();
 await expect(page.locator('.store-card')).toHaveCount(3);
 await expect(page.locator('.map-note')).toContainText('지도 연결을 준비하고 있어요');
});

test('missing research data never produces substitute shops',async({page})=>{
 await page.route('**/src/data/stores.json*',route=>route.fulfill({contentType:'application/javascript',body:'export default [];'}));
 await page.goto('/');
 await expect(page.locator('.store-card')).toHaveCount(0);
 await expect(page.locator('.research-notice')).toContainText('조사자료를 준비하고 있어요');
 await expect(page.locator('.empty')).toContainText('조사자료를 준비하고 있어요');
 await expect(page.locator('.results-heading')).toContainText('0');
});

test('invalid store selection returns safely to exploration',async({page})=>{
 await page.goto('/#store=not-a-registered-store');
 await expect(page.getByRole('dialog')).toContainText('매장을 찾을 수 없어요');
 await page.getByRole('button',{name:'목록으로 돌아가기'}).click();
 await expect(page.getByRole('dialog')).toHaveCount(0);
 await expect(page.locator('.store-card')).toHaveCount(12);
});

test('blocked directions can be retried without changing the destination',async({page})=>{
 await page.route('**/src/data/stores.json*',async route=>{
  const data=JSON.parse(readFileSync(new URL('../../src/data/stores.json',import.meta.url),'utf8'));
  data[0].coordinates=[35,128];data[0].coordinateSource='BROWSER TEST FIXTURE ONLY';
  await route.fulfill({contentType:'application/javascript',body:`export default ${JSON.stringify(data)};`});
 });
 await page.addInitScript(()=>{window.open=()=>null;});
 await page.goto('/#store=dessert39');
 await page.getByRole('button',{name:'카카오맵 길찾기',exact:true}).click();
 await expect(page.getByRole('alert')).toContainText('길찾기 연결 창을 열지 못했어요');
 await page.getByRole('button',{name:'길찾기 다시 시도'}).click();
 await expect(page.getByRole('alert')).toBeVisible();
});
