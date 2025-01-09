import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default {
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    // Scroll to target id
    if (to.hash) {
      const nuxtApp = useNuxtApp()
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce('page:finish', () => {
          const el: HTMLElement | null = document.querySelector(to.hash)
          const pageContent: HTMLElement | null = document.querySelector('#page-content')
          const scrollTop = el && pageContent ? pageContent.scrollTop = el.offsetTop - pageContent.offsetTop : 0
          if (pageContent) {
            resolve({ left: 0, top: scrollTop })
          } else {
            resolve({ el: to.hash })
          }
        })
      })
    }

    return { left: 0, top: 0 }
  },
} satisfies RouterConfig