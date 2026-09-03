const PROJECTS = [
  {
    id:'hx-ham', category:'radio', categoryLabel:'无线电 / Windows', state:'维护中', live:false,
    title:'中继点名助手', repoName:'ham-checkin-assistant', tags:['Python','SQLite','Excel'],
    summary:'给中继点名现场用的 Windows 本地录入工具。现场先快速记呼号、地点、设备这些信息，后面再整理进 SQLite，需要协作时再同步到 Excel。',
    detail:'重点是连续点名时别让录入拖慢现场。程序会把快速输入拆成结构化字段，历史记录可以给建议，识别不准的内容会保留下来给人确认。核心记录走本地 SQLite，Excel 只是协作输出。',
    detailUrl:'./projects/hx-ham.html', repo:'https://github.com/HX-Wrdzgzs/ham-checkin-assistant'
  },
  {
    id:'qso', category:'radio', categoryLabel:'无线电 / Web', state:'在线', live:true,
    title:'QSO 通联档案', repoName:'BA4THG-QSO', tags:['Cloudflare Pages','D1','QSO'],
    summary:'用来长期保存和查询通联记录的网站。近期记录可以从上游查询，确认后的数据会继续留在自己的 D1 里，不跟着上游一起消失。',
    detail:'公开页面只在有人主动查询呼号时返回对应记录，后台维护和公开查询分开。旧的 ADIF、CSV、JSON 记录也可以导入，再做校验和去重。',
    detailUrl:'./projects/qso-archive.html', site:'https://qso.mizuki.top', repo:'https://github.com/HX-Wrdzgzs/BA4THG-QSO'
  },
  {
    id:'qsl', category:'radio', categoryLabel:'无线电 / Web', state:'公开', live:false,
    title:'QSL 卡片档案', repoName:'BA4THG-QSL', tags:['Static Web','WebP','QSL'],
    summary:'把做过的 QSL 卡片单独整理成一个展示页。缩略图先用 WebP 加载，点开以后再看完整尺寸，不和 QSO 数据库混在一个页面里。',
    detail:'这个仓库主要负责卡片展示和静态资源。重点是让手机和桌面都能比较快地浏览，不需要为了看一张卡片先加载整套原图。',
    repo:'https://github.com/HX-Wrdzgzs/BA4THG-QSL'
  },
  {
    id:'uvk5', category:'radio', categoryLabel:'无线电 / 固件', state:'维护中', live:false,
    title:'UV-K5 / UV-K6 固件', repoName:'uv-k5-losehu132-wrdzgzs', tags:['C','Firmware','UV-K5'],
    summary:'自己维护的一份 UV-K5 / UV-K6 固件分支。主要保留中文功能、实际会用到的扩展、构建产物和版本说明。',
    detail:'仓库基于社区项目继续维护，重点不是堆功能，而是把自己会用的功能、中文支持和可直接刷写的发布包整理好。',
    repo:'https://github.com/HX-Wrdzgzs/uv-k5-losehu132-wrdzgzs'
  },
  {
    id:'mizuki', category:'bot', categoryLabel:'舞萌 / Android', state:'重做中', live:false,
    title:'Amia Sync Android', repoName:'Amia-Sync-Android', tags:['Kotlin','Android','FastAPI'],
    summary:'给舞萌 DX 用的 Android 客户端。玩家信息、成绩和曲库都放到手机里看，最近主要在重做 UI、交互和数据展示。',
    detail:'客户端负责移动端页面、缓存和交互，服务端负责把第三方接口与曲库数据整理成客户端更好处理的格式。现在功能已经有一套，主要是在重新收拾界面和使用流程。',
    detailUrl:'./projects/mizukisync.html', repo:'https://github.com/HX-Wrdzgzs/Amia-Sync-Android'
  },
  {
    id:'pjsk', category:'bot', categoryLabel:'PJSK / Web', state:'公开', live:false,
    title:'PJSK 查询网关', repoName:'hx-pjsk-gateway', tags:['React','FastAPI','Redis'],
    summary:'给网页查询、机器人身份确认和数据节点之间做的一层中转。主要处理请求隔离、身份确认和结果回传。',
    detail:'网页发出查询后，Gateway 先记录请求，再交给机器人侧确认身份，最后向数据节点取结果。多人同时使用时，每个请求都有自己的标识，避免结果串到别人那里。',
    detailUrl:'./projects/pjsk-gateway.html', repo:'https://github.com/HX-Wrdzgzs/hx-pjsk-gateway'
  },
  {
    id:'gensokyo', category:'bot', categoryLabel:'Bot / OneBot', state:'维护', live:false,
    title:'Gensokyo-NewQQ', repoName:'Gensokyo-NewQQ', tags:['Go','QQ Bot','OneBot'],
    summary:'我这边在实际使用和维护的一份 Gensokyo-NewQQ 代码库。主要处理 QQ、OneBot 兼容、配置以及生产环境里遇到的问题。',
    detail:'这个仓库不是单纯存一份上游代码，实际运行时遇到的消息格式、配置兼容和平台行为差异也会在这里继续处理。',
    repo:'https://github.com/HX-Wrdzgzs/Gensokyo-NewQQ'
  },
  {
    id:'gensokyo-web', category:'bot', categoryLabel:'Bot / 文档', state:'公开', live:false,
    title:'Gensokyo-NewQQ 文档站', repoName:'GensokyoNewQQWeb', tags:['VitePress','Vue','Docs'],
    summary:'Gensokyo-NewQQ 的文档站工程。配置、API、CQ 码和能力差异拆开写，查某个功能时不用翻整份 README。',
    detail:'文档站把运行配置、平台能力、接口和常见问题分开维护，方便实际部署时直接找到对应页面。',
    detailUrl:'./projects/gensokyo-web.html', repo:'https://github.com/HX-Wrdzgzs/GensokyoNewQQWeb'
  },
  {
    id:'retro', category:'system', categoryLabel:'系统 / 硬件', state:'公开', live:false,
    title:'桌面硬件监控', repoName:'retro-monitor', tags:['C#','Home Assistant','ESP32-S3'],
    summary:'把电脑硬件状态送到桌面小屏上显示的一套方案。Windows 端负责采集，Home Assistant 做中转，最后交给 ESP32-S3 终端。',
    detail:'最开始只是想把温度、负载这些数据显示出来，后来把 Windows、Home Assistant 和 ESP32-S3 串成了一套完整链路。',
    detailUrl:'./projects/retro-monitor.html', repo:'https://github.com/HX-Wrdzgzs/retro-monitor'
  },
  {
    id:'invoice', category:'tool', categoryLabel:'Windows / 工具', state:'验证中', live:false,
    title:'开票邮件助手', repoName:'InvoiceMailAssistant', tags:['.NET 8','WPF','SQLite'],
    summary:'把企业邮箱里的开票申请邮件整理成 Excel 登记数据。目的是减少人工复制字段和重复核对。',
    detail:'程序读取指定邮箱里的申请邮件，提取需要的字段，再写进原有登记表。现在主要还在验证邮件格式差异和 Excel 写入流程。',
    repo:'https://github.com/HX-Wrdzgzs/InvoiceMailAssistant'
  },
  {
    id:'form', category:'tool', categoryLabel:'浏览器 / 工具', state:'公开', live:false,
    title:'网页表单自动填写', repoName:'Edge-Web-Form-Auto-Filler', tags:['Edge','JavaScript','Automation'],
    summary:'给固定网页表单做的自动填写工具。把经常重复输入的字段先保存下来，到目标页面时再自动填进去。',
    detail:'适合字段结构比较固定、但每天都要重复录入的页面。重点就是少打几遍同样的内容，不做复杂的通用 RPA。',
    repo:'https://github.com/HX-Wrdzgzs/Edge-Web-Form-Auto-Filler'
  }
];

const PAGE_SIZE = 6;
const grid = document.querySelector('#project-grid');
const pagination = document.querySelector('#pagination');
const searchInput = document.querySelector('#project-search');
const filterButtons = [...document.querySelectorAll('.filter')];
const summary = document.querySelector('[data-result-summary]');
const totalCount = document.querySelector('[data-total-count]');
const emptyState = document.querySelector('#empty-state');
const modalBackdrop = document.querySelector('#project-modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.querySelector('#modal-title');
const modalSummary = document.querySelector('[data-modal-summary]');
const modalDetail = document.querySelector('[data-modal-detail]');
const modalTags = document.querySelector('[data-modal-tags]');
const modalActions = document.querySelector('[data-modal-actions]');

const params = new URLSearchParams(location.search);
let state = {
  filter: params.get('filter') || 'all',
  query: params.get('q') || '',
  page: Math.max(1, Number(params.get('page')) || 1)
};

if (!['all','radio','bot','tool','system'].includes(state.filter)) state.filter = 'all';
if (searchInput) searchInput.value = state.query;
if (totalCount) totalCount.textContent = String(PROJECTS.length);

function normalized(value){return value.toLowerCase().replace(/\s+/g,' ').trim()}
function getFiltered(){
  const q = normalized(state.query);
  return PROJECTS.filter((project) => {
    const categoryMatch = state.filter === 'all' || project.category === state.filter;
    if (!categoryMatch) return false;
    if (!q) return true;
    return normalized([project.title,project.repoName,project.categoryLabel,project.summary,project.detail,...project.tags].join(' ')).includes(q);
  });
}
function syncUrl(){
  const next = new URLSearchParams();
  if (state.filter !== 'all') next.set('filter', state.filter);
  if (state.query) next.set('q', state.query);
  if (state.page > 1) next.set('page', String(state.page));
  history.replaceState(null,'',next.toString() ? `?${next}` : location.pathname);
}
function cardTemplate(project){
  const tagHtml = project.tags.map((tag)=>`<span>${tag}</span>`).join('');
  const detailButton = project.detailUrl ? `<a class="text-link" href="${project.detailUrl}">详情 →</a>` : '';
  const siteButton = project.site ? `<a class="text-link" href="${project.site}" target="_blank" rel="noreferrer">打开网站 ↗</a>` : '';
  return `<article class="project-card" data-id="${project.id}">
    <div class="card-top"><span>${project.categoryLabel}</span><span class="card-state ${project.live?'live':''}"><i></i>${project.state}</span></div>
    <h2>${project.title}</h2>
    <div class="repo-name">${project.repoName}</div>
    <p>${project.summary}</p>
    <div class="card-tags">${tagHtml}</div>
    <div class="card-actions">
      <div class="card-actions-left"><button class="text-link" type="button" data-quick="${project.id}">快速看</button>${detailButton}${siteButton}</div>
      <a class="repo-link" href="${project.repo}" target="_blank" rel="noreferrer">GITHUB ↗</a>
    </div>
  </article>`;
}
function renderPagination(totalPages){
  if (!pagination) return;
  if (totalPages <= 1){pagination.innerHTML='';return}
  const parts = [`<button class="page-btn" type="button" data-page="${state.page-1}" ${state.page===1?'disabled':''}>←</button>`];
  for(let i=1;i<=totalPages;i++) parts.push(`<button class="page-btn ${i===state.page?'is-active':''}" type="button" data-page="${i}" aria-label="第 ${i} 页">${i}</button>`);
  parts.push(`<button class="page-btn" type="button" data-page="${state.page+1}" ${state.page===totalPages?'disabled':''}>→</button>`);
  pagination.innerHTML=parts.join('');
  pagination.querySelectorAll('[data-page]').forEach((button)=>button.addEventListener('click',()=>{
    const page = Number(button.dataset.page); if(!page || page<1 || page>totalPages) return;
    state.page=page; render();
    document.querySelector('.project-toolbar')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }));
}
function attachCardEffects(){
  document.querySelectorAll('.project-card').forEach((card)=>{
    card.addEventListener('pointermove',(event)=>{
      const rect=card.getBoundingClientRect();
      card.style.setProperty('--mx',`${event.clientX-rect.left}px`);
      card.style.setProperty('--my',`${event.clientY-rect.top}px`);
    });
  });
  document.querySelectorAll('[data-quick]').forEach((button)=>button.addEventListener('click',()=>openModal(button.dataset.quick)));
}
function render(){
  filterButtons.forEach((button)=>button.classList.toggle('is-active',button.dataset.filter===state.filter));
  const filtered=getFiltered();
  const totalPages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  if(state.page>totalPages) state.page=totalPages;
  const start=(state.page-1)*PAGE_SIZE;
  const visible=filtered.slice(start,start+PAGE_SIZE);
  if(grid) grid.innerHTML=visible.map(cardTemplate).join('');
  if(emptyState) emptyState.hidden=filtered.length!==0;
  if(summary) summary.textContent=filtered.length===PROJECTS.length?`${filtered.length} 个项目`:`找到 ${filtered.length} 个`;
  renderPagination(filtered.length?totalPages:0);
  attachCardEffects();
  syncUrl();
}
function openModal(id){
  const project=PROJECTS.find((item)=>item.id===id); if(!project||!modalBackdrop) return;
  modalTitle.textContent=project.title;
  modalSummary.textContent=`${project.repoName} · ${project.summary}`;
  modalDetail.textContent=project.detail;
  modalTags.innerHTML=project.tags.map((tag)=>`<span>${tag}</span>`).join('');
  const actions=[];
  if(project.detailUrl) actions.push(`<a class="button primary" href="${project.detailUrl}">站内详情 →</a>`);
  if(project.site) actions.push(`<a class="button" href="${project.site}" target="_blank" rel="noreferrer">打开网站 ↗</a>`);
  actions.push(`<a class="button" href="${project.repo}" target="_blank" rel="noreferrer">GitHub ↗</a>`);
  modalActions.innerHTML=actions.join('');
  modalBackdrop.classList.add('is-open');
  modalBackdrop.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  modalClose?.focus({preventScroll:true});
}
function closeModal(){
  if(!modalBackdrop) return;
  modalBackdrop.classList.remove('is-open');
  modalBackdrop.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
modalClose?.addEventListener('click',closeModal);
modalBackdrop?.addEventListener('click',(event)=>{if(event.target===modalBackdrop) closeModal()});
document.addEventListener('keydown',(event)=>{
  if(event.key==='Escape'&&modalBackdrop?.classList.contains('is-open')) closeModal();
  if(event.key==='/'&&document.activeElement!==searchInput&&!modalBackdrop?.classList.contains('is-open')){event.preventDefault();searchInput?.focus();}
});
filterButtons.forEach((button)=>button.addEventListener('click',()=>{state.filter=button.dataset.filter;state.page=1;render()}));
let searchTimer;
searchInput?.addEventListener('input',()=>{
  clearTimeout(searchTimer);
  searchTimer=setTimeout(()=>{state.query=searchInput.value;state.page=1;render()},90);
});
render();
