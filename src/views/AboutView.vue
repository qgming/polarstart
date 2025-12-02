<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回主页
const goBackHome = () => {
  router.push('/')
}

// 功能特性列表
const features = [
  {
    icon: '🎨',
    title: '现代设计',
    description: '采用玻璃态卡片设计，提供优雅的视觉体验'
  },
  {
    icon: '⚡',
    title: '快速响应',
    description: '流畅的动画效果和即时的交互反馈'
  },
  {
    icon: '📱',
    title: '响应式布局',
    description: '完美适配各种设备屏幕尺寸'
  },
  {
    icon: '🔧',
    title: '易于定制',
    description: '灵活的配置选项，满足个性化需求'
  }
]

// 技术栈
const techStack = [
  { name: 'Vue 3', icon: '💚' },
  { name: 'TypeScript', icon: '💙' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Vite', icon: '⚡' }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-8">
    <div class="max-w-6xl mx-auto">
      <!-- 返回按钮卡片 -->
      <div class="fixed top-6 left-6 cursor-pointer z-50" @click="goBackHome">
        <div
          class="flex items-center bg-white/95 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-lg border border-white/50">
          <span class="text-2xl mr-2 relative z-10">←</span>
          <span class="text-sm font-semibold text-gray-700 relative z-10">返回主页</span>
        </div>
      </div>

      <!-- 主标题卡片 -->
      <div class="mb-12 text-center">
        <div class="inline-block bg-white/90 backdrop-blur-xl rounded-3xl px-10 py-6 shadow-xl border border-white/50">
          <div class="text-6xl mb-4">🚀</div>
          <h1
            class="text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            PolarStart
          </h1>
          <p class="text-lg text-gray-600 font-medium">您的智能起始页</p>
        </div>
      </div>

      <!-- 简介卡片 -->
      <div class="mb-12">
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <h2 class="text-3xl font-bold text-gray-800 mb-4 relative z-10">关于项目</h2>
          <p class="text-lg text-gray-600 leading-relaxed relative z-10">
            PolarStart 是一个现代化的浏览器起始页项目，致力于为用户提供简洁、美观、高效的浏览器主页体验。
            通过精心设计的卡片式界面，让您的上网之旅更加愉悦和高效。
          </p>
        </div>
      </div>

      <!-- 功能特性网格 -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">核心特性</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(feature, index) in features" :key="index">
            <div
              class="relative h-full bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 overflow-hidden">
              <div class="relative z-10">
                <div class="text-5xl mb-4 text-center">
                  {{ feature.icon }}
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3 text-center">
                  {{ feature.title }}
                </h3>
                <p class="text-sm text-gray-600 text-center leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 技术栈卡片 -->
      <div class="mb-12">
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center relative z-10">技术栈</h2>

          <div class="flex flex-wrap justify-center gap-4 relative z-10">
            <div v-for="(tech, index) in techStack" :key="index">
              <div
                class="flex items-center bg-gradient-to-r from-gray-50 to-gray-100/50 px-6 py-3 rounded-2xl border border-gray-200 cursor-pointer">
                <span class="text-2xl mr-2">
                  {{ tech.icon }}
                </span>
                <span class="font-semibold text-gray-700">
                  {{ tech.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部版权信息卡片 -->
      <div class="text-center">
        <div class="inline-block bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-lg border border-white/50">
          <p class="text-sm text-gray-500">
            © 2025 PolarStart. Made with ❤️
          </p>
        </div>
      </div>
    </div>
  </div>
</template>