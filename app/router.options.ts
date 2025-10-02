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
          const headerOffset = 96 // 24 * 4 = 96px (scroll-mt-24)

          setTimeout(() => {
            const el: HTMLElement | null = document.querySelector(to.hash)
            if (el) {
              const elementPosition = el.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              })
              resolve({ left: 0, top: offsetPosition })
            } else {
              resolve({ el: to.hash, top: headerOffset })
            }
          }, 100)
        })
      })
    }

    return { left: 0, top: 0 }
  },
} satisfies RouterConfig