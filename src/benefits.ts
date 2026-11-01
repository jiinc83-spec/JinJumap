import type { Store } from './domain';
export const cafeIds = ['starbucks', 'dessert39', 'mega', 'tenpercent', 'hasamdong', 'ediya'];
export type BenefitFilter = 'all' | 'discount' | 'points';
export function benefitFor(store: Store) {
 if (store.id === 'starbucks') return { title: '400원 할인', condition: '개인컵 할인 또는 에코별 선택', status: '브랜드 안내 · 지점 재확인 필요', discount: true, points: true };
 if (store.id === 'dessert39') return { title: '할인 금액 확인 중', condition: '개인컵 할인 안내 · 품목·조건 문의', status: '브랜드 안내 · 지점 재확인 필요', discount: true, points: false };
 if (store.id === 'mega') return { title: '포인트 적립 조건 확인', condition: '개인컵 이용 · 앱·본인인증 요건 확인', status: '참여기업 자료 기준 · 지점 재확인 필요', discount: false, points: true };
 return { title: '혜택 확인 중', condition: '개인컵 할인 금액·이용 조건 확인 필요', status: '브랜드 협약 기준 · 지점 적용 미확인', discount: false, points: false };
}
export function matchesBenefit(store: Store, filter: BenefitFilter) {
 const benefit = benefitFor(store);
 return filter === 'all' || (filter === 'discount' ? benefit.discount : benefit.points);
}
