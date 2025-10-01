<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
const {
  pageTitle
} = useAppConfig()

useHead({
  titleTemplate: (title) => `${title} | ${pageTitle}`,
  htmlAttrs: {
    lang: 'en-US',
    class: 'sds-theme-forge'
  }
})
</script>