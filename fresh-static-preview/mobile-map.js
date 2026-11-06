(() => {
  const mapSection = document.querySelector('#map');
  if (!mapSection) return;

  const placeFacts = {
    'map-beautiful-store-card': {
      type: 'circular', displayType: '재사용·자원순환', address: '경남 진주시 진주대로 1081, 성모의원 1층',
      action: '사용하지 않는 의류와 생활용품 등 재사용 가능한 물품을 기증하거나 중고 물품을 구매할 수 있는 자원순환 매장입니다. 물품의 재사용을 통해 자원 소비와 폐기물 발생을 줄이는 실천에 참여할 수 있습니다.',
      method: '재사용 가능한 의류와 생활용품 등을 기증하거나 중고 물품을 구매할 수 있습니다.',
      condition: '기증 가능 품목과 접수시간은 방문 전 확인을 권장합니다.',
      hours: '월~토 10:30~18:00', holidays: '일·공휴일', phone: '055-741-8845', verification: '기증 가능 품목과 접수시간은 방문 전 확인 권장'
    },
    'map-zero-waste-card': {
      type: 'circular', displayType: '재사용·자원순환 (확인 필요)', address: '경남 진주시 비봉로 6, 2층 일부',
      action: '제로웨이스트·자원순환 관련 장소로 등록되어 있습니다. 현재 구체적인 친환경 제품 판매 여부와 실천 프로그램은 확인되지 않아 추가 조사가 필요합니다.',
      method: '현재 운영 여부와 실제 제공 서비스 확인 후 이용해 주세요.',
      condition: '현재 운영 여부와 구체적인 실천 활동 확인 후 공개를 권장합니다.',
      hours: '미확인', holidays: '미확인', phone: '미확인', verification: '현재 운영 여부와 실천 활동 확인 필요'
    },
    'map-seongbuk-card': {
      type: 'environment', displayType: '환경정보·수거 확인', address: '경남 진주시 진주성로35번길 10',
      action: '종이팩 및 폐건전지 등 재활용 자원 교환사업과 관련한 정보를 문의할 수 있는 행정기관입니다. 실제 수거·교환 가능 품목과 운영 여부는 확인이 필요합니다.',
      method: '재활용 자원 교환사업의 운영 여부와 교환 가능한 품목을 문의해 주세요.',
      condition: '재활용 자원 교환사업 운영 여부 및 교환 기준 확인이 필요합니다.',
      hours: '평일 09:00~18:00', holidays: '주말·공휴일', phone: '055-749-4041', hoursNote: '민원실 기준', verification: '재활용 자원 교환사업 운영 여부와 교환 기준 확인 필요'
    },
    'map-enamall-card': {
      type: 'recycling', displayType: '분리배출 확인 필요', address: '경남 진주시 진주대로 지하 1035',
      action: '상가 내 분리배출 시설을 활용한 재활용 실천 장소로 검토 중입니다. 분리배출함의 정확한 위치와 수거 품목은 확인되지 않았습니다.',
      method: '분리배출함 설치 여부와 위치, 수거 품목이 확인된 뒤 이용해 주세요.',
      hours: '08:00~23:00*', holidays: '마지막 주 일요일*', phone: '미확인',
      condition: '2026년 현재 개방시간 및 분리배출함 설치 여부 재확인이 필요합니다. *기존 공개 자료 기준입니다. 개별 점포 운영시간은 다를 수 있습니다.',
      extraFacts: [['개별 점포', '운영시간 상이']], verification: '기존 공개 자료 기준 · 2026년 현재 재확인 필요'
    },
    'map-market-card': {
      type: 'other', displayType: '친환경 소비', address: '경남 진주시 진양호로547번길 8-1 일대',
      action: '시장 방문 시 개인 장바구니나 다회용기를 사용하여 일회용 포장재 소비를 줄일 수 있습니다. 이는 방문자에게 권장하는 실천 행동이며, 모든 점포가 다회용기 사용을 지원한다는 의미는 아닙니다.',
      method: '방문할 점포에 다회용기 사용과 포장 방법을 확인해 주세요.',
      condition: '개별 점포의 이용 조건과 분리배출 시설 여부를 별도로 확인해 주세요.',
      hours: '점포별 상이', holidays: '점포별 상이', phone: '055-741-2151', contactLabel: '문의', verification: '점포별 이용 조건과 분리배출 시설 확인 필요'
    },
    'map-hansalim-card': {
      type: 'other', displayType: '친환경 소비', address: '매장 주소 확인 필요',
      action: '유기농·무농약 등 친환경 인증 농산물과 가공식품을 구매할 수 있는 생활협동조합 매장입니다. 개인 장바구니 사용으로 일회용 봉투 소비를 줄일 수 있습니다.',
      method: '개인 장바구니를 사용해 일회용 봉투 소비를 줄일 수 있습니다. 친환경 인증을 탄소 감축량의 직접 증거로 해석하지 않습니다.',
      condition: '재사용병 및 공급 상자 회수 활동의 진주매장 적용 여부, 매장 주소와 운영시간, 회수 가능 품목 확인이 필요합니다.',
      hours: '미확인', holidays: '미확인', phone: '1661-0800 (한살림 대표 상담번호)', contactLabel: '상담전화', verification: '매장 주소·운영시간 및 회수 활동 적용 여부 확인 필요'
    },
    'map-pyeonggeo-center-card': {
      type: 'environment', displayType: '환경정보·수거 확인', address: '경남 진주시 평거로40번길 5',
      action: '가정의 전기·수도·가스 사용량 절감과 관련한 탄소중립포인트 제도 정보를 알아보고, 재활용 자원 교환사업의 참여 가능 여부를 문의할 수 있는 공공기관입니다.',
      method: '탄소중립포인트 현장 신청 지원 여부와 종이팩·폐건전지 교환 가능 여부를 문의해 주세요.',
      condition: '현장 신청 지원 및 재활용 자원 교환 여부 확인이 필요합니다.',
      hours: '평일 09:00~18:00', holidays: '주말·공휴일', phone: '미확인', hoursNote: '민원실 기준', verification: '현장 신청 지원 및 재활용 자원 교환 여부 확인 필요'
    },
    'map-beautiful-pyeonggeo-card': {
      type: 'circular', displayType: '위치 검증 필요', address: '실제 지점 주소 확인 필요',
      action: '아름다운가게의 일반적인 실천 활동은 중고 물품 기증과 재사용 소비입니다. 다만 평거동 등록 지점이 실제 운영 중인 별도 매장인지는 확인되지 않았습니다.',
      method: '실제 지점과 운영 여부 확인 전에는 방문을 안내하지 않습니다.',
      condition: '실제 지점 확인 전에는 방문 안내 및 지도 마커 공개를 보류하는 것이 좋습니다.',
      hours: '미확인', holidays: '미확인', phone: '미확인', verifiedLocation: false, verification: '별도 매장 여부와 위치 미검증 · 지도 마커 표시 보류',
      extraFacts: [['등록 좌표', '35.1698294, 128.0530571 (위치 미검증)']]
    },
    'map-netzero-center-card': {
      type: 'environment', displayType: '환경정보·교육', address: '경남 진주시 동진로 33, 경상국립대학교 칠암캠퍼스 15동',
      action: '지역 탄소중립 정책과 온실가스 감축 활동을 지원하는 전문기관입니다. 탄소중립 사업 안내, 교육, 간담회, 기업 대상 역량 강화 컨설팅 등을 추진합니다.',
      method: '일반인 대상 상설 체험시설이 아닌 정보·교육 지원기관으로 이용 목적과 프로그램을 사전에 문의해 주세요.',
      condition: '방문 가능시간과 특정 프로그램의 운영시간은 확인이 필요합니다. 기존 좌표는 캠퍼스 대표 건물 기준이며 15동의 정확한 위치는 확인되지 않았습니다.',
      hoursLabel: '방문 가능시간', hours: '미확인', holidays: '미확인', phone: '055-772-3555~3556', verifiedLocation: false, verification: '정보·교육 지원기관 · 방문 시간과 15동 정확한 위치 확인 필요'
    },
    'map-hamotago-pyeonggeo-card': {
      type: 'transport', displayType: '하모타고 · 녹색교통', address: '경상남도 진주시 남강로373번길 3',
      action: '남강변 자전거길에 있는 진주시 공영자전거 대여소입니다.', method: '진주시민은 신분증 확인 후 대여할 수 있으며, 타 지역 이용자는 신분증을 맡긴 뒤 대여할 수 있습니다.',
      condition: '신분증을 지참해 대여소에서 확인해 주세요.', hoursLabel: '운영시간', hours: '하절기 08:00~19:00 · 동절기 09:00~17:00', holidays: '신정·설·추석 연휴 휴무', phone: '055-743-5066',
      directionsUrl: 'https://map.kakao.com/link/map/%ED%8F%89%EA%B1%B0%20%EA%B3%B5%EC%98%81%20%EB%AC%B4%EB%A3%8C%EC%9E%90%EC%A0%84%EA%B1%B0%20%EB%8C%80%EC%97%AC%EC%86%8C,35.172169589614164,128.06787901813397', verifiedLocation: true, verification: '운영 정보는 제공 이미지 기준 · 대여현황은 실시간 변동',
      extraFacts: [['운영 대수', '70대'], ['대여시간', '최대 4시간'], ['대여현황', '13대 / 70대 (제공 이미지 기준)']]
    },
    'map-hamotago-sangdae-card': {
      type: 'transport', displayType: '하모타고 · 녹색교통', address: '경상남도 진주시 상대로72번길 6',
      action: '남강변 자전거길에 있는 진주시 공영자전거 대여소입니다.', method: '진주시민은 신분증 확인 후 대여할 수 있으며, 타 지역 이용자는 신분증을 맡긴 뒤 대여할 수 있습니다.',
      condition: '신분증을 지참해 대여소에서 확인해 주세요.', hoursLabel: '운영시간', hours: '하절기 08:00~19:00 · 동절기 09:00~17:00', holidays: '신정·설·추석 연휴 휴무', phone: '055-758-5066',
      directionsUrl: 'https://map.kakao.com/link/map/%EC%83%81%EB%8C%80%20%EA%B3%B5%EC%98%81%20%EB%AC%B4%EB%A3%8C%EC%9E%90%EC%A0%84%EA%B1%B0%20%EB%8C%80%EC%97%AC%EC%86%8C,35.1840610,128.119692', verifiedLocation: true, verification: '위치·운영 정보는 진주시 공식 대여소 현황 기준 · 대여현황은 실시간 변동',
      extraFacts: [['운영 대수', '70대'], ['대여시간', '최대 4시간'], ['대여현황', '실시간 변동 · 공식 페이지에서 확인']]
    },
    'map-hamotago-chungmugong-card': {
      type: 'transport', displayType: '하모타고 · 녹색교통', address: '진주시 충무공동 44',
      action: '진주시 공영자전거 대여소입니다.', method: '진주시민은 신분증 확인 후 대여할 수 있으며, 타 지역 이용자는 신분증을 맡긴 뒤 대여할 수 있습니다.',
      condition: '신분증을 지참해 대여소에서 확인해 주세요.', hoursLabel: '운영시간', hours: '하절기 08:00~19:00 · 동절기 09:00~17:00', holidays: '신정·설·추석 연휴 휴무', phone: '055-763-5066',
      directionsUrl: 'https://map.kakao.com/link/map/%EC%B6%A9%EB%AC%B4%EA%B3%B5%20%EA%B3%B5%EC%98%81%20%EB%AC%B4%EB%A3%8C%EC%9E%90%EC%A0%84%EA%B1%B0%20%EB%8C%80%EC%97%AC%EC%86%8C,35.17335835796439,128.13103333982818', verifiedLocation: true, verification: '위치·운영 정보는 진주시 공식 대여소 현황 기준 · 대여현황은 실시간 변동',
      extraFacts: [['운영 대수', '70대'], ['대여시간', '최대 4시간'], ['대여현황', '실시간 변동 · 공식 페이지에서 확인']]
    },
    'map-bike-rental-card': {
      type: 'transport', displayType: '하모타고 · 녹색교통', address: '경상남도 진주시 강남로 188',
      action: '진주시 공영자전거 대여소입니다.', method: '진주시민은 신분증 확인 후 대여할 수 있으며, 타 지역 이용자는 신분증을 맡긴 뒤 대여할 수 있습니다.',
      condition: '신분증을 지참해 대여소에서 확인해 주세요.', hoursLabel: '운영시간', hours: '하절기 08:00~19:00 · 동절기 09:00~17:00', holidays: '신정·설·추석 연휴 휴무', phone: '055-762-5066',
      directionsUrl: 'https://map.kakao.com/link/map/%EC%B9%A0%EC%95%94%20%EA%B3%B5%EC%98%81%20%EB%AC%B4%EB%A3%8C%EC%9E%90%EC%A0%84%EA%B1%B0%20%EB%8C%80%EC%97%AC%EC%86%8C,35.18502560422833,128.0949992331689', verifiedLocation: true, verification: '위치·운영 정보는 진주시 공식 대여소 현황 기준 · 대여현황은 실시간 변동',
      extraFacts: [['운영 대수', '70대'], ['대여시간', '최대 4시간'], ['대여현황', '실시간 변동 · 공식 페이지에서 확인']]
    },
    'map-chilam-office-card': {
      type: 'environment', displayType: '실천 내용 확인 필요', address: '경남 진주시 강남로177번길 30-7',
      action: '종이팩·폐건전지 등 재활용 자원 수거 및 교환사업 운영 여부를 확인해야 하는 공공기관입니다. 현재 구체적인 탄소중립 프로그램은 확인되지 않았습니다.',
      method: '재활용 자원 수거·교환사업의 운영 여부와 이용 방법을 문의해 주세요.',
      hoursLabel: '민원실 운영시간', hours: '평일 09:00~18:00*', holidays: '주말·공휴일 원칙', phone: '미확인',
      condition: '민원실 운영시간은 일반 기준이며 지점별 확인이 필요합니다. 무인민원발급기 이용시간과 탄소중립 실천사업 운영시간은 구분해야 합니다.',
      extraFacts: [['무인민원발급기', '24시간 운영으로 등록된 자료 있음']], verification: '일반 민원실 기준 · 무인발급기와 사업 운영시간 구분 필요'
    },
    'map-gajwa-151-lounge-washer-card': {
      type: 'tumbler', displayType: '다회용컵 사용 · 텀블러 세척', address: '경상국립대학교 가좌캠퍼스 사회과학관(151동) 2층 라운지',
      action: '사회과학관 2층 라운지에 있는 텀블러 세척기를 이용할 수 있습니다.',
      method: '151동 2층 라운지의 텀블러 세척기를 이용하세요.',
      condition: '건물 출입 및 세척기 이용 가능 여부와 운영시간은 현장에서 확인해 주세요.',
      hoursLabel: '이용 가능시간', hours: '확인 필요', holidays: '확인 필요', phone: '확인 필요',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=35.15467315058051%2C128.10034289841633', verifiedLocation: true, verification: '위치는 경상국립대학교 공식 캠퍼스맵의 사회과학관(151동) 건물 좌표 기준이며, 기기 실내 위치와 구분됩니다.',
      extraFacts: [['위치 안내', '151동 2층 라운지'], ['건물 좌표', '35.15467315058051, 128.10034289841633']]
    },
    'map-gajwa-building7-washer-card': {
      type: 'tumbler', displayType: '다회용컵 사용 · 텀블러 세척', address: '경상국립대학교 가좌캠퍼스 7동 1층',
      action: '가좌캠퍼스 7동 1층에 있는 텀블러 세척기를 이용할 수 있습니다.',
      method: '7동 1층에 설치된 텀블러 세척기를 이용하세요.',
      condition: '건물 출입 및 세척기 이용 가능 여부와 운영시간은 현장에서 확인해 주세요.',
      hoursLabel: '이용 가능시간', hours: '확인 필요', holidays: '확인 필요', phone: '확인 필요',
      googleMapsUrl: 'https://maps.app.goo.gl/cbQicqcjMiuJeC7FA', verifiedLocation: true, verification: '건물 좌표는 경상국립대학교 공식 캠퍼스맵의 GNU컨벤션센터(7동) 기준이며 세척기 실내 위치와는 구분됩니다.',
      extraFacts: [['위치 안내', '7동 1층'], ['건물 좌표', '35.15453405115274, 128.10201186352603']]
    },
    'map-central-library-washer-card': {
      type: 'tumbler', displayType: '다회용컵 사용 · 텀블러 세척', address: '경남 진주시 진주대로 501 · 경상국립대학교 가좌캠퍼스 중앙도서관 1층 정문',
      action: '중앙도서관 1층 정문에 있는 텀블러 세척기를 이용할 수 있습니다.',
      method: '중앙도서관 1층 정문에 설치된 텀블러 세척기를 이용하세요.',
      condition: '도서관 출입 및 세척기 이용 가능 여부와 이용 조건을 현장에서 확인해 주세요.',
      hoursLabel: '이용 가능시간', hours: '확인 필요', holidays: '확인 필요', phone: '확인 필요',
      kakaoPlaceId: '8681577', verifiedLocation: true, verification: '좌표는 사용자가 제공한 중앙도서관 좌표입니다.',
      extraFacts: [['카카오맵 장소 ID', '8681577'], ['위도·경도', '35.1534125, 128.0995781']]
    },
    'map-gajwa-washer-card': {
      type: 'tumbler', displayType: '다회용컵 사용 · 텀블러 세척', address: '경상국립대학교 가좌캠퍼스 · 202동',
      action: '개인 텀블러 세척을 통한 다회용컵 사용 실천', locationLabel: '2층 복도', compactFacts: true,
      method: '미래혁신관 2층 복도에 설치된 텀블러 세척기를 이용하세요.',
      condition: '교내 시설의 이용 가능 여부와 이용 조건은 현장에서 확인해 주세요.',
      hoursLabel: '이용 가능시간', hours: '확인 필요', holidays: '확인 필요', phone: '확인 필요',
      verifiedLocation: true, verification: '장소 정보는 제공된 내용 기준. 좌표는 Mapcarta의 경상국립대 가좌캠퍼스 건물 좌표이며 기기 단독 좌표는 아닙니다.',
      extraFacts: [['위도·경도', '35.15447, 128.09741 (건물 기준 좌표)']]
    },
    'map-probicycle-card': {
      type: 'transport', displayType: '녹색교통', address: '경남 진주시 강남로 245',
      action: '자전거 판매 매장으로, 자전거를 교통수단으로 이용하려는 방문자가 관련 제품과 정보를 알아볼 수 있습니다. 이를 통해 자동차 이용을 줄이는 친환경 이동 방식을 실천할 수 있습니다.',
      method: '자전거를 이동 수단으로 활용할 때 자동차 이용을 줄이는 데 참여할 수 있습니다.',
      condition: '판매 품목과 운영시간은 방문 전에 매장에 확인해 주세요.',
      hours: '미확인', holidays: '미확인', phone: '055-758-1189', verification: '운영시간 및 판매 품목 확인 필요'
    }
  };
  const typeLabels = {
    tumbler: '다회용컵 사용',
    circular: '재사용·자원순환',
    transport: '녹색교통',
    recycling: '분리배출',
    environment: '환경정보',
    other: '실천 정보 미분류'
  };
  if (document.documentElement.classList.contains('map-page')) {
    const officialStations = Array.isArray(window.JINJU_HAMOTAGO_STATIONS) ? window.JINJU_HAMOTAGO_STATIONS : [];
    const stationList = mapSection.querySelector('#map-place-list') || mapSection;
    const bikeIcon = '<svg viewBox="0 0 24 24"><circle cx="6" cy="17" r="3"></circle><circle cx="18" cy="17" r="3"></circle><path d="m6 17 4-8h4l4 8M10 9l2 8m-6 0h6M9 6h3"></path></svg>';
    officialStations.forEach((station, index) => {
      const stationNumber = String(index + 1).padStart(2, '0');
      const cardId = `map-hamotago-official-${stationNumber}`;
      const stationName = String(station.name || '').replace(/^\d+\.\s*/, '').trim();
      const areas = [...new Set([...(station.areas || []), '진주시'])].join(' ');
      const card = document.createElement('article');
      card.className = 'map-place-card is-expandable';
      card.id = cardId;
      card.dataset.lat = String(station.lat);
      card.dataset.lng = String(station.lng);
      card.dataset.mapAreas = areas;
      card.dataset.mapSource = 'hamotago-official';
      card.setAttribute('aria-label', `하모타고 대여소 · ${stationName}`);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-expanded', 'false');
      card.hidden = true;

      const icon = document.createElement('span');
      icon.className = 'map-place-category-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = bikeIcon;
      const copy = document.createElement('div');
      copy.className = 'map-place-copy';
      const tag = document.createElement('span');
      tag.className = 'map-place-tag';
      tag.textContent = '하모타고 · 녹색교통';
      const title = document.createElement('strong');
      title.textContent = `하모타고 대여소 · ${stationName}`;
      const summary = document.createElement('p');
      summary.textContent = `진주시 공영자전거 대여 위치 · ${Number(station.lat).toFixed(6)}, ${Number(station.lng).toFixed(6)}`;
      copy.append(tag, title, summary);
      const details = document.createElement('div');
      details.className = 'map-place-expanded';
      details.hidden = true;
      const source = document.createElement('a');
      source.className = 'source-link';
      source.href = 'https://www.jinju.go.kr/hamotago';
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      source.textContent = '진주시 하모타고 공식 페이지';
      details.append(source);
      card.append(icon, copy, details);
      stationList.append(card);

      placeFacts[cardId] = {
        type: 'transport', displayType: '하모타고 · 녹색교통',
        address: `공식 좌표 ${Number(station.lat).toFixed(6)}, ${Number(station.lng).toFixed(6)}`,
        action: '진주시 공영자전거 하모타고를 대여할 수 있는 공식 거점입니다.',
        method: '대여 가능 자전거 수와 실제 이용 가능 여부는 하모타고 공식 페이지에서 확인해 주세요.',
        condition: '2시간 무료 이용 안내가 제공됩니다. 최신 이용 조건과 대여 가능 수량은 공식 페이지를 확인해 주세요.',
        hours: '07:00~20:00', holidays: '공식 페이지 참고', phone: '055-755-3549',
        verification: '진주시 하모타고 공개 대여소 API 좌표 · 2026-11-06 확인',
        extraFacts: [['대여소 위치', stationName]],
        directionsUrl: `https://map.kakao.com/link/map/${encodeURIComponent(`하모타고 ${stationName}`)},${station.lat},${station.lng}`
      };
    });
  }
  const cards = [...mapSection.querySelectorAll('.map-place-card')];
  const seenIds = new Set();
  const places = cards.filter(card => {
    if (!card.id || seenIds.has(card.id)) {
      card.hidden = true;
      return false;
    }
    seenIds.add(card.id);
    const data = placeFacts[card.id] || {};
    card.dataset.mapType = data.type || 'other';
    card.dataset.mapSearch = [data.displayType, data.address, data.action, data.method].filter(Boolean).join(' ');
    const practiceSummary = card.querySelector(':scope > .map-place-copy > p');
    const practiceText = data.action || data.method;
    if (practiceSummary && practiceText) {
      practiceSummary.textContent = practiceText;
      practiceSummary.id = `${card.id}-practice-summary`;
      card.setAttribute('aria-describedby', practiceSummary.id);
    }
    if (data.verifiedLocation === false) card.dataset.locationVerified = 'false';
    return true;
  });
  if (!document.documentElement.classList.contains('map-page')) return;
  const districtFilters = mapSection.querySelector('.map-district-tabs');
  const search = mapSection.querySelector('#map-place-search');
  if (!districtFilters || !search) return;

  const searchWrap = search.closest('.map-place-search');
  const suggestionList = document.createElement('div');
  suggestionList.className = 'map-place-suggestions';
  suggestionList.id = 'map-place-suggestions';
  suggestionList.setAttribute('role', 'listbox');
  suggestionList.setAttribute('aria-label', '장소 추천 검색어');
  suggestionList.hidden = true;
  searchWrap?.append(suggestionList);
  search.setAttribute('role', 'combobox');
  search.setAttribute('aria-autocomplete', 'list');
  search.setAttribute('aria-controls', suggestionList.id);
  search.setAttribute('aria-expanded', 'false');

  const suggestionQuery = value => normalize(value);
  function editDistanceWithinOne(left, right) {
    if (Math.abs(left.length - right.length) > 1) return false;
    if (left.length === right.length) {
      const differences = [];
      for (let i = 0; i < left.length; i++) if (left[i] !== right[i]) differences.push(i);
      if (differences.length <= 1) return true;
      if (differences.length === 2 && differences[1] === differences[0] + 1) {
        const [first, second] = differences;
        return left[first] === right[second] && left[second] === right[first];
      }
      return false;
    }
    let i = 0, j = 0, edits = 0;
    while (i < left.length && j < right.length) {
      if (left[i] === right[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (left.length > right.length) i++;
      else j++;
    }
    return true;
  }
  function updateSuggestions() {
    const query = suggestionQuery(search.value);
    suggestionList.replaceChildren();
    if (!query) {
      suggestionList.hidden = true;
      search.setAttribute('aria-expanded', 'false');
      return;
    }
    const district = currentDistrict();
    const matches = places.map(card => {
      const data = placeFacts[card.id] || {};
      const title = card.querySelector('.map-place-copy strong')?.textContent.trim() || card.getAttribute('aria-label') || '';
      const type = data.displayType || typeLabels[data.type] || typeLabels.other;
      const fields = [title, type, typeLabels[data.type], data.address, card.dataset.mapAreas, data.action, data.method, data.condition, data.hours, data.holidays, data.phone].filter(Boolean);
      const exact = fields.some(field => suggestionQuery(field).includes(query));
      const fuzzy = !exact && window.mapPlaceSearchMatches(search.value, fields.join(' '));
      const areaMatch = (card.dataset.mapAreas || '').split(/\s+/).includes(district);
      const typeMatch = selectedType === 'all' || data.type === selectedType;
      return { card, title, type, address: data.address || '주소 확인 필요', exact, fuzzy, areaMatch, typeMatch };
    }).filter(item => (item.exact || item.fuzzy) && item.areaMatch && item.typeMatch)
      .sort((a, b) => Number(b.exact) - Number(a.exact) || a.title.localeCompare(b.title, 'ko'))
      .slice(0, 6);
    if (!matches.length) {
      suggestionList.hidden = true;
      search.setAttribute('aria-expanded', 'false');
      return;
    }
    matches.forEach(({ card, title, type, address }, index) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'map-place-suggestion';
      option.id = `map-place-suggestion-${index}`;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      const copy = document.createElement('span');
      const name = document.createElement('strong');
      const meta = document.createElement('small');
      name.textContent = title;
      meta.textContent = `${type} · ${address}`;
      copy.append(name, meta);
      const arrow = document.createElement('span');
      arrow.className = 'map-place-suggestion-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';
      option.append(copy, arrow);
      option.addEventListener('click', () => {
        search.value = title;
        search.dispatchEvent(new Event('input', { bubbles: true }));
        suggestionList.hidden = true;
        search.setAttribute('aria-expanded', 'false');
        openSheet(card, true);
      });
      suggestionList.append(option);
    });
    suggestionList.hidden = false;
    search.setAttribute('aria-expanded', 'true');
  }
  search.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' && !suggestionList.hidden) {
      event.preventDefault();
      suggestionList.querySelector('button')?.focus();
    } else if (event.key === 'Escape' && !suggestionList.hidden) {
      event.preventDefault();
      suggestionList.hidden = true;
      search.setAttribute('aria-expanded', 'false');
    } else if (event.key === 'Enter' && !suggestionList.hidden) {
      event.preventDefault();
      suggestionList.querySelector('button')?.click();
    }
  });
  suggestionList.addEventListener('keydown', event => {
    const options = [...suggestionList.querySelectorAll('button')];
    const index = options.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      options[(index + (event.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length]?.focus();
    } else if (event.key === 'Escape') {
      suggestionList.hidden = true;
      search.setAttribute('aria-expanded', 'false');
      search.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!searchWrap?.contains(event.target)) {
      suggestionList.hidden = true;
      search.setAttribute('aria-expanded', 'false');
    }
  });

  const typeFilters = document.createElement('nav');
  typeFilters.className = 'map-type-tabs';
  typeFilters.setAttribute('aria-label', '실천 유형 선택');
  typeFilters.innerHTML = '<button type="button" data-type="all" aria-pressed="true">전체 유형</button><button type="button" data-type="tumbler" aria-pressed="false">다회용컵 사용</button><button type="button" data-type="circular" aria-pressed="false">재사용·자원순환</button><button type="button" data-type="transport" aria-pressed="false">녹색교통</button><button type="button" data-type="recycling" aria-pressed="false">분리배출</button><button type="button" data-type="environment" aria-pressed="false">환경정보</button>';
  districtFilters.after(typeFilters);
  districtFilters.id = districtFilters.id || 'map-district-tabs';
  typeFilters.id = 'map-type-tabs';
  const filterToggle = document.createElement('button');
  filterToggle.type = 'button';
  filterToggle.className = 'map-filter-toggle';
  filterToggle.setAttribute('aria-controls', `${districtFilters.id} ${typeFilters.id}`);
  mapSection.classList.add('is-filters-collapsed');
  filterToggle.setAttribute('aria-expanded', 'false');
  filterToggle.textContent = '필터 보기';
  filterToggle.addEventListener('click', () => {
    const collapsed = mapSection.classList.toggle('is-filters-collapsed');
    filterToggle.setAttribute('aria-expanded', String(!collapsed));
    filterToggle.textContent = collapsed ? '필터 보기' : '필터 숨기기';
  });
  mapSection.append(filterToggle);

  const listStatus = document.createElement('p');
  listStatus.className = 'map-place-list-status';
  listStatus.setAttribute('role', 'status');
  listStatus.setAttribute('aria-live', 'polite');
  const firstCard = places[0];
  if (firstCard) firstCard.before(listStatus);
  const listToggle = document.createElement('button');
  listToggle.type = 'button';
  listToggle.className = 'map-place-list-toggle';
  listToggle.setAttribute('aria-controls', 'map-place-list');
  listToggle.setAttribute('aria-expanded', 'false');
  listToggle.textContent = '장소 목록';
  mapSection.append(listToggle);
  listToggle.addEventListener('click', () => {
    const isOpen = mapSection.classList.toggle('is-list-open');
    listToggle.setAttribute('aria-expanded', String(isOpen));
    listToggle.textContent = isOpen ? '목록 닫기' : '장소 목록';
  });

  const shell = mapSection.querySelector('.map-shell');
  const sheet = document.createElement('section');
  sheet.className = 'map-place-sheet';
  sheet.id = 'map-place-sheet';
  sheet.hidden = true;
  sheet.setAttribute('aria-label', '선택한 장소 정보');
  sheet.setAttribute('aria-labelledby', 'map-place-sheet-title');
  sheet.innerHTML = '<div class="map-place-sheet-handle" aria-hidden="true"></div><figure class="map-place-sheet-photo" hidden><img alt=""><figcaption>장소 유형 참고 이미지 · 실제 장소 사진이 아닐 수 있습니다.</figcaption></figure><header class="map-place-sheet-header"><div class="map-place-sheet-heading"><h2 id="map-place-sheet-title" tabindex="-1"></h2><span class="map-place-sheet-type"></span></div><button type="button" class="map-place-sheet-close" aria-label="장소 정보 닫기"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg></button></header><div class="map-place-sheet-action-block"><span class="map-place-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 4c-8 0-14 4-14 11 0 3 2 5 5 5 7 0 9-8 9-16Z"/><path d="M5 20c3-5 6-8 11-11"/></svg></span><p class="map-place-sheet-action"></p></div><dl class="map-place-sheet-facts"></dl><div class="map-place-sheet-actions"><a class="map-place-directions" target="_blank" rel="noopener noreferrer">카카오 길찾기</a><a class="map-place-naver-directions" target="_blank" rel="noopener noreferrer">네이버 길찾기</a><button type="button" class="map-place-more" aria-expanded="false">자세히 보기</button></div><div class="map-place-sheet-details" hidden></div>';
  const mapLegend = mapSection.querySelector('.map-legend');
  if (mapLegend) mapLegend.after(sheet);
  else if (shell) shell.after(sheet);
  const nameNode = sheet.querySelector('h2');
  const photoNode = sheet.querySelector('.map-place-sheet-photo');
  const photoImage = photoNode.querySelector('img');
  const typeNode = sheet.querySelector('.map-place-sheet-type');
  const actionNode = sheet.querySelector('.map-place-sheet-action');
  const factsNode = sheet.querySelector('.map-place-sheet-facts');
  const detailsNode = sheet.querySelector('.map-place-sheet-details');
  const moreButton = sheet.querySelector('.map-place-more');
  const sheetToggleButton = sheet.querySelector('.map-place-sheet-close');
  const sheetHandle = sheet.querySelector('.map-place-sheet-handle');
  const collapsibleNodes = [photoNode, actionNode.parentElement, factsNode, sheet.querySelector('.map-place-sheet-actions'), detailsNode];
  sheetHandle.removeAttribute('aria-hidden');
  sheetHandle.setAttribute('role', 'button');
  sheetHandle.setAttribute('tabindex', '0');
  sheetHandle.setAttribute('aria-label', '장소 정보 접기 또는 펼치기');
  const setSheetCollapsed = collapsed => {
    sheet.classList.toggle('is-collapsed', collapsed);
    sheetHandle.setAttribute('aria-expanded', String(!collapsed));
    sheetToggleButton.setAttribute('aria-label', collapsed ? '장소 정보 펼치기' : '장소 정보 접기');
    collapsibleNodes.forEach(node => { node.inert = collapsed; });
  };
  let selectedCard = null;
  let selectedType = 'all';

  const normalize = value => (value || '').normalize('NFC').replace(/\s+/g, '').toLocaleLowerCase();
  window.mapPlaceSearchMatches = (query, content) => {
    const terms = String(query || '').trim().split(/\s+/).map(normalize).filter(Boolean);
    if (!terms.length) return true;
    const rawContent = String(content || '');
    const normalizedContent = normalize(rawContent);
    const candidates = rawContent.split(/[^\p{L}\p{N}]+/u).map(normalize).filter(term => term.length >= 3);
    return terms.every(term => normalizedContent.includes(term) || (term.length >= 3 && candidates.some(candidate => editDistanceWithinOne(term, candidate))));
  };
  const currentDistrict = () => window.mapPlaceSearchLiveDistrict || districtFilters.querySelector('[aria-pressed="true"]')?.dataset.mapDistrict || '진주시';
  function applyFilters() {
    const district = currentDistrict();
    const query = normalize(search.value);
    const visible = [];
    places.forEach(card => {
      const data = placeFacts[card.id] || {};
      const areaMatch = (card.dataset.mapAreas || '').split(/\s+/).includes(district);
      const typeMatch = selectedType === 'all' || data.type === selectedType;
      const searchableText = card.textContent + ' ' + (card.dataset.mapAreas || '') + ' ' + (typeLabels[data.type] || '') + ' ' + card.dataset.mapSearch;
      const textMatch = !query || window.mapPlaceSearchMatches(search.value, searchableText);
      card.hidden = !(areaMatch && typeMatch && textMatch);
      if (!card.hidden) visible.push(card);
    });
    listStatus.textContent = visible.length ? `장소 ${visible.length}곳` : '조건에 맞는 장소가 없습니다. 다른 지역이나 실천 유형을 선택해 보세요.';
    window.mapPlaceSearchLiveType = selectedType === 'all' ? '' : selectedType;
    window.mapPlaceSearchLiveDistrict = district;
    window.dispatchEvent(new Event('map-place-search-live'));
    if (selectedCard && selectedCard.hidden) closeSheet();
  }

  typeFilters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    selectedType = button.dataset.type;
    typeFilters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    applyFilters();
    updateSuggestions();
  }));
  districtFilters.addEventListener('click', () => window.setTimeout(() => { applyFilters(); updateSuggestions(); }, 0));
  search.addEventListener('input', () => {
    window.mapPlaceSearchLiveQuery = search.value.trim().toLocaleLowerCase();
    applyFilters();
    updateSuggestions();
  });
  window.addEventListener('map-place-search-change', () => { applyFilters(); updateSuggestions(); });

  function addFact(label, value, iconName) {
    const row = document.createElement('div');
    row.className = 'map-place-sheet-fact';
    if (!label) row.classList.add('is-simple');
    const icon = document.createElement('span');
    icon.className = 'map-place-fact-icon';
    icon.setAttribute('aria-hidden', 'true');
    const paths = {
      hours: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.2 2"/>',
      holiday: '<rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M8 3.5v4M16 3.5v4M4 9.5h16M9 13l6 5m0-5-6 5"/>',
      address: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/>',
      floor: '<path d="m5 4 14 8-14 8Z"/>',
      phone: '<path d="M7 4h3l1.3 4-2 1.5a14 14 0 0 0 5.2 5.2l1.5-2 4 1.3v3c0 1.1-.9 2-2 2A15 15 0 0 1 5 6c0-1.1.9-2 2-2Z"/>',
      status: '<path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>'
    };
    icon.innerHTML = `<svg viewBox="0 0 24 24" focusable="false">${paths[iconName] || paths.status}</svg>`;
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    row.append(icon, term, description);
    factsNode.append(row);
  }
  function sourceLinks(card) {
    const links = [...card.querySelectorAll('.reuse-store-links a[href], .source-link[href]')]
      .filter(link => !link.href.includes('map.kakao.com/link/search'));
    return links;
  }
  function openSheet(card, moveMap = false, focusSheet = false) {
    if (!card || card.hidden) return;
    mapSection.classList.remove('is-list-open');
    listToggle.setAttribute('aria-expanded', 'false');
    listToggle.textContent = '장소 목록';
    sheet.classList.remove('is-closing', 'is-dragging');
    sheet.style.removeProperty('transform');
    setSheetCollapsed(false);
    selectedCard = card;
    window.dispatchEvent(new CustomEvent('map-place-marker-select', { detail: { cardId: card.id } }));
    sheet.dataset.placeId = card.id;
    places.forEach(place => {
      place.removeAttribute('aria-current');
      if (place !== card) place.setAttribute('aria-expanded', 'false');
    });
    card.setAttribute('aria-current', 'true');
    card.setAttribute('aria-expanded', 'true');
    const info = placeFacts[card.id] || {};
    const title = card.querySelector('.map-place-copy strong')?.textContent.trim() || card.getAttribute('aria-label') || '장소 정보';
    const type = info.displayType || typeLabels[info.type] || typeLabels.other;
    const referenceImage = card.querySelector('.map-place-expanded-photo img, .reuse-store-cover img');
    photoNode.hidden = !referenceImage;
    if (referenceImage) {
      photoImage.src = referenceImage.getAttribute('src');
      photoImage.alt = `${title} 장소 유형 참고 이미지`;
    } else {
      photoImage.removeAttribute('src');
      photoImage.alt = '';
    }
    const address = info.address || card.querySelector('.map-place-expanded-copy p, .map-place-copy p')?.textContent.trim() || '주소 확인 필요';
    const action = info.action || '방문 전 이용 가능 여부와 환경 실천 정보를 확인해 주세요.';
    const method = info.method || action;
    const condition = info.condition || '이용 조건 확인 필요';
    nameNode.textContent = title;
    typeNode.textContent = type;
    actionNode.textContent = action;
    factsNode.replaceChildren();
    if (info.compactFacts) {
      addFact('', address, 'address');
      addFact('', info.locationLabel || '위치 확인 필요', 'floor');
    } else {
      addFact(info.hoursLabel || '운영시간', [info.hours || '운영시간 확인 필요', info.hoursNote].filter(Boolean).join(' · '), 'hours');
      addFact('정기 휴무일', info.holidays || '휴무일 확인 필요', 'holiday');
      addFact('주소', address, 'address');
      addFact(info.contactLabel || '연락처', info.phone || '연락처 확인 필요', 'phone');
      addFact('정보 확인일 및 검증 상태', `공식 확인일 미기재 · ${info.verification || '추가 확인 필요'}`, 'status');
      if (info.extraFacts) info.extraFacts.forEach(([label, value]) => addFact(label, value, 'status'));
    }
    const directions = sheet.querySelector('.map-place-directions');
    directions.href = info.directionsUrl || info.googleMapsUrl || (info.kakaoPlaceId ? `https://place.map.kakao.com/${encodeURIComponent(info.kakaoPlaceId)}` : `https://map.kakao.com/link/search/${encodeURIComponent(title)}`);
    const naverDirections = sheet.querySelector('.map-place-naver-directions');
    const selectedCard = document.getElementById(sheet.dataset.placeId);
    const latitude = Number(selectedCard?.dataset.lat), longitude = Number(selectedCard?.dataset.lng);
    if (Number.isFinite(latitude) && Number.isFinite(longitude) && latitude >= -85 && latitude <= 85) {
      const mercatorX = (longitude * 20037508.34) / 180;
      const mercatorY = Math.log(Math.tan(((90 + latitude) * Math.PI) / 360)) * (20037508.34 / Math.PI);
      naverDirections.href = `https://map.naver.com/p/directions/-/${mercatorX.toFixed(3)},${mercatorY.toFixed(3)},${encodeURIComponent(title)},,PLACE_POI/-/transit?c=15.00,0,0,0,dh`;
    } else {
      naverDirections.href = `https://map.naver.com/p/search/${encodeURIComponent(title)}`;
    }
    detailsNode.replaceChildren();
    const appendDetail = (label, value) => {
      const group = document.createElement('section');
      const heading = document.createElement('h3');
      const text = document.createElement('p');
      heading.textContent = label;
      text.textContent = value;
      group.append(heading, text);
      detailsNode.append(group);
    };
    appendDetail('실천 방법', method);
    appendDetail('이용 조건 및 주의사항', condition);
    appendDetail('정보 출처', '제공 자료 기준 · 공식 출처 확인 필요');
    const sources = sourceLinks(card);
    const sourceGroup = document.createElement('section');
    const sourceTitle = document.createElement('h3');
    sourceTitle.textContent = '공식 홈페이지 및 출처';
    sourceGroup.append(sourceTitle);
    if (sources.length) {
      sources.forEach(source => {
        const link = document.createElement('a');
        link.href = source.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = source.textContent.trim() || '정보 출처 보기';
        sourceGroup.append(link);
      });
    } else {
      const note = document.createElement('p');
      note.textContent = '공식 출처 확인 필요';
      sourceGroup.append(note);
    }
    detailsNode.append(sourceGroup);
    detailsNode.hidden = true;
    moreButton.textContent = '자세히 보기';
    moreButton.setAttribute('aria-expanded', 'false');
    sheet.hidden = false;
    if (moveMap) window.focusMapPlace?.(card);
    if (focusSheet) nameNode.focus({ preventScroll: true });
  }
  function closeSheet(restoreFocus = false) {
    sheet.hidden = true;
    window.dispatchEvent(new Event('map-place-marker-reset'));
    sheet.classList.remove('is-closing', 'is-dragging');
    sheet.style.removeProperty('transform');
    setSheetCollapsed(false);
    if (selectedCard) {
      selectedCard.removeAttribute('aria-current');
      selectedCard.setAttribute('aria-expanded', 'false');
    }
    const previousCard = selectedCard;
    selectedCard = null;
    if (restoreFocus && previousCard && !previousCard.hidden) previousCard.focus({ preventScroll: true });
  }
  window.mapSelectPlaceCard = openSheet;
  sheetToggleButton.addEventListener('click', () => setSheetCollapsed(!sheet.classList.contains('is-collapsed')));
  sheetHandle.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setSheetCollapsed(!sheet.classList.contains('is-collapsed'));
  });
  let dragStartY = 0;
  let dragDistance = 0;
  let dragSurface = null;
  let suppressHandleClick = false;
  const finishDrag = () => {
    if (!dragSurface) return;
    const surface = dragSurface;
    suppressHandleClick = surface === sheetHandle && Math.abs(dragDistance) > 6;
    dragSurface = null;
    surface.classList.remove('is-dragging');
    sheet.classList.remove('is-dragging');
    const threshold = Math.min(100, sheet.offsetHeight * .18);
    if (dragDistance > threshold) setSheetCollapsed(true);
    else if (dragDistance < -threshold) setSheetCollapsed(false);
    sheet.style.removeProperty('transform');
  };
  [sheetHandle, sheet.querySelector('.map-place-sheet-header')].forEach(surface => {
    surface.addEventListener('pointerdown', event => {
      if (window.matchMedia('(min-width: 641px)').matches) return;
      if (event.target.closest('button, a') || (event.pointerType === 'mouse' && event.button !== 0)) return;
      dragSurface = surface;
      dragStartY = event.clientY;
      dragDistance = 0;
      surface.setPointerCapture?.(event.pointerId);
      sheet.classList.add('is-dragging');
    });
    surface.addEventListener('pointermove', event => {
      if (dragSurface !== surface) return;
      dragDistance = event.clientY - dragStartY;
      if (!sheet.classList.contains('is-collapsed')) dragDistance = Math.max(0, dragDistance);
      else dragDistance = Math.min(0, dragDistance);
      sheet.style.transform = `translate(-50%, ${dragDistance}px)`;
      if (dragDistance !== 0) event.preventDefault();
    });
    surface.addEventListener('pointerup', event => {
      if (dragSurface !== surface) return;
      if (surface.hasPointerCapture?.(event.pointerId)) surface.releasePointerCapture(event.pointerId);
      finishDrag();
    });
    surface.addEventListener('pointercancel', finishDrag);
  });
  sheetHandle.addEventListener('click', () => {
    if (suppressHandleClick) {
      suppressHandleClick = false;
      return;
    }
    setSheetCollapsed(!sheet.classList.contains('is-collapsed'));
  });
  moreButton.addEventListener('click', () => {
    detailsNode.hidden = !detailsNode.hidden;
    moreButton.setAttribute('aria-expanded', String(!detailsNode.hidden));
    moreButton.textContent = detailsNode.hidden ? '자세히 보기' : '접기';
  });
  places.forEach(card => {
    card.setAttribute('aria-controls', sheet.id);
    card.addEventListener('click', event => {
      if (event.target.closest('a, button')) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openSheet(card, true);
    }, true);
    card.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openSheet(card, true, true);
    }, true);
  });
  mapSection.querySelector('#kakao-map')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) closeSheet();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (!sheet.hidden && !detailsNode.hidden) {
      detailsNode.hidden = true;
      moreButton.setAttribute('aria-expanded', 'false');
      moreButton.focus({ preventScroll: true });
      event.preventDefault();
      return;
    }
    if (!sheet.hidden) {
      closeSheet(true);
      event.preventDefault();
    }
    if (mapSection.classList.contains('is-list-open')) {
      mapSection.classList.remove('is-list-open');
      listToggle.setAttribute('aria-expanded', 'false');
      listToggle.textContent = '장소 목록';
      listToggle.focus({ preventScroll: true });
      event.preventDefault();
    }
  });
  applyFilters();
})();
