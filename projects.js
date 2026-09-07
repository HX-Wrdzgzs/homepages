const PROJECTS=[
  {id:'hongxing-web',category:'hongxing',categoryLabel:'Hong Xing / Web',state:'在线',live:true,title:'Hong Xing 官网',repoName:'HongXingWeb',tags:['Static Web','Cloudflare Pages','Hong Xing'],summary:'Hong Xing 项目网站源码，对应 hx.mizuki.top。',detail:'站点包含项目、基础设施、更新记录、生命周期和支持信息，采用静态页面部署。',site:'https://hx.mizuki.top',repo:'https://github.com/HX-Wrdzgzs/HongXingWeb'},
  {id:'hongxing-os',category:'hongxing',categoryLabel:'Hong Xing / Linux',state:'开发中',live:false,title:'HongXingOS Linux',repoName:'HongXingOS-ArchLinux',tags:['Arch Linux','KDE Plasma','archiso'],summary:'基于 Arch Linux 的 HongXingOS Linux 发行版项目。',detail:'当前开发重点是 Dev Preview Live ISO、KDE Plasma、网络、启动流程和 VMware 环境兼容。',repo:'https://github.com/HX-Wrdzgzs/HongXingOS-ArchLinux'},
  {id:'authlit',category:'system',categoryLabel:'身份 / 设备',state:'开发中',live:false,title:'AuthLit 5',repoName:'AuthLit5-HXNJ · 私有仓库',tags:['Identity','Trusted Device','Sync'],summary:'账号与可信设备身份系统，当前已用于 Sync。',detail:'公开功能包括设备注册、签名验证、短期会话、设备撤销和恢复。源码仓库为私有仓库。',private:true},
  {id:'ham',category:'radio',categoryLabel:'无线电 / Windows',state:'维护中',live:false,title:'业余无线电点名助手',repoName:'ham-checkin-assistant',tags:['Python','SQLite','Excel'],summary:'用于中继点名现场的 Windows 本地录入工具。',detail:'支持呼号、地点、设备、天线和功率记录，数据写入 SQLite，并可同步或导出到 Excel。历史记录用于常用信息提示。',detailUrl:'./projects/hx-ham.html',repo:'https://github.com/HX-Wrdzgzs/ham-checkin-assistant'},
  {id:'qso',category:'radio',categoryLabel:'无线电 / Web',state:'在线',live:true,title:'QSO 通联档案',repoName:'BA4THG-QSO',tags:['Cloudflare Pages','D1','QSO'],summary:'QSO 记录查询与长期归档网站。',detail:'近期记录可从上游获取，确认后进行校验、去重并写入 D1。公开查询与后台管理分开处理。',detailUrl:'./projects/qso-archive.html',site:'https://qso.mizuki.top',repo:'https://github.com/HX-Wrdzgzs/BA4THG-QSO'},
  {id:'qsl',category:'radio',categoryLabel:'无线电 / Web',state:'公开',live:false,title:'QSL 卡片档案',repoName:'BA4THG-QSL',tags:['Static Web','WebP','QSL'],summary:'QSL 卡片展示与归档页面。',detail:'图片统一整理为 WebP，并区分缩略图与完整图片加载。该站与 QSO 数据库独立。',site:'https://qsl.mizuki.top',repo:'https://github.com/HX-Wrdzgzs/BA4THG-QSL'},
  {id:'uvk5',category:'radio',categoryLabel:'无线电 / 固件',state:'维护中',live:false,title:'UV-K5 / UV-K6 自定义固件',repoName:'uv-k5-losehu132-wrdzgzs',tags:['C','Firmware','UV-K5'],summary:'UV-K5 / UV-K6 自定义固件维护分支。',detail:'保留中文界面和实际使用中的扩展功能，仓库包含源码、构建产物和版本说明。',repo:'https://github.com/HX-Wrdzgzs/uv-k5-losehu132-wrdzgzs'},
  {id:'mizuki',category:'bot',categoryLabel:'舞萌 / Android',state:'重做中',live:false,title:'Amia Sync Android',repoName:'Amia-Sync-Android',tags:['Kotlin','Android','FastAPI'],summary:'舞萌 DX Android 客户端，用于查看玩家信息、成绩和曲库。',detail:'Android 端负责界面、交互和缓存，服务端负责接口适配与数据处理。当前正在重做 UI 和相关页面。',detailUrl:'./projects/mizukisync.html',repo:'https://github.com/HX-Wrdzgzs/Amia-Sync-Android'},
  {id:'pjsk',category:'bot',categoryLabel:'PJSK / Web',state:'公开',live:false,title:'PJSK Gateway',repoName:'hx-pjsk-gateway',tags:['React','FastAPI','Redis'],summary:'PJSK 网页查询使用的网关服务。',detail:'负责网页会话、Bot 身份确认、请求隔离、结果回传和本地图片资源处理。',detailUrl:'./projects/pjsk-gateway.html',repo:'https://github.com/HX-Wrdzgzs/hx-pjsk-gateway'},
  {id:'gensokyo',category:'bot',categoryLabel:'Bot / OneBot',state:'维护中',live:false,title:'Gensokyo-NewQQ',repoName:'Gensokyo-NewQQ',tags:['Go','QQ Bot','OneBot'],summary:'QQ 官方机器人与 OneBot 适配项目。',detail:'维护内容主要包括消息段、Markdown、图片、事件、配置和 ID 映射等兼容问题。',repo:'https://github.com/HX-Wrdzgzs/Gensokyo-NewQQ'},
  {id:'gensokyo-web',category:'bot',categoryLabel:'Bot / 文档',state:'公开',live:false,title:'GensokyoNewQQ 文档站',repoName:'GensokyoNewQQWeb',tags:['VitePress','Vue','Docs'],summary:'Gensokyo-NewQQ 文档站工程。',detail:'整理配置、API、CQ 码、消息能力和兼容差异，文档站与适配器源码分开维护。',detailUrl:'./projects/gensokyo-web.html',repo:'https://github.com/HX-Wrdzgzs/GensokyoNewQQWeb'},
  {id:'retro',category:'system',categoryLabel:'系统 / 硬件',state:'公开',live:false,title:'Retro Monitor',repoName:'retro-monitor',tags:['C#','Home Assistant','ESP32-S3'],summary:'Windows 硬件状态桌面监控方案。',detail:'Windows 端采集温度和负载等数据，经 Home Assistant 转发到 ESP32-S3 桌面终端显示。',detailUrl:'./projects/retro-monitor.html',repo:'https://github.com/HX-Wrdzgzs/retro-monitor'},
  {id:'invoice',category:'tool',categoryLabel:'Windows / 工具',state:'验证中',live:false,title:'发票邮件助手',repoName:'InvoiceMailAssistant',tags:['.NET 8','WPF','SQLite'],summary:'企业邮箱开票申请整理工具。',detail:'读取指定邮箱中的申请邮件，提取所需字段并写入现有 Excel 登记表，同时尽量保持原表结构。',repo:'https://github.com/HX-Wrdzgzs/InvoiceMailAssistant'},
  {id:'form',category:'tool',categoryLabel:'浏览器 / 工具',state:'公开',live:false,title:'Edge 表单自动填写',repoName:'Edge-Web-Form-Auto-Filler',tags:['Edge','JavaScript','Automation'],summary:'固定网页表单的自动填写工具。',detail:'保存重复填写的字段，并针对指定页面执行自动填写。',repo:'https://github.com/HX-Wrdzgzs/Edge-Web-Form-Auto-Filler'}
];

const PAGE_SIZE=6;
const grid=document.querySelector('#project-grid');
const pagination=document.querySelector('#pagination');
const searchInput=document.querySelector('#project-search');
const filterButtons=[...document.querySelectorAll('.filter')];
const summary=document.querySelector('[data-result-summary]');
const totalCount=document.querySelector('[data-total-count]');
const emptyState=document.querySelector('#empty-state');
const modalBackdrop=document.querySelector('#project-modal');
const modalClose=document.querySelector('.modal-close');
const modalTitle=document.querySelector('#modal-title');
const modalRepo=document.querySelector('[data-modal-repo]');
const modalSummary=document.querySelector('[data-modal-summary]');
const modalDetail=document.querySelector('[data-modal-detail]');
const modalTags=document.querySelector('[data-modal-tags]');
const modalActions=document.querySelector('[data-modal-actions]');
const params=new URLSearchParams(location.search);
let state={filter:params.get('filter')||'all',query:params.get('q')||'',page:Math.max(1,Number(params.get('page'))||1)};
if(!['all','hongxing','radio','bot','tool','system'].includes(state.filter))state.filter='all';
if(searchInput)searchInput.value=state.query;
if(totalCount)totalCount.textContent=String(PROJECTS.length);

function norm(value){return value.toLowerCase().replace(/\s+/g,' ').trim()}
function getFiltered(){
  const q=norm(state.query);
  return PROJECTS.filter((p)=>{
    if(state.filter!=='all'&&p.category!==state.filter)return false;
    if(!q)return true;
    return norm([p.title,p.repoName,p.categoryLabel,p.summary,p.detail,...p.tags].join(' ')).includes(q);
  });
}
function syncUrl(){
  const next=new URLSearchParams();
  if(state.filter!=='all')next.set('filter',state.filter);
  if(state.query)next.set('q',state.query);
  if(state.page>1)next.set('page',String(state.page));
  history.replaceState(null,'',next.toString()?`?${next}`:location.pathname);
}
function cardTemplate(p){
  const tags=p.tags.map((tag)=>`<span>${tag}</span>`).join('');
  const detail=p.detailUrl?`<a class="text-link" href="${p.detailUrl}">详情 →</a>`:'';
  const site=p.site?`<a class="text-link" href="${p.site}" target="_blank" rel="noreferrer">打开网站 ↗</a>`:'';
  const repo=p.repo?`<a class="repo-link" href="${p.repo}" target="_blank" rel="noreferrer">GITHUB ↗</a>`:`<span class="repo-link">PRIVATE</span>`;
  return `<article class="project-card"><div class="card-top"><span>${p.categoryLabel}</span><span class="card-state ${p.live?'live':''}"><i></i>${p.state}</span></div><h2>${p.title}</h2><div class="repo-name">${p.repoName}</div><p class="project-summary">${p.summary}</p><p class="project-detail">${p.detail}</p><div class="card-tags">${tags}</div><div class="card-actions"><div class="card-actions-left"><button class="text-link" type="button" data-quick="${p.id}">简介</button>${detail}${site}</div>${repo}</div></article>`;
}
function renderPagination(totalPages){
  if(!pagination)return;
  if(totalPages<=1){pagination.innerHTML='';return}
  const parts=[`<button class="page-btn" type="button" data-page="${state.page-1}" ${state.page===1?'disabled':''}>←</button>`];
  for(let i=1;i<=totalPages;i++)parts.push(`<button class="page-btn ${i===state.page?'is-active':''}" type="button" data-page="${i}">${i}</button>`);
  parts.push(`<button class="page-btn" type="button" data-page="${state.page+1}" ${state.page===totalPages?'disabled':''}>→</button>`);
  pagination.innerHTML=parts.join('');
  pagination.querySelectorAll('[data-page]').forEach((button)=>button.addEventListener('click',()=>{
    const page=Number(button.dataset.page);
    if(!page||page<1||page>totalPages)return;
    state.page=page;render();
    document.querySelector('.project-toolbar')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }));
}
function render(){
  filterButtons.forEach((button)=>button.classList.toggle('is-active',button.dataset.filter===state.filter));
  const filtered=getFiltered();
  const totalPages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  if(state.page>totalPages)state.page=totalPages;
  const start=(state.page-1)*PAGE_SIZE;
  const visible=filtered.slice(start,start+PAGE_SIZE);
  if(grid)grid.innerHTML=visible.map(cardTemplate).join('');
  if(emptyState)emptyState.hidden=filtered.length!==0;
  if(summary)summary.textContent=filtered.length===PROJECTS.length?`${filtered.length} 个项目`:`找到 ${filtered.length} 个`;
  renderPagination(filtered.length?totalPages:0);
  document.querySelectorAll('[data-quick]').forEach((button)=>button.addEventListener('click',()=>openModal(button.dataset.quick)));
  syncUrl();
}
function openModal(id){
  const p=PROJECTS.find((item)=>item.id===id);
  if(!p||!modalBackdrop)return;
  modalTitle.textContent=p.title;
  modalRepo.textContent=p.repoName;
  modalSummary.textContent=p.summary;
  modalDetail.textContent=p.detail;
  modalTags.innerHTML=p.tags.map((tag)=>`<span>${tag}</span>`).join('');
  const actions=[];
  if(p.detailUrl)actions.push(`<a class="button primary" href="${p.detailUrl}">站内详情 →</a>`);
  if(p.site)actions.push(`<a class="button" href="${p.site}" target="_blank" rel="noreferrer">打开网站 ↗</a>`);
  if(p.repo)actions.push(`<a class="button" href="${p.repo}" target="_blank" rel="noreferrer">GitHub ↗</a>`);
  modalActions.innerHTML=actions.join('');
  modalBackdrop.classList.add('is-open');
  modalBackdrop.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  modalClose?.focus({preventScroll:true});
}
function closeModal(){
  if(!modalBackdrop)return;
  modalBackdrop.classList.remove('is-open');
  modalBackdrop.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
modalClose?.addEventListener('click',closeModal);
modalBackdrop?.addEventListener('click',(event)=>{if(event.target===modalBackdrop)closeModal()});
document.addEventListener('keydown',(event)=>{
  if(event.key==='Escape'&&modalBackdrop?.classList.contains('is-open'))closeModal();
  if(event.key==='/'&&document.activeElement!==searchInput&&!modalBackdrop?.classList.contains('is-open')){event.preventDefault();searchInput?.focus()}
});
filterButtons.forEach((button)=>button.addEventListener('click',()=>{state.filter=button.dataset.filter;state.page=1;render()}));
let searchTimer;
searchInput?.addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{state.query=searchInput.value;state.page=1;render()},90)});
render();