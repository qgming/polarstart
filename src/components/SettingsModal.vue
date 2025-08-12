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
  background-color: rgba(0, 0, 0, 0.5);
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
  height: 500px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  overflow: hidden;
}

/* 左侧边栏样式 */
.settings-sidebar {
  width: 200px;
  background-color: rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 0;
}

.sidebar-header {
  padding: 0 15px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.sidebar-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.settings-menu {
  padding: 10px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #333;
}

.menu-item.active {
  background-color: rgba(59, 130, 246, 0.1);
  color: #2563eb;
  border-right: 3px solid #2563eb;
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
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.content-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #333;
}

.content-body {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
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
  .settings-modal {
    width: 90%;
    height: 80%;
    flex-direction: column;
  }

  .settings-sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .settings-menu {
    display: flex;
    overflow-x: auto;
    padding: 10px;
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
}
</style>