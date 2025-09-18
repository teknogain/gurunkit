---
title: Badge  
description: A guide to using the badge component.
---

`Badge` is a simple, colored label component that supports text, icons, and various color variants. Useful for displaying contextual tags such as status, category, or count.

> **Note:** This component relies on the following external components to function properly:
> * **Iconify** – used to render icons via the `icon` prop. [Follow the installation guide here](https://iconify.design/docs/icon-components/vue/).

---

## Base Component

```vue
<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  color: {
    type: String,
    default: 'info',
    validator: (val) => ['info', 'error', 'warning', 'success', 'secondary'].includes(val),
  },
  icon: String,
});

const colorClass = computed(() => {
  return {
    info: 'bg-blue-100 text-blue-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800',
    secondary: 'bg-secondary-100 text-secondary-800',
  }[props.color];
});
</script>

<template>
  <span
    :class="[
      'h-6 px-2 inline-flex items-center justify-center text-sm rounded font-medium gap-2',
      colorClass,
    ]"
  >
    <Icon v-if="icon" :icon="icon" />
    <slot />
  </span>
</template>
```

---

## Props

| Prop     | Type   | Default     | Description                                                                                       |
| -------- | ------ | ----------- | ------------------------------------------------------------------------------------------------- |
| `color`  | String | `'info'`    | Color variant of the badge. Options: `'info'`, `'error'`, `'warning'`, `'success'`, `'secondary'`. |
| `icon`   | String | `undefined` | Name or identifier of the icon to render alongside the badge text.                                |

## Slots

| Slot    | Description                               |
| ------- | ----------------------------------------- |
| default | Content/message to be shown in the badge. |