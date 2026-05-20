<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { AlertCircle, Newspaper, RefreshCw } from '@lucide/vue'
import { useAihotStore } from '@/stores/content'

const aihotStore = useAihotStore()
const activeSectionLabel = ref('')

const featuredSections = computed(() => {
  return aihotStore.daily?.sections.filter((section) => section.items.length > 0) ?? []
})

const activeSection = computed(() => {
  return featuredSections.value.find((section) => section.label === activeSectionLabel.value) ?? featuredSections.value[0]
})

const leadTitle = computed(() => {
  return aihotStore.daily?.lead?.title ?? aihotStore.daily?.sections.find((section) => section.items.length > 0)?.items[0]?.title ?? '今日 AI 热点'
})

const leadParagraph = computed(() => {
  return aihotStore.daily?.lead?.leadParagraph
    ?? aihotStore.daily?.sections.find((section) => section.items.length > 0)?.items[0]?.summary
    ?? '来自 AI HOT 的精选 AI 动态、模型发布、产品更新和行业观察。'
})

const formatDay = (value: string | undefined) => {
  if (!value) return '最新日报'
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }).format(new Date(`${value}T00:00:00Z`))
}

const fetchAihot = async () => {
  await aihotStore.loadDaily(true)
}

watch(featuredSections, (sections) => {
  if (!sections.length) {
    activeSectionLabel.value = ''
    return
  }

  if (!sections.some((section) => section.label === activeSectionLabel.value)) {
    activeSectionLabel.value = sections[0].label
  }
})
</script>

<template>
  <main class="hot-shell">
    <section class="hot-layout">
      <header class="hot-hero">
        <div class="hero-copy">
          <h1>AI 日报</h1>
        </div>

        <button class="refresh-button" type="button" :disabled="aihotStore.dailyLoading" @click="fetchAihot">
          <RefreshCw :class="{ spinning: aihotStore.dailyLoading }" :size="16" :stroke-width="2.3" />
          <span>刷新</span>
        </button>
      </header>

      <div v-if="aihotStore.dailyErrorMessage" class="state-card error-card">
        <AlertCircle :size="18" :stroke-width="2.3" />
        <span>{{ aihotStore.dailyErrorMessage }}</span>
      </div>

      <div v-else-if="aihotStore.dailyLoading && !aihotStore.dailyLoaded" class="state-card">
        <RefreshCw class="spinning" :size="18" :stroke-width="2.3" />
        <span>正在读取 AI HOT 最新内容</span>
      </div>

      <template v-else>
        <section class="daily-card">
          <div class="daily-meta">
            <span class="daily-icon"><Newspaper :size="18" :stroke-width="2.3" /></span>
            <span>{{ formatDay(aihotStore.daily?.date) }}</span>
          </div>
          <h2>{{ leadTitle }}</h2>
          <p>{{ leadParagraph }}</p>
        </section>

        <section class="section-browser" aria-label="AI HOT 日报分类">
          <div class="section-tabs" role="tablist" aria-label="日报分类">
            <button
              v-for="section in featuredSections"
              :key="section.label"
              class="section-tab"
              :class="{ active: section.label === activeSection?.label }"
              type="button"
              role="tab"
              :aria-selected="section.label === activeSection?.label"
              @click="activeSectionLabel = section.label"
            >
              <span>{{ section.label }}</span>
              <strong>{{ section.items.length }}</strong>
            </button>
          </div>

          <article v-if="activeSection" class="section-panel">
            <div class="daily-grid">
              <a
                v-for="item in activeSection.items"
                :key="item.sourceUrl"
                class="daily-card-link"
                :href="item.sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="daily-card-head">
                  <span class="category-pill">{{ activeSection.label }}</span>
                </div>
                <strong>{{ item.title }}</strong>
                <p v-if="item.summary">{{ item.summary }}</p>
                <span class="source-name">{{ item.sourceName }}</span>
              </a>
            </div>
          </article>
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

.hot-hero h1 {
  margin: 0;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.12;
}

.daily-card p,
.daily-card-link p {
  color: var(--text-secondary);
}

.refresh-button {
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
.daily-card {
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

.daily-meta {
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

.section-browser {
  margin-top: 14px;
}

.section-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.section-tab {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid var(--card-border);
  border-radius: 16px;
  color: var(--text-secondary);
  background: var(--control-bg);
  cursor: pointer;
  font-weight: 750;
  transition: color 180ms ease, background 180ms ease, border-color 180ms ease;
}

.section-tab:hover,
.section-tab.active {
  color: var(--accent-text);
  background: var(--accent-soft);
  border-color: var(--accent-border);
}

.section-tab strong {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--card-bg);
  font-size: 12px;
}

.section-panel {
  padding: 0;
}

.daily-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.daily-card-link {
  display: flex;
  flex-direction: column;
  min-height: 260px;
  padding: 18px;
  color: var(--text-primary);
  text-decoration: none;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 18px;
  box-shadow: var(--card-shadow);
}

.daily-card-link strong,
.daily-card-link .source-name {
  display: block;
}

.daily-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 16px;
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

.daily-card-link strong {
  line-height: 1.35;
  font-size: 18px;
}

.daily-card-link p {
  margin: 8px 0 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  color: var(--text-secondary);
  font-size: 14px;
}

.daily-card-link .source-name {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
  color: var(--accent-text);
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
  .daily-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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

  .daily-card-link {
    min-height: 0;
  }
}
</style>
