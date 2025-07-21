---
title: Section
description: A guide to using the section component.
---

## Base Component

```vue
<script setup lang="ts">
import { computed } from 'vue';
import BaseContainer from './BaseContainer.vue';
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
});
</script>

<template>
  <component
    :is="tag"
    class="py-10 sm:py-12 md:py-14 xl:py-16 2xl:py-20"
  >
    <BaseContainer>
      <div
        v-if="title"
        class="space-y-4 lg:space-y-6 2xl:space-y-8"
      >
        <div class="flex items-center justify-between">
          <component
            :is="`h${titleLevel}`"
            class="flex items-center gap-2 font-bold text-stone-900 text-xl tracking-tight md:text-2xl lg:text-3xl xl:gap-4 2xl:text-4xl"
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
    </BaseContainer>
  </component>
</template>
```