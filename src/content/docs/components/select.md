---
title: Select  
description: A guide to using the select component.
---

`Select` is a reusable `<select>` component with styling, sizing, color theming, and optional debounced `change` event. Suitable for use in forms, filters, or dropdown selections.

> **Note:** This component relies on the following external components to function properly:
> * **debounce** – used to debounce the `change` event. [Read the integration guide here](/utils/debounce).

---

## Base Component

```vue
<script setup>
import { computed } from 'vue';
import { debounce } from 'src/utils/debounce';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  color: {
    type: String,
    default: 'white',
    validator: (value) =>
      [
        'gray-filled',
        'blue-filled',
        'white',
        'yellow-filled',
        'green-filled',
        'red-filled',
      ].includes(value),
  },
  debounced: Boolean,
});
const emit = defineEmits(['change']);

const selected = defineModel();

const size = computed(() => {
  return {
    sm: 'h-8 text-sm px-2 pr-10',
    md: 'h-10 px-2.5 pr-10',
    lg: 'h-12 text-lg px-4 pr-10',
  }[props.size || 'md'];
});

const color = computed(() => {
  return {
    'gray-filled':
      'bg-gray-50 text-gray-700 border-gray-700 focus:outline-gray-600',
    'blue-filled':
      'bg-blue-50 text-blue-700 border-blue-700 focus:outline-blue-600',
    white: 'bg-white text-gray-900 border-gray-300 focus:outline-blue-600',
    'yellow-filled':
      'bg-yellow-50 text-yellow-700 border-yellow-700 focus:outline-yellow-600',
    'green-filled':
      'bg-green-50 text-green-700 border-green-700 focus:outline-green-600',
    'red-filled': 'bg-red-50 text-red-700 border-red-700 focus:outline-red-600',
  }[props.color || 'white'];
});

const chevronSize = computed(() => {
  return {
    sm: 'size-3 absolute top-2.5 right-2',
    md: 'size-4 absolute top-3 right-2.5',
    lg: 'size-4 absolute top-4 right-3',
  }[props.size || 'md'];
});

const chevronColor = computed(() => {
  return {
    'gray-filled': 'text-gray-700',
    'blue-filled': 'text-blue-700',
    white: 'text-gray-900',
    'yellow-filled': 'text-yellow-700',
    'green-filled': 'text-green-700',
    'red-filled': 'text-red-700',
  }[props.color || 'white'];
});

const debounceEmitChange = debounce(() => emit('change'), 500);

function onChange() {
  if (props.debounced) {
    debounceEmitChange();
  } else {
    emit('change');
  }
}
</script>

<template>
  <div class="relative w-fit">
    <select
      v-model="selected"
      :class="['border rounded-md appearance-none', size, color]"
      @change="onChange"
    >
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      :class="[chevronSize, chevronColor]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  </div>
</template>
```

---

## Props

| Prop        | Type    | Default   | Description                                                               |
| ----------- | ------- | --------- | ------------------------------------------------------------------------- |
| `options`   | Array   | —         | List of select options. Each item must be an object with `id` and `name`. |
| `size`      | String  | `'md'`    | Size of the select. Options: `'sm'`, `'md'`, `'lg'`.                      |
| `color`     | String  | `'white'` | Visual theme variant. Supports `'white'`, `'*-filled'` options.           |
| `debounced` | Boolean | `false`   | If `true`, the `change` event is debounced (500ms).                       |

## Emits

| Event    | Description                                                                 |
| -------- | --------------------------------------------------------------------------- |
| `change` | Triggered on value change, either instantly or debounced depending on prop. |
| *native events* | Native DOM events like `blur`, `focus` are forwarded by Vue.                |

## Models

This component uses `v-model` to bind its value, which makes it reactive and easy to integrate with forms.

## Slots

This component does not use any slots.