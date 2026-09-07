# Photos for mizuki.top

这个目录用于 `journal.html` 的公开照片墙。

## 上传方式

1. 登录拥有 `HX-Wrdzgzs/homepages` 写入权限的 GitHub 账号；
2. 打开：`https://github.com/HX-Wrdzgzs/homepages/upload/main/assets/posts`；
3. 上传图片并提交到 `main`；
4. `journal.html` 会通过 GitHub Contents API 自动读取本目录中的图片文件。

支持展示的扩展名：`.avif`、`.webp`、`.png`、`.jpg`、`.jpeg`、`.gif`。

建议使用便于排序的文件名，例如：`2026-09-08-example.webp`。

不要在前端代码中写入 GitHub Token。上传鉴权由 GitHub 登录会话和仓库权限负责。
