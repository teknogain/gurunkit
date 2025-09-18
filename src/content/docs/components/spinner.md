---
title: Spinner  
description: A guide to using the spinner component.
---

`Spinner` is a lightweight and customizable loading indicator component. It displays a loader icon with configurable color variants and size options, making it suitable for buttons, cards, or full-page loading states.

> **Note:** This component relies on the following external components to function properly:
> * **Iconify** – used to render the loader icon. [Follow the installation guide here](https://iconify.design/docs/icon-components/vue/).

---

## Base Component

```vue
<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  color: {
    type: String,
    default: 'light',
    validator: (value) =>
      [
        'info',
        'light-primary',
        'light',
        'light-warning',
        'light-success',
        'light-error',
        'secondary',
      ].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['md', 'lg'].includes(value),
  },
});

const colorClass = computed(() => {
  return {
    light: 'text-gray-200',
    info: 'text-blue-600',
    'light-primary': 'text-blue-200',
    'light-error': 'text-red-200',
    'light-success': 'text-green-200',
    'light-warning': 'text-yellow-200',
    secondary: 'text-gray-700',
  }[props.color];
});
const sizeClass = computed(() => {
  return {
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  }[props.size || 'md'];
});
</script>

<template>
  <Icon
    icon="tabler:loader"
    :class="['animate-spin', colorClass, sizeClass]"
  />
</template>
```

---

## Props

| Prop    | Type   | Default   | Description                                                                                          |
| ------- | ------ | --------- | ---------------------------------------------------------------------------------------------------- |
| `color` | String | `'white'` | Sets the spinner color variant. Options: `'blue'`, `'white'`, `'yellow'`, `'green'`, `'red'`. The `text-*` color affects the ring and `fill-*` the inner stroke. |
| `size`  | String | `'md'`    | Sets the spinner size. Options: `'md'`, `'lg'`.                                                       |

## Slots

This component does not use any slots.