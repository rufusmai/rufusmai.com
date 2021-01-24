<template>
  <nuxt-link :to="url">
    <div class="transition-opacity delay-150 duration-300 ease-in-out" :class="active ? '' : 'opacity-0'">
      <div class="h-6 w-10 animation-translate bg-opacity-75 absolute rounded-md mt-5 -ml-1" :class="'bg-' + colors[0] + '-500'" />
      <div class="h-5 w-5 animation-translate bg-opacity-75 absolute rounded-md mt-3 ml-10" :class="'bg-' + colors[1] + '-500'" />
      <div class="h-5 w-8 animation-translate animation-reverse bg-opacity-75 absolute rounded-md mt-8 ml-16" :class="'bg-' + colors[2] + '-500'" />
    </div>
    <!--<div class="h-6 w-10 bg-gray-400 bg-opacity-50 absolute rounded-md -ml-1" />-->
    <h2
      class="nav-link inline relative transition-color duration-300 ease-in-out text-white bg-gradient-to-r bg-clip-text z-20"
      :class="[active ? '' : 'hover:text-transparent', ...bgClasses]"
    >
      {{ name }}
    </h2>
  </nuxt-link>
</template>

<script>
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
    bgClasses () {
      const classes = []

      for (let i = 0; i < this.colors.length; i++) {
        const color = this.colors[i]

        if (i === 0) {
          classes.push('from-' + color + '-400')
        } else if (i === this.colors.length - 1) {
          classes.push('to-' + color + '-400')
        } else {
          classes.push('via-' + color + '-400')
        }
      }

      return classes
    }
  }
}
</script>

<style scoped>

</style>
