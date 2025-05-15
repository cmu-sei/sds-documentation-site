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
        <template v-if="sidebar && sidebar?.some((i: ContentNavigationItem) => i.children)">
          <div class="-ml-3 flex flex-col gap-2">
            <nav
              v-if="sidebar && sidebar.some((i: ContentNavigationItem) => i.children)"
              class="mt-4"
            >
              <ul>
                <li
                  v-for="link of sidebar"
                  :key="link.path"
                  class="grid"
                >
                  <NuxtLink
                    :to="link.path"
                    active-class="active"
                    class="flex items-start gap-1.5 w-full px-2 pb-2 text-sm font-semibold border-l-2 border-transparent text-gray-700 dark:text-gray-100 hover:text-black dark:hover:text-white rounded-lg"
                    :title="link.title"
                  >
                    <Icon
                      v-if="link.icon"
                      :name="link.icon"
                      class="mt-0.5 w-4 h-4 shrink-0"
                      :alt="`${link.title} icon`"
                    />
                    <span class="line-clamp-2">{{ link.title }}</span>
                  </NuxtLink>
                  <ul v-if="link.children">
                    <li
                      v-for="child in link.children.filter((i: ContentNavigationItem) => i.path !== link.path)"
                      :key="child.path"
                      class="grid"
                    >
                      <div
                        class="relative flex items-start justify-between gap-1 text-sm border-l-2 border-transparent"
                      >
                        <NuxtLink
                          :to="child.path"
                          active-class="active text-red-600 dark:text-red-300"
                          class="flex items-start gap-1.5 grow px-2 py-1.5 rounded-lg z-10 hover:bg-gray-25 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white [&.active]:hover:text-red-600 dark:[&.active]:hover:text-red-300"
                        >
                          <Icon
                            v-if="child.icon"
                            :name="child.icon"
                            class="mt-0.5 w-4 h-4 shrink-0"
                            :alt="`${child.title} icon`"
                          />
                          <span class="line-clamp-2">{{ child.title }}</span>
                          <span class="absolute inset-0"/>
                        </NuxtLink>
                        <button
                          v-if="child.children && child.children.some((i: ContentNavigationItem) => i.path !== child.path)"
                          class="p-1 rounded-sm text-left mt-1.5 z-10 hover:bg-gray-25 dark:hover:bg-gray-900 dark:bg-gray-950 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                          type="button"
                          @click.prevent="toggleTreeNode(child)"
                        >
                          <svg
                            v-if="closedTreeNodes.some((i: string) => child.path === i)"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="32"
                            viewBox="0 0 320 512"
                            class="h-3 w-auto"
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
                            class="h-3 w-auto"
                          >
                            <path
                              fill="currentColor"
                              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                            />
                          </svg>
                          <span class="sr-only">Toggle tree</span>
                        </button>
                      </div>
                      <ul v-if="child.children && !closedTreeNodes.some((i: string) => child.path === i)">
                        <li
                          v-for="subchild in child.children.filter((i: ContentNavigationItem) => i.path !== child.path)"
                          :key="subchild.path"
                          class="grid"
                        >
                          <div
                            class="ml-4 pl-2 relative flex items-start justify-between gap-1 text-sm border-l-2 border-gray-100 dark:border-gray-900 has-[.active]:border-red-600 dark:has-[.active]:border-red-400"
                          >
                            <NuxtLink
                              :to="subchild.path"
                              active-class="active text-red-600 dark:text-red-300"
                              class="flex items-start gap-1.5 grow px-2 py-1.5 rounded-lg z-10 hover:bg-gray-25 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white [&.active]:hover:text-red-600 dark:[&.active]:hover:text-red-300"
                            >
                              <Icon
                                v-if="subchild.icon"
                                :name="subchild.icon"
                                class="mt-0.5 w-4 h-4 shrink-0"
                                :alt="`${subchild.title} icon`"
                              />
                              <span class="line-clamp-2">{{ subchild.title }}</span>
                              <span class="absolute inset-0"/>
                            </NuxtLink>
                            <button
                              v-if="subchild.children && subchild.children.some((i: ContentNavigationItem) => i.path !== subchild.path)"
                              class="p-1 rounded-sm text-left mt-1.5 z-10 hover:bg-gray-25 dark:hover:bg-gray-900 dark:bg-gray-950 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                              type="button"
                              @click.prevent="toggleTreeNode(subchild)"
                            >
                              <svg
                                v-if="closedTreeNodes.some((i: string) => subchild.path === i)"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="32"
                                viewBox="0 0 320 512"
                                class="h-3 w-auto"
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
                                class="h-3 w-auto"
                              >
                                <path
                                  fill="currentColor"
                                  d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                                />
                              </svg>
                              <span class="sr-only">Toggle tree</span>
                            </button>
                          </div>
                          <ul v-if="subchild.children && !closedTreeNodes.some((i: string) => subchild.path === i)">
                            <li
                              v-for="grandchild in subchild.children.filter((i: ContentNavigationItem) => i.path !== subchild.path)"
                              :key="grandchild.path"
                              class="grid"
                            >
                              <div
                                class="ml-4 pl-6 relative flex items-start justify-between gap-1 text-sm border-l-2 border-gray-100 dark:border-gray-900 has-[.active]:border-red-600 dark:has-[.active]:border-red-400"
                              >
                                <NuxtLink
                                  :to="grandchild.path"
                                  active-class="active text-red-600 dark:text-red-300"
                                  class="flex items-start gap-1.5 grow px-2 py-1.5 rounded-lg z-10 hover:bg-gray-25 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white [&.active]:hover:text-red-600 dark:[&.active]:hover:text-red-300"
                                >
                                  <Icon
                                    v-if="grandchild.icon"
                                    :name="grandchild.icon"
                                    class="mt-0.5 w-4 h-4 shrink-0"
                                    :alt="`${grandchild.title} icon`"
                                  />
                                  <span class="line-clamp-2">{{ grandchild.title }}</span>
                                  <span class="absolute inset-0"/>
                                </NuxtLink>
                                <button
                                  v-if="grandchild.children && grandchild.children.some((i: ContentNavigationItem) => i.path !== grandchild.path)"
                                  class="p-1 rounded-sm text-left mt-1.5 z-10 hover:bg-gray-25 dark:hover:bg-gray-900 dark:bg-gray-950 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                  type="button"
                                  @click.prevent="toggleTreeNode(grandchild)"
                                >
                                  <svg
                                    v-if="closedTreeNodes.some((i: string) => grandchild.path === i)"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="32"
                                    viewBox="0 0 320 512"
                                    class="h-4 w-auto"
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
                                    class="h-3 w-auto"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                                    />
                                  </svg>
                                  <span class="sr-only">Toggle tree</span>
                                </button>
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
          <div class="flex gap-2 items-center mb-2 text-sm font-semibold text-gray-700 dark:text-gray-100">
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
            item-class="group ml-1.5 border-l-2 border-gray-100 dark:border-gray-900 [&.active]:font-semibold [&.active]:border-red-600 dark:[&.active]:border-red-400 [&.active_span]:text-red-600 dark:[&.active_span]:text-red-300"
            active-class="active"
            class="grid"
          >
            <template #default="{ item }">
              <span
                class="block mx-3 px-2 py-1.5 text-sm text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white group-hover:bg-gray-25 dark:group-hover:bg-gray-900 rounded-lg"
              >{{ item.text }}</span>
            </template>
          </CustomScrollspy>
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
