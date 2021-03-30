<template>
  <ul class="p-3 inline-block self-start space-x-3 bg-white dark:bg-gray-800 bg-opacity-75 border border-gray-400 dark:border-gray-500 border-opacity-75 hover:border-opacity-100 rounded-lg transition duration-200 ease-in-out">
    <li v-for="link in socialMedia" :key="link.name" class="inline">
      <a :href="link.url" target="_blank" rel="noopener" :aria-label="link.name">
        <fai :icon="link.icon" size="lg" />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SocialMedia',
  data () {
    return {
      socialMedia: [
        {
          name: 'Github',
          url: 'https://github.com/rufusmai',
          icon: ['fab', 'github']
        },
        {
          name: 'Twitter',
          url: 'https://twitter.com/rufusmai',
          icon: ['fab', 'twitter']
        },
        {
          name: 'Instagram',
          url: 'https://www.instagram.com/rufusmaiwald',
          icon: ['fab', 'instagram']
        },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/rufus-maiwald-20832a137',
          icon: ['fab', 'linkedin']
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
