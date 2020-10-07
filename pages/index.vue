<template>
  <div class="content-wrapper w-full mx-auto">
    <div class="flex h-full">
      <div class="text-center flex-none w-full sm:w-auto sm:text-left font-bold">
        <h1 class="text-4xl leading-tight xs:text-6xl hero">
          Java- {{ $t('and') }}<br>
          Web<wbr>{{ $t('developer') }}
        </h1>
        <ul class="text-gray-400 mt-4 text-2xl xs:text-3xl lg:text-5xl">
          <li class="flex justify-center sm:justify-start flex-row">
            <LocationMarkerIcon class="h-4 w-4 xs:h-6 xs:w-6 lg:h-12 lg:w-12 mt-2 mr-2 sm:mr-5" />
            <h2>{{ $t('location') }}</h2>
          </li>
          <li class="flex justify-center sm:justify-start flex-row">
            <CakeIcon class="h-4 w-4 xs:h-6 xs:w-6 lg:h-12 lg:w-12 mt-2 mr-2 sm:mr-5" />
            <h2>{{ age }} {{ $t('age') }}</h2>
          </li>
          <li class="flex justify-center sm:justify-start flex-row">
            <CodeIcon class="flex-none h-4 w-4 xs:h-6 xs:w-6 lg:h-12 lg:w-12 mt-2 mr-2 sm:mr-5" />
            <KnowledgeHeader class="leading-tight flex-shrink" />
          </li>
        </ul>
        <nuxt-link
          to="/projects"
          class="inline-block rounded-lg transition duration-300 ease-in-out bg-gray-400 hover:bg-gray-500 mt-6 text-xl xs:text-2xl lg:text-3xl font-bold bg-opacity-25 hover:bg-opacity-25 px-4 py-3"
        >
          Projekte
          <ArrowRightIcon size="30" class="inline -mt-1" />
        </nuxt-link>
      </div>
      <div class="flex-grow flex lg:items-center justify-center">

      </div>
    </div>
  </div>
</template>

<script>
import { CodeIcon, CakeIcon, LocationMarkerIcon, ArrowRightIcon } from '@vue-hero-icons/outline'
import KnowledgeHeader from '../components/KnowledgeHeader'

export default {
  name: 'Index',
  components: { KnowledgeHeader, CodeIcon, CakeIcon, LocationMarkerIcon, ArrowRightIcon },
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
