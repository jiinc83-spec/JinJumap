# GitHub Pages로 배포

Netlify 무료 플랜의 새 배포 제한과 별개로 GitHub Pages를 사용할 수 있다. 공개 저장소의 정적 웹사이트 배포를 사용하며 개인 액세스 토큰이나 카카오 키를 요구하지 않는다.

1. GitHub 저장소 Settings → Pages로 이동한다.
2. Build and deployment의 Source를 GitHub Actions로 선택한다.
3. Actions 탭에서 Deploy GREEN MAP to GitHub Pages 워크플로를 확인한다.
4. 자동 실행이 없거나 활성화 전에 실패했다면 해당 워크플로의 Run workflow를 선택한다.
5. build와 deploy가 모두 성공한 후 GitHub가 표시하는 사이트 주소를 연다.

예상 주소: https://jiinc83-spec.github.io/JinJumap/

주소가 정해져 있어도 배포 성공 전에는 접속 가능하다고 볼 수 없다. 저장소 또는 조직 정책에서 Pages/Actions를 제한하면 해당 설정 확인이 필요하다.

## 구성

.github/workflows/pages.yml은 main 변경 시 테스트 후 Vite를 /JinJumap/ 하위 경로에 맞춰 빌드한다. VITE_UI_MODE=visual로 첨부 변경안 기반 UI를 첫 화면으로 사용하고 카카오 키를 빈 값으로 설정한다. 지도는 실제 지리 위치를 나타내지 않는 시연용 도식이며 외부 지도 API·외부 이미지·외부 폰트 요청이 없다. 필터, 검색, 상세와 포함된 조사보고서는 같은 사이트 안에서 동작한다.

## 로컬 검증

```sh
VITE_UI_MODE=visual VITE_KAKAO_MAP_APP_KEY='' npm run build -- --base=/JinJumap/
npm run preview -- --port 5180 --base=/JinJumap/
```

이 작업 환경에서 GitHub API 접속은 차단되어 Pages 활성화와 배포 상태를 API로 확인하지 못했다. GitHub 소스 업로드 성공과 공개 배포 성공은 구분한다.
