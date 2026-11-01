import raw from './data/stores.json' with { type: 'json' };
export interface Store {
 id: string;
 page: number;
 name: string;
 address: string;
 tags: string[];
 activity: string;
 status: string;
 points: string;
 facts: string;
 participation: string[];
 sources: string[];
 coordinates: [number, number] | null;
 coordinateSource: string | null;
 verified: boolean;
}
export const stores: Store[] = raw as Store[];
export const categories = [
  { id: 'all', label: '전체', icon: 'leaf' },
  { id: 'cup', label: '다회용기' , icon: 'cup' },
  { id: 'recycle', label: '자원순환', icon: 'recycle' },
  { id: 'refill', label: '제로웨이스트·리필', icon: 'bag' },
  { id: 'mobility', label: '친환경 교통·에너지', icon: 'bike' },
  { id: 'plastic', label: '플라스틱 줄이기', icon: 'leaf' },
  { id: 'shopping', label: '친환경제품', icon: 'bag' },
  { id: 'receipt', label: '전자영수증', icon: 'receipt' },
  { id: 'repair', label: '수리·오래 쓰기', icon: 'bike' },
  { id: 'points', label: '탄소중립포인트', icon: 'points' },
];
export function filterStores(category: string, query: string) {
 const q = query.trim().toLocaleLowerCase();
 return stores.filter(s => (category === 'all' || s.tags.includes(category)) && `${s.name} ${s.address} ${s.activity}`.toLocaleLowerCase().includes(q));
}
export function mapLink(s: Store) { return `https://map.kakao.com/?q=${encodeURIComponent(`${s.name} ${s.address}`)}`; }
export function hasCoordinates(s: Store): boolean {
 const c = s.coordinates;
 return !!c && c.length === 2 && Number.isFinite(c[0]) && Number.isFinite(c[1]) && Math.abs(c[0]) <= 90 && Math.abs(c[1]) <= 180 && !!s.coordinateSource?.trim();
}
export function directionsLink(s: Store) {
 if (hasCoordinates(s)) return `https://map.kakao.com/link/to/${encodeURIComponent(s.name)},${s.coordinates![0]},${s.coordinates![1]}`;
 return mapLink(s);
}
