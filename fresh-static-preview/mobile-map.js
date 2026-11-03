(() => {
  const mapSection = document.querySelector('#map');
  if (!mapSection) return;

  const definitions = {
    'map-beautiful-store-card': {
      type: 'circular',
      action: '기증 가능한 물품을 확인하고 중고 물품 재사용에 참여해 보세요.',
      method: '기증 품목과 접수 가능 여부를 매장에 문의한 뒤 방문해 주세요.',
      condition: '접수 가능 품목과 방법은 방문 전에 매장에 확인해 주세요.'
    },
    'map-zero-waste-card': {
      type: 'circular',
      action: '포장재를 줄일 수 있는 상품이나 리필 취급 여부를 매장에 확인해 보세요.',
      method: '다회용 용기 사용이나 포장 최소화가 가능한지 매장에 문의해 주세요.',
      condition: '상품 구성과 이용 조건은 방문 전에 매장에 확인해 주세요.'
    },
    'map-seongbuk-card': {
      type: 'environment',
      action: '탄소중립 관련 업무나 프로그램 운영 여부를 방문 전에 문의해 보세요.',
      method: '일반 민원 업무와 탄소중립 사업 운영은 다를 수 있으니 담당 부서에 확인해 주세요.',
      condition: '탄소중립 관련 프로그램 운영은 프로젝트 자료에서 확인되지 않았습니다.'
    },
    'map-enamall-card': {
      type: 'other',
      action: '방문 시 가까운 거리는 도보나 대중교통 이용을 고려해 보세요.',
      method: '방문 전에 상가 이용 정보와 대중교통 접근 방법을 확인해 주세요.',
      condition: '상가의 탄소중립 프로그램은 프로젝트 자료에서 확인되지 않았습니다.'
    },
    'map-market-card': {
      type: 'other',
      action: '방문 시 장바구니를 챙기고 가까운 거리는 도보·대중교통을 고려해 보세요.',
      method: '포장 방식이나 다회용 장바구니 이용 조건은 점포에 확인해 주세요.',
      condition: '시장 차원의 탄소중립 프로그램은 프로젝트 자료에서 확인되지 않았습니다.'
    },
    'map-hansalim-card': {
      type: 'other',
      action: '장바구니나 다회용 용기 사용이 가능한지 매장에 확인해 보세요.',
      method: '상품 판매 사실만으로 탄소배출 감축 효과를 단정할 수 없습니다. 포장·용기 사용 조건을 매장에 확인해 주세요.',
      condition: '매장 이용 조건과 포장 정책은 프로젝트 자료에서 확인되지 않았습니다.'
    },
    'map-pyeonggeo-center-card': {
      type: 'environment',
      action: '탄소중립 관련 업무나 프로그램 운영 여부를 방문 전에 문의해 보세요.',
      method: '일반 민원 업무와 환경 프로그램 운영 여부를 구분해 담당 부서에 확인해 주세요.',
      condition: '탄소중립 관련 프로그램 운영은 프로젝트 자료에서 확인되지 않았습니다.'
    },
    'map-beautiful-pyeonggeo-card': {
      type: 'circular',
      action: '재사용 매장 이용 전 해당 지점의 운영 여부와 기증 가능 품목을 확인해 주세요.',
      method: '프로젝트에는 등록 지점으로 기록되어 있습니다. 방문 전에 현재 운영 여부와 접수 방법을 확인해 주세요.',
      condition: '현재 운영 여부와 주소 정보는 추가 확인이 필요합니다.'
    },
    'map-netzero-center-card': {
      type: 'environment',
      action: '탄소중립 교육·지원 사업의 운영 여부와 참여 방법을 센터에 문의해 보세요.',
      method: '프로젝트 자료에는 센터 주소와 캠퍼스 대표 좌표가 있습니다. 15동의 정확한 위치는 확인되지 않았습니다.',
      condition: '특정 사업이나 프로그램의 운영 시간은 센터에 확인해 주세요.',
      verifiedLocation: false
    },
    'map-bike-rental-card': {
      type: 'transport',
      action: '자전거 대여 위치와 운영 여부를 확인한 뒤 이동에 활용해 보세요.',
      method: '프로젝트 자료의 좌표는 인근 버스정류장을 기준으로 했으며 대여소 위치가 검증되지 않았습니다.',
      condition: '대여소 위치·운영 여부와 이용 조건을 확인할 수 있는 자료가 없습니다.',
      verifiedLocation: false
    },
    'map-chilam-office-card': {
      type: 'environment',
      action: '탄소중립 관련 업무나 프로그램 운영 여부를 방문 전에 문의해 보세요.',
      method: '일반 민원 시설의 운영 정보와 탄소중립 사업 운영 정보를 구분해 확인해 주세요.',
      condition: '탄소중립 관련 프로그램 운영은 프로젝트 자료에서 확인되지 않았습니다.'
    },
    'map-probicycle-card': {
      type: 'transport',
      action: '자전거 수리·정비가 가능한지 문의해 자전거를 오래 이용해 보세요.',
      method: '수리 가능 항목과 비용은 방문 전에 매장에 확인해 주세요.',
      condition: '정비 서비스의 종류와 이용 조건은 프로젝트 자료에서 확인되지 않았습니다.'
    }
  };
  const typeLabels = {
    tumbler: '텀블러',
    circular: '자원순환',
    transport: '녹색교통',
    recycling: '분리배출',
    environment: '환경정보',
    other: '실천 정보 미분류'
  };
  const cards = [...mapSection.querySelectorAll('.map-place-card')];
  const seenIds = new Set();
  const places = cards.filter(card => {
    if (!card.id || seenIds.has(card.id)) {
      card.hidden = true;
      return false;
    }
    seenIds.add(card.id);
    const data = definitions[card.id] || {};
    card.dataset.mapType = data.type || 'other';
    if (data.verifiedLocation === false) card.dataset.locationVerified = 'false';
    return true;
  });
  if (!document.documentElement.classList.contains('map-page')) return;
  const districtFilters = mapSection.querySelector('.map-district-tabs');
  const search = mapSection.querySelector('#map-place-search');
  if (!districtFilters || !search) return;

  const typeFilters = document.createElement('nav');
  typeFilters.className = 'map-type-tabs';
  typeFilters.setAttribute('aria-label', '실천 유형 선택');
  typeFilters.innerHTML = '<button type="button" data-type="all" aria-pressed="true">전체 유형</button><button type="button" data-type="tumbler" aria-pressed="false">텀블러</button><button type="button" data-type="circular" aria-pressed="false">자원순환</button><button type="button" data-type="transport" aria-pressed="false">녹색교통</button><button type="button" data-type="recycling" aria-pressed="false">분리배출</button><button type="button" data-type="environment" aria-pressed="false">환경정보</button>';
  districtFilters.after(typeFilters);

  const listStatus = document.createElement('p');
  listStatus.className = 'map-place-list-status';
  listStatus.setAttribute('role', 'status');
  listStatus.setAttribute('aria-live', 'polite');
  const firstCard = places[0];
  if (firstCard) firstCard.before(listStatus);

  const shell = mapSection.querySelector('.map-shell');
  const sheet = document.createElement('section');
  sheet.className = 'map-place-sheet';
  sheet.hidden = true;
  sheet.setAttribute('aria-label', '선택한 장소 정보');
  sheet.innerHTML = '<div class="map-place-sheet-handle" aria-hidden="true"></div><header class="map-place-sheet-header"><div class="map-place-sheet-heading"><span class="map-place-sheet-type"></span><h2></h2></div><button type="button" class="map-place-sheet-close" aria-label="장소 정보 닫기">×</button></header><p class="map-place-sheet-action"></p><dl class="map-place-sheet-facts"></dl><div class="map-place-sheet-actions"><a class="map-place-directions" target="_blank" rel="noopener noreferrer">카카오맵 길찾기</a><button type="button" class="map-place-more" aria-expanded="false">자세히 보기</button></div><div class="map-place-sheet-details" hidden></div>';
  if (shell) shell.after(sheet);
  const nameNode = sheet.querySelector('h2');
  const typeNode = sheet.querySelector('.map-place-sheet-type');
  const actionNode = sheet.querySelector('.map-place-sheet-action');
  const factsNode = sheet.querySelector('.map-place-sheet-facts');
  const detailsNode = sheet.querySelector('.map-place-sheet-details');
  const moreButton = sheet.querySelector('.map-place-more');
  let selectedCard = null;
  let selectedType = 'all';

  const normalize = value => (value || '').normalize('NFC').replace(/\s+/g, '').toLocaleLowerCase();
  const currentDistrict = () => window.mapPlaceSearchLiveDistrict || districtFilters.querySelector('[aria-pressed="true"]')?.dataset.mapDistrict || '진주시';
  function applyFilters() {
    const district = currentDistrict();
    const query = normalize(search.value);
    const visible = [];
    places.forEach(card => {
      const data = definitions[card.id] || {};
      const areaMatch = (card.dataset.mapAreas || '').split(/\s+/).includes(district);
      const typeMatch = selectedType === 'all' || data.type === selectedType;
      const textMatch = !query || normalize(card.textContent + ' ' + (card.dataset.mapAreas || '') + ' ' + (typeLabels[data.type] || '')).includes(query);
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
  }));
  districtFilters.addEventListener('click', () => window.setTimeout(applyFilters, 0));
  search.addEventListener('input', applyFilters);
  window.addEventListener('map-place-search-change', applyFilters);

  function addFact(label, value) {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    row.append(term, description);
    factsNode.append(row);
  }
  function sourceLinks(card) {
    const links = [...card.querySelectorAll('.reuse-store-links a[href], .source-link[href]')]
      .filter(link => !link.href.includes('map.kakao.com/link/search'));
    return links;
  }
  function openSheet(card, moveMap = false) {
    if (!card || card.hidden) return;
    selectedCard = card;
    places.forEach(place => place.removeAttribute('aria-current'));
    card.setAttribute('aria-current', 'true');
    const data = definitions[card.id] || {};
    const title = card.querySelector('.map-place-copy strong')?.textContent.trim() || card.getAttribute('aria-label') || '장소 정보';
    const type = typeLabels[data.type] || typeLabels.other;
    const address = card.querySelector('.map-place-expanded-copy p, .map-place-copy p')?.textContent.trim() || '주소 확인 필요';
    const action = data.action || '방문 전 이용 가능 여부와 환경 실천 정보를 확인해 주세요.';
    const method = data.method || action;
    const condition = data.condition || '이용 조건 확인 필요';
    nameNode.textContent = title;
    typeNode.textContent = type;
    actionNode.textContent = action;
    factsNode.replaceChildren();
    addFact('운영시간', '운영시간 확인 필요');
    addFact('휴무일', '휴무일 확인 필요');
    addFact('주소', address);
    const directions = sheet.querySelector('.map-place-directions');
    directions.href = `https://map.kakao.com/link/search/${encodeURIComponent(title)}`;
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
    appendDetail('연락처', '연락처 확인 필요');
    appendDetail('정보 확인일', '확인일 기록 없음');
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
  }
  function closeSheet() {
    sheet.hidden = true;
    if (selectedCard) selectedCard.removeAttribute('aria-current');
    selectedCard = null;
  }
  window.mapSelectPlaceCard = openSheet;
  sheet.querySelector('.map-place-sheet-close').addEventListener('click', closeSheet);
  moreButton.addEventListener('click', () => {
    detailsNode.hidden = !detailsNode.hidden;
    moreButton.setAttribute('aria-expanded', String(!detailsNode.hidden));
    moreButton.textContent = detailsNode.hidden ? '자세히 보기' : '접기';
  });
  places.forEach(card => {
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
      openSheet(card, true);
    }, true);
  });
  mapSection.querySelector('#kakao-map')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) closeSheet();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !sheet.hidden) closeSheet();
  });
  applyFilters();
})();
