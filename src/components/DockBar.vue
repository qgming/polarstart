<script setup lang="ts">
import { BookOpen, Code2, Globe, House, Play, Sparkles } from '@lucide/vue'

const links = [
  {
    name: '主页',
    url: '/',
    icon: House,
    external: false
  },
  {
    name: 'Google',
    url: 'https://www.google.com',
    icon: Globe,
    external: true
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: Code2,
    external: true
  },
  {
    name: 'Bilibili',
    url: 'https://www.bilibili.com',
    icon: Play,
    external: true
  },
  {
    name: 'Docs',
    url: 'https://vite.dev',
    icon: BookOpen,
    external: true
  },
  {
    name: '灵感',
    url: 'https://dribbble.com',
    icon: Sparkles,
    external: true
  }
]

const openLink = (url: string, external: boolean) => {
  if (!external) return
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
  <nav class="tabbar" aria-label="快捷入口">
    <button
      v-for="(item, index) in links"
      :key="item.name"
      class="tabbar-item"
      :class="{ active: !item.external }"
      type="button"
      :style="{ animationDelay: `${index * 45}ms` }"
      @click="openLink(item.url, item.external)"
    >
      <span class="tabbar-icon">
        <component :is="item.icon" :size="20" :stroke-width="2.25" />
      </span>
      <span class="tabbar-label">{{ item.name }}</span>
    </button>
  </nav>
</template>

<style scoped>
.tabbar {
  position: fixed;
  left: 50%;
  bottom: 24px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  transform: translateX(-50%);
  border-radius: 24px;
  background: rgba(9, 14, 24, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 60px rgba(5, 10, 20, 0.32);
  backdrop-filter: blur(20px);
}

.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  width: 68px;
  padding: 8px 6px 6px;
  border: 0;
  border-radius: 18px;
  color: #f2f7ff;
  background: transparent;
  cursor: pointer;
  animation: rise-in 420ms ease both;
  transition: transform 180ms ease, background 180ms ease;
}

.tabbar-item:hover,
.tabbar-item.active {
  background: rgba(255, 255, 255, 0.08);
}

.tabbar-item:hover {
  transform: translateY(-4px);
}

.tabbar-item:active {
  transform: scale(0.96);
}

.tabbar-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 15px;
  color: rgba(233, 242, 255, 0.86);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.tabbar-item.active .tabbar-icon {
  color: #07111f;
  background: linear-gradient(135deg, #89c7ff 0%, #5de3c1 100%);
}

.tabbar-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(233, 242, 255, 0.76);
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .tabbar {
    bottom: 18px;
    gap: 5px;
    width: calc(100% - 24px);
    justify-content: space-between;
    padding: 8px;
    border-radius: 20px;
  }

  .tabbar-item {
    width: auto;
    min-width: 48px;
    gap: 5px;
    padding: 6px 4px 4px;
  }

  .tabbar-icon {
    width: 38px;
    height: 38px;
    border-radius: 14px;
  }

  .tabbar-label {
    font-size: 10px;
  }
}
 </style>
