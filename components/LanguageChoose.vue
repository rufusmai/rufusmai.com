<template>
  <div class="relative">
    <button v-if="dropDownOpened" class="fixed z-30 inset-0 h-full w-full cursor-default" @click="dropDownOpened = false" />
    <button
      class="p-2 relative transition duration-300 ease-in-out bg-gray-600 hover:bg-gray-500 active:bg-gray-500 bg-opacity-25 hover:bg-opacity-25 active:bg-opacity-25 focus:outline-none z-40 rounded-lg"
      @click="dropDownOpened = !dropDownOpened"
    >
      <img :src="`https://flagcdn.com/w40/${$i18n.locale !== 'en' ? $i18n.locale : 'us'}.png`" :alt="$i18n.locale" class="inline w-8 rounded-sm">
      <ChevronUpIcon class="inline text-gray-500" :class="dropDownOpened ? 'rotate-180' : ''" size="20" />
    </button>

    <div v-if="dropDownOpened" class="dropdown z-50 absolute px-2 py-1 w-auto rounded-lg left-0 bg-black">
      <ul class="font-bold w-auto block">
        <li v-for="locale of availableLocales" :key="locale.code" class="py-1">
          <a href="#" class="block flex" @click.prevent.stop="setLocale(locale)">
            <img :src="`https://flagcdn.com/w20/${locale.code !== 'en' ? locale.code : 'us'}.png`" height="19" width="32" class="rounded-sm max-w-none" :alt="$i18n.locale">
            <p class="ml-2">{{ locale.name }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ChevronUpIcon } from '@vue-hero-icons/outline'

export default {
  name: 'LanguageChoose',
  components: { ChevronUpIcon },
  data () {
    return {
      dropDownOpened: false
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    async setLocale (locale) {
      this.dropDownOpened = false
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
