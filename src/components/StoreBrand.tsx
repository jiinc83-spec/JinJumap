import { useState } from 'react';
import brands from '../data/brands.json';
import type { Store } from '../domain';
const assets: Record<string, { src: string; source: string; website: string }> = brands;
const labels: Record<string, string> = {
  dessert39: '디저트39', starbucks: '스타벅스', mega: '메가커피',
  tenpercent: '텐퍼센트', hasamdong: '하삼동', ediya: '이디야',
  oliveyoung: '올리브영', hansalim: '한살림', natural: '자연드림',
  biketani: '바이크타니', samchuly: '삼천리', alteration: '장인수선',
};
export default function StoreBrand({ store }: { store: Store }) {
  const [failed, setFailed] = useState(false);
  const asset = assets[store.id];
  return <span className={`store-symbol brand-badge brand-${store.id}${asset && !failed ? ' has-brand-image' : ' brand-fallback'}`}>
    {asset && !failed
      ? <img src={asset.src} alt={`${labels[store.id] || store.name} 공식 브랜드 로고`} loading="lazy" decoding="async" onError={() => setFailed(true)}/>
      : <span aria-label={store.name}>{labels[store.id] || store.name}</span>}
  </span>;
}
