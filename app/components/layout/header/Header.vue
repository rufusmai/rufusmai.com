<template>
  <header class="pt-3 px-3 sm:pt-4 sm:px-4 w-full flex-none flex">
    <div class="flex items-center sm:-mt-2">
      <nuxt-link class="mr-4 relative" to="/">
        <div
          class="absolute rounded-lg z-10 inset-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 blur-10 avatar-gradient opacity-50 dark:opacity-75"
          :style="{backgroundImage: bgColors}"
        />
        <img
          src="~/assets/img/avatar.svg"
          alt="Avatar"
          height="56"
          width="56"
          class="avatar h-14 w-14 bg-white/75 dark:bg-gray-800/75 border border-gray-400/75 dark:border-gray-500/75 hover:border-gray-400 dark:hover:border-gray-500 relative z-20 rounded-lg transition duration-200 ease-in-out"
        >
      </nuxt-link>

      <h1 class="font-bold leading-normal sm:leading-none text-2xl sm:mt-2 xs:text-3xl sm:text-4xl">
        Rufus Maiwald
        <small class="text-gray-500 tracking-tight sm:tracking-normal dark:text-gray-400 block leading-none text-base sm:text-lg">
          Full-Stack Software{{ $t('developer') }}
        </small>
      </h1>
    </div>

    <div class="ml-auto flex items-center sm:space-x-2">
      <button
        class="sm:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300/25 dark:hover:bg-gray-700/25 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
        aria-label="Open Menu"
        @click="toggleMenu"
      >
        <Bars3Icon class="h-8 w-8" />
      </button>
    </div>
  </header>
</template>

<script>
import { Bars3Icon } from '@heroicons/vue/24/outline'
import colorTheme from '../../../utils/colors'
import menuToggle from '../../../mixins/menuToggle'

export default {
  name: 'SiteHeader',
  components: { Bars3Icon },
  mixins: [menuToggle],
  props: {
    colors: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    bgColors () {
      return `linear-gradient(to right, ${colorTheme[this.colors[0]][500]}, ${colorTheme[this.colors[2]][500]})`
    }
  }
}
</script>
