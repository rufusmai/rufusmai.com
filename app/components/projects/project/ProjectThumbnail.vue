<template>
  <div class="relative block z-20">
    <div class="thumbnail blur-20 absolute opacity-50 z-10 max-w-full" :style="{'background-color': bgColor}" />
    <div class="thumbnail absolute z-10 rounded-lg bg-white/75 dark:bg-black/75 max-w-full" />

    <a :href="links.ext" target="_blank" rel="noopener">
      <img
        :src="image"
        :alt="`${title} Hero`"
        class="thumbnail max-w-full relative z-20 rounded-lg mt-2 bg-gray-600 opacity-75 shadow-sm border border-gray-400 dark:border-gray-500"
      >
    </a>

    <div class="flex m-3 justify-between space-x-2 absolute z-20 bottom-0 right-0 sm:-right-6">
      <BaseButton
        v-if="Object.keys(links).includes('gh')"
        :href="`https://github.com/${links.gh}`"
        class="inline-flex bg-white/90 dark:bg-gray-800/90 text-md px-2.5 py-1.5"
        target="_blank"
        rel="noopener"
      >
        <GithubLogo class="mr-1 inline-block h-4 w-4" />
        Github
      </BaseButton>
    </div>
  </div>
</template>

<script>
import colorTheme from '../../../utils/colors'
import GithubLogo from '../../icons/GithubLogo.vue'
import BaseButton from '../../Button.vue'

export default {
  name: 'ProjectThumbnail',
  components: { BaseButton, GithubLogo },
  props: {
    title: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    links: {
      type: Object,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    bgColor () {
      return colorTheme[this.color][500]
    }
  }
}
</script>

<style scoped>
.thumbnail {
  width: 320px;
  height: 180px;
}
</style>
