<template>
  <client-only>
    <div>
      <Button
        v-if="loggedIn"
        no-padding
        big-border
        class="relative z-40 focus:outline-none overflow-hidden"
        @click.native="menuOpen = !menuOpen"
      >
        <img :src="user.avatar" alt="Avatar" class="h-10 w-10">
      </Button>

      <button v-if="menuOpen" class="absolute w-screen inset-0 focus:outline-none cursor-default z-30" @click="menuOpen = false" />
      <div class="relative">
        <transition
          leave-class="transition ease-in duration-100"
          leave-active-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="menuOpen && loggedIn" class="absolute z-40 top-0 left-auto min-w-max right-0 mt-1 pt-2 rounded-md text-center bg-white dark:bg-gray-800 shadow-lg">
            <div class="px-2 pb-2 border-b border-gray-200 dark:border-gray-600">
              <div class="bg-gray-100 dark:bg-black rounded-lg px-3 py-2 w-full text-sm text-gray-500 dark:text-gray-300 tracking-wider inline-block">
                <i18n path="loggedInUsingOneGaming" tag="span">
                  <br>
                </i18n>
              </div>

              <h6 class="font-bold text-xl mt-2">
                {{ user.name }}
              </h6>
            </div>

            <div class="my-1">
              <a href="https://id.onegaming.group" rel="noopener" target="_blank" class="block w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                <UserCircleIcon size="22" class="inline-block -mt-1" />
                Account
              </a>
              <button class="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none" @click="logout">
                <LogoutIcon size="22" class="inline-block -mt-1" />
                Logout
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </client-only>
</template>

<script>
import { LogoutIcon, UserCircleIcon } from '@vue-hero-icons/outline'
import Button from '../../Button'

export default {
  name: 'AvatarMenu',
  components: { Button, LogoutIcon, UserCircleIcon },
  data () {
    return {
      menuOpen: false
    }
  },
  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    },
    user () {
      return this.$auth.user
    }
  },
  methods: {
    async logout () {
      this.menuOpen = false
      await this.$auth.logout()

      this.$notify({
        group: 'main',
        title: this.$t('loggedOut'),
        duration: 7000
      })
    }
  }
}
</script>

<style scoped>

</style>
