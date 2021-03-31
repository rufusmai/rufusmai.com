<template>
  <div class="box-border min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
    <client-only>
      <notifications
        group="main"
        position="bottom right"
        classes="rounded-lg mb-2 mx-2 p-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700"
      />
    </client-only>

    <HoverCredits />
    <IconBackground />

    <div class="relative z-20 flex flex-col min-h-screen">
      <Header
        :menu-opened.sync="menuOpened"
        :colors="colors"
      />

      <div class="flex-grow flex flex-row">
        <Menu
          :menu-opened.sync="menuOpened"
          :install-prompt="installPrompt"
        />

        <div class="wrapper inline-block flex-grow min-h-full p-2 sm:p-4">
          <div class="flex h-full flex-col justify-between">
            <Nuxt class="mt-6 sm:m-0" />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HoverCredits from '../components/layout/HoverCredits'
import IconBackground from '../components/layout/background/IconBackground'
import Header from '../components/layout/Header'
import navigation from '../mixins/navigation'
import Menu from '../components/layout/menu/Menu'
import Footer from '../components/layout/Footer'

export default {
  components: { Footer, Menu, Header, IconBackground, HoverCredits },
  mixins: [navigation],
  data () {
    return {
      menuOpened: false,
      installPrompt: null
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
  async mounted () {
    const workbox = await window.$workbox
    if (workbox) {
      workbox.addEventListener('installed', this.pwaInstalled)
    }

    window.addEventListener('beforeinstallprompt', this.beforeInstall)
    this.$store.dispatch('fetchUser')
  },
  beforeDestroy () {
    window.removeEventListener('beforeinstallprompt', this.beforeInstall)
  },
  methods: {
    beforeInstall (e) {
      this.installPrompt = e
      e.preventDefault()
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
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: i18nHead.htmlAttrs,
      meta: [
        { hid: 'color-scheme', name: 'color-scheme', content: this.$colorMode.value },
        ...i18nHead.meta
      ],
      link: i18nHead.link
    }
  }
}
</script>

<style>
.avatar-gradient {
  transition: background-image 300ms ease-in-out;
}

.page-enter-active, .page-leave-active,
.install-enter-active, .install-leave-active {
  @apply transition-opacity ease-in-out duration-300;
}
.page-enter, .page-leave-active,
.install-enter, .install-leave-to {
  @apply opacity-0;
}
</style>
