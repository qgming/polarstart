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

:global(:root[data-theme="dark"]) .home-backdrop {
  background:
    radial-gradient(circle at 18% 12%, rgba(106, 163, 255, 0.16), transparent 32%),
    radial-gradient(circle at 82% 18%, rgba(76, 220, 196, 0.14), transparent 28%),
    linear-gradient(180deg, #101827 0%, #09111f 70%, #070d18 100%);
}

:global(:root[data-theme="dark"]) .home-grid {
  opacity: 0.18;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
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
