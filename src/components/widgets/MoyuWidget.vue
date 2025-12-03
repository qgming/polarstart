<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface LunarDate {
  year: number
  month: number
  day: number
  yearCN: string
  monthCN: string
  dayCN: string
  isLeapMonth: boolean
  yearGanZhi: string
  monthGanZhi: string
  dayGanZhi: string
  zodiac: string
}

interface DateInfo {
  gregorian: string
  weekday: string
  dayOfWeek: number
  lunar: LunarDate
}

interface TodayInfo {
  isWeekend: boolean
  isHoliday: boolean
  isWorkday: boolean
  holidayName: string | null
  solarTerm: string | null
  lunarFestivals: string[]
}

interface ProgressInfo {
  passed: number
  total: number
  remaining: number
  percentage: number
}

interface Progress {
  week: ProgressInfo
  month: ProgressInfo
  year: ProgressInfo
}

interface Holiday {
  name: string
  date: string
  until: number
  duration: number
  workdays: string[]
}

interface Weekend {
  date: string
  weekday: string
  daysUntil: number
}

interface Countdown {
  toWeekEnd: number
  toFriday: number
  toMonthEnd: number
  toYearEnd: number
}

interface MoyuData {
  date: DateInfo
  today: TodayInfo
  progress: Progress
  currentHoliday: Holiday | null
  nextHoliday: Holiday
  nextWeekend: Weekend
  countdown: Countdown
  moyuQuote: string
}

interface MoyuResponse {
  code: number
  message: string
  data: MoyuData
}

const moyuData = ref<MoyuData | null>(null)
const loading = ref(true)
const error = ref('')

const CACHE_KEY = 'moyu_cache'
const CACHE_DATE_KEY = 'moyu_cache_date'

// 检查缓存是否有效（每天更新一次）
const isCacheValid = (): boolean => {
  const cachedDate = localStorage.getItem(CACHE_DATE_KEY)
  if (!cachedDate) return false

  const today = new Date().toDateString()
  return cachedDate === today
}

// 从缓存加载数据
const loadFromCache = (): boolean => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached && isCacheValid()) {
      moyuData.value = JSON.parse(cached)
      return true
    }
  } catch (err) {
    console.error('读取缓存失败:', err)
  }
  return false
}

// 保存数据到缓存
const saveToCache = (data: MoyuData) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(CACHE_DATE_KEY, new Date().toDateString())
  } catch (err) {
    console.error('保存缓存失败:', err)
  }
}

// 获取摸鱼日报数据
const fetchMoyuData = async (forceRefresh = false) => {
  // 如果不是强制刷新，先尝试从缓存加载
  if (!forceRefresh && loadFromCache()) {
    loading.value = false
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await fetch('https://60s.viki.moe/v2/moyu?encoding=json')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: MoyuResponse = await response.json()

    if (data.code === 200 && data.data) {
      moyuData.value = data.data
      saveToCache(data.data)
    } else {
      throw new Error(data.message || '获取数据失败')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '网络错误,请稍后重试'
    console.error('获取摸鱼日报失败:', err)
  } finally {
    loading.value = false
  }
}

// 刷新数据（强制刷新）
const refresh = () => {
  fetchMoyuData(true)
}

// 计算显示信息
const displayInfo = computed(() => {
  if (!moyuData.value) return null

  const { date, progress, nextHoliday, countdown } = moyuData.value

  return {
    dateText: `${date.gregorian} ${date.weekday}`,
    lunarText: `${date.lunar.yearCN}${date.lunar.zodiac}年 ${date.lunar.monthCN}${date.lunar.dayCN}`,
    weekProgress: progress.week.percentage,
    monthProgress: progress.month.percentage,
    yearProgress: progress.year.percentage,
    holidayInfo: nextHoliday ? `${nextHoliday.name} 还有 ${nextHoliday.until} 天` : '暂无假期信息',
    countdownInfo: [
      { label: '距周末', value: countdown.toWeekEnd, unit: '天' },
      { label: '距月末', value: countdown.toMonthEnd, unit: '天' },
      { label: '距年末', value: countdown.toYearEnd, unit: '天' }
    ]
  }
})

// 组件挂载时获取数据
onMounted(() => {
  fetchMoyuData()
})
</script>

<template>
  <div class="w-[280px] h-[280px] rounded-xl font-sans flex flex-col overflow-hidden moyu-card border border-[#B8956A]"
    style="padding: 12px; background: #D2B48C;">
    <!-- 头部区域 -->
    <div class="flex-shrink-0" style="margin-bottom: 12px">
      <div class="flex items-center justify-between">
        <div class="flex items-center" style="gap: 8px">
          <span class="text-sm font-bold" style="color: #8B4513;">🐟 摸鱼日报</span>
        </div>

        <button @click="refresh" :disabled="loading" title="刷新"
          class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center select-none hover:opacity-80 active:opacity-60 disabled:opacity-40 disabled:cursor-not-allowed"
          style="background: #A0826D; color: white; border: none;">
          <span :class="{ 'animate-spin': loading }" class="text-base">↻</span>
        </button>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden min-h-0 moyu-scrollbar" style="margin: 0 -4px; padding: 0 4px">
      <!-- 加载中 -->
      <div v-if="loading" class="flex flex-col items-center justify-center h-full text-xs">
        <div class="w-8 h-8 border-3 rounded-full animate-spin"
          style="margin-bottom: 10px; border: 3px solid #E5D4B5; border-top-color: #8B4513;"></div>
        <p class="font-medium" style="color: #8B4513;">加载中...</p>
      </div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="flex flex-col items-center justify-center h-full text-xs text-center"
        style="padding: 0 10px; color: #8B4513;">
        <p class="font-medium" style="margin-bottom: 10px;">{{ error }}</p>
        <button @click="refresh"
          class="text-xs font-medium rounded-lg cursor-pointer transition-all duration-200 hover:opacity-90 active:opacity-70"
          style="padding: 8px 16px; background: #A0826D; color: white; border: none;">
          重试
        </button>
      </div>

      <!-- 摸鱼信息 -->
      <div v-else-if="displayInfo" class="flex flex-col" style="gap: 10px; color: #5D4037;">
        <!-- 日期信息 -->
        <div class="moyu-section">
          <div class="text-[13px] font-semibold" style="margin-bottom: 4px; color: #6D4C41;">📅 日期</div>
          <div class="text-[12px]" style="color: #5D4037;">{{ displayInfo.dateText }}</div>
          <div class="text-[11px]" style="color: #795548; margin-top: 2px;">{{ displayInfo.lunarText }}</div>
        </div>
        <!-- 进度条 -->
        <div class="moyu-section">
          <div class="text-[13px] font-semibold" style="margin-bottom: 6px; color: #6D4C41;">⏳ 时光进度</div>

          <!-- 本周进度 -->
          <div style="margin-bottom: 6px;">
            <div class="flex items-center justify-between text-[11px]" style="margin-bottom: 3px; color: #795548;">
              <span>本周</span>
              <span>{{ displayInfo.weekProgress }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: displayInfo.weekProgress + '%' }"></div>
            </div>
          </div>

          <!-- 本月进度 -->
          <div style="margin-bottom: 6px;">
            <div class="flex items-center justify-between text-[11px]" style="margin-bottom: 3px; color: #795548;">
              <span>本月</span>
              <span>{{ displayInfo.monthProgress }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: displayInfo.monthProgress + '%' }"></div>
            </div>
          </div>

          <!-- 本年进度 -->
          <div>
            <div class="flex items-center justify-between text-[11px]" style="margin-bottom: 3px; color: #795548;">
              <span>本年</span>
              <span>{{ displayInfo.yearProgress }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: displayInfo.yearProgress + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- 假期信息 -->
        <div class="moyu-section">
          <div class="text-[13px] font-semibold" style="margin-bottom: 4px; color: #6D4C41;">🎉 假期</div>
          <div class="text-[12px]" style="color: #5D4037;">{{ displayInfo.holidayInfo }}</div>
        </div>

        <!-- 倒计时 -->
        <div class="moyu-section">
          <div class="text-[13px] font-semibold" style="margin-bottom: 6px; color: #6D4C41;">⏰ 倒计时</div>
          <div class="grid grid-cols-3" style="gap: 6px;">
            <div v-for="item in displayInfo.countdownInfo" :key="item.label" class="countdown-item">
              <div class="text-[16px] font-bold" style="color: #5D4037;">{{ item.value }}</div>
              <div class="text-[10px]" style="color: #795548;">{{ item.label }}</div>
            </div>
          </div>
        </div>

        <!-- 摸鱼语录 -->
        <div v-if="moyuData?.moyuQuote" class="moyu-section moyu-quote">
          <div class="text-[11px] italic" style="color: #5D4037; line-height: 1.5;">
            "{{ moyuData.moyuQuote }}"
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 摸鱼卡片样式 */
.moyu-card {
  /* 移除外侧阴影 */
}

/* 摸鱼区块 */
.moyu-section {
  padding: 10px;
  background: #F5DEB3;
  border-radius: 8px;
  border: 1px solid #C4A77D;
}

/* 进度条容器 */
.progress-bar {
  height: 6px;
  background: #E5D4B5;
  border-radius: 3px;
  overflow: hidden;
}

/* 进度条填充 */
.progress-fill {
  height: 100%;
  background: #A0826D;
  border-radius: 3px;
  transition: width 0.6s ease;
}

/* 倒计时项 */
.countdown-item {
  padding: 8px;
  background: #F5DEB3;
  border-radius: 6px;
  text-align: center;
  transition: all 0.2s ease;
  border: 1px solid #C4A77D;
}

.countdown-item:hover {
  background: #FFE4C4;
  transform: translateY(-2px);
}

/* 摸鱼语录 */
.moyu-quote {
  background: #F5DEB3;
  border: 1px solid #C4A77D;
}

/* 滚动条样式 */
.moyu-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.moyu-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px 0;
}

.moyu-scrollbar::-webkit-scrollbar-thumb {
  background: #A0826D;
  border-radius: 10px;
  transition: background 0.2s ease;
}

.moyu-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #8B6F47;
}

/* Firefox 滚动条样式 */
.moyu-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #A0826D transparent;
}
</style>