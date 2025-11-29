<template>
  <div class="wallpaper-settings">
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
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin: 0 0 12px 0;
  padding-left: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.default-wallpapers {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wallpaper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.wallpaper-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.wallpaper-thumbnail:hover {
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
}

.wallpaper-thumbnail.active {
  border-color: rgba(59, 130, 246, 0.8);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2),
    0 8px 20px rgba(59, 130, 246, 0.3);
  transform: scale(1.05);
}

.wallpaper-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wallpaper-overlay {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
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
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.3) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.wallpaper-item:hover {
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.4) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.wallpaper-item.active {
  background: linear-gradient(135deg,
      rgba(59, 130, 246, 0.25) 0%,
      rgba(139, 92, 246, 0.25) 100%);
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2),
    0 0 1px rgba(255, 255, 255, 0.5) inset;
}

.wallpaper-preview {
  width: 80px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.wallpaper-preview::before {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  filter: brightness(1.1);
  opacity: 0;
  transition: opacity 0.3s;
}

.wallpaper-item:hover .wallpaper-preview::before {
  opacity: 1;
}

.daily-preview {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.random-preview {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.preview-text {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.wallpaper-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.wallpaper-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.wallpaper-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
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