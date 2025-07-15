---
title: Confirm
description: A guide to using the confirm component.
---

`Confirm` is a self-contained component used to prompt the user for confirmation. It displays a title, message, and two buttons: confirm and cancel. The confirm button supports a loading state and custom colors. The component emits an event when the user confirms the action.

> **Note:** This component relies on the following external components to function properly:
> * **Modal** – used as the underlying modal wrapper. Must be implemented or imported manually. [Read the integration guide here](/components/modal).
> * **Heading** – used to render the modal title. Must be implemented or imported manually. [Read the integration guide here](/components/heading).
> * **Button** – used for both confirm and cancel actions. Must be implemented or imported manually. [Read the integration guide here](/components/button).

---

## Base Component

```vue
<script setup>
import Modal from './Modal.vue';
import Heading from './Heading.vue';
import BaseButton from './Button.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
  confirmColor: {
    type: String,
    default: 'red',
    validator: (value) => ['blue', 'red', 'yellow', 'green'].includes(value),
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  loading: Boolean,
});
defineEmits(['confirmed']);

const visible = defineModel('visible');
</script>

<template>
  <modal
    v-model:visible="visible"
    :with-container="false"
    :classes="{ container: 'w-fit mx-auto px-4' }"
    :card-props="{ paddless: true, class: 'p-8' }"
  >
    <div class="flex flex-col items-center justify-center text-center gap-4">
      <heading
        :title="title"
        :level="4"
      />
      <p>{{ message }}</p>
      <div class="flex gap-2">
        <base-button
          :color="confirmColor"
          :loading="loading"
          @click="$emit('confirmed')"
        >
          {{ confirmText }}
        </base-button>
        <base-button @click="visible = false">
          {{ cancelText }}
        </base-button>
      </div>
    </div>
  </modal>
</template>
```

---

## Props

| Prop           | Type    | Default     | Required | Description                                                                              |
| -------------- | ------- | ----------- | -------- | ---------------------------------------------------------------------------------------- |
| `title`        | String  | —           | ✅ Yes    | The title displayed at the top of the modal.                                             |
| `message`      | String  | —           | ✅ Yes    | The message shown below the title.                                                       |
| `confirmText`  | String  | `"Confirm"` | ❌ No     | The label for the confirm button.                                                        |
| `confirmColor` | String  | `"red"`     | ❌ No     | Color of the confirm button. Must be one of `"blue"`, `"red"`, `"yellow"`, or `"green"`. |
| `cancelText`   | String  | `"Cancel"`  | ❌ No     | The label for the cancel button.                                                         |
| `loading`      | Boolean | `false`     | ❌ No     | Shows a loading state on the confirm button when `true`.                                 |

## Emits

| Event       | Description                                      |
| ----------- | ------------------------------------------------ |
| `confirmed` | Emitted when the user clicks the confirm button. |

## Model

| Model prop | Description                                  |
| ---------- | -------------------------------------------- |
| `visible`  | Controls the visibility of the modal dialog. |


## Slot

This component does **not** use any slots.