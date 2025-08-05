---
title: Card  
description: A guide to using the card component.
---

`Card` is a layout utility component that provides a styled container with optional title, border, shadow, rounded corners, and configurable content sections. It's commonly used for card-like elements or content blocks.

---

## Base Component

```vue
<script setup>
defineProps({
  title: String,
  titleResponsive: Boolean,
  titleTag: {
    type: String,
    default: "h2",
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  shadow: Boolean,
  rounded: {
    type: Boolean,
    default: true,
  },
  striped: {
    type: Boolean,
    default: true,
  },
  paddless: Boolean,
  dimmed: Boolean,
});
</script>

<template>
  <div
    :class="[
      bordered ? 'border border-gray-300' : '',
      shadow ? 'shadow-md' : '',
      rounded ? 'rounded-md' : '',
      dimmed ? 'bg-gray-100' : 'bg-white',
    ]"
  >
    <div
      v-if="title"
      :class="[
        striped ? 'border-b border-gray-300 p-4' : 'px-4 pt-4',
        'flex items-center justify-between',
      ]"
    >
      <component
        :is="titleTag"
        :class="[
          'font-bold',
          titleResponsive ? 'text-lg lg:text-xl' : 'text-xl',
        ]"
      >
        {{ title }}
      </component>

      <slot name="action" />
    </div>
    <div :class="[paddless ? '' : 'p-4']">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="border-t border-gray-300 p-4"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
```

## Props

| Prop              | Type    | Default | Description                                                            |
| ----------------- | ------- | ------- | ---------------------------------------------------------------------- |
| `title`           | String  | —       | Optional title displayed at the top section.                           |
| `titleResponsive` | Boolean | `false` | If `true`, the title adapts to screen size responsively.               |
| `titleTag`        | String  | `'h2'`  | The HTML tag used to render the title (e.g., `'h1'`, `'h2'`, `'div'`). |
| `bordered`        | Boolean | `true`  | Whether the card should have a border.                                 |
| `shadow`          | Boolean | `false` | Adds a shadow if `true`.                                               |
| `rounded`         | Boolean | `true`  | Whether the card has rounded corners.                                  |
| `striped`         | Boolean | `true`  | Adds a bottom border under the title for separation.                   |
| `paddless`        | Boolean | `false` | Removes default padding inside the card body if set to `true`.         |
| `dimmed`          | Boolean | `false` | If `true`, applies a dimmed background style to the card.              |

## Slots

| Slot     | Description                                          |
| -------- | ---------------------------------------------------- |
| default  | The main content inside the card.                     |
| `action` | Shown next to the title (e.g., buttons or icons).    |
| `footer` | Footer section shown at the bottom, with top border. |