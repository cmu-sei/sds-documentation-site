<template>
  <div
    ref="root"
    :class="{
      'border-blue-200 dark:border-blue-800 prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none': quality === 'good',
      'border-gray-200 dark:border-gray-800 prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none': quality === 'average',
      'border-red-200 dark:border-red-800 prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none': quality === 'bad',
    }"
    class="max-w-none border rounded-sm relative bg-white dark:bg-black"
  >
    <div
      v-if="title"
      class="rounded-t-sm px-4 py-2 border-b flex items-center gap-2 relative"
      :class="{
        'bg-blue-25 dark:bg-blue-900 border-blue-100 dark:border-blue-900': quality === 'good',
        'bg-gray-25 dark:bg-gray-900 border-gray-100 dark:border-gray-900': quality === 'average',
        'bg-red-25 dark:bg-red-900 border-red-100 dark:border-red-900': quality === 'bad',
      }"
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
      <p class="text-sm text-gray-700 dark:text-gray-300">{{ title }}</p>
      <div
        v-if="quality !== 'average'"
        class="absolute left-1/2 -translate-x-1/2 text-sm p-2 rounded-sm flex gap-1 items-center"
        :class="{
          'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200': quality === 'good',
          'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200': quality === 'bad'
        }"
      >
        <svg
          v-if="quality === 'bad'"
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="10"
          viewBox="0 0 11 10"
          fill="none"
          class="w-4 h-auto inline-block"
        >
          <path
            d="M10.3828 8.39453C10.6953 8.94141 10.3047 9.625 9.66016 9.625H1.32031C0.675781 9.625 0.285156 8.94141 0.578125 8.39453L4.75781 1.28516C4.93359 1.01172 5.20703 0.875 5.5 0.875C5.77344 0.875 6.04688 1.01172 6.22266 1.28516L10.3828 8.39453ZM1.51562 8.6875H9.46484L5.48047 1.91016L1.51562 8.6875ZM5.5 6.85156C5.83203 6.85156 6.10547 7.125 6.10547 7.45703C6.10547 7.78906 5.83203 8.0625 5.5 8.0625C5.14844 8.0625 4.875 7.78906 4.875 7.45703C4.875 7.125 5.14844 6.85156 5.5 6.85156ZM5.03125 3.84375C5.03125 3.58984 5.22656 3.375 5.5 3.375C5.75391 3.375 5.96875 3.58984 5.96875 3.84375V5.71875C5.96875 5.99219 5.75391 6.1875 5.5 6.1875C5.22656 6.1875 5.03125 5.99219 5.03125 5.71875V3.84375Z"
            fill="currentColor"
          />
        </svg>
        <svg
          v-if="quality === 'good'"
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          class="w-4 h-auto inline-block"
        >
          <path
            d="M5.24609 6.89062C5.03125 7.10547 4.69922 7.10547 4.48438 6.89062L3.23438 5.64062C3.01953 5.42578 3.01953 5.09375 3.23438 4.87891C3.44922 4.66406 3.78125 4.66406 3.99609 4.87891L4.875 5.73828L6.98438 3.62891C7.19922 3.41406 7.53125 3.41406 7.74609 3.62891C7.96094 3.84375 7.96094 4.17578 7.74609 4.39062L5.24609 6.89062ZM10.5 5.25C10.5 8.02344 8.25391 10.25 5.5 10.25C2.72656 10.25 0.5 8.02344 0.5 5.25C0.5 2.49609 2.72656 0.25 5.5 0.25C8.25391 0.25 10.5 2.49609 10.5 5.25ZM5.5 1.1875C3.25391 1.1875 1.4375 3.02344 1.4375 5.25C1.4375 7.49609 3.25391 9.3125 5.5 9.3125C7.72656 9.3125 9.5625 7.49609 9.5625 5.25C9.5625 3.02344 7.72656 1.1875 5.5 1.1875Z"
            fill="currentColor"
          />
        </svg>
        <span>{{ quality === 'good' ? 'Compliant' : 'Non-compliant' }} code</span>
      </div>
      <div class="ml-auto flex gap-1">
        <SdsTooltip size="auto">
          <template #trigger>
            <SdsActionButton
              v-if="$slots.complete"
              title="Toggle complete code"
              class="p-2"
              @click="useCompleteBlock = !useCompleteBlock"
            >
              <svg
                v-if="useCompleteBlock"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="32"
                viewBox="0 0 640 512"
                class="h-3.5 w-auto inline-block"
              >
                <path
                  fill="currentColor"
                  d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2s-6.3 25.5 4.1 33.7l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-105.2-82.4c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8zm184.3 144.4c25.5-23.3 59.6-37.5 96.9-37.5c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9.5-13.6 1.4-20.2l-94.3-74.3c-22.8 29.7-39.1 59.3-48.6 82.2c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1c47 43.8 111.7 80.6 192.5 80.6c47.8 0 89.9-12.9 126.2-32.5z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="32"
                viewBox="0 0 576 512"
                class="h-3.5 w-auto inline-block"
              >
                <path
                  fill="currentColor"
                  d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32M144 256a144 144 0 1 1 288 0a144 144 0 1 1-288 0m144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3"
                />
              </svg>
              <span class="sr-only">Toggle complete code</span>
            </SdsActionButton>
          </template>
          <p>Toggle complete code</p>
        </SdsTooltip>
        <SdsTooltip size="auto">
          <template #trigger>
            <SdsActionButton
              title="Copy to clipboard"
              class="p-2"
              @click="copyToClipboard"
            >
              <template v-if="!isCopyingToClipboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                  class="h-3.5 w-auto inline-block"
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
                  class="h-3.5 w-auto inline-block text-green-400"
                >
                  <path
                    fill="currentColor"
                    d="M438.6 105.4c12.5 12.5 12.5 32.7 0 45.2l-256 256c-12.5 12.5-32.7 12.5-45.2 0L9.372 278.6c-12.496-12.5-12.496-32.7 0-45.2c12.498-12.5 32.758-12.5 45.258 0L159.1 338.7l234.3-233.3c12.5-12.52 32.7-12.52 45.2 0z"
                  />
                </svg>
                <span class="text-xs">Copied!</span>
              </template>
            </SdsActionButton>
          </template>
          <p>Copy to clipboard</p>
        </SdsTooltip>
      </div>
    </div>
    <div v-else class="absolute right-2 top-2 flex gap-1">
      <SdsTooltip size="auto">
        <template #trigger>
          <div
            v-if="quality !== 'average'"
            class="mx-auto text-sm p-2 rounded-sm flex gap-1 items-center"
            :class="{
              'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200': quality === 'good',
              'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200': quality === 'bad'
            }"
            :title="`${ quality === 'good' ? 'Compliant' : 'Non-compliant' } code`"
          >
            <svg
              v-if="quality === 'bad'"
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              class="w-4 h-auto inline-block"
            >
              <path
                d="M10.3828 8.39453C10.6953 8.94141 10.3047 9.625 9.66016 9.625H1.32031C0.675781 9.625 0.285156 8.94141 0.578125 8.39453L4.75781 1.28516C4.93359 1.01172 5.20703 0.875 5.5 0.875C5.77344 0.875 6.04688 1.01172 6.22266 1.28516L10.3828 8.39453ZM1.51562 8.6875H9.46484L5.48047 1.91016L1.51562 8.6875ZM5.5 6.85156C5.83203 6.85156 6.10547 7.125 6.10547 7.45703C6.10547 7.78906 5.83203 8.0625 5.5 8.0625C5.14844 8.0625 4.875 7.78906 4.875 7.45703C4.875 7.125 5.14844 6.85156 5.5 6.85156ZM5.03125 3.84375C5.03125 3.58984 5.22656 3.375 5.5 3.375C5.75391 3.375 5.96875 3.58984 5.96875 3.84375V5.71875C5.96875 5.99219 5.75391 6.1875 5.5 6.1875C5.22656 6.1875 5.03125 5.99219 5.03125 5.71875V3.84375Z"
                fill="currentColor"
              />
            </svg>
            <svg
              v-if="quality === 'good'"
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              class="w-4 h-auto inline-block"
            >
              <path
                d="M5.24609 6.89062C5.03125 7.10547 4.69922 7.10547 4.48438 6.89062L3.23438 5.64062C3.01953 5.42578 3.01953 5.09375 3.23438 4.87891C3.44922 4.66406 3.78125 4.66406 3.99609 4.87891L4.875 5.73828L6.98438 3.62891C7.19922 3.41406 7.53125 3.41406 7.74609 3.62891C7.96094 3.84375 7.96094 4.17578 7.74609 4.39062L5.24609 6.89062ZM10.5 5.25C10.5 8.02344 8.25391 10.25 5.5 10.25C2.72656 10.25 0.5 8.02344 0.5 5.25C0.5 2.49609 2.72656 0.25 5.5 0.25C8.25391 0.25 10.5 2.49609 10.5 5.25ZM5.5 1.1875C3.25391 1.1875 1.4375 3.02344 1.4375 5.25C1.4375 7.49609 3.25391 9.3125 5.5 9.3125C7.72656 9.3125 9.5625 7.49609 9.5625 5.25C9.5625 3.02344 7.72656 1.1875 5.5 1.1875Z"
                fill="currentColor"
              />
            </svg>
            <span class="sr-only">{{ quality === 'good' ? 'Compliant' : 'Non-compliant' }} code</span>
          </div>
        </template>
        <p>{{ quality === 'good' ? 'Compliant' : 'Non-compliant' }} code</p>
      </SdsTooltip>
      <SdsTooltip size="auto">
        <template #trigger>
          <SdsActionButton
            v-if="$slots.complete"
            title="Toggle complete code"
            class="p-2"
            @click="useCompleteBlock = !useCompleteBlock"
          >
            <svg
              v-if="useCompleteBlock"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="32"
              viewBox="0 0 640 512"
              class="h-3.5 w-auto inline-block"
            >
              <path
                fill="currentColor"
                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2s-6.3 25.5 4.1 33.7l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-105.2-82.4c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8zm184.3 144.4c25.5-23.3 59.6-37.5 96.9-37.5c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9.5-13.6 1.4-20.2l-94.3-74.3c-22.8 29.7-39.1 59.3-48.6 82.2c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1c47 43.8 111.7 80.6 192.5 80.6c47.8 0 89.9-12.9 126.2-32.5z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="32"
              viewBox="0 0 576 512"
              class="h-3.5 w-auto inline-block"
            >
              <path
                fill="currentColor"
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32M144 256a144 144 0 1 1 288 0a144 144 0 1 1-288 0m144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3"
              />
            </svg>
            <span class="sr-only">Toggle complete code</span>
          </SdsActionButton>
        </template>
        <p>Toggle complete code</p>
      </SdsTooltip>
      <SdsTooltip size="auto">
        <template #trigger>
          <SdsActionButton
            title="Copy to clipboard"
            class="p-2"
            @click="copyToClipboard"
          >
            <template v-if="!isCopyingToClipboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
                class="h-3.5 w-auto inline-block"
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
                class="h-3.5 w-auto inline-block text-green-400"
              >
                <path
                  fill="currentColor"
                  d="M438.6 105.4c12.5 12.5 12.5 32.7 0 45.2l-256 256c-12.5 12.5-32.7 12.5-45.2 0L9.372 278.6c-12.496-12.5-12.496-32.7 0-45.2c12.498-12.5 32.758-12.5 45.258 0L159.1 338.7l234.3-233.3c12.5-12.52 32.7-12.52 45.2 0z"
                />
              </svg>
              <span class="text-xs">Copied!</span>
            </template>
          </SdsActionButton>
        </template>
        <p>Copy to clipboard</p>
      </SdsTooltip>
    </div>
    <div
      data-id="content"
      class="prose prose-blue dark:prose-invert prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none"
    >
      <slot v-if="useCompleteBlock" name="complete" />
      <slot v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineSlots<{
  default: () => unknown
  complete: () => unknown
}>()

defineProps({
  title: { type: String, default: undefined },
  quality: {
    type: String as PropType<'good' | 'average' | 'bad'>,
    default: 'average'
  },
})

const useCompleteBlock = ref(false)

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