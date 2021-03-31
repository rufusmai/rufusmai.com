<template>
  <div
    :class="menuOpened ? '' : 'pointer-events-none'"
    class="nav-wrapper flex-none p-2 absolute z-40 w-full min-h-full top-0 sm:relative sm:w-auto sm:h-auto sm:pointer-events-auto sm:p-0"
  >
    <button
      class="absolute sm:hidden inset-0 h-full w-full transition duration-300 ease-in-out cursor-default bg-opacity-25"
      :class="menuOpened ? 'bg-black' : ''"
      aria-label="Close Menu"
      @click="toggleMenu"
    />
    <nav
      :class="menuOpened ? '' : 'opacity-0'"
      class="transition-opacity relative rounded-lg duration-300 z-40 ease-in-out flex-col place-content-between w-full p-4 bg-white dark:bg-black sm:w-auto sm:h-full sm:pointer-events-auto sm:bg-transparent sm:dark:bg-transparent sm:flex sm:opacity-100"
    >
      <div class="flex justify-between">
        <SocialMedia />
        <button
          aria-label="Close Menu"
          class="sm:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
          @click="toggleMenu"
        >
          <XIcon class="h-6 w-6" />
        </button>
      </div>

      <Navbar
        :menu-opened="menuOpened"
        :install-prompt="installPrompt"
        class="mt-2"
        @update:menuOpened="toggleMenu"
      />

      <div class="mt-3 sm:mt-auto flex justify-between pt-2">
        <LanguageChoose />
        <ThemeChoose class="ml-2" />
      </div>
    </nav>
  </div>
</template>

<script>
import { XIcon } from '@vue-hero-icons/outline'
import menuToggle from '../../../mixins/menuToggle'
import LanguageChoose from './chooser/LanguageChoose'
import ThemeChoose from './chooser/ThemeChoose'
import SocialMedia from './SocialMedia'
import Navbar from './navbar/Navbar'

export default {
  name: 'Menu',
  components: { Navbar, SocialMedia, LanguageChoose, ThemeChoose, XIcon },
  mixins: [menuToggle],
  props: {
    installPrompt: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
