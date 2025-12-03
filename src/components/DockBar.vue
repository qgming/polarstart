<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
  <!-- 底部Dock栏 - iOS风格高斯模糊效果 -->
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 opacity-0 animate-fade-in" style="animation-delay: 0.3s;">
    <!-- Dock容器 - 使用Tailwind CSS -->
    <div class="flex items-center gap-2 rounded-2xl border border-white/10
                transition-all duration-300 hover:border-white/15 shadow-lg hover:shadow-xl"
      style="padding-left: 0.625rem; padding-right: 0.625rem; padding-top: 0.625rem; padding-bottom: 0.625rem; background-color: rgba(20, 20, 20, 0.6); backdrop-filter: blur(40px) saturate(200%); -webkit-backdrop-filter: blur(40px) saturate(200%);">

      <!-- 左侧：信息导航 -->
      <div class="flex items-center gap-2">
        <div v-for="(item, index) in leftNavItems" :key="`left-${index}`" class="dock-item group"
          :style="{ animationDelay: `${0.4 + index * 0.05}s` }" @click="handleDockItemClick(item)">
          <!-- 白色背景图标 -->
          <div class="relative w-11 h-11 rounded-lg bg-white/60 backdrop-blur-md border border-white/30
                      flex items-center justify-center transition-all duration-300 cursor-pointer
                      group-hover:scale-110 group-hover:bg-white/75 group-hover:border-white/40 group-hover:shadow-xl group-hover:-translate-y-1.5
                      group-active:scale-105 shadow-md">
            <span class="text-xl">{{ item.icon }}</span>
          </div>
          <!-- 标签 -->
          <div class="dock-label">{{ item.name }}</div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="w-px h-9 bg-white/15 mx-2"></div>

      <!-- 中间：网页导航链接 -->
      <div class="flex items-center gap-2 px-2">
        <div v-for="(item, index) in webLinks" :key="`web-${index}`" class="dock-item group"
          :style="{ animationDelay: `${0.45 + index * 0.05}s` }" @click="handleDockItemClick(item)">
          <!-- 白色背景图标 -->
          <div class="relative w-11 h-11 rounded-lg bg-white/60 backdrop-blur-md border border-white/30
                      flex items-center justify-center transition-all duration-300 cursor-pointer
                      group-hover:scale-110 group-hover:bg-white/75 group-hover:border-white/40 group-hover:shadow-xl group-hover:-translate-y-1.5
                      group-active:scale-105 shadow-md">
            <span class="text-xl">{{ item.icon }}</span>
          </div>
          <!-- 标签 -->
          <div class="dock-label">{{ item.name }}</div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="w-px h-9 bg-white/15 mx-2"></div>

      <!-- 右侧：分类导航 -->
      <div class="flex items-center gap-2">
        <div v-for="(item, index) in rightNavItems" :key="`right-${index}`" class="dock-item group"
          :style="{ animationDelay: `${0.65 + index * 0.05}s` }" @click="handleDockItemClick(item)">
          <!-- 白色背景图标 -->
          <div class="relative w-11 h-11 rounded-lg bg-white/60 backdrop-blur-md border border-white/30
                      flex items-center justify-center transition-all duration-300 cursor-pointer
                      group-hover:scale-110 group-hover:bg-white/75 group-hover:border-white/40 group-hover:shadow-xl group-hover:-translate-y-1.5
                      group-active:scale-105 shadow-md">
            <span class="text-xl">{{ item.icon }}</span>
          </div>
          <!-- 标签 -->
          <div class="dock-label">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.dock-item {
  position: relative;
  animation: fadeIn 0.5s ease-out backwards;
}

/* iOS风格标签 */
.dock-label {
  position: absolute;
  bottom: -26px;
  left: 50%;
  transform: translateX(-50%) scale(0.85);
  white-space: nowrap;
  font-size: 10px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 3px 8px;
  border-radius: 5px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dock-item:hover .dock-label {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  bottom: -28px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dock-item>div {
    width: 38px !important;
    height: 38px !important;
  }

  .dock-item span {
    font-size: 18px !important;
  }
}

@media (max-width: 640px) {
  .dock-item>div {
    width: 34px !important;
    height: 34px !important;
  }

  .dock-item span {
    font-size: 16px !important;
  }
}
</style>