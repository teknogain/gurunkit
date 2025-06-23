---
title: Card  
description: A guide to using the card component.
---

The `Card` component is a container that groups related content in a visually distinct box. It comes with optional styling such as borders, shadows, rounded corners, and supports header, footer, and custom action slots.

## Base Component

This is the basic implementation of the `Card` component:

```vue
<script setup>
defineProps({
  title: String,
  bordered: {
    type: Boolean,
    default: true
  },
  shadow: false,
  rounded: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div
    :class="[
      bordered ? 'border border-gray-300' : '',
      shadow ? 'shadow-md' : '',
      rounded ? 'rounded-md' : ''
    ]"
  >
    <div v-if="title" class="border-b border-gray-300 p-4 flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ title }}</h2>

      <slot name="action" />
    </div>
    <div class="p-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t border-gray-300 p-4">
      <slot name="footer" />
    </div>
  </div>
</template>
````

## Props

### `title`

Adds a header to the top of the card with the given text. The header is styled with a bottom border and bold text.

```vue
<base-card title="Card Title">
  Card content here.
</base-card>
```

### `bordered`

Controls whether the card has a border. Set to `false` to remove the border.

```vue
<base-card :bordered="false">
  This card has no border.
</base-card>
```

### `shadow`

Adds a shadow effect to the card (`shadow-md`). Useful for emphasizing sections.

```vue
<base-card shadow>
  This card has a shadow.
</base-card>
```

### `rounded`

Controls whether the card has rounded corners. Set to `false` to use sharp corners.

```vue
<base-card :rounded="false">
  This card has sharp corners.
</base-card>
```

## Slots

### Default Slot

Place your main card content inside the default slot.

```vue
<base-card>
  This is the main content of the card.
</base-card>
```

### `action` Slot

Render a button or element aligned to the right of the card header, next to the title.

```vue
<base-card title="User Info">
  <template #action>
    <button class="text-sm text-blue-600 hover:underline">Edit</button>
  </template>
  User information goes here.
</base-card>
```

### `footer` Slot

Displays content at the bottom of the card, separated by a top border. Commonly used for metadata or actions.

```vue
<base-card>
  Main card content.

  <template #footer>
    <div class="text-sm text-gray-500">
      Last updated 2 hours ago.
    </div>
  </template>
</base-card>
```