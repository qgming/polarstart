<script setup lang="ts">
import { ref, computed } from 'vue'
import { Calendar, Left, Right, Time } from '@icon-park/vue-next'

const currentDate = ref(new Date())

// 获取当前年月
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

// 月份名称
const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月']

// 星期名称
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 获取当前月份的天数
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

// 获取月份第一天是星期几
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

// 生成日历数据
const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const days: Array<{ date: number | null, isToday: boolean, isCurrentMonth: boolean, isWeekend: boolean }> = []

  // 添加上个月的日期（填充）
  const prevMonthDays = getDaysInMonth(year, month - 1)
  for (let i = firstDay - 1; i >= 0; i--) {
    const weekDay = (7 - i + firstDay - 1) % 7
    days.push({
      date: prevMonthDays - i,
      isToday: false,
      isCurrentMonth: false,
      isWeekend: weekDay === 0 || weekDay === 6
    })
  }

  // 添加当前月的日期
  const today = new Date()
  const isCurrentYearMonth = today.getFullYear() === year && today.getMonth() === month

  for (let i = 1; i <= daysInMonth; i++) {
    const weekDay = (firstDay + i - 1) % 7
    days.push({
      date: i,
      isToday: isCurrentYearMonth && today.getDate() === i,
      isCurrentMonth: true,
      isWeekend: weekDay === 0 || weekDay === 6
    })
  }

  // 添加下个月的日期（填充到6行）
  const remainingDays = 42 - days.length // 6行 x 7天
  for (let i = 1; i <= remainingDays; i++) {
    const weekDay = (firstDay + daysInMonth + i - 1) % 7
    days.push({
      date: i,
      isToday: false,
      isCurrentMonth: false,
      isWeekend: weekDay === 0 || weekDay === 6
    })
  }

  return days
})

// 切换月份
const changeMonth = (offset: number) => {
  const newDate = new Date(currentYear.value, currentMonth.value + offset, 1)
  currentDate.value = newDate
}

// 回到今天
const goToToday = () => {
  currentDate.value = new Date()
}
</script>

<template>
  <div class="w-[280px] h-[280px] bg-white rounded-xl font-sans flex flex-col overflow-hidden border border-[#e6e6e6]"
    style="padding: 12px">
    <!-- 头部区域 -->
    <div class="flex-shrink-0" style="margin-bottom: 12px">
      <div class="flex items-center justify-between">
        <div class="flex items-center" style="gap: 8px">
          <Calendar theme="outline" size="16" fill="#4CAF50" :strokeWidth="3" />
          <span class="text-sm font-semibold" style="color: #333">{{ monthNames[currentMonth] }} {{ currentYear
          }}</span>
        </div>

        <div class="flex items-center" style="gap: 6px">
          <button @click="changeMonth(-1)" title="上个月"
            class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center select-none hover:opacity-80 active:opacity-60"
            style="background-color: #4CAF50; color: white; border: none">
            <Left theme="filled" size="14" fill="#ffffff" />
          </button>

          <button @click="goToToday" title="回到今天"
            class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center select-none hover:opacity-80 active:opacity-60"
            style="background-color: #4CAF50; color: white; border: none">
            <Time theme="outline" size="16" fill="#ffffff" :strokeWidth="3" />
          </button>

          <button @click="changeMonth(1)" title="下个月"
            class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center select-none hover:opacity-80 active:opacity-60"
            style="background-color: #4CAF50; color: white; border: none">
            <Right theme="filled" size="14" fill="#ffffff" />
          </button>
        </div>
      </div>
    </div>

    <!-- 日历主体 -->
    <div class="flex-1 flex flex-col min-h-0">
      <!-- 星期标题 -->
      <div class="grid grid-cols-7 flex-shrink-0" style="gap: 2px; margin-bottom: 4px">
        <div v-for="(day, idx) in weekDays" :key="day" class="text-center text-[10px] font-semibold" :style="{
          color: idx === 0 || idx === 6 ? '#f44336' : '#666',
          padding: '2px 0'
        }">
          {{ day }}
        </div>
      </div>

      <!-- 日历天数网格 -->
      <div class="grid grid-cols-7 flex-1" style="gap: 2px">
        <button v-for="(day, index) in calendarDays" :key="index"
          class="flex items-center justify-center text-[11px] font-medium rounded cursor-pointer transition-all duration-200 select-none"
          :class="[
            day.isToday ? 'today-cell' : '',
            !day.isCurrentMonth ? 'other-month-cell' : 'current-month-cell',
            day.isWeekend && day.isCurrentMonth ? 'weekend-cell' : ''
          ]" :style="{
            border: 'none',
            backgroundColor: day.isToday ? '#4CAF50' : (day.isCurrentMonth ? '#fafafa' : 'transparent'),
            color: day.isToday ? 'white' : (day.isCurrentMonth ? (day.isWeekend ? '#f44336' : '#333') : '#ccc')
          }">
          {{ day.date }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 当前月份日期 */
.current-month-cell:hover {
  background-color: #e8f5e9 !important;
  transform: scale(1.05);
}

.current-month-cell:active {
  transform: scale(0.95);
}

/* 今天的日期 */
.today-cell {
  font-weight: bold !important;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
}

.today-cell:hover {
  background-color: #45a049 !important;
  transform: scale(1.05);
}

/* 其他月份日期 */
.other-month-cell {
  cursor: default;
  opacity: 0.4;
}

.other-month-cell:hover {
  background-color: transparent !important;
  transform: none;
}

/* 周末日期 */
.weekend-cell {
  font-weight: 600;
}
</style>