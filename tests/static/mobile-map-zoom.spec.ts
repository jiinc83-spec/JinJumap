import { expect, test } from '@playwright/test';

const kakaoStub = `
window.kakao = {maps: {
  load(callback) { callback(); },
  LatLng: class { constructor(lat, lng) { this.lat = lat; this.lng = lng; } getLat() { return this.lat; } getLng() { return this.lng; } },
  LatLngBounds: class { extend() {} },
  Map: class {
    constructor() { this.levelChanges = []; window.testMap = this; }
    setBounds() {} relayout() {} panTo() {}
    setLevel(level) { this.levelChanges.push(level); }
  },
  Marker: class { setMap() {} setImage() {} },
  MarkerImage: class {}, Size: class {}, Point: class {},
  Polyline: class { setMap() {} },
  Circle: class { setPosition() {} setRadius() {} setMap() {} },
  CustomOverlay: class { setPosition() {} setMap() {} },
  InfoWindow: class { open() {} close() {} getMap() { return null; } },
  event: { addListener() {} },
  services: { Status: { OK: 'OK' }, Geocoder: class { addressSearch() {} }, Places: class {} }
}};`;

test('GPS updates preserve a manually zoomed map', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'geolocation', { configurable: true, value: {
      getCurrentPosition(callback: (position: unknown) => void) { (window as any).testGpsGet = callback; },
      watchPosition(callback: (position: unknown) => void) { (window as any).testGpsWatch = callback; return 1; },
      clearWatch() {},
    }});
  });
  await page.route('**/kakao-config.js', route => route.fulfill({ contentType: 'application/javascript', body: 'window.KAKAO_MAP_APP_KEY="TEST";' }));
  await page.route('**/v2/maps/sdk.js?**', route => route.fulfill({ contentType: 'application/javascript', body: kakaoStub }));
  await page.goto('/mobile.html?view=map');
  await expect(page.locator('#map-status')).toBeHidden();

  const levels = await page.evaluate(() => {
    const mock = window as any;
    const position = { coords: { latitude: 35.1547, longitude: 128.1003, accuracy: 30 } };
    mock.testGpsGet(position);
    const initial = mock.testMap.levelChanges.slice();
    mock.testMap.setLevel(8);
    mock.testGpsWatch(position);
    return { initial, afterUpdate: mock.testMap.levelChanges.slice() };
  });
  expect(levels.initial).toEqual([4]);
  expect(levels.afterUpdate).toEqual([4, 8]);

  await page.reload();
  await expect(page.locator('#map-status')).toBeHidden();
  const lateFix = await page.evaluate(() => {
    const mock = window as any;
    document.querySelector('#kakao-map')!.dispatchEvent(new WheelEvent('wheel', { bubbles: true }));
    mock.testMap.setLevel(8);
    mock.testGpsGet({ coords: { latitude: 35.1547, longitude: 128.1003, accuracy: 30 } });
    return mock.testMap.levelChanges.slice();
  });
  expect(lateFix).toEqual([8]);
});
