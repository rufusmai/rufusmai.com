<template>
  <a :href="links.ext" class="relative block z-20" target="_blank" rel="noopener">
    <div class="thumbnail blur-20 absolute opacity-50 z-10" :style="{'background-color': bgColor}" />
    <div class="thumbnail absolute z-10 rounded-lg bg-white dark:bg-black bg-opacity-75" />

    <img
      :src="image"
      :alt="`${title} Hero`"
      class="thumbnail relative z-20 rounded-lg mt-2 bg-gray-600 opacity-75 shadow-sm border border-gray-400 dark:border-gray-500"
    >

    <client-only>
      <div class="flex m-3 justify-between space-x-2 absolute z-20 bottom-0 -right-6">
        <Button
          v-if="Object.keys(links).includes('gh')"
          :href="`https://github.com/rufusmai/${links.gh}`"
          class="inline-flex bg-opacity-90 text-md px-2.5 py-1.5"
          target="_blank"
          rel="noopener"
        >
          <fai class="mr-1" :icon="['fab', 'github']" />
          Github
        </Button>
        <Button
          v-else-if="title === 'OneGaming ID'"
          class="inline-flex bg-opacity-90 text-md px-2.5 py-1.5"
          @click.prevent="login"
        >
          <OneGamingLogo class="h-4 mr-1.5" />
          <span class="sm:hidden">1GMG Login</span>
          <span class="hidden sm:inline">Login {{ $t('with') }} 1GMG</span>
        </Button>
      </div>
    </client-only>
  </a>
</template>

<script>
import colorTheme from 'tailwindcss/colors'
import oauth from '../../../mixins/oauth'

import OneGamingLogo from '../../icons/OneGamingLogo'
import Button from '../../Button'

export default {
  name: 'ProjectThumbnail',
  components: { Button, OneGamingLogo },
  mixins: [oauth],
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
  },
  methods: {
    async login () {
      const state = this.generateRandomString()
      localStorage.setItem('pkce_state', state)

      const codeVerifier = this.generateRandomString()
      localStorage.setItem('pkce_code_verifier', codeVerifier)

      const codeChallenge = await this.pkceChallengeFromVerifier(codeVerifier)

      window.location = 'http://id.onegaming.group/api/v1/oauth2/authorize' +
        '?response_type=code' +
        '&client_id=' + encodeURIComponent('5f68b682e7db6e447df529f0') +
        '&state=' + encodeURIComponent(state) +
        '&scope=' + encodeURIComponent('openid profile') +
        '&redirect_uri=' + encodeURIComponent(window.location.origin + '/login') +
        '&code_challenge=' + encodeURIComponent(codeChallenge) +
        '&code_challenge_method=S256'
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
