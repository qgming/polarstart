<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Left, Setting } from '@icon-park/vue-next'
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
  <div class="view-container">
    <!-- 渐变背景层 -->
    <div class="background-gradient"></div>

    <!-- 返回按钮 - 左上角 -->
    <div class="nav-button nav-button-left">
      <button @click="goBackHome" class="button-glass hover-lift" title="返回主页">
        <Left theme="outline" size="20" fill="currentColor" />
      </button>
    </div>

    <!-- 设置按钮 - 右上角 -->
    <div class="nav-button nav-button-right">
      <button class="button-glass hover-lift" title="设置">
        <Setting theme="outline" size="20" fill="currentColor" />
      </button>
    </div>

    <!-- 资源文件夹内容区域 -->
    <div class="content-wrapper">
      <!-- 资源分类网格 -->
      <div class="categories-grid">
        <div
          v-for="(category, index) in categories"
          :key="category.id"
          class="category-wrapper"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <CategoryLibrary :category="category" class="category-item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 视图容器 */
.view-container {
  position: relative;
  min-height: 100vh;
  background: #0f0f14;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 渐变背景层 */
.background-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 30% 20%,
    rgba(59, 130, 246, 0.08) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 70% 80%,
    rgba(168, 85, 247, 0.08) 0%,
    transparent 50%
  ),
  linear-gradient(
    to bottom,
    rgba(15, 15, 20, 0.95) 0%,
    rgba(15, 15, 20, 0.98) 100%
  );
  pointer-events: none;
  z-index: 0;
}

/* 导航按钮位置 */
.nav-button {
  position: absolute;
  top: 1.5rem;
  z-index: 10;
  animation: fadeInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-button-left {
  left: 1.5rem;
}

.nav-button-right {
  right: 1.5rem;
}

/* 玻璃态按钮 */
.button-glass {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.75rem;
  background: rgba(45, 45, 50, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: rgba(224, 224, 224, 0.9);
  cursor: pointer;
  border: 1px solid var(--border-glass-subtle);
  box-shadow: var(--shadow-glass-sm);
  transition: all var(--duration-normal) var(--ease-spring);
}

.button-glass:hover {
  background: rgba(60, 60, 65, 0.9);
  color: white;
  border-color: var(--border-glass-medium);
  box-shadow: var(--shadow-glass-md);
}

.button-glass:active {
  transform: scale(0.95);
}

/* 内容包裹器 */
.content-wrapper {
  position: relative;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 5.5rem 1rem 1.5rem 1rem;
  z-index: 1;
}

/* 分类网格 */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.625rem;
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 640px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
}

@media (min-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.875rem;
  }
}

@media (min-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

@media (min-width: 1280px) {
  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

@media (min-width: 1536px) {
  .categories-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 1.125rem;
  }
}

/* 分类包裹器 */
.category-wrapper {
  display: flex;
  justify-content: center;
  animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

.category-item {
  width: 100%;
  max-width: none;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .nav-button {
    top: 1rem;
  }

  .nav-button-left {
    left: 1rem;
  }

  .nav-button-right {
    right: 1rem;
  }

  .content-wrapper {
    padding: 4.5rem 0.75rem 1rem 0.75rem;
  }

  .categories-grid {
    gap: 0.5rem;
  }
}
</style>