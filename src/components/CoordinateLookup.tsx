import { useState } from 'react';
import { ArrowLeft, Download, MapPin, Search } from 'lucide-react';
import { stores } from '../domain';
import { loadKakaoMaps } from '../lib/kakao';

type Result = {
  id: string; name: string; address: string;
  latitude: number | null; longitude: number | null;
  matchedAddress: string; status: string;
};
const initial: Result[] = stores.map(s => ({id:s.id,name:s.name,address:s.address,latitude:null,longitude:null,matchedAddress:'',status:'조회 전'}));
export default function CoordinateLookup() {
  const [results,setResults] = useState<Result[]>(initial);
  const [running,setRunning] = useState(false);
  const [message,setMessage] = useState('버튼을 누르면 보고서 주소를 카카오 주소 검색으로 변환합니다.');
  const [completed,setCompleted] = useState(0);
  async function lookup() {
    const key = import.meta.env.VITE_KAKAO_MAP_APP_KEY?.trim();
    if (!key) {setMessage('지도 JavaScript 키가 설정되지 않았습니다. Netlify 환경변수 설정 후 다시 배포해 주세요.');return;}
    setRunning(true);setCompleted(0);setResults(initial);
    try {
      const maps=await loadKakaoMaps(key);
      if (!maps.services) throw new Error('services unavailable');
      const services=maps.services;
      const geocoder=new services.Geocoder();
      for (let i=0;i<initial.length;i++) {
        const row=initial[i];
        setMessage(`${i+1}/${initial.length} · ${row.name} 주소 조회 중`);
        const updated=await new Promise<Result>(resolve=>{
          let settled=false;
          const finish=(r:Result)=>{if(settled)return;settled=true;clearTimeout(timer);resolve(r);};
          const timer=setTimeout(()=>finish({...row,status:'응답 시간 초과 · 재조회 필요'}),12000);
          try {
            geocoder.addressSearch(row.address.replace(/\s*\([^)]*\)/g,''),(data,status)=>{
              const hits=Array.isArray(data)?data:[];
              if (status!==services.Status.OK || hits.length!==1) {
                finish({...row,status:status===services.Status.ZERO_RESULT?'주소 검색 결과 없음':hits.length>1?'복수 결과 · 직접 확인 필요':'조회 실패 · 설정/응답 확인 필요'});return;
              }
              const hit=hits[0];const latitude=Number(hit.y),longitude=Number(hit.x);
              if (!Number.isFinite(latitude)||!Number.isFinite(longitude)||Math.abs(latitude)>90||Math.abs(longitude)>180) {finish({...row,status:'유효한 좌표 없음'});return;}
              finish({...row,latitude,longitude,matchedAddress:hit.road_address?.address_name||hit.address_name,status:'주소 좌표 조회됨 · 매장 위치 대조 필요'});
            });
          } catch {finish({...row,status:'조회 실패 · 설정/응답 확인 필요'});}
        });
        setResults(current=>current.map(r=>r.id===row.id?updated:r));
        setCompleted(i+1);
      }
      setMessage('주소 조회 완료. 원래 주소와 변환 주소를 대조해 주세요. 건물 좌표이며, 매장 입점·운영이나 현장 검증을 보증하지 않습니다.');
    } catch {setMessage('카카오 주소 검색에 연결하지 못했습니다. JavaScript 키·카카오맵 사용 설정·현재 사이트 도메인 등록을 확인해 주세요.');}
    finally {setRunning(false);}
  }
  function download() {
    const header=['매장ID','매장명','조사자료 주소','변환 주소','위도','경도','조회 상태','내보낸 시각 UTC','출처'];
    const time=new Date().toISOString();
    const rows=results.map(r=>[r.id,r.name,r.address,r.matchedAddress,r.latitude??'',r.longitude??'',r.status,time,'Kakao Maps JavaScript SDK 주소 검색']);
    const csv='\uFEFF'+[header,...rows].map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
    const link=document.createElement('a');link.href=url;link.download='namgang-address-coordinates.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <main className="coordinate-tool">
    <a className="hero-link" href="/"><ArrowLeft size={16}/> 실천지도로 돌아가기</a>
    <p className="eyebrow muted">RESEARCH · ADDRESS COORDINATES</p>
    <h1>평거동 12곳 좌표 조회</h1>
    <p>보고서 주소를 카카오 주소 검색에 전달해 실제 응답 좌표를 가져옵니다. 결과는 <strong>주소·건물 위치</strong>이며 매장 입점 확인·현장 검증과는 별개입니다. 후보 데이터나 지도 핀은 자동으로 변경하지 않습니다.</p>
    <div className="coordinate-actions"><button className="primary" disabled={running} onClick={lookup}><Search size={16}/>{running?'조회 중…':'12곳 좌표 조회'}</button><button className="secondary" disabled={!completed||running} onClick={download}><Download size={16}/> 결과 CSV 저장</button></div>
    <p role="status">{message}</p>
    <div className="coordinate-table"><table><thead><tr><th>매장·원래 주소</th><th>변환 주소</th><th>위도 (latitude)</th><th>경도 (longitude)</th><th>상태</th></tr></thead><tbody>{results.map(r=><tr key={r.id}><td><strong>{r.name}</strong><small>{r.address}</small></td><td>{r.matchedAddress||'—'}</td><td>{r.latitude??'—'}</td><td>{r.longitude??'—'}</td><td>{r.status}</td></tr>)}</tbody></table></div>
    <p className="small-note"><MapPin size={14}/> 지도 데이터 입력 순서는 [위도, 경도]입니다. 조회 결과를 보내주시면 주소를 대조해 반영할 수 있습니다.</p>
  </main>;
}
