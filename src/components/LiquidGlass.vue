<template>
  <!-- 液态玻璃组件容器 -->
  <div class="liquid-glass-container" :class="{ 'hover-active': isHovered }" :style="containerStyle"
    @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="handleClick" v-bind="attrs">
    <!-- 液态滤镜层 - 创建扭曲效果 -->
    <div class="glass-filter"></div>

    <!-- 高光层 - 增强玻璃质感 -->
    <div class="glass-specular"></div>

    <!-- 内容插槽 - 支持任意内容 -->
    <div class="glass-content">
      <slot></slot>
    </div>
  </div>

  <!-- SVG滤镜定义 - 用于液态扭曲效果 -->
  <svg style="display: none">
    <filter height="100%" id="lg-dist" width="100%" x="0%" y="0%">
      <!-- 生成噪声图案作为扭曲基础 -->
      <feTurbulence baseFrequency="0.008 0.008" numOctaves="2" result="noise" seed="92" type="fractalNoise" />
      <!-- 模糊噪声图案使效果更自然 -->
      <feGaussianBlur in="noise" result="blurred" stdDeviation="2" />
      <!-- 使用噪声图案扭曲原始图形 -->
      <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'

// 定义组件props
interface Props {
  /** 容器宽度，支持任意CSS单位 */
  width?: string
  /** 容器高度，支持任意CSS单位 */
  height?: string
  /** 圆角大小，支持任意CSS单位 */
  borderRadius?: string
  /** 背景颜色，支持rgba等格式 */
  backgroundColor?: string
  /** 是否启用hover效果 */
  enableHover?: boolean
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  width: '600px',
  height: '60px',
  borderRadius: '200px',
  backgroundColor: 'rgba(0, 0, 0, 0.15)',
  enableHover: true
})

// 禁用自动属性继承，避免警告
defineOptions({
  inheritAttrs: false
})

// 获取所有非props属性
const attrs = useAttrs()

// 鼠标悬停状态
const isHovered = ref(false)

// 计算容器样式
const containerStyle = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.borderRadius,
  backgroundColor: props.backgroundColor
}))

// 鼠标进入事件处理
const handleMouseEnter = () => {
  if (props.enableHover) {
    isHovered.value = true
  }
}

// 鼠标离开事件处理
const handleMouseLeave = () => {
  if (props.enableHover) {
    isHovered.value = false
  }
}

// 点击事件处理
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

// 定义事件
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
/* 基础液态玻璃容器样式 */
.liquid-glass-container {
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);

  /* 添加过渡效果使变化更平滑 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

/* 液态滤镜层样式 */
.glass-filter {
  position: absolute;
  inset: 0;
  z-index: 0;
  backdrop-filter: blur(3px);
  filter: url(#lg-dist);
  isolation: isolate;
  transition: none;
}

/* 高光层样式 */
.glass-specular {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  overflow: hidden;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.65),
    inset 0 0 5px rgba(255, 255, 255, 0.75);
  transition: all 0.3s ease;
}

/* 内容容器样式 */
.glass-content {
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* ===========================
   HOVER 效果样式
   =========================== */

/* 容器悬停效果 */
.liquid-glass-container.hover-active {
  /* 优雅地增强背景透明度 - 降低透明度变化幅度 */
  background-color: rgba(0, 0, 0, 0.20) !important;

  /* 增强阴影效果 - 加深阴影 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35),
    0 0 40px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(255, 255, 255, 0.15);

  /* 上移2px效果 */
  transform: translateY(-2px);
}

/* 悬停时滤镜效果增强 */
.liquid-glass-container.hover-active .glass-filter {
  /* 保持扭曲效果，避免消失重出现 */
  filter: url(#lg-dist);
}

/* 悬停时高光效果增强 */
.liquid-glass-container.hover-active .glass-specular {
  /* 增强高光亮度 */
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.75),
    inset 0 0 10px rgba(255, 255, 255, 0.6),
    inset -1px -1px 0 rgba(255, 255, 255, 0.3);
}

/* 内容区域悬停效果 */
.liquid-glass-container.hover-active .glass-content {
  /* 内容轻微上浮效果 */
  transform: translateY(-1px);
}

/* 禁用hover效果的样式 */
.liquid-glass-container.hover-disabled {
  cursor: default;
}
</style>