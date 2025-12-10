/**
 * Plugin to manage Nuxt Content client-side cache
 * Prevents QuotaExceededError by clearing old cache data
 */
export default defineNuxtPlugin(() => {
  // Only run on client side
  if (import.meta.client) {
    try {
      // Clear any existing Nuxt Content localStorage cache
      // This prevents QuotaExceededError on large documentation sites
      const contentKeys = Object.keys(localStorage).filter(key => 
        key.startsWith('content_') || key.startsWith('nuxt-content')
      )
      
      contentKeys.forEach(key => {
        try {
          localStorage.removeItem(key)
        } catch {
          // Ignore errors when clearing
          console.debug(`Could not clear localStorage key: ${key}`)
        }
      })
      
      // Override localStorage.setItem for content-related keys to prevent caching
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = function(key: string, value: string) {
        // Prevent Nuxt Content from caching in localStorage
        if (key.startsWith('content_') || key.startsWith('nuxt-content')) {
          console.debug(`Skipping localStorage cache for: ${key}`)
          return
        }
        // Allow other keys to be stored normally
        return originalSetItem.call(this, key, value)
      }
    } catch (error) {
      console.warn('Could not manage content cache:', error)
    }
  }
})
