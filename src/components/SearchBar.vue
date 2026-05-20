<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, Search, X } from '@lucide/vue'

const query = ref('')
const focused = ref(false)

const trimmedQuery = computed(() => query.value.trim())
const canSubmit = computed(() => trimmedQuery.value.length > 0)

const submit = () => {
  if (!canSubmit.value) return
  window.open(`https://www.bing.com/search?q=${encodeURIComponent(trimmedQuery.value)}`, '_blank', 'noopener')
}

const clear = () => {
  query.value = ''
}
</script>

<template>
  <div class="search-shell" :class="{ focused }">
    <div class="search-icon-wrap">
      <Search :size="20" :stroke-width="2.2" />
    </div>

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

    <button v-if="query" class="icon-button" type="button" aria-label="清空搜索" @click="clear">
      <X :size="16" :stroke-width="2.4" />
    </button>

    <button class="submit-button" type="button" :disabled="!canSubmit" @click="submit">
      <span>搜索</span>
      <ArrowUpRight :size="16" :stroke-width="2.25" />
    </button>
  </div>
</template>

<style scoped>
.search-shell {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 10px;
  min-height: 68px;
  padding: 10px 10px 10px 16px;
  border-radius: 22px;
  background: rgba(9, 14, 24, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 64px rgba(5, 10, 20, 0.3);
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

.search-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(232, 242, 255, 0.62);
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

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 92px;
  height: 46px;
  padding: 0 16px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, #89c7ff 0%, #5de3c1 100%);
  color: #07111f;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 180ms ease, filter 180ms ease, opacity 180ms ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-1px);
  filter: saturate(1.08) brightness(1.02);
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
    grid-template-columns: auto 1fr auto;
    min-height: 60px;
    padding: 10px 10px 10px 14px;
    border-radius: 20px;
  }

  .submit-button {
    width: 46px;
    min-width: 46px;
    padding: 0;
    border-radius: 12px;
  }

  .submit-button span {
    display: none;
  }
}
</style>
