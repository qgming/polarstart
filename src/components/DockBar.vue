<script setup lang="ts">

const links = [
  {
    name: 'DeepSeek',
    url: 'https://chat.deepseek.com/',
    external: true,
    image: 'https://image.dooo.ng/t/2026/05/20/6a0dc9f9a9131.webp'
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    external: true,
    image: 'https://image.dooo.ng/t/2026/05/20/6a0dc9e6b4981.webp'
  },
  {
    name: 'Bilibili',
    url: 'https://www.bilibili.com',
    external: true,
    image: 'https://image.dooo.ng/t/2026/05/20/6a0dc9be2dd9e.webp'
  },
  {
    name: '抖音官网',
    url: 'https://www.douyin.com/',
    external: true,
    image: 'https://image.dooo.ng/t/2026/05/20/6a0dca8574d35.webp'
  },
  {
    name: '橘子导航',
    url: 'https://v.qgming.com/',
    external: true,
    image: 'https://image.dooo.ng/t/2026/05/20/6a0dcbff031ce.webp'
  },
  {
    name: 'Linux Do',
    url: 'https://linux.do/',
    external: true,
    image: 'https://image.dooo.ng/t/2026/05/20/6a0dcb2ba4ffc.webp'
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
      :aria-label="item.name"
      :title="item.name"
      type="button"
      :style="{ animationDelay: `${index * 45}ms` }"
      @click="openLink(item.url, item.external)"
    >
      <span class="tabbar-icon">
        <img class="tabbar-image" :src="item.image" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </span>
    </button>
  </nav>
</template>

<style scoped>
.tabbar {
  position: fixed;
  left: 50%;
  bottom: max(18px, env(safe-area-inset-bottom));
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  transform: translateX(-50%);
  border-radius: 24px;
  overflow: visible;
  background: color-mix(in srgb, var(--app-bg) 72%, transparent);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(18px) saturate(1.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
}

.tabbar::after {
  content: '';
  position: absolute;
  left: 12%;
  right: 12%;
  bottom: -11px;
  height: 14px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.08);
  filter: blur(14px);
  pointer-events: none;
}

.tabbar-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 52px;
  padding: 0;
  border: 0;
  border-radius: 18px;
  color: #f2f7ff;
  background: transparent;
  cursor: pointer;
  animation: rise-in 420ms ease both;
  transform-origin: center bottom;
  transition: transform 180ms ease;
}

.tabbar-item:hover {
  transform: translateY(-8px) scale(1.08);
}

.tabbar-item:active {
  transform: translateY(-5px) scale(1.02);
}

.tabbar-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 15px;
  background: #ffffff;
  border: 0;
  overflow: hidden;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
}

.tabbar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
}

.tabbar-item:hover .tabbar-icon {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.16);
  filter: saturate(1.05) brightness(1.03);
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
    bottom: max(12px, env(safe-area-inset-bottom));
    gap: 5px;
    width: max-content;
    max-width: calc(100% - 18px);
    justify-content: space-between;
    padding: 7px 9px;
    border-radius: 22px;
  }

  .tabbar-item {
    width: 42px;
    height: 42px;
  }

  .tabbar-item:hover {
    transform: translateY(-4px) scale(1.04);
  }

  .tabbar-icon {
    width: 36px;
    height: 36px;
    border-radius: 13px;
  }
}
 </style>
