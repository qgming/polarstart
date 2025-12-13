<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  url: string
  name: string
  fallbackIcon?: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  fallbackIcon: '🌐',
  size: 32
})

const imageLoaded = ref(false)
const currentServiceIndex = ref(0)

// 多个高清图标服务，按优先级排列
const iconServices = computed(() => {
  try {
    const url = new URL(props.url)
    const domain = url.hostname
    const size = props.size

    return [
      // 1. Favicon.io - 高清，支持多种尺寸
      `https://api.favicon.io/v1/icon?url=${encodeURIComponent(props.url)}&size=${size}`,

      // 2. Unavatar - 支持多种图标源，质量较高
      `https://unavatar.io/${domain}?fallback=false`,

      // 3. DuckDuckGo - 高质量，免费无限制
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,

      // 4. Google S2 - 可靠但分辨率较低
      `https://www.google.com/s2/favicons?domain=${domain}&sz=${Math.min(size, 128)}`,

      // 5. 直接获取网站根目录的 favicon
      `${url.protocol}//${domain}/favicon.ico`
    ]
  } catch {
    return []
  }
})

// 当前使用的图标 URL
const currentIconUrl = computed(() => {
  return iconServices.value[currentServiceIndex.value] || ''
})

// 是否显示降级图标
const showFallback = computed(() => {
  return currentServiceIndex.value >= iconServices.value.length
})

// 处理图片加载成功
const handleImageLoad = () => {
  imageLoaded.value = true
}

// 处理图片加载失败，尝试下一个服务
const handleImageError = () => {
  imageLoaded.value = false
  // 尝试下一个图标服务
  if (currentServiceIndex.value < iconServices.value.length - 1) {
    currentServiceIndex.value++
  } else {
    // 所有服务都失败，显示降级图标
    currentServiceIndex.value = iconServices.value.length
  }
}
</script>

<template>
  <div class="website-icon-wrapper" :style="{ width: `${size}px`, height: `${size}px` }">
    <!-- 实际 favicon -->
    <img
      v-if="!showFallback && currentIconUrl"
      :key="currentIconUrl"
      :src="currentIconUrl"
      :alt="`${name} 图标`"
      class="website-favicon"
      :class="{ loaded: imageLoaded }"
      @load="handleImageLoad"
      @error="handleImageError"
      loading="lazy"
      crossorigin="anonymous"
    />

    <!-- 降级方案：显示 emoji -->
    <span v-if="showFallback" class="website-fallback-icon">
      {{ fallbackIcon }}
    </span>
  </div>
</template>

<style scoped>
.website-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.website-favicon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.website-favicon.loaded {
  opacity: 1;
}

.website-fallback-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 0.75em;
}
</style>
