<script setup lang="ts">
import { Flame, Home, Image, Monitor, Moon, Newspaper, Rss, Sun, TrendingUp } from '@lucide/vue'
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
    to: '/hot',
    name: 'hot',
    label: '全网热点',
    icon: TrendingUp
  },
  {
    to: '/it-news',
    name: 'it-news',
    label: 'IT 动态',
    icon: Rss
  },
  {
    to: '/aihot',
    name: 'aihot-daily',
    label: 'AI 日报',
    icon: Newspaper
  },
  {
    to: '/ainews',
    name: 'ainews',
    label: 'AI 动态',
    icon: Flame
  }
]
</script>

<template>
  <header class="top-nav">
    <div class="nav-inner">
      <RouterLink to="/" class="brand-link" aria-label="首页">
        <span class="brand-logo" aria-hidden="true"></span>
        <span class="brand-name">PolarStart</span>
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
          class="icon-button"
          type="button"
          :class="{ active: themeStore.bingWallpaperEnabled }"
          :aria-label="themeStore.bingWallpaperEnabled ? '关闭 Bing 壁纸' : '开启 Bing 壁纸'"
          :title="themeStore.bingWallpaperEnabled ? '关闭 Bing 壁纸' : '开启 Bing 壁纸'"
          :aria-pressed="themeStore.bingWallpaperEnabled"
          @click="themeStore.toggleBingWallpaper"
        >
          <Image :size="17" :stroke-width="2.25" aria-hidden="true" />
        </button>

        <button
          class="icon-button"
          type="button"
          :aria-label="
            themeStore.mode === 'light'
              ? '当前浅色模式，切换为深色模式'
              : themeStore.mode === 'dark'
                ? '当前深色模式，切换为跟随系统'
                : '当前跟随系统，切换为浅色模式'
          "
          :title="
            themeStore.mode === 'light'
              ? '浅色模式'
              : themeStore.mode === 'dark'
                ? '深色模式'
                : `跟随系统（当前${themeStore.resolvedMode === 'dark' ? '深色' : '浅色'}）`
          "
          @click="themeStore.toggleTheme"
        >
          <Sun v-if="themeStore.mode === 'light'" :size="17" :stroke-width="2.25" aria-hidden="true" />
          <Moon
            v-else-if="themeStore.mode === 'dark'"
            :size="17"
            :stroke-width="2.25"
            aria-hidden="true"
          />
          <Monitor v-else :size="17" :stroke-width="2.25" aria-hidden="true" />
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
  gap: 9px;
  color: var(--text-primary);
  text-decoration: none;
}

.brand-logo {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  background: currentColor;
  mask: url('/favicon.svg') center / contain no-repeat;
  -webkit-mask: url('/favicon.svg') center / contain no-repeat;
  transition: background 180ms ease;
}

.brand-name {
  font-size: 17px;
  font-weight: 850;
  line-height: 1;
  letter-spacing: 0;
  white-space: nowrap;
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
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
}

.nav-link:hover {
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

.icon-button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 34px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  color: var(--text-secondary);
  background: transparent;
  cursor: pointer;
  transition: color 180ms ease;
}

.icon-button:hover,
.icon-button.active {
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

  .brand-name {
    font-size: 16px;
  }

  .nav-link {
    min-height: 32px;
    padding: 0 10px;
  }

  .icon-button {
    width: 34px;
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
