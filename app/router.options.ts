import type { RouterConfig } from '@nuxt/schema'

// CSS selector special characters need escaping when used with querySelector
// (e.g. anchor IDs containing dots like #AA.Bibliography-Koenig89)
const escapedSelector = (hash: string) => {
  if (!hash.startsWith('#')) return hash
  return '#' + CSS.escape(hash.slice(1))
}

// https://router.vuejs.org/api/#routeroptions
export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    // Scroll to target id with offset for fixed header
    if (to.hash) {
      const nuxtApp = useNuxtApp()

      // On initial page load (hard refresh) the SSR DOM is already available,
      // so skip the page:finish wait and scroll in the next animation frame.
      // This prevents the top of the page flashing before the hash target is shown.
      if (!from.name) {
        return new Promise((resolve) => {
          requestAnimationFrame(() => {
            const HEADER_OFFSET = 96
            const el = document.querySelector(escapedSelector(to.hash))
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
              resolve({ left: 0, top, behavior: 'instant' })
            } else {
              resolve({ left: 0, top: 0 })
            }
          })
        })
      }

      // Client-side navigation: wait for the new page content to mount first.
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