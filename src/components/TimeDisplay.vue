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
  <div class="text-center space-y-2">
    <div
      class="text-8xl md:text-9xl font-bold text-white tracking-wider drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_50px_rgba(0,240,255,0.4)] transition-all duration-500">
      {{ currentTime }}
    </div>
    <div class="text-xl md:text-2xl text-white/90 font-semibold tracking-widest drop-shadow-lg">
      {{ currentDate }}
    </div>
  </div>
</template>

<style scoped>
/* 所有样式已使用 Tailwind CSS */
</style>