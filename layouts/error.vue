<template>
  <div class="container sm:-ml-10 w-full">
    <div class="max-w-xl mx-auto text-center">
      <ExclamationIcon class="error-icon mx-auto opacity-25 max-w-full" size="300" />
      <h1 class="font-bold text-3xl -mt-5 sm:m-0 sm:text-5xl">
        {{ $t(message) }}
      </h1>

      <div class="mt-6 sm:mt-10 inline-block">
        <Button to="/">
          <HomeIcon class="mr-2" />
          {{ $t('backToHome') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { ExclamationIcon, HomeIcon } from '@vue-hero-icons/outline'
import Button from '../components/Button'

export default {
  components: { Button, ExclamationIcon, HomeIcon },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  layout: 'default',
  computed: {
    message () {
      return this.error.statusCode === 404 ? 'pageNotFound' : 'errorOccurred'
    }
  }
}
</script>

<style scoped>
.error-icon path {
  stroke-width: 1 !important;
}
</style>
