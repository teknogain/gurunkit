---
title: Sidebar  
description: A guide to using the sidebar component.
---

`Sidebar` is a reusable vertical navigation component that displays a brand section and a list of menu items. Ideal for simple layouts like admin panels or dashboard side navigation.

---

## Base Component

```vue
<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  menus: {
    type: Array,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  brandIcon: String,
  activeMenu: String,
});

function getMenuClass(menu) {
  return [
    'flex items-center gap-2 px-4 py-2.5 rounded-lg',
    props.activeMenu === menu.id
      ? 'bg-blue-600 font-bold'
      : 'hover:bg-gray-600',
  ];
}
</script>

<template>
  <aside
    class="w-72 h-screen fixed top-0 left-0 bg-gray-900 text-white p-3 space-y-4"
  >
    <a
      href=""
      class="flex items-center gap-2 px-4 py-2.5 font-bold text-lg uppercase tracking-tight"
    >
      <Icon
        v-if="brandIcon"
        :icon="brandIcon"
        class="size-5"
      />
      {{ brand }}
    </a>

    <div class="space-y-1">
      <template
        v-for="menu in menus"
        :key="menu.id"
      >
        <RouterLink
          v-if="menu.to"
          :to="menu.to"
          :class="getMenuClass(menu)"
        >
          <Icon
            :icon="menu.icon"
            class="size-5"
          />
          {{ menu.name }}
        </RouterLink>
        <a
          v-else
          href=""
          :class="getMenuClass(menu)"
        >
          <Icon
            :icon="menu.icon"
            class="size-5"
          />
          {{ menu.name }}
        </a>
      </template>
    </div>
  </aside>
</template>
```

## Props

| Prop         | Type   | Required   | Default | Description                                                                               |
| ------------ | ------ | ---------- | ------- | ----------------------------------------------------------------------------------------- |
| `menus`      | Array  | Yes        | —       | List of menu items. Each item can have `id`, `name`, `to`, `icon`, and `href` properties. |
| `brand`      | String | Yes        | —       | Text displayed as the brand name at the top of the sidebar.                               |
| `brandIcon`  | String | No         | —       | Icon name displayed next to the brand text (optional).                                    |
| `activeMenu` | String | No         | —       | The ID of the currently active menu item. Used to apply active styling.                   |

## Slots

This component does not use any slots.