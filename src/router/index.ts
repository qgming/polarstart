import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HotView from '@/views/HotView.vue'
import ItNewsView from '@/views/ItNewsView.vue'
import AihotView from '@/views/AihotView.vue'
import AihotItemsView from '@/views/AihotItemsView.vue'

const SITE_URL = 'https://s.qgming.com'
const SITE_NAME = 'PolarStart'
const DEFAULT_TITLE = `${SITE_NAME} - 搜索起始页、全网热点与 AI 日报`
const DEFAULT_DESCRIPTION =
  'PolarStart 是一个轻量信息起始页，聚合首页搜索、Bing 每日壁纸、全网热点、IT 动态、AI 日报和 AI 动态，快速浏览每日热门资讯。'

const routeMeta = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION
  },
  hot: {
    title: `全网热点 - ${SITE_NAME}`,
    description: '聚合微博、抖音、小红书、知乎、B 站、今日头条等平台热榜，快速查看全网热门话题。'
  },
  itNews: {
    title: `IT 动态 - ${SITE_NAME}`,
    description: '聚合 IT 之家等科技资讯来源，浏览最新互联网、数码、软件和科技行业动态。'
  },
  aihotDaily: {
    title: `AI 日报 - ${SITE_NAME}`,
    description: '每日 AI 热点聚合，覆盖大模型、AI 产品、行业动态、论文和实用技巧。'
  },
  aiNews: {
    title: `AI 动态 - ${SITE_NAME}`,
    description: '精选 AI 行业动态与热门资讯，持续关注人工智能、大模型和产品更新。'
  }
} as const

const setMetaContent = (selector: string, content: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector)
  if (element) element.content = content
}

const setCanonicalUrl = (href: string) => {
  const element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (element) element.href = href
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: routeMeta.home
    },
    {
      path: '/hot',
      name: 'hot',
      component: HotView,
      meta: routeMeta.hot
    },
    {
      path: '/it-news',
      name: 'it-news',
      component: ItNewsView,
      meta: routeMeta.itNews
    },
    {
      path: '/aihot',
      name: 'aihot-daily',
      component: AihotView,
      meta: routeMeta.aihotDaily
    },
    {
      path: '/ainews',
      name: 'ainews',
      component: AihotItemsView,
      meta: routeMeta.aiNews
    }
  ]
})

router.afterEach((to) => {
  if (typeof document === 'undefined') return

  const title = typeof to.meta.title === 'string' ? to.meta.title : DEFAULT_TITLE
  const description = typeof to.meta.description === 'string' ? to.meta.description : DEFAULT_DESCRIPTION
  const canonicalUrl = new URL(to.path, SITE_URL).toString()

  document.title = title
  setCanonicalUrl(canonicalUrl)
  setMetaContent('meta[name="description"]', description)
  setMetaContent('meta[property="og:title"]', title)
  setMetaContent('meta[property="og:description"]', description)
  setMetaContent('meta[property="og:url"]', canonicalUrl)
  setMetaContent('meta[name="twitter:title"]', title)
  setMetaContent('meta[name="twitter:description"]', description)
})

export default router
