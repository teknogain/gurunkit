---
title: Input  
description: A guide to using the input component.
---

`Input` is a simple and reusable text input component with support for `v-model`, fullwidth layout, and built-in debounced input handling. It's designed to be flexible and lightweight for use in forms, search fields, or filters.

> **Note:** This component relies on the following external components to function properly:
> * **debounce** – used to debounce the `input` event. [Read the integration guide here](/utils/debounce).

---

## Base Component

```vue
<script setup>
import { computed, ref } from 'vue';
import { debounce } from 'src/utils/debounce'; // ← required utility

const props = defineProps({
  fullwidth: Boolean,
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  width: {
    type: String,
    default: 'auto',
    validator: (value) => ['auto', 'fit', 'full'].includes(value),
  },
});
const emit = defineEmits(['input', 'input-debounce']);

const value = defineModel();
const input = ref();

const sizeClass = computed(() => {
  const sizes = {
    sm: 'h-8 text-sm px-2 rounded',
    md: 'h-10 px-2.5 rounded-md',
  };

  return sizes[props.size];
});
const widthClass = computed(() => {
  const widths = {
    auto: '',
    fit: 'w-fit',
    full: 'w-full',
  };

  if (props.fullwidth) {
    return widths.full;
  }

  return widths[props.width];
});

const onInputDebounce = debounce(() => emit('input-debounce'), 500);

function onInput() {
  emit('input');
  onInputDebounce();
}

defineExpose({ input });
</script>

<template>
  <input
    ref="input"
    v-model="value"
    type="text"
    :class="[
      'bg-white border border-gray-300 text-gray-900 appearance-none focus:outline-blue-600 disabled:bg-gray-100',
      colorClass,
      sizeClass,
      widthClass,
    ]"
    @input="onInput"
  >
</template>
```

---

## Props

| Prop           | Type    | Default | Description                                                                                    |
| -------------- | ------- | ------- | ---------------------------------------------------------------------------------------------- |
| `fullwidth`    | Boolean | `false` | If `true`, makes the input take full width.                                                    |
| *native attrs* | –       | –       | All native `<input>` attributes like `placeholder`, `disabled`, etc. are passed automatically. |

## Models

This component uses `v-model` to bind its value, which makes it reactive and easy to integrate with forms.

## Emits

| Event            | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| `input`          | Fired immediately when user types (standard input event).                  |
| `input-debounce` | Fired with a 500ms delay after user input stops (debounced event).         |
| *native events*  | All native `<input>` events like `focus`, `blur`, `keydown` are forwarded. |

## Slots

This component does not use any slots.

---

## Exposed

| Property | Value        |
| ------------ | ---------------- |
| `input`      | HTMLInputElement |
