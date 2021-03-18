<template>
  <div>
    <div class="relative">
      <transition
        leave-class="transition ease-in duration-100"
        leave-active-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="menuOpen" class="absolute z-50 bottom-0 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg">
          <ul class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <li
              v-for="locale of this.$i18n.locales"
              :key="locale.code"
              class="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-default select-none relative py-3 pl-3 pr-9"
              :class="{'bg-gray-100 dark:bg-gray-600': $i18n.locale === locale.code}"
              @click="setLocale(locale)"
            >
              <img
                :src="`https://flagcdn.com/h20/${locale.code !== 'en' ? locale.code : 'us'}.png`"
                :alt="$i18n.locale"
                height="20"
                class="block rounded-sm"
              >
              <span v-if="$i18n.locale === locale.code" class="absolute inset-y-0 right-0 flex items-center pr-2">
                <CheckIcon />
              </span>
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <Button class="relative pr-8" @click.native="menuOpen = !menuOpen">
      <span class="block truncate">
        <img
          :src="`https://flagcdn.com/h24/${$i18n.locale !== 'en' ? $i18n.locale : 'us'}.png`"
          :alt="$i18n.locale"
          height="24"
          class="inline-block w-8 rounded-sm"
        >
      </span>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <SelectorIcon class="h-5 w-5 text-gray-400" />
      </span>
    </Button>
  </div>
</template>

<script>
import { CheckIcon, SelectorIcon } from '@vue-hero-icons/outline'
import Button from '../../../Button'

export default {
  name: 'LanguageChoose',
  components: { Button, CheckIcon, SelectorIcon },
  data () {
    return {
      menuOpen: false
    }
  },
  methods: {
    async setLocale (locale) {
      this.menuOpen = false
      await this.$i18n.setLocale(locale.code)

      this.$notify({
        group: 'main',
        title: this.$t('changedLocale', [locale.name]),
        duration: 5000
      })
    }
  }
}
</script>

<style scoped>
.dropdown {
  bottom: 100%
}
</style>
