// Server-side navigation cache to speed up SSG
import type { ContentNavigationItem } from '@nuxt/content'
import { queryCollectionNavigation } from '@nuxt/content/server'

const navigationCache = new Map<string, ContentNavigationItem[]>()

export default defineEventHandler(async (event) => {
  const path = event.path.replace('/api/navigation/', '')
  
  // Check cache first
  if (navigationCache.has(path)) {
    return navigationCache.get(path)
  }

  // Fetch navigation data
  const navigation = await queryCollectionNavigation(event, 'content')
  
  // Filter based on path if provided
  let result = navigation
  if (path && path !== 'all') {
    result = navigation.filter((item: ContentNavigationItem) => 
      item.path.startsWith(`/${path}/`) || item.path === `/${path}`
    )
  }

  // Cache the result
  navigationCache.set(path, result)
  
  return result
})
