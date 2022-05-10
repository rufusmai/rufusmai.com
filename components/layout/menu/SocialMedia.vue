<template>
  <ul class="p-3 inline-block self-start space-x-3 bg-white dark:bg-gray-800 bg-opacity-75 border border-gray-400 dark:border-gray-500 border-opacity-75 hover:border-opacity-100 rounded-lg transition duration-200 ease-in-out">
    <li v-for="link in socialMedia" :key="link.name" class="inline-block">
      <a :href="link.url" target="_blank" rel="noopener" :aria-label="link.name">
        <component :is="link.icon" class="inline-block h-6 w-6" />
      </a>
    </li>
  </ul>
</template>

<script>
import GithubLogo from '../../icons/GithubLogo'
import TwitterLogo from '../../icons/TwitterLogo'
import InstagramLogo from '../../icons/InstagramLogo'
import LinkedInLogo from '../../icons/LinkedInLogo'

export default {
  name: 'SocialMedia',
  data () {
    return {
      socialMedia: [
        {
          name: 'Github',
          url: 'https://github.com/rufusmai',
          icon: GithubLogo
        },
        {
          name: 'Twitter',
          url: 'https://twitter.com/rufusmai',
          icon: TwitterLogo
        },
        {
          name: 'Instagram',
          url: 'https://www.instagram.com/rufus.mai',
          icon: InstagramLogo
        },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/rufus-maiwald-20832a137',
          icon: LinkedInLogo
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
