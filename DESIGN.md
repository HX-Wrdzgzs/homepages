# HX Personal Site — DESIGN.md

个人主页固定使用浅色视觉。白色是主画布，蓝黑色用于文字和结构，冷蓝用于强调，不提供整站深色主题。

## 1. 颜色

```text
canvas        #ffffff
canvas-soft   #f6f8fb
surface       #ffffff
surface-hover #f8fbff
ink           #0b1728
ink-muted     #526174
ink-subtle    #8793a3
hairline      #e5eaf0
hairline-2    #d4dce7
accent        #2563eb
accent-hover  #1d4ed8
accent-soft   #edf4ff
success       #228b5d
```

规则：

- 页面以白色为主，不使用大面积黑色或深色背景。
- 蓝黑色用于标题、正文和结构层级，不做整页底色。
- 蓝色只用于主按钮、链接、选中态、焦点和少量状态提示。
- 卡片主要靠 1px 边框和很浅的阴影区分层级。
- 不使用彩虹渐变、霓虹发光、玻璃拟态堆叠。

## 2. 排版

主字体：

```css
Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
"Segoe UI", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif
```

等宽字体只用于技术标签、状态和少量英文小字：

```css
ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace
```

- Hero：`clamp(3rem, 7vw, 6.25rem)`，600–650，负字距。
- 页面标题：`clamp(3.4rem, 7vw, 5.9rem)`。
- 区块标题：2–3.25rem。
- 卡片标题：18–22px。
- 正文：14–18px，行高 1.7–1.85。
- 标签：11–13px。

## 3. 组件

- 顶部导航 64px，移动端 58px。
- 按钮圆角 9px；卡片 10–12px；大型预览 16px。
- 搜索、筛选、分页、弹窗都必须有明确 hover / focus / active 状态。
- 项目页每页 6 个，搜索和分类后重新计算分页。
- 项目快速预览使用 Modal，Esc 可关闭，`/` 可聚焦搜索。
- 动效控制在 120–220ms；进入动画可以更慢，但不超过 450ms。

## 4. 文案

- 中文为主；英文只保留项目名、技术名和少量短标签。
- 写事实：做什么、现在怎样、用了什么。
- 不解释页面设计，不写“这个站不想怎样”“这里不会怎样”之类的自我说明。
- 避免“探索、构建、连接、持续演进、数字空间、技术边界”等空泛表达。
- 呼号不作为个人主页身份标签；只有确实以呼号命名的项目可以出现呼号。

## 5. 页面

### 首页

- 一句话说明自己平时做什么。
- 展示 3 个常改项目和近期事项。
- 右侧产品预览用于真实项目切换，不做装饰动画。

### 项目页

- 全部个人公开项目。
- 搜索、分类、分页、快速预览。
- GitHub 是次级入口，不是唯一入口。

### 关于

- 基本介绍、常用技术、开发组和常用链接。
- 不做简历式技能打分，不重复展示呼号等无关身份信息。
