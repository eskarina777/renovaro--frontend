import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 0, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category/:id',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
      props: true,
    },
    {
      path: '/subcategory/:id',
      name: 'subcategory',
      component: () => import('../views/SubcategoryView.vue'),
    },
    {
      path: '/ad/:id',
      name: 'ad',
      component: () => import('../views/AdView.vue'),
    },
    {
      path: '/search-results',
      name: 'search-results',
      component: () => import('../views/SearchResultsView.vue'),
    },
    {
      path: '/coming-soon',
      name: 'coming-soon',
      component: () => import('../components/sections/ComingSoon.vue'),
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: () => import('../views/InboxView.vue'),
      meta: { requiresAuth: true, hideFooterLinks: true, hideFooter: true },
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import('../views/NotificationView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/publish-ad',
      name: 'publish-ad',
      component: () => import('../views/PublishAdView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/client-profile',
      name: 'client-profile',
      component: () => import('../views/ClientProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/provider-profile',
      name: 'provider-profile',
      component: () => import('../views/ProviderProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/email-confirmation',
      name: 'email-confirmation',
      component: () => import('../views/EmailConfirmation.vue'),
    },
  ],
})
router.beforeEach((to) => {
  const auth = useAuthStore()
  // if (!auth.isInitialized) {
  //   return true
  // }
  if (to.meta.requiresAuth && !auth.user) {
    auth.openLoginModal()
    return { name: 'home' }
  }
})

export default router
