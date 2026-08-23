<template>
  <footer class="text-center text-gray-400 xs:p-2 mt-10">
    <i18n-t keypath="developedWith" tag="div" class="inline-block">
      <template #nuxt>
        <a href="https://nuxt.com/" target="_blank" rel="noopener" aria-label="Nuxt">
          <NuxtLogo class="w-4 h-4 inline" />
        </a>
      </template>
      <template #tailwind>
        <a href="https://tailwindcss.com/" target="_blank" rel="noopener" aria-label="TailwindCSS" class="ml-1">
          <TailwindcssLogo class="w-4 h-4 inline" />
        </a>
      </template>
      <template #heart>
        <span class="text-red-500">&hearts;</span>
      </template>
    </i18n-t>
    <br class="hidden sm:block md:hidden">
    <i18n-t
      keypath="viewOnGithub"
      tag="a"
      class="text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 transition duration-200 ease-in-out"
      href="https://github.com/rufusmai/rufusmai.com"
      target="_blank"
      rel="noopener"
    >
      <template #github>
        <GithubLogo class="inline-block -mt-1 mx-0.5 h-4 w-4" />
      </template>
    </i18n-t>
  </footer>
</template>

<script>
import TailwindcssLogo from '../icons/TailwindcssLogo.vue'
import NuxtLogo from '../icons/NuxtLogo.vue'
import GithubLogo from '../icons/GithubLogo.vue'

export default {
  name: 'SiteFooter',
  components: { GithubLogo, TailwindcssLogo, NuxtLogo }
}
</script>
