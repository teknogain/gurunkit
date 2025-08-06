---
title: Section  
description: A guide to using the container component.
---

`Section` is a reusable layout component that displays a titled section with vertical padding. Content is wrapped inside a container to maintain consistent structure and spacing using Tailwind CSS utilities.

> **Note:** This component relies on the following external components and utilities:
>
> * **Iconify** – used to render the icon in the section title. [Follow the installation guide here](https://iconify.design/docs/icon-components/vue/).
> * **Container** – used to wrap the content inside the section. [Read the integration guide here](/components/container).

---

## Base Component

```vue
<script setup>
import Container from './Container.vue';
import { Icon } from '@iconify/vue';

defineProps({
  tag: {
    type: String,
    default: 'section',
  },
  title: String,
  titleIcon: String,
  titleLevel: {
    type: Number,
    default: 2,
    validator: (value) => value >= 1 && value <= 6,
  },
  paddingVertical: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <component
    :is="tag"
    :class="[
      paddingVertical ? 'py-10 sm:py-12 md:py-14 xl:py-16 2xl:py-20' : '',
    ]"
  >
    <Container>
      <div
        v-if="title"
        class="space-y-4 lg:space-y-6 2xl:space-y-8"
      >
        <div class="flex items-center justify-between">
          <component
            :is="`h${titleLevel}`"
            class="flex items-center gap-2 font-bold text-gray-900 text-xl tracking-tight md:text-2xl lg:text-3xl xl:gap-4 2xl:text-4xl"
          >
            <Icon
              v-if="titleIcon"
              :icon="titleIcon"
            />
            {{ title }}
          </component>
          <slot name="action" />
        </div>
        <slot />
      </div>
      <slot v-else />
    </Container>
  </component>
</template>
```

## Props

| Prop              | Type    | Default     | Description                                                                                     |
| ----------------- | ------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `tag`             | String  | `'section'` | The HTML tag used to render the outer wrapper element.                                          |
| `title`           | String  | —           | The text displayed as the section title.                                                        |
| `titleIcon`       | String  | —           | Name of the Iconify icon displayed alongside the title.                                         |
| `titleLevel`      | Number  | `2`         | Heading level for the title (`1` to `6`). Used to render the appropriate `<h1>`–`<h6>` element. |
| `paddingVertical` | Boolean | `true`      | If `true`, applies vertical padding to the section content.                                     |

## Slots

| Slot      | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `default` | The content to be rendered inside the section.                              |
| `action`  | Slot for rendering custom content (e.g., buttons, links) next to the title. |
