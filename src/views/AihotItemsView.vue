<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AlertCircle, ExternalLink, RefreshCw } from '@lucide/vue'

type CategoryKey = 'ai-models' | 'ai-products' | 'industry' | 'paper' | 'tip'

type HotItem = {
  id: string
  title: string
  title_en: string | null
  url: string
  source: string
  publishedAt: string | null
  summary: string | null
  category: CategoryKey | null
}

type HotItemsResponse = {
  count: number
  hasNext: boolean
  nextCursor: string | null
  items: HotItem[]
}

const categoryLabels: Record<CategoryKey, string> = {
  'ai-models': '模型',
  'ai-products': '产品',
  industry: '行业',
  paper: '论文',
  tip: '观点'
}

const hotItems = ref<HotItem[]>([])
const loading = ref(true)
const errorMessage = ref('')

const formatDate = (value: string | null) => {
  if (!value) return '时间未知'
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value))
}

const categoryText = (category: CategoryKey | null) => {
  return category ? categoryLabels[category] : '未分类'
}

const fetchAihotItems = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('/aihot-api/items?mode=selected&take=30')
    if (!response.ok) throw new Error(`动态请求失败: ${response.status}`)

    const data = await response.json() as HotItemsResponse
    hotItems.value = data.items
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'AI HOT 动态加载失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void fetchAihotItems()
})
</script>

<template>
  <main class="items-shell">
    <section class="items-layout">
      <header class="items-hero">
        <h1>AI 动态</h1>

        <button class="refresh-button" type="button" :disabled="loading" @click="fetchAihotItems">
          <RefreshCw :class="{ spinning: loading }" :size="16" :stroke-width="2.3" />
          <span>刷新</span>
        </button>
      </header>

      <div v-if="errorMessage" class="state-card error-card">
        <AlertCircle :size="18" :stroke-width="2.3" />
        <span>{{ errorMessage }}</span>
      </div>

      <div v-else-if="loading" class="state-card">
        <RefreshCw class="spinning" :size="18" :stroke-width="2.3" />
        <span>正在读取 AI HOT 精选动态</span>
      </div>

      <section v-else class="feed-grid" aria-label="AI HOT 精选动态">
        <article v-for="item in hotItems" :key="item.id" class="feed-card">
          <div class="feed-card-head">
            <span class="category-pill">{{ categoryText(item.category) }}</span>
            <time>{{ formatDate(item.publishedAt) }}</time>
          </div>
          <h2>{{ item.title }}</h2>
          <p v-if="item.summary">{{ item.summary }}</p>
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <span>{{ item.source }}</span>
            <ExternalLink :size="14" :stroke-width="2.3" />
          </a>
        </article>
      </section>
    </section>
  </main>
</template>

<style scoped>
.items-shell {
  min-height: 100vh;
  background: var(--app-bg);
  color: var(--text-primary);
}

.items-layout {
  width: min(100%, 1120px);
  margin: 0 auto;
  padding: 92px clamp(16px, 4vw, 28px) 56px;
}

.items-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}

.items-hero h1 {
  margin: 0;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.12;
}

.refresh-button,
.feed-card a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--accent-text);
  text-decoration: none;
}

.refresh-button {
  height: 38px;
  padding: 0 14px;
  border: 1px solid var(--accent-border);
  border-radius: 14px;
  background: var(--accent-soft);
  cursor: pointer;
  font-weight: 750;
}

.refresh-button:disabled {
  cursor: wait;
  opacity: 0.72;
}

.state-card,
.feed-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 22px;
  box-shadow: var(--card-shadow);
}

.state-card {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 72px;
  padding: 0 20px;
  color: var(--text-secondary);
}

.error-card {
  color: #dc2626;
}

.feed-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
}

.feed-card {
  display: flex;
  flex-direction: column;
  min-height: 260px;
  padding: 18px;
}

.feed-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.category-pill {
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  color: var(--accent-text);
  background: var(--accent-soft);
  font-size: 12px;
  font-weight: 800;
}

.feed-card time {
  color: var(--text-muted);
  font-size: 12px;
  white-space: nowrap;
}

.feed-card h2 {
  margin: 16px 0 0;
  font-size: 18px;
  line-height: 1.35;
}

.feed-card p {
  margin: 10px 0 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  color: var(--text-secondary);
  font-size: 14px;
}

.feed-card a {
  margin-top: auto;
  padding-top: 16px;
  font-size: 14px;
  font-weight: 750;
}

.spinning {
  animation: spin 900ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 900px) {
  .feed-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

@media (max-width: 640px) {
  .items-layout {
    padding-top: 78px;
  }

  .items-hero {
    align-items: flex-start;
    flex-direction: column;
  }

  .feed-grid {
    grid-template-columns: 1fr;
  }

  .feed-card {
    min-height: 0;
  }
}
</style>
