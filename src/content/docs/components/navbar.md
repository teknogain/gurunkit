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
import BaseContainer from './BaseContainer.vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  containerProps: null,
  menus: {
    type: Array,
    default: () => ([])
  },
  activeMenu: String,
  brand: String,
  bordered: {
    type: Boolean,
    default: true
  },
  menuCenter: Boolean,
  classes: {
    type: Object,
    default: () => ({
      menuDefault: '',
      menuActive: ''
    })
  }
});

const router = useRouter();

const toggleSidebarButton = useTemplateRef('toggle-button');
const mobileSidebarVisible = ref(false);

const colorClass = {
  nav: {
    text: 'text-stone-900',
    border: 'border-stone-300'
  },
  toggle: 'text-stone-900',
  sidebar: {
    border: 'border-stone-300'
  },
  menu: {
    default: ['sm:text-stone-900 sm:hover:text-amber-800 sm:hover:bg-transparent', props.classes.menuDefault],
    active: ['sm:bg-transparent sm:text-amber-800', props.classes.menuActive]
  },
  sidebarMenu: {
    default: 'rounded-md text-stone-900 hover:bg-stone-100',
    active: 'rounded-md bg-amber-800 text-white'
  }
}
const menusDynamicPositionClass = computed(() => {
  if (mobileSidebarVisible.value) {
    return ['left-0', props.menuCenter ? 'sm:left-1/2 sm:-translate-x-1/2' : 'sm:left-0']
  }

  return ['-left-full', props.menuCenter ? 'sm:left-1/2 sm:-translate-x-1/2' : 'sm:left-0']
}) 

function onClickOutsideSidebar(e) {
  if (!toggleSidebarButton.value.contains(e.target)) {
    mobileSidebarVisible.value = false;
  }
}

router.afterEach(() => (mobileSidebarVisible.value = false));
</script>

<template>
  <nav
    :class="['h-14 bg-white flex items-center lg:h-16', colorClass.nav.text, bordered ? ['border-b', colorClass.nav.border] : '',]"
  >
    <BaseContainer
      :class="['flex items-center justify-between', menuCenter ? 'relative' : '']"
      v-bind="containerProps"
    >
      <slot name="start">
        <button
          ref="toggle-button"
          :class="['cursor-pointer flex items-center sm:hidden', colorClass.toggle]"
          @click="mobileSidebarVisible = true"
        >
          <Icon icon="tabler:menu-2" />
        </button>
        <div class="flex items-center gap-4">
          <a v-if="brand" href="" class="font-bold text-lg">{{ brand }}</a>
          <div
            v-click-outside="onClickOutsideSidebar"
            :class="[
              'fixed bg-white top-0 h-screen flex flex-col w-48 z-20 border-r p-3 transition-all sm:bg-transparent sm:border-0 sm:h-auto sm:w-auto sm:p-0 sm:flex-row sm:items-center sm:gap-4',
              menusDynamicPositionClass,
              colorClass.sidebar.border,
              menuCenter ? 'sm:absolute' : 'sm:static'
            ]"
          >
            <component
              v-for="menu in menus"
              :key="menu.id"
              :is="menu.to ? 'router-link' : 'a'"
              :href="menu.href"
              :to="menu.to"
              :class="[
                'relative px-3 py-2 sm:p-0',
                activeMenu === menu.id
                  ? ['font-bold', colorClass.sidebarMenu.active, colorClass.menu.active]
                  : [colorClass.sidebarMenu.default, colorClass.menu.default],
              ]"
            >
              {{ menu.name }}
            </component>
          </div>
        </div>
      </slot>
      <slot name="end" />
    </BaseContainer>
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

| Slot | Description                                                                        |
| --------- | ---------------------------------------------------------------------------------- |
| `start`   | Content shown on the left side of the navbar (default shows mobile toggle + menu). |
| `end`     | Content shown on the right side of the navbar (e.g., user avatar, settings).       |

## Behavior

* On mobile (`sm:hidden`), the sidebar appears with a slide-in animation and covers the left side of the screen.
* Clicking outside the sidebar or navigating to another route automatically hides the sidebar.
* On larger screens, the menu items are displayed inline and no toggle button is shown.
