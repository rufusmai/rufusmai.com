<template>
  <div class="back-button mb-4">
    <div v-if="this.$route.name !== 'Home'" class="back-btn text-left">
      <router-link to="/">
        <fai :icon="['fas', 'chevron-left']"/>
        Zurück
      </router-link>
      <hr>
      <h4 v-if="!hideName" class="text-center">{{ this.$route.name }}</h4>
      <slot/>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'BackButton',
        props: {
          hideName: {
              type: Boolean,
              default: false
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .back-btn > a, .back-btn > a:hover {
    color: black;
    text-decoration: none;
  }
</style>
