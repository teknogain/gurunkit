---
title: Form Item
description: A guide to using the form item component.
---

`FormItem` is a simple and accessible component that wraps form inputs with a corresponding `<label>` element. It helps enforce consistent spacing, labeling, and accessibility by passing an `id` to the slotted form control.

---

## Base Component

```vue
<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <label :for="id">{{ label }}</label>
    <slot :id="id" />
  </div>
</template>
```

---

## Props

| Prop    | Type   | Required | Description                                                                            |
| ------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| `id`    | String | Yes    | The unique identifier for the form input. Passed to both the label `for` and the slot. |
| `label` | String | Yes    | The text content for the `<label>` element.                                            |

## Slots

| Slot | Props | Description                                                                 |
| --------- | ----- | --------------------------------------------------------------------------- |
| default   | `{ id: String }`  | The default slot should render a form input and use the provided `id` prop. |