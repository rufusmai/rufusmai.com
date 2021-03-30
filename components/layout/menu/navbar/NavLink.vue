<template>
  <nuxt-link :to="url">
    <div class="transition-opacity delay-150 duration-300 ease-in-out" :class="active ? '' : 'opacity-0'">
      <div class="h-6 w-10 animate-hover bg-opacity-75 absolute rounded-md mt-5 -ml-1" :style="{'background-color': shapeBg(0)}" />
      <div class="h-5 w-5 animate-hover bg-opacity-75 absolute rounded-md mt-3 ml-10" :style="{'background-color': shapeBg(1)}" />
      <div class="h-5 w-8 animate-hover animate-reverse bg-opacity-75 absolute rounded-md mt-8 ml-16" :style="{'background-color': shapeBg(2)}" />
    </div>
    <!--<div class="h-6 w-10 bg-gray-400 bg-opacity-50 absolute rounded-md -ml-1" />-->
    <h2
      class="nav-link inline relative transition-color duration-300 ease-in-out text-black dark:text-white bg-gradient-to-r bg-clip-text z-20"
      :class="[active ? '' : 'hover:text-transparent dark:hover:text-transparent']"
      :style="{'--tw-gradient-stops': textBg}"
    >
      {{ name }}
    </h2>
  </nuxt-link>
</template>

<script>
import colorTheme from 'tailwindcss/colors'

export default {
  name: 'NavLink',
  props: {
    url: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    colors: {
      type: Array,
      default: () => (['teal', 'blue', 'indigo'])
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shapeBg () {
      return (index) => {
        const variant = this.$colorMode.value === 'light' ? 200 : 500
        return colorTheme[this.colors[index]][variant]
      }
    },
    textBg () {
      const variant = this.$colorMode.value === 'light' ? 600 : 400
      return `${colorTheme[this.colors[0]][variant]}, ${colorTheme[this.colors[1]][variant]}, ${colorTheme[this.colors[2]][variant]}`
    }
  }
}
</script>

<style scoped>

</style>
