---
title: Select Search
description: A guide to using the select search component.
---

`SelectSearch` is an advanced dropdown component designed for searchable and dynamic selection. It supports async loading, keyboard navigation, scroll-to-load, and custom item creation when no results are found.

> **Note:** This component relies on the following external components and utilities:
> * **Input** – Input field with built-in debounce event. [Read the integration guide here](/components/input).
> * **Spinner** – Spinner shown during loading state. [Read the integration guide here](/components/spinner).
> * **Iconify** – used to render icons via the `icon` prop. [Follow the installation guide here](https://iconify.design/docs/icon-components/vue/).
> * **v-click-outside** – Directive to close dropdown on outside click. [Follow the installation guide here](https://www.npmjs.com/package/v-click-outside).
> * **@vueuse/motion** – `v-motion-slide-top` is used to animate dropdown appearance. [Follow the installation guide here](https://www.npmjs.com/package/v-click-outside).

---

## Base Component

```vue
<script setup>
import { Icon } from '@iconify/vue';
import BaseInput from 'src/components/base/Input.vue';
import Spinner from 'src/components/base/Spinner.vue';
import { ref, useTemplateRef, watch } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  placeholder: String,
  searchEmptyCreate: Boolean,
});
const emit = defineEmits([
  'opened',
  'search-debounce',
  'scroll-bottom',
  'create-empty-search-item',
]);

const visible = ref(false);
const itemsWrapper = useTemplateRef('items-wrapper');
const itemsDiv = useTemplateRef('items-div');
const searchInput = useTemplateRef('search-input');
const currentHoverItem = ref(null);
const selected = defineModel();
const search = defineModel('search');
const loading = defineModel('loading');

function scrollItemVisibility() {
  const container = itemsWrapper.value;
  const element = itemsDiv.value[currentHoverItem.value];

  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;

  const elementTop = element.offsetTop;
  const elementBottom = elementTop + element.offsetHeight;

  if (elementTop < containerTop) {
    container.scrollTo({ top: elementTop, behavior: 'smooth' });
  } else if (elementBottom > containerBottom) {
    container.scrollTo({
      top: elementBottom - container.clientHeight,
      behavior: 'smooth',
    });
  }
}

function onClose() {
  visible.value = false;
}
function onHoveritem(i) {
  currentHoverItem.value = i;
}
function onKeydownInput(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();

    if (currentHoverItem.value < props.items.length - 1) {
      currentHoverItem.value = currentHoverItem.value
        ? currentHoverItem.value + 1
        : (currentHoverItem.value = 1);

      scrollItemVisibility();
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();

    if (currentHoverItem.value > 0) {
      currentHoverItem.value = currentHoverItem.value
        ? currentHoverItem.value - 1
        : (currentHoverItem.value = 1);

      scrollItemVisibility();
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();

    const item = props.items[currentHoverItem.value];

    selected.value = {
      id: item.id,
      name: item.name,
    };
    visible.value = false;
    searchInput.value.input.blur();
  } else if (e.key === 'Tab') {
    visible.value = false;
  }
}
function onClickItem(item) {
  selected.value = {
    id: item.id,
    name: item.name,
  };
  visible.value = false;
}
function onClear() {
  selected.value = null;
  visible.value = false;
}
function onSearchDebounce() {
  currentHoverItem.value = null;
  emit('search-debounce');
}
function onScrollWrapper(e) {
  const scroll = e.target.scrollTop + e.target.clientHeight;
  const bottom = e.target.scrollHeight - 5;

  if (scroll > bottom) {
    emit('scroll-bottom');
  }
}
function onCreateEmptySearchItem() {
  emit('create-empty-search-item');

  visible.value = false;
}

watch(
  selected,
  (newSelected) => {
    if (newSelected) {
      search.value = newSelected.name;
    } else {
      search.value = null;
    }
  },
  { immediate: true },
);
watch(visible, (newVisible) => {
  if (!newVisible) {
    search.value = selected.value ? selected.value.name : null;
  } else {
    emit('opened');
  }
});
</script>

<template>
  <div
    v-click-outside="onClose"
    class="relative"
  >
    <div class="relative">
      <base-input
        ref="search-input"
        v-model="search"
        fullwidth
        :placeholder="placeholder"
        @focus="visible = true"
        @keydown="onKeydownInput"
        @input-debounce="onSearchDebounce"
      />
      <spinner
        v-if="loading"
        class="absolute top-3 right-2"
      />
      <button
        v-else-if="selected"
        tabindex="-1"
        class="cursor-pointer text-gray-700 absolute top-3 right-2"
        type="button"
        @click="onClear"
      >
        <Icon
          icon="tabler:x"
          class="w-4 h-4"
        />
      </button>
    </div>
    <div
      v-if="visible"
      ref="items-wrapper"
      v-motion-slide-top
      class="bg-white rounded-md border border-gray-300 absolute w-full z-10 mt-2.5 py-1 max-h-[200px] overflow-y-auto"
      tabindex="-1"
      @scroll="onScrollWrapper"
    >
      <p
        v-if="!items.length && (searchEmptyCreate ? !search : true)"
        class="px-3 py-2 text-gray-700 text-center"
      >
        No results found
      </p>
      <a
        v-else-if="!items.length && search && searchEmptyCreate"
        class="px-3 py-2 text-gray-700 text-center flex items-center justify-center gap-2 cursor-pointer"
        @click.prevent="onCreateEmptySearchItem"
      >
        <Icon icon="tabler:plus" />
        Add <span class="text-blue-600">"{{ search }}"</span> as new item
      </a>
      <div
        v-for="(item, index) in items"
        :key="item.id"
        ref="items-div"
        :class="[
          'px-3 py-2 text-gray-900',
          currentHoverItem === index ? 'bg-gray-50' : '',
        ]"
        @mouseenter="onHoveritem(index)"
        @click="onClickItem(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

````

---

## Props

| Prop                | Type    | Required | Description                                                    |
| ------------------- | ------- | -------- | -------------------------------------------------------------- |
| `items`             | Array   | ✅ Yes    | List of selectable items, each item must have `id` and `name`. |
| `placeholder`       | String  | ❌ No     | Placeholder text displayed in the input field.                 |
| `searchEmptyCreate` | Boolean | ❌ No     | Whether to allow creating a new item when no match is found.   |

## v-model

| Model             | Type    | Description                           |
| ----------------- | ------- | ------------------------------------- |
| `v-model`         | Object  | Selected item object: `{ id, name }`. |
| `v-model:search`  | String  | Current value of the search input.    |
| `v-model:loading` | Boolean | Controls loading spinner state.       |

## Emits

| Event Name                 | Description                                                              |
| -------------------------- | ------------------------------------------------------------------------ |
| `opened`                   | Emitted when the dropdown is opened.                                     |
| `search-debounce`          | Emitted after the search input changes (with debounce from `Input`). |
| `scroll-bottom`            | Emitted when scrolling to the bottom of the dropdown (for lazy loading). |
| `create-empty-search-item` | Emitted when clicking "Add as new item" if search has no results.        |

## Slots

This component does not expose custom slots — all rendering is handled internally. Use props and model bindings to control behavior and data.