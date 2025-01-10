<template>
  <div class="flex flex-col h-screen w-screen">
    <Html
      :class="{
        'dark': darkMode
      }"
      lang="en"
    />
    <Body class="bg-white dark:bg-gray-950 text-black dark:text-white" />
    <header class="border-b dark:border-gray-800 flex gap-6 px-4 items-center">
      <div class="flex gap-1 items-center">
        <MobileMenu class="lg:hidden" />
        <p class="hidden lg:block sm:min-w-64 text-lg font-light">
          {{ pageTitle }}
        </p>
      </div>
      <div class="hidden lg:block grow overflow-auto">
        <ContentNavigation v-slot="{ navigation }">
          <ul class="flex">
            <li
              v-for="link of navigation"
              :key="link._path"
            >
              <NuxtLink
                :to="link._path"
                active-class="active"
                class="tab tab-underline tab-red py-5"
                :title="link.title"
                :class="{
                  'active': link._path.startsWith(`/${firstPart}`) && !!firstPart
                }"
              >{{ link.title }}</NuxtLink>
            </li>
          </ul>
        </ContentNavigation>
      </div>
      <SearchBox
        v-model="showSearchModal"
        class="ml-auto py-3"
      />
    </header>
    <main
      class="flex flex-col lg:flex-row gap-6 h-[calc(100vh-4.125rem)]"
    >
      <ContentNavigation
        v-if="firstPart"
        v-slot="{ navigation }"
        :query="navQuery"
      >
        <template v-if="navigation.some(i => i.children)">
          <SdsResizer
            direction="right"
            clamp
            class="hidden lg:flex border-r dark:border-gray-800"
          >
            <div class="flex flex-col h-[calc(100vh-9.375rem)] gap-2 w-72">
              <nav class="grow mt-6 overflow-auto">
                <ul>
                  <li
                    v-for="link of navigation"
                    :key="link._path"
                    class="grid"
                  >
                    <NuxtLink
                      :to="link._path"
                      active-class="active"
                      class="line-clamp-1 w-full px-4 py-2 text-sm font-bold border-l-4 border-transparent hover:bg-gray-25 dark:hover:bg-gray-900"
                      :title="link.title"
                    >{{ link.title }}</NuxtLink>
                    <ul v-if="link.children">
                      <li
                        v-for="child in link.children.filter(i => i._path !== link._path)"
                        :key="child._path"
                        class="grid"
                      >
                        <div
                          class="relative flex items-center gap-1 px-4 py-2 text-sm border-l-4 border-transparent has-[.active]:border-red-600 dark:has-[.active]:border-red-400 has-[.active]:bg-gray-25 dark:has-[.active]:bg-gray-900 hover:bg-gray-25 dark:hover:bg-gray-900"
                        >
                          <button
                            v-if="child.children"
                            class="w-4 text-left z-10"
                            type="button"
                            @click.prevent="toggleTreeNode(child)"
                          >
                            <svg
                              v-if="closedTreeNodes.some(i => child._path === i)"
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="32"
                              viewBox="0 0 320 512"
                              class="h-3 w-auto inline-block"
                            >
                              <path
                                fill="currentColor"
                                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                              />
                            </svg>
                            <svg
                              v-else
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 512 512"
                              class="h-3 w-auto inline-block"
                            >
                              <path
                                fill="currentColor"
                                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                              />
                            </svg>
                            <span class="sr-only">Toggle tree</span>
                          </button>
                          <span class="line-clamp-1">{{ child.title }}</span>
                          <NuxtLink
                            :to="child._path"
                            active-class="active"
                            class="absolute inset-0"
                            :title="child.title"
                          >
                            <span class="sr-only">{{ child.title }}</span>
                          </NuxtLink>
                        </div>
                        <ul v-if="child.children && !closedTreeNodes.some(i => child._path === i)">
                          <li
                            v-for="subchild in child.children.filter(i => i._path !== child._path)"
                            :key="subchild._path"
                            class="grid"
                          >
                            <div
                              class="pl-8 relative flex items-center gap-1 px-4 py-2 text-sm border-l-4 border-transparent has-[.active]:border-red-600 dark:has-[.active]:border-red-400 has-[.active]:bg-gray-25 dark:has-[.active]:bg-gray-900 hover:bg-gray-25 dark:hover:bg-gray-900"
                            >
                              <button
                                v-if="subchild.children"
                                class="w-4 text-left z-10"
                                type="button"
                                @click.prevent="toggleTreeNode(subchild)"
                              >
                                <svg
                                  v-if="closedTreeNodes.some(i => subchild._path === i)"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="32"
                                  viewBox="0 0 320 512"
                                  class="h-3 w-auto inline-block"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                                  />
                                </svg>
                                <svg
                                  v-else
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="32"
                                  height="32"
                                  viewBox="0 0 512 512"
                                  class="h-3 w-auto inline-block"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                                  />
                                </svg>
                                <span class="sr-only">Toggle tree</span>
                              </button>
                              <span class="line-clamp-1">{{ subchild.title }}</span>
                              <NuxtLink
                                :to="subchild._path"
                                active-class="active"
                                class="absolute inset-0"
                                :title="subchild.title"
                              >
                                <span class="sr-only">{{ subchild.title }}</span>
                              </NuxtLink>
                            </div>
                            <ul v-if="subchild.children && !closedTreeNodes.some(i => subchild._path === i)">
                              <li
                                v-for="grandchild in subchild.children.filter(i => i._path !== subchild._path)"
                                :key="grandchild._path"
                                class="grid"
                              >
                                <div
                                  class="pl-12 relative flex items-center gap-1 px-4 py-2 text-sm border-l-4 border-transparent has-[.active]:border-red-600 dark:has-[.active]:border-red-400 has-[.active]:bg-gray-25 dark:has-[.active]:bg-gray-900 hover:bg-gray-25 dark:hover:bg-gray-900"
                                >
                                  <button
                                    v-if="grandchild.children"
                                    class="w-4 text-left z-10 ml-8"
                                    type="button"
                                    @click.prevent="toggleTreeNode(grandchild)"
                                  >
                                    <svg
                                      v-if="closedTreeNodes.some(i => grandchild._path === i)"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="32"
                                      viewBox="0 0 320 512"
                                      class="h-3 w-auto inline-block"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                                      />
                                    </svg>
                                    <svg
                                      v-else
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 512 512"
                                      class="h-3 w-auto inline-block"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                                      />
                                    </svg>
                                    <span class="sr-only">Toggle tree</span>
                                  </button>
                                  <span class="line-clamp-1">{{ grandchild.title }}</span>
                                  <NuxtLink
                                    :to="grandchild._path"
                                    active-class="active"
                                    class="absolute inset-0"
                                    :title="grandchild.title"
                                  >
                                    <span class="sr-only">{{ grandchild.title }}</span>
                                  </NuxtLink>
                                </div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="grid">
              <div class="p-2">
                <SdsActionButton
                  block
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
                  <span>{{ darkMode ? 'Dark' : 'Light' }} mode</span>
                </SdsActionButton>
              </div>
              <div class="bg-gray-25 dark:bg-gray-900 p-2 border-t border-gray-200 dark:border-gray-800">
                <p class="text-sm">
                  <span class="font-bold text-red-600 dark:text-red-300">{{ appSuitePrefix }}</span>
                  <span>{{ appSuite }}</span>
                </p>
              </div>
            </div>
          </SdsResizer>
        </template>
      </ContentNavigation>
      <div
        id="page-content"
        tabindex="0"
        class="overflow-auto w-full py-12"
      >
        <div class="prose prose-blue dark:prose-invert px-4 xl:px-0 mx-auto max-w-2xl prose-pre:bg-white prose-pre:border dark:prose-pre:bg-black dark:prose-pre:border-gray-800">
          <slot />
        </div>
      </div>
      <div
        v-if="toc?.links.length > 0"
        class="hidden w-64 shrink-0 xl:block py-6 overflow-auto"
      >
        <div class="flex gap-2 items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
            class="w-3.5 h-3.5 inline-block text-gray-500"
          >
            <path
              fill="currentColor"
              d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m64 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32m384 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32"
            />
          </svg>
          <p>On this page</p>
        </div>
        <CustomScrollspy
          :items="toc.links"
          parent="#page-content"
          item-class="px-4 py-2 text-sm border-l dark:border-gray-800 [&.active]:border-l-2 [&.active]:font-bold [&.active]:border-red-600 dark:[&.active]:border-red-400 hover:bg-gray-25 dark:hover:bg-gray-900"
          active-class="active"
          class="grid"
        />
      </div>
    </main>
  </div>
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

const route = useRoute()
const firstPart = route.path.split('/')[1]
const showScrollspy = ref(false)

const navQuery = queryContent(firstPart)

const closedTreeNodes = ref<string[]>([])

const toggleTreeNode = (link: { _path: string }) => {
  if (closedTreeNodes.value.some(i => link._path === i)) {
    closedTreeNodes.value = closedTreeNodes.value.filter(i => link._path !== i)
  } else {
    closedTreeNodes.value.push(link._path)
  }
}

onMounted(() => {
  if (route.hash && route.hash !== '') {
    const scrollEl = document.querySelector(route.hash)
    if (scrollEl) {
      scrollEl.scrollIntoView(true)
    } else {
      const pageContentEl = document.getElementById('page-content')
      if (pageContentEl) {
        pageContentEl.scrollTop = 0
      }
    }
  } else {
    const pageContentEl = document.getElementById('page-content')
    if (pageContentEl) {
      pageContentEl.scrollTop = 0
    }
  }
  requestAnimationFrame(() => (showScrollspy.value = true))
})
</script>