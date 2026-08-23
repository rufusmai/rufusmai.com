<template>
  <NuxtLayout>
    <div class="container sm:-ml-10 w-full">
      <div class="max-w-xl mx-auto text-center">
        <ExclamationTriangleIcon class="error-icon mx-auto opacity-25 max-w-full w-[300px] h-[300px]" />
        <h1 class="font-bold text-3xl -mt-5 sm:m-0 sm:text-5xl">
          {{ $t(message) }}
        </h1>

        <div class="mt-6 sm:mt-10 inline-block">
          <BaseButton to="/" @click="clear">
            <HomeIcon class="h-6 w-6 mr-2" />
            {{ $t('backToHome') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/vue/24/outline'
import BaseButton from './components/Button.vue'

export default {
  components: { BaseButton, ExclamationTriangleIcon, HomeIcon },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    message () {
      return this.error?.statusCode === 404 ? 'pageNotFound' : 'errorOccurred'
    }
  },
  methods: {
    clear () {
      clearError({ redirect: '/' })
    }
  }
}
</script>

<style scoped>
.error-icon path {
  stroke-width: 1 !important;
}
</style>
