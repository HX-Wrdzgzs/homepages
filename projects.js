const PROJECTS = [
  {
    id:'hx-ham', category:'radio', categoryLabel:'无线电 / Windows', state:'维护中', live:false,
    name:'HX-HAM', tags:['Python','SQLite','Excel'],
    summary:'给中继点名用的 Windows 本地录入助手。现场输入尽量快，记录和后续整理尽量稳。',
    detail:'点名时先按现场习惯快速输入呼号、地点、设备、天线和功率，程序再把内容整理成结构化记录。核心流程本地完成，SQLite 优先落库，Excel 作为协作输出。',
    detailUrl:'./projects/hx-ham.html', repo:'https://github.com/HX-Wrdzgzs/ham-checkin-assistant'
  },
  {
    id:'qso', category:'radio', categoryLabel:'无线电 / Web', state:'在线', live:true,
    name:'BA4THG 通联档案', tags:['Cloudflare Pages','D1','QSO'],
    summary:'BA4THG 的 QSO 长期档案和公开查询入口，日常记录和长期归档分开处理。',
    detail:'把已经确认的通联记录长期保存下来，并提供按呼号查询。它不是把数据库整个公开出来，而是给自己的 QSO 做一个稳定的长期档案。',
    detailUrl:'./projects/qso-archive.html', site:'https://qso.mizuki.top', repo:'https://github.com/HX-Wrdzgzs/BA4THG-QSO'
  },
  {
    id:'qsl', category:'radio', categoryLabel:'无线电 / Web', state:'公开', live:false,
    name:'BA4THG QSL Card Archive', tags:['Static Web','WebP','QSL'],
    summary:'QSL 卡片单独做的展示页，缩略图和完整尺寸分开加载。',
    detail:'主要就是把自己做过的 QSL 卡片整理成一个画廊。网页先加载 WebP 缩略图，点开时再看完整尺寸，和 QSO 数据库保持独立。',
    repo:'https://github.com/HX-Wrdzgzs/BA4THG-QSL'
  },
  {
    id:'uvk5', category:'radio', categoryLabel:'无线电 / 固件', state:'维护中', live:false,
    name:'LOSEHU132 UV-K5 / UV-K6 固件', tags:['C','Firmware','UV-K5'],
    summary:'自己维护的一份 UV-K5 / UV-K6 自定义固件，包含中文功能、扩展功能和发布包。',
    detail:'基于社区项目继续维护的 UV-K5 / UV-K6 固件分支。重点是中文功能、自己实际会用到的扩展、构建产物和版本说明。',
    repo:'https://github.com/HX-Wrdzgzs/uv-k5-losehu132-wrdzgzs'
  },
  {
    id:'mizuki', category:'bot', categoryLabel:'舞萌 / Android', state:'重做中', live:false,
    name:'MizukiSync Android', tags:['Kotlin','Android','FastAPI'],
    summary:'给舞萌 DX 用的 Android 客户端。最近主要在重做 UI、交互和数据展示。',
    detail:'客户端负责玩家信息、成绩和曲库相关页面，服务端负责整理第三方接口和数据。旧版能用，但现在正在重新整理界面和使用流程。',
    detailUrl:'./projects/mizukisync.html', repo:'https://github.com/HX-Wrdzgzs/Amia-Sync-Android'
  },
  {
    id:'pjsk', category:'bot', categoryLabel:'PJSK / Web', state:'公开', live:false,
    name:'HX PJSK Gateway', tags:['React','FastAPI','Redis'],
    summary:'PJSK 网页查询用的网关，把网页、机器人身份确认和数据节点接在一起。',
    detail:'网页请求先到 Gateway，再经过机器人侧的身份确认和数据节点查询。这个项目主要负责并发请求、身份映射和网页结果这一段。',
    detailUrl:'./projects/pjsk-gateway.html', repo:'https://github.com/HX-Wrdzgzs/hx-pjsk-gateway'
  },
  {
    id:'gensokyo', category:'bot', categoryLabel:'Bot / OneBot', state:'维护', live:false,
    name:'Gensokyo-NewQQ', tags:['Go','QQ Bot','OneBot'],
    summary:'我这边在用和维护的一份 Gensokyo-NewQQ 仓库，主要处理 QQ / OneBot 的实际运行问题。',
    detail:'平时会跟 QQ 官方能力、OneBot 兼容、配置和实际运行问题打交道。这里保留我自己正在使用和维护的代码版本。',
    repo:'https://github.com/HX-Wrdzgzs/Gensokyo-NewQQ'
  },
  {
    id:'gensokyo-web', category:'bot', categoryLabel:'Bot / 文档', state:'公开', live:false,
    name:'GensokyoNewQQWeb', tags:['VitePress','Vue','Docs'],
    summary:'Gensokyo-NewQQ 的配套文档站工程，把配置、API、CQ 码和能力差异拆开整理。',
    detail:'代码仓库解决实现，文档站负责把快速开始、配置、API、CQ 码和兼容差异整理成更容易查的页面。',
    detailUrl:'./projects/gensokyo-web.html', repo:'https://github.com/HX-Wrdzgzs/GensokyoNewQQWeb'
  },
  {
    id:'retro', category:'system', categoryLabel:'系统 / 硬件', state:'公开', live:false,
    name:'Retro Monitor', tags:['C#','Home Assistant','ESP32-S3'],
    summary:'把电脑硬件状态接到 Home Assistant，再送到 ESP32-S3 桌面终端。',
    detail:'Windows 端采集硬件状态，Home Assistant 负责把数据整理成稳定实体，ESP32-S3 终端负责桌面显示。最开始只是想把电脑状态放到一个小屏上。',
    detailUrl:'./projects/retro-monitor.html', repo:'https://github.com/HX-Wrdzgzs/retro-monitor'
  },
  {
    id:'invoice', category:'tool', categoryLabel:'Windows / 工具', state:'验证中', live:false,
    name:'InvoiceMailAssistant', tags:['.NET 8','WPF','SQLite'],
    summary:'开票邮件助手：读取指定企业邮箱里的申请邮件，再把字段写进现有 Excel 登记表。',
    detail:'通过 IMAP 只读方式识别目标开票邮件，解析业务字段，先做本地记录和去重，再安全写入原有 Excel 表。当前还在真实环境验证阶段。',
    repo:'https://github.com/HX-Wrdzgzs/InvoiceMailAssistant'
  },
  {
    id:'autofill', category:'tool', categoryLabel:'浏览器 / 工具', state:'公开', live:false,
    name:'Edge Web Form Auto-Filler', tags:['Edge','Automation','JavaScript'],
    summary:'Edge 浏览器表单辅助脚本，减少重复填写，但保留人工复核和提交。',
    detail:'定位是半自动辅助，不是无人值守工具。人工登录、脚本预填、人工复核、人工提交，主要用来省掉重复输入。',
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
    const haystack = normalized([project.name,project.categoryLabel,project.summary,project.detail,...project.tags].join(' '));
    return haystack.includes(q);
  });
}

function syncUrl(){
  const next = new URLSearchParams();
  if (state.filter !== 'all') next.set('filter', state.filter);
  if (state.query) next.set('q', state.query);
  if (state.page > 1) next.set('page', String(state.page));
  const query = next.toString();
  history.replaceState(null,'',query ? `?${query}` : location.pathname);
}

function cardTemplate(project){
  const tagHtml = project.tags.map((tag)=>`<span>${tag}</span>`).join('');
  const detailButton = project.detailUrl ? `<a class="text-link" href="${project.detailUrl}">站内详情 →</a>` : '';
  const siteButton = project.site ? `<a class="text-link" href="${project.site}" target="_blank" rel="noreferrer">打开网站 ↗</a>` : '';
  return `<article class="project-card" data-id="${project.id}">
    <div class="card-top"><span>${project.categoryLabel}</span><span class="card-state ${project.live?'live':''}"><i></i>${project.state}</span></div>
    <h2>${project.name}</h2>
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
  const parts = [];
  parts.push(`<button class="page-btn" type="button" data-page="${state.page-1}" ${state.page===1?'disabled':''}>←</button>`);
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
  if(summary) summary.textContent=filtered.length===PROJECTS.length?`${filtered.length} 个项目`:`找到 ${filtered.length} 个项目`;
  renderPagination(filtered.length?totalPages:0);
  attachCardEffects();
  syncUrl();
}

function openModal(id){
  const project=PROJECTS.find((item)=>item.id===id); if(!project||!modalBackdrop) return;
  modalTitle.textContent=project.name;
  modalSummary.textContent=project.summary;
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
  if(event.key==='/'&&document.activeElement!==searchInput&&!modalBackdrop?.classList.contains('is-open')){
    event.preventDefault();searchInput?.focus();
  }
});

filterButtons.forEach((button)=>button.addEventListener('click',()=>{state.filter=button.dataset.filter;state.page=1;render()}));
let searchTimer;
searchInput?.addEventListener('input',()=>{
  clearTimeout(searchTimer);
  searchTimer=setTimeout(()=>{state.query=searchInput.value.trim();state.page=1;render()},100);
});

render();
