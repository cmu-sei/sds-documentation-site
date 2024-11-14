<template>
  <SdsLayoutAppSimple
    :app-suite-prefix="appSuitePrefix"
    :app-suite="appSuite"
    :page-title="pageTitle"
  >
    <template #user-section>
      <SdsActionButton
        aria-label="Toggle dark mode"
        @click="darkMode = !darkMode"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="darkMode"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </SdsActionButton>
    </template>
    <Html v-if="darkMode" class="dark" />
    <div class="flex flex-col md:flex-row gap-6">
      <div class="overflow-auto w-48 shrink-0 flex flex-col gap-2">
        <SearchBox v-model="showSearchModal" />
        <nav>
          <ContentNavigation v-slot="{ navigation }">
            <ul>
              <li v-for="link of navigation" :key="link._path">
                <NuxtLink
                  :to="link._path"
                  active-class="font-bold"
                  class="link link-tertiary text-sm mb-2"
                >{{ link.title }}</NuxtLink>
                <ul v-if="link.children">
                  <li v-for="child in link.children" :key="child._path">
                    <NuxtLink
                      :to="child._path"
                      active-class="font-bold"
                      class="link link-tertiary text-sm ml-2 mb-2"
                    >{{ child.title }}</NuxtLink>
                    <ul v-if="child.children">
                      <li v-for="subchild in child.children" :key="subchild._path">
                        <NuxtLink
                          :to="subchild._path"
                          active-class="font-bold"
                          class="link link-tertiary text-sm ml-4 mb-2"
                        >{{ subchild.title }}</NuxtLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </ContentNavigation>
        </nav>
      </div>
      <div class="grow">
        <div class="bg-white dark:bg-gray-900 p-4 md:p-8 rounded border shadow dark:border-gray-800">
          <div class="prose prose-blue dark:prose-invert max-w-none prose-pre:bg-white prose-pre:border dark:prose-pre:bg-black dark:prose-pre:border-gray-800">
            <slot />
          </div>
        </div>
      </div>
      <div
        v-if="toc?.links.length > 0"
        class="w-48 shrink-0"
      >
        <nav class="sticky top-16">
          <p class="text-xs uppercase font-bold text-gray-600 dark:text-gray-400 mb-2">On this page</p>
          <ul>
            <li v-for="link of toc.links" :key="link.id" class="mb-2">
              <NuxtLink
                :to="`#${link.id}`"
                class="link link-tertiary text-sm"
              >{{ link.text }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </SdsLayoutAppSimple>
</template>

<script setup lang="ts">
const {
  appSuitePrefix,
  appSuite,
  pageTitle
} = useAppConfig()
const darkMode = useCookie('dark-mode-toggle')
const { toc } = useContent()
const showSearchModal = ref(false)
</script>