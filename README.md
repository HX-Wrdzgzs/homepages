# HX-Wrdzgzs Personal Homepage

个人主页静态站，部署到 Cloudflare Pages。

## 页面

- `index.html`：首页
- `projects.html`：项目目录，支持搜索、筛选、分页和快速预览
- `about.html`：关于
- `projects/`：部分项目的站内详情页
- `404.html`：404

## 样式与脚本

- `home.css`：首页 / 项目页 / 关于页共用设计系统
- `home.js`：导航、首页项目预览、进入动画等公共交互
- `projects.js`：项目数据、搜索、筛选、分页、弹窗
- `detail.css`：项目详情页公共样式
- `DESIGN.md`：视觉、交互和文案规范

## 部署

Cloudflare Pages：

```text
Production branch: main
Framework preset: None
Build command: 留空
Build output directory: /
```

纯静态站，不需要 npm 构建。
