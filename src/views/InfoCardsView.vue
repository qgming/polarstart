<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Left, Setting } from '@icon-park/vue-next'
import CalendarWidget from '@/components/widgets/CalendarWidget.vue'
import WeiboHotWidget from '@/components/widgets/WeiboHotWidget.vue'
import DouyinHotWidget from '@/components/widgets/DouyinHotWidget.vue'
import MoyuWidget from '@/components/widgets/MoyuWidget.vue'
import AnswerBookWidget from '@/components/widgets/AnswerBookWidget.vue'

const router = useRouter()

// 小部件配置
const widgets = ref([
  {
    id: 1,
    type: 'calendar',
    title: '日历',
    icon: '📅'
  },
  {
    id: 2,
    type: 'moyu',
    title: '摸鱼日报',
    icon: '🐟'
  },
  {
    id: 3,
    type: 'weibo',
    title: '微博热搜',
    icon: '🔥'
  },
  {
    id: 4,
    type: 'douyin',
    title: '抖音热搜',
    icon: '🎵'
  },
  {
    id: 5,
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
  <div class="view-container">
    <!-- 渐变背景层 -->
    <div class="background-gradient"></div>

    <!-- 返回按钮 - 左上角 -->
    <div class="nav-button nav-button-left">
      <button @click="goBackHome" class="button-glass hover-lift" title="返回主页">
        <Left theme="outline" size="20" fill="currentColor" />
      </button>
    </div>

    <!-- 设置按钮 - 右上角 -->
    <div class="nav-button nav-button-right">
      <button class="button-glass hover-lift" title="设置">
        <Setting theme="outline" size="20" fill="currentColor" />
      </button>
    </div>

    <!-- 小组件内容区域 -->
    <div class="content-wrapper">
      <!-- 小组件网格 -->
      <div class="widgets-grid">
        <div
          v-for="(widget, index) in widgets"
          :key="widget.id"
          class="widget-wrapper"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- 日历小组件 -->
          <CalendarWidget v-if="widget.type === 'calendar'" />
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
/* 视图容器 */
.view-container {
  position: relative;
  min-height: 100vh;
  background: #0f0f14;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 渐变背景层 */
.background-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 20% 30%,
    rgba(99, 102, 241, 0.08) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 80% 70%,
    rgba(236, 72, 153, 0.08) 0%,
    transparent 50%
  ),
  linear-gradient(
    to bottom,
    rgba(15, 15, 20, 0.95) 0%,
    rgba(15, 15, 20, 0.98) 100%
  );
  pointer-events: none;
  z-index: 0;
}

/* 导航按钮位置 */
.nav-button {
  position: absolute;
  top: 1.5rem;
  z-index: 10;
  animation: fadeInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-button-left {
  left: 1.5rem;
}

.nav-button-right {
  right: 1.5rem;
}

/* 玻璃态按钮 */
.button-glass {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.75rem;
  background: rgba(45, 45, 50, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: rgba(224, 224, 224, 0.9);
  cursor: pointer;
  border: 1px solid var(--border-glass-subtle);
  box-shadow: var(--shadow-glass-sm);
  transition: all var(--duration-normal) var(--ease-spring);
}

.button-glass:hover {
  background: rgba(60, 60, 65, 0.9);
  color: white;
  border-color: var(--border-glass-medium);
  box-shadow: var(--shadow-glass-md);
}

.button-glass:active {
  transform: scale(0.95);
}

/* 内容包裹器 */
.content-wrapper {
  position: relative;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 5.5rem 1rem 1.5rem 1rem;
  z-index: 1;
}

/* 小组件网格 */
.widgets-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 768px) {
  .widgets-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .widgets-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .widgets-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1536px) {
  .widgets-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* 小组件包裹器 */
.widget-wrapper {
  display: flex;
  justify-content: center;
  animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .nav-button {
    top: 1rem;
  }

  .nav-button-left {
    left: 1rem;
  }

  .nav-button-right {
    right: 1rem;
  }

  .content-wrapper {
    padding: 4.5rem 0.75rem 1rem 0.75rem;
  }

  .widgets-grid {
    gap: 0.75rem;
  }
}
</style>