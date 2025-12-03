<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Left, Setting } from '@icon-park/vue-next'
// 假设 CategoryLibrary 内部已经实现了类似图标的视觉效果
import CategoryLibrary from '@/components/CategoryLibrary.vue'
import { webCategories } from '@/data/webCategories'

const router = useRouter()

// 使用导入的分类数据
const categories = ref(webCategories)

// 返回主页
const goBackHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-[#1e1e1e] overflow-y-auto relative">
    <!-- 返回按钮 - 左上角 -->
    <div class="absolute z-10 animate-[fadeInDown_0.6s_ease-out]" style="top: 24px; left: 24px;">
      <button @click="goBackHome"
        class="flex items-center justify-center w-10 h-10 border-none rounded-lg bg-[#2d2d2d] text-[#e0e0e0] cursor-pointer transition-all duration-200 hover:bg-[#3d3d3d] hover:text-white active:translate-y-0"
        title="返回主页">
        <Left theme="outline" size="20" fill="#e0e0e0" />
      </button>
    </div>

    <!-- 设置按钮 - 右上角 -->
    <div class="absolute z-10 animate-[fadeInDown_0.6s_ease-out]" style="top: 24px; right: 24px;">
      <button
        class="flex items-center justify-center w-10 h-10 border-none rounded-lg bg-[#2d2d2d] text-[#e0e0e0] cursor-pointer transition-all duration-200 hover:bg-[#3d3d3d] hover:text-white active:translate-y-0"
        title="设置">
        <Setting theme="outline" size="20" fill="#e0e0e0" />
      </button>
    </div>

    <!-- 资源文件夹内容区域 -->
    <div class="w-full mx-auto" style="padding: 88px 16px 24px 16px; max-width: 1800px;">
      <!-- 资源分类网格 -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 animate-[fadeIn_0.6s_ease-out]"
        style="gap: 16px;">
        <div v-for="(category, index) in categories" :key="category.id"
          class="flex justify-center animate-[fadeInUp_0.5s_ease-out_backwards]"
          :style="{ animationDelay: `${index * 0.05}s` }">
          <CategoryLibrary :category="category" class="w-full max-w-xs" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 动画定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>