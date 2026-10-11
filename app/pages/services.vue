<template>
  <div class="content-wrapper block h-full mx-auto w-full">
    <div class="max-w-4xl text-center md:text-left">
      <h1 class="font-bold text-4xl">
        {{ $t('servicesTitle') }}
      </h1>
      <p class="mt-2 font-semibold text-gray-500 dark:text-gray-400">
        {{ $t('servicesIntro') }}
      </p>

      <ul class="mt-6 grid gap-4 md:grid-cols-2 text-left">
        <li
          v-for="service in services"
          :key="service.key"
          class="relative z-20 p-5 rounded-lg bg-white/75 dark:bg-gray-800/75 border border-gray-400/75 dark:border-gray-500/75"
        >
          <component :is="service.icon" class="h-8 w-8" :style="{color: iconColor(service.color)}" />
          <h2 class="mt-3 font-bold text-2xl">
            {{ $t(`services.${service.key}.title`) }}
          </h2>
          <p class="mt-1 font-semibold text-gray-500 dark:text-gray-400">
            {{ $t(`services.${service.key}.text`) }}
          </p>
        </li>
      </ul>

      <p class="mt-6 font-semibold text-gray-500 dark:text-gray-400">
        <SparklesIcon class="inline h-5 w-5 -mt-1 mr-1" />
        {{ $t('servicesAi') }}
      </p>

      <div class="mt-6 inline-block">
        <BaseButton to="/contact" class="text-xl">
          <ChatBubbleLeftEllipsisIcon class="h-5 w-5 mr-2" />
          {{ $t('servicesCta') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChatBubbleLeftEllipsisIcon,
  ClipboardDocumentCheckIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ServerStackIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'
import BaseButton from '../components/Button.vue'
import colorTheme from '../utils/colors'

export default {
  name: 'ServicesPage',
  components: { BaseButton, ChatBubbleLeftEllipsisIcon, SparklesIcon },
  data () {
    return {
      services: [
        { key: 'websites', icon: GlobeAltIcon, color: 'green' },
        { key: 'apps', icon: DevicePhoneMobileIcon, color: 'teal' },
        { key: 'backend', icon: ServerStackIcon, color: 'blue' },
        { key: 'portal', icon: ClipboardDocumentCheckIcon, color: 'indigo' }
      ]
    }
  },
  methods: {
    iconColor (color) {
      return colorTheme[color][this.$colorMode.value === 'light' ? 600 : 400]
    }
  }
}
</script>
