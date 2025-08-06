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
    default: 'secondary',
    validator: (value) =>
      [
        'secondary',
        'primary',
        'light',
        'warning',
        'success',
        'error',
        'transparent',
        'bordered',
      ].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  type: String,
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
  tag: {
    default: 'button',
  },
});

const colorClass = computed(() => {
  if (props.customColor) {
    return '';
  }
  return {
    secondary: 'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200 hover:border-gray-300',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    light: 'bg-white text-gray-900 hover:bg-gray-50',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    error: 'bg-red-600 text-white hover:bg-red-700',
    transparent:
      'text-gray-900 hover:bg-gray-100 hover:border hover:border-gray-200',
    bordered:
      'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50',
  }[props.color || 'secondary'];
});

const spinnerColor = computed(() => {
  return {
    secondary: 'white',
    primary: 'blue',
    light: 'white',
    warning: 'yellow',
    success: 'green',
    error: 'red',
    transparent: 'white',
    bordered: 'white',
  }[props.color || 'secondary'];
});

const sizeClass = computed(() => {
  const defaultSizes = {
    sm: ['h-8 text-sm', props.iconOnly ? 'w-8' : 'px-3'],
    md: ['h-10', props.iconOnly ? 'w-10' : 'px-4'],
    lg: ['h-12 text-lg', props.iconOnly ? 'w-12' : 'px-5'],
  };
  const responsiveSizes = {
    sm: defaultSizes.sm,
    md: ['h-8 px-3 text-sm lg:px-4 lg:h-10 lg:text-base'],
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
  <component
    :is="tag"
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
  </component>
</template>
```

## Props

| Prop           | Type    | Default       | Description                                                                                                                                                        |
| -------------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color`        | String  | `'secondary'` | Determines the button color variant. Acceptable values: `'secondary'`, `'primary'`, `'light'`, `'warning'`, `'success'`, `'error'`, `'transparent'`, `'bordered'`. |
| `size`         | String  | `'md'`        | Determines the button size. Acceptable values: `'sm'`, `'md'`, `'lg'`.                                                                                             |
| `type`         | String  | `undefined`   | The native button type (`button`, `submit`, `reset`).                                                                                                              |
| `fullwidth`    | Boolean | `false`       | If `true`, makes the button take full width of the container.                                                                                                      |
| `icon`         | String  | `undefined`   | Name of the Iconify icon to display before the text.                                                                                                               |
| `iconPosition` | String  | `'start'`     | Position of the icon relative to the text. Acceptable values: `'start'`, `'end'`.                                                                                  |
| `loading`      | Boolean | `false`       | If `true`, replaces content with a spinner and disables the button.                                                                                                |
| `disabled`     | Boolean | `false`       | Disables the button if `true`.                                                                                                                                     |
| `iconOnly`     | Boolean | `false`       | If `true`, the button becomes square and only shows the icon or spinner.                                                                                           |
| `responsive`   | Boolean | `false`       | If `true`, the button adapts to different screen sizes for better responsiveness.                                                                                  |
| `customColor`  | Boolean | `false`       | If `true`, disables the default color styling, allowing for fully custom color control.                                                                            |
| `tag`          | Type    | `'button'`    | The HTML tag or component to render. Useful for rendering as a `router-link`, `a`, or other custom components.                                                     |

## Slots

| Slot    | Description                                        |
| ------- | -------------------------------------------------- |
| default | The main content of the button (e.g., label/text). |