<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { AlertCircle, ExternalLink, Newspaper, RefreshCw, Sparkles } from '@lucide/vue'

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

type DailySectionItem = {
  title: string
  summary: string | null
  sourceUrl: string
  sourceName: string
}

type DailySection = {
  label: string
  items: DailySectionItem[]
}

type DailyReport = {
  date: string
  generatedAt: string
  windowStart: string
  windowEnd: string
  lead: {
    title: string
    leadParagraph: string
  } | null
  sections: DailySection[]
  flashes: Array<{
    title: string
    sourceName: string
    sourceUrl: string
    publishedAt: string | null
  }>
}

type CategoryKey = 'ai-models' | 'ai-products' | 'industry' | 'paper' | 'tip'

const categoryLabels: Record<CategoryKey, string> = {
  'ai-models': '模型',
  'ai-products': '产品',
  industry: '行业',
  paper: '论文',
  tip: '观点'
}

const daily = ref<DailyReport | null>(null)
const hotItems = ref<HotItem[]>([])
const loading = ref(true)
const errorMessage = ref('')

const featuredSections = computed(() => {
  return daily.value?.sections
    .map((section) => ({
      ...section,
      items: section.items.slice(0, 2)
    }))
    .filter((section) => section.items.length > 0)
    .slice(0, 4) ?? []
})

const leadTitle = computed(() => {
  return daily.value?.lead?.title ?? daily.value?.sections.find((section) => section.items.length > 0)?.items[0]?.title ?? '今日 AI 热点'
})

const leadParagraph = computed(() => {
  return daily.value?.lead?.leadParagraph
    ?? daily.value?.sections.find((section) => section.items.length > 0)?.items[0]?.summary
    ?? '来自 AI HOT 的精选 AI 动态、模型发布、产品更新和行业观察。'
})

const formatDate = (value: string | null) => {
  if (!value) return '时间未知'
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value))
}

const formatDay = (value: string | undefined) => {
  if (!value) return '最新日报'
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }).format(new Date(`${value}T00:00:00Z`))
}

const categoryText = (category: CategoryKey | null) => {
  return category ? categoryLabels[category] : '未分类'
}

const fetchAihot = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const [dailyResponse, itemsResponse] = await Promise.all([
      fetch('https://aihot.virxact.com/api/public/daily'),
      fetch('https://aihot.virxact.com/api/public/items?mode=selected&take=12')
    ])

    if (!dailyResponse.ok) throw new Error(`日报请求失败: ${dailyResponse.status}`)
    if (!itemsResponse.ok) throw new Error(`动态请求失败: ${itemsResponse.status}`)

    daily.value = await dailyResponse.json() as DailyReport
    const itemsData = await itemsResponse.json() as HotItemsResponse
    hotItems.value = itemsData.items
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'AI HOT 数据加载失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void fetchAihot()
})
</script>

<template>
  <main class="hot-shell">
    <section class="hot-layout">
      <header class="hot-hero">
        <div class="hero-copy">
          <p class="hot-kicker">AI HOT</p>
          <h1>AI 热点</h1>
          <p>匿名读取 AI HOT 精选动态和每日精编日报，快速扫过模型、产品、行业、论文与观点。</p>
        </div>

        <button class="refresh-button" type="button" :disabled="loading" @click="fetchAihot">
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
        <span>正在读取 AI HOT 最新内容</span>
      </div>

      <template v-else>
        <section class="daily-card">
          <div class="daily-meta">
            <span class="daily-icon"><Newspaper :size="18" :stroke-width="2.3" /></span>
            <span>{{ formatDay(daily?.date) }}</span>
          </div>
          <h2>{{ leadTitle }}</h2>
          <p>{{ leadParagraph }}</p>
        </section>

        <section class="section-grid" aria-label="AI HOT 日报分类">
          <article v-for="section in featuredSections" :key="section.label" class="section-card">
            <div class="section-title">
              <Sparkles :size="16" :stroke-width="2.3" />
              <h2>{{ section.label }}</h2>
            </div>
            <a
              v-for="item in section.items"
              :key="item.sourceUrl"
              class="daily-link"
              :href="item.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>{{ item.title }}</strong>
              <span>{{ item.sourceName }}</span>
            </a>
          </article>
        </section>

        <section class="feed-section" aria-labelledby="feed-title">
          <div class="feed-heading">
            <h2 id="feed-title">精选动态</h2>
            <a class="source-link" href="https://aihot.virxact.com/" target="_blank" rel="noopener noreferrer">
              <span>打开 AI HOT</span>
              <ExternalLink :size="15" :stroke-width="2.3" />
            </a>
          </div>

          <div class="feed-list">
            <article v-for="item in hotItems" :key="item.id" class="feed-card">
              <div class="feed-card-head">
                <span class="category-pill">{{ categoryText(item.category) }}</span>
                <time>{{ formatDate(item.publishedAt) }}</time>
              </div>
              <h3>{{ item.title }}</h3>
              <p v-if="item.summary">{{ item.summary }}</p>
              <a :href="item.url" target="_blank" rel="noopener noreferrer">
                <span>{{ item.source }}</span>
                <ExternalLink :size="14" :stroke-width="2.3" />
              </a>
            </article>
          </div>
        </section>
      </template>
    </section>
  </main>
</template>

<style scoped>
.hot-shell {
  min-height: 100vh;
  background: var(--app-bg);
  color: var(--text-primary);
}

.hot-layout {
  width: min(100%, 1120px);
  margin: 0 auto;
  padding: 92px clamp(16px, 4vw, 28px) 56px;
}

.hot-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}

.hero-copy {
  max-width: 720px;
}

.hot-kicker {
  margin: 0 0 8px;
  color: var(--accent-text);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.hot-hero h1 {
  margin: 0;
  font-size: clamp(36px, 6vw, 68px);
  line-height: 1;
}

.hot-hero p,
.daily-card p,
.feed-card p {
  color: var(--text-secondary);
}

.hot-hero p {
  margin: 14px 0 0;
  font-size: 17px;
}

.refresh-button,
.source-link,
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
.daily-card,
.section-card,
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

.daily-card {
  padding: clamp(22px, 4vw, 34px);
}

.daily-meta,
.section-title,
.feed-card-head,
.feed-heading {
  display: flex;
  align-items: center;
}

.daily-meta {
  gap: 10px;
  color: var(--accent-text);
  font-weight: 800;
}

.daily-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: var(--accent-soft);
}

.daily-card h2 {
  margin: 18px 0 0;
  max-width: 860px;
  font-size: clamp(26px, 4vw, 40px);
  line-height: 1.16;
}

.daily-card p {
  margin: 14px 0 0;
  max-width: 900px;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.section-card {
  padding: 18px;
}

.section-title {
  gap: 8px;
  color: var(--accent-text);
}

.section-title h2,
.feed-heading h2 {
  margin: 0;
  font-size: 18px;
}

.daily-link {
  display: block;
  margin-top: 16px;
  color: var(--text-primary);
  text-decoration: none;
}

.daily-link strong,
.daily-link span {
  display: block;
}

.daily-link strong {
  line-height: 1.35;
}

.daily-link span {
  margin-top: 6px;
  color: var(--text-muted);
  font-size: 13px;
}

.feed-section {
  margin-top: 28px;
}

.feed-heading {
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.feed-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.feed-card {
  display: flex;
  flex-direction: column;
  min-height: 260px;
  padding: 18px;
}

.feed-card-head {
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

.feed-card h3 {
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
  .section-grid,
  .feed-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .hot-layout {
    padding-top: 78px;
  }

  .hot-hero {
    align-items: flex-start;
    flex-direction: column;
  }

  .section-grid,
  .feed-list {
    grid-template-columns: 1fr;
  }

  .feed-card {
    min-height: 0;
  }
}
</style>
