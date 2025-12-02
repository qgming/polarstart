<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSettingsStore, BackgroundType } from '@/stores/settings'

const searchQuery = ref('')
const settingsStore = useSettingsStore()

const backgroundUrl = computed(() => {
  return 'https://bing.ee123.net/img/'
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    window.open(`https://www.bing.com/search?q=${encodeURIComponent(searchQuery.value)}`, '_blank')
  }
}
</script>

<template>
  <div class="home-container" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <!-- 搜索框 -->
    <div class="search-wrapper">
      <input v-model="searchQuery" type="text" placeholder="搜索..." @keyup.enter="handleSearch" class="search-input" />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

/* 确保背景图片始终居中裁剪 */
.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: inherit;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  z-index: -1;
}

/* 搜索容器定位样式 */
.search-wrapper {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
}

/* 搜索输入框样式 */
.search-input {
  width: 100%;
  padding: 0;
  font-size: 18px;
  border: none;
  background: transparent;
  color: white;
  outline: none;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-wrapper {
    width: 80%;
    max-width: 400px;
  }

  .search-input {
    font-size: 16px;
  }
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
</style>