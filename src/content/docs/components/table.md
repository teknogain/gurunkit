---
title: Table  
description: A guide to using the table component.
---

`Table` is a reusable data display component that renders tabular content with support for custom headers, rows, and slots. Ideal for presenting structured data in dashboards, lists, or reports.

---

## Base Component

```vue
<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <table class="w-full border border-gray-300">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.id"
          :class="[
            'bg-gray-100 border-b border-gray-300 px-3 py-2 text-gray-900',
            column.textAlign
              ? column.textAlign === 'right'
                ? 'text-right'
                : 'text-center'
              : 'text-left',
          ]"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data"
        :key="item.id"
      >
        <slot
          name="td"
          :item="item"
          :classes="{
            td: 'px-3 py-2 border-b border-gray-300 text-gray-900',
          }"
        />
      </tr>
    </tbody>
  </table>
</template>
```

## Props

| Prop      | Type  | Required | Description                                                                                                                                 |
| --------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `columns` | Array | Ye       | Array of column definitions. Each item must have `id` and `name`, and may optionally include `textAlign` (`'left'`, `'center'`, `'right'`). |
| `data`    | Array | Ye       | Array of row data objects. Each object should match the `id` fields defined in the `columns` prop.                                          |

Berikut adalah tabel **Slots** yang telah disesuaikan berdasarkan cuplikan kode yang kamu berikan (`slot name="td"` dengan scoped props):

## Slots

| Slot | Props                               | Description                                                                                         |
| ---- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| `td` | `{ item, classes: { td: String } }` | Slot for customizing the content of each table cell. Receives the row item and a `td` class string. |