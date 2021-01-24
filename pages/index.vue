<template>
  <div class="content-wrapper w-full mx-auto">
    <div class="flex h-full">
      <div class="text-center flex-none w-full sm:w-auto sm:text-left font-bold">
        <h1 class="text-5xl leading-tight xs:text-6xl hero">
          Java- {{ $t('and') }}<br>
          Web<wbr>{{ $t('developer') }}
        </h1>
        <ul class="text-gray-400 mt-4 text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
          <li class="flex justify-center items-center sm:justify-start flex-row mt-3 md:mt-4">
            <LocationMarkerIcon class="h-4 w-4 xs:h-6 xs:w-6 md:h-8 md:w-8 lg:h-12 lg:w-12 mr-2 md:mr-5" />
            <h2>{{ $t('location') }}</h2>
          </li>
          <li class="flex justify-center items-center sm:justify-start flex-row mt-3 md:mt-4">
            <BriefcaseIcon class="h-4 w-4 xs:h-6 xs:w-6 md:h-8 md:w-8 lg:h-12 lg:w-12 mr-2 md:mr-5" />
            <h2>{{ $t('student') }}</h2>
          </li>
          <li class="flex justify-center items-center sm:justify-start flex-row mt-3 md:mt-4">
            <CakeIcon class="h-4 w-4 xs:h-6 xs:w-6 md:h-8 md:w-8 lg:h-12 lg:w-12 mr-2 md:mr-5" />
            <h2>{{ age }} {{ $t('age') }}</h2>
          </li>
          <li class="flex justify-center sm:justify-start flex-row mt-3 md:mt-4 min-h">
            <CodeIcon class="h-4 w-4 mt-2 xs:mt-3 xs:h-6 xs:w-6 md:mt-1 md:h-8 md:w-8 lg:mt-0 lg:h-12 lg:w-12 mr-2 md:mr-5" />
            <KnowledgeHeader class="flex-shrink" />
          </li>
        </ul>
        <nuxt-link
          to="/projects"
          class="mt-8 inline-flex items-center text-gray-300 font-semibold text-3xl px-4 py-3 border border-gray-500 shadow-sm rounded-lg bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Projekte
          <ArrowRightIcon size="30" class="ml-2" />
        </nuxt-link>
      </div>
      <div class="flex-grow flex lg:items-center justify-center">

      </div>
    </div>
  </div>
</template>

<script>
import { CodeIcon, CakeIcon, BriefcaseIcon, LocationMarkerIcon, ArrowRightIcon } from '@vue-hero-icons/outline'
import KnowledgeHeader from '../components/KnowledgeHeader'

export default {
  name: 'Index',
  components: { KnowledgeHeader, CodeIcon, CakeIcon, BriefcaseIcon, LocationMarkerIcon, ArrowRightIcon },
  computed: {
    age () {
      const birthday = +new Date('10/09/2000')
      return ~~((Date.now() - birthday) / (24 * 3600 * 365.25 * 1000))
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .hero {
    font-size: 6rem;
    line-height: 1.2;
  }
}

.profile {
  transform: translate(-50%, -50%);
}

li:hover .tooltip {
  display: block;
  opacity: 1;
}

.tooltip .tooltip::after {
  content: " ";
  position: absolute;
  bottom: 100%; /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}
</style>
