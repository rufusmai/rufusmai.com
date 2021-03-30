<template>
  <div>
    <button v-if="menuOpen" class="absolute w-screen inset-0 focus:outline-none cursor-default z-30" @click="menuOpen = false" />
    <div class="relative">
      <transition
        leave-class="transition ease-in duration-100"
        leave-active-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="menuOpen" class="absolute z-50 bottom-0 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg">
          <ul class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <li
              v-for="theme in colorModes"
              :key="theme.name"
              class="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-default select-none relative py-2 pl-3 pr-9"
              :class="{'bg-gray-100 dark:bg-gray-600': $colorMode.preference === theme.name}"
              @click="setColorMode(theme.name)"
            >
              <component :is="theme.component" />
              <span v-if="$colorMode.preference === theme.name" class="absolute inset-y-0 right-0 flex items-center pr-2">
                <CheckIcon />
              </span>
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <Button class="relative z-40 pr-8" @click.native="menuOpen = !menuOpen">
      <span class="block truncate">
        <component :is="colorMode.component" />
      </span>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <SelectorIcon class="h-5 w-5 text-gray-400" />
      </span>
    </Button>
  </div>
</template>

<script>
import { SunIcon, MoonIcon, DesktopComputerIcon, CheckIcon, SelectorIcon } from '@vue-hero-icons/outline'
import Button from '../../../Button'

export default {
  name: 'LanguageChoose',
  components: { Button, SunIcon, MoonIcon, DesktopComputerIcon, CheckIcon, SelectorIcon },
  data () {
    return {
      menuOpen: false,
      colorModes: [
        {
          name: 'system',
          component: DesktopComputerIcon
        },
        {
          name: 'dark',
          component: MoonIcon
        },
        {
          name: 'light',
          component: SunIcon
        }
      ]
    }
  },
  computed: {
    colorMode () {
      for (const colorMode of this.colorModes) {
        if (this.$colorMode.preference === colorMode.name) {
          return colorMode
        }
      }

      return this.colorModes[1]
    }
  },
  methods: {
    setColorMode (colorMode) {
      this.$colorMode.preference = colorMode

      this.$root.$emit('colorModeChanged', { colorMode })
    }
  }
}
</script>

<style scoped>
.dropdown {
  bottom: 100%
}
</style>
