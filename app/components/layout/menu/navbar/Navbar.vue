<template>
  <div class="font-bold leading-relaxed text-3xl">
    <ul>
      <li v-for="link in navigation" :key="link.name">
        <NavLink :name="$t(link.name)" :url="link.url" :colors="link.colors" :active="$route.path === link.url" @click="toggleMenu" />
      </li>
      <ClientOnly>
        <transition name="install">
          <li v-if="installPrompt" class="hover:text-gray-500 transition duration-300 ease-in-out">
            <NavLink :name="$t('install')" :colors="['green', 'green', 'green']" class="inline-block" @click="installPwa" />
          </li>
        </transition>
      </ClientOnly>
    </ul>
  </div>
</template>

<script>
import navigation from '../../../../mixins/navigation'
import menuToggle from '../../../../mixins/menuToggle'
import NavLink from './NavLink.vue'

export default {
  name: 'SiteNavbar',
  components: { NavLink },
  mixins: [navigation, menuToggle],
  props: {
    installPrompt: {
      type: Object,
      default: null
    }
  },
  emits: ['pwa-installed'],
  methods: {
    installPwa () {
      this.installPrompt.prompt()
      this.installPrompt.userChoice.then((result) => {
        this.$notify({
          group: 'main',
          title: this.$t('pwaInstallation') + ' ' + this.$t(result.outcome === 'accepted' ? 'success' : 'cancel'),
          duration: 5000
        })

        if (result.outcome === 'accepted') {
          // `installPrompt` is a prop, so the owner clears it.
          this.$emit('pwa-installed')
        }
      })
    }
  }
}
</script>
