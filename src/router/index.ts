import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
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
      path: '/aihot',
      name: 'aihot-daily',
      component: AihotView
    },
    {
      path: '/aihot/items',
      name: 'aihot-items',
      component: AihotItemsView
    }
  ]
})

export default router
