<template>
  <LayoutSkeleton :fullwidth="isFullscreen">
    <template #header>
      <div class="flex gap-1 items-center">
        <MobileMenu class="lg:hidden" />
        <NuxtLink
          to="/"
          class="hidden lg:flex items-center gap-1 sm:min-w-64 text-lg font-light"
        >
          <!-- Logo -->
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
        </NuxtLink>
      </div>
      <div class="hidden lg:block grow overflow-auto">
        <ul
          v-if="navigation && navigation.length > 0"
          class="flex"
        >
          <li
            v-for="link of navigation"
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
      </div>
      <div class="ml-auto flex gap-2 items-center py-3">
        <NuxtLink
          v-if="githubUrl"
          :to="githubUrl"
          target="_blank"
          class="action-btn action-btn-ghost action-btn-md"
        >
          <svg class="w-5 h-5" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.05469 9.82812C4.05469 9.875 4.00781 9.89844 3.9375 9.89844C3.86719 9.92188 3.82031 9.875 3.82031 9.82812C3.82031 9.78125 3.86719 9.73438 3.9375 9.73438C4.00781 9.73438 4.05469 9.78125 4.05469 9.82812ZM3.32812 9.71094C3.35156 9.66406 3.42188 9.64062 3.49219 9.66406C3.5625 9.6875 3.58594 9.73438 3.58594 9.78125C3.5625 9.82812 3.49219 9.85156 3.44531 9.82812C3.375 9.82812 3.32812 9.75781 3.32812 9.71094ZM4.38281 9.6875C4.42969 9.66406 4.5 9.71094 4.5 9.75781C4.52344 9.80469 4.47656 9.82812 4.40625 9.85156C4.33594 9.875 4.26562 9.85156 4.26562 9.80469C4.26562 9.73438 4.3125 9.6875 4.38281 9.6875ZM5.90625 0.6875C9.16406 0.6875 11.8125 3.17188 11.8125 6.40625C11.8125 9.00781 10.2188 11.2344 7.875 12.0078C7.57031 12.0781 7.45312 11.8906 7.45312 11.7266C7.45312 11.5391 7.47656 10.5547 7.47656 9.78125C7.47656 9.21875 7.28906 8.86719 7.07812 8.67969C8.39062 8.53906 9.77344 8.35156 9.77344 6.10156C9.77344 5.44531 9.53906 5.14062 9.16406 4.71875C9.21094 4.55469 9.42188 3.94531 9.09375 3.125C8.60156 2.96094 7.47656 3.75781 7.47656 3.75781C7.00781 3.61719 6.51562 3.57031 6 3.57031C5.50781 3.57031 5.01562 3.61719 4.54688 3.75781C4.54688 3.75781 3.39844 2.98438 2.92969 3.125C2.60156 3.94531 2.78906 4.55469 2.85938 4.71875C2.48438 5.14062 2.29688 5.44531 2.29688 6.10156C2.29688 8.35156 3.63281 8.53906 4.94531 8.67969C4.75781 8.84375 4.61719 9.10156 4.57031 9.47656C4.21875 9.64062 3.375 9.89844 2.85938 8.98438C2.53125 8.42188 1.94531 8.375 1.94531 8.375C1.38281 8.375 1.92188 8.75 1.92188 8.75C2.29688 8.91406 2.55469 9.59375 2.55469 9.59375C2.90625 10.6484 4.54688 10.2969 4.54688 10.2969C4.54688 10.7891 4.54688 11.5859 4.54688 11.75C4.54688 11.8906 4.45312 12.0781 4.14844 12.0312C1.80469 11.2344 0.1875 9.00781 0.1875 6.40625C0.1875 3.17188 2.67188 0.6875 5.90625 0.6875ZM2.46094 8.77344C2.48438 8.75 2.53125 8.77344 2.57812 8.79688C2.625 8.84375 2.625 8.91406 2.60156 8.9375C2.55469 8.96094 2.50781 8.9375 2.46094 8.91406C2.4375 8.86719 2.41406 8.79688 2.46094 8.77344ZM2.20312 8.58594C2.22656 8.5625 2.25 8.5625 2.29688 8.58594C2.34375 8.60938 2.36719 8.63281 2.36719 8.65625C2.34375 8.70312 2.29688 8.70312 2.25 8.67969C2.20312 8.65625 2.17969 8.63281 2.20312 8.58594ZM2.95312 9.42969C3 9.38281 3.07031 9.40625 3.11719 9.45312C3.16406 9.5 3.16406 9.57031 3.14062 9.59375C3.11719 9.64062 3.04688 9.61719 3 9.57031C2.92969 9.52344 2.92969 9.45312 2.95312 9.42969ZM2.69531 9.07812C2.74219 9.05469 2.78906 9.07812 2.83594 9.125C2.85938 9.17188 2.85938 9.24219 2.83594 9.26562C2.78906 9.28906 2.74219 9.26562 2.69531 9.21875C2.64844 9.17188 2.64844 9.10156 2.69531 9.07812Z"
              fill="currentColor"
            />
          </svg>
          <span class="sr-only">GitHub</span>
        </NuxtLink>
        <div
          v-if="githubUrl"
          class="w-px h-6 mx-1 bg-gray-200 dark:bg-gray-800"
          aria-hidden="true"
        />
        <SdsActionButton
          size="md"
          @click="isFullscreen = !isFullscreen"
        >
          <Icon
            v-if="isFullscreen"
            name="material-symbols:fullscreen-exit"
            class="w-5 h-5"
            alt="Contract layout icon"
          />
          <Icon
            v-else
            name="material-symbols:fullscreen"
            class="w-5 h-5"
            alt="Expand layout icon"
          />
          <span class="sr-only">{{ isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen' }}</span>
        </SdsActionButton>
        <SdsActionButton
          size="md"
          @click="darkMode = !darkMode"
        >
          <Icon
            v-if="darkMode"
            name="material-symbols:nightlight-outline"
            class="w-5 h-5"
            :alt="`Expand layout icon`"
          />
          <Icon
            v-else
            name="material-symbols:sunny-outline"
            class="w-5 h-5"
            :alt="`Expand layout icon`"
          />
          <span class="sr-only">{{ darkMode ? 'Dark' : 'Light' }} mode</span>
        </SdsActionButton>
        <SearchBox
          v-model="showSearchModal"
        />
      </div>
    </template>
    <template #left-bar>
      <nav
        v-if="sidebar && (sidebar as ContentSidebarItem[]).some((i: ContentSidebarItem) => i.children)"
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
              class="flex items-start gap-1.5 w-full px-2 pb-2 text-sm font-semibold border-l-2 border-transparent text-gray-700 dark:text-gray-100 hover:text-black dark:hover:text-white rounded-lg"
              :title="link.title"
              :class="{
                'active': isActive(link)
              }"
            >
              <Icon
                v-if="link.icon"
                :name="(link.icon as string)"
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
                    class="flex items-start gap-1.5 grow px-2 py-1.5 rounded-lg z-10 hover:bg-gray-25 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white [&.active]:hover:text-red-600 dark:[&.active]:hover:text-red-300"
                    :class="{
                      'active text-red-600 dark:text-red-300': isActive(child)
                    }"
                  >
                    <Icon
                      v-if="child.icon"
                      :name="(child.icon as string)"
                      class="mt-0.5 w-4 h-4 shrink-0"
                      :alt="`${child.title} icon`"
                    />
                    <span class="line-clamp-2">{{ child.title }}</span>
                    <span class="absolute inset-0"/>
                  </NuxtLink>
                  <button
                    v-if="child.children && child.children.some((i: ContentSidebarItem) => i.path !== child.path)"
                    class="p-1 rounded-sm text-left z-10 hover:bg-gray-25 dark:hover:bg-gray-900 dark:bg-gray-950 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    type="button"
                    @click.prevent="toggleTreeNode(child)"
                  >
                    <Icon
                      v-if="closedTreeNodes.some((i: string) => child.path === i)"
                      name="material-symbols:keyboard-arrow-right"
                      class="h-5 w-5"
                      :alt="`Toggle tree for ${child.title}`"
                    />
                    <Icon
                      v-else
                      name="material-symbols:keyboard-arrow-down"
                      class="h-5 w-5"
                      :alt="`Toggle tree for ${child.title}`"
                    />
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
                        class="flex items-start gap-1.5 grow px-2 py-1.5 rounded-lg z-10 hover:bg-gray-25 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white [&.active]:hover:text-red-600 dark:[&.active]:hover:text-red-300"
                        :class="{
                          'active text-red-600 dark:text-red-300': isActive(subchild)
                        }"
                      >
                        <Icon
                          v-if="subchild.icon"
                          :name="(subchild.icon as string)"
                          class="mt-0.5 w-4 h-4 shrink-0"
                          :alt="`${subchild.title} icon`"
                        />
                        <span class="line-clamp-2">{{ subchild.title }}</span>
                        <span class="absolute inset-0"/>
                      </NuxtLink>
                      <button
                        v-if="subchild.children && subchild.children.some((i: ContentSidebarItem) => i.path !== subchild.path)"
                        class="p-1 rounded-sm text-left z-10 hover:bg-gray-25 dark:hover:bg-gray-900 dark:bg-gray-950 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                        type="button"
                        @click.prevent="toggleTreeNode(subchild)"
                      >
                        <Icon
                          v-if="closedTreeNodes.some((i: string) => subchild.path === i)"
                          name="material-symbols:keyboard-arrow-right"
                          class="h-5 w-5"
                          :alt="`Toggle tree for ${subchild.title}`"
                        />
                        <Icon
                          v-else
                          name="material-symbols:keyboard-arrow-down"
                          class="h-5 w-5"
                          :alt="`Toggle tree for ${subchild.title}`"
                        />
                        <span class="sr-only">Toggle tree</span>
                      </button>
                    </div>
                    <ul v-if="subchild.children && !closedTreeNodes.some((i: ContentSidebarItem['path']) => subchild.path === i)">
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
                            class="flex items-start gap-1.5 grow px-2 py-1.5 rounded-lg z-10 hover:bg-gray-25 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white [&.active]:hover:text-red-600 dark:[&.active]:hover:text-red-300"
                            :class="{
                              'active text-red-600 dark:text-red-300': isActive(grandchild)
                            }"
                          >
                            <Icon
                              v-if="grandchild.icon"
                              :name="(grandchild.icon as string)"
                              class="mt-0.5 w-4 h-4 shrink-0"
                              :alt="`${grandchild.title} icon`"
                            />
                            <span class="line-clamp-2">{{ grandchild.title }}</span>
                            <span class="absolute inset-0"/>
                          </NuxtLink>
                          <button
                            v-if="grandchild.children && grandchild.children.some((i: ContentSidebarItem) => i.path !== grandchild.path)"
                            class="p-1 rounded-sm text-left z-10 hover:bg-gray-25 dark:hover:bg-gray-900 dark:bg-gray-950 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            type="button"
                            @click.prevent="toggleTreeNode(grandchild)"
                          >
                            <Icon
                              v-if="closedTreeNodes.some((i: string) => grandchild.path === i)"
                              name="material-symbols:keyboard-arrow-right"
                              class="h-5 w-5"
                              :alt="`Toggle tree for ${grandchild.title}`"
                            />
                            <Icon
                              v-else
                              name="material-symbols:keyboard-arrow-down"
                              class="h-5 w-5"
                              :alt="`Toggle tree for ${grandchild.title}`"
                            />
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
    </template>
    <template #content>
      <Html
        :class="{
          'dark': darkMode
        }"
        lang="en"
      />
      <Body class="bg-white dark:bg-gray-950 text-black dark:text-white" />
      <div>
        <div class="prose max-w-none prose-blue dark:prose-invert py-4 mx-auto prose-pre:bg-white prose-pre:border dark:prose-pre:bg-black dark:prose-pre:border-gray-800">
          <ContentRenderer v-if="page" :value="page" />
          <div v-else>Page not found</div>
        </div>
        <div
          v-if="surround && surround.length > 0"
          class="hidden sm:flex gap-2 justify-between w-full border-t border-gray-100 dark:border-gray-900 mt-4 py-8"
        >
          <template
            v-for="(item, index) in surround"
            :key="item?.stem"
          >
            <NuxtLink
              v-if="item"
              :to="item.path"
              class="action-btn action-btn-ghost action-btn-gray"
            >
              <Icon
                v-if="index === 0"
                name="material-symbols:arrow-back"
              />
              <span>{{ item.title }}</span>
              <Icon
                v-if="index === 1"
                name="material-symbols:arrow-forward"
              />
            </NuxtLink>
          </template>
        </div>
      </div>
    </template>
    <template #right-bar>
      <template v-if="toc && toc.links.length > 0">
        <div class="flex gap-2 items-center mt-4 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-100">
          <Icon
            name="material-symbols:format-list-bulleted"
            class="w-3.5 h-3.5 inline-block text-gray-500"
          />
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
      </template>
    </template>
  </LayoutSkeleton>
</template>

<script setup lang="ts">
import { Icon } from '#components'
import type { ContentNavigationItem } from '@nuxt/content'

// Define or import ContentSidebarItem type
type ContentSidebarItem = ContentNavigationItem & { children?: ContentNavigationItem[] }

const route = useRoute()

const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('content').path(route.path).first()
})

const toc = computed(() => page.value?.body.toc)

provide('page', page)
provide('toc', toc)

// Layout && Mobile Menu

const firstPart = computed(() => route.path.split('/')[1])

const { data: navigation } = await useAsyncData(`navigation-${route.path}`, () => {
  return queryCollectionNavigation('content')
})

const { data: surround } = await useAsyncData(`surround-${route.path}`, () => {
  return queryCollectionItemSurroundings('content', route.path)
})

const { data: sidebar } = await useAsyncData(`sidebar-${route.path}`, () => {
  if (!firstPart.value) return Promise.resolve([])
  return queryCollectionNavigation('content').where('path', 'LIKE', `/${firstPart.value}/%`)
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

const {
  pageTitle,
  githubUrl,
} = useAppConfig()

const isFullscreen = useState('fullscreen-toggle', () => false)
const darkMode = useState('dark-mode-toggle', () => false)

onMounted(() => {
  const isFullscreenCookie = useCookie('fullscreen-toggle-cookie', { default: () => false })
  isFullscreen.value = isFullscreenCookie.value

  const darkModeCookie = useCookie('dark-mode-toggle-cookie', { default: () => false })
  darkMode.value = darkModeCookie.value
})

watch(isFullscreen, (newValue) => {
  const isFullscreenCookie = useCookie('fullscreen-toggle-cookie')
  isFullscreenCookie.value = `${newValue}`
})

watch(darkMode, (newValue) => {
  const darkModeCookie = useCookie('dark-mode-toggle-cookie')
  darkModeCookie.value = `${newValue}`
})

const showSearchModal = ref(false)

const showScrollspy = ref(false)

const closedTreeNodes = ref<string[]>([])

// Recursively collect all paths of nodes with children
function collectClosedPaths(nodes: ContentSidebarItem[] = []): string[] {
  let paths: string[] = [];
  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      paths.push(node.path);
      paths = paths.concat(collectClosedPaths(node.children as ContentSidebarItem[]));
    }
  }
  return paths;
}

watch(sidebar, (newSidebar) => {
  if (Array.isArray(newSidebar)) {
    // Initialize all nodes as closed
    closedTreeNodes.value = collectClosedPaths(newSidebar as ContentSidebarItem[]);

    // Find the active node and its ancestors
    function findActiveAncestors(nodes: ContentSidebarItem[], targetPath: string, ancestors: string[] = []): string[] {
      for (const node of nodes) {
        if (node.path === targetPath) {
          return ancestors.concat(node.path);
        }
        if (node.children && node.children.length > 0) {
          const result = findActiveAncestors(node.children as ContentSidebarItem[], targetPath, ancestors.concat(node.path));
          if (result.length) return result;
        }
      }
      return [];
    }

    const activePaths = findActiveAncestors(newSidebar as ContentSidebarItem[], route.path);
    // Remove active node and ancestors from closedTreeNodes
    closedTreeNodes.value = closedTreeNodes.value.filter(path => !activePaths.includes(path));
  }
}, { immediate: true });

const removeTrailingSlash = (path: string) => {
  if (path !== '/' && path.endsWith('/')) {
    return path.slice(0, -1)
  }
  return path
}

const isActive = (link: { path: string }) => {
  const normalizedLinkPath = removeTrailingSlash(link.path)
  const normalizedRoutePath = removeTrailingSlash(route.path)
  const normalizedFirstPart = firstPart.value ? `/${firstPart.value}` : ''

  return (
    normalizedLinkPath === normalizedRoutePath ||
    (normalizedLinkPath === normalizedFirstPart && !!firstPart.value)
  )
}

const toggleTreeNode = (link: { path: string }) => {
  if (closedTreeNodes.value.some(i => link.path === i)) {
    closedTreeNodes.value = closedTreeNodes.value.filter(i => link.path !== i)
  } else {
    closedTreeNodes.value.push(link.path)
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