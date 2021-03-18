<template>
  <client-only>
    <footer class="text-center text-gray-500 xs:p-2 mt-10">
      <i18n path="developedWith" tag="span">
        <a href="https://nuxtjs.org/" target="_blank" rel="noopener" aria-label="Nuxt.js">
          <NuxtLogo class="w-4 h-4 inline" />
        </a>
        <a href="https://tailwindcss.com/" target="_blank" rel="noopener" aria-label="TailwindCSS" class="ml-1">
          <TailwindcssLogo class="w-4 h-4 inline" />
        </a>
        <span class="text-red-500">&hearts;</span>
      </i18n>
      <br class="md:hidden">
      <i18n
        path="viewOnGithub"
        tag="a"
        class="text-gray-800 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition duration-200 ease-in-out"
        href="https://github.com/rufusmai/rufusmai.com"
        target="_blank"
        rel="noopener"
      >
        <fai :icon="['fab', 'github']" />
      </i18n>
    </footer>
  </client-only>
</template>

<script>
import TailwindcssLogo from '../icons/TailwindcssLogo'
import NuxtLogo from '../icons/NuxtLogo'

export default {
  name: 'Footer',
  components: { TailwindcssLogo, NuxtLogo }
}
</script>

<style scoped>

</style>
