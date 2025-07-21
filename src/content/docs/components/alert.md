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
    default: 'blue',
  },
  loading: Boolean,
  withClose: Boolean,
});
const emit = defineEmits(['close']);

const colorClass = computed(() => {
  return {
    blue: 'bg-blue-100 border-blue-300 text-blue-500',
    red: 'bg-red-100 border-red-300 text-red-500',
    yellow: 'bg-yellow-100 border-yellow-300 text-yellow-700',
    green: 'bg-green-100 border-green-300 text-green-500',
    gray: 'bg-gray-100 border-gray-300 text-gray-500',
  }[props.color || 'blue'];
});

const icon = computed(() => {
  return {
    blue: 'tabler:info-circle-filled',
    red: 'tabler:alert-circle-filled',
    yellow: 'tabler:alert-circle-filled',
    green: 'tabler:check-circle-filled',
    gray: 'tabler:info-circle-filled',
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
        class="size-4 mt-1"
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

| Prop        | Type    | Default  | Description                                                                              |
| ----------- | ------- | -------- | ---------------------------------------------------------------------------------------- |
| `color`     | String  | `'blue'` | Color variant of the alert. Options: `'blue'`, `'red'`, `'yellow'`, `'green'`, `'gray'`. |
| `loading`   | Boolean | `false`  | If `true`, shows a loading spinner instead of the icon.                                  |
| `withClose` | Boolean | `false`  | If `true`, displays a close button on the right side of the alert.                       |

## Emits

| Event   | Description                               |
| ------- | ----------------------------------------- |
| `close` | Emitted when the close button is clicked. |

## Slots

| Slot    | Description                               |
| ------- | ----------------------------------------- |
| default | Content/message to be shown in the alert. |