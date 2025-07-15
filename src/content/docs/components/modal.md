---
title: Modal
description: A guide to using the modal component.
---

`Modal` is a component for rendering modal dialogs. It supports an optional container layout, vertical centering, and emits an event when the modal becomes visible. The modal content is wrapped in a card layout with a close button.

> **Note:** This component relies on the following external components and utilities to function properly:
> * **Iconify** – used to render the close icon via the `<Icon>` component. [Follow the installation guide here](https://iconify.design/docs/icon-components/vue/).
> * **v-click-outside** – a directive used to close the modal when clicking outside of the card. [Follow the installation guide here](https://www.npmjs.com/package/v-click-outside).
> * **Container** – a layout wrapper component used when `withContainer` is set to `true`. [Read the integration guide here](/components/container).
> * **Card** – used to render the modal content within a styled card layout. [Read the integration guide here](/components/card).

---

## Base Component

```vue
<script setup>
import Container from './Container.vue';
import Card from './Card.vue';
import { Icon } from '@iconify/vue';
import { watch } from 'vue';

defineProps({
  withContainer: {
    type: Boolean,
    default: true,
  },
  classes: {
    type: Object,
    default: () => ({
      container: '',
    }),
  },
  cardProps: null,
  containerProps: null,
  title: String,
  verticalCenter: Boolean,
});

const emit = defineEmits(['opened']);

const visible = defineModel('visible');

function onClose() {
  visible.value = false;
}

watch(visible, (newValue) => {
  if (newValue) {
    emit('opened');
  }
});
</script>

<template>
  <div
    v-if="visible"
    :class="[
      'fixed inset-0 bg-black/30 py-20 z-10',
      verticalCenter ? 'flex items-center' : '',
    ]"
  >
    <component
      :is="withContainer ? Container : 'div'"
      v-motion-slide-top
      :class="classes.container"
      v-bind="containerProps"
    >
      <card
        v-click-outside="onClose"
        :bordered="false"
        :title="title"
        v-bind="cardProps"
      >
        <template #action>
          <button
            class="cursor-pointer text-gray-900"
            @click="onClose"
          >
            <Icon icon="tabler:x" />
          </button>
        </template>
        <slot />
      </card>
    </component>
  </div>
</template>
```

---

## Props

| Prop             | Type    | Default             | Description                                                          |
| ---------------- | ------- | ------------------- | -------------------------------------------------------------------- |
| `withContainer`  | Boolean | `true`              | Wraps the modal content with `Container` if `true`.              |
| `classes`        | Object  | `{ container: '' }` | Custom class object. The `container` key is used to apply classes to the container wrapper. |
| `cardProps`      | Object  | `null`              | Props forwarded to the `Card` component.                         |
| `containerProps` | Object  | `null`              | Props forwarded to the container element (`Container` or `div`). |
| `title`          | String  | —                   | Title text displayed in the modal card header.                       |
| `verticalCenter` | Boolean | `false`             | Vertically centers the modal content if `true`.                      |

## Emits

| Event    | Description                      |
| -------- | -------------------------------- |
| `opened` | Emitted when the modal is opened |

## Slot

| Slot name | Description                                  |
| --------- | -------------------------------------------- |
| *default* | The main content displayed inside the modal. |