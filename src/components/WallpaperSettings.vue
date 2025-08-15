<template>
  <div class="wallpaper-settings">
    <div class="settings-scroll-container">
      <!-- 默认壁纸模块 -->
      <div class="section-title">默认壁纸</div>
      <div class="default-wallpapers">
        <div class="wallpaper-grid">
          <div v-for="(wallpaper, index) in defaultWallpapers" :key="index" class="wallpaper-thumbnail"
            :class="{ active: settingsStore.backgroundType === BackgroundType.Custom && settingsStore.customWallpaper === wallpaper }"
            @click="selectCustomWallpaper(wallpaper)">
            <img :src="wallpaper" :alt="'壁纸 ' + (index + 1)" />
            <div class="wallpaper-overlay">
              <span class="wallpaper-number">{{ index + 1 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 在线壁纸模块 -->
      <div class="section-title">在线壁纸</div>
      <div class="wallpaper-list">
        <div class="wallpaper-item" :class="{ active: settingsStore.backgroundType === BackgroundType.Daily }"
          @click="selectWallpaper(BackgroundType.Daily)">
          <div class="wallpaper-preview daily-preview">
            <span class="preview-text">每日壁纸</span>
          </div>
          <div class="wallpaper-info">
            <span class="wallpaper-name">每日壁纸</span>
            <span class="wallpaper-desc">每天自动更新必应壁纸</span>
          </div>
        </div>

        <div class="wallpaper-item" :class="{ active: settingsStore.backgroundType === BackgroundType.Random }"
          @click="selectWallpaper(BackgroundType.Random)">
          <div class="wallpaper-preview random-preview">
            <span class="preview-text">随机壁纸</span>
          </div>
          <div class="wallpaper-info">
            <span class="wallpaper-name">随机壁纸</span>
            <span class="wallpaper-desc">随机展示所有必应壁纸</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore, BackgroundType } from '@/stores/settings'
import { ref, onMounted } from 'vue'

const settingsStore = useSettingsStore()

const emit = defineEmits<{
  close: []
}>()

const defaultWallpapers = ref<string[]>([])

const loadDefaultWallpapers = async () => {
  try {
    // 模拟加载壁纸文件夹中的图片
    // 在实际应用中，这里可以通过API获取壁纸列表
    const wallpapers = [
      '/wallpapers/wallpaper1.jpg',
      '/wallpapers/wallpaper2.jpg',
      '/wallpapers/wallpaper3.jpg',
      '/wallpapers/wallpaper4.jpg',
      '/wallpapers/wallpaper5.jpg',
      '/wallpapers/wallpaper6.jpg',
      '/wallpapers/wallpaper7.jpg',
      '/wallpapers/wallpaper8.jpg'
    ]

    // 检查文件是否存在，只返回存在的壁纸
    const existingWallpapers = []
    for (const wallpaper of wallpapers) {
      try {
        const response = await fetch(wallpaper, { method: 'HEAD' })
        if (response.ok) {
          existingWallpapers.push(wallpaper)
        }
      } catch {
        // 文件不存在，跳过
      }
    }

    defaultWallpapers.value = existingWallpapers.length > 0 ? existingWallpapers : []
  } catch (error) {
    console.error('加载默认壁纸失败:', error)
    defaultWallpapers.value = []
  }
}

const selectWallpaper = (type: BackgroundType) => {
  settingsStore.setBackgroundType(type)
  emit('close')
}

const selectCustomWallpaper = (wallpaperPath: string) => {
  settingsStore.setCustomWallpaper(wallpaperPath)
  emit('close')
}

onMounted(() => {
  loadDefaultWallpapers()
})
</script>

<style scoped>
.wallpaper-settings {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.settings-scroll-container {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 16px 0 12px 0;
  padding-left: 4px;
}

.section-title:first-child {
  margin-top: 0;
}

.default-wallpapers {
  margin-bottom: 8px;
}

.wallpaper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.wallpaper-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.wallpaper-thumbnail:hover {
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.wallpaper-thumbnail.active {
  border-color: rgba(59, 130, 246, 0.8);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.wallpaper-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wallpaper-overlay {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
}

.wallpaper-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wallpaper-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.5);
}

.wallpaper-item:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.wallpaper-item.active {
  background-color: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.wallpaper-preview {
  width: 70px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.daily-preview {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.random-preview {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.preview-text {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.wallpaper-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wallpaper-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.wallpaper-desc {
  font-size: 12px;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .wallpaper-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
  }

  .wallpaper-item {
    padding: 12px;
    gap: 12px;
  }

  .wallpaper-preview {
    width: 60px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .wallpaper-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>