import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bike, BookOpen, Check, ChevronRight, Coffee, Copy, ExternalLink, Leaf, Map as MapIcon, MapPin, Navigation, Recycle, Search, ShieldCheck, ShoppingBag, Ticket, Receipt, X, ListFilter, Clock3, CalendarDays, Phone, BadgeCheck } from 'lucide-react';
import './styles.css';
import { categories, hasCoordinates, mapLink, type Store } from './domain';
import mapPlacesRaw from './data/map-places.json' with { type: 'json' };
import NeighborhoodMap from './components/NeighborhoodMap';
import DirectionsAction from './components/DirectionsAction';
import CoordinateLookup from './components/CoordinateLookup';
const icons: Record<string, typeof Leaf> = {leaf:Leaf,cup:Coffee,recycle:Recycle,bag:ShoppingBag,receipt:Receipt,bike:Bike,points:Ticket};
const mapPlaces = mapPlacesRaw as Store[];
function Icon({ type, size = 19 }: { type: string; size?: number }) { const Component = icons[type] || Leaf; return <Component size={size}/>; }
function storeIcon(store: Store) { return categories.find(c => c.id === store.tags[0])?.icon || 'leaf'; }
function selectedId() { return new URLSearchParams(location.hash.slice(1)).get('store'); }
function App() {
 const [category, setCategory] = useState('all'); const [query, setQuery] = useState('');
 const [selected, setSelected] = useState<string | null>(selectedId);
 const [view, setView] = useState('map'); const [guide, setGuide] = useState(false);
 const trigger = useRef<HTMLElement | null>(null);
 const normalizedQuery = query.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
 const filtered = mapPlaces.filter(s => (category === 'all' || s.tags.includes(category)) && `${s.name} ${s.address} ${s.activity} ${s.displayType ?? ''} ${s.facts} ${s.verification ?? ''}`.toLocaleLowerCase().replace(/\s+/g, ' ').includes(normalizedQuery));
 const store = mapPlaces.find(s => s.id === selected);
 useEffect(() => { const handler = () => setSelected(selectedId()); window.addEventListener('hashchange', handler); return () => window.removeEventListener('hashchange',handler); }, []);
 const select = useCallback((id: string) => { trigger.current = document.activeElement as HTMLElement; location.hash = new URLSearchParams({store:id}).toString(); setSelected(id); }, []);
 const close = useCallback(() => { history.replaceState(null,'',location.pathname + location.search); setSelected(null); requestAnimationFrame(() => trigger.current?.focus()); }, []);
 return <>
  <header className="header"><a className="brand" href="#" onClick={e => { e.preventDefault(); close(); setCategory('all'); setQuery(''); }}><span className="brand-mark"><Leaf size={22}/></span><span>남강 <b>GREEN MAP</b></span><small>우리 동네, 더 푸르게</small></a><nav aria-label="주 메뉴"><a href="#explore" className="active">실천지도</a><button onClick={() => setGuide(true)}>이용 안내 <ArrowUpRight size={14}/></button></nav></header>
  <main>
   <section className="hero"><div className="hero-copy"><p className="eyebrow"><span/> JINJU · PYEONGGEO-DONG</p><h1>가까운 곳에서 시작하는<br/><span>조금 더 초록인 일상.</span></h1><p className="hero-description">텀블러 하나, 빈 병 하나, 오래 입는 옷 한 벌.<br/>평거동의 작은 실천을 연결하는 남강 GREEN MAP</p><a className="hero-link" href="#explore">우리 동네 둘러보기 <ArrowDown size={15}/></a></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span className="art-label label-top">SMALL ACTS, GREENER DAYS</span><div className="river"/><div className="art-circle c-one"><Coffee size={43} strokeWidth={1.3}/></div><div className="art-circle c-two"><Recycle size={48} strokeWidth={1.3}/></div><div className="art-circle c-three"><Bike size={44} strokeWidth={1.3}/></div><div className="art-pin"><Leaf size={30}/></div><span className="art-label label-bottom">남강에서 시작하는 변화 ↗</span></div></section>
   <section className="explore" id="explore"><div className="section-heading"><div><p className="eyebrow muted">YOUR NEIGHBORHOOD, YOUR IMPACT</p><h2>우리 동네 실천지도 <span>평거동</span></h2></div><button className="text-button" onClick={() => setGuide(true)}><BookOpen size={16}/> 이 지도를 읽는 방법 <ArrowUpRight size={15}/></button></div>
    <div className="filterbar" aria-label="활동 유형별 필터">{categories.map(c => <button key={c.id} aria-pressed={category === c.id} className={category === c.id ? 'filter selected' : 'filter'} onClick={() => setCategory(c.id)}><Icon type={c.icon} size={17}/>{c.label}</button>)}</div>
    <div className="research-notice"><ShieldCheck size={18}/><p><strong>제공된 장소 정보를 기준으로 안내합니다.</strong><span> 운영시간과 실천 활동에 확인이 필요한 항목은 카드에 별도로 표시했습니다.</span></p><button onClick={() => setGuide(true)} aria-label="조사 기준 보기"><ChevronRight size={19}/></button></div>
    <div className="mobile-toggle" aria-label="탐색 보기 전환"><button aria-pressed={view === 'map'} onClick={() => setView('map')}><MapIcon size={16}/> 지도</button><button aria-pressed={view === 'list'} onClick={() => setView('list')}><ListFilter size={16}/> 목록</button></div>
    <div className={`workspace view-${view}`}><aside className="results"><div className="search-wrap"><Search size={19}/><input aria-label="장소명, 지역, 유형 검색" placeholder="장소명, 지역, 유형을 검색하세요" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button aria-label="검색어 지우기" onClick={() => setQuery('')}><X size={16}/></button>}</div><div className="results-heading"><strong>등록 장소 <span aria-live="polite">{filtered.length}</span></strong><span>장소별 확인 상태 표시</span></div><div className="store-list">{filtered.map((s,i) => <button className="store-card" key={s.id} onClick={() => select(s.id)}><div className={`store-symbol symbol-${s.tags[0]}`}><Icon type={storeIcon(s)} size={23}/></div><div className="card-content"><div className="card-overline">{String(i+1).padStart(2,'0')} <span>{s.displayType ?? '장소 정보'}</span></div><h3>{s.name}</h3><p><MapPin size={12}/>{s.address.replace('경남 진주시 ','')}</p><div className="activity-tag">{s.activity}</div></div><ChevronRight size={17} className="card-arrow"/></button>)}{!filtered.length && <div className="empty"><Search size={30}/><h3>검색 결과가 없어요</h3><p>검색어 또는 유형을 바꿔 다시 찾아보세요.</p><button onClick={() => {setQuery('');setCategory('all');}}>필터 초기화</button></div>}</div><div className="list-foot"><span className="dot"/> 전체 {mapPlaces.length}곳 · 좌표 확인 필요 {mapPlaces.filter(s=>!hasCoordinates(s)).length}곳</div></aside><NeighborhoodMap stores={filtered} onSelect={select}/></div>
   </section>
   <section className="bottom-band"><span className="band-icon"><Leaf size={29}/></span><div><h2>작은 실천의 시작은, 정확한 정보에서.</h2><p>브랜드의 약속과 우리 동네 매장의 실제 운영을 구분해 안내합니다.</p></div><a href="/research/report.pdf" target="_blank" rel="noreferrer">조사보고서 읽기 <ArrowUpRight size={17}/></a></section>
  </main><footer><span>남강 <b>GREEN MAP</b></span><p>진주시 평거동 주민을 위한 탄소중립 실천지도</p><small>공개자료 기반 MVP · 2026</small></footer>
  {store && <StoreDetail key={store.id} store={store} onClose={close}/>}
  {selected && !store && <Modal title="매장을 찾을 수 없어요" onClose={close}><p>주소가 올바른지 확인하거나 목록에서 다시 선택해 주세요.</p><button className="primary" onClick={close}>목록으로 돌아가기</button></Modal>}
  {guide && <Modal title="이 지도를 읽는 방법" onClose={() => setGuide(false)}><p className="detail-intro">동네의 작은 실천을 찾되, 확인 수준을 함께 살펴주세요.</p><h3>01. 현재는 조사 후보 지도입니다</h3><p>첨부된 사전 조사보고서의 후보 매장을 정리했습니다. 전화·방문 검증은 수행되지 않았으며, 공식 친환경 인증점이나 감축 실적이 확인된 매장이라는 의미가 아닙니다.</p><h3>02. 필터는 조사 주제를 나타냅니다</h3><p>브랜드 정책·협약·업종 정보를 포함합니다. 필터에 포함되어도 해당 지점에서 참여가 가능하다는 보장은 아닙니다. 제로웨이스트·리필은 등록 자료가 없어 빈 상태로 표시합니다. 친환경 교통·에너지는 자전거 업체 후보를 포함하며 에너지 활동이 확인됐다는 뜻은 아닙니다.</p><h3>03. 방문 전에 한 번 더 확인하세요</h3><p>운영 여부, 대상 품목, 개인컵·공병 조건, 포인트 가입·결제 방법을 확인해 주세요. 포인트 금액은 보고서 기준이며 변경될 수 있습니다.</p><h3>04. 매장 위치와 길찾기</h3><p>조사자료에 좌표가 없어 핀은 표시하지 않습니다. 매장 상세에서 주소를 지도 서비스로 전달할 수 있습니다. 길찾기 결과의 목적지가 해당 매장이 맞는지 확인해 주세요.</p><a className="source-link" href="/research/report.pdf" target="_blank" rel="noreferrer">원본 조사보고서 보기 <ExternalLink size={15}/></a></Modal>}
 </>;
}
function Modal({title,onClose,children}:{title:string;onClose:()=>void;children:React.ReactNode}) {
 const dialog = useRef<HTMLDialogElement>(null);
 useEffect(() => {const el=dialog.current; el?.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{el?.close();document.body.style.overflow=previous;};},[]);
 return <dialog ref={dialog} className="detail-dialog" aria-labelledby="dialog-title" onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><div className="dialog-inner"><div className="dialog-top"><span><Leaf size={16}/> 남강 GREEN MAP</span><button onClick={onClose} aria-label="상세 닫기" autoFocus><X size={22}/></button></div><h2 id="dialog-title">{title}</h2>{children}</div></dialog>;
}
function StoreDetail({store:s,onClose}:{store:Store;onClose:()=>void}) {
 const [copied,setCopied]=useState(false); const [copyError,setCopyError]=useState(false);
 async function copy(){try{await navigator.clipboard.writeText(s.address);setCopied(true);setCopyError(false);}catch{setCopyError(true);}}
 return <Modal title={s.name} onClose={onClose}>
  <div className="detail-type">{s.displayType ?? '장소 정보 확인 필요'}</div>
  <section className="detail-practice"><h3>이곳에서 실천할 수 있어요</h3><p>{s.activity}</p></section>
  <dl className="detail-map-facts">
   <div><Clock3/><dt>운영시간</dt><dd>{s.openingHours ?? '운영시간 확인 필요'}</dd></div>
   <div><CalendarDays/><dt>정기 휴무일</dt><dd>{s.closedDays ?? '휴무일 확인 필요'}</dd></div>
   <div><MapPin/><dt>주소</dt><dd>{s.address}</dd></div>
   <div><Phone/><dt>연락처</dt><dd>{s.phone ?? '연락처 확인 필요'}</dd></div>
   <div><BadgeCheck/><dt>정보 확인</dt><dd>{s.verification ?? '공식 정보 확인 필요'} · 현장 확인 미실시</dd></div>
  </dl>
  <div className="detail-actions"><DirectionsAction key={s.id} store={s}/><a className="secondary map-search-link" href={mapLink(s)} target="_blank" rel="noreferrer"><MapIcon size={17}/> 카카오맵에서 찾기 <ArrowUpRight size={15}/></a></div>
  <p className="detail-address-copy"><button onClick={copy} aria-label="주소 복사">{copied?<Check size={15}/>:<Copy size={15}/>} {copied?'주소 복사됨':'주소 복사'}</button><span role="status">{copyError?'주소 복사에 실패했습니다.':''}</span></p>
  <details className="detail-more"><summary>자세히 보기</summary><section className="detail-section"><h3><Leaf size={18}/> 구체적인 실천 방법</h3><p>{s.facts}</p><ol>{s.participation.map((p,i)=><li key={i}>{p}</li>)}</ol></section><section className="detail-section"><h3><ShieldCheck size={18}/> 이용 조건 및 확인 사항</h3><p>{s.status}</p><p>{s.verification ?? '방문 전 운영 여부와 이용 조건을 확인해 주세요.'}</p><p>{s.points}</p></section><section className="detail-section"><h3><BookOpen size={18}/> 정보 확인일 및 출처</h3><p>현장 방문·전화 확인: 미실시 · 공식 정보 확인일: 제공 자료에 기재 없음</p>{s.page && <a className="source-link" href={`/research/report.pdf#page=${s.page}`} target="_blank" rel="noreferrer">첨부 조사보고서 · {s.page}쪽<ExternalLink size={15}/></a>}{s.sources.map((url,i)=><a className="source-link" key={url} href={url} target="_blank" rel="noreferrer"><span>참고 자료 {i+1}<small>{new URL(url).hostname}</small></span><ExternalLink size={15}/></a>)}{!s.sources.length && <p>제공된 장소 정보 기준</p>}</section></details>
  <button className="back-button" onClick={onClose}><ArrowLeft size={16}/> 지도로 돌아가기</button>
 </Modal>;
}
const VisualPreview = React.lazy(() => import('./preview/VisualPreview'));
const ActionPreview = React.lazy(() => import('./preview/ActionPreview'));
const ResearchShowcase = React.lazy(() => import('./research/ResearchShowcase'));
const params = new URLSearchParams(location.search);
createRoot(document.getElementById('root')!).render(<React.StrictMode><React.Suspense fallback={<p>화면을 준비하고 있어요.</p>}>{params.get('preview')==='research'?<ResearchShowcase/>:params.get('preview')==='fresh'?<ActionPreview fresh/>:params.get('preview')==='actions'?<ActionPreview/>:(params.get('preview')==='visual'||import.meta.env.VITE_UI_MODE==='visual')?<VisualPreview/>:params.get('tool')==='coordinates'?<CoordinateLookup/>:<App/>}</React.Suspense></React.StrictMode>);
