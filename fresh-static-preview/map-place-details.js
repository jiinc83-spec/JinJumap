window.populateMapPlaceDetails = () => {
  const records = {
    'map-beautiful-store-card': { type:'재사용·자원순환', activity:'사용하지 않는 의류와 생활용품 등 재사용 가능한 물품을 기증하거나 중고 물품을 구매할 수 있는 자원순환 매장입니다. 물품 재사용을 통해 자원 소비와 폐기물 발생을 줄이는 실천에 참여할 수 있습니다.', hours:'월~토 10:30~18:00', closed:'일요일·공휴일', address:'경남 진주시 진주대로 1081, 성모의원 1층', phone:'055-741-8845', method:'재사용 가능한 의류와 생활용품을 기증하거나 중고 물품을 구매할 수 있습니다.', caution:'기증 가능 품목과 접수시간은 방문 전 확인을 권장합니다.', status:'제공된 장소 자료 기준 · 현장 방문 확인 미실시' },
    'map-zero-waste-card': { type:'재사용·자원순환(확인 필요)', activity:'제로웨이스트·자원순환 관련 장소로 등록되어 있습니다. 현재 구체적인 친환경 제품 판매 여부와 실천 프로그램은 확인되지 않았습니다.', hours:'미확인', closed:'미확인', address:'경남 진주시 비봉로 6, 2층 일부', phone:'미확인', method:'현재 운영 여부와 구체적인 실천 활동을 확인한 뒤 이용해 주세요.', caution:'운영 여부와 실천 활동 확인 후 방문 안내를 권장합니다.', status:'정보 확인 필요 · 공식 운영 정보 미확인' },
    'map-seongbuk-card': { type:'환경정보·수거 확인', activity:'종이팩 및 폐건전지 등 재활용 자원 교환사업과 관련한 정보를 문의할 수 있는 행정기관입니다. 실제 수거·교환 가능 품목과 운영 여부는 확인이 필요합니다.', hours:'평일 09:00~18:00 (민원실 기준)', closed:'토요일·일요일·공휴일', address:'경남 진주시 진주성로35번길 10', phone:'055-749-4041', method:'종이팩·폐건전지 수거 및 교환사업 운영 여부와 대상 품목을 문의할 수 있습니다.', caution:'민원실 운영시간과 재활용 교환사업 운영시간은 다를 수 있습니다.', status:'교환사업 운영 여부와 교환 기준 확인 필요' },
    'map-enamall-card': { type:'분리배출(확인 필요)', activity:'상가 내 분리배출 시설을 활용한 재활용 실천 장소로 검토 중입니다. 분리배출함의 정확한 위치와 수거 품목은 확인되지 않았습니다.', hours:'08:00~23:00*', closed:'매월 마지막 주 일요일*', address:'경남 진주시 진주대로 지하 1035', phone:'미확인', method:'분리배출함이 설치되어 있다면 안내된 품목에 맞춰 분리배출할 수 있습니다.', caution:'*기존 공개 자료 기준입니다. 2026년 현재 개방시간·분리배출함 설치 여부를 재확인해야 하며 개별 점포 운영시간은 다릅니다.', status:'분리배출함 위치 및 수거 품목 확인 필요' },
    'map-market-card': { type:'친환경 소비', activity:'시장 방문 시 개인 장바구니나 다회용기를 사용해 일회용 포장재 소비를 줄일 수 있습니다. 이는 방문자에게 권장하는 실천이며 모든 점포가 다회용기 사용을 지원한다는 뜻은 아닙니다.', hours:'점포별 상이', closed:'점포별 상이', address:'경남 진주시 진양호로547번길 8-1 일대', phone:'055-741-2151', method:'개인 장바구니나 다회용기를 준비해 일회용 포장재를 줄이는 실천을 할 수 있습니다.', caution:'개별 점포의 포장 조건과 분리배출 시설은 별도 확인이 필요합니다.', status:'시장 대표 문의처 제공 · 점포별 운영 조건 상이' },
    'map-hansalim-card': { type:'친환경 소비', activity:'유기농·무농약 등 친환경 인증 농산물과 가공식품을 구매할 수 있는 생활협동조합 매장입니다. 개인 장바구니 사용으로 일회용 봉투 소비를 줄일 수 있습니다.', hours:'미확인', closed:'미확인', address:'매장 주소 확인 필요', phone:'1661-0800 (한살림 대표 상담번호)', method:'개인 장바구니를 사용해 일회용 봉투 소비를 줄일 수 있습니다.', caution:'친환경 인증을 탄소 감축량의 직접 증거로 표시하지 않습니다. 재사용병·공급 상자 회수의 진주매장 적용 여부를 확인해야 합니다.', status:'매장 주소·운영시간·회수 가능 품목 확인 필요' },
    'map-pyeonggeo-center-card': { type:'환경정보·수거 확인', activity:'가정의 전기·수도·가스 사용량 절감과 관련한 탄소중립포인트 제도 정보를 알아보고, 재활용 자원 교환사업 참여 가능 여부를 문의할 수 있는 공공기관입니다.', hours:'평일 09:00~18:00 (민원실 기준)', closed:'토요일·일요일·공휴일', address:'경남 진주시 평거로40번길 5', phone:'미확인', method:'탄소중립포인트 제도와 재활용 자원 교환사업 참여 가능 여부를 문의할 수 있습니다.', caution:'현장 신청 지원 및 종이팩·폐건전지 교환 여부는 방문 전 확인이 필요합니다.', status:'민원실 운영시간 기준 · 프로그램 운영 확인 필요' },
    'map-beautiful-pyeonggeo-card': { type:'위치 검증 필요', activity:'아름다운가게의 일반적인 실천은 중고 물품 기증과 재사용 소비입니다. 평거동 등록 지점이 별도 매장으로 실제 운영 중인지는 확인되지 않았습니다.', hours:'미확인', closed:'미확인', address:'주소 확인 필요', phone:'미확인', method:'실제 지점 운영이 확인된 뒤 기증·재사용 이용 정보를 안내할 수 있습니다.', caution:'등록 좌표 35.1698294, 128.0530571은 미검증입니다. 지점 확인 전 방문 안내와 지도 위치 공개를 보류합니다.', status:'실제 지점 및 주소 미확인 · 방문 안내 보류 권장' },
    'map-netzero-center-card': { type:'환경정보·교육', activity:'지역 탄소중립 정책과 온실가스 감축 활동을 지원하는 전문기관입니다. 탄소중립 사업 안내, 교육, 간담회, 기업 대상 역량 강화 컨설팅 등을 추진합니다.', hours:'미확인', closed:'미확인', address:'경남 진주시 동진로 33, 경상국립대학교 칠암캠퍼스 15동', phone:'055-772-3555~3556', method:'탄소중립 사업 안내와 교육·간담회 일정을 기관에 문의할 수 있습니다.', caution:'일반인 대상 상설 체험시설로 오인하지 않도록 방문 목적과 가능 시간을 사전에 확인해 주세요.', status:'방문 가능시간 및 15동 정확한 위치 확인 필요' },
    'map-bike-rental-card': { type:'녹색교통', activity:'공영자전거를 무료로 대여해 가까운 거리를 자동차 대신 자전거로 이동할 수 있습니다. 자동차 이용을 줄이는 녹색교통 실천에 참여할 수 있습니다.', hours:'09:00~17:00*', closed:'신정·설·추석*', address:'경남 진주시 강남로 188', phone:'미확인', method:'대여 가능한 경우 가까운 거리 이동에 공영자전거를 이용할 수 있습니다.', caution:'*기존 공공데이터 기준입니다. 현재 운영 여부와 대여소 입구 위치를 확인해야 합니다. 이용요금 무료(현행 확인 필요).', status:'기존 좌표는 인근 버스정류장 기준 · 정확한 대여소 위치 미검증' },
    'map-chilam-office-card': { type:'실천 내용 확인 필요', activity:'종이팩·폐건전지 등 재활용 자원 수거 및 교환사업 운영 여부를 확인해야 하는 공공기관입니다. 현재 구체적인 탄소중립 프로그램은 확인되지 않았습니다.', hours:'민원실 기준 평일 09:00~18:00*', closed:'토요일·일요일·공휴일 원칙', address:'경남 진주시 강남로177번길 30-7', phone:'미확인', method:'재활용 자원 수거·교환사업의 운영 여부와 대상 품목을 문의해 주세요.', caution:'*무인민원발급기 24시간 이용 자료와 민원실·탄소중립 사업 운영시간은 구분해야 합니다.', status:'구체적인 실천사업 확인 전 장소 확정 보류' },
    'map-probicycle-card': { type:'녹색교통', activity:'자전거 판매 매장으로, 자전거를 교통수단으로 이용하려는 방문자가 관련 제품과 정보를 알아볼 수 있습니다. 이를 통해 자동차 이용을 줄이는 이동 방식을 고려할 수 있습니다.', hours:'미확인', closed:'미확인', address:'경남 진주시 강남로 245', phone:'055-758-1189', method:'자전거를 교통수단으로 이용하는 데 필요한 제품과 정보를 확인할 수 있습니다.', caution:'판매 품목과 운영시간은 방문 전에 매장에 확인해 주세요.', status:'운영시간 및 판매 품목 확인 필요' }
  };
  const makeRow=(label,value)=>{const row=document.createElement('div');row.className='reuse-store-fact';const title=document.createElement('strong');title.textContent=label;const text=document.createElement('span');text.textContent=value;row.append(title,text);return row};
  document.querySelectorAll('.map-place-card').forEach(card=>{
    const record=records[card.id],details=card.querySelector('.map-place-expanded');
    if(!record||!details)return;
    const photo=details.querySelector('.map-place-expanded-photo');
    details.replaceChildren();
    if(photo)details.append(photo);
    const intro=document.createElement('p');intro.className='place-expanded-intro';intro.textContent='이곳에서 실천할 수 있어요';
    const activity=document.createElement('p');activity.className='place-expanded-activity';activity.textContent=record.activity;
    details.append(intro,activity);
    const facts=document.createElement('div');facts.className='reuse-store-facts';
    [['장소 유형',record.type],['운영시간',record.hours],['정기 휴무일',record.closed],['주소',record.address],['연락처',record.phone],['정보 확인',record.status]].forEach(([label,value])=>facts.append(makeRow(label,value)));
    details.append(facts);
    const more=document.createElement('div');more.className='place-expanded-more';
    [['구체적인 실천 방법',record.method],['이용 조건 및 주의사항',record.caution],['정보 확인일 및 출처','현장 확인 미실시 · 확인일 및 공식 출처는 제공 자료에 기재되지 않음']].forEach(([label,value])=>{const section=document.createElement('section');section.className='place-expanded-note';const heading=document.createElement('strong');heading.textContent=label;const text=document.createElement('p');text.textContent=value;section.append(heading,text);more.append(section)});
    details.append(more);
  });
};
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',window.populateMapPlaceDetails,{once:true})}else{window.populateMapPlaceDetails()}
