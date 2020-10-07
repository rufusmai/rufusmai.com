<template>
  <div class="inline">
    <h1>
      {{ $t('me') }} {{ $t(currentUtil.language ? 'develop' : 'use') }}
      <span ref="util" class="magic-text bg-gradient-to-r bg-clip-text text-transparent" :class="bgUtilClasses">
        {{ currentUtil.name }}
      </span>
      <br>
      <span v-if="currentFramework">
        {{ $t('and') }}
        <a
          ref="framework"
          class="magic-text framework-link bg-gradient-to-r bg-clip-text text-transparent"
          target="_blank"
          :class="bgFrameworkClasses"
          :href="currentFramework.url"
        >
          {{ currentFramework.name }}
          <ExternalLinkIcon class="link-icon opacity-0 transition-opacity duration-300 ease-in-out inline w-6 h-6 md:w-12 h-12 sm:-ml-1 md:-ml-2 -mt-2" :class="`text-${currentFramework.colors[0]}-300`" />
        </a>
      </span>
    </h1>
  </div>
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
          colors: ['orange', 'red'],
          language: true,
          frameworks: null
        },
        {
          name: 'Javascript',
          colors: ['yellow', 'yellow'],
          language: true,
          frameworks: [
            {
              name: 'Vue.js',
              url: 'https://vuejs.org/',
              colors: ['green', 'green']
            },
            {
              name: 'React',
              url: 'https://reactjs.org/',
              colors: ['blue', 'blue']
            },
            {
              name: 'JQuery',
              url: 'https://jquery.com/',
              colors: ['blue', 'teal']
            },
            {
              name: 'NodeJS',
              url: 'https://nodejs.org/',
              colors: ['green', 'green']
            }
          ]
        },
        {
          name: 'CSS',
          colors: ['blue', 'indigo'],
          language: true,
          frameworks: [
            {
              name: 'Sass',
              url: 'https://sass-lang.com/',
              colors: ['red', 'pink']
            },
            {
              name: 'Bootstrap',
              url: 'https://getbootstrap.com/',
              colors: ['purple', 'indigo']
            },
            {
              name: 'Tailwind',
              url: 'https://tailwindcss.com/',
              colors: ['teal', 'teal']
            }
          ]
        },
        {
          name: 'PHP',
          colors: ['indigo', 'purple'],
          language: true,
          frameworks: [
            {
              name: 'Laravel',
              url: 'https://laravel.com/',
              colors: ['red', 'red']
            }
          ]
        },
        {
          name: 'Java',
          colors: ['red', 'blue'],
          language: true,
          frameworks: [
            {
              name: 'Netty',
              url: 'https://netty.io/',
              colors: ['gray', 'blue']
            },
            {
              name: 'Spigot API',
              url: 'https://www.spigotmc.org/',
              colors: ['orange', 'gray']
            }
          ]
        },
        {
          name: 'MySQL',
          colors: ['blue', 'orange'],
          language: false,
          frameworks: null
        },
        {
          name: 'MongoDB',
          colors: ['green', 'green'],
          language: false,
          frameworks: null
        },
        {
          name: 'Git',
          colors: ['orange', 'red'],
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
          classes.push(`from-${color}-400`)
        } else if (i <= target.length - 1) {
          classes.push(`via-${color}-600`)
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
            this.$refs.util.classList.remove('fade-out')
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
