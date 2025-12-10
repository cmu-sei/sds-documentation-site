<template>
  <div>
    <!-- Button toggle for items with children -->
    <button
      v-if="hasChildren"
      ref="triggerRef"
      type="button"
      class="tab tab-underline tab-red py-5 flex items-center gap-1"
      :title="item.title"
      :class="{
        active: isActive,
      }"
      :aria-expanded="isOpen"
      :aria-haspopup="'true'"
      @click="toggleMenu"
      @keydown="handleTriggerKeydown"
    >
      {{ item.title }}
      <Icon
        name="material-symbols:keyboard-arrow-down"
        class="w-4 h-4 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        aria-hidden="true"
      />
    </button>
    
    <!-- Regular link for items without children -->
    <NuxtLink
      v-else
      ref="triggerRef"
      :to="item.path"
      class="tab tab-underline tab-red py-5 flex items-center gap-1"
      :title="item.title"
      :class="{
        active: isActive,
      }"
      @mouseenter="prefetchPage(item.path)"
    >
      {{ item.title }}
    </NuxtLink>

    <!-- Mega Menu Dropdown - Teleported to body -->
    <ClientOnly>
      <Teleport to="body">
        <Transition
          enter-active-class="transition duration-150 ease-out origin-top"
          enter-from-class="opacity-0 scale-y-95"
          enter-to-class="opacity-100 scale-y-100"
          leave-active-class="transition duration-150 ease-in origin-top"
          leave-from-class="opacity-100 scale-y-100"
          leave-to-class="opacity-0 scale-y-95"
        >
          <div
            v-if="isOpen && hasChildren"
            ref="dropdownRef"
            role="menu"
            :aria-label="`${item.title} submenu`"
            class="fixed w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-b-lg shadow-lg z-50 origin-top"
            :style="dropdownStyle"
            @keydown="handleDropdownKeydown"
          >
            <div class="p-4">
              <div class="grid gap-2">
                <!-- View All link -->
                <div>
                  <NuxtLink
                    :to="item.path"
                    role="menuitem"
                    tabindex="-1"
                    data-index="0"
                    class="group block p-3 rounded-lg focus:outline-none"
                    @mouseenter="prefetchPage(item.path)"
                    @click="closeMenu"
                  >
                    <span class="flex items-center gap-2">
                      <span class="font-semibold text-sm text-red-600 dark:text-red-300 group-hover:underline group-focus-visible:underline">
                        {{ item.title }}
                      </span>
                      <Icon
                        name="material-symbols:arrow-forward"
                        class="w-4 h-4 text-red-600 dark:text-red-300"
                      />
                    </span>
                  </NuxtLink>
                </div>

                <hr class="border-gray-100 dark:border-gray-800">
                
                <!-- Child items -->
                <div v-for="(child, childIndex) in item.children" :key="child.path">
                  <NuxtLink
                    :to="child.path"
                    role="menuitem"
                    tabindex="-1"
                    :data-index="childIndex + 1"
                    class="group block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-800"
                    @mouseenter="prefetchPage(child.path)"
                    @click="closeMenu"
                  >
                    <span class="flex items-start gap-3">
                      <Icon
                        v-if="child.icon"
                        :name="(child.icon as string)"
                        class="w-5 h-5 mt-0.5 shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-300"
                      />
                      <span class="flex-1 min-w-0">
                        <span class="text-sm text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-300">
                          {{ child.title }}
                        </span>
                      </span>
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "#components";
import type { ContentNavigationItem } from "@nuxt/content";

interface Props {
  item: ContentNavigationItem;
  isActive: boolean;
  prefetchPage: (path: string) => Promise<void>;
  index: number;
  total: number;
}

const props = defineProps<Props>();

// Shared state across all MegaMenu instances to track any open dropdown
const globalOpenState = useState<string | null>('megamenu-open-id', () => null);

const isOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const dropdownStyle = ref({});
const currentFocusIndex = ref(0);

const menuId = computed(() => props.item.path);

const hasChildren = computed(() => {
  return props.item.children && props.item.children.length > 0;
});

const updateDropdownPosition = () => {
  if (!triggerRef.value || !import.meta.client) return;
  
  const triggerEl = ('$el' in triggerRef.value ? triggerRef.value.$el : triggerRef.value) as HTMLElement;
  const rect = triggerEl.getBoundingClientRect();
  const dropdownWidth = 256; // w-64 = 16rem = 256px
  const offset = 0; // Offset in pixels for middle items
  
  let left: number;
  
  // First item: align left edge with trigger (no offset)
  if (props.index === 0) {
    left = rect.left;
  }
  // Last item: align right edge with trigger (right aligned)
  else if (props.index === props.total - 1) {
    left = rect.right - dropdownWidth;
  }
  // Middle items: slight offset to the left
  else {
    left = rect.left - offset;
  }
  
  // Adjust if dropdown would overflow viewport on the left
  if (left < 16) {
    left = 16;
  }
  
  // Adjust if dropdown would overflow viewport on the right
  if (left + dropdownWidth > window.innerWidth - 16) {
    left = window.innerWidth - dropdownWidth - 16;
  }
  
  dropdownStyle.value = {
    top: `${rect.bottom}px`,
    left: `${left}px`,
  };
};

const closeMenu = () => {
  isOpen.value = false;
  currentFocusIndex.value = 0;
  if (globalOpenState.value === menuId.value) {
    globalOpenState.value = null;
  }
};

const toggleMenu = () => {
  if (isOpen.value) {
    closeMenu();
  } else {
    openMenu();
  }
};

const openMenu = () => {
  if (!hasChildren.value) return;
  
  if (globalOpenState.value !== null && globalOpenState.value !== menuId.value) {
    globalOpenState.value = null;
    nextTick(() => {
      globalOpenState.value = menuId.value;
      isOpen.value = true;
      updateDropdownPosition();
      focusMenuItem(0);
    });
  } else {
    globalOpenState.value = menuId.value;
    isOpen.value = true;
    nextTick(() => {
      updateDropdownPosition();
      focusMenuItem(0);
    });
  }
};

const focusMenuItem = (index: number) => {
  nextTick(() => {
    const items = dropdownRef.value?.querySelectorAll('[role="menuitem"]');
    if (items?.[index]) {
      (items[index] as HTMLElement).focus();
      currentFocusIndex.value = index;
    }
  });
};

const focusTrigger = () => {
  const triggerEl = (triggerRef.value && '$el' in triggerRef.value ? triggerRef.value.$el : triggerRef.value) as HTMLElement | null;
  triggerEl?.focus();
};

// Handle keyboard on trigger (top-level navigation item)
const handleTriggerKeydown = (event: KeyboardEvent) => {
  if (!hasChildren.value) return;

  // Space: Open menu and focus first item
  if (event.key === ' ') {
    event.preventDefault();
    if (!isOpen.value) {
      openMenu();
    }
  }
  // Enter: Open/close menu toggle
  else if (event.key === 'Enter') {
    event.preventDefault();
    toggleMenu();
  }
  // Escape: Close menu if open
  else if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault();
    closeMenu();
  }
};

// Handle keyboard within dropdown menu
const handleDropdownKeydown = (event: KeyboardEvent) => {
  if (!dropdownRef.value) return;
  
  const items = dropdownRef.value.querySelectorAll('[role="menuitem"]');
  const currentIndex = currentFocusIndex.value;

  switch (event.key) {
    case 'Tab':
      event.preventDefault();
      closeMenu();
      focusTrigger();
      nextTick(() => {
        const triggerEl = (triggerRef.value && '$el' in triggerRef.value ? triggerRef.value.$el : triggerRef.value) as HTMLElement | null;
        if (triggerEl) {
          const focusableElements = Array.from(
            document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
          ) as HTMLElement[];
          const currentIdx = focusableElements.indexOf(triggerEl);
          
          if (event.shiftKey && currentIdx > 0) {
            focusableElements[currentIdx - 1]?.focus();
          } else if (!event.shiftKey && currentIdx < focusableElements.length - 1) {
            focusableElements[currentIdx + 1]?.focus();
          }
        }
      });
      break;

    case 'ArrowDown':
      event.preventDefault();
      // Move to next item, wrap to first
      focusMenuItem((currentIndex + 1) % items.length);
      break;

    case 'ArrowUp':
      event.preventDefault();
      // Move to previous item, wrap to last if on first
      if (currentIndex === 0) {
        focusMenuItem(items.length - 1);
      } else {
        focusMenuItem(currentIndex - 1);
      }
      break;

    case ' ':
      event.preventDefault();
      // Space closes menu and returns to trigger
      closeMenu();
      focusTrigger();
      break;

    case 'Escape':
      event.preventDefault();
      closeMenu();
      focusTrigger();
      break;

    case 'Home':
      event.preventDefault();
      focusMenuItem(0);
      break;

    case 'End':
      event.preventDefault();
      focusMenuItem(items.length - 1);
      break;
  }
};

// Watch global state to close this dropdown if another opens
watch(globalOpenState, (newValue) => {
  if (newValue !== menuId.value && isOpen.value) {
    isOpen.value = false;
  }
});

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (!isOpen.value) return;
  
  const target = event.target as HTMLElement;
  const triggerEl = (triggerRef.value && '$el' in triggerRef.value ? triggerRef.value.$el : triggerRef.value) as HTMLElement | null;
  
  if (triggerEl && !triggerEl.contains(target) && dropdownRef.value && !dropdownRef.value.contains(target)) {
    closeMenu();
  }
};

// Update position on scroll or resize
onMounted(() => {
  window.addEventListener('scroll', updateDropdownPosition, true);
  window.addEventListener('resize', updateDropdownPosition);
  document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateDropdownPosition, true);
  window.removeEventListener('resize', updateDropdownPosition);
  document.removeEventListener('click', handleClickOutside, true);
});
</script>
