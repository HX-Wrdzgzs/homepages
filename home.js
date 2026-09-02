const page = document.body.dataset.page;
document.querySelectorAll('[data-page-link]').forEach((link) => {
  link.classList.toggle('is-active', link.dataset.pageLink === page);
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  if (mobileMenu) mobileMenu.hidden = open;
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.addEventListener('click', (event) => {
  if (!mobileMenu || mobileMenu.hidden || !menuToggle) return;
  if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

const clock = document.querySelector('#site-clock');
function updateClock() {
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit', minute: '2-digit', hour12: false
  }).format(new Date());
}
updateClock();
setInterval(updateClock, 30000);

const toast = document.querySelector('#toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy || '';
    try {
      await navigator.clipboard.writeText(value);
      showToast(`已复制：${value}`);
    } catch {
      showToast(value);
    }
  });
});

const nowCopy = {
  android: '最近主要在重做 Android 客户端的界面和交互，旧版还能跑，但已经不太想继续在上面堆东西了。',
  ham: 'HX-HAM 继续补点名录入、历史数据和 Excel 这条线。现场能快点记、记录别丢，比多做几个花哨功能重要。',
  bot: 'Amia / Mizuki 这边继续维护 Bot、PJSK 和舞萌相关的插件与服务。哪边实际用起来有问题，就回去补哪边。'
};
const nowDetail = document.querySelector('#now-detail');
document.querySelectorAll('[data-now]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-now]').forEach((item) => item.classList.toggle('is-active', item === button));
    if (nowDetail) nowDetail.textContent = nowCopy[button.dataset.now] || '';
  });
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add('is-visible'));
}