<template>
  <nav aria-label="On this page">
    <NuxtLink 
      v-for="i in items" 
      :key="i.id" 
      :to="{ hash: `#${i.id}` }" 
      data-id="sds-scrollspy"
      :class="{
        [itemClass]: true,
        [activeClass]: activeId === i.id,
        [inactiveClass]: activeId !== i.id
      }"
      @click.prevent="handleClick(i.id)"
    >
      <!-- @slot Default content. Determines the content of the item link. @binding item -->
      <slot :item="i">{{ i.text }}</slot>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CustomScrollspy'
})

const props = defineProps({
  /**
   * Determines the items list that is observed when the page scrolls.
   * 
   * This accepts an array of objects.
   * 
   * Example object:
   * 
   * `{ id: string, text: string }`
   * 
   * The object's `id` property should be a unique id for an HTML element. For example,
   * if you want the item to observe `<div id="test">`, the `id` would
   * be `test`.
   * 
   * The object's `text` property should be the content of the link that is observing
   * the page.
   */
  items: {
    type: Array as PropType<{ id: string, text: string }[]>,
    default: () => [],
  },
  /**
   * The HTML selector of the container for the element being spied upon.
   */
  parent: { type: String, default: undefined },
  /**
   * Determines the CSS class list for each item.
   */
  itemClass: { type: String, default: '' },
  /**
   * Determines the CSS class list for the active item.
   */
  activeClass: { type: String, default: '' },
  /**
   * Determines the CSS class list for the inactive items.
   */
  inactiveClass: { type: String, default: '' }
})

const router = useRouter()
const { scrollToElement } = useScrollToHash()

const activeId = ref<string>()
let observer: IntersectionObserver | null = null
const visibleElements = new Set<string>()

const handleClick = (id: string) => {
  // Update the URL hash
  router.push({ hash: `#${id}` })
  // Scroll to the element
  scrollToElement(`#${id}`)
  // Update active state immediately
  activeId.value = id
}

const parentEl = computed<HTMLElement | null>(() => {
  if (typeof document === 'undefined') return null
  return props.parent ? document.querySelector(props.parent) : null
})

const updateActiveId = () => {
  if (visibleElements.size === 0) {
    // No elements visible, keep current active (don't reset)
    return
  }

  // Find the first visible item in document order
  const firstVisible = props.items.find(item => visibleElements.has(item.id))
  if (firstVisible) {
    activeId.value = firstVisible.id
  }
}

const setupObserver = () => {
  // Clean up existing observer
  if (observer) {
    observer.disconnect()
  }

  visibleElements.clear()

  if (!props.items.length) return

  // Create intersection observer with optimized settings
  const observerOptions: IntersectionObserverInit = {
    root: parentEl.value,
    rootMargin: '-80px 0px -75% 0px', // Top zone for active detection
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    // Track which elements are entering/leaving the intersection zone
    let hasChanges = false
    
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.id) {
        if (!visibleElements.has(entry.target.id)) {
          visibleElements.add(entry.target.id)
          hasChanges = true
        }
      } else if (entry.target.id) {
        if (visibleElements.has(entry.target.id)) {
          visibleElements.delete(entry.target.id)
          hasChanges = true
        }
      }
    })

    // Only update if there were actual changes
    if (hasChanges) {
      updateActiveId()
    }
  }, observerOptions)

  // Observe all heading elements
  requestAnimationFrame(() => {
    props.items.forEach(item => {
      const element = document.getElementById(item.id)
      if (element && observer) {
        observer.observe(element)
      }
    })
  })
}

// Watch for items changes and re-setup observer
watch(() => props.items, () => {
  requestAnimationFrame(setupObserver)
}, { deep: true })

onMounted(() => {
  // Set initial active item
  if (props.items.length > 0 && props.items[0]) {
    activeId.value = props.items[0].id
  }
  
  // Setup observer after a short delay to ensure DOM is ready
  setTimeout(setupObserver, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>
