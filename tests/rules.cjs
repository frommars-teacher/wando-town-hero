const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ctx=vm.createContext({localStorage:{getItem:()=>null},document:{addEventListener:()=>{}},structuredClone,setInterval:()=>{},Date,Math});
for(const file of ['data.js','lesson.js','experiments.js','responses.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),ctx);
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf('const status=document.createElement')),ctx);
let profiles=0;for(let qi=0;qi<5;qi++)for(let first=0;first<3;first++)for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++){
 const result=vm.runInContext(`(()=>{const q=QUESTS[${qi}],r={first:${first},miniAttempts:{},routes:[[0,1],[0,2],[1,2]],budget:[2,2,2],decisions:[${[a,b,c].map((v,n)=>`{finalAction:${v},evidence:0,board:${qi===2?'{order:[0,1,2]}':qi===3?'{houses:[1,0,2]}':qi===1?'{backup:0}':'{targets:[0,1]}'}}`).join(',')}]};const score=scoreQuest(q,r);const feedback=questFeedback(q,r,0);return {score,feedback,labels:[q.choices[r.first].label,...r.decisions.map((d,n)=>taskFor(q,r,n).actions[d.finalAction][0])]};})()`,ctx);
 assert.equal(result.score.length,4);assert(result.score.every(n=>Number.isInteger(n)&&n>=0&&n<=20));assert(result.labels.includes(result.feedback.weak.label));assert(result.labels.includes(result.feedback.strong.label));profiles++;
}
for(const [values,rank] of [[[90,90,90,70],'A'],[[90,90,90,30],'C'],[[90,90,90,90],'S'],[[76,76,76,76],'A'],[[65,65,65,65],'B']])assert.equal(vm.runInContext(`rankFor(${JSON.stringify(values)})`,ctx),rank);
assert.equal(vm.runInContext(`KEYS.map(k=>STAT_LABELS[k]).every(Boolean)`,ctx),true);
assert.equal(vm.runInContext(`Object.values(FIRST_SCORES).every(scores=>scores.every((v,i)=>!v.every((n,k)=>scores.every((other,j)=>i===j||n>=other[k]))))`,ctx),true);
for(const id of ['sea','bus','clinic','house','road'])for(let round=0;round<3;round++){const model=vm.runInContext(`labModel('${id}',${round},[0,${id==='bus'?2:3}])`,ctx);assert(model.every(n=>n>=0&&n<=100));}
assert.equal(vm.runInContext(`boardScore('clinic',0,{order:[1,0,2]}) < boardScore('clinic',0,{order:[0,1,2]})`,ctx),true);
assert.equal(vm.runInContext(`boardScore('house',0,{houses:[0,0,0]}) < boardScore('house',0,{houses:[1,0,2]})`,ctx),true);
console.log(JSON.stringify({profiles,checks:'점수 범위·근거별 실제 피드백·균형 랭크·전능한 첫 선택 없음·실험 모형·긴급 연결·집별 적용',status:'passed'}));


