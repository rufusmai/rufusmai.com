<template>
  <div class="container sm:-ml-10 w-full">
    <div class="max-w-xl mx-auto text-center">
      <LockOpenIcon class="login-icon mx-auto opacity-25 max-w-full" size="300" />
      <h1 class="font-bold text-3xl -mt-5 sm:m-0 sm:text-5xl">
        {{ $t('loggingIn') }}...
      </h1>
    </div>
  </div>
</template>

<script>
import { LockOpenIcon } from '@vue-hero-icons/outline'

export default {
  name: 'Login',
  components: { LockOpenIcon },
  mounted () {
    this.$router.push('/')
  }
}
</script>

<style scoped>
.login-icon path {
  stroke-width: 1 !important;
}
</style>
