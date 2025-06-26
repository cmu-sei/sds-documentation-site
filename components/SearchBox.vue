<template>
  <div>
    <SdsActionButton
      ref="searchButtonRef"
      size="md"
      title="Use '/' to bring up search anytime."
      @click="handleShowSearchModalClick"
    >
      <Icon
        name="ic:baseline-search"
        class="w-5 h-5"
        alt="Search icon"
      />
      <span class="sr-only">Search</span>
    </SdsActionButton>
    <sds-modal v-model="modelValue" size="lg">
      <template #title>
        <h2>Search</h2>
      </template>
      <input
        ref="searchTextRef"
        v-model="searchText"
        type="text"
        class="form-control"
        placeholder="Search all pages"
      >
      <nav v-if="results?.length" class="py-4">
        <nuxt-link
          v-for="(item, index) of results"
          :key="item.id"
          :to="item.id"
          class="grid w-full px-4 py-2 rounded-sm"
          :class="{
            'bg-gray-50 dark:bg-gray-800': selectedIndex === index,
          }"
          @mouseover="selectedIndex = index"
          @focus="selectedIndex = index"
          @click="modelValue = false"
        >
          <span>{{ item.title }}</span>
          <span
            v-if="item.titles?.length > 0"
            class="text-sm text-gray-600 dark:text-gray-400"
          >{{ item.titles[0] }}</span>
        </nuxt-link>
      </nav>
      <div
        v-else
        class="p-6 my-4 text-blue-800 bg-blue-25 border border-blue-200 rounded-sm dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200"
      >
        <p v-if="searchText === ''">
          Type a query in the search box above to display a list of results.
        </p>
        <p v-else>No results found. Try to simplify your query.</p>
      </div>
    </sds-modal>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel({
  type: Boolean,
  default: false
})

const searchButtonRef = ref<HTMLElement>()
const searchTextRef = ref<HTMLElement>()
const searchText = ref('')
const selectedIndex = ref(0)
const results = ref()

const route = useRoute()

const { data: searchData } = await useAsyncData(`search-box-${route.path}`, () => {
  return queryCollectionSearchSections('content')
})

const removeDuplicatesByTitleAndURL = (array: { id: string; title: string; titles: string[]; level: number; content: string; }[]) => {
  const urlMap = new Map()

  array.forEach(item => {
    // If the title is not in the map or the current URL is shorter, update the map
    if (!urlMap.has(item.title) || item.id.length < urlMap.get(item.title).length) {
      urlMap.set(item.title, item.id)
    }
  })

  // Create an array of unique items based on the shortest URL for each title
  return array.filter(item => urlMap.get(item.title) === item.id)
}

watch(searchText, async (value) => {
  selectedIndex.value = 0
  if (searchData.value) {
    results.value = removeDuplicatesByTitleAndURL(searchData.value.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    )).slice(0, 10)
  } else {
    results.value = []
  }
})

onMounted(() => {
  requestAnimationFrame(() => {
    document.addEventListener('keyup', handleKeyUp)
  })
})

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyUp)
})

const handleKeyUp = async (e: KeyboardEvent) => {
  if (modelValue.value && results.value?.length > 0) {
    if (e.key === 'ArrowDown') {
      selectedIndex.value = selectedIndex.value !== results.value.length - 1
        ? selectedIndex.value + 1
        : 0
    } else if (e.key === 'ArrowUp') {
      selectedIndex.value = selectedIndex.value !== 0
        ? selectedIndex.value - 1
        : results.value.length - 1
    } else if (e.key === 'Enter') {
      await navigateTo(results.value[selectedIndex.value].id)
      modelValue.value = false
    }
  } else if (e.key === '/') {
    if (!e.target) return
    const tagName = (e.target as HTMLElement).tagName.toLowerCase();
    if (tagName === "textarea") return;
    if (tagName === "input") return;
    searchText.value = ''
    modelValue.value = true
    setFocusOnInput()
  }
}

const handleShowSearchModalClick = () => {
  searchText.value = ''
  modelValue.value = true
  setFocusOnInput()
}

const setFocusOnInput = () => {
  requestAnimationFrame(() => {
    searchTextRef.value?.focus()
  })
}
</script>
