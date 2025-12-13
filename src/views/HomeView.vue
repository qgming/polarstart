<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSettingsStore, BackgroundType } from '@/stores/settings'
import DockBar from '@/components/DockBar.vue'
import TimeDisplay from '@/components/TimeDisplay.vue'
import SearchBar from '@/components/SearchBar.vue'

const settingsStore = useSettingsStore()

const backgroundUrl = computed(() => {
  return 'https://bing.ee123.net/img/'
})

// 异步背景加载状态
const isBackgroundLoaded = ref(false)

onMounted(() => {
  // 异步加载背景图片
  const img = new Image()
  img.onload = () => {
    isBackgroundLoaded.value = true
  }
  img.src = backgroundUrl.value
})
</script>

<template>
  <div class="home-container">
    <!-- 背景图层 -->
    <div
      class="background-layer"
      :class="{ 'background-loaded': isBackgroundLoaded }"
      :style="{ backgroundImage: isBackgroundLoaded ? `url(${backgroundUrl})` : 'none' }"
    ></div>

    <!-- 渐变遮罩层 - 增强深度 -->
    <div class="gradient-overlay"></div>

    <!-- 内容层 -->
    <div class="content-layer">
      <!-- 时间显示 - 顶部 10vh，居中 -->
      <div class="time-container">
        <TimeDisplay />
      </div>

      <!-- 搜索栏 - 35vh 处，居中 -->
      <div class="search-container">
        <SearchBar />
      </div>

      <!-- Dock栏组件 -->
      <DockBar />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #0f0f14;
}

/* 背景图层 */
.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}

.background-layer.background-loaded {
  opacity: 1;
  transform: scale(1);
}

/* 渐变遮罩层 - 创造深度和氛围 */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 30%,
    rgba(0, 0, 0, 0.1) 70%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* 内容层 */
.content-layer {
  position: relative;
  min-height: 100vh;
  z-index: 2;
}

/* 时间容器 */
.time-container {
  position: absolute;
  top: 10vh;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  animation: fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

/* 搜索容器 */
.search-container {
  position: absolute;
  top: 35vh;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .time-container {
    top: 8vh;
  }

  .search-container {
    top: 30vh;
  }
}

@media (max-width: 640px) {
  .time-container {
    top: 6vh;
  }

  .search-container {
    top: 25vh;
    padding: 0 0.75rem;
  }
}
</style>