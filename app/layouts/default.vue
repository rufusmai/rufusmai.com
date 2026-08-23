<template>
  <div class="box-border min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
    <ClientOnly>
      <notifications
        group="main"
        position="bottom right"
        classes="rounded-lg mb-2 mx-2 p-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700"
      />
      <HoverCredits />
    </ClientOnly>

    <IconBackground />

    <div class="relative z-20 flex flex-col min-h-screen">
      <SiteHeader
        v-model:menu-opened="menuOpened"
        :colors="colors"
      />

      <div class="grow flex flex-row">
        <SiteMenu
          v-model:menu-opened="menuOpened"
          :install-prompt="installPrompt"
          @pwa-installed="installPrompt = null"
        />

        <div class="wrapper inline-block grow min-h-full p-2 sm:p-4">
          <div class="flex h-full flex-col justify-between">
            <slot />
            <SiteFooter />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HoverCredits from '../components/layout/HoverCredits.vue'
import IconBackground from '../components/layout/background/IconBackground.vue'
import SiteHeader from '../components/layout/header/Header.vue'
import SiteMenu from '../components/layout/menu/Menu.vue'
import SiteFooter from '../components/layout/Footer.vue'
import navigation from '../utils/navigation'

const route = useRoute()
const menuOpened = ref(false)
const installPrompt = ref(null)

const colors = computed(() => {
  for (const entry of navigation) {
    if (entry.url === route.path) {
      return entry.colors
    }
  }

  return ['gray', 'gray', 'gray']
})

function beforeInstall (e) {
  installPrompt.value = e
  e.preventDefault()
}

onMounted(() => window.addEventListener('beforeinstallprompt', beforeInstall))
onBeforeUnmount(() => window.removeEventListener('beforeinstallprompt', beforeInstall))

// Locale-aware <html lang>, alternate links and og:locale, previously $nuxtI18nHead.
const localeHead = useLocaleHead()
const colorMode = useColorMode()

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: localeHead.value.link,
  meta: [
    { name: 'color-scheme', content: colorMode.value },
    ...(localeHead.value.meta || [])
  ]
}))
</script>

<style>
.avatar-gradient {
  transition: background-image 300ms ease-in-out;
}

.page-enter-active, .page-leave-active,
.install-enter-active, .install-leave-active {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
.page-enter-from, .page-leave-to,
.install-enter-from, .install-leave-to {
  opacity: 0;
}
</style>
