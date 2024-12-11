<template>
  <div
    ref="root"
    :class="{
      'bg-green-25 dark:bg-green-950 border-green-200 dark:border-green-800 prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none': quality === 'good',
      'bg-white dark:bg-black border-gray-200 dark:border-gray-800 prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none': quality === 'average',
      'bg-red-25 dark:bg-red-950 border-red-200 dark:border-red-800 prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none': quality === 'bad',
    }"
    class="max-w-none border rounded"
  >
    <div class="rounded-t bg-white/50 dark:bg-white/5 p-2 border-b border-gray-100 dark:border-gray-900 flex">
      <p v-if="title" class="text-sm text-gray-700 dark:text-gray-300">{{ title }}</p>
      <div class="ml-auto flex gap-1">
        <button
          v-if="$slots.complete"
          class="flex gap-2 items-center text-xs hover:text-white hover:bg-gray-800 p-2 rounded"
          :class="{
            'text-white bg-gray-800': useCompleteSnippet
          }"
          @click="useCompleteSnippet = !useCompleteSnippet"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="32"
            viewBox="0 0 640 512"
            class="h-4 w-4 inline-block"
          >
            <path
              fill="currentColor"
              d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6m80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3l89.3 89.4l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3"
            />
          </svg>
          <span class="sr-only">Toggle complete code</span>
        </button>
        <button
          class="flex gap-2 items-center text-xs hover:text-white hover:bg-gray-800 p-2 rounded"
          @click="copyToClipboard"
        >
          <template v-if="!isCopyingToClipboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
              class="h-3 w-3 inline-block"
            >
              <path
                fill="currentColor"
                d="M384 96V0H272c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48V128h-95.1c-18.5 0-32.9-14.4-32.9-32zm32-96v96h96L416 0zM192 352V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48v-48h-32c-35.3 0-64-28.7-64-64z"
              />
            </svg>
            <span class="sr-only">Copy to clipboard</span>
          </template>
          <template v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="32"
              viewBox="0 0 448 512"
              class="h-3 w-3 inline-block text-green-400"
            >
              <path
                fill="currentColor"
                d="M438.6 105.4c12.5 12.5 12.5 32.7 0 45.2l-256 256c-12.5 12.5-32.7 12.5-45.2 0L9.372 278.6c-12.496-12.5-12.496-32.7 0-45.2c12.498-12.5 32.758-12.5 45.258 0L159.1 338.7l234.3-233.3c12.5-12.52 32.7-12.52 45.2 0z"
              />
            </svg>
            <span>Copied!</span>
          </template>
        </button>
      </div>
    </div>
    <div
      data-id="content"
      class="prose prose-blue dark:prose-invert prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none"
    >
      <ContentSlot v-if="useCompleteSnippet" :use="$slots.complete" />
      <ContentSlot v-else :use="$slots.default" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: { type: String, default: undefined },
  quality: {
    type: String as PropType<'good' | 'average' | 'bad'>,
    default: 'average'
  },
})

const useCompleteSnippet = ref(false)

const root = ref<HTMLElement>()
const isCopyingToClipboard = ref(false)
const copyToClipboard = () => {
  isCopyingToClipboard.value = true
  const contentEl = root.value?.querySelector('[data-id="content"]')
  navigator.clipboard.writeText(contentEl?.textContent || '')
  setTimeout(() => {
    isCopyingToClipboard.value = false
  }, 2000)
}
</script>