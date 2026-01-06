<template>
  <div
    ref="root"
    :class="{
      'border-blue-200 dark:border-blue-800 prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none': quality === 'good',
      'border-gray-200 dark:border-gray-800 prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none': quality === 'average',
      'border-red-200 dark:border-red-800 prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none': quality === 'bad',
      'fixed inset-1 z-50 overflow-auto max-h-screen max-w-full ring-8 ring-white dark:ring-black': fullscreen,
      'relative': !fullscreen,
    }"
    class="max-w-none border rounded-sm bg-white dark:bg-black"
  >
    <Html v-if="fullscreen" class="overflow-hidden" />
    <div
      v-if="title"
      class="rounded-t-sm px-4 py-2 border-b flex items-center gap-2 relative"
      :class="{
        'bg-blue-25 dark:bg-blue-900 border-blue-100 dark:border-blue-900': quality === 'good',
        'bg-gray-25 dark:bg-gray-900 border-gray-100 dark:border-gray-900': quality === 'average',
        'bg-red-25 dark:bg-red-900 border-red-100 dark:border-red-900': quality === 'bad',
        'sticky top-0': fullscreen,
      }"
    >
      <Icon
        name="material-symbols:code"
        class="w-5 h-5"
        alt="Close fullscreen icon"
      />
      <p class="text-sm text-gray-700 dark:text-gray-300 my-auto pt-2">{{ title }}</p>
      <div
        v-if="quality !== 'average'"
        class="absolute left-1/2 -translate-x-1/2 text-sm p-2 rounded-sm flex gap-1 items-center"
        :class="{
          'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200': quality === 'good',
          'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200': quality === 'bad'
        }"
      >
        <Icon
          v-if="quality === 'bad'"
          name="material-symbols:warning-outline"
          class="w-4 h-4"
          alt="Warning icon"
        />
        <Icon
          v-if="quality === 'good'"
          name="material-symbols:check-circle-outline"
          class="w-4 h-4"
          alt="Good quality icon"
        />
        <span>{{ quality === 'good' ? 'Compliant' : 'Non-compliant' }} code</span>
      </div>
      <div class="ml-auto flex">
        <SdsTooltip
          v-if="$slots.complete"
          size="auto"
        >
          <template #trigger>
            <SdsActionButton
              title="Toggle complete code"
              class="p-2"
              @click="useCompleteBlock = !useCompleteBlock"
            >
              <Icon
                v-if="useCompleteBlock"
                name="material-symbols:visibility"
                class="w-4 h-4"
                alt="Show complete code icon"
              />
              <Icon
                v-else
                name="imaterial-symbols:visibility-off"
                class="w-4 h-4"
                alt="Hide complete code icon"
              />
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
              <Icon
                name="material-symbols:file-copy"
                class="w-4 h-4"
                alt="Copy code icon"
              />
              <span class="sr-only">Copy to clipboard</span>
            </template>
            <template v-else>
              <Icon
                name="material-symbols:check"
                class="w-4 h-4 text-green-400"
                alt="Copied code icon"
              />
              <span class="text-xs">Copied!</span>
            </template>
            </SdsActionButton>
          </template>
          <p>Copy to clipboard</p>
        </SdsTooltip>
        <SdsTooltip size="auto">
          <template #trigger>
            <SdsActionButton
              title="Toggle fullscreen"
              class="p-2"
              @click="fullscreen = !fullscreen"
            >
              <Icon
                v-if="fullscreen"
                name="material-symbols:close-fullscreen"
                class="w-4 h-4"
                alt="Close fullscreen icon"
              />
              <Icon
                v-else
                name="material-symbols:open-in-full"
                class="w-4 h-4"
                alt="Open fullscreen icon"
              />
              <span class="sr-only">Toggle fullscreen</span>
            </SdsActionButton>
          </template>
          <p>{{ fullscreen ? 'Exit' : 'Enter' }} fullscreen</p>
        </SdsTooltip>
      </div>
    </div>
    <div v-else class="absolute right-2 top-2 flex gap-1">
      <SdsTooltip size="auto">
        <template #trigger>
          <div
            v-if="quality !== 'average'"
            class="mx-auto text-sm p-2 rounded-sm flex items-center mr-1"
            :class="{
              'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200': quality === 'good',
              'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200': quality === 'bad'
            }"
            :title="`${ quality === 'good' ? 'Compliant' : 'Non-compliant' } code`"
          >
            <Icon
              v-if="quality === 'bad'"
              name="material-symbols:warning-outline"
              class="w-4 h-4"
              alt="Warning icon"
            />
            <Icon
              v-if="quality === 'good'"
              name="material-symbols:check-circle-outline"
              class="w-4 h-4"
              alt="Good quality icon"
            />
            <span class="sr-only">{{ quality === 'good' ? 'Compliant' : 'Non-compliant' }} code</span>
          </div>
        </template>
        <p>{{ quality === 'good' ? 'Compliant' : 'Non-compliant' }} code</p>
      </SdsTooltip>
      <SdsTooltip
        v-if="$slots.complete"
        size="auto"
      >
        <template #trigger>
          <SdsActionButton
            title="Toggle complete code"
            class="p-2"
            @click="useCompleteBlock = !useCompleteBlock"
          >
            <Icon
              v-if="useCompleteBlock"
              name="material-symbols:visibility"
              class="w-4 h-4"
              alt="Show complete code icon"
            />
            <Icon
              v-else
              name="material-symbols:visibility-off"
              class="w-4 h-4"
              alt="Hide complete code icon"
            />
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
              <Icon
                name="material-symbols:file-copy"
                class="w-4 h-4"
                alt="Copy code icon"
              />
              <span class="sr-only">Copy to clipboard</span>
            </template>
            <template v-else>
              <Icon
                name="material-symbols:check"
                class="w-4 h-4 text-green-400"
                alt="Copied code icon"
              />
              <span class="text-xs">Copied!</span>
            </template>
          </SdsActionButton>
        </template>
        <p>Copy to clipboard</p>
      </SdsTooltip>
      <SdsTooltip size="auto">
        <template #trigger>
          <SdsActionButton
            title="Toggle fullscreen"
            class="p-2"
            @click="fullscreen = !fullscreen"
          >
            <Icon
              v-if="fullscreen"
              name="material-symbols:close-fullscreen"
              class="w-4 h-4"
              alt="Close fullscreen icon"
            />
            <Icon
              v-else
              name="material-symbols:open-in-full"
              class="w-4 h-4"
              alt="Open fullscreen icon"
            />
            <span class="sr-only">Toggle fullscreen</span>
          </SdsActionButton>
        </template>
        <p>{{ fullscreen ? 'Exit' : 'Enter' }} fullscreen</p>
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

const fullscreen = ref(false)
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