---
title: Input  
description: A guide to using the input component.
---

`Input` is a simple and reusable text input component with support for `v-model`, fullwidth layout, and built-in debounced input handling. It's designed to be flexible and lightweight for use in forms, search fields, or filters.

> **Note:** This component requires an external `debounce` utility function.
> You can create the debounce file manually by following the guide [here](utility/debounce), then import it into this component.

---

## Base Component

```vue
<script setup>
import { ref } from 'vue';
import { debounce } from 'src/utils/debounce'; // ← required utility

defineProps({
  fullwidth: Boolean,
});
const emit = defineEmits(['input', 'input-debounce']);

const value = defineModel();
const input = ref();

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
      'bg-white border border-gray-300 h-10 px-2.5 rounded-md appearance-none text-gray-900 focus:outline-blue-600 disabled:bg-gray-100',
      fullwidth ? 'w-full' : '',
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

## v-model

This component uses `v-model` to bind its value, which makes it reactive and easy to integrate with forms.

## Emits

| Event            | Payload | Description                                                                |
| ---------------- | ------- | -------------------------------------------------------------------------- |
| `input`          | —       | Fired immediately when user types (standard input event).                  |
| `input-debounce` | —       | Fired with a 500ms delay after user input stops (debounced event).         |
| *native events*  | —       | All native `<input>` events like `focus`, `blur`, `keydown` are forwarded. |

## Slot

This component does **not** use any slots.

---

## Exposed Refs

This component exposes the native `<input>` element via the `input` ref using `defineExpose()`.
You can access it from the parent to call native methods like `.focus()`, `.select()`, etc.