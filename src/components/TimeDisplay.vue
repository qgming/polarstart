<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const now = ref(new Date())
let timer: ReturnType<typeof window.setInterval> | null = null

const timeText = computed(() => now.value.toLocaleTimeString('zh-CN', {
  hour: '2-digit',
  minute: '2-digit'
}))

const dateText = computed(() => now.value.toLocaleDateString('zh-CN', {
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}))

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="clock-block">
    <div class="clock-time">{{ timeText }}</div>
    <div class="clock-date">{{ dateText }}</div>
  </div>
</template>

<style scoped>
.clock-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  user-select: none;
}

.clock-time {
  margin: 0;
  font-family: "Cascadia Mono", "SFMono-Regular", "SF Mono", "JetBrains Mono", "IBM Plex Mono", "Roboto Mono", "Consolas", "Liberation Mono", monospace;
  font-size: clamp(64px, 12vw, 120px);
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1, "zero" 1;
  letter-spacing: 0.02em;
  line-height: 0.95;
  color: #f7fbff;
  text-shadow: 0 16px 48px rgba(0, 0, 0, 0.28);
}

.clock-date {
  margin: 0;
  font-size: clamp(15px, 2.5vw, 20px);
  font-weight: 600;
  color: rgba(232, 242, 255, 0.8);
}
</style>
