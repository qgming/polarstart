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
  <div class="min-h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
    :style="{ backgroundImage: isBackgroundLoaded ? `url(${backgroundUrl})` : 'none', backgroundColor: '#1a1a2e' }">

    <!-- 时间显示 - 顶部 10vh，居中 -->
    <div class="absolute left-1/2 -translate-x-1/2 z-10" style="top: 10vh;">
      <TimeDisplay />
    </div>

    <!-- 搜索栏 - 30vh 处，居中 -->
    <div class="absolute left-0 right-0 z-10 flex justify-center px-4" style="top: 35vh;">
      <SearchBar />
    </div>

    <!-- Dock栏组件 -->
    <DockBar />
  </div>
</template>

<style scoped>
/* 背景加载动画 */
.bg-cover {
  transition: background-image 0.5s ease-in-out;
}
</style>