---
title: Description List  
description: A guide to using the description list component.
---

`Description List` is a component used to display key-value pairs in a structured format. Ideal for showing metadata, user info, or item details, and styled using Tailwind CSS for consistent layout and spacing.

---

## Base Component

```vue
<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: null,
});
</script>

<template>
  <div>
    <dt class="text-gray-600">
      {{ label }}
    </dt>
    <dd class="text-gray-900 font-bold">
      <slot>{{ value }}</slot>
    </dd>
  </div>
</template>
```

## Props

| Prop    | Type   | Default | Required | Description                                         |
| ------- | ------ | ------- | -------- | --------------------------------------------------- |
| `label` | String | —       | Yes      | The label or term to display in the list.           |
| `value` | —      | —       | No       | The value or description associated with the label. |

## Slots

| Slot    | Description                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------- |
| default | The content to be rendered as the description value. Overrides the `value` prop when used. |