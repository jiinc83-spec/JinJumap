import { useEffect, useRef, useState } from 'react';
import { LocateFixed, MapPin, RotateCcw } from 'lucide-react';
import { hasCoordinates, type Store } from '../domain';
import { loadKakaoMaps, type KakaoMap, type KakaoMaps } from '../lib/kakao';
const center = [35.171, 128.061] as const; // 지역 탐색 중심이며 매장 좌표가 아닙니다.
const appKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY?.trim();
type MapState = 'unconfigured' | 'loading' | 'ready' | 'error';
export default function NeighborhoodMap({ stores, onSelect }: { stores: Store[]; onSelect: (id: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<KakaoMap | null>(null);
  const sdk = useRef<KakaoMaps | null>(null);
  const [state, setState] = useState<MapState>(appKey ? 'loading' : 'unconfigured');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!appKey || !container.current) return;
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    const element = container.current;
    setState('loading');
    loadKakaoMaps(appKey).then(maps => {
      if (cancelled) return;
      const point = new maps.LatLng(...center);
      const instance = new maps.Map(element, { center: point, level: 5 });
      instance.addControl(new maps.ZoomControl(), maps.ControlPosition.RIGHT);
      sdk.current = maps; map.current = instance;
      observer = new ResizeObserver(() => { instance.relayout(); });
      observer.observe(element);
      setState('ready');
    }).catch(() => { if (!cancelled) setState('error'); });
    return () => { cancelled = true; observer?.disconnect(); map.current = null; sdk.current = null; element.replaceChildren(); };
  }, [attempt]);
  useEffect(() => {
    const maps = sdk.current, instance = map.current;
    if (state !== 'ready' || !maps || !instance) return;
    const markers = stores.filter(hasCoordinates).map(store => {
      const marker = new maps.Marker({map: instance, position: new maps.LatLng(...store.coordinates!), title: store.name});
      const click = () => onSelect(store.id);
      maps.event.addListener(marker, 'click', click);
      return { marker, click };
    });
    return () => { markers.forEach(({marker,click}) => {maps.event.removeListener(marker,'click',click);marker.setMap(null);}); };
  }, [stores, onSelect, state, attempt]);
  const located = stores.filter(hasCoordinates).length;
  const title = state === 'unconfigured' ? '지도 연결을 준비하고 있어요' : state === 'error' ? '카카오맵을 불러오지 못했어요' : state === 'loading' ? '카카오맵을 불러오는 중이에요' : !stores.length ? '이 조건에 등록된 매장이 없어요' : '확인된 위치만 지도에 표시해요';
  const description = state === 'unconfigured' || state === 'error' ? '매장 목록과 상세 정보는 이용할 수 있어요. 상세에서 카카오맵으로 연결해 주세요.' : state === 'loading' ? '잠시만 기다려 주세요. 매장 목록은 바로 확인할 수 있어요.' : `검색 결과 ${stores.length}곳 중 좌표 출처가 확인된 ${located}곳을 표시합니다. 좌표가 없는 매장은 목록에서 확인해 주세요.`;
  return <section className="map-panel" aria-label="진주시 평거동 카카오 지도">
    <div className="map-canvas" ref={container}/>
    {state !== 'ready' && <div className="map-placeholder" aria-hidden="true"><MapPin size={42}/><span>남강 GREEN MAP</span><small>우리 동네, 더 푸르게</small></div>}
    <div className="map-location"><MapPin size={15}/> 경상남도 진주시 평거동 <span>카카오맵</span></div>
    {state === 'ready' && <button className="map-reset" aria-label="평거동 중심으로 지도 이동" onClick={() => map.current?.setCenter(new sdk.current!.LatLng(...center))}><LocateFixed size={20}/></button>}
    <div className="map-note" role="status"><div className="note-icon"><MapPin size={21}/></div><div><strong>{title}</strong><p>{description}</p>{state === 'error' && <button onClick={() => setAttempt(n => n+1)}><RotateCcw size={13}/> 다시 시도</button>}</div></div>
  </section>;
}
