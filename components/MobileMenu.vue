<template>
  <div>
    <SdsActionButton
      @click="showPanel = !showPanel"
    >
      <svg
        class="h-6 w-6"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <span class="sr-only">Toggle mobile menu</span>
    </SdsActionButton>
    <SdsMobileMenu
      v-model="showPanel"
      side="left"
      size="md"
    >
      <template #title>
        <p>
          <span class="font-bold text-red-600 dark:text-red-500">{{ appSuitePrefix }}</span>
          <span class="font-semibold text-gray-600 dark:text-gray-400">{{ appSuite }}</span>
        </p>
      </template>
      <template #default>
        <ContentNavigation v-slot="{ navigation }">
          <SdsNavigationItem
            v-for="link of navigation"
            :key="link._path"
            :label="link.title"
            :href="link._path"
          >
            <template #children>
              <SdsNavigationItem
                :label="link.title"
                :href="link._path"
              />
            </template>
          </SdsNavigationItem>
        </ContentNavigation>
      </template>
    </SdsMobileMenu>
  </div>
</template>

<script lang="ts" setup>
const {
  appSuitePrefix,
  appSuite
} = useAppConfig()

const showPanel = ref(false)
</script>
