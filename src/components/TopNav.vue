<script setup lang="ts">
import { Flame, Home, Moon, Newspaper, Sun } from '@lucide/vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const navItems = [
  {
    to: '/',
    name: 'home',
    label: '首页',
    icon: Home
  },
  {
    to: '/aihot',
    name: 'aihot-daily',
    label: 'AI 日报',
    icon: Newspaper
  },
  {
    to: '/aihot/items',
    name: 'aihot-items',
    label: 'AI 动态',
    icon: Flame
  }
]
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
  background: color-mix(in srgb, var(--app-bg) 72%, transparent);
  border-bottom: 1px solid var(--card-border);
  backdrop-filter: blur(18px) saturate(1.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
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

}
</style>
