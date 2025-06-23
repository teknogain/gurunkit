---
title: Container  
description: A guide to using the container component.
---

The `Container` component is a layout utility that centers content horizontally and applies responsive horizontal padding. It's commonly used to wrap page sections, ensuring consistent spacing across different screen sizes.

## Base Component

This is the basic implementation of the `Container` component:

```vue
<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <slot />
  </div>
</template>
```
## Slots

### Default Slot

Place your content inside the default slot. This content will be centered and padded based on the screen size.

```vue
<base-container>
  <p>This content is inside a centered container with horizontal padding.</p>
</base-container>
```