# HX-Wrdzgzs Personal Homepage

个人主页静态站，生产环境由 Cloudflare Pages 部署。

## 部署

- Production branch: `main`
- Build command: 留空
- Build output directory: `/`

## 站点结构

- `index.html`：首页，Microsoft / Fluent 风格的项目与个人入口
- `projects.html`：项目列表、搜索、筛选与分页
- `notices.html`：HongXing（江苏）服务公告与事件记录
- `photos.html`：照片页
- `journal.html`：旧照片地址跳转
- `about.html`：关于
- `home.css`：原有组件与项目页基础样式
- `layout.css`：全站顶部导航与移动端抽屉
- `fluent.css`：2026-09-27 视觉刷新与公告页面样式
- `home.js`：移动端菜单、全站公告入口与滚动出现动画
- `projects.js`：项目数据、搜索、筛选、分页和快速预览
- `detail.css`：项目详情页
- `_headers`：Cloudflare Pages 缓存重新验证策略

静态资源 URL 使用版本参数，避免 Cloudflare Pages 更新后浏览器继续使用旧版 CSS/JS。

## 设计说明

当前视觉以 Microsoft / Fluent 的信息层级、排版、留白和内容卡片方式为参考，但不复制 Microsoft 的商标、图片素材或页面源码。桌面端使用顶部导航，移动端保留抽屉菜单。项目页与既有详情页继续兼容原有数据和链接。