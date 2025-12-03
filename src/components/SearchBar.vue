<script setup lang="ts">
import { ref } from 'vue'
import { Search, CloseOne } from '@icon-park/vue-next'

const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    window.open(`https://www.bing.com/search?q=${encodeURIComponent(searchQuery.value)}`, '_blank')
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <div class="w-full max-w-[680px]">
    <div
      class="search-bar-container flex items-center gap-3 h-14 rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/15 focus-within:border-white/20 focus-within:shadow-lg"
      style="padding-left: 1rem; padding-right: 1rem; background-color: rgba(20, 20, 20, 0.6); backdrop-filter: blur(40px) saturate(200%); -webkit-backdrop-filter: blur(40px) saturate(200%);">
      <!-- 搜索图标 -->
      <Search theme="outline" size="22" :strokeWidth="2.5" class="text-white/70 flex-shrink-0" />

      <!-- 输入框 -->
      <input v-model="searchQuery" type="text" placeholder="搜索互联网..." @keyup.enter="handleSearch"
        class="flex-1 bg-transparent border-none outline-none text-white/95 text-base h-full placeholder:text-white/50 focus-visible:outline-none"
        autocomplete="off" />

      <!-- 清除按钮 -->
      <CloseOne v-if="searchQuery" @click="clearSearch" theme="outline" size="22"
        class="text-white/60 cursor-pointer hover:text-white/90" />
    </div>
  </div>
</template>

<style scoped>
.search-bar-container {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.search-bar-container:hover,
.search-bar-container:focus-within {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(255, 255, 255, 0.1);
}
</style>