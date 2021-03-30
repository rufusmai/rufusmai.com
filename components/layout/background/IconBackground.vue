<template>
  <div class="absolute z-10 overflow-hidden inset-0">
    <div class="fixed -right-64 sm:-right-96 md:-right-80 lg:-right-40 xl:right-0 h-screen transform rotate-12">
      <div class="animate-bg">
        <BackgroundSvg v-for="i in 4" :key="i" width="800" height="600" :silent="$route.name === 'projects'" />
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundSvg from './BackgroundSvg'

export default {
  name: 'IconBackground',
  components: { BackgroundSvg }
}
</script>
