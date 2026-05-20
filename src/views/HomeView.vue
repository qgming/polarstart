<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import DockBar from '@/components/DockBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import TimeDisplay from '@/components/TimeDisplay.vue'

const router = useRouter()
const desktopWallpaper = 'https://bing.ee123.net/img/?size=1920x1080&imgtype=webp'
const mobileWallpaper = 'https://bing.ee123.net/img/?size=768x1280&imgtype=webp'
const backgroundLoaded = ref(false)
const backgroundUrl = ref(desktopWallpaper)
const touchStartY = ref(0)
let mobileWallpaperQuery: MediaQueryList | null = null
let loadToken = 0
let routeLocked = false

const backgroundStyle = computed(() => ({
  backgroundImage: backgroundLoaded.value ? `url(${backgroundUrl.value})` : 'none'
}))

const getWallpaperUrl = () => {
  if (typeof window === 'undefined') return desktopWallpaper
  return window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches
    ? mobileWallpaper
    : desktopWallpaper
}

const loadBackground = () => {
  const nextBackgroundUrl = getWallpaperUrl()

  if (backgroundLoaded.value && backgroundUrl.value === nextBackgroundUrl) return

  const currentToken = loadToken + 1
  loadToken = currentToken
  backgroundLoaded.value = false

  const image = new Image()
  image.onload = () => {
    if (currentToken !== loadToken) return
    backgroundUrl.value = nextBackgroundUrl
    backgroundLoaded.value = true
  }
  image.onerror = () => {
    if (currentToken !== loadToken) return
    backgroundLoaded.value = false
  }
  image.src = nextBackgroundUrl
}

const unlockRoute = () => {
  window.setTimeout(() => {
    routeLocked = false
  }, 800)
}

const goInfo = () => {
  if (routeLocked) return
  routeLocked = true
  router.push({ name: 'info' })
  unlockRoute()
}

const handleWheel = (event: WheelEvent) => {
  if (event.deltaY > 60) {
    event.preventDefault()
    goInfo()
  }
}

const handleTouchStart = (event: TouchEvent) => {
  touchStartY.value = event.touches[0]?.clientY ?? 0
}

const handleTouchEnd = (event: TouchEvent) => {
  const endY = event.changedTouches[0]?.clientY ?? touchStartY.value
  if (touchStartY.value - endY > 64) {
    goInfo()
  }
}

onMounted(() => {
  mobileWallpaperQuery = window.matchMedia('(max-width: 768px) and (orientation: portrait)')
  mobileWallpaperQuery.addEventListener('change', loadBackground)
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
  loadBackground()
})

onUnmounted(() => {
  mobileWallpaperQuery?.removeEventListener('change', loadBackground)
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>

<template>
  <main class="home-shell">
    <div class="home-background" :class="{ loaded: backgroundLoaded }" :style="backgroundStyle"></div>
    <div class="home-backdrop"></div>
    <div class="home-grid"></div>

    <section class="hero-layout">
      <header class="hero-copy">
        <TimeDisplay />
      </header>

      <div class="hero-search">
        <SearchBar />
      </div>
    </section>

    <DockBar />
  </main>
</template>

<style scoped>
.home-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #09111f;
}

.home-background,
.home-backdrop,
.home-grid {
  position: absolute;
  inset: 0;
}

.home-background {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  will-change: opacity, transform;
  opacity: 0;
  transform: scale(1.04);
  transition: opacity 600ms ease, transform 900ms ease;
}

.home-background.loaded {
  opacity: 1;
  transform: scale(1);
}

.home-backdrop {
  background:
    radial-gradient(circle at top, rgba(106, 163, 255, 0.2), transparent 35%),
    radial-gradient(circle at 80% 20%, rgba(76, 220, 196, 0.15), transparent 30%),
    linear-gradient(180deg, rgba(4, 8, 16, 0.3) 0%, rgba(4, 8, 16, 0.62) 55%, rgba(4, 8, 16, 0.84) 100%);
}

.home-grid {
  opacity: 0.18;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.72), transparent 82%);
}

.hero-layout {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(64px, 13vh, 124px) clamp(20px, 4vw, 48px) 144px;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-search {
  width: min(100%, 760px);
  margin-top: clamp(22px, 3vh, 34px);
}

@media (max-width: 640px) {
  .home-background {
    background-position: center top;
  }

  .hero-layout {
    padding-top: 72px;
    padding-bottom: 132px;
  }

  .hero-search {
    width: 100%;
    margin-top: 22px;
  }
}
</style>
