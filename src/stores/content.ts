import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export type CategoryKey = 'ai-models' | 'ai-products' | 'industry' | 'paper' | 'tip'

export type AihotItem = {
  id: string
  title: string
  title_en: string | null
  url: string
  source: string
  publishedAt: string | null
  summary: string | null
  category: CategoryKey | null
}

type AihotItemsResponse = {
  count: number
  hasNext: boolean
  nextCursor: string | null
  items: AihotItem[]
}

export type DailySectionItem = {
  title: string
  summary: string | null
  sourceUrl: string
  sourceName: string
}

export type DailySection = {
  label: string
  items: DailySectionItem[]
}

export type DailyReport = {
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

type ApiEnvelope<T> = {
  code: number
  message: string
  data: T[]
}

type WeiboItem = {
  title: string
  hot_value?: number
  link?: string
}

type DouyinItem = {
  title: string
  hot_value?: number
  link?: string
}

type RednoteItem = {
  rank?: number
  title: string
  score?: string
  word_type?: string
  link?: string
}

type ZhihuItem = {
  title: string
  detail?: string
  link?: string
  hot_value_desc?: string
}

type BiliItem = {
  title: string
  link?: string
}

type ToutiaoItem = {
  title: string
  hot_value?: number
  link?: string
}

export type ItNewsItem = {
  title: string
  description: string
  link: string
  created: string
  created_at: number
}

export type SourceKey = 'weibo' | 'douyin' | 'rednote' | 'zhihu' | 'bili' | 'toutiao'

export type TrendCard = {
  id: string
  source: SourceKey
  sourceLabel: string
  title: string
  metric?: string
  link: string
  rank: number
}

export type SourceDefinition = {
  key: SourceKey
  label: string
}

export type SourceState = {
  items: TrendCard[]
  loading: boolean
  loaded: boolean
  errorMessage: string
}

export type SourceGroup = SourceDefinition & SourceState & {
  count: number
}

export const sourceDefinitions: SourceDefinition[] = [
  { key: 'weibo', label: '微博' },
  { key: 'douyin', label: '抖音' },
  { key: 'rednote', label: '小红书' },
  { key: 'zhihu', label: '知乎' },
  { key: 'bili', label: 'B站' },
  { key: 'toutiao', label: '今日头条' }
]

const createSourceState = (): SourceState => ({
  items: [],
  loading: false,
  loaded: false,
  errorMessage: ''
})

const hotApiBases = [
  'https://60s.viki.moe',
  'https://60s.qgming.com',
  'https://api.yanyua.icu',
  'https://60s.7se.cn',
  'https://60s.mizhoubaobei.top',
  'https://api.cczo.cc/60s'
] as const

const shuffleArray = <T>(items: readonly T[]) => {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = current
  }

  return shuffled
}

const createCardId = (source: SourceKey, rank: number, title: string) => {
  return `${source}-${rank}-${title}`
}

const formatHotValue = (value: number | undefined) => {
  return typeof value === 'number' ? value.toLocaleString('zh-CN') : undefined
}

const fetchJson = async <T>(url: string) => {
  const candidates = shuffleArray(hotApiBases)
  const errors: string[] = []

  for (const base of candidates) {
    try {
      const response = await fetch(`${base}${url}`)
      if (!response.ok) throw new Error(`请求失败: ${response.status}`)

      return await response.json() as ApiEnvelope<T>
    } catch (error) {
      const message = error instanceof Error ? error.message : '未知错误'
      errors.push(`${base}: ${message}`)
    }
  }

  throw new Error(`全部 60s 实例请求失败: ${errors.join(' | ')}`)
}

const normalizeWeibo = (items: WeiboItem[]): TrendCard[] => {
  return items.map((item, index) => ({
    id: createCardId('weibo', index + 1, item.title),
    source: 'weibo',
    sourceLabel: '微博',
    title: item.title,
    metric: formatHotValue(item.hot_value),
    link: item.link ?? 'https://s.weibo.com/top/summary',
    rank: index + 1
  }))
}

const normalizeDouyin = (items: DouyinItem[]): TrendCard[] => {
  return items.map((item, index) => ({
    id: createCardId('douyin', index + 1, item.title),
    source: 'douyin',
    sourceLabel: '抖音',
    title: item.title,
    metric: formatHotValue(item.hot_value),
    link: item.link ?? 'https://www.douyin.com/hot',
    rank: index + 1
  }))
}

const normalizeRednote = (items: RednoteItem[]): TrendCard[] => {
  return items.map((item, index) => ({
    id: createCardId('rednote', item.rank ?? index + 1, item.title),
    source: 'rednote',
    sourceLabel: '小红书',
    title: item.title,
    metric: item.score || item.word_type,
    link: item.link ?? 'https://www.xiaohongshu.com/explore',
    rank: item.rank ?? index + 1
  }))
}

const normalizeZhihu = (items: ZhihuItem[]): TrendCard[] => {
  return items.map((item, index) => ({
    id: createCardId('zhihu', index + 1, item.title),
    source: 'zhihu',
    sourceLabel: '知乎',
    title: item.title,
    metric: item.hot_value_desc,
    link: item.link ?? 'https://www.zhihu.com/hot',
    rank: index + 1
  }))
}

const normalizeBili = (items: BiliItem[]): TrendCard[] => {
  return items.map((item, index) => ({
    id: createCardId('bili', index + 1, item.title),
    source: 'bili',
    sourceLabel: 'B站',
    title: item.title,
    link: item.link ?? 'https://www.bilibili.com/v/popular/rank/all',
    rank: index + 1
  }))
}

const normalizeToutiao = (items: ToutiaoItem[]): TrendCard[] => {
  return items.map((item, index) => ({
    id: createCardId('toutiao', index + 1, item.title),
    source: 'toutiao',
    sourceLabel: '今日头条',
    title: item.title,
    metric: formatHotValue(item.hot_value),
    link: item.link ?? 'https://www.toutiao.com/hot-event/hot-board/',
    rank: index + 1
  }))
}

export const useHotStore = defineStore('hot', () => {
  const sourceStates = reactive<Record<SourceKey, SourceState>>({
    weibo: createSourceState(),
    douyin: createSourceState(),
    rednote: createSourceState(),
    zhihu: createSourceState(),
    bili: createSourceState(),
    toutiao: createSourceState()
  })

  const sourceGroups = computed<SourceGroup[]>(() => {
    return sourceDefinitions.map((definition) => {
      const state = sourceStates[definition.key]

      return {
        ...definition,
        ...state,
        count: state.items.length
      }
    })
  })

  const sourceFetchers: Record<SourceKey, () => Promise<TrendCard[]>> = {
    weibo: async () => {
      const response = await fetchJson<WeiboItem>('/v2/weibo?encoding=json')
      return normalizeWeibo(response.data ?? [])
    },
    douyin: async () => {
      const response = await fetchJson<DouyinItem>('/v2/douyin?encoding=json')
      return normalizeDouyin(response.data ?? [])
    },
    rednote: async () => {
      const response = await fetchJson<RednoteItem>('/v2/rednote?encoding=json')
      return normalizeRednote(response.data ?? [])
    },
    zhihu: async () => {
      const response = await fetchJson<ZhihuItem>('/v2/zhihu?encoding=json')
      return normalizeZhihu(response.data ?? [])
    },
    bili: async () => {
      const response = await fetchJson<BiliItem>('/v2/bili?encoding=json')
      return normalizeBili(response.data ?? [])
    },
    toutiao: async () => {
      const response = await fetchJson<ToutiaoItem>('/v2/toutiao?encoding=json')
      return normalizeToutiao(response.data ?? [])
    }
  }

  const loadSource = async (source: SourceKey, force = false) => {
    const state = sourceStates[source]

    if (state.loading) return
    if (state.loaded && !force) return

    state.loading = true
    state.errorMessage = ''

    try {
      state.items = await sourceFetchers[source]()
      state.loaded = true
    } catch (error) {
      state.errorMessage = error instanceof Error ? error.message : '热点加载失败'

      if (!state.loaded) {
        state.items = []
      }
    } finally {
      state.loading = false
    }
  }

  const preloadSources = async (force = false) => {
    await Promise.allSettled(sourceDefinitions.map((source) => loadSource(source.key, force)))
  }

  return {
    sourceGroups,
    sourceStates,
    loadSource,
    preloadSources
  }
})

export const useAihotStore = defineStore('aihot-content', () => {
  const daily = ref<DailyReport | null>(null)
  const dailyLoading = ref(false)
  const dailyLoaded = ref(false)
  const dailyErrorMessage = ref('')

  const items = ref<AihotItem[]>([])
  const itemsLoading = ref(false)
  const itemsLoaded = ref(false)
  const itemsErrorMessage = ref('')

  const loadDaily = async (force = false) => {
    if (dailyLoading.value) return
    if (dailyLoaded.value && !force) return

    dailyLoading.value = true
    dailyErrorMessage.value = ''

    try {
      const response = await fetch('/aihot-api/daily')
      if (!response.ok) throw new Error(`日报请求失败: ${response.status}`)

      daily.value = await response.json() as DailyReport
      dailyLoaded.value = true
    } catch (error) {
      dailyErrorMessage.value = error instanceof Error ? error.message : 'AI HOT 数据加载失败'

      if (!dailyLoaded.value) {
        daily.value = null
      }
    } finally {
      dailyLoading.value = false
    }
  }

  const loadItems = async (force = false) => {
    if (itemsLoading.value) return
    if (itemsLoaded.value && !force) return

    itemsLoading.value = true
    itemsErrorMessage.value = ''

    try {
      const response = await fetch('/aihot-api/items?mode=selected&take=30')
      if (!response.ok) throw new Error(`动态请求失败: ${response.status}`)

      const data = await response.json() as AihotItemsResponse
      items.value = data.items
      itemsLoaded.value = true
    } catch (error) {
      itemsErrorMessage.value = error instanceof Error ? error.message : 'AI HOT 动态加载失败'

      if (!itemsLoaded.value) {
        items.value = []
      }
    } finally {
      itemsLoading.value = false
    }
  }

  const preloadAihot = async (force = false) => {
    await Promise.allSettled([loadDaily(force), loadItems(force)])
  }

  return {
    daily,
    dailyLoading,
    dailyLoaded,
    dailyErrorMessage,
    items,
    itemsLoading,
    itemsLoaded,
    itemsErrorMessage,
    loadDaily,
    loadItems,
    preloadAihot
  }
})

export const useItNewsStore = defineStore('it-news', () => {
  const items = ref<ItNewsItem[]>([])
  const loading = ref(false)
  const loaded = ref(false)
  const errorMessage = ref('')

  const loadItems = async (force = false) => {
    if (loading.value) return
    if (loaded.value && !force) return

    loading.value = true
    errorMessage.value = ''

    try {
      const response = await fetchJson<ItNewsItem>('/v2/it-news?encoding=json&limit=50')
      items.value = response.data ?? []
      loaded.value = true
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'IT 动态加载失败'

      if (!loaded.value) {
        items.value = []
      }
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    loaded,
    errorMessage,
    loadItems
  }
})
