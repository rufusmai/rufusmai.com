<template>
  <div class="box-border h-full w-full text-white">
    <Background :colors="colors" />

    <client-only>
      <notifications group="main" position="bottom right" classes="rounded-lg mb-2 mx-2 p-3 text-gray-300 notification" />
    </client-only>

    <div class="relative flex flex-col z-20 h-full">
      <header class="p-3 sm:p-4 w-full flex-none flex">
        <nuxt-link class="mr-4" to="/">
          <img src="../assets/img/avatar.svg" alt="Avatar" class="avatar h-12 w-12 bg-gray-100 bg-opacity-50 relative rounded-lg z-20">
        </nuxt-link>
        <div class="animation-translate h-8 w-8 bg-gray-300 bg-opacity-50 absolute rounded-md mt-2" />
        <div class="animation-translate animation-reverse h-8 w-8 bg-gray-100 bg-opacity-50 absolute rounded-md ml-4 -mt-1" />
        <div class="animation-translate animation-reverse h-6 w-6 bg-gray-500 bg-opacity-50 absolute rounded-md ml-6 mt-8" />

        <h1 class="font-bold leading-none text-2xl sm:-mt-1 xs:text-3xl sm:text-4xl">
          Rufus Maiwald<br>
          <small class="text-gray-500 mt-2 leading-none absolute text-base sm:text-lg">
            Java- {{ $t('and') }} Web<wbr>{{ $t('developer') }}
          </small>
        </h1>

        <div class="ml-auto">
          <button v-if="avatar" class="focus:outline-none">
            <img :src="avatar" alt="Avatar" class="h-10 w-10 inline-block rounded-lg border-2 border-white border-opacity-50">
            <ChevronDownIcon class="hidden xs:inline" size="20" />
          </button>
          <button
            class="p-3 transition duration-75 relative ease-in-out z-50 sm:hidden bg-transparent sm:bg-gray-800 my-auto mt-1 rounded-lg focus:outline-none"
            aria-label="Collapse Menu"
            @click="menuOpened = !menuOpened"
          >
            <MenuLink :open="menuOpened" />
          </button>
        </div>
      </header>

      <div class="flex-grow flex flex-row xl:relative">
        <div :class="menuOpened ? '' : 'pointer-events-none'" class="nav-wrapper flex-none p-2 absolute z-20 w-full h-screen top-0 sm:relative sm:w-auto sm:h-auto sm:pointer-events-auto sm:p-0">
          <button class="absolute sm:hidden inset-0 h-full w-full transition duration-300 ease-in-out cursor-default bg-opacity-25" :class="menuOpened ? 'bg-black' : ''" aria-label="Close Menu" @click="menuOpened = false" />
          <nav
            :class="menuOpened ? '' : 'opacity-0'"
            class="transition-opacity relative rounded-lg duration-300 z-40 ease-in-out flex-col place-content-between w-full p-4 bg-black sm:w-auto sm:h-full sm:pointer-events-auto sm:bg-transparent sm:flex sm:opacity-100"
          >
            <ul class="p-3 inline-block self-start transition duration-500 ease-in-out bg-gray-600 hover:bg-gray-500 bg-opacity-25 hover:bg-opacity-25 space-x-3 rounded-lg">
              <li v-for="link in socialMedia" :key="link.name" class="inline">
                <a :href="link.url" target="_blank" rel="noopener" :aria-label="link.name">
                  <fai :icon="link.icon" size="lg" />
                </a>
              </li>
            </ul>

            <div class="font-bold leading-relaxed text-3xl mt-2">
              <ul>
                <li v-for="link in navigation" :key="link.name">
                  <NavLink :name="$t(link.name)" :url="link.url" :colors="link.colors" :active="$nuxt.$route.name === link.page" @click.native="menuOpened = false" />
                </li>
                <client-only>
                  <transition name="install">
                    <li v-if="installPrompt" class="hover:text-gray-500 transition duration-300 ease-in-out">
                      <NavLink :name="$t('install')" :colors="['gray', 'gray', 'gray']" class="inline-block" @click.native="installPwa" />
                    </li>
                  </transition>
                </client-only>
              </ul>
            </div>

            <div class="mt-auto pt-2">
              <LanguageChoose />
            </div>
          </nav>
        </div>

        <div class="wrapper inline-block flex-grow h-full p-2 sm:p-4">
          <div class="flex h-full flex-col justify-between">
            <Nuxt />

            <client-only>
              <footer class="text-center text-gray-500 xs:p-2 mt-4">
                <i18n path="developedWith" tag="span">
                  <a href="https://nuxtjs.org/" target="_blank" rel="noopener" aria-label="Nuxt.js">
                    <NuxtLogo class="w-4 h-4 inline" />
                  </a>
                  <a href="https://tailwindcss.com/" target="_blank" rel="noopener" aria-label="TailwindCSS">
                    <TailwindcssLogo class="w-4 h-4 inline" />
                  </a>
                  <span class="text-red-500">&hearts;</span>
                </i18n>

                <i18n path="viewOnGithub" tag="a" class="text-gray-400 hover:text-gray-300 transition duration-300 ease-in-out" href="https://github.com/rufusmaiwald/rufusmaiwald.de" target="_blank" rel="noopener">
                  <fai :icon="['fab', 'github']" />
                </i18n>
              </footer>
            </client-only>
          </div>
        </div>
      </div>
    </div>

    <footer />
  </div>
</template>

<script>
import { ChevronDownIcon } from '@vue-hero-icons/outline'
import MenuLink from '../components/MenuLink'
import NavLink from '../components/NavLink'
import Background from '../components/Background'
import LanguageChoose from '../components/LanguageChoose'
import NuxtLogo from '../components/icons/NuxtLogo'
import TailwindcssLogo from '../components/icons/TailwindcssLogo'

export default {
  components: { TailwindcssLogo, NuxtLogo, LanguageChoose, Background, NavLink, MenuLink, ChevronDownIcon },
  data () {
    return {
      menuOpened: false,
      installPrompt: null,
      navigation: [
        {
          name: 'home',
          page: 'index',
          url: '/',
          colors: ['teal', 'blue', 'indigo']
        },
        {
          name: 'projects',
          page: 'projects',
          url: '/projects',
          colors: ['purple', 'pink', 'red']
        },
        {
          name: 'contact',
          page: 'contact',
          url: '/contact',
          colors: ['yellow', 'orange', 'pink']
        }
      ],
      socialMedia: [
        {
          name: 'Github',
          url: 'https://github.com/rufusmaiwald',
          icon: ['fab', 'github']
        },
        {
          name: 'Spotify',
          url: 'https://www.instagram.com/rufusmaiwald',
          icon: ['fab', 'instagram']
        },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/rufus-maiwald-20832a137',
          icon: ['fab', 'linkedin']
        },
        {
          name: 'Xing',
          url: 'https://www.xing.com/profile/Rufus_Maiwald/cv',
          icon: ['fab', 'xing']
        }
      ]
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.loggedIn
    },
    avatar () {
      return this.$store.state.auth.user ? this.$store.state.auth.user.avatar : null
    },
    colors () {
      for (const route of this.navigation) {
        if (route.page === this.$nuxt.$route.name) {
          return route.colors
        }
      }

      return ['gray', 'gray', 'gray']
    }
  },
  async mounted () {
    const workbox = await window.$workbox
    if (workbox) {
      workbox.addEventListener('installed')
    }

    window.addEventListener('beforeinstallprompt', this.beforeInstall)
    await this.$store.dispatch('fetchUser')
  },
  beforeDestroy () {
    window.removeEventListener('beforeinstallprompt', this.beforeInstall)
  },
  methods: {
    beforeInstall (e) {
      this.installPrompt = e
      e.preventDefault()
    },
    installPwa () {
      this.installPrompt.prompt()
      this.installPrompt.userChoice.then((result) => {
        this.$notify({
          group: 'main',
          title: this.$t('pwaInstallation') + ' ' + this.$t(result.outcome === 'accepted' ? 'success' : 'cancel'),
          duration: 5000
        })

        if (result.outcome === 'accepted') {
          this.installPrompt = null
        }
      })
    },
    pwaInstalled (event) {
      if (event.isUpdate) {
        this.$notify({
          group: 'main',
          title: this.$t('updated'),
          duration: 7000
        })
      }
    }
  },
  head () {
    return this.$nuxtI18nSeo()
  }
}
</script>

<style>
html, body, #__nuxt, #__layout {
  height: 100%;
}

.avatar {
  backdrop-filter: blur(5px);
}

.animation-translate {
  animation: translateX 20s linear infinite;
  animation-direction: alternate;
}

.animation-reverse {
  animation-direction: alternate-reverse;
}

@keyframes translateX {
  from {
    transform: translateX(0) scale(1);;
  }
  to {
    transform: translateX(-10px) scale(1.2);
  }
}

.page-enter-active, .page-leave-active {
  transition: opacity .3s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}

@media (min-width: 1024px) {
  .content-wrapper {
    max-width: calc((100vw - 166px) * .9);
  }
}

.notification {
  background: rgba(0, 0, 0, .5) !important;
}

.install-enter-active, .install-leave-active {
  transition: opacity .5s;
}
.install-enter, .install-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
