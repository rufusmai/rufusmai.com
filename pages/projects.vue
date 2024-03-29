<template>
  <div class="content-wrapper block h-full mx-auto w-full">
    <div class="pb-2 space-y-8 md:space-y-0 md:flex flex-wrap gap-8">
      <Project
        v-for="(project, id) in projects"
        :key="id"
        :project="project"
        :color="colors[id % colors.length]"
      />
    </div>

    <div class="text-center md:text-left">
      <h1 class="font-bold mt-4 text-4xl">
        {{ $t('githubProjects') }}
      </h1>
      <div v-if="$fetchState.pending" class="mt-4 pb-4 space-y-8 md:space-y-0 md:space-x-4 md:flex flex-row flex-no-wrap md:overflow-x-auto scroll">
        <div v-for="(el, i) in new Array(5).fill(null)" :key="i" class="h-32 w-64 bg-gray-300 dark:bg-gray-600 bg-opacity-75 rounded-lg animate-pulse" />
      </div>
      <div v-else class="w-full mt-4 pb-2 space-y-8 md:space-y-0 md:flex flex-wrap gap-4">
        <GithubRepo
          v-for="repo in githubRepos"
          :key="repo.id"
          :repo="repo"
        />
      </div>
      <div v-if="githubRepos.length > 0" class="flex items-center justify-center md:justify-start text-gray-500 dark:text-gray-400">
        <span class="relative inline-flex h-2 w-2 mr-2 mt-0.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 dark:bg-green-300" />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-300 dark:bg-green-300" />
        </span>
        {{ $t('liveFrom') }} <GithubLogo class="mx-1 inline-block h-4 w-4" /> API
      </div>
    </div>
  </div>
</template>

<script>
import Project from '../components/projects/project/Project'
import GithubRepo from '../components/projects/GithubRepo'
import GithubLogo from '../components/icons/GithubLogo'

const visibleRepos = ['mcone-networkmanager', 'mcone-cloud', 'mcone-coresystem', 'rufusmai.com', 'joycon-controller', 'lumen-vue-cli', 'prompt', 'tailpress']
const repoFilter = repo => !repo.archived && visibleRepos.includes(repo.name)
const githubFetchConfig = {
  headers: {
    accept: 'application/vnd.github.v3+json'
  },
  transformRequest: (data, headers) => {
    delete headers.common.Authorization
    delete headers.Authorization
  }
}

export default {
  name: 'Projects',
  components: { GithubRepo, Project, GithubLogo },
  async fetch () {
    this.githubRepos = await this.$axios.$get('https://api.github.com/users/rufusmai/repos', githubFetchConfig)
      .then(repos => repos.filter(repoFilter))

    this.$axios.$get('https://api.github.com/users/mconeeu/repos', githubFetchConfig)
      .then(repos => repos.map(repo => ({ ...repo, name: `mcone-${repo.name}` })).filter(repoFilter))
      .then(repos => this.githubRepos.push(...repos))
  },
  fetchOnServer: false,
  async asyncData ({ $content }) {
    const projects = await $content('projects')
      .where({ visible: true })
      .sortBy('sort')
      .only(['title', 'subtitle', 'links', 'logo', 'img', 'tags', 'de', 'en'])
      .fetch()

    return {
      projects
    }
  },
  data () {
    return {
      timer: null,
      imgLoading: {},
      colors: ['purple', 'fuchsia', 'pink'],
      githubRepos: []
    }
  },
  mounted () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', this.serviceWorkerMessage)
    }

    if (process.env.NODE_ENV === 'production') {
      this.timer = setInterval(() => this.fetchGithubRepos(), 120000)
    }
  },
  beforeDestroy () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.removeEventListener('message', this.serviceWorkerMessage)
    }

    clearInterval(this.timer)
  },
  methods: {
    async serviceWorkerMessage (event) {
      if (event.data.meta === 'workbox-broadcast-update') {
        const { cacheName, updatedURL } = event.data.payload

        if (cacheName === 'gh-projects') {
          // eslint-disable-next-line no-console
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
