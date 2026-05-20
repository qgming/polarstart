<script setup lang="ts">
import { computed } from 'vue'
import { AlertCircle, ExternalLink, RefreshCw } from '@lucide/vue'
import { useItNewsStore } from '@/stores/content'

const itNewsStore = useItNewsStore()

const newsItems = computed(() => itNewsStore.items)

const formatDate = (value: string, timestamp: number) => {
  if (timestamp) {
    return new Intl.DateTimeFormat('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp))
  }

  return value || '时间未知'
}

const refreshItems = async () => {
  await itNewsStore.loadItems(true)
}
</script>

<template>
  <main class="it-shell">
    <section class="it-layout">
      <header class="it-hero">
        <h1>IT 动态</h1>

        <button class="refresh-button" type="button" :disabled="itNewsStore.loading" @click="refreshItems">
          <RefreshCw :class="{ spinning: itNewsStore.loading }" :size="16" :stroke-width="2.3" />
          <span>刷新</span>
        </button>
      </header>

      <div v-if="itNewsStore.errorMessage" class="state-card error-card">
        <AlertCircle :size="18" :stroke-width="2.3" />
        <span>{{ itNewsStore.errorMessage }}</span>
      </div>

      <div v-else-if="itNewsStore.loading && !itNewsStore.loaded" class="state-card">
        <RefreshCw class="spinning" :size="18" :stroke-width="2.3" />
        <span>正在读取 IT 动态</span>
      </div>

      <section v-else class="news-list" aria-label="IT 动态列表">
        <a
          v-for="item in newsItems"
          :key="item.link"
          class="news-row"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="news-main">
            <div class="news-meta">
              <span>IT之家</span>
              <time>{{ formatDate(item.created, item.created_at) }}</time>
            </div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </div>

          <ExternalLink class="external-icon" :size="15" :stroke-width="2.3" aria-hidden="true" />
        </a>
      </section>
    </section>
  </main>
</template>

<style scoped>
.it-shell {
  min-height: 100vh;
  background: var(--app-bg);
  color: var(--text-primary);
}

.it-layout {
  width: min(100%, 1120px);
  margin: 0 auto;
  padding: 92px clamp(16px, 4vw, 28px) 56px;
}

.it-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}

.it-hero h1 {
  margin: 0;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.12;
}

.refresh-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid var(--accent-border);
  border-radius: 14px;
  color: var(--accent-text);
  background: var(--accent-soft);
  cursor: pointer;
  font-weight: 750;
}

.refresh-button:disabled {
  cursor: wait;
  opacity: 0.72;
}

.state-card,
.news-list {
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

.news-list {
  overflow: hidden;
}

.news-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 24px;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--card-border);
  transition: background 180ms ease;
}

.news-row:last-child {
  border-bottom: 0;
}

.news-row:hover {
  background: var(--card-bg-hover);
}

.news-main {
  min-width: 0;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
}

.news-meta span {
  color: var(--accent-text);
}

.news-row h2 {
  margin: 8px 0 0;
  font-size: 18px;
  line-height: 1.35;
}

.news-row p {
  margin: 8px 0 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: var(--text-secondary);
  font-size: 14px;
}

.external-icon {
  justify-self: end;
  color: var(--text-muted);
}

.spinning {
  animation: spin 900ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .it-layout {
    padding-top: 78px;
  }

  .it-hero {
    align-items: flex-start;
    flex-direction: column;
  }

  .news-row {
    grid-template-columns: minmax(0, 1fr) 20px;
    padding: 16px 14px;
  }
}
</style>
