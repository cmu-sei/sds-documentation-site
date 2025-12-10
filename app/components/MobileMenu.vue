<template>
  <div>
    <SdsActionButton
      @click="showPanel = !showPanel"
    >
      <Icon
        name="material-symbols:menu"
        class="h-6 w-6"
      />
      <span class="sr-only">Navigation menu</span>
    </SdsActionButton>
    <SdsMobileMenu
      v-model="showPanel"
      :mobile-menus="mobileMenus"
      side="right"
      size="md"
    >
      <template #title>
        <p>
          <span class="font-bold text-red-600 dark:text-red-300">{{ appSuitePrefix }}</span>
          <span class="font-semibold text-gray-600 dark:text-gray-300">{{ appSuite }}</span>
        </p>
      </template>
      <template #default="{ navigate }">
        <SdsNavigationItem
          v-for="menuItem in mobileMenus"
          :key="menuItem.key"
          :label="menuItem.title"
          :href="menuItem.href"
          :type="menuItem.type"
          :selected="isActive(menuItem)"
          @click="menuItem.type === 'slide' ? navigate(menuItem.key) : undefined"
        >
          <template
            v-if="menuItem.icon"
            #left
          >
            <Icon
              :name="menuItem.icon"
              class="mt-0.5 w-4 h-4 shrink-0"
              :alt="`${menuItem.title} icon`"
            />
          </template>
        </SdsNavigationItem>
        <template v-if="sidebar && sidebar?.some((i: ContentNavigationItem) => i.children)">
          <hr class="my-4 border-gray-200 dark:border-gray-700">
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
                    class="flex items-start gap-1.5 w-full px-2 pb-2 text-sm font-semibold border-l-2 border-transparent text-gray-700 dark:text-gray-100 hover:text-black dark:hover:text-white rounded-lg"
                    :class="{
                      'active': isActive(link)
                    }"
                    :title="link.title"
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
                          v-if="child.children && child.children.some((i: ContentNavigationItem) => i.path !== child.path)"
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
                              v-if="subchild.children && subchild.children.some((i: ContentNavigationItem) => i.path !== subchild.path)"
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
                                  v-if="grandchild.children && grandchild.children.some((i: ContentNavigationItem) => i.path !== grandchild.path)"
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
          </div>
        </template>
        <div
          v-if="toc && toc.links.length > 0"
        >
          <hr class="my-8 border-gray-200 dark:border-gray-700">
          <div class="flex gap-2 items-center mb-2 text-sm font-semibold text-gray-700 dark:text-gray-100">
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
            @click="showPanel = false"
          >
            <template #default="{ item }">
              <span
                class="block mx-3 px-2 py-1.5 text-sm text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white group-hover:bg-gray-25 dark:group-hover:bg-gray-900 rounded-lg"
              >{{ item.text }}</span>
            </template>
          </CustomScrollspy>
        </div>
      </template>
      <template
        v-for="menuItem in mobileMenus.filter(m => m.type === 'slide')"
        :key="menuItem.key"
        #[`panel(${menuItem.key})`]="{ navigate }"
      >
        <SdsNavigationItem
          type="back"
          @click="navigate()"
        />
        <SdsNavigationItem
          :label="menuItem.title"
          type="title"
        >
          <template
            v-if="menuItem.icon"
            #left
          >
            <Icon
              :name="menuItem.icon"
              class="mt-0.5 w-4 h-4 shrink-0"
              :alt="`${menuItem.title} icon`"
            />
          </template>
        </SdsNavigationItem>
        <SdsNavigationItem
          v-for="child in menuItem.children"
          :key="child.key"
          :label="child.title"
          :href="child.href"
        />
        <hr class="mt-2 mb-1 border-gray-200 dark:border-gray-700">
      </template>
    </SdsMobileMenu>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '#components'

import type { ContentNavigationItem } from '@nuxt/content'

const {
  appSuitePrefix,
  appSuite,
} = useAppConfig()

const showPanel = ref(false)

const route = useRoute()
const firstPart = computed(() => route.path.split('/')[1])

const toc = inject<ComputedRef<{ links: { text: string; id: string }[] }>>('toc', computed(() => ({ links: [] })))
const navigation = inject<Ref<ContentNavigationItem[] | null>>('navigation', ref(null))
const sidebar = inject<Ref<ContentNavigationItem[] | null>>('sidebar', ref(null))

const closedTreeNodes = ref<string[]>([])

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

const mobileMenus = computed(() => {
  if (!navigation.value) return []
  return navigation.value.map((link: ContentNavigationItem) => {
    // We only want nested menus for links from the app config
    const hasChildren = link.fromAppConfig && link.children && link.children.length > 0
    return {
      key: link.path.replace(/\//g, '-').replace(/^-/, ''),
      title: link.title,
      icon: link.icon as string | undefined,
      href: hasChildren ? undefined : link.path,
      type: hasChildren ? ('slide' as const) : undefined,
      path: link.path, // Store path for selection checking
      children: hasChildren
        ? link.children?.map((child: ContentNavigationItem) => ({
            key: child.path.replace(/\//g, '-').replace(/^-/, ''),
            title: child.title,
            href: child.path,
          }))
        : undefined,
    }
  })
})
</script>
