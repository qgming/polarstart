<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Flame, Home, Moon, Sun } from '@lucide/vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const now = ref(new Date())
let timer: ReturnType<typeof window.setInterval> | null = null

const timeText = computed(() => now.value.toLocaleTimeString('zh-CN', {
  hour: '2-digit',
  minute: '2-digit'
}))

const dateText = computed(() => now.value.toLocaleDateString('zh-CN', {
  month: 'long',
  day: 'numeric',
  weekday: 'short'
}))

const navItems = [
  {
    to: '/',
    name: 'home',
    label: '首页',
    icon: Home
  },
  {
    to: '/aihot',
    name: 'aihot',
    label: 'AI 热点',
    icon: Flame
  }
]

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
  <header class="top-nav">
    <div class="nav-inner">
      <RouterLink to="/" class="brand-link" aria-label="首页">
        <img class="brand-logo" src="/favicon.svg" alt="" aria-hidden="true" />
      </RouterLink>

      <nav class="nav-links" aria-label="页面导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <a
            :href="href"
            class="nav-link"
            :class="{ active: isExactActive }"
            :aria-current="isExactActive ? 'page' : undefined"
            @click="navigate"
          >
            <component :is="item.icon" class="nav-icon" :size="16" :stroke-width="2.2" />
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
      </nav>

      <div class="nav-right">
        <div class="top-clock" aria-label="当前时间">
          <span class="top-clock-time">{{ timeText }}</span>
          <span class="top-clock-date">{{ dateText }}</span>
        </div>

        <button
          class="theme-button"
          type="button"
          :aria-label="themeStore.isDark ? '切换为浅色模式' : '切换为深色模式'"
          :title="themeStore.isDark ? '切换为浅色模式' : '切换为深色模式'"
          @click="themeStore.toggleTheme"
        >
          <Sun v-if="themeStore.isDark" :size="17" :stroke-width="2.25" aria-hidden="true" />
          <Moon v-else :size="17" :stroke-width="2.25" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  min-height: calc(52px + env(safe-area-inset-top));
  padding: env(safe-area-inset-top) clamp(16px, 3vw, 28px) 0;
  background: var(--app-bg);
  border-bottom: 1px solid var(--card-border);
  pointer-events: auto;
}

.nav-inner {
  width: min(100%, 1120px);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 52px;
  padding: 0;
}

:global(:root[data-theme="dark"]) .nav-inner {
  background: transparent;
  box-shadow: none;
}

.brand-link {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  color: var(--text-primary);
  text-decoration: none;
}

.brand-logo {
  width: 30px;
  height: 30px;
}

.nav-links {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav-links::-webkit-scrollbar {
  display: none;
}

.nav-link {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 12px;
  color: var(--text-secondary);
  text-decoration: none;
  background: var(--control-bg);
  border: 1px solid transparent;
  box-shadow: none;
  font-size: 14px;
  font-weight: 750;
  transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
}

.nav-link:hover {
  transform: translateY(-1px);
  color: var(--text-primary);
  background: var(--control-bg-hover);
  border-color: var(--accent-border);
  box-shadow: none;
}

.nav-link.active {
  color: var(--accent-text);
  background: var(--accent-soft);
  border-color: var(--accent-border);
  box-shadow: none;
}

.nav-icon {
  flex-shrink: 0;
}

.nav-right {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.top-clock {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  min-width: 74px;
  user-select: none;
}

.top-clock-time {
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
}

.top-clock-date {
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  color: var(--text-muted);
  white-space: nowrap;
}

.theme-button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 34px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 12px;
  color: var(--text-secondary);
  background: var(--control-bg);
  cursor: pointer;
  transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease;
}

.theme-button:hover {
  transform: translateY(-1px);
  background: var(--control-bg-hover);
  border-color: var(--accent-border);
  color: var(--accent-text);
}

@media (max-width: 720px) {
  .top-nav {
    min-height: calc(50px + env(safe-area-inset-top));
    padding-left: 12px;
    padding-right: 12px;
  }

  .nav-inner {
    gap: 10px;
    min-height: 50px;
    padding: 0;
  }

  .brand-logo {
    width: 28px;
    height: 28px;
  }

  .nav-link {
    min-height: 32px;
    padding: 0 10px;
  }

  .top-clock {
    min-width: 68px;
  }

  .top-clock-time {
    font-size: 14px;
  }

  .top-clock-date {
    font-size: 10px;
  }
}

@media (max-width: 520px) {
  .nav-link span {
    display: none;
  }

  .nav-link {
    width: 34px;
    min-width: 34px;
    padding: 0;
    justify-content: center;
  }

  .top-clock-date {
    display: none;
  }

  .top-clock {
    min-width: 44px;
  }
}
</style>
