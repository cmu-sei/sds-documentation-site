export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip ONLY during prerendering to prevent memory leaks
  // But allow normal SSR for dev/production
  const isPrerendering = import.meta.server && (process.env.PRERENDER === 'true' || process.env.prerender === 'true')
  
  if (isPrerendering) {
    // During prerendering, provide empty arrays
    nuxtApp.provide('globalSearchData', [])
    nuxtApp.provide('globalNavigation', [])
    return
  }

  // Load navigation on both server and client for SSR/hydration
  const { data: navigation } = await useAsyncData('global-navigation', async () => {
    const nav = await queryCollectionNavigation('content')
    // Normalize paths with trailing slashes for consistency between SSR and client
    return normalizeNavigationPaths(nav)
  }, {
    lazy: false,
    server: true, // Enable server-side for SSR
    default: () => [],
  })

  // Provide the data directly
  nuxtApp.provide('globalSearchData', null)
  nuxtApp.provide('globalNavigation', navigation.value ?? [])
})
