<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import DockBar from '@/components/DockBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import TimeDisplay from '@/components/TimeDisplay.vue'

const bingWallpaper = 'https://bing.ee123.net/img/'
const backgroundLoaded = ref(false)

const backgroundStyle = computed(() => ({
  backgroundImage: backgroundLoaded.value ? `url(${bingWallpaper})` : 'none'
}))

onMounted(() => {
  const image = new Image()
  image.onload = () => {
    backgroundLoaded.value = true
  }
  image.src = bingWallpaper
})
</script>

<template>
  <main class="home-shell">
    <div class="home-background" :class="{ loaded: backgroundLoaded }" :style="backgroundStyle"></div>
    <div class="home-backdrop"></div>
    <div class="home-grid"></div>

    <section class="hero-layout">
      <header class="hero-copy">
        <p class="hero-kicker">PolarStart</p>
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
  display: grid;
  place-items: center;
  padding: clamp(32px, 8vw, 72px) clamp(20px, 4vw, 48px) 144px;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
}

.hero-kicker {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(232, 242, 255, 0.72);
}

.hero-search {
  width: min(100%, 760px);
  margin-top: 28px;
}

@media (max-width: 640px) {
  .hero-layout {
    padding-bottom: 132px;
  }

  .hero-search {
    width: 100%;
    margin-top: 22px;
  }
}
</style>
