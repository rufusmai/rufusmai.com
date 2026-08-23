<template>
  <component
    :is="type"
    :href="href"
    :to="to"
    class="flex items-center font-semibold shadow-sm rounded-lg bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-500 transition duration-300 ease-in-out hover:border-gray-500 dark:hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200/75 dark:focus:ring-gray-700/75 disabled:opacity-50 disabled:border-gray-500"
    :class="{'px-4 py-3': !noPadding, 'border': !bigBorder, 'border-2': bigBorder}"
  >
    <slot />
  </component>
</template>

<script>
import { resolveComponent } from 'vue'

export default {
  // Not named `Button`: in Vue 3 a component name shadows the HTML tag of the
  // same name in `<component :is>`.
  name: 'BaseButton',
  props: {
    to: {
      type: String,
      default: null
    },
    href: {
      type: String,
      default: null
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    bigBorder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    type () {
      if (this.to) {
        return resolveComponent('NuxtLink')
      } else if (this.href) {
        return 'a'
      } else {
        return 'button'
      }
    }
  }
}
</script>
