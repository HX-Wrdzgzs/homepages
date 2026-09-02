# HX Personal Site — DESIGN.md

这份文件用于约束个人主页的视觉和交互。目标不是复刻某个品牌，而是吸收成熟开发者产品常见的设计规律：层级清楚、信息密度高、装饰克制、交互有反馈。

参考方向：Linear 的深色 surface ladder 与 hairline、Vercel 的排版精度、Supabase 的“让产品本身成为视觉主体”。不复制品牌 Logo、专有字体、插画或具体页面。

## 1. 设计目标

- 蓝黑色，不使用纯黑。
- 冷蓝是唯一主强调色，不再混用粉紫、青绿、霓虹渐变。
- 用多级背景和 1px 边框建立层级，阴影只用于弹窗或浮层。
- 中文是主语言；英文只保留项目名、技术名、状态标签。
- 项目内容优先，装饰其次。页面不能只剩“漂亮背景 + 大标题”。
- 桌面端像成熟开发者产品官网，移动端像真正可用的产品页面，不是桌面布局缩小版。

## 2. 颜色

```text
canvas        #070D16
surface-1     #0B1420
surface-2     #0F1A28
surface-3     #142235
surface-hover #182A40
hairline      #1C2A3B
hairline-2    #2A3B50
ink           #F4F7FB
ink-muted     #B4C0CE
ink-subtle    #7E8C9D
accent        #5B8CFF
accent-hover  #78A2FF
accent-soft   rgba(91, 140, 255, .12)
success       #4CC38A
```

规则：

- 页面背景只能使用 canvas / surface 系列。
- accent 只用于主 CTA、选中状态、焦点、少量关键词。
- success 仅用于真正的状态信息。
- 不使用彩虹渐变、粉紫渐变、强烈外发光。

## 3. 字体与排版

字体栈：

```css
font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
             "Segoe UI", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
```

代码和小型技术标签：

```css
font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
```

尺寸：

- Hero：clamp(3rem, 7vw, 6.4rem)，600–680，负字距。
- 页面标题：clamp(2.8rem, 6vw, 5.2rem)。
- 区块标题：clamp(2rem, 3.6vw, 3.2rem)。
- 卡片标题：18–22px。
- 正文：15–17px，line-height 1.7 左右。
- 标签/状态：11–13px。

不要把所有标题都做成超粗 800/900。高级感来自层级和留白，不是粗体堆砌。

## 4. 圆角与边框

```text
xs  6px
sm  8px
md  10px
lg  12px
xl  16px
```

- 普通卡片：10–12px。
- 大型产品预览：14–16px。
- 按钮：8–10px。
- 除筛选标签外，不使用巨大胶囊形按钮。
- 所有主要卡片使用 1px hairline，不依赖大阴影。

## 5. 间距

基础单位 4px：8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128。

- 页面最大宽度 1240px。
- 桌面左右边距 32–48px。
- Hero 上下 96–128px。
- 区块之间至少 96px。
- 卡片内部通常 20–24px。

## 6. 导航

- 顶部 sticky，56–64px。
- 背景使用半透明 canvas + blur，但不要玻璃拟态。
- 左侧品牌，中间/右侧页面导航，最右 GitHub。
- 当前页用浅色文字 + 细线/轻背景，不使用巨大高亮块。
- 手机端使用菜单按钮展开导航，并锁定背景滚动。

## 7. 首页

首页不是项目列表全集，只承担四件事：

1. 说明是谁、主要做什么。
2. 展示 3–4 个近期重点。
3. 用一个“产品 UI”式预览作为视觉主体。
4. 给项目页、关于页、GitHub 明确入口。

Hero 右侧不使用抽象插画。使用真实项目名称、技术栈、状态和数据流做成产品面板。

## 8. 项目页

- 项目以数据驱动方式渲染。
- 支持搜索、分类筛选、分页。
- 默认每页 6 个项目，桌面两列，移动端一列。
- 卡片 hover：边框变亮 + 轻微上移，不做 3D 旋转。
- 快速预览使用 modal；Esc 关闭，点击遮罩关闭。
- `/` 聚焦搜索。
- URL 保存 filter / q / page，刷新不丢状态。

## 9. 项目详情

- 顶部和主站共用同一套蓝黑设计语言。
- 重点是“这是干什么 / 为什么做 / 现在有什么”，不把 README 全搬过来。
- 技术流用深一级 surface 的 mono 面板表示。
- GitHub 是次级入口，正文先在站内看完。

## 10. 动效

时间：140–220ms。

允许：

- hover 边框/背景过渡。
- 页面内容轻微上移进入。
- tab 内容淡入。
- modal scale 0.98 → 1。
- 数字/进度轻微过渡。

禁止：

- 大面积粒子。
- 鼠标跟随强光晕。
- 无限旋转装饰。
- 长达 500ms 以上的页面动画。

必须支持 `prefers-reduced-motion: reduce`。

## 11. 文案

- 中文正常说话。
- 避免“赋能、连接数字世界、探索边界、持续演进、构建未来”等空话。
- 项目介绍优先回答“这是干什么的”。
- 不写无法验证的性能数字和虚构状态。
