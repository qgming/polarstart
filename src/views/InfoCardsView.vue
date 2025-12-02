<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 小部件数据 - 模拟手机桌面小部件
const widgets = ref([
  {
    id: 1,
    title: '天气',
    icon: '🌤️',
    type: 'weather',
    size: 'medium',
    data: {
      temp: '25°C',
      condition: '晴天',
      high: '28°C',
      low: '18°C',
      location: '北京'
    }
  },
  {
    id: 2,
    title: '日历',
    icon: '📅',
    type: 'calendar',
    size: 'small',
    data: {
      date: new Date().getDate(),
      month: new Date().toLocaleDateString('zh-CN', { month: 'short' }),
      weekday: new Date().toLocaleDateString('zh-CN', { weekday: 'short' })
    }
  },
  {
    id: 3,
    title: '待办事项',
    icon: '✓',
    type: 'todo',
    size: 'large',
    data: {
      tasks: [
        { text: '完成项目报告', done: false },
        { text: '团队会议 3:00 PM', done: false },
        { text: '代码审查', done: true }
      ]
    }
  },
  {
    id: 4,
    title: '快速访问',
    icon: '⚡',
    type: 'shortcuts',
    size: 'small',
    data: {
      items: ['文档', '下载', '照片']
    }
  },
  {
    id: 5,
    title: '音乐',
    icon: '🎵',
    type: 'music',
    size: 'medium',
    data: {
      song: 'Blinding Lights',
      artist: 'The Weeknd',
      isPlaying: false
    }
  },
  {
    id: 6,
    title: '系统状态',
    icon: '📊',
    type: 'system',
    size: 'small',
    data: {
      cpu: '45%',
      memory: '62%',
      storage: '78%'
    }
  }
])

const router = useRouter()

// 返回主页
const goBackHome = () => {
  router.push('/')
}

// 小部件点击处理
const handleWidgetClick = (widget: any) => {
  console.log('Widget clicked:', widget.title)
}

// 获取小部件样式类
const getWidgetClass = (size: string) => {
  switch (size) {
    case 'small':
      return 'widget-small'
    case 'medium':
      return 'widget-medium'
    case 'large':
      return 'widget-large'
    default:
      return 'widget-medium'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black p-6 md:p-8">
    <div class="max-w-7xl mx-auto">

      <!-- 顶部导航栏 -->
      <div class="flex items-center justify-between mb-8 animate-fade-in">
        <button @click="goBackHome" class="back-button group">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <h1 class="text-2xl font-bold text-white">小部件</h1>

        <button class="add-button">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <!-- 小部件网格 - 响应式瀑布流布局 -->
      <div class="widgets-grid">
        <!-- 天气小部件 -->
        <div v-for="(widget, index) in widgets" :key="widget.id" :class="['widget', getWidgetClass(widget.size)]"
          :style="{ animationDelay: `${index * 0.08}s` }" @click="handleWidgetClick(widget)">

          <!-- 天气 -->
          <template v-if="widget.type === 'weather'">
            <div class="widget-header">
              <span class="widget-icon">{{ widget.icon }}</span>
              <span class="widget-title">{{ widget.data.location }}</span>
            </div>
            <div class="widget-content">
              <div class="text-5xl font-light text-white mb-2">{{ widget.data.temp }}</div>
              <div class="text-lg text-white/80 mb-4">{{ widget.data.condition }}</div>
              <div class="flex justify-between text-sm text-white/60">
                <span>高 {{ widget.data.high }}</span>
                <span>低 {{ widget.data.low }}</span>
              </div>
            </div>
          </template>

          <!-- 日历 -->
          <template v-else-if="widget.type === 'calendar'">
            <div class="widget-header">
              <span class="widget-title">{{ widget.data.month }}</span>
            </div>
            <div class="widget-content text-center">
              <div class="text-6xl font-bold text-white mb-1">{{ widget.data.date }}</div>
              <div class="text-lg text-white/70">{{ widget.data.weekday }}</div>
            </div>
          </template>

          <!-- 待办事项 -->
          <template v-else-if="widget.type === 'todo'">
            <div class="widget-header">
              <span class="widget-icon">{{ widget.icon }}</span>
              <span class="widget-title">{{ widget.title }}</span>
            </div>
            <div class="widget-content space-y-3">
              <div v-for="(task, idx) in widget.data.tasks" :key="idx" class="todo-item">
                <div class="todo-checkbox" :class="{ 'todo-checked': task.done }">
                  <svg v-if="task.done" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <span :class="['todo-text', { 'line-through opacity-50': task.done }]">{{ task.text }}</span>
              </div>
            </div>
          </template>

          <!-- 快速访问 -->
          <template v-else-if="widget.type === 'shortcuts'">
            <div class="widget-header">
              <span class="widget-icon">{{ widget.icon }}</span>
              <span class="widget-title">{{ widget.title }}</span>
            </div>
            <div class="widget-content space-y-2">
              <div v-for="(item, idx) in widget.data.items" :key="idx" class="shortcut-item">
                <span>📁</span>
                <span class="ml-2">{{ item }}</span>
              </div>
            </div>
          </template>

          <!-- 音乐 -->
          <template v-else-if="widget.type === 'music'">
            <div class="widget-header">
              <span class="widget-icon">{{ widget.icon }}</span>
              <span class="widget-title">正在播放</span>
            </div>
            <div class="widget-content">
              <div class="text-xl font-semibold text-white mb-1">{{ widget.data.song }}</div>
              <div class="text-sm text-white/60 mb-4">{{ widget.data.artist }}</div>
              <div class="flex items-center gap-4 justify-center">
                <button class="music-control">⏮</button>
                <button class="music-control music-control-large">{{ widget.data.isPlaying ? '⏸' : '▶' }}</button>
                <button class="music-control">⏭</button>
              </div>
            </div>
          </template>

          <!-- 系统状态 -->
          <template v-else-if="widget.type === 'system'">
            <div class="widget-header">
              <span class="widget-icon">{{ widget.icon }}</span>
              <span class="widget-title">{{ widget.title }}</span>
            </div>
            <div class="widget-content space-y-3">
              <div class="system-stat">
                <span class="text-white/70 text-sm">CPU</span>
                <div class="stat-bar">
                  <div class="stat-fill bg-gradient-to-r from-blue-500 to-cyan-500" style="width: 45%"></div>
                </div>
                <span class="text-white text-sm font-semibold">{{ widget.data.cpu }}</span>
              </div>
              <div class="system-stat">
                <span class="text-white/70 text-sm">内存</span>
                <div class="stat-bar">
                  <div class="stat-fill bg-gradient-to-r from-purple-500 to-pink-500" style="width: 62%"></div>
                </div>
                <span class="text-white text-sm font-semibold">{{ widget.data.memory }}</span>
              </div>
              <div class="system-stat">
                <span class="text-white/70 text-sm">存储</span>
                <div class="stat-bar">
                  <div class="stat-fill bg-gradient-to-r from-orange-500 to-red-500" style="width: 78%"></div>
                </div>
                <span class="text-white text-sm font-semibold">{{ widget.data.storage }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 顶部按钮样式 */
.back-button,
.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover,
.add-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(0, 240, 255, 0.5);
  transform: scale(1.05);
}

.back-button:active,
.add-button:active {
  transform: scale(0.95);
}

/* 小部件网格布局 */
.widgets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  grid-auto-rows: minmax(140px, auto);
}

/* 小部件基础样式 */
.widget {
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: fadeIn 0.5s ease-out backwards;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.widget::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.3), rgba(176, 0, 255, 0.3));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.widget:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(0, 240, 255, 0.4);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 48px rgba(0, 240, 255, 0.2),
    0 0 0 1px rgba(0, 240, 255, 0.1) inset;
}

.widget:hover::before {
  opacity: 1;
}

.widget:active {
  transform: translateY(-2px) scale(1.01);
}

/* 小部件尺寸 */
.widget-small {
  grid-row: span 1;
}

.widget-medium {
  grid-row: span 2;
}

.widget-large {
  grid-row: span 3;
}

/* 小部件头部 */
.widget-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.widget-icon {
  font-size: 20px;
}

.widget-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.widget-content {
  position: relative;
  z-index: 1;
}

/* 待办事项样式 */
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}

.todo-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.todo-checked {
  background: linear-gradient(135deg, #00f0ff, #0080ff);
  border-color: #00f0ff;
}

.todo-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  flex: 1;
}

/* 快速访问样式 */
.shortcut-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  transition: all 0.2s ease;
}

.shortcut-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

/* 音乐控制按钮 */
.music-control {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.music-control:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(0, 240, 255, 0.5);
  transform: scale(1.1);
}

.music-control-large {
  width: 48px;
  height: 48px;
  font-size: 18px;
  background: linear-gradient(135deg, #00f0ff, #0080ff);
  border: none;
}

.music-control-large:hover {
  box-shadow: 0 4px 16px rgba(0, 240, 255, 0.4);
}

/* 系统状态样式 */
.system-stat {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .widgets-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 12px;
  }

  .widget {
    padding: 16px;
    border-radius: 20px;
  }

  .widget-medium,
  .widget-large {
    grid-row: span 2;
  }
}

@media (max-width: 640px) {
  .widgets-grid {
    grid-template-columns: 1fr;
  }
}
</style>