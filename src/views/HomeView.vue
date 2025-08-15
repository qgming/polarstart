<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSettingsStore, BackgroundType } from '@/stores/settings'
import LiquidGlass from '@/components/LiquidGlass.vue'
import SettingsModal from '@/components/SettingsModal.vue'

const searchQuery = ref('')
const settingsStore = useSettingsStore()
const showSettingsModal = ref(false)

const backgroundUrl = computed(() => {
  if (settingsStore.backgroundType === BackgroundType.Daily) {
    return 'https://bing.ee123.net/img/'
  } else if (settingsStore.backgroundType === BackgroundType.Random) {
    return 'https://bing.ee123.net/img/rand'
  } else if (settingsStore.backgroundType === BackgroundType.Custom) {
    return settingsStore.customWallpaper
  }
  // 默认返回每日壁纸
  return 'https://bing.ee123.net/img/'
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    window.open(`${settingsStore.searchEngine.url}${encodeURIComponent(searchQuery.value)}`, '_blank')
  }
}

const openSettings = () => {
  showSettingsModal.value = true
}

const closeSettings = () => {
  showSettingsModal.value = false
}
</script>

<template>
  <div class="home-container" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <!-- 外层容器控制位置 -->
    <div class="search-wrapper">
      <!-- 使用液态玻璃组件包装搜索输入框 -->
      <LiquidGlass width="100%" height="50px" border-radius="50px">
        <input v-model="searchQuery" type="text" placeholder="" @keyup.enter="handleSearch" class="search-input" />
      </LiquidGlass>
    </div>

    <!-- 设置按钮 -->
    <div class="settings-button-container">
      <LiquidGlass class="settings-button" width="40px" height="40px" border-radius="12px"
        background-color="rgba(0, 0, 0, 0.15)" @click="openSettings">
        <div class="settings-icon">
          <img src="/icons/setting.png" alt="设置" width="24" height="24" />
        </div>
      </LiquidGlass>
    </div>

    <!-- 新的设置弹窗 -->
    <SettingsModal :visible="showSettingsModal" @close="closeSettings" />
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
  color: rgba(0, 0, 0, 0.25);
}

/* 设置按钮容器样式 */
.settings-button-container {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1000;
}

.settings-button {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.settings-button:hover {
  transform: scale(1.05);
}

.settings-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100%;
  height: 100%;
}
</style>