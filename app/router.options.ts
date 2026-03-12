import type { RouterConfig } from '@nuxt/schema'

const stripHashPrefix = (hash: string) => hash.startsWith('#') ? hash.slice(1) : hash

const decodeHash = (value: string) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const getElementFromHash = (hash: string) => {
  const rawId = stripHashPrefix(hash)
  if (!rawId) return null

  const decodedId = decodeHash(rawId)

  const byDecodedId = document.getElementById(decodedId)
  if (byDecodedId) return byDecodedId

  const byRawId = document.getElementById(rawId)
  if (byRawId) return byRawId

  const selectorId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
    ? CSS.escape(decodedId)
    : decodedId

  const byEscapedDecoded = document.querySelector(`#${selectorId}`)
  if (byEscapedDecoded) return byEscapedDecoded

  if (decodedId !== rawId) {
    const rawSelectorId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
      ? CSS.escape(rawId)
      : rawId

    return document.querySelector(`#${rawSelectorId}`)
  }

  return null
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
            const el = getElementFromHash(to.hash)
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