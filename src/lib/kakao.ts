/** Minimal SDK surface used by the map. No REST/admin key is needed in the browser. */
export interface KakaoPosition { getLat(): number; getLng(): number }
export interface KakaoMap {
  setCenter(position: KakaoPosition): void;
  relayout(): void;
  addControl(control: unknown, position: unknown): void;
}
export interface KakaoMarker { setMap(map: KakaoMap | null): void }
export interface KakaoMaps {
  load(callback: () => void): void;
  LatLng: new (lat: number, lng: number) => KakaoPosition;
  Map: new (element: HTMLElement, options: {center: KakaoPosition; level: number}) => KakaoMap;
  Marker: new (options: {map: KakaoMap; position: KakaoPosition; title: string}) => KakaoMarker;
  ZoomControl: new () => unknown;
  ControlPosition: { RIGHT: unknown };
  event: { addListener(target: KakaoMarker, name: string, listener: () => void): void; removeListener(target: KakaoMarker, name: string, listener: () => void): void };
}
declare global { interface Window { kakao?: { maps: KakaoMaps } } }
let loading: Promise<KakaoMaps> | undefined;
export function loadKakaoMaps(key: string): Promise<KakaoMaps> {
  if (loading) return loading;
  loading = new Promise<KakaoMaps>((resolve, reject) => {
    const script = document.createElement('script');
    const timeout = window.setTimeout(() => fail(), 15000);
    function fail() { clearTimeout(timeout); script.remove(); reject(new Error('Kakao Maps SDK unavailable')); }
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(key)}&autoload=false`;
    script.async = true;
    script.onerror = fail;
    script.onload = () => {
      const maps = window.kakao?.maps;
      if (!maps) { fail(); return; }
      try { maps.load(() => { clearTimeout(timeout); resolve(maps); }); } catch { fail(); }
    };
    document.head.appendChild(script);
  }).catch(error => { loading = undefined; throw error; });
  return loading;
}
