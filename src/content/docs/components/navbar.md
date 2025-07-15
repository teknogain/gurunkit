---
title: Navbar
description: A guide to using the navbar component.
---

`Navbar` is a responsive navigation component that includes a collapsible sidebar for mobile devices. It renders a list of menu links, highlights the active menu, and supports flexible layout through slots and container customization.

> **Note:** This component relies on the following external components and utilities:
> * **Iconify** – used to render the mobile menu icon. [Follow the installation guide here](https://iconify.design/docs/icon-components/vue/).
> * **Container** – wraps the navbar content. [Read the integration guide here](/components/container).
> * **v-click-outside** – a directive used to detect clicks outside the sidebar to close it. [Follow the installation guide here](https://www.npmjs.com/package/v-click-outside).
> * **Vue Router** – required for `router-link` and to auto-hide the sidebar on route change. [Follow the installation guide here](https://router.vuejs.org/installation.html).

---

## Base Component

```vue
<script setup>
import { ref, useTemplateRef } from 'vue';
import Container from './Container.vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

defineProps({
  containerProps: null,
  menus: {
    type: Array,
    default: () => ([])
  },
  activeMenu: String,
});

const router = useRouter();

const toggleSidebarButton = useTemplateRef('toggle-button');
const mobileSidebarVisible = ref(false);

function onClickOutsideSidebar(e) {
  if (!toggleSidebarButton.value.contains(e.target)) {
    mobileSidebarVisible.value = false;
  }
}

router.afterEach(() => (mobileSidebarVisible.value = false));
</script>

<template>
  <nav
    class="h-14 bg-white border-b border-gray-300 text-gray-900 flex items-center lg:h-16"
  >
    <Container
      class="flex items-center justify-between"
      v-bind="containerProps"
    >
      <slot name="start">
        <button
          ref="toggle-button"
          class="cursor-pointer text-gray-900 flex items-center sm:hidden"
          @click="mobileSidebarVisible = true"
        >
          <Icon icon="tabler:menu-2" />
        </button>
        <div
          v-click-outside="onClickOutsideSidebar"
          :class="[
            'fixed bg-white top-0 h-screen flex flex-col w-48 z-10 border-r border-gray-300 p-3 transition-all sm:static sm:bg-transparent sm:border-0 sm:h-auto sm:w-auto sm:p-0 sm:flex-row sm:items-center sm:gap-4',
            mobileSidebarVisible ? 'left-0' : '-left-full',
          ]"
        >
          <router-link
            v-for="menu in menus"
            :key="menu.id"
            :to="menu.to"
            :class="[
              'relative px-3 py-2 sm:p-0',
              activeMenu === menu.id
                ? 'bg-blue-600 text-white rounded-md font-bold sm:bg-transparent sm:text-blue-600'
                : 'text-gray-900 hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-blue-600',
            ]"
          >
            {{ menu.name }}
          </router-link>
        </div>
      </slot>
      <slot name="end" />
    </Container>
  </nav>
</template>
```

---

## Props

| Prop             | Type   | Default | Description                                                                 |
| ---------------- | ------ | ------- | --------------------------------------------------------------------------- |
| `menus`          | Array  | `[]`    | List of menu items, each with `id`, `name`, and `to` (for router-link).     |
| `activeMenu`     | String | —       | The ID of the currently active menu item. Used to apply active styles.      |
| `containerProps` | Any    | `null`  | Props forwarded to the `Container` component (e.g., class, style, etc). |

## Slots

| Slot name | Description                                                                        |
| --------- | ---------------------------------------------------------------------------------- |
| `start`   | Content shown on the left side of the navbar (default shows mobile toggle + menu). |
| `end`     | Content shown on the right side of the navbar (e.g., user avatar, settings).       |

## Behavior

* On mobile (`sm:hidden`), the sidebar appears with a slide-in animation and covers the left side of the screen.
* Clicking outside the sidebar or navigating to another route automatically hides the sidebar.
* On larger screens, the menu items are displayed inline and no toggle button is shown.