export default defineNuxtPlugin(async (nuxtApp) => {
  // Only load on client side to reduce SSG memory usage
  if (import.meta.server && process.env.PRERENDER) {
    nuxtApp.provide('globalSearchData', ref(null))
    nuxtApp.provide('globalNavigation', ref(null))
    return
  }

  // Load search data once at app initialization
  const { data: searchData } = await useAsyncData('global-search-data', () => {
    return queryCollectionSearchSections('content')
  })

  // Load global navigation once at app initialization
  const { data: navigation } = await useAsyncData('global-navigation', () => {
    return queryCollectionNavigation('content')
  })

  // Provide globally to all components
  nuxtApp.provide('globalSearchData', searchData)
  nuxtApp.provide('globalNavigation', navigation)
})
