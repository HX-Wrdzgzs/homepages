const menuButton = document.querySelector('.mobile-menu-button');
const mobileNav = document.querySelector('.mobile-nav');

menuButton?.addEventListener('click', () => {
  const open = !menuButton.classList.contains('is-open');
  menuButton.classList.toggle('is-open', open);
  mobileNav?.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.classList.remove('is-open');
    mobileNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const projectPreview = {
  mizuki: {
    kicker: 'ANDROID / MAIMAI DX',
    title: 'MizukiSync Android',
    state: '重做中',
    desc: '给舞萌 DX 用的 Android 客户端。最近主要在重写界面和交互，成绩、曲库和同步这几块也一起重新整理。',
    stack: ['Kotlin', 'Android', 'FastAPI'],
    flow: ['玩家数据', '同步服务', 'Android'],
    metaLeft: 'CLIENT / MOBILE',
    metaRight: 'UI REWORK'
  },
  ham: {
    kicker: 'HAM / WINDOWS TOOL',
    title: 'HX-HAM',
    state: '维护中',
    desc: '中继点名现场用的本地录入助手。先把呼号和现场信息快速记下来，再交给 SQLite 和 Excel，网络功能只是补充。',
    stack: ['Python', 'SQLite', 'Excel'],
    flow: ['现场输入', '本地整理', '记录归档'],
    metaLeft: 'LOCAL FIRST',
    metaRight: 'BA4THG'
  },
  radio: {
    kicker: 'AMATEUR RADIO',
    title: 'BA4THG',
    state: '在用',
    desc: 'QSO 长期档案和 QSL 卡片分开维护。记录、查询、展示各做各的，不把所有东西塞进同一个网站。',
    stack: ['Cloudflare Pages', 'D1', 'QSL'],
    flow: ['通联记录', '长期档案', '公开查询'],
    metaLeft: 'CALLSIGN / BA4THG',
    metaRight: '70CM / FM'
  },
  amia: {
    kicker: 'BOT / RHYTHM GAME',
    title: 'Amia · Mizuki',
    state: '长期维护',
    desc: '开发组这边继续维护 Bot、PJSK 和舞萌相关插件。项目多，所以主页只放入口，具体内容都放到项目页里看。',
    stack: ['NoneBot', 'PJSK', 'maimai'],
    flow: ['QQ / OneBot', '插件', '数据服务'],
    metaLeft: 'DEV TEAM',
    metaRight: 'MULTI REPO'
  }
};

const previewTabs = document.querySelectorAll('.workspace-tab[data-preview]');
const previewKicker = document.querySelector('[data-preview-kicker]');
const previewTitle = document.querySelector('[data-preview-title]');
const previewState = document.querySelector('[data-preview-state]');
const previewDesc = document.querySelector('[data-preview-desc]');
const previewStack = document.querySelector('[data-preview-stack]');
const previewFlow = document.querySelector('[data-preview-flow]');
const previewMetaLeft = document.querySelector('[data-preview-meta-left]');
const previewMetaRight = document.querySelector('[data-preview-meta-right]');

function renderPreview(key) {
  const data = projectPreview[key];
  if (!data) return;
  previewTabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.preview === key));
  if (previewKicker) previewKicker.textContent = data.kicker;
  if (previewTitle) previewTitle.textContent = data.title;
  if (previewState) previewState.textContent = data.state;
  if (previewDesc) previewDesc.textContent = data.desc;
  if (previewStack) previewStack.innerHTML = data.stack.map((item) => `<span class="tech-chip">${item}</span>`).join('');
  if (previewFlow) previewFlow.innerHTML = data.flow.map((item) => `<div class="flow-node">${item}</div>`).join('');
  if (previewMetaLeft) previewMetaLeft.textContent = data.metaLeft;
  if (previewMetaRight) previewMetaRight.textContent = data.metaRight;
}

previewTabs.forEach((tab) => tab.addEventListener('click', () => renderPreview(tab.dataset.preview)));

const callsignCopy = document.querySelector('[data-copy-callsign]');
callsignCopy?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('BA4THG');
    const original = callsignCopy.textContent;
    callsignCopy.textContent = '已复制 BA4THG';
    setTimeout(() => { callsignCopy.textContent = original; }, 1300);
  } catch {
    callsignCopy.textContent = 'BA4THG';
  }
});

const legacyTarget = location.hash;
if (legacyTarget === '#projects' || legacyTarget === '#work') location.replace('./projects.html');
if (legacyTarget === '#about') location.replace('./about.html');
