---
title: Heading  
description: A guide to using the heading component.
---

The `Heading` component is a reusable component used to display page or section titles. It supports different heading levels (`<h1>` to `<h6>`) and allows injecting custom action elements (e.g., buttons) next to the heading.

## Base Component

This is the basic implementation of the `Heading` component:

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
  <div class="flex items-center justify-between">
    <component
      :is="tagName"
      :class="['font-bold text-gray-900', titleSize]"
    >
      {{ title }}
    </component>
    <slot name="action" />
  </div>
</template>
````

## Props

### `title` (required)

The text to be displayed as the heading.

```vue
<base-heading title="Dashboard" />
```

### `level`

The heading level to render (`1`–`6`). Defaults to `1`. This determines the semantic tag (`<h1>`–`<h6>`) and font size.

```vue
<base-heading title="Section Title" :level="3" />
```

## Slots

### `action`

Optional slot for rendering an element (e.g., button or link) to the right side of the heading.

```vue
<base-heading title="Users">
  <template #action>
    <button class="text-sm text-blue-600 hover:underline">Add User</button>
  </template>
</base-heading>
```