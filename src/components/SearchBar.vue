<script setup lang="ts">
import { ref } from 'vue'
import { Search, CloseOne } from '@icon-park/vue-next'

const searchQuery = ref('')
const isFocused = ref(false)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    window.open(`https://www.bing.com/search?q=${encodeURIComponent(searchQuery.value)}`, '_blank')
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}
</script>

<template>
  <div class="search-wrapper">
    <div
      class="search-container glass-primary will-change-backdrop gpu-accelerate"
      :class="{ 'search-focused': isFocused }"
    >
      <!-- 搜索图标 -->
      <div class="search-icon-wrapper">
        <Search theme="outline" size="22" :strokeWidth="2.5" class="search-icon" />
      </div>

      <!-- 输入框 -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索互联网..."
        class="search-input"
        autocomplete="off"
        @keyup.enter="handleSearch"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- 清除按钮 -->
      <transition name="fade-scale">
        <div v-if="searchQuery" class="clear-button-wrapper" @click="clearSearch">
          <CloseOne theme="outline" size="20" class="clear-icon" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* 搜索包裹器 */
.search-wrapper {
  width: 100%;
  max-width: 680px;
}

/* 搜索容器 */
.search-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 3.5rem;
  padding: 0 1rem;
  border-radius: 1rem;
  transition: all var(--duration-smooth) var(--ease-spring);
}

.search-container:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: var(--border-glass-strong);
  box-shadow: var(--shadow-glass-xl);
}

.search-container.search-focused {
  transform: translateY(-6px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

/* 搜索图标包裹器 */
.search-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.search-icon {
  color: rgba(255, 255, 255, 0.7);
  transition: color var(--duration-normal) var(--ease-smooth);
}

.search-container:hover .search-icon,
.search-container.search-focused .search-icon {
  color: rgba(255, 255, 255, 0.95);
}

/* 输入框 */
.search-input {
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  line-height: 1.5;
  transition: color var(--duration-normal) var(--ease-smooth);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  transition: color var(--duration-normal) var(--ease-smooth);
}

.search-input:focus::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

/* 清除按钮 */
.clear-button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.1);
  transition: all var(--duration-normal) var(--ease-spring);
}

.clear-button-wrapper:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.clear-button-wrapper:active {
  transform: scale(0.95);
}

.clear-icon {
  color: rgba(255, 255, 255, 0.6);
  transition: color var(--duration-fast) var(--ease-smooth);
}

.clear-button-wrapper:hover .clear-icon {
  color: rgba(255, 255, 255, 0.95);
}

/* 过渡动画 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all var(--duration-normal) var(--ease-spring);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-container {
    height: 3rem;
    padding: 0 0.875rem;
    gap: 0.625rem;
  }

  .search-input {
    font-size: 0.9375rem;
  }
}

@media (max-width: 640px) {
  .search-container {
    height: 2.75rem;
    padding: 0 0.75rem;
    gap: 0.5rem;
    border-radius: 0.875rem;
  }

  .search-input {
    font-size: 0.875rem;
  }

  .clear-button-wrapper {
    width: 1.75rem;
    height: 1.75rem;
  }
}
</style>