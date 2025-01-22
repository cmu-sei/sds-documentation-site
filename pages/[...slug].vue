<template>
  <NuxtLayout>
    <ContentRenderer v-if="page" :value="page" />
    <div v-else>Page not found</div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

useToc().value = page.value?.body.toc

definePageMeta({
  key: (route) => route.fullPath
})

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>
