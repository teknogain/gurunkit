---
title: Table  
description: A guide to using the table component.
---

`Table` is a reusable data display component that renders tabular content with support for custom headers, rows, and slots. Ideal for presenting structured data in dashboards, lists, or reports.

---

## Base Component

```vue
<script setup>
import Spinner from './Spinner.vue';

defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  loading: Boolean,
  hoverable: {
    type: Boolean,
    default: true,
  },
});

const classes = {
  td: 'px-4 py-3 border-b border-gray-300 text-gray-900',
};
</script>

<template>
  <table class="w-full border border-gray-300">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.id"
          :class="[
            'bg-gray-100 border-b border-gray-300 px-4 py-3 text-gray-900',
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
    <tbody class="relative">
      <tr v-if="loading">
        <td>
          <div
            class="absolute inset-0 flex items-center justify-center bg-gray-200/50 z-10"
          >
            <Spinner size="lg" color="secondary" />
          </div>
        </td>
      </tr>
      <tr v-if="!data.length">
        <td class="px-4 py-3 text-center" :colspan="columns.length">
          No Data
        </td>
      </tr>
      <tr
        v-for="(item, index) in data"
        :key="item.id"
        :class="[hoverable ? 'hover:bg-gray-50' : '']"
      >
        <slot
          name="td"
          :item="item"
          :index="index"
          :classes="classes"
        />
      </tr>
    </tbody>
    <tfoot>
      <slot name="footer" :classes="classes" />
    </tfoot>
  </table>
</template>
```

## Props

| Prop      | Type    | Required | Default | Description                                                                                                                               |
| --------- | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `columns` | Array   | Yes      | —       | Array of column definitions. Each item must have `id` and `name`, and may optionally include `textAlign` (`'left'`, `'center'`, `'right'`). |
| `data`    | Array   | Yes      | —       | Array of row data objects. Each object should match the `id` fields defined in the `columns` prop.                                        |
| `loading` | Boolean | No       | `false` | If `true`, displays a loading state for the table.                                                                                        |
| `hoverable`   | Boolean | No       | `true`  | If `true`, enables hover effects on table rows.                                                                                           |

## Slots

| Slot | Props                               | Description                                                                                         |
| ---- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| `td` | `{ item, classes: { td: String } }` | Slot for customizing the content of each table cell. Receives the row item and a `td` class string. |