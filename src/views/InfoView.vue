<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowUp, Image, Search, Sparkles } from '@lucide/vue'

const router = useRouter()
const touchStartY = ref(0)
let routeLocked = false

const highlights = [
  {
    title: '每日壁纸',
    description: '桌面和移动端自动选择合适比例的 Bing 每日一图。',
    icon: Image
  },
  {
    title: '快速搜索',
    description: '在常用搜索引擎之间切换，保持输入和提交路径足够轻。',
    icon: Search
  },
  {
    title: '启动 Dock',
    description: '把高频入口固定在底部，用更接近桌面系统的方式抵达。',
    icon: Sparkles
  }
]

const unlockRoute = () => {
  window.setTimeout(() => {
    routeLocked = false
  }, 800)
}

const goHome = () => {
  if (routeLocked) return
  routeLocked = true
  router.push({ name: 'home' })
  unlockRoute()
}

const handleWheel = (event: WheelEvent) => {
  if (event.deltaY < -60) {
    event.preventDefault()
    goHome()
  }
}

const handleTouchStart = (event: TouchEvent) => {
  touchStartY.value = event.touches[0]?.clientY ?? 0
}

const handleTouchEnd = (event: TouchEvent) => {
  const endY = event.changedTouches[0]?.clientY ?? touchStartY.value
  if (endY - touchStartY.value > 64) {
    goHome()
  }
}

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>

<template>
  <main class="info-shell">
    <div class="info-backdrop"></div>
    <section class="info-layout">
      <button class="back-button" type="button" aria-label="返回首页" @click="goHome">
        <ArrowUp :size="18" :stroke-width="2.4" />
      </button>

      <div class="info-copy">
        <p class="info-kicker">PolarStart</p>
        <h1>安静、快速、只留下每天真正会用的入口。</h1>
        <p class="info-description">
          这个启动页把时间、搜索、每日图像和常用站点压进一个干净的首屏，让打开浏览器的第一秒更轻。
        </p>
      </div>

      <div class="info-grid">
        <article v-for="item in highlights" :key="item.title" class="info-card">
          <span class="card-icon">
            <component :is="item.icon" :size="20" :stroke-width="2.25" />
          </span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.info-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #09111f;
  color: #f4f8ff;
}

.info-backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 18%, rgba(102, 213, 196, 0.2), transparent 32%),
    radial-gradient(circle at 78% 12%, rgba(126, 161, 255, 0.22), transparent 30%),
    linear-gradient(180deg, #101827 0%, #09111f 62%, #070d18 100%);
}

.info-layout {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: min(100%, 1040px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(56px, 10vh, 96px) clamp(20px, 5vw, 48px);
}

.back-button {
  position: absolute;
  top: clamp(20px, 4vw, 36px);
  left: clamp(20px, 5vw, 48px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 14px;
  color: rgba(246, 250, 255, 0.9);
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: transform 180ms ease, background 180ms ease, color 180ms ease;
}

.back-button:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

.info-copy {
  max-width: 760px;
}

.info-kicker {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 750;
  color: rgba(167, 218, 255, 0.82);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.info-copy h1 {
  margin: 0;
  max-width: 720px;
  font-size: clamp(38px, 7vw, 76px);
  line-height: 1.02;
  font-weight: 800;
  letter-spacing: 0;
}

.info-description {
  margin: 22px 0 0;
  max-width: 640px;
  color: rgba(232, 242, 255, 0.72);
  font-size: clamp(16px, 2vw, 19px);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: clamp(34px, 6vh, 56px);
}

.info-card {
  min-height: 172px;
  padding: 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px);
}

.card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  color: #07111f;
  background: linear-gradient(135deg, #96d2ff 0%, #73e6c6 100%);
}

.info-card h2 {
  margin: 18px 0 8px;
  font-size: 17px;
}

.info-card p {
  margin: 0;
  color: rgba(232, 242, 255, 0.66);
  font-size: 14px;
}

@media (max-width: 760px) {
  .info-layout {
    justify-content: flex-start;
    padding-top: 88px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-card {
    min-height: 136px;
  }
}
</style>
