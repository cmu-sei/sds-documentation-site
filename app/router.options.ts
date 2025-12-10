import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default {
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    // Scroll to target id with offset for fixed header
    if (to.hash) {
      const nuxtApp = useNuxtApp()
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce('page:finish', () => {
          setTimeout(() => {
            const { scrollToElement } = useScrollToHash()
            const offsetPosition = scrollToElement(to.hash)
            resolve({ left: 0, top: offsetPosition })
          }, 100)
        })
      })
    }

    return { left: 0, top: 0 }
  },
} satisfies RouterConfig