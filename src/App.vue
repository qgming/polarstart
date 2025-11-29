<script setup lang="ts"></script>

<template>
  <router-view />
</template>

<style>
/* 全局滚动条样式 - 液态玻璃风格 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  margin: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg,
      rgba(59, 130, 246, 0.4) 0%,
      rgba(139, 92, 246, 0.4) 100%);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg,
      rgba(59, 130, 246, 0.6) 0%,
      rgba(139, 92, 246, 0.6) 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transform: scale(1.05);
}

::-webkit-scrollbar-thumb:active {
  background: linear-gradient(180deg,
      rgba(59, 130, 246, 0.8) 0%,
      rgba(139, 92, 246, 0.8) 100%);
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
}

/* 暗色主题滚动条 */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg,
        rgba(59, 130, 246, 0.5) 0%,
        rgba(139, 92, 246, 0.5) 100%);
    border: 2px solid rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg,
        rgba(59, 130, 246, 0.7) 0%,
        rgba(139, 92, 246, 0.7) 100%);
  }

  ::-webkit-scrollbar-thumb:active {
    background: linear-gradient(180deg,
        rgba(59, 130, 246, 0.9) 0%,
        rgba(139, 92, 246, 0.9) 100%);
  }
}

/* Firefox滚动条样式 */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.4) rgba(255, 255, 255, 0.1);
}

@media (prefers-color-scheme: dark) {
  * {
    scrollbar-color: rgba(59, 130, 246, 0.5) rgba(0, 0, 0, 0.2);
  }
}

/* 确保滚动容器有平滑滚动效果 */
html {
  scroll-behavior: smooth;
}

/* 隐藏滚动条但保留功能 */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<style scoped>
/* 组件特定样式 */
</style>
