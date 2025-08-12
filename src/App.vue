<script setup lang="ts"></script>

<template>
  <router-view />
</template>

<style>
/* 全局滚动条样式 - 适用于所有滚动容器 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: all 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.4);
}

/* 暗色主题滚动条 */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  ::-webkit-scrollbar-thumb:active {
    background: rgba(255, 255, 255, 0.4);
  }
}

/* Firefox滚动条样式 */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);
}

@media (prefers-color-scheme: dark) {
  * {
    scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
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
