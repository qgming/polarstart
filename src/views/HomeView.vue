<script setup lang="ts">
import DockBar from '@/components/DockBar.vue'
import SearchBar from '@/components/SearchBar.vue'
</script>

<template>
  <main class="home-shell">
    <div class="home-backdrop"></div>
    <div class="home-grid"></div>

    <section class="hero-layout">
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
  background: var(--app-bg);
  color: var(--text-primary);
  transition: background 180ms ease, color 180ms ease;
}

.home-backdrop,
.home-grid {
  position: absolute;
  inset: 0;
}

.home-backdrop {
  background: var(--app-bg);
}

.home-grid {
  display: none;
}

.hero-layout {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: clamp(128px, 19vh, 176px) clamp(20px, 4vw, 48px) 144px;
}

.hero-search {
  width: min(100%, 880px);
  margin-top: 0;
}

@media (max-width: 640px) {
  .hero-layout {
    padding-top: 104px;
    padding-bottom: 132px;
  }

  .hero-search {
    width: 100%;
    margin-top: 22px;
  }
}
</style>
