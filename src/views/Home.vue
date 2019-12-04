<template>
  <div class="home text-center">
    <i18n path="home.text" tag="p" class="m-0">
      <router-link to="/projects">{{ $t('home.projects')}}</router-link>
      <wbr>
    </i18n>
  </div>
</template>

<script>
    export default {
        name: 'home'
    }
</script>
