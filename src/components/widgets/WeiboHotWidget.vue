<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface WeiboHotItem {
  title: string
  hot_value: number
  link: string
}

interface WeiboResponse {
  code: number
  message: string
  data: WeiboHotItem[]
}

const hotList = ref<WeiboHotItem[]>([])
const loading = ref(true)
const error = ref('')

const CACHE_KEY = 'weibo_hot_cache'
const CACHE_TIMESTAMP_KEY = 'weibo_hot_timestamp'
const CACHE_DURATION = 60 * 60 * 1000 // 1小时（毫秒）

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
const saveToCache = (data: WeiboHotItem[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
  } catch (err) {
    console.error('保存缓存失败:', err)
  }
}

// 获取微博热搜数据
const fetchWeiboHot = async (forceRefresh = false) => {
  // 如果不是强制刷新，先尝试从缓存加载
  if (!forceRefresh && loadFromCache()) {
    loading.value = false
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await fetch('https://60s.viki.moe/v2/weibo')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: WeiboResponse = await response.json()

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
    console.error('获取微博热搜失败:', err)
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
  fetchWeiboHot(true)
}

// 组件挂载时获取数据
onMounted(() => {
  fetchWeiboHot()
})
</script>
<template>
  <div class="w-[280px] h-[280px] bg-white rounded-xl font-sans flex flex-col overflow-hidden border border-[#e6e6e6]"
    style="padding: 12px">
    <!-- 头部区域 -->
    <div class="flex-shrink-0" style="margin-bottom: 12px">
      <div class="flex items-center justify-between">
        <div class="flex items-center" style="gap: 8px">
          <span class="text-sm font-semibold" style="color: #333">微博热搜🔥</span>
        </div>

        <button @click="refresh" :disabled="loading" title="刷新"
          class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center select-none hover:opacity-80 active:opacity-60 disabled:opacity-40 disabled:cursor-not-allowed"
          style="background-color: #FF8200; color: white; border: none">
          <span :class="{ 'animate-spin': loading }" class="text-base">↻</span>
        </button>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden min-h-0 modern-scrollbar"
      style="margin: 0 -4px; padding: 0 4px">
      <!-- 加载中 -->
      <div v-if="loading" class="flex flex-col items-center justify-center h-full text-gray-400 text-xs">
        <div class="w-8 h-8 border-3 border-gray-200 rounded-full animate-spin"
          style="border-top-color: #FF8200; margin-bottom: 10px"></div>
        <p class="font-medium">加载中...</p>
      </div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="flex flex-col items-center justify-center h-full text-xs text-center"
        style="color: #f44336; padding: 0 10px">
        <p class="font-medium" style="margin-bottom: 10px">{{ error }}</p>
        <button @click="refresh"
          class="text-xs font-medium rounded-lg cursor-pointer transition-all duration-200 hover:opacity-90 active:opacity-70"
          style="padding: 8px 16px; background-color: #FF8200; color: white; border: none">
          重试
        </button>
      </div>

      <!-- 热搜列表 -->
      <div v-else class="flex flex-col" style="gap: 8px">
        <button v-for="(item, index) in hotList" :key="index" @click="openLink(item.link)"
          class="flex items-center rounded-lg cursor-pointer transition-all duration-200 text-left select-none hover:bg-[#fff5f0] group"
          style="gap: 10px; padding: 10px; background-color: #fafafa; border: none">
          <div class="flex-shrink-0 flex items-center justify-center rounded-md text-[11px] font-bold" :style="{
            width: '22px',
            height: '22px',
            backgroundColor: index < 3 ? '#FF8200' : '#e0e0e0',
            color: index < 3 ? 'white' : '#666'
          }">
            {{ index + 1 }}
          </div>

          <div class="flex-1 min-w-0 overflow-hidden">
            <div class="text-[13px] font-medium overflow-hidden text-ellipsis whitespace-nowrap leading-tight"
              style="color: #333">
              {{ item.title }}
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 简洁滚动条样式 */
.modern-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.modern-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px 0;
}

.modern-scrollbar::-webkit-scrollbar-thumb {
  background: #FF8200;
  border-radius: 10px;
  transition: background 0.2s ease;
}

.modern-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #e67300;
}

/* Firefox 滚动条样式 */
.modern-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #FF8200 transparent;
}
</style>