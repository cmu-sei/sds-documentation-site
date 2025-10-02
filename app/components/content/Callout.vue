<template>
  <div class="not-prose my-8">
    <SdsCallout v-bind="$attrs">
      <template v-if="$slots.leftIcon" #leftIcon>
        <slot name="leftIcon" />
      </template>
      <slot />
      <template v-if="$slots.buttons" #buttons>
        <slot name="buttons" />
      </template>
    </SdsCallout>
  </div>
</template>