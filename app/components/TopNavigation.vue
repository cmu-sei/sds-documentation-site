<template>
  <ul
    v-if="Array.isArray(topNavItems) && topNavItems.length > 0"
    class="flex"
  >
    <li
      v-for="link of topNavItems"
      :key="link.path"
    >
      <NuxtLink
        :to="link.path"
        class="tab tab-underline tab-red py-5"
        :title="link.title"
        :class="{
          'active': isActive(link)
        }"
      >{{ link.title }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const { $globalNavigation } = useNuxtApp()

// Use the global navigation data (already normalized with trailing slashes in plugin)
const topNavItems = computed(() => {
  const allNav = $globalNavigation as ContentNavigationItem[]
  if (!Array.isArray(allNav)) return []
  
  // Filter to only top-level items (one level deep from root)
  return allNav.filter((item: ContentNavigationItem) => {
    const parts = item.path.split('/').filter(Boolean)
    return parts.length === 1
  })
})

const removeTrailingSlash = (path: string) => {
  if (path !== '/' && path.endsWith('/')) {
    return path.slice(0, -1)
  }
  return path
}

const isActive = (link: { path: string }) => {
  const firstPart = route.path.split('/')[1]
  const normalizedLinkPath = removeTrailingSlash(link.path)
  const normalizedRoutePath = removeTrailingSlash(route.path)
  const normalizedFirstPart = firstPart ? `/${firstPart}` : ''

  return (
    normalizedLinkPath === normalizedRoutePath ||
    (normalizedLinkPath === normalizedFirstPart && !!firstPart)
  )
}
</script>
