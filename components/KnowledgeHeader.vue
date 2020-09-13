<template>
  <h1 class="font-bold text-4xl md:text-5xl">
    {{ $t('me') }} {{ $t(currentUtil.language ? 'develop' : 'use') }}
    <span ref="util" class="magic-text fade-in bg-gradient-to-r bg-clip-text text-transparent" :class="bgUtilClasses">
      {{ currentUtil.name }}
    </span>
    <br>
    <span v-if="currentFramework">
      {{ $t('with') }}
      <a
        ref="framework"
        class="magic-text framework-link fade-in bg-gradient-to-r bg-clip-text text-transparent"
        target="_blank"
        :class="bgFrameworkClasses"
        :href="currentFramework.url"
      >
        {{ currentFramework.name }}
        <ExternalLinkIcon class="link-icon opacity-0 transition-opacity duration-300 ease-in-out inline -ml-2 -mt-2" :class="`text-${currentFramework.colors[0]}`" size="40" />
      </a>
    </span>
  </h1>
</template>

<script>
import { ExternalLinkIcon } from '@vue-hero-icons/outline'

export default {
  name: 'KnowledgeHeader',
  components: { ExternalLinkIcon },
  data () {
    return {
      timer: null,
      currentUtilIndex: 0,
      currentFrameworkIndex: 0,
      utilities: [
        {
          name: 'HTML',
          colors: ['orange-500', 'red-500'],
          language: true,
          frameworks: null
        },
        {
          name: 'Javascript',
          colors: ['yellow-400', 'yellow-500'],
          language: true,
          frameworks: [
            {
              name: 'Vue.js',
              url: 'https://vuejs.org/',
              colors: ['green-600', 'green-800']
            },
            {
              name: 'React',
              url: 'https://reactjs.org/',
              colors: ['blue-300', 'blue-500']
            },
            {
              name: 'JQuery',
              url: 'https://jquery.com/',
              colors: ['blue-800', 'teal-700']
            },
            {
              name: 'NodeJS',
              url: 'https://nodejs.org/',
              colors: ['green-500', 'green-900']
            }
          ]
        },
        {
          name: 'CSS',
          colors: ['blue-500', 'indigo-500'],
          language: true,
          frameworks: [
            {
              name: 'Sass',
              url: 'https://sass-lang.com/',
              colors: ['red-300', 'pink-500']
            },
            {
              name: 'Bootstrap',
              url: 'https://getbootstrap.com/',
              colors: ['purple-300', 'indigo-500']
            },
            {
              name: 'Tailwind',
              url: 'https://tailwindcss.com/',
              colors: ['teal-300', 'teal-700']
            }
          ]
        },
        {
          name: 'PHP',
          colors: ['indigo-500', 'purple-500'],
          language: true,
          frameworks: [
            {
              name: 'Laravel',
              url: 'https://laravel.com/',
              colors: ['red-600', 'red-800']
            }
          ]
        },
        {
          name: 'Java',
          colors: ['red-600', 'blue-900'],
          language: true,
          frameworks: [
            {
              name: 'Netty',
              url: 'https://netty.io/',
              colors: ['gray-300', 'blue-600']
            },
            {
              name: 'Spigot API',
              url: 'https://www.spigotmc.org/',
              colors: ['orange-500', 'gray-600']
            }
          ]
        },
        {
          name: 'MySQL',
          colors: ['blue-500', 'orange-800'],
          language: false,
          frameworks: null
        },
        {
          name: 'MongoDB',
          colors: ['green-500', 'green-800'],
          language: false,
          frameworks: null
        },
        {
          name: 'Git',
          colors: ['orange-500', 'red-800'],
          language: false,
          frameworks: null
        }
      ]
    }
  },
  computed: {
    currentUtil () {
      return this.utilities[this.currentUtilIndex]
    },
    currentFramework () {
      return this.currentUtil.frameworks != null ? this.currentUtil.frameworks[this.currentFrameworkIndex] : null
    },
    bgUtilClasses () {
      return this.bgClasses(this.currentUtil.colors)
    },
    bgFrameworkClasses () {
      return this.bgClasses(this.currentFramework.colors)
    }
  },
  mounted () {
    this.timer = setInterval(() => this.updateText(), 5000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    bgClasses (target) {
      const classes = []

      for (let i = 0; i < target.length; i++) {
        const color = target[i]

        if (i === 0) {
          classes.push('from-' + color)
        } else if (i <= target.length - 1) {
          classes.push('via-' + color)
        } else {
          classes.push('via-transparent')
          classes.push('via-transparent')
          classes.push('via-transparent')
          classes.push('to-transparent')
        }
      }

      return classes
    },
    updateText () {
      if (this.currentUtil.frameworks == null || this.currentUtil.frameworks.length - 1 <= this.currentFrameworkIndex) {
        if (this.currentFramework) {
          this.$refs.framework.classList.add('fade-out')
          setTimeout(() => {
            this.currentFrameworkIndex = 0
          }, 1250)
        }

        this.$refs.util.classList.add('fade-out')
        setTimeout(() => {
          if (this.currentUtilIndex >= this.utilities.length - 1) {
            this.currentUtilIndex = 0
          } else {
            this.currentUtilIndex++
          }
        }, 1250)
      } else {
        this.$refs.framework.classList.add('fade-out')
        setTimeout(() => {
          this.currentFrameworkIndex++
        }, 1250)
      }
    }
  }
}
</script>

<style scoped>
.magic-text {
  opacity: 1;
  margin: 0;
  transition: background-position 1.5s ease-in-out, opacity 1.5s cubic-bezier(1,0,1,.5);
  position: relative;
  z-index: 10;
  background-size: 350%;
}
.fade-out {
  opacity: 0;
  background-position: 100%;
}
.framework-link:hover .link-icon {
  opacity: .6;
}
</style>
