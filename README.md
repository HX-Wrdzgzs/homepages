# HX-Wrdzgzs Personal Homepage

个人主页静态站，生产环境由 Cloudflare Pages 部署。

## 部署

- Production branch: `main`
- Build command: 留空
- Build output directory: `/`

## 结构

- `index.html`：首页
- `projects.html`：项目列表、搜索、筛选与分页
- `about.html`：关于
- `home.css`：页面视觉
- `layout.css`：侧栏、移动端抽屉、项目卡辅助布局、站点/友链卡片
- `home.js`：菜单与首页交互
- `projects.js`：项目数据、搜索、筛选、分页和快速预览
- `_headers`：Cloudflare Pages 缓存重新验证策略

基础布局 CSS 直接由 HTML 引用，不依赖 JavaScript 动态加载。静态资源 URL 使用版本参数，避免 Cloudflare Pages 更新后浏览器继续使用旧版 CSS/JS。
