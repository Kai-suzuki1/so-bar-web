import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'

const visitHome = () => {
  const store = useAuthStore()
  const { token } = storeToRefs(store)

  return token.value && { name: 'home' }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'top',
      components: {
        Header: () => import('../components/TheHeader.vue'),
        default: () => import('../views/TopIndex.vue')
      },
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      components: {
        Header: () => import('../components/TheHeader.vue'),
        default: () => import('../views/SignUp.vue')
      },
      props: {
        Header: { buttonVisibility: false }
      },
      beforeEnter: [visitHome],
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        Header: () => import('../components/TheHeader.vue'),
        default: () => import('../views/LogIn.vue')
      },
      props: {
        Header: { buttonVisibility: false }
      },
      meta: { requiresAuth: false }
    },
    {
      // TODO change the temporary code for home
      path: '/notes',
      name: 'home',
      components: {
        Header: () => import('../components/TheHeader.vue'),
        default: () => import('../views/TopNotes.vue')
      },
      props: {
        Header: { buttonVisibility: false }
      },
      meta: { requiresAuth: false }
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      components: {
        default: () => import('../views/NotFound.vue')
      },
      props: {
        Header: { buttonVisibility: false }
      },
      meta: { requiresAuth: false }
    }
  ]
})

export default router
