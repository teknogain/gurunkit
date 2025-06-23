---
title: Button  
description: A guide to using the button component.
---

The `Button` component used to trigger actions. It supports different colors and sizes, and can be customized using props and slots.

## Base Component

This is the basic implementation of the `Button` component:

```vue
<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'gray',
    validator: (value) =>
      ['gray', 'blue', 'white', 'yellow', 'green', 'red'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
});

const color = computed(() => {
  return {
    gray: 'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200 hover:border-gray-300',
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    white: 'bg-white text-gray-900 hover:bg-gray-50',
    yellow: 'bg-yellow-600 text-white hover:bg-yellow-700',
    green: 'bg-green-600 text-white hover:bg-green-700',
    red: 'bg-red-600 text-white hover:bg-red-700',
  }[props.color || 'gray'];
});
const size = computed(() => {
  return {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 px-4',
    lg: 'h-12 text-lg px-5',
  }[props.size || 'md'];
});
</script>

<template>
  <button
    type="button"
    :class="[color, size, 'rounded-md font-medium cursor-pointer']"
  >
    <slot />
  </button>
</template>
```

## Props

### `color`

Sets the button color theme. Supported values:

* `gray` (default)
* `blue`
* `white`
* `yellow`
* `green`
* `red`

```vue
<BaseButton color="blue">Submit</BaseButton>
```

### `size`

Sets the button size. Supported values:

* `sm` – small (`h-8`, `text-sm`, `px-3`)
* `md` – medium (default) (`h-10`, `px-4`)
* `lg` – large (`h-12`, `text-lg`, `px-5`)

```vue
<BaseButton size="lg">Large Button</BaseButton>
```

## Slots

### Default Slot

Used to define the content inside the button, typically text or an icon.

```vue
<BaseButton>Click Me</BaseButton>
```