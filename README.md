# 余白の向こう。

HX-Wrdzgzs 的个人主页与数字实验室。

这不是单纯的 GitHub 跳转页。主页直接展示项目背景、技术方向与当前关注，并为代表项目提供站内详情页；GitHub 作为源码、Issue、Release 和进一步技术细节入口。

## 当前内容

- 中文主界面
- 黑色 / 白色主题切换，并记忆本地选择
- 响应系统 `prefers-color-scheme`
- 代表项目站内详情页
- 当前关注、技术与工具、实验室、关于与外部入口
- 移动端响应式布局
- `prefers-reduced-motion` 支持
- 中文 404 页面

## 项目详情页

```text
projects/
├── retro-monitor.html
├── hx-ham.html
├── mizukisync.html
├── pjsk-gateway.html
├── qso-archive.html
└── gensokyo-web.html
```

## Cloudflare Pages

无构建步骤的静态站点：

- Production branch: `main`
- Framework preset: `None`
- Build command: 留空
- Build output directory: `/`

入口文件为仓库根目录的 `index.html`。Cloudflare Pages 连接 `main` 后，每次直接提交都会触发新的生产部署。

## 本地预览

可以直接使用静态 HTTP Server 预览仓库根目录。站点没有 npm 依赖或构建产物目录。
