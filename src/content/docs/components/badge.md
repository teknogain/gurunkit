---
title: Badge  
description: A guide to using the badge component.
---

`Badge` is a simple, colored label component that supports text and various color variants. Useful for displaying contextual tags such as status, category, or count.

---

## Base Component

```vue
<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'info',
    validator: (val) => ['info', 'error', 'warning', 'amber', 'success', 'secondary'].includes(val),
  },
});

const colorClass = computed(() => {
  return {
    info: 'bg-blue-100 text-blue-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    success: 'bg-success-100 text-success-800',
    secondary: 'bg-secondary-100 text-secondary-800',
  }[props.color];
});
</script>

<template>
  <span
    :class="[
      'h-6 px-2 inline-flex items-center justify-center text-sm rounded font-medium',
      colorClass,
    ]"
  >
    <slot />
  </span>
</template>
```

---

## Props

| Prop        | Type    | Default  | Description                                                                                        |
| ----------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| `color`     | String  | `'info'` | Color variant of the badge. Options: `'info'`, `'error'`, `'warning'`, `'success'`, `'secondary'`. |

## Slots

| Slot    | Description                               |
| ------- | ----------------------------------------- |
| default | Content/message to be shown in the badge. |