---
title: Alert  
description: A guide to using the alert component.
---

`Alert` is a simple, colored alert component that supports icons, loading spinners, and optional close functionality. Useful for displaying contextual messages such as success, warning, or error.

> **Note:** This component relies on the following external components to function properly:
> * **Iconify** – used to render icons via the `icon` prop. [Follow the installation guide here](https://iconify.design/docs/icon-components/vue/).
> * **Spinner** – used to show a loading indicator when the `loading` prop is active. [Read the integration guide here](/components/spinner).

---

## Base Component

```vue
<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import Spinner from './Spinner.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'info',
    validator: (value) =>
      [
        'info',
        'error',
        'warning',
        'success',
        'secondary',
      ].includes(value),
  },
  loading: Boolean,
  withClose: Boolean,
});
const emit = defineEmits(['close']);

const colorClass = computed(() => {
  return {
    info: 'bg-blue-100 border-blue-300 text-blue-600',
    error: 'bg-red-100 border-red-300 text-red-600',
    warning: 'bg-yellow-100 border-yellow-300 text-yellow-700',
    success: 'bg-green-100 border-green-300 text-green-600',
    secondary: 'bg-gray-100 border-gray-300 text-gray-600',
  }[props.color || 'blue'];
});

const icon = computed(() => {
  return {
    info: 'tabler:info-circle-filled',
    error: 'tabler:alert-circle-filled',
    warning: 'tabler:alert-circle-filled',
    success: 'tabler:circle-check-filled',
    secondary: 'tabler:info-circle-filled',
  }[props.color || 'blue'];
});
</script>

<template>
  <div
    :class="[
      'px-4 py-3 rounded-md border flex items-start justify-between gap-2',
      colorClass,
    ]"
  >
    <div class="flex items-start gap-2">
      <Spinner
        v-if="loading"
        class="mt-1"
        :color="props.color"
      />
      <Icon
        v-else
        :icon="icon"
        class="size-4 mt-1 shrink-0"
      />
      <slot />
    </div>
    <button
      v-if="withClose"
      class="mt-1 cursor-pointer"
      @click="emit('close')"
    >
      <Icon icon="tabler:x" />
    </button>
  </div>
</template>
```

---

## Props

| Prop        | Type    | Default  | Description                                                                                        |
| ----------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| `color`     | String  | `'info'` | Color variant of the alert. Options: `'info'`, `'error'`, `'warning'`, `'success'`, `'secondary'`. |
| `loading`   | Boolean | `false`  | If `true`, shows a loading spinner instead of the icon.                                            |
| `withClose` | Boolean | `false`  | If `true`, displays a close button on the right side of the alert.                                 |

## Emits

| Event   | Description                               |
| ------- | ----------------------------------------- |
| `close` | Emitted when the close button is clicked. |

## Slots

| Slot    | Description                               |
| ------- | ----------------------------------------- |
| default | Content/message to be shown in the alert. |