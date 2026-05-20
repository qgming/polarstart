<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search, X } from '@lucide/vue'
import ActionMenu from '@/components/ActionMenu.vue'

type SearchEngine = {
  value: string
  label: string
  searchUrl: string
}

const searchEngines: SearchEngine[] = [
  { value: 'bing', label: 'Bing', searchUrl: 'https://www.bing.com/search?q=' },
  { value: 'google', label: 'Google', searchUrl: 'https://www.google.com/search?q=' },
  { value: 'baidu', label: '百度', searchUrl: 'https://www.baidu.com/s?wd=' },
  { value: 'duckduckgo', label: 'DuckDuckGo', searchUrl: 'https://duckduckgo.com/?q=' }
]

const query = ref('')
const focused = ref(false)
const selectedEngineId = ref(searchEngines[0].value)

const trimmedQuery = computed(() => query.value.trim())
const canSubmit = computed(() => trimmedQuery.value.length > 0)
const selectedEngine = computed(() => {
  return searchEngines.find((engine) => engine.value === selectedEngineId.value) ?? searchEngines[0]
})

const submit = () => {
  if (!canSubmit.value) return
  window.open(`${selectedEngine.value.searchUrl}${encodeURIComponent(trimmedQuery.value)}`, '_blank', 'noopener')
}

const clear = () => {
  query.value = ''
}
</script>

<template>
  <div class="search-shell" :class="{ focused }">
    <ActionMenu v-model="selectedEngineId" :options="searchEngines" aria-label="选择搜索引擎" />

    <input
      v-model="query"
      class="search-input"
      type="text"
      placeholder="搜索网页、想法，或者下一步要做什么"
      autocomplete="off"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="submit"
    />

    <button class="icon-button clear-button" :class="{ hidden: !query }" type="button" aria-label="清空搜索" @click="clear">
      <X :size="16" :stroke-width="2.4" />
    </button>

    <button class="submit-button" type="button" aria-label="搜索" :disabled="!canSubmit" @click="submit">
      <Search :size="20" :stroke-width="2.45" />
    </button>
  </div>
</template>

<style scoped>
.search-shell {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 12px;
  min-height: 66px;
  padding: 10px 9px 10px 10px;
  border-radius: 20px;
  background: rgba(7, 13, 23, 0.58);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 18px 60px rgba(5, 10, 20, 0.34);
  backdrop-filter: blur(20px);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.search-shell:hover,
.search-shell.focused {
  transform: translateY(-2px);
  background: rgba(11, 18, 30, 0.62);
  border-color: rgba(170, 214, 255, 0.28);
  box-shadow: 0 24px 72px rgba(5, 10, 20, 0.38);
}

.search-input {
  min-width: 0;
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: #f4f8ff;
  font-size: 16px;
  line-height: 1.4;
}

.search-input::placeholder {
  color: rgba(232, 242, 255, 0.44);
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  border: 0;
  color: rgba(244, 248, 255, 0.72);
  background: rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: background 180ms ease, color 180ms ease, transform 180ms ease;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
}

.icon-button:active {
  transform: scale(0.96);
}

.clear-button.hidden {
  opacity: 0;
  pointer-events: none;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  min-width: 46px;
  height: 46px;
  padding: 0;
  border: 0;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.09);
  color: rgba(246, 250, 255, 0.9);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 180ms ease, background 180ms ease, color 180ms ease, opacity 180ms ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.13);
  color: #ffffff;
}

.submit-button:active:not(:disabled) {
  transform: scale(0.98);
}

.submit-button:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .search-shell {
    grid-template-columns: auto 1fr auto auto;
    min-height: 60px;
    gap: 8px;
    padding: 8px 7px 8px 8px;
    border-radius: 18px;
  }

  .icon-button {
    width: 34px;
    height: 34px;
    border-radius: 10px;
  }

  .submit-button {
    width: 44px;
    min-width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 12px;
  }
}
</style>
