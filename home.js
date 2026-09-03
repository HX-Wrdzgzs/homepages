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
    title: 'Amia-Sync-Android',
    state: '重做中',
    desc: '舞萌 DX 的 Android 客户端。最近主要在重做界面和交互，成绩、曲库和同步也在一起整理。',
    stack: ['Kotlin', 'Android', 'FastAPI'],
    flow: ['玩家数据', '同步服务', 'Android'],
    metaLeft: '客户端',
    metaRight: 'UI 重做'
  },
  ham: {
    kicker: 'WINDOWS / RADIO',
    title: 'ham-checkin-assistant',
    state: '维护中',
    desc: '中继点名现场用的本地录入工具。数据先写进 SQLite，需要协作时再同步到 Excel。',
    stack: ['Python', 'SQLite', 'Excel'],
    flow: ['现场输入', '本地记录', 'Excel'],
    metaLeft: 'Windows',
    metaRight: '本地录入'
  },
  retro: {
    kicker: 'HARDWARE / MONITOR',
    title: 'retro-monitor',
    state: '公开',
    desc: '把 Windows 硬件状态接到 Home Assistant，再送到 ESP32-S3 桌面终端。',
    stack: ['C#', 'Home Assistant', 'ESP32-S3'],
    flow: ['Windows', 'Home Assistant', 'ESP32-S3'],
    metaLeft: '硬件监控',
    metaRight: '桌面终端'
  },
  amia: {
    kicker: 'BOT / RHYTHM GAME',
    title: 'Amia · Mizuki',
    state: '维护中',
    desc: '开发组主要维护 Bot、PJSK、舞萌相关插件和公共组件。',
    stack: ['NoneBot', 'PJSK', 'maimai'],
    flow: ['QQ / OneBot', '插件', '数据服务'],
    metaLeft: '开发组',
    metaRight: '多仓库'
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

const legacyTarget = location.hash;
if (legacyTarget === '#projects' || legacyTarget === '#work') location.replace('./projects.html');
if (legacyTarget === '#about') location.replace('./about.html');
