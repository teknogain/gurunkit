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
  customSize: Boolean,
  classes: {
    type: Object,
    default: () => ({
      title: ''
    })
  },
  responsive: {
    type: Boolean,
    default: true
  }
});

const tagName = computed(() => 'h' + props.level);
const titleSize = computed(() => {
  if (props.customSize) { return '' }
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
const colorClass = {
    title: 'text-stone-900'
}
const titleClass = computed(() => ['font-bold', titleSize.value, colorClass.title, props.classes.title])
</script>

<template>
  <div
    :class="['flex', responsive ? 'flex-col gap-4 sm:gap-2 sm:flex-row sm:items-center sm:justify-between' : 'items-center justify-between']"
  >
    <slot name="title" :title="title" :classes="{ title: titleClass }">    
        <component
            :is="tagName"
            :class="titleClass"
        >
            {{ title }}
        </component>
    </slot>
    <slot name="action" />
  </div>
</template>
```

---

## Props

| Prop    | Type   | Default | Required | Description                                                               |
| ------- | ------ | ------- | -------- | ------------------------------------------------------------------------- |
| `title` | String | —       | Yes    | The text content of the title heading.                                    |
| `level` | Number | `1`     | No     | Defines the heading level (`1` to `6`). Determines which HTML tag to use. |

## Slots

| Slot | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `action`  | Slot for placing an action element (e.g., button, dropdown). |
