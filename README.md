<p align="center">
  <img src="./public/favicon.svg" width="88" height="88" alt="PolarStart Logo" />
</p>

<h1 align="center">PolarStart</h1>

<p align="center">一个带搜索、壁纸、热点、IT 动态和 AI 资讯的 Vue 3 起始页。</p>

<p align="center">
  <img alt="Vue" src="https://img.shields.io/badge/Vue-3.5-42b883?style=flat-square&logo=vuedotjs&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Pinia" src="https://img.shields.io/badge/Pinia-3.0-FFD859?style=flat-square&logo=pinia&logoColor=222" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" />
</p>

<p align="center">
  <img alt="AI HOT" src="https://img.shields.io/badge/Data-AI%20HOT-59B8FF?style=flat-square" />
  <img alt="60s API" src="https://img.shields.io/badge/Data-60s%20API-16A34A?style=flat-square" />
  <img alt="Bing Wallpaper" src="https://img.shields.io/badge/Bing-Wallpaper-0EA5E9?style=flat-square" />
</p>

PolarStart 现在不再只是一个简单的搜索首页，而是一个带顶部导航、多数据页面、主题切换、Bing 每日壁纸和多源内容聚合的轻量信息门户。

## 预览亮点

```text
首页搜索 / Bing 壁纸 / 全网热点 / IT 动态 / AI 日报 / AI 动态
```

## 主要特性

- 首页搜索体验
  - 顶部导航栏
  - 中央搜索框
  - 底部快捷入口栏
  - Bing 每日壁纸背景，可在顶部栏开关
- 多页面信息流
  - `首页`
  - `全网热点`
  - `IT 动态`
  - `AI 日报`
  - `AI 动态`
- 主题与显示
  - 浅色 / 深色模式切换
  - Bing 壁纸开关状态持久化
  - 统一的透明模糊磨砂风格导航与浮层
- 数据接入
  - AI HOT：日报与 AI 动态
  - 60s API：全网热点、IT 动态
  - 60s 多实例随机兜底，请求失败时自动切换其他实例
- 状态管理
  - 使用 Pinia 管理主题、热点、AI 内容、IT 内容状态
  - 进入网站后会在后台预加载核心数据页

## 页面说明

### 首页

- 搜索引擎切换搜索框
- 底部快捷入口
- Bing 每日壁纸背景

### 全网热点

聚合以下来源的热榜数据：

- 微博
- 抖音
- 小红书
- 知乎
- B 站
- 今日头条

每个热榜单独加载，失败时会自动随机切换到其他 60s 实例。

### IT 动态

基于 60s API 的实时 IT 资讯流，当前来源为 IT 之家。

### AI 日报

基于 AI HOT 的日报接口，支持分类切换查看。

### AI 动态

基于 AI HOT 的精选动态流，采用资讯列表样式展示。

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | Vue 3 |
| 构建 | Vite |
| 语言 | TypeScript |
| 路由 | Vue Router |
| 状态 | Pinia |
| 图标 | Lucide Icons |

## 数据来源

| 数据 | 用途 | 方式 |
| --- | --- | --- |
| AI HOT | AI 日报、AI 动态 | 同源 `/aihot-api` 代理 |
| 60s API | 全网热点、IT 动态 | 公网实例直连 + 随机兜底 |
| Bing 每日壁纸 | 首页背景 | `https://bing.ee123.net/img/` |

### AI HOT

- 本地开发: Vite 代理 `/aihot-api` -> `https://aihot.virxact.com/api/public`
- Cloudflare Pages: Functions 代理 `/aihot-api/*` -> `https://aihot.virxact.com/api/public/*`
- 代理请求会附带浏览器风格 `User-Agent`

### 60s API

直接请求公网实例。

当前内置兜底实例：

- `https://60s.viki.moe`
- `https://60s.qgming.com`
- `https://api.yanyua.icu`
- `https://60s.7se.cn`
- `https://60s.mizhoubaobei.top`
- `https://api.cczo.cc/60s`

请求策略：

- 每次请求随机选择实例顺序
- 某个实例失败时自动切换下一个
- 全部实例失败时才向页面暴露错误

## 项目结构

```text
src/
  App.vue
  main.ts
  assets/
    main.css
  components/
    ActionMenu.vue
    DockBar.vue
    SearchBar.vue
    TopNav.vue
  router/
    index.ts
  stores/
    content.ts
    theme.ts
  views/
    HomeView.vue
    HotView.vue
    ItNewsView.vue
    AihotView.vue
    AihotItemsView.vue
functions/
  aihot-api/
    [[path]].js
public/
  _redirects
```

## 安装与开发

```bash
npm install
npm run dev
```

默认开发服务器地址通常为：

```text
http://localhost:5173
```

如果端口被占用，Vite 会自动切换到下一个可用端口。

## 构建

```bash
npm run type-check
npm run build
npm run preview
```

## Cloudflare Pages 部署

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22`

项目包含两个和 Cloudflare Pages 相关的文件:

- `functions/aihot-api/[[path]].js`: 代理 AI HOT 请求,解决生产环境直连失败问题
- `public/_redirects`: 保留 `/aihot-api/*` 代理路径,并处理 Vue Router history 模式的页面刷新回退

## 当前快捷入口

首页底部栏当前包含：

- DeepSeek
- GitHub
- Bilibili
- 抖音官网
- 橘子导航
- Linux Do

## 说明

- Bing 壁纸默认开启
- AI HOT 页面通过同源 `/aihot-api` 访问,本地与 Cloudflare 部署保持一致
- 60s API 使用公网实例直连

## License

MIT
