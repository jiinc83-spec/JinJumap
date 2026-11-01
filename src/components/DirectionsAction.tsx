import { useState } from 'react';
import { ArrowUpRight, Navigation, RotateCcw } from 'lucide-react';
import { directionsLink, hasCoordinates, type Store } from '../domain';

/** Keep missing destination data distinct from a browser/external-link failure. */
export default function DirectionsAction({ store }: { store: Store }) {
  const [status, setStatus] = useState<'idle' | 'missing' | 'blocked'>('idle');

  function openDirections() {
    if (!hasCoordinates(store)) {
      setStatus('missing');
      return;
    }
    let destination: Window | null = null;
    try {
      // Open synchronously from the user's click to detect popup blocking.
      destination = window.open('', '_blank');
      if (!destination) { setStatus('blocked'); return; }
      destination.opener = null;
      destination.location.href = directionsLink(store);
      setStatus('idle');
    } catch {
      destination?.close();
      setStatus('blocked');
    }
  }

  return <div className="directions-action">
    <button className="primary" onClick={openDirections}><Navigation size={17}/> 카카오맵 길찾기 <ArrowUpRight size={15}/></button>
    {status === 'missing' && <div className="direction-feedback" role="status"><strong>길찾기 위치가 아직 제공되지 않았어요</strong><p>확인된 매장 좌표가 없어 목적지로 바로 연결할 수 없어요. 아래 ‘카카오맵에서 찾기’에서 주소 검색 결과를 확인해 주세요.</p></div>}
    {status === 'blocked' && <div className="direction-feedback" role="alert"><strong>길찾기 연결 창을 열지 못했어요</strong><p>브라우저의 팝업 차단 설정을 확인한 뒤 다시 시도해 주세요.</p><button onClick={openDirections}><RotateCcw size={14}/> 길찾기 다시 시도</button></div>}
    <p className="link-hint">카카오맵으로 이동한 뒤 경로를 확인해 주세요. 외부 서비스의 응답 여부는 이 화면에서 확인할 수 없습니다.</p>
  </div>;
}
