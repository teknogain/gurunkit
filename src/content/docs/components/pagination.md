---
title: Pagination
description: A guide to using the pagination component.
---

`Pagination` is a navigation component used to switch between multiple pages of content. It provides numbered page links, as well as previous and next arrows, and emits a `change-page` event when the active page changes.

> **Note:** This component relies on the following external resources:
>
> * **Iconify** – used to render navigation arrows. [Follow the installation guide here](https://iconify.design/docs/icon-components/vue/).

---

## Base Component

```vue
<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  totalPages: Number,
});
const emit = defineEmits(['change-page']);
const currentPage = defineModel('current-page');

const classes = {
  item: 'w-10 h-10 flex items-center justify-center',
  itemArrow: 'cursor-pointer text-gray-700',
  itemArrowDisabled: 'cursor-not-allowed bg-gray-50 text-gray-500'
};

function onPrev() {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit('change-page');
  }
}
function onChange(page) {
  currentPage.value = page;
  emit('change-page');
}
function onNext() {
  currentPage.value++;
  emit('change-page');
}
</script>

<template>
  <nav
    class="bg-white flex items-center w-fit border border-gray-300 rounded-md divide-x divide-gray-300 mx-auto"
  >
    <component
      :is="currentPage > 1 ? 'a' : 'span'"
      :class="[
        classes.item,
        currentPage > 1
          ? classes.itemArrow
          : [classes.itemArrowDisabled, 'rounded-l-md'],
      ]"
      @click.prevent="onPrev"
    >
      <Icon icon="tabler:chevron-left" />
    </component>

    <a
      v-for="page in totalPages"
      :key="page"
      href=""
      :class="[
        classes.item,
        'hover:bg-blue-50 hover:text-blue-600',
        page === currentPage ? 'bg-blue-50 text-blue-600' : 'text-gray-700',
      ]"
      @click.prevent="onChange(page)"
    >
      {{ page }}
    </a>

    <component
      :is="currentPage < totalPages ? 'a' : 'span'"
      :class="[
        classes.item,
        currentPage < totalPages
          ? classes.itemArrow
          : [classes.itemArrowDisabled, 'rounded-r-md'],
      ]"
      @click.prevent="onNext"
    >
      <Icon icon="tabler:chevron-right" />
    </component>
  </nav>
</template>
```

---

## Props

| Prop          | Type   | Required | Description                                |
| ------------- | ------ | -------- | ------------------------------------------ |
| `totalPages`  | Number | ✅ Yes    | Total number of pages to render.           |

## v-model

| Name           | Type   | Description                                 |
| -------------- | ------ | ------------------------------------------- |
| `current-page` | Number | Two-way binding for the active page number. |

## Emits

| Event         | Description                                       |
| ------------- | ------------------------------------------------- |
| `change-page` | Emitted whenever the `currentPage` value changes. |