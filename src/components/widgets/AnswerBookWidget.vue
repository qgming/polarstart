<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface AnswerData {
  id: string
  answer: string
  answer_en: string
  index: number
}

interface AnswerResponse {
  code: number
  message: string
  data: AnswerData | string
}

const answer = ref('翻开书页，寻找答案...')
const answerEn = ref('')
const loading = ref(false)
const error = ref('')
const isFlipping = ref(false)
const hasLoaded = ref(false)

// 获取答案之书数据
const fetchAnswer = async () => {
  loading.value = true
  error.value = ''
  isFlipping.value = true
  hasLoaded.value = true

  try {
    const response = await fetch('https://60s.viki.moe/v2/answer?encoding=json')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: AnswerResponse = await response.json()

    if (data.code === 200 && data.data) {
      // 延迟显示答案,增加神秘感
      setTimeout(() => {
        // 判断返回的是对象还是字符串
        if (typeof data.data === 'object') {
          answer.value = data.data.answer
          answerEn.value = data.data.answer_en
        } else {
          answer.value = data.data
          answerEn.value = ''
        }
        isFlipping.value = false
      }, 600)
    } else {
      throw new Error(data.message || '获取答案失败')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '网络错误，请稍后重试'
    console.error('获取答案失败:', err)
    isFlipping.value = false
  } finally {
    loading.value = false
  }
}

// 刷新获取新答案
const refresh = () => {
  fetchAnswer()
}

// 组件挂载时不自动加载数据
onMounted(() => {
  // 不再自动获取数据，仅保留手动刷新功能
})
</script>

<template>
  <div
    class="w-[280px] h-[280px] bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl font-sans flex flex-col overflow-hidden border border-purple-400 shadow-lg"
    style="padding: 12px">
    <!-- 头部区域 -->
    <div class="flex-shrink-0" style="margin-bottom: 12px">
      <div class="flex items-center justify-between">
        <div class="flex items-center" style="gap: 8px">
          <span class="text-sm font-semibold text-white">答案之书 📖</span>
        </div>

        <button @click="refresh" :disabled="loading" title="获取新答案"
          class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center select-none hover:opacity-80 active:opacity-60 disabled:opacity-40 disabled:cursor-not-allowed"
          style="background-color: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3)">
          <span :class="{ 'animate-spin': loading }" class="text-base">↻</span>
        </button>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="flex-1 flex items-center justify-center min-h-0" style="padding: 10px">
      <!-- 加载中 -->
      <div v-if="loading" class="flex flex-col items-center justify-center text-white text-xs">
        <div class="w-8 h-8 border-3 border-white/30 rounded-full animate-spin"
          style="border-top-color: white; margin-bottom: 10px"></div>
        <p class="font-medium">正在翻阅...</p>
      </div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="flex flex-col items-center justify-center text-xs text-center"
        style="color: white; padding: 0 10px">
        <p class="font-medium" style="margin-bottom: 10px">{{ error }}</p>
        <button @click="refresh"
          class="text-xs font-medium rounded-lg cursor-pointer transition-all duration-200 hover:opacity-90 active:opacity-70"
          style="padding: 8px 16px; background-color: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3)">
          重试
        </button>
      </div>

      <!-- 答案显示 -->
      <div v-else class="relative w-full h-full flex items-center justify-center">
        <!-- 书本背景 -->
        <div class="absolute inset-0 bg-white rounded-lg shadow-inner flex items-center justify-center"
          :class="{ 'animate-flip': isFlipping }"
          style="background: linear-gradient(135deg, #fff9e6 0%, #fffef7 100%); border: 2px solid rgba(139, 92, 246, 0.3)">

          <!-- 书页纹理 -->
          <div class="absolute inset-0 opacity-5"
            style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, #8b5cf6 2px, #8b5cf6 4px)">
          </div>

          <!-- 答案文字 -->
          <div class="relative z-10 text-center px-6 py-4">
            <div v-if="!isFlipping" class="space-y-2">
              <div class="answer-text text-lg font-bold leading-relaxed" :class="{ 'opacity-50': !hasLoaded }"
                style="color: #5b21b6; text-shadow: 0 1px 2px rgba(0,0,0,0.1); animation: fadeIn 0.5s ease-in">
                {{ answer }}
              </div>
              <div v-if="answerEn" class="text-xs font-medium leading-relaxed opacity-60"
                style="color: #7c3aed; animation: fadeIn 0.5s ease-in 0.2s backwards">
                {{ answerEn }}
              </div>
            </div>
            <div v-else class="text-sm font-medium" style="color: #8b5cf6">
              翻阅中...
            </div>
          </div>

          <!-- 装饰元素 -->
          <div class="absolute top-2 left-2 w-8 h-8 opacity-10"
            style="background: radial-gradient(circle, #8b5cf6 0%, transparent 70%)"></div>
          <div class="absolute bottom-2 right-2 w-8 h-8 opacity-10"
            style="background: radial-gradient(circle, #8b5cf6 0%, transparent 70%)"></div>
        </div>
      </div>
    </div>

    <!-- 提示文字 -->
    <div class="flex-shrink-0 text-center text-xs text-white/70 font-medium" style="margin-top: 8px">
      在心中默念问题，点击刷新获取答案
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flip {
  0% {
    transform: rotateY(0deg);
  }

  50% {
    transform: rotateY(90deg);
  }

  100% {
    transform: rotateY(0deg);
  }
}

.animate-flip {
  animation: flip 0.6s ease-in-out;
}

.answer-text {
  word-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
  line-height: 1.6;
}

/* 响应式字体大小 */
.answer-text {
  font-size: clamp(14px, 2.5vw, 18px);
}
</style>