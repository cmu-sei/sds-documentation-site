<template>
  <NuxtLayout>
    <ContentRenderer v-if="page" :value="page" />
    <div v-else>Page not found</div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const route = useRoute()

const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('content').path(route.path).first()
})

provide('page', page)

// Layout && Mobile Menu

const firstPart = computed(() => route.path.split('/')[1])

const { data: navigation } = await useAsyncData(`navigation-${route.path}`, () => {
  return queryCollectionNavigation('content')
})

const { data: surround } = await useAsyncData(`surround-${route.path}`, () => {
  return queryCollectionItemSurroundings('content', route.path)
})

const { data: sidebar } = await useAsyncData(`sidebar-${route.path}`, () => {
  if (!firstPart.value) return Promise.resolve(null)
  return queryCollectionNavigation('content').where('path', 'LIKE', `/${firstPart.value}%`)
})

provide('navigation', navigation)
provide('surround', surround)
provide('sidebar', sidebar)

// Search

const { data: searchData } = await useAsyncData(`search-box-${route.path}`, () => {
  return queryCollectionSearchSections('content')
})

provide('searchData', searchData)

definePageMeta({
  key: (route) => route.fullPath
})

useSeoMeta({
  title: () => page.value?.title || 'Loading...',
  description: () => page.value?.description || 'Loading...'
})
</script>
