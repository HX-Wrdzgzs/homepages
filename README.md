# HX-Wrdzgzs Personal Homepage

HX-Wrdzgzs 的个人主页。

## 现在的结构

- 中文首页
- 固定浅色主题，不提供深色模式
- 11 个当前存在的个人公开项目
- 项目分类筛选
- 6 个站内项目介绍页
- “最近在忙”“其他”“开发组”“关于”“链接”等区块
- 桌面端侧边导航、移动端顶部导航
- `prefers-reduced-motion` 支持

个人项目只列当前仍存在、确实有内容的公开仓库；Profile 仓库和本主页仓库不计入项目数量。开发组仓库单独展示，不与个人项目混在一起。

## Cloudflare Pages

这是无构建步骤的静态站：

- Production branch: `main`
- Framework preset: `None`
- Build command: 留空
- Build output directory: `/`

入口文件为仓库根目录的 `index.html`。Cloudflare Pages 连接 `main` 后，直接提交会触发生产部署。
