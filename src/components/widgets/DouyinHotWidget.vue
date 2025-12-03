<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface DouyinHotItem {
  title: string
  hot_value: number
  cover: string
  link: string
  event_time: string
  event_time_at: number
  active_time: string
  active_time_at: number
}

interface DouyinResponse {
  code: number
  message: string
  data: DouyinHotItem[]
}

const hotList = ref<DouyinHotItem[]>([])
const loading = ref(true)
const error = ref('')

const CACHE_KEY = 'douyin_hot_cache'
const CACHE_TIMESTAMP_KEY = 'douyin_hot_timestamp'
const CACHE_DURATION = 60 * 60 * 1000 // 1小时（毫秒）

// 格式化热度值
const formatHotValue = (value: number): string => {
  if (value >= 100000000) {
    return (value / 100000000).toFixed(1) + '亿'
  } else if (value >= 10000) {
    return (value / 10000).toFixed(1) + '万'
  }
  return value.toString()
}

// 检查缓存是否有效
const isCacheValid = (): boolean => {
  const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
  if (!timestamp) return false

  const now = Date.now()
  const cacheTime = parseInt(timestamp, 10)
  return now - cacheTime < CACHE_DURATION
}

// 从缓存加载数据
const loadFromCache = (): boolean => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached && isCacheValid()) {
      hotList.value = JSON.parse(cached)
      return true
    }
  } catch (err) {
    console.error('读取缓存失败:', err)
  }
  return false
}

// 保存数据到缓存
const saveToCache = (data: DouyinHotItem[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
  } catch (err) {
    console.error('保存缓存失败:', err)
  }
}

// 获取抖音热搜数据
const fetchDouyinHot = async (forceRefresh = false) => {
  // 如果不是强制刷新，先尝试从缓存加载
  if (!forceRefresh && loadFromCache()) {
    loading.value = false
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await fetch('https://60s.viki.moe/v2/douyin')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: DouyinResponse = await response.json()

    if (data.code === 200 && data.data) {
      // 只取前30条
      const newData = data.data.slice(0, 30)
      hotList.value = newData
      saveToCache(newData)
    } else {
      throw new Error(data.message || '获取数据失败')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '网络错误，请稍后重试'
    console.error('获取抖音热搜失败:', err)
  } finally {
    loading.value = false
  }
}

// 打开链接
const openLink = (link: string) => {
  window.open(link, '_blank')
}

// 刷新数据（强制刷新）
const refresh = () => {
  fetchDouyinHot(true)
}

// 组件挂载时获取数据
onMounted(() => {
  fetchDouyinHot()
})
</script>

<template>
  <div class="w-[280px] h-[280px] rounded-xl font-sans flex flex-col overflow-hidden douyin-card"
    style="padding: 12px; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);">
    <!-- 头部区域 -->
    <div class="flex-shrink-0" style="margin-bottom: 12px">
      <div class="flex items-center justify-between">
        <div class="flex items-center" style="gap: 8px">
          <div class="douyin-logo">
            <span class="text-sm font-bold douyin-gradient-text">抖音热搜</span>
          </div>
        </div>

        <button @click="refresh" :disabled="loading" title="刷新"
          class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center select-none hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed douyin-btn"
          style="background: linear-gradient(135deg, #00F2FE 0%, #FF00E5 100%); color: white; border: none; box-shadow: 0 2px 8px rgba(0, 242, 254, 0.3);">
          <span :class="{ 'animate-spin': loading }" class="text-base">↻</span>
        </button>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden min-h-0 douyin-scrollbar"
      style="margin: 0 -4px; padding: 0 4px">
      <!-- 加载中 -->
      <div v-if="loading" class="flex flex-col items-center justify-center h-full text-xs">
        <div class="w-8 h-8 border-3 rounded-full animate-spin douyin-loader"
          style="margin-bottom: 10px; border: 3px solid rgba(255, 255, 255, 0.1); border-top-color: #00F2FE;"></div>
        <p class="font-medium" style="color: rgba(255, 255, 255, 0.6);">加载中...</p>
      </div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="flex flex-col items-center justify-center h-full text-xs text-center"
        style="color: #FF00E5; padding: 0 10px">
        <p class="font-medium" style="margin-bottom: 10px">{{ error }}</p>
        <button @click="refresh"
          class="text-xs font-medium rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          style="padding: 8px 16px; background: linear-gradient(135deg, #00F2FE 0%, #FF00E5 100%); color: white; border: none; box-shadow: 0 2px 8px rgba(0, 242, 254, 0.3);">
          重试
        </button>
      </div>

      <!-- 热搜列表 -->
      <div v-else class="flex flex-col" style="gap: 6px">
        <button v-for="(item, index) in hotList" :key="index" @click="openLink(item.link)"
          class="douyin-hot-item flex items-center rounded-lg cursor-pointer transition-all duration-300 text-left select-none group"
          style="gap: 10px; padding: 10px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <div
            class="flex-shrink-0 flex items-center justify-center rounded-md text-[11px] font-bold transition-all duration-300"
            :class="index < 3 ? 'douyin-rank-top' : 'douyin-rank-normal'" :style="{
              width: '24px',
              height: '24px',
            }">
            {{ index + 1 }}
          </div>

          <div class="flex-1 min-w-0 overflow-hidden">
            <div
              class="text-[13px] font-medium overflow-hidden text-ellipsis whitespace-nowrap leading-tight transition-all duration-300"
              style="color: #ffffff;">
              {{ item.title }}
            </div>
            <div class="text-[11px] mt-0.5 douyin-hot-value">
              🔥 {{ formatHotValue(item.hot_value) }}
            </div>
          </div>

          <div class="douyin-arrow opacity-0 group-hover:opacity-100 transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="url(#gradient)" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
              <defs>
                <linearGradient id="gradient" x1="6" y1="3" x2="11" y2="13" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#00F2FE" />
                  <stop offset="1" stop-color="#FF00E5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 抖音卡片样式 */
.douyin-card {
  /* 移除外侧阴影和边框 */
}

/* 抖音渐变文字 */
.douyin-gradient-text {
  background: linear-gradient(135deg, #00F2FE 0%, #FF00E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 抖音按钮悬停效果 */
.douyin-btn:hover {
  box-shadow: 0 4px 16px rgba(0, 242, 254, 0.5);
}

/* 排名徽章 - 前三名 */
.douyin-rank-top {
  background: linear-gradient(135deg, #00F2FE 0%, #FF00E5 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 242, 254, 0.4);
  animation: pulse-glow 2s ease-in-out infinite;
}

/* 排名徽章 - 普通 */
.douyin-rank-normal {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 热度值渐变色 */
.douyin-hot-value {
  background: linear-gradient(90deg, #00F2FE 0%, #FF00E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}

/* 热搜项悬停效果 */
.douyin-hot-item:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(0, 242, 254, 0.3) !important;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 242, 254, 0.2);
}

.douyin-hot-item:active {
  transform: translateX(2px) scale(0.98);
}

/* 箭头图标 */
.douyin-arrow {
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.douyin-hot-item:hover .douyin-arrow {
  transform: translateX(4px);
}

/* 脉冲发光动画 */
@keyframes pulse-glow {

  0%,
  100% {
    box-shadow: 0 2px 8px rgba(0, 242, 254, 0.4);
  }

  50% {
    box-shadow: 0 2px 16px rgba(255, 0, 229, 0.6);
  }
}

/* 加载动画 */
.douyin-loader {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 抖音风格滚动条 */
.douyin-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.douyin-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  margin: 4px 0;
  border-radius: 10px;
}

.douyin-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #00F2FE 0%, #FF00E5 100%);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.douyin-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #00F2FE 0%, #FF00E5 80%);
  box-shadow: 0 0 8px rgba(0, 242, 254, 0.5);
}

/* Firefox 滚动条样式 */
.douyin-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #00F2FE rgba(255, 255, 255, 0.05);
}
</style>