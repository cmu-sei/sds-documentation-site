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

  // Get app config to check for navigation array
  const appConfig = useAppConfig()
  
  // Load navigation on both server and client for SSR/hydration
  const { data: navigation } = await useAsyncData('global-navigation', async () => {
    // Use navigation from app config if defined, otherwise query collection
    if (appConfig.navigation && Array.isArray(appConfig.navigation) && appConfig.navigation.length > 0) {
      // Use the navigation from app config and normalize the paths
      return normalizeNavigationPaths(appConfig.navigation.map(item => ({
        ...item,
        path: item.path,
        _path: item.path,
        fromAppConfig: true,
      })))
    }
    
    // Fallback to querying collection navigation
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
