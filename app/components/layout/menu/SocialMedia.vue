<template>
  <ul class="p-3 inline-block self-start space-x-3 bg-white/75 dark:bg-gray-800/75 border border-gray-400/75 dark:border-gray-500/75 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg transition duration-200 ease-in-out">
    <li v-for="link in socialMedia" :key="link.name" class="inline-block">
      <a :href="link.url" target="_blank" rel="noopener" :aria-label="link.name">
        <component :is="link.icon" class="inline-block h-6 w-6" />
      </a>
    </li>
  </ul>
</template>

<script>
import GithubLogo from '../../icons/GithubLogo.vue'
import TwitterLogo from '../../icons/TwitterLogo.vue'
import InstagramLogo from '../../icons/InstagramLogo.vue'
import LinkedInLogo from '../../icons/LinkedInLogo.vue'

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
          url: 'https://www.linkedin.com/in/rufus-maiwald',
          icon: LinkedInLogo
        }
      ]
    }
  }
}
</script>
