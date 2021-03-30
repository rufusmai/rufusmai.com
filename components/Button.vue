<template>
  <component
    :is="type"
    :href="href"
    :to="to"
    class="flex items-center font-semibold px-4 py-3 shadow-sm rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-500 transition duration-300 ease-in-out hover:border-gray-500 dark:hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 focus:ring-opacity-75 dark:focus:ring-opacity-75 disabled:bg-opacity-50 disabled:text-opacity-75 disabled:border-gray-500"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'Button',
  props: {
    to: {
      required: false,
      type: String,
      default: null
    },
    href: {
      required: false,
      type: String,
      default: ''
    }
  },
  computed: {
    type () {
      if (this.to) {
        return 'nuxt-link'
      } else if (this.href) {
        return 'a'
      } else {
        return 'button'
      }
    }
  }
}
</script>

<style scoped>

</style>
