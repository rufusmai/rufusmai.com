<template>
  <div class="mx-auto w-full lg:w-auto max-w-sm md:m-0">
    <div class="flex flex-col h-full rounded-lg px-4 py-2 bg-white backdrop-blur dark:bg-gray-600 bg-opacity-50 dark:bg-opacity-50 border border-gray-400 dark:border-gray-500 hover:border-gray-500 dark:hover:border-gray-400 transition duration-200 ease-in-out">
      <div class="mb-2">
        <h2 class="font-semibold text-2xl">
          {{ repo.name }}
        </h2>
        <p class="text-gray-400 dark:text-gray-300">
          {{ repo.description }}
        </p>
      </div>
      <div class="mt-auto space-x-3 font-semibold">
        <a :href="repo.html_url" target="_blank" rel="noopener" class="hover:text-gray-500 dark:hover:text-gray-200 transition duration-300 ease-in-out">
          <fai :icon="['fab', 'github']" />
          <span>Github</span>
        </a>
        <nuxt-link v-if="repo.name === 'rufusmai.com'" to="/" class="hover:text-gray-500 dark:hover:text-gray-200 transition duration-300 ease-in-out">
          <HomeIcon size="16" class="inline -mt-1" />
          <span>{{ $t('startPage') }}</span>
        </nuxt-link>
        <a v-else-if="repo.homepage" :href="repo.homepage" target="_blank" rel="noopener" class="hover:text-gray-500 dark:hover:text-gray-200 transition duration-300 ease-in-out">
          <span>Homepage</span>
          <ExternalLinkIcon size="16" class="inline -mt-0.5" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ExternalLinkIcon, HomeIcon } from '@vue-hero-icons/outline'

export default {
  name: 'GithubRepo',
  components: { ExternalLinkIcon, HomeIcon },
  props: {
    repo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>

</style>
