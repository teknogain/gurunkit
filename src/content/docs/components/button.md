---
title: Button  
description: A guide to using the button component.
---

`Button` is a reusable and highly customizable button component. It supports multiple sizes and color variants, optional icons or loading spinners, full-width display, and icon-only mode. It is designed to work well with Tailwind CSS utility classes and integrates with the [Iconify](https://iconify.design/) icon system.

> **Note:** This component relies on the following external components to function properly:
> * **Iconify** – used to render icons via the `icon` prop. [Follow the installation guide here](https://iconify.design/docs/icon-components/vue/).
> * **Spinner** – used to show a loading indicator when the `loading` prop is active. [Read the integration guide here](/components/spinner).

---

## Base Component

```vue
<script setup>
import Spinner from './Spinner.vue';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'gray',
    validator: (value) =>
      [
        'gray',
        'blue',
        'white',
        'yellow',
        'green',
        'red',
        'transparent',
        'bordered',
      ].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
  },
  fullwidth: Boolean,
  icon: String,
  loading: Boolean,
  disabled: Boolean,
  iconOnly: Boolean,
  responsive: Boolean,
  iconPosition: {
    type: String,
    default: 'start',
    validator: (value) => ['start', 'end'].includes(value),
  },
  customColor: Boolean,
});

const colorClass = computed(() => {
  if (props.customColor) {
    return '';
  }
  return {
    gray: 'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200 hover:border-gray-300',
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    white: 'bg-white text-gray-900 hover:bg-gray-50',
    yellow: 'bg-yellow-600 text-white hover:bg-yellow-700',
    green: 'bg-green-600 text-white hover:bg-green-700',
    red: 'bg-red-600 text-white hover:bg-red-700',
    transparent:
      'text-gray-900 hover:bg-gray-100 hover:border hover:border-gray-200',
    bordered:
      'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50',
  }[props.color || 'gray'];
});

const spinnerColor = computed(() => {
  return {
    gray: 'white',
    blue: 'blue',
    white: 'white',
    yellow: 'yellow',
    green: 'green',
    red: 'red',
    transparent: 'white',
    bordered: 'white',
  }[props.color || 'gray'];
});

const sizeClass = computed(() => {
  const defaultSizes = {
    sm: ['h-8 text-sm', props.iconOnly ? 'w-8' : 'px-3'],
    md: ['h-10', props.iconOnly ? 'w-10' : 'px-4'],
    lg: ['h-12 text-lg', props.iconOnly ? 'w-12' : 'px-5'],
  };
  const responsiveSizes = {
    sm: defaultSizes.sm,
    md: defaultSizes.md,
    lg: [
      'h-10 xl:h-12 xl:text-lg',
      props.iconOnly ? 'w-10 xl:w-12' : 'px-4 xl:px-5',
    ],
  };

  if (props.responsive) {
    return responsiveSizes[props.size || 'md'];
  }

  return defaultSizes[props.size || 'md'];
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'rounded-md font-medium cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
      colorClass,
      sizeClass,
      fullwidth ? 'w-full' : '',
    ]"
  >
    <Spinner
      v-if="loading"
      :color="spinnerColor"
    />
    <Icon
      v-if="!loading && icon && iconPosition === 'start'"
      :icon="icon"
    />
    <slot v-if="!iconOnly" />
    <Icon
      v-if="!loading && icon && iconPosition === 'end'"
      :icon="icon"
    />
  </button>
</template>
```

---

## Props

| Prop        | Type    | Default     | Description                                                                                                                                                      |
| ----------- | ------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`     | String  | `'gray'`    | Determines the button color variant. Acceptable values: `'gray'`, `'blue'`, `'white'`, `'yellow'`, `'green'`, `'red'`, `'transparent'`, `'bordered'`. |
| `size`      | String  | `'md'`      | Determines the button size. Acceptable values: `'sm'`, `'md'`, `'lg'`.                                                                                           |
| `type`      | String  | `'button'`  | The native button type (`button`, `submit`, `reset`).                                                                                                            |
| `fullwidth` | Boolean | `false`     | If `true`, makes the button take full width of the container.                                                                                                    |
| `icon`      | String  | `undefined` | Name of the Iconify icon to display before the text.                                                                                                             |
| `loading`   | Boolean | `false`     | If `true`, replaces content with a spinner and disables the button.                                                                                              |
| `disabled`  | Boolean | `false`     | Disables the button if `true`.                                                                                                                                   |
| `iconOnly`  | Boolean | `false`     | If `true`, the button becomes square and only shows the icon or spinner.                                                                                         |

## Slots

| Slot    | Description                                        |
| ------- | -------------------------------------------------- |
| default | The main content of the button (e.g., label/text). |