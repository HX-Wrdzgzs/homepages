document.querySelectorAll('.sr-only').forEach((element) => { element.hidden = true; });

const cards = [...document.querySelectorAll('.project-card')];
const searchInput = document.querySelector('#project-search');
const filterButtons = [...document.querySelectorAll('.filter')];
const resultCount = document.querySelector('#result-count');
const pageStatus = document.querySelector('#page-status');
const pageNumbers = document.querySelector('#page-numbers');
const prevButton = document.querySelector('#page-prev');
const nextButton = document.querySelector('#page-next');
const emptyState = document.querySelector('#empty-state');
const toolbar = document.querySelector('#project-toolbar');
const pageSize = 4;
let currentFilter = 'all';
let currentPage = 1;

function normalized(value) {
  return (value || '').toLocaleLowerCase('zh-CN').trim();
}

function filteredCards() {
  const query = normalized(searchInput?.value);
  return cards.filter((card) => {
    const categoryMatch = currentFilter === 'all' || card.dataset.category === currentFilter;
    const searchMatch = !query || normalized(card.dataset.search).includes(query) || normalized(card.textContent).includes(query);
    return categoryMatch && searchMatch;
  });
}

function renderPagination(totalPages) {
  pageNumbers.innerHTML = '';
  for (let page = 1; page <= totalPages; page += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = page;
    button.classList.toggle('is-active', page === currentPage);
    button.setAttribute('aria-label', `第 ${page} 页`);
    button.addEventListener('click', () => {
      currentPage = page;
      render(true);
    });
    pageNumbers.append(button);
  }
  prevButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= totalPages;
}

function syncUrl() {
  const params = new URLSearchParams();
  if (currentFilter !== 'all') params.set('category', currentFilter);
  if (searchInput?.value.trim()) params.set('q', searchInput.value.trim());
  if (currentPage > 1) params.set('page', String(currentPage));
  const query = params.toString();
  history.replaceState(null, '', query ? `${location.pathname}?${query}` : location.pathname);
}

function render(scroll = false) {
  const matches = filteredCards();
  const totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
  currentPage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = new Set(matches.slice(start, start + pageSize));
  cards.forEach((card) => { card.hidden = !visible.has(card); });
  resultCount.textContent = String(matches.length);
  pageStatus.textContent = matches.length ? `第 ${currentPage} / ${totalPages} 页` : '没有结果';
  emptyState.hidden = matches.length !== 0;
  document.querySelector('.pagination').hidden = matches.length === 0;
  renderPagination(totalPages);
  syncUrl();
  if (scroll) toolbar?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter || 'all';
    currentPage = 1;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    render();
  });
});

searchInput?.addEventListener('input', () => {
  currentPage = 1;
  render();
});
prevButton?.addEventListener('click', () => { if (currentPage > 1) { currentPage -= 1; render(true); } });
nextButton?.addEventListener('click', () => {
  const pages = Math.max(1, Math.ceil(filteredCards().length / pageSize));
  if (currentPage < pages) { currentPage += 1; render(true); }
});

const dialog = document.querySelector('#project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogKicker = document.querySelector('#dialog-kicker');
const dialogDesc = document.querySelector('#dialog-desc');
const dialogTags = document.querySelector('#dialog-tags');
const dialogActions = document.querySelector('#dialog-actions');

cards.forEach((card) => {
  card.querySelector('.quick-view')?.addEventListener('click', () => {
    dialogTitle.textContent = card.querySelector('h3')?.textContent || '';
    dialogKicker.textContent = card.querySelector('.kind')?.textContent || '';
    dialogDesc.textContent = card.querySelector(':scope > p')?.textContent || '';
    dialogTags.innerHTML = '';
    card.querySelectorAll('.tags span').forEach((tag) => dialogTags.append(tag.cloneNode(true)));
    dialogActions.innerHTML = '';
    card.querySelectorAll('.project-links a').forEach((link) => {
      const copy = link.cloneNode(true);
      copy.className = 'button';
      dialogActions.append(copy);
    });
    dialog.showModal();
  });
});
dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

const params = new URLSearchParams(location.search);
const requestedCategory = params.get('category');
if (requestedCategory && filterButtons.some((button) => button.dataset.filter === requestedCategory)) {
  currentFilter = requestedCategory;
  filterButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.filter === requestedCategory));
}
if (searchInput && params.get('q')) searchInput.value = params.get('q');
const requestedPage = Number.parseInt(params.get('page') || '1', 10);
if (Number.isFinite(requestedPage) && requestedPage > 0) currentPage = requestedPage;
render();