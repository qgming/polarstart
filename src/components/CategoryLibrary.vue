<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '@/data/webCategories'
import WebsiteIcon from '@/components/WebsiteIcon.vue'

interface Props {
  category: Category
}

const props = defineProps<Props>()

// 模态框状态管理
const isModalOpen = ref(false)

// 打开模态框
const openModal = (event: Event) => {
  event.stopPropagation()
  isModalOpen.value = true
  // 防止背景滚动
  document.body.style.overflow = 'hidden'
}

// 关闭模态框
const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

// 打开网站链接
const openWebsite = (url: string, event: Event) => {
  event.stopPropagation()
  window.open(url, '_blank', 'noopener,noreferrer')
}

// 键盘事件处理
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// ESC 键关闭模态框
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}
</script>

<template>
  <!-- iOS 资源库风格卡片 -->
  <div class="category-library-card">

    <!-- 图标预览区域 - 2x2 网格 -->
    <div class="icon-preview-container">
      <!-- 前3个网站图标 - 可点击跳转 -->
      <button v-for="(website, index) in category.websites.slice(0, 3)" :key="website.url"
        class="icon-item clickable-icon" :style="{ animationDelay: `${index * 0.05}s` }"
        :aria-label="`打开 ${website.name}`" @click="openWebsite(website.url, $event)">
        <div class="icon-wrapper">
          <WebsiteIcon
            :url="website.url"
            :name="website.name"
            :fallback-icon="website.icon"
            :size="56"
          />
        </div>
      </button>

      <!-- 更多图标区域 - 显示接下来最多4个网站的小图标 -->
      <button class="icon-item more-icon" aria-label="查看更多网站" @click="openModal">
        <div class="icon-wrapper more-wrapper">
          <div class="more-mini-icons-grid">
            <div
              v-for="(website, index) in category.websites.slice(3, 7)"
              :key="website.url"
              class="more-mini-icon"
            >
              <WebsiteIcon
                :url="website.url"
                :name="website.name"
                :fallback-icon="website.icon"
                :size="18"
              />
            </div>
          </div>
        </div>
      </button>
    </div>

    <!-- 类别名称 -->
    <h3 class="category-name">
      {{ category.name }}
    </h3>
  </div>

  <!-- 模态框 -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg transition-opacity duration-300"
        style="padding: 16px;" role="dialog" aria-modal="true" :aria-label="`${category.name} 网站列表`"
        @click.self="closeModal">
        <!-- 模态框内容 -->
        <div
          class="relative w-full max-w-lg md:max-w-xl rounded-[40px] bg-gradient-to-br from-white/15 via-white/10 to-transparent border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 animate-[scaleIn_0.3s_ease-out]"
          style="padding: 24px;" @click.stop>
          <!-- 模态框头部 -->
          <div class="flex justify-between items-center" style="margin-bottom: 24px;">
            <h2 class="text-white font-extrabold tracking-tighter"
              style="font-size: 30px; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);">
              {{ category.name }}
            </h2>
            <button
              class="flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              style="width: 40px; height: 40px;" aria-label="关闭对话框" @click="closeModal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- 网站网格 -->
          <div class="grid" style="gap: 16px; grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));">
            <button v-for="(website, index) in category.websites" :key="website.url"
              class="relative flex flex-col items-center rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden group animate-[scaleIn_0.3s_ease-out_backwards] bg-gradient-to-br from-white/8 to-white/4 border-white/12 hover:from-white/15 hover:to-white/8 hover:border-cyan-400/50 hover:-translate-y-1 hover:scale-105 active:translate-y-0.5 active:scale-[1.02] shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_36px_rgba(0,240,255,0.3),0_4px_16px_rgba(0,240,255,0.2)] focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              style="gap: 8px; padding: 14px; backdrop-filter: blur(8px);"
              :style="{ animationDelay: `${index * 0.03}s` }" :aria-label="`打开 ${website.name}`"
              @click="openWebsite(website.url, $event)">
              <!-- 悬停光效 -->
              <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"></div>

              <!-- 网站图标 -->
              <div class="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                style="filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.35));" aria-hidden="true">
                <WebsiteIcon
                  :url="website.url"
                  :name="website.name"
                  :fallback-icon="website.icon"
                  :size="36"
                />
              </div>

              <!-- 网站名称 -->
              <div
                class="relative z-10 text-white/90 text-center leading-tight max-w-full transition-all duration-300 line-clamp-2 group-hover:text-cyan-400 group-hover:-translate-y-0.5 font-semibold"
                style="font-size: 13px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); word-break: break-word;">
                {{ website.name }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ========================================================
   iOS 资源库风格卡片
   ======================================================== */

.category-library-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* 图标预览容器 - 圆角正方形 - 增大尺寸 */
.icon-preview-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  padding: 20px;
  border-radius: 36px;
  background: var(--glass-light-primary);
  backdrop-filter: blur(var(--blur-md)) var(--glass-saturate-mid);
  -webkit-backdrop-filter: blur(var(--blur-md)) var(--glass-saturate-mid);
  border: 1px solid var(--border-glass-medium);
  box-shadow: var(--shadow-glass-md), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  overflow: hidden;
  transition: all var(--duration-smooth) var(--ease-smooth);
}

.icon-preview-container:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: var(--border-glass-strong);
  box-shadow: var(--shadow-glass-lg), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* 单个图标项 */
.icon-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: iconFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  position: relative;
}

/* 可点击图标的悬停效果 */
.clickable-icon:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.clickable-icon:active {
  transform: scale(0.95);
}

@keyframes iconFadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 图标包装器 - 增大图标 */
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.clickable-icon:hover .icon-wrapper {
  transform: scale(1.15);
}

/* 更多图标区域 */
.more-icon {
  background: rgba(255, 255, 255, 0.06);
  border: 1px dashed rgba(255, 255, 255, 0.2) !important;
}

.more-icon:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border: 1px dashed rgba(255, 255, 255, 0.35) !important;
  transform: scale(1.05);
}

.more-icon:active {
  transform: scale(0.95);
}

.more-wrapper {
  font-size: inherit;
  filter: none;
}

/* 更多区域的小图标网格 - 2x2 布局 */
.more-mini-icons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 4px;
  width: 80%;
  height: 80%;
  padding: 4px;
}

.more-mini-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.more-icon:hover .more-mini-icon {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

/* 类别名称 - 增大字体 */
.category-name {
  margin: 0;
  padding: 0 8px;
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.01em;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ========================================================
   模态框动画
   ======================================================== */

/* Modal 容器淡入淡出 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Modal 内容缩放动画 */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ========================================================
   响应式设计
   ======================================================== */

@media (max-width: 768px) {
  .icon-preview-container {
    border-radius: 30px;
    padding: 16px;
    gap: 8px;
  }

  .icon-item {
    border-radius: 16px;
  }

  .category-name {
    font-size: 15px;
  }

  .category-library-card {
    gap: 10px;
  }

  .more-mini-icons-grid {
    gap: 3px;
    padding: 3px;
  }

  .more-mini-icon {
    border-radius: 4px;
  }

  /* 模态框内边距调整 */
  .relative.w-full.max-w-lg {
    padding: 20px !important;
  }

  /* 网格列数和间距调整 */
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)) !important;
    gap: 12px !important;
  }

  /* 网站卡片内边距调整 */
  .grid button {
    padding: 10px 6px !important;
  }

  /* 标题字体大小调整 */
  h2 {
    font-size: 24px !important;
  }
}

/* 平板尺寸优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .icon-preview-container {
    border-radius: 34px;
    padding: 18px;
  }
}

/* 大屏幕优化 */
@media (min-width: 1025px) {
  .icon-preview-container {
    padding: 24px;
    gap: 12px;
  }

  .icon-item {
    border-radius: 22px;
  }
}

/* ========================================================
   性能优化
   ======================================================== */

/* 使用 GPU 加速 */
.category-library-card,
.icon-preview-container,
.icon-item,
.icon-wrapper,
button {
  transform: translateZ(0);
  will-change: transform;
}

/* 减少重绘 */
* {
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 焦点样式 */
.icon-item:focus {
  outline: none;
}

.icon-item:focus-visible {
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.2),
    0 0 0 3px rgba(255, 255, 255, 0.4);
}
</style>