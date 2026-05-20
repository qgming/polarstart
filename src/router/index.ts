import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HotView from '@/views/HotView.vue'
import ItNewsView from '@/views/ItNewsView.vue'
import AihotView from '@/views/AihotView.vue'
import AihotItemsView from '@/views/AihotItemsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hot',
      name: 'hot',
      component: HotView
    },
    {
      path: '/it-news',
      name: 'it-news',
      component: ItNewsView
    },
    {
      path: '/aihot',
      name: 'aihot-daily',
      component: AihotView
    },
    {
      path: '/ainews',
      name: 'ainews',
      component: AihotItemsView
    }
  ]
})

export default router
