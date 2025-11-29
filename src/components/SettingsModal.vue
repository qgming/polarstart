<template>
  <div class="settings-modal-overlay" v-if="visible" @click="close">
    <div class="settings-modal-container" @click.stop>
      <div class="settings-modal">
        <!-- 左侧设置列表 -->
        <div class="settings-sidebar">
          <div class="sidebar-header">
            <h3>设置</h3>
          </div>
          <div class="settings-menu">
            <div v-for="item in menuItems" :key="item.key" class="menu-item" :class="{ active: activeTab === item.key }"
              @click="activeTab = item.key">
              <span class="menu-icon">{{ item.icon }}</span>
              <span class="menu-text">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧内容区域 -->
        <div class="settings-content">
          <div class="content-header">
            <h3>{{ currentMenuItem?.label }}</h3>
            <button class="close-btn" @click="close">×</button>
          </div>
          <div class="content-body">
            <SearchEngineSettings v-if="activeTab === 'search'" @close="close" />
            <WallpaperSettings v-if="activeTab === 'wallpaper'" @close="close" />
            <AboutSettings v-if="activeTab === 'about'" @close="close" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SearchEngineSettings from './SearchEngineSettings.vue'
import WallpaperSettings from './WallpaperSettings.vue'
import AboutSettings from './AboutSettings.vue'

interface MenuItem {
  key: string
  label: string
  icon: string
}

const menuItems: MenuItem[] = [
  { key: 'search', label: '搜索引擎', icon: '🔍' },
  { key: 'wallpaper', label: '壁纸设置', icon: '🖼️' },
  { key: 'about', label: '关于我们', icon: 'ℹ️' }
]

const activeTab = ref('search')

const currentMenuItem = computed(() =>
  menuItems.find(item => item.key === activeTab.value)
)

const emit = defineEmits<{
  close: []
}>()

defineProps<{
  visible: boolean
}>()

const close = () => {
  emit('close')
}
</script>

<style scoped>
.settings-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease-out;
}

.settings-modal-container {
  animation: scaleIn 0.3s ease-out;
}

.settings-modal {
  width: 700px;
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.8) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 1px rgba(255, 255, 255, 0.5) inset;
  display: flex;
  overflow: hidden;
}

/* 左侧边栏样式 */
.settings-sidebar {
  width: 200px;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px 0;
}

.sidebar-header {
  padding: 0 15px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.sidebar-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  margin: 4px 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #555;
  position: relative;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  color: #1a1a1a;
  transform: translateX(4px);
}

.menu-item.active {
  background: linear-gradient(135deg,
      rgba(59, 130, 246, 0.2) 0%,
      rgba(139, 92, 246, 0.2) 100%);
  backdrop-filter: blur(10px);
  color: #2563eb;
  border-right: none;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2),
    0 0 1px rgba(255, 255, 255, 0.5) inset;
}

.menu-item.active::before {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 2px 0 0 2px;
}

.menu-icon {
  font-size: 16px;
}

.menu-text {
  font-size: 14px;
  font-weight: 500;
}

/* 右侧内容区域样式 */
.settings-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.1) 100%);
}

.content-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.close-btn {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  line-height: 1;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  backdrop-filter: blur(10px);
  color: #ef4444;
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.content-body {
  height: 450px;
  padding: 20px 24px;
  overflow-y: auto;
  box-sizing: border-box;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

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

/* 响应式设计 */
@media (max-width: 768px) {
  .settings-modal-overlay {
    padding: 10px;
  }

  .settings-modal-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .settings-modal {
    width: 100%;
    max-width: 400px;
    flex-direction: column;
    margin: auto;
  }

  .settings-sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 0 0 0;
  }

  .settings-menu {
    display: flex;
    overflow-x: auto;
  }

  .menu-item {
    white-space: nowrap;
    border-right: none;
    border-bottom: 3px solid transparent;
  }

  .menu-item.active {
    border-right: none;
    border-bottom: 3px solid #2563eb;
  }

  .content-body {
    height: calc(100vh - 180px);
    max-height: 500px;
    overflow-y: auto;
  }
}

@media (max-width: 480px) {
  .settings-modal {
    max-width: 95%;
    height: 600px;
  }

  .content-body {
    height: calc(100vh - 160px);
    max-height: 450px;
  }
}
</style>