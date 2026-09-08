# Photos for mizuki.top

这个目录存放 `photos.html` 使用的公开图片。

## 上传

1. 登录有 `HX-Wrdzgzs/homepages` 写入权限的 GitHub 账号。
2. 打开仓库中的 `assets/posts/` 目录。
3. 选择 **Add file → Upload files**。
4. 上传图片并提交到 `main`。
5. 上传完成后，把新图片加入 `photos.html` 的照片列表。

照片页直接引用仓库内的静态图片，不请求 GitHub Contents API。因此只上传文件不会自动出现在页面中。

建议使用 `.jpg`、`.webp` 或 `.png`，文件名尽量包含日期，例如：

`2026-09-09-example.jpg`

公开页面不提供上传入口，也不在前端保存 GitHub Token。
