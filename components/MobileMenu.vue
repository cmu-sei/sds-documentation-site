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
            :type="link.children ? 'expand' : 'simple'"
            :selected="selected === link._path"
            @click="link.children ? toggleSelected($event, link) : undefined"
          >
            <template #children>
              <SdsNavigationItem
                :label="link.title"
                :href="link._path"
              />
              <template
                v-for="child in link.children?.filter(i => i._path !== link._path)"
                :key="child._path"
              >
                <SdsNavigationItem
                  :label="child.title"
                  :href="child._path"
                />
                <template v-if="child.children">
                  <template
                    v-for="subchild in child.children?.filter(i => i._path !== child._path)"
                    :key="subchild._path"
                  >
                    <SdsNavigationItem 
                      :label="subchild.title"
                      :href="subchild._path"
                    />
                    <template v-if="subchild.children">
                      <template
                        v-for="grandchild in subchild.children?.filter(i => i._path !== subchild._path)"
                        :key="grandchild._path"
                      >
                        <SdsNavigationItem 
                          :label="grandchild.title"
                          :href="grandchild._path"
                        />
                      </template>
                    </template>
                  </template>
                </template>
              </template>
              <hr class="mt-2 mb-2 border-gray-200 dark:border-gray-700">
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
  appSuite,
  pageTitle
} = useAppConfig()

const showPanel = ref(false)

const selected = ref('')

const toggleSelected = (event: MouseEvent, link: { _path: string }) => {
  event.preventDefault()
  selected.value = selected.value !== link._path ? link._path : ''
}
</script>
