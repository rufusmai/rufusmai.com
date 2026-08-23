<template>
  <div>
    <button v-if="menuOpen" class="absolute w-screen inset-0 focus:outline-none cursor-default z-30" @click="menuOpen = false" />
    <div class="relative">
      <transition
        leave-from-class="transition ease-in duration-100"
        leave-active-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="menuOpen" class="absolute z-50 bottom-0 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg">
          <ul class="max-h-60 rounded-md py-1 text-base ring-1 ring-black/5 overflow-auto focus:outline-none sm:text-sm">
            <li
              v-for="option of locales"
              :key="option.code"
              class="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-default select-none relative py-3 pl-3 pr-9"
              :class="{'bg-gray-100 dark:bg-gray-600': locale === option.code}"
              @click="choose(option)"
            >
              <img
                :src="`https://flagcdn.com/h20/${option.code !== 'en' ? option.code : 'us'}.png`"
                :alt="option.code"
                height="20"
                class="block rounded-sm"
              >
              <span v-if="locale === option.code" class="absolute inset-y-0 right-0 flex items-center pr-2">
                <CheckIcon class="h-6 w-6" />
              </span>
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <BaseButton class="relative z-40 pr-8" @click="menuOpen = !menuOpen">
      <span class="block truncate">
        <img
          :src="`https://flagcdn.com/h24/${locale !== 'en' ? locale : 'us'}.png`"
          :alt="locale"
          height="24"
          class="inline-block w-8 rounded-sm"
        >
      </span>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" />
      </span>
    </BaseButton>
  </div>
</template>

<script setup>
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/outline'
import { useNotification } from '@kyvg/vue3-notification'
import BaseButton from '../../../Button.vue'

// `locales` is a ref on the i18n instance, so it is read through the composable.
const { t, locale, locales, setLocale } = useI18n()
const { notify } = useNotification()

const menuOpen = ref(false)

async function choose (option) {
  menuOpen.value = false
  await setLocale(option.code)

  notify({
    group: 'main',
    title: t('changedLocale', [option.name]),
    duration: 5000
  })
}
</script>
