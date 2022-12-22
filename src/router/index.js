import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component:  () => import('../views/HomeView.vue')
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/scanner',
      name: 'scanner',
      component: () => import('../views/ScannerView.vue')
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/ReportView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
  ]
})

export default router
