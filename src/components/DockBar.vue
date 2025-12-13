<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import WebsiteIcon from '@/components/WebsiteIcon.vue'

const router = useRouter()

// 左侧导航项
const leftNavItems = ref([
  { name: '信息', type: 'nav', route: '/info-cards', icon: '📱' }
])

// 中间网页快捷方式
const webLinks = ref([
  { name: 'Google', type: 'link', url: 'https://www.google.com', icon: '🔍' },
  { name: 'GitHub', type: 'link', url: 'https://github.com', icon: '🐙' },
  { name: 'Bilibili', type: 'link', url: 'https://www.bilibili.com', icon: '📺' },
  { name: 'X', type: 'link', url: 'https://x.com', icon: '✖️' },
  { name: 'Linux.do', type: 'link', url: 'https://linux.do', icon: '🐧' }
])

// 右侧导航项
const rightNavItems = ref([
  { name: '分类', type: 'nav', route: '/web-categories', icon: '🌐' }
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
  <!-- 底部Dock栏 - 现代化高斯模糊设计 -->
  <div class="dock-wrapper">
    <!-- Dock容器 -->
    <div class="dock-container glass-primary will-change-backdrop gpu-accelerate">

      <!-- 左侧：信息导航 -->
      <div class="dock-section">
        <div
          v-for="(item, index) in leftNavItems"
          :key="`left-${index}`"
          class="dock-item"
          :style="{ animationDelay: `${0.4 + index * 0.05}s` }"
          @click="handleDockItemClick(item)"
        >
          <div class="dock-icon-container">
            <span class="dock-icon">{{ item.icon }}</span>
          </div>
          <div class="dock-label">{{ item.name }}</div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="dock-divider"></div>

      <!-- 中间：网页导航链接 -->
      <div class="dock-section dock-section-main">
        <div
          v-for="(item, index) in webLinks"
          :key="`web-${index}`"
          class="dock-item"
          :style="{ animationDelay: `${0.45 + index * 0.05}s` }"
          @click="handleDockItemClick(item)"
        >
          <div class="dock-icon-container">
            <WebsiteIcon
              :url="item.url"
              :name="item.name"
              :fallback-icon="item.icon"
              :size="40"
              class="dock-icon-website"
            />
          </div>
          <div class="dock-label">{{ item.name }}</div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="dock-divider"></div>

      <!-- 右侧：分类导航 -->
      <div class="dock-section">
        <div
          v-for="(item, index) in rightNavItems"
          :key="`right-${index}`"
          class="dock-item"
          :style="{ animationDelay: `${0.65 + index * 0.05}s` }"
          @click="handleDockItemClick(item)"
        >
          <div class="dock-icon-container">
            <span class="dock-icon">{{ item.icon }}</span>
          </div>
          <div class="dock-label">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Dock包裹器 */
.dock-wrapper {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  opacity: 0;
  animation: dockFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
}

/* Dock容器 */
.dock-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem;
  border-radius: 1rem;
  transition: all var(--duration-smooth) var(--ease-smooth);
}

.dock-container:hover {
  border-color: var(--border-glass-strong);
  box-shadow: var(--shadow-glass-xl);
  transform: translateY(-2px);
}

/* Dock分区 */
.dock-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dock-section-main {
  padding: 0 0.5rem;
}

/* Dock分隔线 */
.dock-divider {
  width: 1px;
  height: 2.25rem;
  background: var(--border-glass-medium);
  margin: 0 0.5rem;
}

/* Dock项目 */
.dock-item {
  position: relative;
  animation: dockItemFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

/* 图标容器 */
.dock-icon-container {
  position: relative;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-glass-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-glass-sm);
  transition: all var(--duration-normal) var(--ease-spring);
  overflow: hidden;
}

/* 悬停光泽效果 */
.dock-icon-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-glass);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-smooth);
}

.dock-item:hover .dock-icon-container {
  transform: translateY(-6px) scale(1.1);
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: var(--shadow-glass-lg);
}

.dock-item:hover .dock-icon-container::before {
  opacity: 1;
}

.dock-item:active .dock-icon-container {
  transform: translateY(-4px) scale(1.05);
}

/* 图标 */
.dock-icon {
  font-size: 1.25rem;
  position: relative;
  z-index: 1;
  transition: transform var(--duration-fast) var(--ease-smooth);
}

.dock-item:hover .dock-icon {
  transform: scale(1.1);
}

/* 网站图标样式 */
.dock-icon-website {
  position: relative;
  z-index: 1;
  transition: transform var(--duration-fast) var(--ease-smooth);
}

.dock-item:hover .dock-icon-website {
  transform: scale(1.1);
}

/* Dock标签 */
.dock-label {
  position: absolute;
  bottom: -1.75rem;
  left: 50%;
  transform: translateX(-50%) scale(0.85);
  white-space: nowrap;
  font-size: 0.625rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  opacity: 0;
  pointer-events: none;
  transition: all var(--duration-normal) var(--ease-spring);
  box-shadow: var(--shadow-glass-md);
  border: 1px solid var(--border-glass-subtle);
}

.dock-item:hover .dock-label {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  bottom: -1.875rem;
}

/* 动画关键帧 */
@keyframes dockFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes dockItemFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dock-wrapper {
    bottom: 1rem;
  }

  .dock-icon-container {
    width: 2.375rem;
    height: 2.375rem;
    border-radius: 0.625rem;
  }

  .dock-icon {
    font-size: 1.125rem;
  }

  .dock-divider {
    height: 2rem;
  }
}

@media (max-width: 640px) {
  .dock-wrapper {
    bottom: 0.75rem;
  }

  .dock-container {
    padding: 0.5rem;
    gap: 0.375rem;
  }

  .dock-section {
    gap: 0.375rem;
  }

  .dock-icon-container {
    width: 2.125rem;
    height: 2.125rem;
    border-radius: 0.5rem;
  }

  .dock-icon {
    font-size: 1rem;
  }

  .dock-divider {
    height: 1.75rem;
    margin: 0 0.25rem;
  }

  .dock-section-main {
    padding: 0 0.25rem;
  }
}
</style>