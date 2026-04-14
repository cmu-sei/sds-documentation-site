<template>
  <div>
    <SdsActionButton
      ref="searchButtonRef"
      size="md"
      title="Use '/' to bring up search anytime."
      @click="handleShowSearchModalClick"
    >
      <Icon
        name="material-symbols:search"
        class="w-5 h-5"
        alt="Search icon"
      />
      <span class="sr-only">Search</span>
    </SdsActionButton>
    <sds-modal v-model="modelValue" size="lg">
      <template #title>
        <h2>Search</h2>
      </template>
      <label for="search-input" class="sr-only">Search all pages</label>
      <input
        id="search-input"
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
          @mouseover="selectedIndex = parseInt(`${index}`)"
          @focus="selectedIndex = parseInt(`${index}`)"
          @click="modelValue = false"
        >
          <span>{{ item.title }}</span>
          <span
            v-if="item.titles?.length > 0"
            class="text-sm text-gray-600 dark:text-gray-400"
          >{{ item.titles[0] }}</span>
        </nuxt-link>
      </nav>
      <SdsCallout
        v-else
        type="subtle"
        variant="blue"
        class="mt-4"
      >
        <p v-if="searchText === ''">
          Type a query in the search box above to display a list of results.
        </p>
        <p v-else>No results found. Try to simplify your query.</p>
      </SdsCallout>
    </sds-modal>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel({
  type: Boolean,
  default: false
})

const searchTextRef = ref<HTMLElement>()
const searchText = ref('')
const selectedIndex = ref(0)
const results = ref()
const searchDataLoaded = ref(false)

// Lazy load search data only when search is opened for the first time
const searchData = ref<{ id: string; title: string; titles: string[]; level: number; content: string; }[] | null>(null)

// Load search data on demand
const loadSearchData = async () => {
  if (searchDataLoaded.value || !modelValue.value) return
  
  searchDataLoaded.value = true
  const data = await queryCollectionSearchSections('content')
  searchData.value = data
}

// Watch modal opening to trigger search data load
watch(modelValue, (isOpen) => {
  if (isOpen && !searchDataLoaded.value) {
    loadSearchData()
  }
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

// Debounced search function to improve performance
const performSearch = (value: unknown) => {
  const searchValue = typeof value === 'string' ? value : '';
  selectedIndex.value = 0
  if (searchData.value) {
    results.value = removeDuplicatesByTitleAndURL(searchData.value.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )).slice(0, 10)
  } else {
    results.value = []
  }
}

// Debounce search with 300ms delay to reduce computations while typing
const debouncedSearch = debounce(performSearch, 300)

watch(searchText, (value) => {
  debouncedSearch(value)
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
  } else if (e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
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
