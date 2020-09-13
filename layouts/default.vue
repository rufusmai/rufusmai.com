<template>
  <div class="box-border h-screen w-screen text-white">
    <Background :colors="colors" />

    <div class="relative z-20 h-full">
      <header class="p-3 sm:p-4 flex">
        <nuxt-link class="mr-4" to="/">
          <img src="/avatar.svg" alt="Avatar" class="avatar h-12 w-12 bg-gray-100 bg-opacity-50 relative rounded-lg z-20">
        </nuxt-link>
        <div class="animation-translate h-8 w-8 bg-gray-300 bg-opacity-50 absolute rounded-md mt-2" />
        <div class="animation-translate animation-reverse h-8 w-8 bg-gray-100 bg-opacity-50 absolute rounded-md ml-4 -mt-1" />
        <div class="animation-translate animation-reverse h-6 w-6 bg-gray-500 bg-opacity-50 absolute rounded-md ml-6 mt-8" />

        <h1 class="font-bold leading-none text-2xl sm:text-4xl">
          Rufus Maiwald
          <br>
          <small class="text-gray-600 mt-2 leading-none absolute text-base sm:text-lg">Java- & Webentwickler</small>
        </h1>

        <button
          tabindex="-1"
          class="p-3 transition duration-75 ease-in-out z-50 sm:hidden bg-transparent sm:bg-gray-800 ml-auto my-auto mt-1 rounded-lg focus:outline-none"
          @click="menuOpened = !menuOpened"
        >
          <MenuLink :open="menuOpened" />
        </button>
      </header>

      <div class="flex flex-row xl:relative">
        <div :class="menuOpened ? '' : 'pointer-events-none'" class="nav-wrapper flex-none p-2 absolute z-20 w-full h-screen top-0 sm:relative sm:w-auto sm:h-auto sm:pointer-events-auto sm:p-0">
          <button class="absolute inset-0 h-full w-full transition duration-300 ease-in-out cursor-default bg-opacity-25" :class="menuOpened ? 'bg-black' : ''" @click="menuOpened = false" />
          <nav
            :class="menuOpened ? '' : 'opacity-0'"
            class="transition-opacity relative rounded-lg duration-300 z-40 ease-in-out w-full p-4 bg-black sm:w-auto sm:pointer-events-auto sm:bg-transparent sm:inline-block sm:opacity-100"
          >
            <ul class="p-3 inline-block transition duration-500 ease-in-out bg-gray-600 hover:bg-gray-500 bg-opacity-25 hover:bg-opacity-25 space-x-3 rounded-lg">
              <li v-for="link in socialMedia" :key="link.name" class="inline">
                <a :href="link.url" target="_blank">
                  <fai :icon="link.icon" size="lg" />
                </a>
              </li>
            </ul>

            <div class="font-bold leading-relaxed text-3xl mt-2">
              <ul>
                <li v-for="link in navigation" :key="link.name">
                  <NavLink :name="$t(link.name)" :url="link.url" :colors="link.colors" :active="$nuxt.$route.name === link.page" @click.native="menuOpened = false" />
                </li>
              </ul>
            </div>

            <div class="pt-2 sm:fixed sm:bottom-0 sm:left-0 sm:p-4">
              <LanguageChoose />
            </div>
          </nav>
        </div>

        <div class="container mx-auto flex-grow p-4">
          <Nuxt />
        </div>
      </div>
    </div>

    <footer />
  </div>
</template>

<script>
import MenuLink from '../components/MenuLink'
import NavLink from '../components/NavLink'
import Background from '../components/Background'
import LanguageChoose from '../components/LanguageChoose'

export default {
  components: { LanguageChoose, Background, NavLink, MenuLink },
  data () {
    return {
      menuOpened: false,
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
          url: 'projects',
          colors: ['purple', 'pink', 'red']
        },
        {
          name: 'contact',
          page: 'contact',
          url: 'contact',
          colors: ['yellow', 'orange', 'pink']
        }
      ],
      socialMedia: [
        {
          name: 'github',
          url: 'https://github.com/rufusmaiwald',
          icon: ['fab', 'github']
        },
        {
          name: 'spotify',
          url: 'https://www.instagram.com/rufusmaiwald',
          icon: ['fab', 'instagram']
        },
        {
          name: 'linkedin',
          url: 'https://www.linkedin.com/in/rufus-maiwald-20832a137',
          icon: ['fab', 'linkedin']
        },
        {
          name: 'xing',
          url: 'https://www.xing.com/profile/Rufus_Maiwald/cv',
          icon: ['fab', 'xing']
        }
      ]
    }
  },
  computed: {
    colors () {
      for (const route of this.navigation) {
        if (route.page === this.$nuxt.$route.name) {
          return route.colors
        }
      }

      return ['gray', 'gray', 'gray']
    }
  },
  head () {
    return this.$nuxtI18nSeo()
  }
}
</script>

<style>
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

@media (min-width: 1500px) {
  .nav-wrapper {
    position: absolute;
  }
}

.page-enter-active, .page-leave-active {
  transition: opacity .3s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
</style>
