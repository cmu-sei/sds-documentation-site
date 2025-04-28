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
      <span class="flex items-center gap-1 text-lg font-light">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-red-600 dark:text-red-300"
        >
          <path
            d="M14.5625 2.625C15.125 2.875 15.5 3.40625 15.5 4C15.5 12 9.59375 16 7.96875 16C6.40625 16 0.5 12.0625 0.5 4C0.5 3.40625 0.84375 2.875 1.40625 2.625L7.40625 0.125C7.5625 0.0625 7.8125 0.03125 8 0.03125C8.15625 0.03125 8.40625 0.0625 8.5625 0.125L14.5625 2.625ZM11 6.25C11 6.03125 10.8125 5.5 10.25 5.5C10.0312 5.5 9.8125 5.5625 9.65625 5.75L7.1875 8.625L6.25 7.71875C6.125 7.5625 5.9375 7.5 5.75 7.5C5.3125 7.5 5 7.84375 5 8.25C5 8.46875 5.0625 8.65625 5.21875 8.78125L6.71875 10.2812C6.84375 10.4062 7.03125 10.5 7.25 10.5C7.3125 10.5 7.59375 10.5 7.8125 10.25L10.8125 6.75C10.9375 6.625 11 6.4375 11 6.25Z"
            fill="currentColor"
          />
        </svg>
        <span>{{ pageTitle }}</span>
      </span>
    </SdsActionButton>
    <SdsPanel
      v-model="showPanel"
      side="left"
      size="md"
    >
      <template #title>
        <p>
          <span class="font-bold text-red-600 dark:text-red-300">{{ appSuitePrefix }}</span>
          <span class="font-semibold text-gray-600 dark:text-gray-300">{{ appSuite }}</span>
        </p>
      </template>
      <template #default>
        <NuxtLink
          v-for="link of navigation"
          :key="link.path"
          v-slot="{ isExactActive }"
          :to="link.path"
          custom
        >
          <SdsNavigationItem
            :label="link.title"
            :href="link.path"
            :selected="isExactActive || (link.path.startsWith(`/${firstPart}`) && !!firstPart)"
          />
        </NuxtLink>
        <hr class="my-4 border-gray-200 dark:border-gray-700">
        <template v-if="sidebar && sidebar?.some(i => i.children)">
          <div class="-mx-6 flex flex-col gap-2">
            <nav class="grow overflow-auto">
              <ul>
                <li
                  v-for="link of sidebar"
                  :key="link.path"
                  class="grid"
                >
                  <NuxtLink
                    :to="link.path"
                    active-class="active"
                    class="line-clamp-1 w-full px-4 py-2 text-sm font-bold border-l-4 border-transparent hover:bg-gray-25 dark:hover:bg-gray-800"
                    :title="link.title"
                  >{{ link.title }}</NuxtLink>
                  <ul v-if="link.children">
                    <li
                      v-for="child in link.children.filter((i: ContentNavigationItem) => i.path !== link.path)"
                      :key="child.path"
                      class="grid"
                    >
                      <div
                        class="relative flex items-center gap-1 px-4 py-2 text-sm border-l-4 border-transparent has-[.active]:border-red-600 dark:has-[.active]:border-red-400 has-[.active]:bg-gray-25 dark:has-[.active]:bg-gray-800 hover:bg-gray-25 dark:hover:bg-gray-800"
                      >
                        <button
                          v-if="child.children"
                          class="w-4 text-left z-10 hover:text-red-600 dark:hover:text-red-300"
                          type="button"
                          @click.prevent="toggleTreeNode(child)"
                        >
                          <svg
                            v-if="closedTreeNodes.some(i => child.path === i)"
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
                          :to="child.path"
                          active-class="active"
                          class="absolute inset-0"
                          :title="child.title"
                        >
                          <span class="sr-only">{{ child.title }}</span>
                        </NuxtLink>
                      </div>
                      <ul v-if="child.children && !closedTreeNodes.some(i => child.path === i)">
                        <li
                          v-for="subchild in child.children.filter((i: ContentNavigationItem) => i.path !== child.path)"
                          :key="subchild.path"
                          class="grid"
                        >
                          <div
                            class="pl-8 relative flex items-center gap-1 px-4 py-2 text-sm border-l-4 border-transparent has-[.active]:border-red-600 dark:has-[.active]:border-red-400 has-[.active]:bg-gray-25 dark:has-[.active]:bg-gray-800 hover:bg-gray-25 dark:hover:bg-gray-800"
                          >
                            <button
                              v-if="subchild.children"
                              class="w-4 text-left z-10 hover:text-red-600 dark:hover:text-red-300"
                              type="button"
                              @click.prevent="toggleTreeNode(subchild)"
                            >
                              <svg
                                v-if="closedTreeNodes.some(i => subchild.path === i)"
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
                              :to="subchild.path"
                              active-class="active"
                              class="absolute inset-0"
                              :title="subchild.title"
                            >
                              <span class="sr-only">{{ subchild.title }}</span>
                            </NuxtLink>
                          </div>
                          <ul v-if="subchild.children && !closedTreeNodes.some(i => subchild.path === i)">
                            <li
                              v-for="grandchild in subchild.children.filter((i: ContentNavigationItem) => i.path !== subchild.path)"
                              :key="grandchild.path"
                              class="grid"
                            >
                              <div
                                class="pl-12 relative flex items-center gap-1 px-4 py-2 text-sm border-l-4 border-transparent has-[.active]:border-red-600 dark:has-[.active]:border-red-400 has-[.active]:bg-gray-25 dark:has-[.active]:bg-gray-800 hover:bg-gray-25 dark:hover:bg-gray-800"
                              >
                                <button
                                  v-if="grandchild.children"
                                  class="w-4 text-left z-10 ml-8 hover:text-red-600 dark:hover:text-red-300"
                                  type="button"
                                  @click.prevent="toggleTreeNode(grandchild)"
                                >
                                  <svg
                                    v-if="closedTreeNodes.some(i => grandchild.path === i)"
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
                                  :to="grandchild.path"
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
        </template>
        <hr
          v-if="toc && toc.links.length > 0"
          class="my-8 border-gray-200 dark:border-gray-700"
        >
        <div
          v-if="toc && toc.links.length > 0"
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
            item-class="px-4 py-2 text-sm border-l dark:border-gray-800 hover:pl-[calc(1rem-1px)] [&.active]:pl-[calc(1rem-1px)] hover:border-l-2 [&.active]:border-l-2 hover:border-gray-600 dark:hover:border-gray-400 [&.active]:font-bold [&.active]:border-red-600 dark:[&.active]:border-red-400 hover:bg-gray-25 dark:hover:bg-gray-900"
            active-class="active"
            class="grid"
          />
        </div>
      </template>
    </SdsPanel>
  </div>
</template>

<script lang="ts" setup>
import type { ContentNavigationItem } from '@nuxt/content'

const {
  appSuitePrefix,
  appSuite,
  pageTitle
} = useAppConfig()

const showPanel = ref(false)

const route = useRoute()
const firstPart = computed(() => route.path.split('/')[1])

const { data: navigation } = await useAsyncData(`mobile-navigation-${route.path}`, () => {
  return queryCollectionNavigation('content')
})

const { data: sidebar } = await useAsyncData(`mobile-sidebar-${route.path}`, () => {
  if (!firstPart.value) return Promise.resolve(null)
  return queryCollectionNavigation('content').where('path', 'LIKE', `/${firstPart.value}%`)
})

const toc = useToc()

const closedTreeNodes = ref<string[]>([])

const toggleTreeNode = (link: { path: string }) => {
  if (closedTreeNodes.value.some(i => link.path === i)) {
    closedTreeNodes.value = closedTreeNodes.value.filter(i => link.path !== i)
  } else {
    closedTreeNodes.value.push(link.path)
  }
}
</script>
