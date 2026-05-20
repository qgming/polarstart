# PolarStart

一个清爽的 Vue 3 单页起始页模板，保留了三件核心能力：

- 大号时间与日期展示
- 中央搜索框
- 底部快捷 tabbar

这个版本刻意做了瘦身，适合作为后续继续扩展的基础项目。

## 当前特性

- 单页结构，没有路由、状态管理和历史业务负担
- 使用 `@lucide/vue` 统一图标体系
- 轻量 CSS，自带响应式布局
- 保留 Vite + Vue + TypeScript 的开发体验
- 首页背景支持必应壁纸异步加载

## 技术栈

- Vue 3
- TypeScript
- Vite
- Lucide

## 项目结构

```text
src/
  App.vue
  main.ts
  assets/
    main.css
  components/
    DockBar.vue
    SearchBar.vue
    TimeDisplay.vue
  views/
    HomeView.vue
```

## 开发

```bash
npm install
npm run dev
```

默认地址：`http://localhost:5173`

## 构建

```bash
npm run type-check
npm run build
npm run preview
```

## 这次整理做了什么

- 移除了网站分类、About 页面和信息卡片页
- 移除了所有小组件与相关数据
- 移除了 `vue-router`、`pinia`、`pinia-plugin-persistedstate`
- 移除了 Tailwind / PostCSS / Vue DevTools 插件配置
- 移除了旧的埋点与额外站点验证脚本
- 统一改为 Lucide 图标

## 后续适合继续加的方向

- 搜索引擎切换
- 自定义快捷入口
- 主题模式切换
- 本地设置持久化
- 命令面板或快捷键支持

## License

MIT
