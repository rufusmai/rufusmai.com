<template>
  <div class="404">
    <back-button hide-name/>
    <fai :icon="['far', 'times-circle']" size="5x" class="text-secondary mt-2"/>
    <h3 class="mt-4">Seite nicht gefunden</h3>
  </div>
</template>

<script>
  import BackButton from '../components/BackButton'

  export default {
    name: '404',
    components: {
      'back-button': BackButton
    }
  }
</script>
