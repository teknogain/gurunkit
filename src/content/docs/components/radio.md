---
title: Radio  
description: A guide to using the radio component.
---

`Radio` is a simple and reusable component that renders a native radio input with an associated label. Suitable for selecting a single option in forms, settings, or preference selections.

---

## Base Component

```vue
<script setup>
import { useId } from 'vue';

defineProps({
  name: String,
  inputValue: null,
  label: String,
  disabled: Boolean,
  id: String,
});
const emit = defineEmits(['change']);

const defaultId = useId();
const selected = defineModel();
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      :id="id || defaultId"
      v-model="selected"
      type="radio"
      :value="inputValue"
      :name="name"
      class="appearance-none relative w-4 h-4 shrink-0 rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-blue-600 checked:bg-blue-600"
      :disabled="disabled"
      @change="$emit('change')"
    >
    <label
      v-if="label"
      :for="id || defaultId"
      :class="[disabled ? 'text-gray-500' : 'text-gray-900']"
    >{{ label }}</label>
  </div>
</template>
```

## Props

| Prop         | Type    | Default | Description                                                             |
| ------------ | ------- | ------- | ----------------------------------------------------------------------- |
| `name`       | String  | —       | Name attribute used to group radio buttons.                             |
| `inputValue` | Null    | —       | The value assigned to the radio input's `value` attribute.              |
| `label`      | String  | —       | The text label displayed next to the radio input.                       |
| `disabled`   | Boolean | `false` | Disables the radio input if set to `true`.                              |
| `id`         | String  | —       | The `id` attribute for the input element, useful for label association. |

## Models

This component uses `v-model` to bind its value, which makes it reactive and easy to integrate with forms.

## Emits

| Event    | Description                                                |
| -------- | ---------------------------------------------------------- |
| `change` | Emitted when the radio input value changes (on selection). |