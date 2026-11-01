# 실제 웹사이트 배포

React 앱 소스는 저장소 루트에 있고 Vite가 정적 사이트 `dist/`를 생성한다. 서버·DB·로그인은 필요하지 않다. 클라우드 개발 환경 게시와 웹사이트 배포는 서로 다른 작업이다.

## 먼저 로컬 실행

```sh
npm ci
npm run dev -- --port 5173
```

목록, 활동 필터, 검색, 후보 상세 및 조사자료를 사용할 수 있다. 실제 카카오 지도는 JavaScript 키가 필요하다.

## Vercel에 배포

1. 현재 프로젝트 파일을 GitHub 저장소에 커밋·업로드한다. node_modules, dist, .env.local은 업로드하지 않는다.
2. Vercel에서 Add New Project로 GitHub 저장소를 연결한다.
3. 프로젝트 루트는 package.json이 있는 폴더를 선택한다. Framework는 Vite, Build Command는 npm run build, Output Directory는 dist다. vercel.json에도 같은 설정을 기록했다.
4. 환경변수 VITE_KAKAO_MAP_APP_KEY에 Kakao Developers의 JavaScript 키를 입력한다. REST API 키나 Admin 키를 사용하지 않는다. 이 브라우저용 키는 빌드 결과에 포함되므로 카카오의 허용 도메인 설정으로 사용 범위를 제한한다.
5. Deploy 후 생성된 HTTPS 주소를 Kakao Developers의 해당 앱 웹사이트 도메인에 등록하고 카카오맵 사용 설정을 확인한다.
6. 키를 변경하면 Vercel에서 다시 배포한다. 코드 수정이 없다면 Redeploy를 사용한다.
7. 휴대폰에서 공개 주소를 열고 지도·필터·검색·상세·출처·카카오맵 연결을 검증한다.

## 출시 전 매장 확인

현재 12개 후보는 현장 확인 전이고 좌표가 없다. 조사 근거를 갖춘 위경도와 coordinateSource를 JSON에 추가해야 실제 매장 핀이 표시된다. 전화·방문 검증을 수행하지 않은 매장을 인증점이나 참여 가능 매장으로 표시하지 않는다.

좌표가 없는 경우 직접 길찾기는 위치 미제공을 안내한다. 별도의 카카오맵 주소 검색으로 실제 장소를 확인할 수 있다.

## 키와 외부 네트워크

키는 로컬에서 .env.local 또는 배포 환경변수에 넣는다. `.env.example`은 설정 예시이며 실제 키를 포함하지 않는다. 클라우드에서는 dapi.kakao.com 및 카카오 CDN 도메인 접근이 필요하다. 사용자 휴대폰의 네트워크 정책과 클라우드 실행 환경의 정책은 별개다.

사용자가 JavaScript 키임을 확인한 값을 Git에서 제외된 .env.local에만 설정했다. 다운로드 소스 묶음에는 해당 파일을 포함하지 않는다. 배포 환경변수는 직접 설정해야 한다. 실제 SDK 연결 성공이나 공개 배포를 완료했다고 주장하지 않는다.
