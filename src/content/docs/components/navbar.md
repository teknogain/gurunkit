---
title: Navbar
description: A guide to using the navbar component.
---

`Navbar` is a responsive navigation component that includes a collapsible sidebar for mobile devices. It renders a list of menu links, highlights the active menu, and supports flexible layout through slots and container customization.

> **Note:** This component relies on the following external components and utilities:
> * **Iconify** – used to render the mobile menu icon. [Follow the installation guide here](https://iconify.design/docs/icon-components/vue/).
> * **Container** – used to wrap the navbar content. [Read the integration guide here](/components/container).
> * **click-outside-vue3** – used to close the sidebar when clicking outside of the sidebar. [Follow the installation guide here](https://www.npmjs.com/package/click-outside-vue3).
> * **Vue Router** – required for menu navigation and auto-hiding the sidebar on route change. [Follow the installation guide here](https://router.vuejs.org/installation.html).

---

## Base Component

```vue
<script setup>
import { computed, ref, useTemplateRef } from 'vue';
import Container from './Container.vue';
import { Icon } from '@iconify/vue';
import { RouterLink, useRouter } from 'vue-router';

const props = defineProps({
  containerProps: null,
  menus: {
    type: Array,
    default: () => [],
  },
  activeMenu: String,
  brand: String,
  brandRoute: null,
  bordered: {
    type: Boolean,
    default: true,
  },
  menuCenter: Boolean,
  customClass: {
    type: Object,
    default: () => ({
      menuDefault: '',
      menuActive: '',
    }),
  },
});

const router = useRouter();

const toggleSidebarButton = useTemplateRef('toggle-button');
const mobileSidebarVisible = ref(false);

const menusDynamicPositionClass = computed(() => {
  const baseClass = [
    props.menuCenter ? 'sm:left-1/2 sm:-translate-x-1/2' : 'sm:left-0',
  ];

  if (mobileSidebarVisible.value) {
    return ['left-0', baseClass];
  }

  return ['-left-full', baseClass];
});

function getMenuClass(menu) {
  return [
    'relative px-3 py-2 sm:p-0',
    props.activeMenu === menu.id
      ? [
          'font-bold rounded-md bg-amber-800 text-white sm:bg-transparent sm:text-amber-800',
          props.customClass.menuActive,
        ]
      : [
          'rounded-md text-gray-900 hover:bg-gray-100 sm:text-gray-900 sm:hover:text-amber-800 sm:hover:bg-transparent',
          props.customClass.menuDefault,
        ],
  ];
}
function onClickOutsideSidebar(e) {
  if (!toggleSidebarButton.value.contains(e.target)) {
    mobileSidebarVisible.value = false;
  }
}

router.afterEach(() => (mobileSidebarVisible.value = false));
</script>

<template>
  <nav
    :class="[
      'h-14 bg-white flex items-center lg:h-16 text-gray-900',
      bordered ? 'border-b border-gray-300' : '',
    ]"
  >
    <Container
      :class="[
        'flex items-center justify-between',
        menuCenter ? 'relative' : '',
      ]"
      v-bind="containerProps"
    >
      <div class="flex items-center gap-6">
        <slot name="start">
          <div :class="['flex items-center gap-4', brand ? '' : 'sm:hidden']">
            <!-- burger menu -->
            <button
              ref="toggle-button"
              class="text-gray-900 cursor-pointer flex items-center sm:hidden"
              aria-label="Toggle Sidebar"
              @click="mobileSidebarVisible = true"
            >
              <Icon
                icon="tabler:menu-2"
                class="size-5"
              />
            </button>
            <!-- end burger menu -->

            <!-- brand -->
            <router-link
              v-if="brand"
              :to="brandRoute"
              class="font-bold text-lg flex items-center gap-2 lg:text-xl"
            >
              {{ brand }}
            </router-link>
            <!-- end brand -->
          </div>
        </slot>

        <!-- menus -->
        <div
          v-click-outside="onClickOutsideSidebar"
          :class="[
            'fixed bg-white top-0 h-screen flex flex-col w-48 z-20 border-r border-gray-300 p-3 transition-all sm:transition-none sm:h-full sm:bg-transparent sm:border-0 sm:h-auto sm:w-auto sm:p-0 sm:flex-row sm:items-center sm:gap-4',
            menusDynamicPositionClass,
            menuCenter ? 'sm:absolute' : 'sm:static',
          ]"
        >
          <template
            v-for="menu in menus"
            :key="menu.id"
          >
            <RouterLink
              v-if="menu.to"
              :to="menu.to"
              :class="getMenuClass(menu)"
            >
              {{ menu.name }}
            </RouterLink>
            <a
              v-else
              :href="menu.href"
              :class="getMenuClass(menu)"
            >{{
              menu.name
            }}</a>
          </template>
        </div>
        <!-- end menus -->
      </div>
      <slot name="end" />
    </Container>
  </nav>
</template>
```

## Props

| Prop             | Type    | Default                               | Description                                                                 |
| ---------------- | ------- | ------------------------------------- | --------------------------------------------------------------------------- |
| `menus`          | Array   | `[]`                                  | List of menu items, each with `id`, `name`, and `to` (for `router-link`).   |
| `activeMenu`     | String  | —                                     | The ID of the currently active menu item. Used to apply active styles.      |
| `containerProps` | Any     | —                                     | Props forwarded to the `Container` component (e.g., `class`, `style`, etc). |
| `brand`          | String  | —                                     | Optional brand name or logo text to display in the navbar.                  |
| `brandRoute`     | Any     | —                                     | Route destination for the brand element. Can be a string or route object.   |
| `bordered`       | Boolean | `true`                                | If `true`, applies a bottom border to the navbar.                           |
| `customClass`    | Object  | `{ menuActive: '', menuDefault: '' }` | Custom classes for styling active and default menu items.                   |

## Slots

| Slot | Description                                                                        |
| --------- | ---------------------------------------------------------------------------------- |
| `start`   | Content shown on the left side of the navbar (default shows mobile toggle + menu). |
| `end`     | Content shown on the right side of the navbar (e.g., user avatar, settings).       |