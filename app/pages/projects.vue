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
      <div v-if="pending" class="mt-4 pb-4 space-y-8 md:space-y-0 md:space-x-4 md:flex flex-row flex-nowrap md:overflow-x-auto scroll">
        <div v-for="(el, i) in new Array(5).fill(null)" :key="i" class="h-32 w-64 bg-gray-300/75 dark:bg-gray-600/75 rounded-lg animate-pulse" />
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

<script setup>
import GithubLogo from '../components/icons/GithubLogo.vue'
import GithubRepo from '../components/projects/GithubRepo.vue'
import Project from '../components/projects/project/Project.vue'

const visibleRepos = ['mcone-networkmanager', 'mcone-cloud', 'mcone-coresystem', 'rufusmai.com', 'joycon-controller', 'lumen-vue-cli', 'prompt', 'tailpress']
const repoFilter = repo => !repo.archived && visibleRepos.includes(repo.name)
const githubHeaders = { accept: 'application/vnd.github.v3+json' }

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects')
    .where('visible', '=', true)
    .order('sort', 'ASC')
    .select('title', 'subtitle', 'links', 'logo', 'img', 'tags', 'de', 'en')
    .all(),
{ default: () => [] })

const colors = ['purple', 'fuchsia', 'pink']
const githubRepos = ref([])
const pending = ref(true)
let timer = null

async function fetchGithubRepos () {
  const [own, mcone] = await Promise.all([
    $fetch('https://api.github.com/users/rufusmai/repos', { headers: githubHeaders }),
    $fetch('https://api.github.com/users/mconeeu/repos', { headers: githubHeaders })
  ])

  githubRepos.value = [
    ...own.filter(repoFilter),
    ...mcone.map(repo => ({ ...repo, name: `mcone-${repo.name}` })).filter(repoFilter)
  ]
  pending.value = false
}

async function serviceWorkerMessage (event) {
  if (event.data.meta === 'workbox-broadcast-update') {
    const { cacheName, updatedURL } = event.data.payload

    if (cacheName === 'gh-projects') {
      const cache = await caches.open(cacheName)
      const updatedResponse = await cache.match(updatedURL, { ignoreVary: true, ignoreSearch: true })
      const repos = await updatedResponse.json()
      githubRepos.value = repos.filter(repoFilter)
    }
  }
}

onMounted(() => {
  // Client-only, matching the old `fetchOnServer: false`.
  fetchGithubRepos()

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', serviceWorkerMessage)
  }

  if (import.meta.env.PROD) {
    timer = setInterval(() => fetchGithubRepos(), 120000)
  }
})

onBeforeUnmount(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.removeEventListener('message', serviceWorkerMessage)
  }

  clearInterval(timer)
})
</script>
