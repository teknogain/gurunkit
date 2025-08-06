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
import { computed, ref } from 'vue';

const props = defineProps({
  options: Array,
  customWidth: Boolean,
  customClass: {
    type: Object,
    default: () => ({
      content: '',
    }),
  },
});

const visible = ref(false);

const classes = computed(() => {
  return {
    content: [
      'absolute top-8 right-0 w-fit bg-white rounded-md border z-10 border-gray-300',
      props.customWidth ? '' : 'min-w-40',
      props.customClass.content,
    ],
    header: 'px-3 py-2 border-b border-gray-300',
    option: 'w-full text-left px-3 py-2 text-gray-900 hover:bg-gray-50',
  };
});

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
      :class="classes.content"
    >
      <slot
        name="header"
        :classes="classes"
      />
      <div class="py-1">
        <slot :classes="classes">
          <div
            v-for="option in options"
            :key="option.id"
          >
            <slot
              name="option"
              :option="option"
              :classes="classes"
            />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
```

## Props

| Prop          | Type    | Required | Default           | Description                                                                                                                     |
| ------------- | ------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `options`     | Array   | No        | `undefined`              | List of option objects used in the dropdown. Each option is passed to the `option` slot. Each object should have a unique `id`. |
| `customWidth` | Boolean | No        | `false`           | When set to `true`, disables default width styling applied to the dropdown.                                                     |
| `customClass` | Object  | No        | `{ content: '' }` | Custom classes applied to the dropdown content wrapper. Useful for advanced styling or class overrides.                         |

## Slots

| Slot      | Props                                                                              | Description                                                                                         |
| --------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `trigger` | `{ toggle: Function }`                                                             | Slot to render the clickable trigger element. Call `toggle()` to open/close.        |
| `header`  | `{ classes: { content: String, header: String, option: String } }`                 | Optional header inside the dropdown panel. |
| `option`  | `{ option: Object, classes: { content: String, header: String, option: String } }` | Slot to render each dropdown item using the data from `options`.                                    |
| `default` | `{ classes: { content: String, header: String, option: String } }`                 | Used to override the entire rendering of the dropdown content, replacing the default options loop.  |