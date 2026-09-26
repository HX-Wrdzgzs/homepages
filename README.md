# HX-Wrdzgzs Personal Homepage

个人主页静态站，生产环境由 Cloudflare Pages 部署。

## 部署

- Production branch: `main`
- Build command: 留空
- Build output directory: `/`

## 站点结构

- `index.html`：首页，Microsoft / Fluent 风格的项目与个人入口
- `projects.html`：项目列表、搜索、筛选与分页
- `notices.html`：HongXing（江苏）服务公告、原文与攻击处置时间线
- `lifecycle.html`：依据公开状态页整理的产品与服务生命周期时间线
- `photos.html`：照片页
- `journal.html`：旧照片地址跳转
- `about.html`：关于
- `home.css`：原有组件与项目页基础样式
- `layout.css`：全站顶部导航与移动端抽屉
- `fluent.css`：2026-09-27 视觉刷新、公告与生命周期页面样式
- `home.js`：移动端菜单、全站公告入口与滚动出现动画
- `projects.js`：项目数据、搜索、筛选、分页和快速预览
- `detail.css`：项目详情页
- `_headers`：Cloudflare Pages 缓存重新验证策略
- `CNAME`：记录预期生产域名 `hx.mizuki.top`；Cloudflare Pages 的域名绑定仍需在 Pages 项目中配置

静态资源 URL 使用版本参数，避免 Cloudflare Pages 更新后浏览器继续使用旧版 CSS/JS。

## 设计说明

当前视觉以 Microsoft / Fluent 的信息层级、排版、留白和内容卡片方式为参考，但不复制 Microsoft 的商标、图片素材或页面源码。桌面端使用顶部导航，移动端保留抽屉菜单。项目页与既有详情页继续兼容原有数据和链接。

## Cloudflare Pages 源仓库

本仓库预期作为 `hx.mizuki.top` 的生产源：

- Production branch：`main`
- Build command：留空
- Build output directory：`/`
- 必须将 Cloudflare Pages 项目连接到 `HX-Wrdzgzs/homepages`

仅提交 `CNAME` 文件不会改变 Cloudflare Pages 的项目绑定。若线上首页仍引用 `assets/css/site-final.css`，或访问 `/notices.html` 返回 404，说明域名仍绑定到旧的 `HongXingWeb` 项目，需要在 Cloudflare Pages 的 Custom domains / Git integration 中把生产源切换到本仓库。
