import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/info-cards',
      name: 'info-cards',
      component: () => import('../views/InfoCardsView.vue')
    },
    {
      path: '/web-categories',
      name: 'web-categories',
      component: () => import('../views/WebCategoriesView.vue')
    }
  ]
})

export default router