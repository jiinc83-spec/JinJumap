# 남강 GREEN MAP

진주시 평거동 주민을 위한 탄소중립 실천 후보 지도. React + TypeScript + Vite + Kakao Maps. 로그인과 DB 없이 정적 JSON으로 관리합니다.

## 실행

Node.js 22.12 이상(현재 검증: 24.19.0), npm 사용.

```sh
cd /workspace/JinJumap
npm ci
npm run dev -- --port 5173
```

```sh
npm run build
npm test
npx playwright test
```

브라우저 테스트는 기본 Playwright Chromium을 사용합니다. 시스템 Chromium을 사용할 때는 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npx playwright test`를 실행하세요. Linux 환경에서 sandbox 없이 실행해야 하는 경우에만 `PLAYWRIGHT_DISABLE_SANDBOX=1`을 함께 설정하세요. 빌드 결과 `dist/`는 정적 웹 호스팅에 배포할 수 있습니다. 실제 배포는 수행하지 않았습니다.

## 화면과 데이터

- 홈·지도·활동 필터·매장명/주소 검색·상세·주소 복사·외부 지도/길찾기.
- 모바일 지도/목록 전환, 상세 직접 연결 `/#store=hansalim`.
- 원본: `public/research/report.pdf`, 기준일 2026-11-01.
- `src/data/stores.json`: 12개 후보, 활동·참여 전 확인사항·혜택·근거 링크·페이지·검증 상태.
- `src/domain.ts`: 필터 정의, 검색 및 외부 링크 생성.
- `src/components/NeighborhoodMap.tsx`: 지도 공급자와 좌표 표시.
- `docs/DEVELOPMENT_PLAN.md`: 개발 계획·화면 구조.
- `docs/DESIGN_REPORT.md`: 디자인 보고서 및 템플릿 사용 제한.

## 데이터 갱신

조사자료의 근거가 있는 경우에만 JSON을 수정하세요. 매장 좌표는 `[위도, 경도]` 형식으로 `coordinates`에 기록하고 `coordinateSource`에 검증 출처를 남겨야 핀이 표시됩니다. 현재는 전부 null입니다. `verified`는 현장 검증을 실제 수행한 이후에만 변경하고, 동시에 상태 문구·검증 기록과 안내를 갱신하세요. 현재 화면의 현장 확인 전 문구는 최초 사전조사 버전 기준입니다. 한살림 종이팩 수거·무포장 판매는 확인되지 않아 확정 활동·필터로 추가하지 않았습니다.

## 제한 사항

현재 모든 매장은 현장 검증 전 조사 후보입니다. 지역 탐색 지도 중심은 매장 좌표가 아닙니다. 실제 매장 핀은 좌표 확보 후 사용할 수 있습니다. 길찾기는 주소를 외부 서비스에 전달하므로 결과 목적지를 확인해야 합니다. 출처 원문의 최신성, 지점 운영, 혜택·지급 조건, 외부 길찾기 결과는 독립 검증되지 않았습니다.

지도는 `dapi.kakao.com`과 카카오 CDN(`*.daumcdn.net`)에 대한 브라우저 네트워크 접근 및 `VITE_KAKAO_MAP_APP_KEY`가 필요합니다. 실패 시 목록·상세·외부 지도 연결을 사용할 수 있습니다. Kakao Developers에서 지도 기능과 서비스 도메인을 등록하고 이용 정책·쿼터를 확인하세요. 카카오맵 JavaScript 키가 필요합니다. `.env.example`과 `docs/PRODUCT_SPEC.md`를 확인하세요. 키가 없어도 목록·상세·카카오맵 외부 연결은 이용할 수 있습니다.

최신 명세 반영 내용: [제품 명세](docs/PRODUCT_SPEC.md). 초기 개발·검증 문서는 첫 버전 기록이며 지도 공급자는 현재 Kakao Maps입니다.

첨부 흐름도의 화면 전환 및 실패·복구 처리는 [흐름도 기반 MVP](docs/FLOW_MVP.md)에 정리했습니다. 좌표가 없으면 길찾기는 위치 미제공을 안내하며, 별도의 카카오맵 주소 검색 버튼을 이용할 수 있습니다.
