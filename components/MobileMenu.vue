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
      <span class="text-lg font-light">
        {{ pageTitle }}
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
        <ContentNavigation v-slot="{ navigation }">
          <NuxtLink
            v-for="link of navigation"
            :key="link._path"
            v-slot="{ isExactActive }"
            :to="link._path"
            custom
          >
            <SdsNavigationItem
              :label="link.title"
              :href="link._path"
              :selected="isExactActive || (link._path.startsWith(`/${firstPart}`) && !!firstPart)"
            />
          </NuxtLink>
        </ContentNavigation>
        <hr class="my-4 border-gray-200 dark:border-gray-700">
        <ContentNavigation
          v-if="firstPart"
          v-slot="{ navigation }"
          :query="navQuery"
        >
          <template v-if="navigation.some(i => i.children)">
            <div class="-mx-6 flex flex-col gap-2">
              <nav class="grow overflow-auto">
                <ul>
                  <li
                    v-for="link of navigation"
                    :key="link._path"
                    class="grid"
                  >
                    <NuxtLink
                      :to="link._path"
                      active-class="active"
                      class="line-clamp-1 w-full px-4 py-2 text-sm font-bold border-l-4 border-transparent hover:bg-gray-25 dark:hover:bg-gray-800"
                      :title="link.title"
                    >{{ link.title }}</NuxtLink>
                    <ul v-if="link.children">
                      <li
                        v-for="child in link.children.filter(i => i._path !== link._path)"
                        :key="child._path"
                        class="grid"
                      >
                        <div
                          class="relative flex items-center gap-1 px-4 py-2 text-sm border-l-4 border-transparent has-[.active]:border-red-600 dark:has-[.active]:border-red-400 has-[.active]:bg-gray-25 dark:has-[.active]:bg-gray-800 hover:bg-gray-25 dark:hover:bg-gray-800"
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
                              class="pl-8 relative flex items-center gap-1 px-4 py-2 text-sm border-l-4 border-transparent has-[.active]:border-red-600 dark:has-[.active]:border-red-400 has-[.active]:bg-gray-25 dark:has-[.active]:bg-gray-800 hover:bg-gray-25 dark:hover:bg-gray-800"
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
                                  class="pl-12 relative flex items-center gap-1 px-4 py-2 text-sm border-l-4 border-transparent has-[.active]:border-red-600 dark:has-[.active]:border-red-400 has-[.active]:bg-gray-25 dark:has-[.active]:bg-gray-800 hover:bg-gray-25 dark:hover:bg-gray-800"
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
          </template>
        </ContentNavigation>
        <div
          v-if="toc?.links.length > 0"
          class="mt-8"
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
            item-class="px-4 py-2 text-sm border-l dark:border-gray-800 [&.active]:border-l-2 [&.active]:font-bold [&.active]:border-red-600 dark:[&.active]:border-red-400 hover:bg-gray-25 dark:hover:bg-gray-800"
            active-class="active"
            class="grid"
          />
        </div>
      </template>
      <template #footer>
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
      </template>
    </SdsPanel>
  </div>
</template>

<script lang="ts" setup>
const {
  appSuitePrefix,
  appSuite,
  pageTitle
} = useAppConfig()

const showPanel = ref(false)

const route = useRoute()
const firstPart = route.path.split('/')[1]

const navQuery = queryContent(firstPart)

const darkMode = useCookie('dark-mode-toggle')
const { toc } = useContent()

const closedTreeNodes = ref<string[]>([])

const toggleTreeNode = (link: { _path: string }) => {
  if (closedTreeNodes.value.some(i => link._path === i)) {
    closedTreeNodes.value = closedTreeNodes.value.filter(i => link._path !== i)
  } else {
    closedTreeNodes.value.push(link._path)
  }
}
</script>
