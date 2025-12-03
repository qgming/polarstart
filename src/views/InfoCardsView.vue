<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Left, Setting } from '@icon-park/vue-next'
import CalendarWidget from '@/components/widgets/CalendarWidget.vue'
import WeiboHotWidget from '@/components/widgets/WeiboHotWidget.vue'
import DouyinHotWidget from '@/components/widgets/DouyinHotWidget.vue'
import MoyuWidget from '@/components/widgets/MoyuWidget.vue'
import AnswerBookWidget from '@/components/widgets/AnswerBookWidget.vue'
import WeatherWidget from '@/components/widgets/WeatherWidget.vue'

const router = useRouter()

// 小部件配置
const widgets = ref([
  {
    id: 1,
    type: 'weather',
    title: '实时天气',
    icon: '🌤️'
  },
  {
    id: 2,
    type: 'calendar',
    title: '日历',
    icon: '📅'
  },
  {
    id: 3,
    type: 'moyu',
    title: '摸鱼日报',
    icon: '🐟'
  },

  {
    id: 4,
    type: 'weibo',
    title: '微博热搜',
    icon: '🔥'
  },
  {
    id: 5,
    type: 'douyin',
    title: '抖音热搜',
    icon: '🎵'
  },
  {
    id: 6,
    type: 'answer',
    title: '答案之书',
    icon: '📖'
  }
])

// 返回主页
const goBackHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-[#1e1e1e] overflow-y-auto relative">
    <!-- 返回按钮 - 左上角 -->
    <div class="absolute z-10 animate-[fadeInDown_0.6s_ease-out]" style="top: 24px; left: 24px;">
      <button @click="goBackHome"
        class="flex items-center justify-center w-10 h-10 border-none rounded-lg bg-[#2d2d2d] text-[#e0e0e0] cursor-pointer transition-all duration-200 hover:bg-[#3d3d3d] hover:text-white active:translate-y-0"
        title="返回主页">
        <Left theme="outline" size="20" fill="#e0e0e0" />
      </button>
    </div>

    <!-- 设置按钮 - 右上角 -->
    <div class="absolute z-10 animate-[fadeInDown_0.6s_ease-out]" style="top: 24px; right: 24px;">
      <button
        class="flex items-center justify-center w-10 h-10 border-none rounded-lg bg-[#2d2d2d] text-[#e0e0e0] cursor-pointer transition-all duration-200 hover:bg-[#3d3d3d] hover:text-white active:translate-y-0"
        title="设置">
        <Setting theme="outline" size="20" fill="#e0e0e0" />
      </button>
    </div>
    <!-- 小组件内容区域 -->
    <div class="w-full mx-auto" style="padding: 88px 16px 24px 16px; max-width: 1800px;">

      <!-- 小组件网格 -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 animate-[fadeIn_0.6s_ease-out]"
        style="gap: 16px;">
        <div v-for="(widget, index) in widgets" :key="widget.id"
          class="flex justify-center animate-[fadeInUp_0.5s_ease-out_backwards]"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <!-- 日历小组件 -->
          <CalendarWidget v-if="widget.type === 'calendar'" />
          <!-- 天气小组件 -->
          <WeatherWidget v-else-if="widget.type === 'weather'" />
          <!-- 微博热搜小组件 -->
          <WeiboHotWidget v-else-if="widget.type === 'weibo'" />
          <!-- 抖音热搜小组件 -->
          <DouyinHotWidget v-else-if="widget.type === 'douyin'" />
          <!-- 摸鱼日报小组件 -->
          <MoyuWidget v-else-if="widget.type === 'moyu'" />
          <!-- 答案之书小组件 -->
          <AnswerBookWidget v-else-if="widget.type === 'answer'" />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 动画定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>