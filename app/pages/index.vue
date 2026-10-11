<template>
  <div class="content-wrapper w-full mx-auto">
    <ClientOnly>
      <div class="hidden xl:block">
        <img class="absolute inset-y-1/2 transform -translate-y-1/2 right-0 max-h-full" src="../assets/img/gradient-hello-400.png" alt="Blurry image background">
        <img class="absolute inset-y-1/2 transform -translate-y-1/2 right-0 h-96 max-h-full opacity-90 dark:opacity-75" src="../assets/img/hello.png" alt="Winking avatar of me">
      </div>
    </ClientOnly>

    <div class="flex relative z-20 h-full">
      <div class="text-center flex-none w-full sm:w-auto sm:text-left font-bold">
        <h1 class="leading-heading tracking-tight sm:tracking-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          Freelance<br>
          Full-Stack<br>
          Engineer
        </h1>
        <ul class="text-gray-600 dark:text-gray-400 mt-6 md:mt-8 lg:mt-12 text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
          <li class="flex justify-center items-center sm:justify-start flex-row mt-3 md:mt-4">
            <MapPinIcon class="h-4 w-4 xs:h-6 xs:w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 mr-2 md:mr-5" />
            <h2>{{ $t('location') }}</h2>
          </li>
          <li class="flex justify-center items-center sm:justify-start flex-row mt-3 md:mt-4">
            <BriefcaseIcon class="h-4 w-4 xs:h-6 xs:w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 mr-2 md:mr-5" />
            <h2>{{ $t('founded') }}</h2>
          </li>
          <li class="flex justify-center items-center sm:justify-start flex-row mt-3 md:mt-4">
            <RectangleGroupIcon class="h-4 w-4 xs:h-6 xs:w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 mr-2 md:mr-5" />
            <h2>
              <nuxt-link to="/services">
                {{ $t('offer') }}
              </nuxt-link>
            </h2>
          </li>
          <li class="flex justify-center sm:justify-start flex-row mt-3 md:mt-4 min-h">
            <CodeBracketIcon class="h-4 w-4 mt-2 xs:mt-3 xs:h-6 xs:w-6 sm:mt-1 sm:h-8 sm:w-8 lg:mt-0 lg:h-12 lg:w-12 mr-2 md:mr-5" />
            <KnowledgeHeader class="shrink" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { CodeBracketIcon, BriefcaseIcon, RectangleGroupIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import KnowledgeHeader from '../components/index/KnowledgeHeader.vue'

export default {
  name: 'Index',
  components: { KnowledgeHeader, CodeBracketIcon, BriefcaseIcon, RectangleGroupIcon, MapPinIcon }
}
</script>
