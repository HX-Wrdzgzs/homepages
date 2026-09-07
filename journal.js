(() => {
  const gallery = document.querySelector('#photo-gallery');
  if (!gallery) return;

  const api = 'https://api.github.com/repos/HX-Wrdzgzs/homepages/contents/assets/posts?ref=main';
  const imagePattern = /\.(avif|webp|png|jpe?g|gif)$/i;

  const showMessage = (text) => {
    gallery.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'photo-empty';
    box.textContent = text;
    gallery.appendChild(box);
  };

  fetch(api, { headers: { Accept: 'application/vnd.github+json' } })
    .then((response) => {
      if (!response.ok) throw new Error(`GitHub API ${response.status}`);
      return response.json();
    })
    .then((items) => {
      const images = Array.isArray(items)
        ? items.filter((item) => item.type === 'file' && imagePattern.test(item.name) && item.download_url)
        : [];

      images.sort((a, b) => b.name.localeCompare(a.name, 'zh-CN', { numeric: true }));

      if (!images.length) {
        showMessage('还没有公开图片。上传第一张图片后，这里会自动出现。');
        return;
      }

      gallery.innerHTML = '';
      for (const item of images) {
        const figure = document.createElement('figure');
        figure.className = 'photo-item';

        const link = document.createElement('a');
        link.href = item.download_url;
        link.target = '_blank';
        link.rel = 'noreferrer';

        const img = document.createElement('img');
        img.src = item.download_url;
        img.alt = item.name.replace(/[-_]+/g, ' ').replace(/\.[^.]+$/, '');
        img.loading = 'lazy';
        img.decoding = 'async';

        const caption = document.createElement('figcaption');
        caption.textContent = item.name;

        link.appendChild(img);
        figure.append(link, caption);
        gallery.appendChild(figure);
      }
    })
    .catch((error) => {
      console.warn('Unable to load photo gallery:', error);
      showMessage('照片列表暂时加载失败。可以稍后重试，或直接从 GitHub 仓库查看 assets/posts/。');
    });
})();
