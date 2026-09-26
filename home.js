(() => {
  const ensureStyles = () => {
    if (!document.querySelector('link[data-hx-layout]')) {
      const layout = document.createElement('link');
      layout.rel = 'stylesheet';
      layout.href = '/layout.css?v=20260927-1';
      layout.setAttribute('data-hx-layout', '');
      document.head.appendChild(layout);
    }
    if (!document.querySelector('link[data-hx-fluent]')) {
      const fluent = document.createElement('link');
      fluent.rel = 'stylesheet';
      fluent.href = '/fluent.css?v=20260927-1';
      fluent.setAttribute('data-hx-fluent', '');
      document.head.appendChild(fluent);
    }
  };
  ensureStyles();

  const sidebar = document.querySelector('.site-sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const menuButton = document.querySelector('.mobile-menu-button');

  const ensureNavigation = () => {
    const firstNav = sidebar?.querySelector('.sidebar-group .sidebar-nav');
    if (firstNav && !firstNav.querySelector('a[href$="notices.html"]')) {
      const link = document.createElement('a');
      link.className = 'sidebar-link';
      const prefix = location.pathname.includes('/projects/') ? '../' : './';
      link.href = `${prefix}notices.html`;
      link.innerHTML = '<span class="sidebar-icon">!</span><span>公告</span>';
      const projectLink = [...firstNav.querySelectorAll('a')].find(a => a.getAttribute('href')?.includes('projects.html'));
      if (projectLink?.nextSibling) firstNav.insertBefore(link, projectLink.nextSibling);
      else firstNav.appendChild(link);
    }

    const scroll = sidebar?.querySelector('.sidebar-scroll');
    if (!scroll) return;

    if (!scroll.querySelector('[data-sidebar-sites]')) {
      const group = document.createElement('section');
      group.className = 'sidebar-group';
      group.setAttribute('data-sidebar-sites', '');
      group.innerHTML = '<p class="sidebar-label">站点</p><nav class="sidebar-nav"><a class="sidebar-link" href="https://qso.mizuki.top" target="_blank" rel="noreferrer"><span class="sidebar-icon">Q</span><span>QSO 档案</span><span class="external">↗</span></a><a class="sidebar-link" href="https://qsl.mizuki.top" target="_blank" rel="noreferrer"><span class="sidebar-icon">QSL</span><span>QSL 卡片</span><span class="external">↗</span></a><a class="sidebar-link" href="https://help.mizuki.top/status" target="_blank" rel="noreferrer"><span class="sidebar-icon">S</span><span>服务状态</span><span class="external">↗</span></a></nav>';
      scroll.appendChild(group);
    }

    if (!scroll.querySelector('[data-sidebar-friends]')) {
      const group = document.createElement('section');
      group.className = 'sidebar-group';
      group.setAttribute('data-sidebar-friends', '');
      group.innerHTML = '<p class="sidebar-label">友链</p><nav class="sidebar-nav"><a class="sidebar-link" href="https://ba4slt.cn" target="_blank" rel="noreferrer"><span class="sidebar-icon">4S</span><span>BA4SLT</span><span class="external">↗</span></a><a class="sidebar-link" href="https://www.bd4rfg.cn" target="_blank" rel="noreferrer"><span class="sidebar-icon">4R</span><span>BD4RFG</span><span class="external">↗</span></a><a class="sidebar-link" href="https://ba4sbf.cn" target="_blank" rel="noreferrer"><span class="sidebar-icon">4B</span><span>BA4SBF</span><span class="external">↗</span></a></nav>';
      scroll.appendChild(group);
    }
  };
  ensureNavigation();

  const setMenu = (open) => {
    sidebar?.classList.toggle('is-open', open);
    sidebarOverlay?.classList.toggle('is-open', open);
    sidebarOverlay?.setAttribute('aria-hidden', String(!open));
    menuButton?.classList.toggle('is-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  menuButton?.addEventListener('click', () => setMenu(!sidebar?.classList.contains('is-open')));
  sidebarOverlay?.addEventListener('click', () => setMenu(false));
  sidebar?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (innerWidth > 900) setMenu(false); });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .06 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const hash = location.hash;
  if (hash === '#projects' || hash === '#work') location.replace('./projects.html');
  if (hash === '#about') location.replace('./about.html');
})();