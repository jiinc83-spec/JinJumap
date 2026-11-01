import {test,expect} from '@playwright/test';
test('coordinate lookup handles missing key without fabricating results',async({page})=>{
 await page.goto('/?tool=coordinates');
 await page.getByRole('button',{name:'12곳 좌표 조회',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('JavaScript 키가 설정되지 않았습니다');
 await expect(page.locator('tbody tr')).toHaveCount(12);
 await expect(page.getByRole('button',{name:'결과 CSV 저장'})).toBeDisabled();
});
test('live-address adapter preserves missing results and exports provider responses',async({page})=>{
 await page.route('**/src/components/CoordinateLookup.tsx*',async route=>{
  const response=await route.fetch();
  const body=(await response.text()).replace(/const key = [^;]+;/,'const key = "BROWSER_TEST_PLACEHOLDER";');
  await route.fulfill({response,body});
 });
 await page.route('**/v2/maps/sdk.js?**',route=>route.fulfill({contentType:'application/javascript',body:`window.kakao={maps:{load:callback=>callback(),services:{Status:{OK:'OK',ZERO_RESULT:'ZERO_RESULT'},Geocoder:class{addressSearch(query,callback){if(query==='경남 진주시 평거로 11')callback([{y:'35.0001',x:'128.0001',address_name:'TEST ADDRESS ONLY'}],'OK');else callback([],'ZERO_RESULT');}}}}};`}));
 await page.goto('/?tool=coordinates');
 await page.getByRole('button',{name:'12곳 좌표 조회',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('주소 조회 완료');
 const first=page.locator('tbody tr').first();
 await expect(first).toContainText('35.0001');await expect(first).toContainText('128.0001');
 await expect(page.locator('tbody tr').nth(1)).toContainText('주소 검색 결과 없음');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'결과 CSV 저장'}).click();
 expect((await download).suggestedFilename()).toBe('namgang-address-coordinates.csv');
});
