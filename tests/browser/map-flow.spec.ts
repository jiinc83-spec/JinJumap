import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
// SDK stub exercises application state only; it does not validate Kakao authorization.
const sdkStub = `
window.kakao={maps:{
 load:callback=>callback(),
 LatLng:class{constructor(lat,lng){this.lat=lat;this.lng=lng;}getLat(){return this.lat;}getLng(){return this.lng;}},
 Map:class{constructor(element){this.element=element;element.setAttribute('data-test-sdk-ready','true');}setCenter(){}relayout(){}addControl(){}},
 Marker:class{constructor(o){this.button=document.createElement('button');this.button.className='test-marker';this.button.style.cssText='position:absolute;top:120px;left:60px;z-index:2';this.button.textContent=o.title;o.map.element.appendChild(this.button);}setMap(map){if(!map)this.button.remove();}},
 ZoomControl:class{},ControlPosition:{RIGHT:1},
 event:{addListener(marker,name,callback){marker.button.addEventListener(name,callback);},removeListener(marker,name,callback){marker.button.removeEventListener(name,callback);}}
}};`;
async function enableMap(page: import('@playwright/test').Page) {
 await page.route('**/src/components/NeighborhoodMap.tsx*',async route=>{
  const response=await route.fetch();
  const body=(await response.text()).replace(/const appKey = [^;]+;/,'const appKey = "BROWSER_TEST_PLACEHOLDER";');
  await route.fulfill({response,body});
 });
}
test('SDK failure retries into ready state and preserves empty-filter state',async({page})=>{
 await enableMap(page);
 let failed=true;
 await page.route('**/v2/maps/sdk.js?**',route=>failed?route.abort():route.fulfill({contentType:'application/javascript',body:sdkStub}));
 await page.goto('/');
 await expect(page.locator('.map-note')).toContainText('카카오맵을 불러오지 못했어요');
 failed=false;
 await page.getByRole('button',{name:'다시 시도',exact:true}).click();
 await expect(page.locator('.map-note')).toContainText('확인된 위치만 지도에 표시해요');
 await page.getByRole('button',{name:'제로웨이스트·리필',exact:true}).click();
 await expect(page.locator('.map-note')).toContainText('이 조건에 등록된 매장이 없어요');
 await expect(page.locator('.store-card')).toHaveCount(0);
});
test('filter changes remove old markers and marker selection opens the matching detail',async({page})=>{
 await enableMap(page);
 await page.route('**/v2/maps/sdk.js?**',route=>route.fulfill({contentType:'application/javascript',body:sdkStub}));
 await page.route('**/src/data/stores.json*',route=>{
  const data=JSON.parse(readFileSync(new URL('../../src/data/stores.json',import.meta.url),'utf8'));
  data[0].coordinates=[35,128];data[0].coordinateSource='BROWSER TEST FIXTURE ONLY';
  return route.fulfill({contentType:'application/javascript',body:`export default ${JSON.stringify(data)};`});
 });
 await page.goto('/');
 await expect(page.locator('.test-marker')).toHaveCount(1);
 await page.getByRole('button',{name:'탄소중립포인트',exact:true}).click();
 await expect(page.locator('.test-marker')).toHaveCount(0);
 await expect(page.locator('.store-card')).toHaveCount(3);
 await page.getByRole('button',{name:'전체',exact:true}).click();
 await page.locator('.test-marker').click();
 await expect(page.getByRole('dialog')).toContainText('디저트39 진주평거점');
});
