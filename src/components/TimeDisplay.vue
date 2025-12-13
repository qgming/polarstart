<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const currentDate = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  currentDate.value = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })
}

let timer: number

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="time-display">
    <!-- 时间 -->
    <div class="time-text">
      {{ currentTime }}
    </div>

    <!-- 日期 -->
    <div class="date-text">
      {{ currentDate }}
    </div>
  </div>
</template>

<style scoped>
/* 时间显示容器 */
.time-display {
  text-align: center;
  user-select: none;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* 时间文字 */
.time-text {
  font-size: 6rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
  line-height: 1;
  text-shadow:
    0 0 30px rgba(255, 255, 255, 0.4),
    0 0 60px rgba(255, 255, 255, 0.2),
    0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all var(--duration-smooth) var(--ease-smooth);
  animation: timeGlow 3s ease-in-out infinite;
}

.time-text:hover {
  text-shadow:
    0 0 40px rgba(0, 240, 255, 0.6),
    0 0 80px rgba(0, 240, 255, 0.4),
    0 4px 24px rgba(0, 0, 0, 0.4);
  transform: scale(1.02);
}

/* 日期文字 */
.date-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.1em;
  text-shadow:
    0 2px 16px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 255, 255, 0.2);
  transition: all var(--duration-normal) var(--ease-smooth);
}

.time-display:hover .date-text {
  color: rgba(255, 255, 255, 1);
  text-shadow:
    0 2px 20px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(255, 255, 255, 0.3);
}

/* 发光动画 */
@keyframes timeGlow {
  0%, 100% {
    text-shadow:
      0 0 30px rgba(255, 255, 255, 0.4),
      0 0 60px rgba(255, 255, 255, 0.2),
      0 4px 20px rgba(0, 0, 0, 0.3);
  }
  50% {
    text-shadow:
      0 0 40px rgba(255, 255, 255, 0.5),
      0 0 80px rgba(255, 255, 255, 0.3),
      0 4px 24px rgba(0, 0, 0, 0.3);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .time-text {
    font-size: 5rem;
  }

  .date-text {
    font-size: 1.375rem;
  }
}

@media (max-width: 768px) {
  .time-text {
    font-size: 4rem;
  }

  .date-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 640px) {
  .time-text {
    font-size: 3.5rem;
  }

  .date-text {
    font-size: 1.125rem;
    letter-spacing: 0.05em;
  }
}

@media (max-width: 480px) {
  .time-text {
    font-size: 3rem;
  }

  .date-text {
    font-size: 1rem;
  }
}
</style>