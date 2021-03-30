<template>
  <span
    class="inline-block px-2 py-1 mt-2 mr-2 rounded-full bg-white dark:bg-gray-800 bg-opacity-50 border border-gray-400 dark:border-gray-500"
  >
    {{ name }}
  </span>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    name: {
      type: String,
      default: null
    }
  }
}
</script>
