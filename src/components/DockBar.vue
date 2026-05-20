<script setup lang="ts">

const links = [
  {
    name: 'Google',
    url: 'https://www.google.com',
    external: true,
    image: 'https://www.google.com/s2/favicons?domain=www.google.com&sz=128'
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    external: true,
    image: 'https://github.githubassets.com/favicons/favicon.svg'
  },
  {
    name: 'Bilibili',
    url: 'https://www.bilibili.com',
    external: true,
    image: 'https://www.bilibili.com/favicon.ico'
  },
  {
    name: 'Docs',
    url: 'https://vite.dev',
    external: true,
    image: 'https://vite.dev/logo.svg'
  },
  {
    name: 'Linux Do',
    url: 'https://linux.do/',
    external: true,
    image: 'https://image.dooo.ng/t/2026/05/20/6a0d9313b887b.webp'
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
  padding: 9px 12px;
  transform: translateX(-50%);
  border-radius: 22px;
  overflow: visible;
  background:
    radial-gradient(circle at 50% 8%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.06) 48%, rgba(255, 255, 255, 0.03) 100%),
    rgba(255, 255, 255, 0.1);
  border: 0;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(46px) saturate(1.25);
  -webkit-backdrop-filter: blur(46px) saturate(1.25);
}

.tabbar::after {
  content: '';
  position: absolute;
  left: 12%;
  right: 12%;
  bottom: -11px;
  height: 14px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.1);
  filter: blur(15px);
  pointer-events: none;
}

.tabbar-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 50px;
  padding: 0;
  border: 0;
  border-radius: 14px;
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
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.72);
  border: 0;
  overflow: hidden;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.16);
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
  box-shadow: 0 14px 22px rgba(0, 0, 0, 0.22);
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
    border-radius: 20px;
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
    border-radius: 10px;
  }
}
 </style>
