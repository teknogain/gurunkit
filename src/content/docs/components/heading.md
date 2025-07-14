---
title: Heading  
description: A guide to using the heading component.
---

`Heading` is a flexible component for rendering semantic page headings (`h1`–`h6`) with consistent styling and optional action content (such as buttons or filters). It helps maintain a clean and responsive layout for section or page titles.

---

## Base Component

```vue
<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
    validator: (value) => value >= 1 && value <= 6,
  },
});

const tagName = computed(() => 'h' + props.level);
const titleSize = computed(() => {
  const sizes = {
    1: 'text-5xl',
    2: 'text-4xl',
    3: 'text-3xl',
    4: 'text-2xl',
    5: 'text-xl',
    6: 'text-lg',
  };

  return sizes[props.level] || 'text-base';
});
</script>

<template>
  <div
    class="flex flex-col gap-4 sm:gap-2 sm:flex-row sm:items-center sm:justify-between"
  >
    <component
      :is="tagName"
      :class="['font-bold text-gray-900', titleSize]"
    >
      {{ title }}
    </component>
    <slot name="action" />
  </div>
</template>
```

---

## Props

| Prop    | Type   | Default | Required | Description                                                               |
| ------- | ------ | ------- | -------- | ------------------------------------------------------------------------- |
| `title` | String | —       | ✅ Yes    | The text content of the title heading.                                    |
| `level` | Number | `1`     | ❌ No     | Defines the heading level (`1` to `6`). Determines which HTML tag to use. |

---

## Slot

| Slot name | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `action`  | Slot for placing an action element (e.g., button, dropdown). |