---
title: Container  
description: A guide to using the container component.
---

`Container` is a reusable layout wrapper component designed to control maximum container width based on the provided screen size breakpoint. It uses Tailwind CSS utility classes and allows consistent layout spacing across your application.

---

## Base Component

```vue
<script setup>
import { computed } from 'vue';

const props = defineProps({
  maxScreen: {
    type: String,
    validator: (val) => ['sm', 'md', 'lg', 'xl'].includes(val),
  },
  tag: {
    type: String,
    default: 'div',
  },
});

const containerClass = computed(() => {
  if (!props.maxScreen) {
    return '';
  }

  const maxScreenBreakpoints = {
    sm: 'md:max-w-screen-sm lg:max-w-screen-sm xl:max-w-screen-sm 2xl:max-w-screen-sm',
    md: 'lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md',
    lg: 'xl:max-w-screen-lg 2xl:max-w-screen-lg',
    xl: '2xl:max-w-screen-xl',
  };

  return maxScreenBreakpoints[props.maxScreen];
});
</script>

<template>
  <component
    :is="tag"
    :class="['container mx-auto px-4 sm:px-6 lg:px-8', containerClass]"
  >
    <slot />
  </component>
</template>
```

---

## Props

| Prop        | Type   | Default  | Description |
| ----------- | ------ | -------- | ----------- |
| `maxScreen` | String | — | (Optional) Determines the maximum container width at specific breakpoints. <br>Accepted values: `'sm'`, `'md'`, `'lg'`, `'xl'`. |

## Slots

| Slot    | Description                                      |
| ------- | ------------------------------------------------ |
| default | The content to be rendered inside the container. |
