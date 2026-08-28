const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, persist = false) {
  root.dataset.theme = theme;
  if (persist) localStorage.setItem('theme', theme);
  if (themeMeta) themeMeta.setAttribute('content', theme === 'light' ? '#f7f5f3' : '#0b0b0d');
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    themeToggle.title = theme === 'light' ? '切换到黑色主题' : '切换到白色主题';
  }
}

applyTheme(root.dataset.theme || 'dark');

themeToggle?.addEventListener('click', () => {
  applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light', true);
});

const systemTheme = matchMedia('(prefers-color-scheme: light)');
systemTheme.addEventListener?.('change', (event) => {
  if (!localStorage.getItem('theme')) applyTheme(event.matches ? 'light' : 'dark');
});

const revealItems = document.querySelectorAll('.section-reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.08, 0.2, 0.4] });
  sections.forEach((section) => sectionObserver.observe(section));
}

const glow = document.querySelector('.pointer-glow');
if (matchMedia('(pointer: fine)').matches && glow) {
  addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
}
