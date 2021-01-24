<template>
  <div class="content-wrapper block h-full mx-auto w-full">
    <div class="pb-2 space-y-8 md:space-y-0 md:space-x-8 md:flex flex-row flex-no-wrap md:overflow-x-auto scroll">
      <div v-for="(project, id) in projects" :key="id" class="max-w-xs mx-auto md:m-0 sm:flex-none">
        <div class="flex flex-row font-bold">
          <img :src="project.logo" alt="Logo" class="h-12 w-12 mr-3 bg-white bg-opacity-50 rounded-full border border-gray-500">
          <h2 class="text-3xl leading-10" :class="project.title === 'Portfolio' ? 'mb-2' : 'mb-4'">
            <span v-if="project.title === 'Portfolio'" class="relative block mb-3">
              <span class="absolute block text-base font-semibold text-gray-300 leading-none" style="margin-left: 1px">
                {{ $t('thisSite') }}
              </span>
            </span>
            <div v-else class="block mb-1" />
            {{ project.title }}
          </h2>
        </div>

        <a :href="project.links.ext" class="relative block" target="_blank" rel="noopener">
          <img
            :src="project.img"
            :alt="`${project.title} Hero`"
            width="320"
            height="180"
            class="rounded-lg mt-2 bg-gray-600 opacity-75 shadow-sm border border-gray-500"
          >
          <div class="flex m-3 justify-between space-x-2 absolute bottom-0 text-white right-0">
            <a
              v-if="Object.keys(project.links).includes('gh')"
              :href="`https://github.com/rufusmai/${project.links.gh}`"
              class="inline-flex items-center font-semibold text-md px-2.5 py-1.5 border border-gray-500 shadow-sm rounded-lg bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              target="_blank"
              rel="noopener"
            >
              <fai class="mr-1" :icon="['fab', 'github']" />
              Github
            </a>
            <button
              v-if="project.title === 'OneGaming ID'"
              class="inline-flex items-center font-semibold text-md px-2.5 py-1.5 border border-gray-500 shadow-sm rounded-lg bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              @click="login"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 mr-1.5 fill-current" viewBox="0 0 900.38 1000">
                <path d="M900.38,415.67a85.21,85.21,0,1,1-85.2-85.2A85.2,85.2,0,0,1,900.38,415.67ZM660.5,670a85.21,85.21,0,1,0-12.78-169.45L619.67,659.57A84.81,84.81,0,0,0,660.5,670ZM24.31,548.06h97.6v97.6A24.3,24.3,0,0,0,146.22,670h48.37a24.31,24.31,0,0,0,24.32-24.31v-97.6h44l17.11-97H218.91V354.78a24.32,24.32,0,0,0-24.32-24.31H146.22a24.31,24.31,0,0,0-24.31,24.31v96.29H24.31A24.31,24.31,0,0,0,0,475.38v48.37A24.31,24.31,0,0,0,24.31,548.06Zm302.56-325c22,0,36.88,17.73,33.05,39.39l-83.75,475c-3.82,21.66-25,39.39-47,39.39H169.89c-22,0-43.12,17.73-46.94,39.39L97.5,960.61c-3.82,21.66,11,39.39,33.05,39.39H607.86c22,0,43.13-17.73,46.95-39.39l25.45-144.32c3.82-21.66-11.06-39.39-33.06-39.39H587.88c-22,0-36.88-17.73-33.06-39.39L677.92,39.39C681.74,17.73,666.86,0,644.86,0h-338c-22,0-43.12,17.73-46.94,39.39L234.49,183.71c-3.82,21.66,11,39.39,33.05,39.39Z"/>
              </svg>
              <span class="sm:hidden">1GMG Login</span>
              <span class="hidden sm:inline">Login {{ $t('with') }} 1GMG</span>
            </button>
          </div>
        </a>

        <div class="mt-1 font-bold">
          <span
            v-for="(tag, tagId) in project.tags"
            :key="tagId"
            class="inline-block px-2 py-1 mt-2 mr-2 rounded-full bg-gray-500 bg-opacity-50 border border-gray-500 text-gray-100"
          >
            {{ tag }}
          </span>
        </div>

        <p class="mt-2 font-semibold text-gray-500">
          {{ $t(project.description) }}
        </p>
      </div>
    </div>

    <div class="text-center md:text-left">
      <h1 class="font-bold mt-4 text-4xl">
        {{ $t('githubProjects') }}
      </h1>
      <div v-if="githubRepos.length <= 0" class="mt-4 pb-4 space-y-8 md:space-y-0 md:space-x-4 md:flex flex-row flex-no-wrap md:overflow-x-auto scroll">
        <div v-for="i in [0, 1, 2]" :key="i" class="h-32 w-64 bg-gray-600 bg-opacity-75 rounded-lg animate-pulse" />
      </div>
      <div v-else class="gh-wrapper mt-4 pb-4 space-y-8 md:space-y-0 md:space-x-4 md:flex flex-row flex-no-wrap md:overflow-x-auto scroll">
        <div v-for="repo in githubRepos" :key="repo.id" class="mx-auto max-w-sm md:m-0 bg-gray-500 border border-gray-500 flex-none flex flex-col bg-opacity-50 rounded-lg px-4 py-2">
          <div class="mb-2">
            <h2 class="font-semibold text-2xl">
              {{ repo.name }}
            </h2>
            <p class="text-gray-300">
              {{ repo.description }}
            </p>
          </div>
          <div class="mt-auto space-x-3 font-semibold">
            <a :href="repo.html_url" target="_blank" rel="noopener" class="hover:text-gray-200 transition duration-300 ease-in-out">
              <fai :icon="['fab', 'github']" />
              Github
            </a>
            <nuxt-link v-if="repo.name === 'rufusmaiwald.de'" to="/" class="hover:text-gray-200 transition duration-300 ease-in-out">
              <HomeIcon size="16" class="inline -mt-1" />
              Startseite
            </nuxt-link>
            <a v-else-if="repo.homepage" :href="repo.homepage" target="_blank" rel="noopener" class="hover:text-gray-200 transition duration-300 ease-in-out">
              Homepage
              <ExternalLinkIcon size="16" class="inline" />
            </a>
          </div>
        </div>
      </div>
      <div v-if="githubRepos.length > 0" class="flex items-center justify-center md:justify-start live-indicator text-gray-400">
        <span class="inline-block bg-green-300 w-2 h-2 mr-2 rounded-full" />
        {{ $t('liveFrom') }} <fai :icon="['fab', 'github']" class="mx-1" /> API
      </div>
    </div>
  </div>
</template>

<script>
import { ExternalLinkIcon, HomeIcon } from '@vue-hero-icons/outline'

import mconeLogo from '../assets/img/projects/mc1_logo.jpg'
import mconeImg from '../assets/img/projects/mc1_screen.jpg'

import onegmgLogo from '../assets/img/projects/1gmg_logo.jpg'
import onegmgImg from '../assets/img/projects/1gmg_screen.jpg'

import portfolioLogo from '../assets/img/avatar.svg'
import portfolioImg from '../assets/img/projects/portfolio_screen.jpg'

import oauth from '../mixins/oauth'

export default {
  name: 'Projects',
  components: { ExternalLinkIcon, HomeIcon },
  mixins: [oauth],
  data () {
    return {
      timer: null,
      imgLoading: {},
      projects: [
        {
          title: 'MC ONE',
          links: {
            ext: 'https://www.mcone.eu'
          },
          logo: mconeLogo,
          img: mconeImg,
          tags: [
            'Java', 'PHP', 'Vue.js', 'MongoDB'
          ],
          description: 'mconeDescription'
        },
        {
          title: 'OneGaming ID',
          links: {
            ext: 'https://id.onegaming.group'
          },
          logo: onegmgLogo,
          img: onegmgImg,
          tags: [
            'PHP', 'Oauth2', 'Vue.js', 'Lumen'
          ],
          description: 'onegmgDescription'
        },
        {
          title: 'Portfolio',
          links: {
            int: '/',
            gh: 'rufusmaiwald.de'
          },
          logo: portfolioLogo,
          img: portfolioImg,
          tags: [
            'Nuxt.js', 'PWA', 'tailwindcss'
          ],
          description: 'portfolioDescription'
        }
      ],
      githubRepos: []
    }
  },
  mounted () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', this.serviceWorkerMessage)
    }

    this.fetchGithubRepos()
    // this.timer = setInterval(() => this.fetchGithubRepos(), 120000)
  },
  beforeDestroy () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.removeEventListener('message', this.serviceWorkerMessage)
    }

    clearInterval(this.timer)
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
    },
    fetchGithubRepos () {
      this.$axios.get('https://api.github.com/users/rufusmai/repos', {
        headers: {
          accept: 'application/vnd.github.v3+json'
        },
        transformRequest: (data, headers) => {
          delete headers.common.Authorization
        }
      }).then((response) => {
        this.githubRepos = response.data
      })
    },
    async serviceWorkerMessage (event) {
      if (event.data.meta === 'workbox-broadcast-update') {
        const { cacheName, updatedURL } = event.data.payload

        if (cacheName === 'gh-projects') {
          console.log('gh-projects broadcast update!')
          const cache = await caches.open(cacheName)
          const updatedResponse = await cache.match(updatedURL, { ignoreVary: true, ignoreSearch: true })
          this.githubRepos = await updatedResponse.json()
        }
      }
    }
  }
}
</script>

<style lang="scss">
div.scroll {
  /* width */
  &::-webkit-scrollbar {
    width: 20px;
    height: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(black, .5);
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(white, .5);
    border-radius: 10px;
  }
}

@media (min-width: 1705px) {
  .live-indicator {
    margin: -.6rem 0
  }
}
@media (min-width: 640px) and (max-width: 1024px) {
  .gh-wrapper {
    max-width: calc(100vw - 166.64px - 32px);
  }
}
</style>
