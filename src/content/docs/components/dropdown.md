---
title: Dropdown
description: A guide to using the dropdown component.
---

`Dropdown` is a customizable dropdown component that supports dynamic options, animated visibility, and click-outside behavior. It provides named slots for trigger, header, and options, enabling complete control over the menu's appearance and behavior.

> **Note:** This component relies on the following external components to function properly:
> * **click-outside-vue3** – used to close the dropdown when clicking outside of the dropdown. [Follow the installation guide here](https://www.npmjs.com/package/click-outside-vue3).
> * **@vueuse/motion** – used for the dropdown's enter animation. [Follow the installation guide here](https://www.npmjs.com/package/v-click-outside).

---

## Base Component

```vue
<script setup>
import { ref } from 'vue';

defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const visible = ref(false);

function onClose() {
  visible.value = false;
}
function onToggle() {
  visible.value = !visible.value;
}
</script>

<template>
  <div class="relative">
    <slot
      name="trigger"
      :toggle="onToggle"
    />
    <div
      v-if="visible"
      v-motion-slide-top
      v-click-outside="onClose"
      class="absolute top-8 right-0 min-w-40 w-fit bg-white rounded-md border border-gray-300 z-10"
    >
      <slot
        name="header"
        :classes="{ header: 'px-3 py-2 border-b border-gray-300' }"
      />
      <div class="py-1">
        <div
          v-for="option in options"
          :key="option.id"
        >
          <slot
            name="option"
            :option="option"
            :classes="{
              option:
                'w-full text-left px-3 py-2 text-gray-900 hover:bg-gray-50',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
```

---

## Props

| Prop      | Type  | Required | Description                                                                                                              |
| --------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `options` | Array | Yes    | List of option objects used in the dropdown. Each option is passed to the `option` slot. Expected to have a unique `id`. |

## Slots

| Slot | Props                                             | Description                                                                  |
| --------- | ------------------------------------------------- | ---------------------------------------------------------------------------- |
| `trigger` | `{ toggle: Function }`                            | Slot to render the clickable trigger element. Call `toggle()` to open/close. |
| `header`  | `{ classes: { header: String } }`                 | Optional header inside the dropdown panel.                                   |
| `option`  | `{ option: Object, classes: { option: String } }` | Slot to render each dropdown item using the data from `options`.             |
