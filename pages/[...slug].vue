<template>
  <NuxtLayout>
    <ContentDoc />
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  key: (route) => route.fullPath
})
</script>
