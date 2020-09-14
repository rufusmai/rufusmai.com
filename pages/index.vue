<template>
  <div class="grid grid-cols-1 lg:grid-cols-5">
    <div class="col-span-3 sm:px-10 flex justify-center items-center h-40 sm:h-auto text-center">
      <KnowledgeHeader />
    </div>
    <div class="col-span-2 relative text-center p-3 mt-10 lg:mt-0 lg:ml-6">
      <article class="relative inline-block text-left max-w-sm sm:max-w-none bg-gray-600 bg-opacity-50 rounded-lg p-3">
        <img src="@/assets/img/profile.jpg" alt="profile" class="profile rounded-full border-2 border-white absolute h-16 w-16">

        <header class="ml-10">
          <h2 class="text-2xl mb-2 font-bold">
            {{ $t('profile') }}
          </h2>

          <ul class="text-gray-400 mb-1 leading-7">
            <li class="inline-block relative mr-2">
              <BriefcaseIcon size="18" class="inline" />
              {{ $t('student') }}

              <div class="tooltip absolute hidden opacity-0 transition-opacity duration-300 ease-in-out rounded p-3 text-black bg-gray-200">
                LMU München
              </div>
            </li>
            <li class="inline-block mr-2">
              <CakeIcon size="18" class="inline" /> {{ age }} {{ $t('age') }}
            </li>
            <li class="inline-block mr-2">
              <LocationMarkerIcon size="18" class="inline" /> {{ $t('location') }}
            </li>
          </ul>
        </header>
      </article>
    </div>
  </div>
</template>

<script>
import { BriefcaseIcon, CakeIcon, LocationMarkerIcon } from '@vue-hero-icons/outline'
import KnowledgeHeader from '../components/KnowledgeHeader'

export default {
  name: 'Index',
  components: { KnowledgeHeader, BriefcaseIcon, CakeIcon, LocationMarkerIcon },
  computed: {
    age () {
      const birthday = +new Date('10/09/2000')
      return ~~((Date.now() - birthday) / (24 * 3600 * 365.25 * 1000))
    }
  }
}
</script>

<style>
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
  bottom: 100%;  /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}
</style>
