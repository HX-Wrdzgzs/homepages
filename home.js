const filterButtons = [...document.querySelectorAll('.filter-chip')];
const projectCards = [...document.querySelectorAll('.full-project')];

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';

    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));

    projectCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
    });
  });
});

const railLinks = [...document.querySelectorAll('.rail-nav a')];
const homeSections = [...document.querySelectorAll('.home-main section[id]')];

if ('IntersectionObserver' in window && railLinks.length && homeSections.length) {
  const observer = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!current) return;
    railLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current.target.id}`);
    });
  }, {
    rootMargin: '-28% 0px -58% 0px',
    threshold: [0.05, 0.15, 0.3]
  });

  homeSections.forEach((section) => observer.observe(section));
}
