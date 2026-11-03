import raw from './data/stores.json' with { type: 'json' };
export interface Store {
 id: string;
 page?: number;
 name: string;
 address: string;
 tags: string[];
 displayType?: string;
 activity: string;
 status: string;
 openingHours?: string;
 closedDays?: string;
 phone?: string;
 verification?: string;
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
  { id: 'cup', label: '텀블러', icon: 'cup' },
  { id: 'recycle', label: '자원순환', icon: 'recycle' },
  { id: 'mobility', label: '녹색교통', icon: 'bike' },
  { id: 'separation', label: '분리배출', icon: 'recycle' },
  { id: 'environment', label: '환경정보', icon: 'leaf' },
  { id: 'shopping', label: '친환경 소비', icon: 'bag' },
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
