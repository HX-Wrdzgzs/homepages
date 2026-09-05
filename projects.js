const PROJECTS=[
  {id:'hongxing-web',category:'hongxing',categoryLabel:'Hong Xing / Web',state:'在线',live:true,title:'Hong Xing 官网',repoName:'HongXingWeb',tags:['Static Web','Cloudflare Pages','Hong Xing'],summary:'hx.mizuki.top 的源码。Hong Xing 的项目、服务、更新和生命周期都放在这个站里。',detail:'现在是纯静态站，项目、基础设施、更新、生态、生命周期、支持这些页面分开维护；生产域名就是 hx.mizuki.top。',site:'https://hx.mizuki.top',repo:'https://github.com/HX-Wrdzgzs/HongXingWeb'},
  {id:'hongxing-os',category:'hongxing',categoryLabel:'Hong Xing / Linux',state:'开发中',live:false,title:'HongXingOS Linux',repoName:'HongXingOS-ArchLinux',tags:['Arch Linux','KDE Plasma','archiso'],summary:'基于 Arch Linux 做的 HongXingOS Linux 发行版。现在先把能启动、能联网、能进 KDE 的 Dev Preview Live ISO 做稳。',detail:'当前已经有 archiso 基线、KDE Plasma、NetworkManager、PipeWire、Plymouth 和 VMware Tools，ISO 可以走本地脚本或 GitHub Actions 构建。',repo:'https://github.com/HX-Wrdzgzs/HongXingOS-ArchLinux'},
  {id:'authlit',category:'system',categoryLabel:'身份 / 设备',state:'开发中',live:false,title:'AuthLit 5',repoName:'AuthLit5-HXNJ · 私有仓库',tags:['Identity','Trusted Device','Sync'],summary:'身份和可信设备系统。现在已经接到 Sync，用来处理账号和设备之间的身份关系。',detail:'公开主页只写到功能层：设备注册、签名验证、短期会话、设备撤销和恢复。源码仓库目前是私有的，所以这里不提供 GitHub 跳转。',private:true},
  {id:'ham',category:'radio',categoryLabel:'无线电 / Windows',state:'维护中',live:false,title:'业余无线电点名助手',repoName:'ham-checkin-assistant',tags:['Python','SQLite','Excel'],summary:'给中继点名现场用的 Windows 本地录入工具。呼号、地点、设备、天线和功率可以先按现场习惯快速输入。',detail:'记录先写进 SQLite，Excel 用来做协作和导出；网络相关功能挂了也不会影响本地点名。历史记录还能给常用 QTH、设备和功率做提示。',detailUrl:'./projects/hx-ham.html',repo:'https://github.com/HX-Wrdzgzs/ham-checkin-assistant'},
  {id:'qso',category:'radio',categoryLabel:'无线电 / Web',state:'在线',live:true,title:'QSO 通联档案',repoName:'BA4THG-QSO',tags:['Cloudflare Pages','D1','QSO'],summary:'用来长期保存和查询 QSO 记录的网站。访客输入对方呼号后，可以查到已经整理进档案的通联。',detail:'近期数据可以从上游拿，确认后的记录会去重并存进自己的 D1。这样旧记录不会因为上游以后不返回就跟着消失，公开查询和后台管理也分开处理。',detailUrl:'./projects/qso-archive.html',site:'https://qso.mizuki.top',repo:'https://github.com/HX-Wrdzgzs/BA4THG-QSO'},
  {id:'qsl',category:'radio',categoryLabel:'无线电 / Web',state:'公开',live:false,title:'QSL 卡片档案',repoName:'BA4THG-QSL',tags:['Static Web','WebP','QSL'],summary:'单独整理 QSL 卡片的展示页。缩略图和完整图片分开加载，翻起来不会一下把所有大图都塞进来。',detail:'这个站只负责卡片展示，不和 QSO 数据库混在一起。图片统一整理成 WebP，列表看缩略图，点进去再看完整尺寸。',site:'https://qsl.mizuki.top',repo:'https://github.com/HX-Wrdzgzs/BA4THG-QSL'},
  {id:'uvk5',category:'radio',categoryLabel:'无线电 / 固件',state:'维护中',live:false,title:'UV-K5 / UV-K6 自定义固件',repoName:'uv-k5-losehu132-wrdzgzs',tags:['C','Firmware','UV-K5'],summary:'自己维护的一份 UV-K5 / UV-K6 固件分支。主要保留中文功能和实际会用到的一些扩展。',detail:'仓库里会放源码、构建产物和版本说明。改动以自己设备上的实际使用为准，不为了堆功能把固件越做越乱。',repo:'https://github.com/HX-Wrdzgzs/uv-k5-losehu132-wrdzgzs'},
  {id:'mizuki',category:'bot',categoryLabel:'舞萌 / Android',state:'重做中',live:false,title:'Amia Sync Android',repoName:'Amia-Sync-Android',tags:['Kotlin','Android','FastAPI'],summary:'给舞萌 DX 用的 Android 客户端。玩家信息、成绩和曲库都集中到手机里看。',detail:'客户端负责页面、交互和缓存，服务端负责把第三方数据整理成更适合移动端使用的格式。现在主要在重做 UI 和交互，旧版功能也一起重新梳理。',detailUrl:'./projects/mizukisync.html',repo:'https://github.com/HX-Wrdzgzs/Amia-Sync-Android'},
  {id:'pjsk',category:'bot',categoryLabel:'PJSK / Web',state:'公开',live:false,title:'PJSK Gateway',repoName:'hx-pjsk-gateway',tags:['React','FastAPI','Redis'],summary:'给 PJSK 网页查询做的一层网关。网页请求、机器人身份确认和数据节点不在同一个地方，需要中间层把它们接起来。',detail:'每次查询都有自己的请求标识，避免多人同时用时把结果串掉。网关还负责处理会话、结果回传和机器人返回的本地图片。',detailUrl:'./projects/pjsk-gateway.html',repo:'https://github.com/HX-Wrdzgzs/hx-pjsk-gateway'},
  {id:'gensokyo',category:'bot',categoryLabel:'Bot / OneBot',state:'维护中',live:false,title:'Gensokyo-NewQQ',repoName:'Gensokyo-NewQQ',tags:['Go','QQ Bot','OneBot'],summary:'我这边实际在用的一份 Gensokyo-NewQQ 代码库。主要围绕 QQ 官方机器人和 OneBot 适配。',detail:'日常改动更多是兼容、配置和线上跑出来的问题，比如消息段、Markdown、图片、事件和 ID 映射这些。',repo:'https://github.com/HX-Wrdzgzs/Gensokyo-NewQQ'},
  {id:'gensokyo-web',category:'bot',categoryLabel:'Bot / 文档',state:'公开',live:false,title:'GensokyoNewQQ 文档站',repoName:'GensokyoNewQQWeb',tags:['VitePress','Vue','Docs'],summary:'Gensokyo-NewQQ 的文档站工程。配置、API、CQ 码和不同能力拆开写，方便直接查。',detail:'这个仓库主要处理文档本身和站点结构，不和适配器源码混在一起。需要找某个配置项或能力差异时，可以直接从文档站入口查。',detailUrl:'./projects/gensokyo-web.html',repo:'https://github.com/HX-Wrdzgzs/GensokyoNewQQWeb'},
  {id:'retro',category:'system',categoryLabel:'系统 / 硬件',state:'公开',live:false,title:'Retro Monitor',repoName:'retro-monitor',tags:['C#','Home Assistant','ESP32-S3'],summary:'把电脑硬件状态送到桌面小屏上的一套监控方案。Windows 负责采集，Home Assistant 做中转。',detail:'最后由 ESP32-S3 桌面终端显示温度、负载等数据。这个项目同时涉及 Windows 端、Home Assistant 和硬件端，所以仓库里会把几部分一起整理。',detailUrl:'./projects/retro-monitor.html',repo:'https://github.com/HX-Wrdzgzs/retro-monitor'},
  {id:'invoice',category:'tool',categoryLabel:'Windows / 工具',state:'验证中',live:false,title:'发票邮件助手',repoName:'InvoiceMailAssistant',tags:['.NET 8','WPF','SQLite'],summary:'把企业邮箱里的开票申请邮件整理成结构化记录，再写到现有 Excel 登记表里。',detail:'主要省掉人工复制邮件内容这一步。程序会读取指定邮箱里的申请邮件，提取需要的字段，并尽量保持原来的 Excel 表格结构不变。',repo:'https://github.com/HX-Wrdzgzs/InvoiceMailAssistant'},
  {id:'form',category:'tool',categoryLabel:'浏览器 / 工具',state:'公开',live:false,title:'Edge 表单自动填写',repoName:'Edge-Web-Form-Auto-Filler',tags:['Edge','JavaScript','Automation'],summary:'给固定网页表单做的自动填写工具。经常重复输入的字段可以保存下来，下次直接填。',detail:'用途很单一，就是减少重复操作。它只针对自己常用的目标页面做适配，不打算做成通用网页自动化平台。',repo:'https://github.com/HX-Wrdzgzs/Edge-Web-Form-Auto-Filler'}
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
  return `<article class="project-card"><div class="card-top"><span>${p.categoryLabel}</span><span class="card-state ${p.live?'live':''}"><i></i>${p.state}</span></div><h2>${p.title}</h2><div class="repo-name">${p.repoName}</div><p class="project-summary">${p.summary}</p><p class="project-detail">${p.detail}</p><div class="card-tags">${tags}</div><div class="card-actions"><div class="card-actions-left"><button class="text-link" type="button" data-quick="${p.id}">快速看</button>${detail}${site}</div>${repo}</div></article>`;
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
