const QUESTS = [
  {
    id:"sea", icon:"🌊", short:"바닷가", title:"바다가 쓰레기로 가득해!", badge:"🌊 바다 지킴이",
    pos:{left:"9%",top:"65%"}, npc:"어민", dialogue:"어제도 바닷가를 치웠는데 오늘 또 쓰레기가 떠밀려왔어!",
    problem:"해양쓰레기", game:"trash",
    choices:[
      {label:"청소하는 횟수를 늘린다.", good:"쓰레기를 빠르게 줄일 수 있어요.", bad:"계속 들어오는 쓰레기의 원인은 그대로 남을 수 있어요.", reaction:"당장은 깨끗해졌지만 며칠 뒤 또 쓰레기가 보여요.", score:{effect:3,sustain:1,care:2,cause:1}},
      {label:"쓰레기가 어디서 오는지 조사하고 발생 자체를 줄인다.", good:"문제가 반복되는 원인을 줄이는 데 도움이 돼요.", bad:"효과가 나타나기까지 시간이 걸릴 수 있어요.", reaction:"처음에는 느리지만 쓰레기가 들어오는 양이 조금씩 줄었어요!", score:{effect:2,sustain:3,care:2,cause:3}},
      {label:"어민과 주민이 함께 예방 활동을 한다.", good:"여러 사람이 함께 참여할 수 있어요.", bad:"참여가 오래 이어지지 않으면 효과가 줄 수 있어요.", reaction:"주민들이 함께 움직이니 바다를 지키는 분위기가 생겼어요.", score:{effect:2,sustain:2,care:3,cause:2}}
    ]
  },
  {
    id:"bus", icon:"🚌", short:"버스정류장", title:"버스가 너무 늦게 와요!", badge:"🚌 이동 해결사",
    pos:{left:"24%",top:"30%"}, npc:"할머니", dialogue:"병원에 가려고 했는데 다음 버스까지 너무 오래 기다려야 해.",
    problem:"대중교통 불편", game:"route",
    choices:[
      {label:"버스 운행 횟수를 늘린다.",good:"기다리는 시간이 바로 줄어들 수 있어요.",bad:"이용자가 적은 시간에도 계속 운행해야 할 수 있어요.",reaction:"버스를 기다리는 시간은 줄었지만 운영 부담도 늘었어요.",score:{effect:3,sustain:2,care:2,cause:2}},
      {label:"예약형 작은 버스를 운영한다.",good:"필요한 사람이 있는 곳으로 유연하게 갈 수 있어요.",bad:"예약 방법을 어려워하는 주민이 있을 수 있어요.",reaction:"필요할 때 부를 수 있어 편리하다는 주민이 늘었어요.",score:{effect:3,sustain:3,care:3,cause:3}},
      {label:"택시와 버스를 함께 이용하도록 이동 지원을 한다.",good:"버스가 적은 지역도 이동을 도울 수 있어요.",bad:"계속 운영하려면 지원 체계가 필요해요.",reaction:"버스가 적은 곳의 주민도 이동할 방법이 생겼어요.",score:{effect:2,sustain:2,care:3,cause:2}}
    ]
  },
  {
    id:"clinic", icon:"🏥", short:"병원", title:"아프면 어디로 가죠?", badge:"🏥 건강 도우미",
    pos:{left:"51%",top:"20%"}, npc:"주민", dialogue:"간단한 진료는 받을 수 있지만 검사를 하려면 멀리 있는 큰 병원까지 가야 해요.",
    problem:"의료 접근성", game:"patient",
    choices:[
      {label:"이동진료차를 운영한다.",good:"가까운 곳에서 기본 진료를 받을 수 있어요.",bad:"전문 검사와 응급 치료까지 모두 하기는 어려워요.",reaction:"간단한 진료는 쉬워졌지만 큰 병원에 가야 하는 경우도 남았어요.",score:{effect:2,sustain:2,care:3,cause:2}},
      {label:"지역병원의 의료진을 확충한다.",good:"지역에서 받을 수 있는 치료가 늘어날 수 있어요.",bad:"의료진을 꾸준히 구하고 머물게 하는 일이 필요해요.",reaction:"지역에서 해결할 수 있는 진료가 늘었어요.",score:{effect:3,sustain:3,care:2,cause:3}},
      {label:"큰 병원으로 이동하는 교통 지원을 한다.",good:"전문 치료가 필요한 주민에게 직접 도움이 돼요.",bad:"지역 안의 의료시설 부족 자체는 남을 수 있어요.",reaction:"멀리 가야 하는 환자의 이동 부담이 줄었어요.",score:{effect:3,sustain:2,care:3,cause:1}}
    ]
  },
  {
    id:"house", icon:"🏚️", short:"빈집마을", title:"빈집을 살려라!", badge:"🏚️ 마을 재생가",
    pos:{left:"67%",top:"48%"}, npc:"마을 학생", dialogue:"우리 동네에 사람이 살지 않는 집이 점점 많아지고 있어요.",
    problem:"빈집 증가", game:"house",
    choices:[
      {label:"오래된 빈집을 철거한다.",good:"위험하고 관리하기 어려운 집을 빠르게 정리할 수 있어요.",bad:"빈집을 다시 활용할 기회는 사라져요.",reaction:"위험한 집은 사라졌지만 빈 터를 어떻게 쓸지 새 고민이 생겼어요.",score:{effect:3,sustain:2,care:2,cause:1}},
      {label:"고쳐서 다시 사람이 살게 한다.",good:"빈집을 주거 공간으로 다시 활용할 수 있어요.",bad:"수리비가 많이 들거나 실제 입주자가 없을 수 있어요.",reaction:"몇몇 집에 다시 사람이 살기 시작했어요.",score:{effect:3,sustain:3,care:2,cause:3}},
      {label:"주민이 함께 사용하는 공간으로 바꾼다.",good:"빈집을 없애면서 주민 생활공간도 만들 수 있어요.",bad:"모든 빈집을 같은 방식으로 활용하기는 어려워요.",reaction:"마을에 새로운 공간이 생겨 주민들이 자주 모이게 됐어요.",score:{effect:2,sustain:3,care:3,cause:2}}
    ]
  },
  {
    id:"road", icon:"🚧", short:"도로", title:"도로 밑이 위험해!", badge:"🚧 안전 수호자",
    pos:{left:"39%",top:"64%"}, npc:"도로 관리 직원", dialogue:"도로에 갑자기 구멍이 생겼어요. 왜 이런 일이 생겼을까요?",
    problem:"노후 시설·싱크홀", game:"cause",
    choices:[
      {label:"구멍이 생길 때마다 메운다.",good:"당장 위험한 곳을 빠르게 막을 수 있어요.",bad:"도로 아래 원인이 남으면 다시 문제가 생길 수 있어요.",reaction:"도로는 다시 열렸지만 다른 곳에서 비슷한 문제가 생겼어요.",score:{effect:3,sustain:1,care:2,cause:1}},
      {label:"오래된 수도관을 교체한다.",good:"누수 같은 근본 원인을 줄이는 데 도움이 돼요.",bad:"공사가 크고 시간이 오래 걸릴 수 있어요.",reaction:"공사는 불편했지만 같은 원인의 사고 위험이 줄었어요.",score:{effect:3,sustain:3,care:2,cause:3}},
      {label:"정기적으로 지하 상태를 검사한다.",good:"문제가 커지기 전에 위험을 발견할 수 있어요.",bad:"검사만으로 이미 낡은 시설이 자동으로 고쳐지지는 않아요.",reaction:"위험한 곳을 미리 찾아 보수할 수 있게 됐어요.",score:{effect:2,sustain:3,care:3,cause:3}}
    ]
  }
];

const STAT_LABELS={effect:"⚡ 효과성",sustain:"🌱 지속성",care:"🤝 주민 배려",cause:"🔍 원인 해결력"};

