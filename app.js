
const STORAGE_KEY="wando_town_hero_v1";
const defaultState={completed:{},stats:{effect:0,sustain:0,care:0,cause:0},review:{quest:"",reason:""}};
let state=loadState();
let currentQuest=null;

function loadState(){
  try{
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");
    return saved?{...defaultState,...saved,stats:{...defaultState.stats,...saved.stats},completed:{...saved.completed},review:{...defaultState.review,...saved.review}}:structuredClone(defaultState);
  }catch(e){return structuredClone(defaultState)}
}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function $(id){return document.getElementById(id)}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function showScreen(id){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));$(id).classList.add("active");scrollTo({top:0,behavior:"smooth"})}
function toast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1700)}

function renderAll(){renderStats();renderMap();renderBadges()}
function renderStats(){
  $("statEffect").textContent=state.stats.effect;
  $("statSustain").textContent=state.stats.sustain;
  $("statCare").textContent=state.stats.care;
  $("statCause").textContent=state.stats.cause;
}
function renderMap(){
  const nodes=$("questNodes");
  nodes.innerHTML=QUESTS.map(q=>{
    const done=!!state.completed[q.id];
    return `<button class="quest-node ${done?"done":""}" data-id="${q.id}" style="left:${q.pos.left};top:${q.pos.top}">
      <span class="icon">${q.icon}</span><strong>${q.short}</strong><small>${done?"해결 완료":"퀘스트 보기"}</small>
    </button>`
  }).join("");
  nodes.querySelectorAll(".quest-node").forEach(b=>b.addEventListener("click",()=>openQuest(b.dataset.id)));
  const count=Object.keys(state.completed).length;
  $("progressText").textContent=`${count} / 5 완료`;
  const gate=$("resultGate");
  gate.classList.toggle("locked",count<5);
  gate.querySelector("small").textContent=count<5?"5개 퀘스트 완료 후 열림":"최종 평가 보기";
}
function renderBadges(){
  $("badgeList").innerHTML=QUESTS.map(q=>`<span class="badge ${state.completed[q.id]?"on":""}">${q.badge}</span>`).join("")
}

function openQuest(id){
  currentQuest=QUESTS.find(q=>q.id===id);
  if(!currentQuest)return;
  showScreen("questScreen");
  renderQuestIntro();
}
function renderQuestIntro(){
  const q=currentQuest, done=state.completed[q.id];
  $("questContent").innerHTML=`
    <article class="quest-card">
      <div class="quest-head">
        <div class="quest-title"><div class="bigicon">${q.icon}</div><div><div class="pill">${esc(q.problem)}</div><h2>${esc(q.title)}</h2><p>${done?"이 퀘스트는 이미 완료했어요. 다시 체험해도 점수는 중복되지 않습니다.":"주민의 부탁을 듣고 해결해 보세요."}</p></div></div>
        <span class="badge ${done?"on":""}">${done?q.badge:"미완료"}</span>
      </div>
      <div class="npc"><b>${esc(q.npc)}</b>“${esc(q.dialogue)}”</div>
      <div class="stepbox">
        <h3>🎮 먼저 문제를 직접 체험해 볼까요?</h3>
        <p class="help">미니게임을 완료하면 해결방법을 고를 수 있어요.</p>
        <button class="primary" id="startMini">미니게임 시작</button>
      </div>
    </article>`;
  $("startMini").onclick=()=>renderMiniGame(q);
}

function renderMiniGame(q){
  const host=$("questContent");
  if(q.game==="trash") return miniTrash(q,host);
  if(q.game==="route") return miniRoute(q,host);
  if(q.game==="patient") return miniPatient(q,host);
  if(q.game==="house") return miniHouse(q,host);
  if(q.game==="cause") return miniCause(q,host);
}
function miniShell(q,title,help,body){
  $("questContent").innerHTML=`<article class="quest-card"><div class="quest-title"><div class="bigicon">${q.icon}</div><div><div class="pill">미니게임</div><h2>${title}</h2><p>${help}</p></div></div><div class="mini-area">${body}</div></article>`;
}
function miniTrash(q){
  miniShell(q,"바다 쓰레기 수거 작전","쓰레기만 클릭하세요. 물고기와 해초는 건드리면 안 돼요!",`<div class="timerline"><span id="trashScore">수거 0 / 8</span><span id="trashMistake">실수 0</span></div><div id="trashField" class="trash-field"></div>`);
  const field=$("trashField");let score=0,mistake=0;
  const goods=["🧴","🥫","🧃","🪢","📦"],naturals=["🐟","🌿","🐚"];
  for(let i=0;i<13;i++){
    const good=i<8,btn=document.createElement("button");btn.className="trash-item";btn.textContent=(good?goods:naturals)[Math.floor(Math.random()*(good?goods.length:naturals.length))];
    btn.style.left=(5+Math.random()*85)+"%";btn.style.top=(5+Math.random()*75)+"%";
    btn.onclick=()=>{if(btn.disabled)return;btn.disabled=true;if(good){score++;btn.classList.add("good-hit");$("trashScore").textContent=`수거 ${score} / 8`;if(score===8)setTimeout(()=>finishMini(q,"깨끗해졌어요! 그런데 며칠 뒤 또 쓰레기가 들어왔습니다."),350)}else{mistake++;$("trashMistake").textContent=`실수 ${mistake}`;btn.style.background="#ffd7d7";setTimeout(()=>btn.remove(),300)}};
    field.appendChild(btn)
  }
}
function miniRoute(q){
  miniShell(q,"버스 노선 연결하기","버스 2대로 네 장소 중 세 곳만 연결할 수 있어요. 어떤 곳을 우선할지 골라 보세요.",`<div id="routeBoard" class="route-board"></div><div class="route-info" id="routeInfo">선택 0 / 3</div>`);
  const places=[["🏘️","마을"],["🏥","병원"],["🛒","시장"],["🏫","학교"]],selected=[];
  $("routeBoard").innerHTML=places.map((p,i)=>`<button class="route-place" data-i="${i}"><div style="font-size:30px">${p[0]}</div><b>${p[1]}</b></button>`).join("");
  document.querySelectorAll(".route-place").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(selected.includes(i)){selected.splice(selected.indexOf(i),1);b.classList.remove("selected")}else if(selected.length<3){selected.push(i);b.classList.add("selected")}else return toast("세 곳까지만 연결할 수 있어요.");$("routeInfo").textContent=`선택 ${selected.length} / 3`;if(selected.length===3)setTimeout(()=>finishMini(q,"세 곳은 연결했지만 한 곳은 여전히 불편합니다. 한 방법으로 모두를 만족시키기는 어렵네요."),450)});
}
function miniPatient(q){
  const pats=[["🤧","감기 환자"],["🩹","다친 사람"],["🩺","정기검진"],["🚑","응급환자"]];
  miniShell(q,"환자를 어디로 보낼까?","각 환자에게 알맞은 곳을 골라 주세요.",`<div id="patientGrid" class="patient-grid"></div>`);
  const answers=["보건소","지역병원","보건소","대형병원"];let done=0;
  $("patientGrid").innerHTML=pats.map((p,i)=>`<div class="patient" id="pat${i}"><b>${p[0]} ${p[1]}</b><div class="option-row">${["보건소","이동진료차","지역병원","대형병원"].map(x=>`<button class="tiny" data-i="${i}" data-v="${x}">${x}</button>`).join("")}</div></div>`).join("");
  document.querySelectorAll(".patient .tiny").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if($("pat"+i).classList.contains("done"))return;if(b.dataset.v===answers[i] || (i<2&&b.dataset.v==="이동진료차")){$("pat"+i).classList.add("done");done++;toast("좋은 선택이에요.");if(done===4)setTimeout(()=>finishMini(q,"환자마다 필요한 치료가 다릅니다. 한 시설만으로 모든 의료 문제를 해결할 수는 없어요."),450)}else toast("이 환자에게는 다른 곳이 더 알맞을 것 같아요.")});
}
function miniHouse(q){
  const houses=[["학교 근처","주민 문화공간"],["매우 낡음","철거 후 공원"],["관광지 근처","작은 카페"]];
  const uses=["주택","작은 카페","주민 문화공간","철거 후 공원"];let done=0;
  miniShell(q,"빈집 활용 퍼즐","집의 위치와 상태를 보고 가장 어울리는 활용 방법을 골라 보세요.",`<div id="houseGrid" class="house-grid"></div>`);
  $("houseGrid").innerHTML=houses.map((h,i)=>`<div class="house" id="house${i}"><b>🏚️ ${i+1}번 집</b><p>${h[0]}</p><div class="option-row">${uses.map(u=>`<button class="tiny" data-i="${i}" data-v="${u}">${u}</button>`).join("")}</div></div>`).join("");
  document.querySelectorAll(".house .tiny").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if($("house"+i).classList.contains("done"))return;if(b.dataset.v===houses[i][1]){$("house"+i).classList.add("done");done++;toast("조건에 잘 맞는 활용이에요.");if(done===3)setTimeout(()=>finishMini(q,"빈집마다 위치와 상태가 달라서 같은 방법을 모두에게 적용하기는 어렵습니다."),450)}else toast("이 집의 조건을 다시 살펴보세요.")});
}
function miniCause(q){
  const order=["수도관 누수","흙이 쓸려나감","지하 빈 공간 발생","도로가 꺼짐"],choices=["도로가 꺼짐","수도관 누수","지하 빈 공간 발생","흙이 쓸려나감"];let step=0;
  miniShell(q,"원인 찾기 탐정 게임","싱크홀이 생기는 과정을 처음부터 순서대로 클릭하세요.",`<div id="causeGrid" class="cause-grid"></div><p class="route-info" id="causeInfo">첫 번째 원인을 찾아보세요.</p>`);
  $("causeGrid").innerHTML=choices.map(x=>`<button class="cause-step" data-v="${x}">${x}</button>`).join("");
  document.querySelectorAll(".cause-step").forEach(b=>b.onclick=()=>{if(b.disabled)return;if(b.dataset.v===order[step]){b.disabled=true;b.classList.add("done");step++;$("causeInfo").textContent=step<4?`${step+1}번째 과정을 찾아보세요.`:"원인 흐름 완성!";if(step===4)setTimeout(()=>finishMini(q,"겉으로 보이는 구멍만 메우는 것보다 아래에서 시작된 원인을 함께 살펴봐야 합니다."),450)}else toast("조금 더 앞에서 일어난 일을 찾아보세요.")});
}
function finishMini(q,message){
  $("questContent").innerHTML=`<article class="quest-card"><div class="quest-title"><div class="bigicon">${q.icon}</div><div><div class="pill">문제 체험 완료</div><h2>${q.title}</h2></div></div><div class="npc"><b>발견!</b>${message}</div><div class="stepbox"><h3>🛠️ 어떤 해결방법을 선택할까요?</h3><p class="help">정답 하나를 찾는 문제가 아닙니다. 각 방법의 장단점을 생각하며 골라 보세요.</p><div class="choice-grid">${q.choices.map((c,i)=>`<button class="choice" data-i="${i}"><b>${String.fromCharCode(65+i)}. ${c.label}</b><span>이 방법을 선택해 결과 확인하기</span></button>`).join("")}</div></div></article>`;
  document.querySelectorAll(".choice").forEach(b=>b.onclick=()=>chooseSolution(q,+b.dataset.i))
}
function chooseSolution(q,index){
  const ch=q.choices[index],already=!!state.completed[q.id];
  if(!already){
    Object.keys(ch.score).forEach(k=>state.stats[k]+=ch.score[k]);
    state.completed[q.id]={choice:index,score:ch.score};
    save();renderAll();
  }
  $("questContent").innerHTML=`<article class="quest-card"><div class="quest-title"><div class="bigicon">${q.icon}</div><div><div class="pill">퀘스트 완료</div><h2>${q.badge} 획득!</h2></div></div><div class="feedback-card"><h3>내 선택</h3><p><b>${ch.label}</b></p><p>✅ <b>좋은 점:</b> ${ch.good}</p><p>💭 <b>아쉬운 점:</b> ${ch.bad}</p><p>🗣️ <b>주민 반응:</b> ${ch.reaction}</p><div class="delta">${Object.entries(ch.score).map(([k,v])=>`<div>${STAT_LABELS[k]}<b>+${v}</b></div>`).join("")}</div></div><div style="display:flex;gap:10px;margin-top:16px"><button class="primary" id="goMap">마을 지도로 돌아가기</button></div></article>`;
  $("goMap").onclick=()=>{showScreen("mapScreen");renderAll();if(Object.keys(state.completed).length===5)toast("🏆 모든 퀘스트 완료! 평가서가 열렸어요.")}
}
function buildResult(){
  if(Object.keys(state.completed).length<5)return toast("아직 해결하지 않은 퀘스트가 있어요.");
  const max=15,total=Object.values(state.stats).reduce((a,b)=>a+b,0),pct=Math.round(total/60*100);
  const rank=pct>=90?"S":pct>=78?"A":pct>=65?"B":"C";
  const rankText={S:"마을 해결사 MASTER",A:"뛰어난 마을 해결사",B:"든든한 마을 해결사",C:"성장 중인 마을 해결사"}[rank];
  const entries=Object.entries(state.stats).sort((a,b)=>a[1]-b[1]),low=entries[0][0],high=entries[entries.length-1][0];
  const lowMsg={
    effect:"여러 관점을 생각한 점은 좋았지만, 실제로 문제를 얼마나 줄일 수 있는 방법인지도 함께 살펴보면 좋아요.",
    sustain:"당장 문제를 줄이는 방법을 많이 선택했어요. 오랫동안 문제가 다시 생기지 않는 방법도 생각해 보세요.",
    care:"문제를 해결하는 힘은 좋았지만, 그 방법이 다른 주민들에게 어떤 영향을 줄지도 함께 생각해 보면 좋아요.",
    cause:"문제가 생긴 뒤 처리하는 방법을 많이 선택했어요. 다음에는 ‘왜 이 문제가 계속 생길까?’를 먼저 생각해 보세요."
  }[low];
  $("resultContent").innerHTML=`<section class="result-sheet"><div class="rank">${rank}</div><div class="rank-sub">${rankText}</div><p style="text-align:center;color:#667085">종합 점수 ${pct}점</p><div class="score-bars">${Object.entries(state.stats).map(([k,v])=>`<div class="barline"><span>${STAT_LABELS[k]}</span><div class="bar"><div style="width:${v/max*100}%"></div></div><b>${v}/15</b></div>`).join("")}</div><div class="feedback-card"><h3>🌟 강점</h3><p>당신의 강점은 <b>${STAT_LABELS[high]}</b>입니다. 이 관점으로 지역문제를 바라보는 힘이 좋아요!</p><h3>📌 다음에 더 생각해 볼 점</h3><p>${lowMsg}</p></div><div class="badge-strip"><h3>획득 배지</h3><div class="badges">${QUESTS.map(q=>`<span class="badge on">${q.badge}</span>`).join("")}</div></div><div class="feedback-card"><h3>📚 오늘의 핵심</h3><p>지역문제의 해결방법은 하나만 있는 것이 아닙니다. 해결방법마다 좋은 점과 아쉬운 점이 있기 때문에 문제의 원인과 여러 사람의 입장을 함께 생각하며 결정해야 합니다.</p></div><div class="review"><h3>✍️ 마지막 돌아보기</h3><label>내가 가장 잘 해결했다고 생각하는 퀘스트는?</label><div class="option-row">${QUESTS.map(q=>`<button class="tiny review-q ${state.review.quest===q.id?"selected":""}" data-id="${q.id}">${q.icon} ${q.short}</button>`).join("")}</div><label style="display:block;margin-top:14px">그렇게 생각한 까닭은?</label><textarea id="reviewReason" placeholder="내가 선택한 해결방법의 좋은 점을 떠올려 써 보세요.">${esc(state.review.reason)}</textarea><button class="primary" id="saveReview" style="margin-top:10px">돌아보기 저장</button></div></section>`;
  document.querySelectorAll(".review-q").forEach(b=>b.onclick=()=>{state.review.quest=b.dataset.id;save();document.querySelectorAll(".review-q").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")});
  $("saveReview").onclick=()=>{state.review.reason=$("reviewReason").value.trim();save();toast("돌아보기를 저장했어요!")}
  showScreen("resultScreen")
}

$("backToMap").onclick=()=>showScreen("mapScreen");
$("backFromResult").onclick=()=>showScreen("mapScreen");
$("resultGate").onclick=()=>buildResult();
$("resetBtn").onclick=()=>{
  if(!confirm("퀘스트, 점수, 배지를 모두 처음부터 다시 시작할까요?"))return;
  if(!confirm("한 번 지우면 되돌릴 수 없어요. 정말 초기화할까요?"))return;
  localStorage.removeItem(STORAGE_KEY);state=structuredClone(defaultState);renderAll();showScreen("mapScreen");toast("처음 상태로 돌아왔어요.")
};
renderAll();
