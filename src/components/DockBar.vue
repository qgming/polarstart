<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dock栏项目 - 整合导航和快捷方式
const dockItems = ref([
  { name: '信息', type: 'nav', route: '/info-cards', icon: '📱', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Google', type: 'link', url: 'https://www.google.com', icon: '🔍', gradient: 'from-red-500 to-yellow-500' },
  { name: 'GitHub', type: 'link', url: 'https://github.com', icon: '🐙', gradient: 'from-purple-500 to-pink-500' },
  { name: 'YouTube', type: 'link', url: 'https://www.youtube.com', icon: '📺', gradient: 'from-red-600 to-red-400' },
  { name: 'Twitter', type: 'link', url: 'https://twitter.com', icon: '🐦', gradient: 'from-blue-400 to-blue-600' },
  { name: '分类', type: 'nav', route: '/web-categories', icon: '🌐', gradient: 'from-green-500 to-emerald-500' }
])

// 处理Dock项目点击
const handleDockItemClick = (item: any) => {
  if (item.type === 'nav' && item.route) {
    router.push(item.route)
  } else if (item.type === 'link' && item.url) {
    window.open(item.url, '_blank')
  }
}
</script>

<template>
  <!-- 底部Dock栏 - iOS/HarmonyOS风格 -->
  <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in" style="animation-delay: 0.3s;">
    <div class="dock-container">
      <div v-for="(item, index) in dockItems" :key="index" class="dock-item"
        :style="{ animationDelay: `${0.4 + index * 0.05}s` }" @click="handleDockItemClick(item)">
        <div class="dock-item-bg" :class="`bg-gradient-to-br ${item.gradient}`"></div>
        <div class="dock-item-content">
          <span class="text-3xl">{{ item.icon }}</span>
        </div>
        <div class="dock-item-label">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 底部Dock栏容器 */
.dock-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 20px 60px rgba(0, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dock-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.15) inset,
    0 24px 80px rgba(0, 0, 0, 0.5);
}

/* Dock图标项 */
.dock-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: fadeIn 0.5s ease-out backwards;
}

.dock-item:hover {
  transform: translateY(-12px) scale(1.15);
  z-index: 10;
}

.dock-item:active {
  transform: translateY(-8px) scale(1.05);
}

/* Dock图标背景 */
.dock-item-bg {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  opacity: 0.9;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dock-item:hover .dock-item-bg {
  opacity: 1;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4),
    0 0 20px currentColor;
  transform: scale(1.05);
}

/* Dock图标内容 */
.dock-item-content {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
}

.dock-item:hover .dock-item-content {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
}

/* Dock图标标签 */
.dock-item-label {
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%) scale(0.8);
  white-space: nowrap;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  padding: 4px 10px;
  border-radius: 8px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dock-item:hover .dock-item-label {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  bottom: -32px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dock-container {
    gap: 8px;
    padding: 10px 16px;
    border-radius: 20px;
  }

  .dock-item-content {
    width: 48px;
    height: 48px;
    border-radius: 14px;
  }

  .dock-item-content span {
    font-size: 24px;
  }
}

@media (max-width: 640px) {
  .dock-container {
    max-width: 90vw;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .dock-container::-webkit-scrollbar {
    display: none;
  }
}
</style>