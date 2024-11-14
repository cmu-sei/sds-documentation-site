<template>
  <div>
    <button
      ref="searchButtonRef"
      class="text-left text-sm w-full h-8 px-2 italic text-gray-600 transition-colors duration-150 transform bg-white border border-gray-300 rounded shadow-inner whitespace-nowrap dark:bg-gray-850 dark:text-gray-300 dark:border-gray-500 hover:text-gray-500 dark:hover:text-gray-300 hover:border-gray-400 dark:hover:border-gray-400 outline-none"
      title="Use '/' to bring up search anytime."
      @click="handleShowSearchModalClick"
      @keydown="handleShowSearchModalKeyDown"
    >
      <svg class="inline-block w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        />
      </svg>
      <span class="align-middle ml-2">Search</span>
    </button>
    <sds-modal v-model="modelValue">
      <template #title>
        <h2>Search</h2>
      </template>
      <input
        ref="searchTextRef"
        v-model="searchText"
        type="text"
        class="form-control"
        placeholder="Search all pages"
      />
      <nav v-if="results?.length" class="py-4">
        <nuxt-link
          v-for="(item, index) of results"
          :key="item.id"
          :to="item.id"
          class="grid w-full px-4 py-2 rounded"
          :class="{
            'bg-gray-50 dark:bg-gray-800': selectedIndex === index,
          }"
          @mouseover.native="selectedIndex = index"
          @focus.native="selectedIndex = index"
          @click.native="modelValue = false"
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
        class="p-6 my-4 text-blue-800 bg-blue-25 border border-blue-200 rounded dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200"
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

watch(searchText, async () => {
  selectedIndex.value = 0
  const response = await searchContent(searchText)
  results.value = response.value?.filter((item, index, self) =>
    index === self.findIndex((i) => i.title === item.title)
  ).slice(0, 10)
})

watch(modelValue, (value) => {
  if (!value) {
    searchButtonRef.value?.focus()
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
      selectedIndex.value !== results.value.length - 1
        ? selectedIndex.value++
        : (selectedIndex.value = 0)
    } else if (e.key === 'ArrowUp') {
      selectedIndex.value !== 0
        ? selectedIndex.value--
        : (selectedIndex.value = results.value.length - 1)
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

const handleShowSearchModalKeyDown = (e: KeyboardEvent) => {
  const input = String.fromCharCode(e.keyCode)
  const isAlphaNum = /[a-zA-Z0-9-_ ]/.test(input)
  if (!isAlphaNum || e.metaKey) return
  if (!modelValue.value)
    searchText.value = String.fromCharCode(e.keyCode).trim()
  modelValue.value = true
  setFocusOnInput()
}

const setFocusOnInput = () => {
  requestAnimationFrame(() => {
    searchTextRef.value?.focus()
  })
}
</script>
