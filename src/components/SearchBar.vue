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
      class="flex items-center gap-3 h-14 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-300 hover:bg-black/60 hover:border-white/15 focus-within:bg-black/70 focus-within:border-white/20"
      style="padding-left: 1rem; padding-right: 1rem;">
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