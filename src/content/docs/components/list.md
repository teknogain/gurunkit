---
title: List
description: A guide to using the list component.
---

`List` is a flexible UI component for rendering collections of data inside a card layout. It supports custom header and item slots, empty state messages, hover effects, and size variations.

> **Note:** This component relies on the following external components to function properly:
> * **Card** – used to wrap the list content inside a styled container. [Read the integration guide here](/components/card).

---

## Base Component

```vue
<script setup>
import { computed } from 'vue';
import Card from './Card.vue';

const props = defineProps({
  data: Array,
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  striped: {
    type: Boolean,
    default: true,
  },
  hover: Boolean,
  emptyMessage: {
    type: String,
    default: "There's nothing here yet.",
  },
});

const classes = computed(() => {
  const itemSizes = {
    sm: 'px-3 py-2',
    md: 'p-4',
    lg: 'p-6',
  };

  return {
    item: [itemSizes[props.size], props.hover ? 'hover:bg-gray-50' : ''],
  };
});
</script>

<template>
  <Card paddless>
    <div :class="[striped ? 'divide-y divide-gray-300' : '']">
      <slot
        name="header"
        :classes="{ item: classes.item }"
      />
      <div
        v-if="!data.length"
        :class="[classes.item, 'text-gray-700 text-center']"
      >
        {{ emptyMessage }}
      </div>
      <slot :classes="{ item: classes.item }">
        <div
          v-for="(item, index) in data"
          :key="item.id"
          :class="classes.item"
        >
          <slot
            name="item"
            :index="index"
            :item="item"
          />
        </div>
      </slot>
    </div>
  </Card>
</template>
```

---

## Props

| Prop           | Type    | Default                       | Description                                                             |
| -------------- | ------- | ----------------------------- | ----------------------------------------------------------------------- |
| `data`         | Array   | —                             | The array of data items to render. Each item should have a unique `id`. |
| `size`         | String  | `"md"`                        | Sets padding size for each item. Supports `"sm"`, `"md"`, and `"lg"`.   |
| `striped`      | Boolean | `true`                        | Adds a dividing line between items if `true`.                           |
| `hover`        | Boolean | `false`                       | Adds a subtle hover background on each item.                            |
| `emptyMessage` | String  | `"There's nothing here yet."` | Message shown when the `data` array is empty.                           |

## Slots

| Slot | Props    | Description                                                                  |
| --------- | --------------- | ---------------------------------------------------------------------------- |
| `header`  | `{ classes: { item } }`  | Slot for custom header content, aligned with item styling.                   |
| default | `{ classes: { item } }`  | Default slot used if no `item` slot is defined.                              |
| `item`    | `{ item, index }` | Slot used to render each data item. Scoped props include `item` and `index`. |