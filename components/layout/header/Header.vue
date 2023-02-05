<template>
  <header class="pt-3 px-3 sm:pt-4 sm:px-4 w-full flex-none flex">
    <div class="flex items-center sm:-mt-2">
      <nuxt-link class="mr-4 relative" to="/">
        <div
          class="absolute rounded-lg z-10 inset-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-gradient-to-r blur-10 avatar-gradient opacity-50 dark:opacity-75"
          :style="{'--tw-gradient-stops': bgColors}"
        />
        <img
          src="~/assets/img/avatar.svg"
          alt="Avatar"
          height="56"
          width="56"
          class="avatar h-14 w-14 bg-white dark:bg-gray-800 bg-opacity-75 border border-gray-400 dark:border-gray-500 border-opacity-75 hover:border-opacity-100 relative z-20 rounded-lg transition duration-200 ease-in-out"
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
      <AvatarMenu class="hidden sm:block" />
      <button
        class="sm:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:bg-opacity-25 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
        aria-label="Open Menu"
        @click="toggleMenu"
      >
        <MenuIcon class="h-8 w-8" />
      </button>
    </div>
  </header>
</template>

<script>
import colorTheme from 'tailwindcss/colors'
import { MenuIcon } from '@vue-hero-icons/outline'
import menuToggle from '../../../mixins/menuToggle'
import AvatarMenu from './AvatarMenu'

export default {
  name: 'Header',
  components: { AvatarMenu, MenuIcon },
  mixins: [menuToggle],
  props: {
    colors: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    bgColors () {
      return `${colorTheme[this.colors[0]][500]}, ${colorTheme[this.colors[2]][500]}`
    }
  }
}
</script>

<style scoped>

</style>
