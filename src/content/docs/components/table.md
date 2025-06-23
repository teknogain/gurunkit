---
title: Table
description: A guide to using the table component.
---

The `Table` component used to display tabular data dynamically. It supports custom column configuration, value formatting, and render functions via slots or dynamic components.

## Base Component

This is the basic implementation of the `Table` component:

```vue
<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <table class="w-full">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.id"
          class="text-left text-gray-900 border border-gray-300 py-2 px-2.5"
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
        <td
          v-for="column in columns"
          :key="column.id"
          class="text-gray-900 border border-gray-300 py-2 px-2.5"
        >
          <component
            :is="column.render"
            v-if="column.render"
            :item="item"
          />
          <template v-else-if="column.value">
            {{ column.value(item) }}
          </template>
          <template v-else>
            {{ item[column.id] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

## Props

### `columns` (required)

An array of column definitions. Each column object may include the following properties:

* `id` – (String) The key access the value from each data item.
* `name` – (String) The column header text.
* `value` – (Function, optional) A function that receives a row item and returns a custom display value.
* `render` – (Component, optional) A Vue component render the cell content. The component will receive the row item as a prop named `item`.

```js
const columns = [
  { id: 'name', name: 'Name' },
  { id: 'email', name: 'Email' },
  { id: 'created_at', name: 'Joined', value: (item) => new Date(item.created_at).toLocaleDateString() },
  { id: 'actions', name: 'Actions', render: ActionCell },
];
```

### `data`

An array of objects representing the rows of the table. Each object should include keys that match the `id` of the defined columns.

```js
const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com', created_at: '2025-06-01' },
  { id: 2, name: 'Bob', email: 'bob@example.com', created_at: '2025-06-10' },
];
```