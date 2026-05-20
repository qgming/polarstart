<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertCircle, ExternalLink, RefreshCw } from '@lucide/vue'
import { useHotStore, type SourceGroup, type SourceKey } from '@/stores/content'

const hotStore = useHotStore()
const activeSource = ref<SourceKey>('weibo')

const activeGroup = computed(() => {
  return hotStore.sourceGroups.find((group) => group.key === activeSource.value) ?? hotStore.sourceGroups[0]
})

const selectSource = (source: SourceKey) => {
  activeSource.value = source
  void hotStore.loadSource(source)
}

const refreshActiveSource = () => {
  void hotStore.loadSource(activeSource.value, true)
}

const countText = (group: SourceGroup) => {
  if (group.loading && !group.loaded) return '...'
  if (group.errorMessage && !group.loaded) return '!'
  if (!group.loaded) return '-'
  return String(group.count)
}
</script>

<template>
  <main class="hot-shell">
    <section class="hot-layout">
      <header class="hot-hero">
        <div class="hero-copy">
          <h1>全网热点</h1>
        </div>

        <button class="refresh-button" type="button" :disabled="activeGroup?.loading" @click="refreshActiveSource">
          <RefreshCw :class="{ spinning: activeGroup?.loading }" :size="16" :stroke-width="2.3" />
          <span>刷新当前榜单</span>
        </button>
      </header>

      <section class="source-browser" aria-label="全网热点来源">
        <div class="source-tabs" role="tablist" aria-label="热点来源">
          <button
            v-for="group in hotStore.sourceGroups"
            :key="group.key"
            class="source-tab"
            :class="{ active: group.key === activeGroup?.key }"
            type="button"
            role="tab"
            :aria-selected="group.key === activeGroup?.key"
            @click="selectSource(group.key)"
          >
            <span>{{ group.label }}</span>
            <strong>{{ countText(group) }}</strong>
          </button>
        </div>

        <div v-if="activeGroup?.errorMessage" class="state-card error-card inline-state">
          <AlertCircle :size="18" :stroke-width="2.3" />
          <span>{{ activeGroup.errorMessage }}</span>
        </div>

        <div v-else-if="activeGroup?.loading && !activeGroup.loaded" class="state-card inline-state">
          <RefreshCw class="spinning" :size="18" :stroke-width="2.3" />
          <span>正在读取 {{ activeGroup.label }} 热榜</span>
        </div>

        <div v-else-if="activeGroup && activeGroup.items.length" class="trend-list">
          <a
            v-for="item in activeGroup.items"
            :key="item.id"
            class="trend-row"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="rank-number" :class="{ top: item.rank <= 3 }">{{ item.rank }}</span>

            <div class="trend-main">
              <h2>{{ item.title }}</h2>
              <div class="trend-meta">
                <span>{{ item.sourceLabel }}</span>
                <span v-if="item.metric">{{ item.metric }}</span>
              </div>
            </div>

            <ExternalLink class="external-icon" :size="15" :stroke-width="2.3" aria-hidden="true" />
          </a>
        </div>

        <div v-else-if="activeGroup?.loading" class="state-card inline-state">
          <RefreshCw class="spinning" :size="18" :stroke-width="2.3" />
          <span>正在更新 {{ activeGroup.label }} 热榜</span>
        </div>

        <div v-else class="state-card inline-state">
          <span>{{ activeGroup?.label ?? '当前榜单' }} 暂时没有可显示的数据</span>
        </div>
      </section>
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
  max-width: 760px;
}

.hot-hero h1 {
  margin: 0;
  font-size: clamp(28px, 4vw, 40px);
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
.trend-list {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: 22px;
}

.state-card {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 72px;
  padding: 0 20px;
  color: var(--text-secondary);
}

.inline-state {
  margin-top: 0;
}

.error-card {
  color: #dc2626;
}

.source-browser {
  margin-top: 0;
}

.source-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.source-tab {
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

.source-tab:hover,
.source-tab.active {
  color: var(--accent-text);
  background: var(--accent-soft);
  border-color: var(--accent-border);
}

.source-tab strong {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--card-bg);
  font-size: 12px;
}

.trend-list {
  overflow: hidden;
}

.trend-row {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 24px;
  align-items: center;
  gap: 12px;
  min-height: 62px;
  padding: 12px 16px;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--card-border);
  transition: background 180ms ease;
}

.trend-row:last-child {
  border-bottom: 0;
}

.trend-row:hover {
  background: var(--card-bg-hover);
}

.rank-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 11px;
  color: var(--text-muted);
  background: var(--control-bg);
  font-size: 14px;
  font-weight: 850;
}

.rank-number.top {
  color: var(--accent-text);
  background: var(--accent-soft);
}

.trend-main {
  min-width: 0;
}

.trend-main h2 {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  line-height: 1.35;
  font-weight: 750;
}

.trend-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 650;
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
  .hot-layout {
    padding-top: 78px;
  }

  .hot-hero {
    align-items: flex-start;
    flex-direction: column;
  }

  .trend-row {
    grid-template-columns: 34px minmax(0, 1fr) 20px;
    gap: 10px;
    padding: 12px;
  }

  .rank-number {
    width: 30px;
    height: 30px;
  }
}
</style>
