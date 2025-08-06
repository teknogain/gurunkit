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
  textarea: Boolean,
});
const emit = defineEmits(['input', 'input-debounce']);

const value = defineModel();
const input = ref();

const sizeClass = computed(() => {
  const sizes = {
    sm: ['text-sm px-2 rounded', props.textarea ? 'min-h-8 py-2' : 'h-8'],
    md: ['px-2.5 rounded-md', props.textarea ? 'min-h-10 py-2' : 'h-10'],
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
const classes = computed(() => {
  return [
    'bg-white border border-gray-300 text-gray-900 appearance-none focus:outline-blue-600 disabled:bg-gray-100 read-only:bg-gray-50',
    sizeClass.value,
    widthClass.value,
  ];
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
    v-if="!textarea"
    ref="input"
    v-model="value"
    type="text"
    :class="classes"
    @input="onInput"
  >
  <textarea
    v-else
    ref="input"
    v-model="value"
    :class="classes"
    rows="4"
    @input="onInput"
  />
</template>
```

## Props

| Prop           | Type    | Default  | Description                                                                                    |
| -------------- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| `fullwidth`    | Boolean | `false`  | If `true`, makes the input take full width.                                                    |
| `size`         | String  | `'sm'`   | Sets the input size. Accepted values: `'sm'`, `'md'`, `'lg'`.                                  |
| `width`        | String  | `'auto'` | Controls the input width. Accepted values: `'auto'`, `'fit'`, `'full'`.                        |
| `textarea`     | Boolean | `false`  | If `true`, renders a `<textarea>` instead of a standard `<input>`.                             |
| *native attrs* | –       | –        | All native `<input>` attributes like `placeholder`, `disabled`, etc. are passed automatically. |

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
