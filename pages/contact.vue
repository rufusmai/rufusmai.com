<template>
  <div class="content-wrapper block h-full mx-auto w-full">
    <div class="max-w-md mx-auto sm:m-0 text-center sm:text-left">
      <div>
        <ChatAlt2Icon size="100" class="chat-icon hidden sm:block -m-1.52 mb-3" />

        <h2 class="font-bold text-3xl">
          {{ $t('sendMessage') }}
        </h2>
        <p class="text-gray-400 mt-2">
          {{ $t('messageInfo') }}<br>
          {{ $t('answer') }}
        </p>
      </div>

      <validation-observer v-slot="{ handleSubmit, reset }">
        <form ref="contactForm" @submit.prevent="handleSubmit(submit)" @reset.prevent="reset">
          <validation-provider v-slot="{ errors, classes }" rules="required">
            <label for="name" class="hidden">{{ $t('name') }}</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              autocomplete="name"
              :placeholder="$t('name')"
              autofocus
              class="mt-4 bg-opacity-50 dark:bg-opacity-50"
              :class="classes"
            >
          </validation-provider>

          <validation-provider v-slot="{ errors, classes }" rules="required">
            <label for="email" class="hidden">{{ $t('email') }}</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              :placeholder="$t('email')"
              class="mt-4 bg-opacity-50 dark:bg-opacity-50"
              :class="classes"
            >
          </validation-provider>

          <validation-provider v-slot="{ errors, classes }" rules="required" class="my-2">
            <label for="message" class="hidden">{{ $t('message') }}</label>
            <textarea
              id="message"
              v-model="form.message"
              minlength="10"
              rows="3"
              :placeholder="$t('message')"
              class="block mt-4 bg-opacity-50 dark:bg-opacity-50"
              :class="classes"
            />
          </validation-provider>

          <div
            class="captcha-wrapper shadow-sm mt-4 bg-gray-300 dark:bg-gray-700 bg-opacity-75 rounded-lg mx-auto sm:mx-0"
            :class="captchaId == null ? 'animate-pulse' : ''"
          >
            <client-only>
              <vue-recaptcha
                v-if="captchaShow"
                ref="captcha"
                :sitekey="captchaSiteKey"
                :theme="$colorMode.value"
                :load-recaptcha-script="true"
                @verify="setToken"
                @render="captchaRendered"
                @error="captchaError"
              />
            </client-only>
          </div>
          <small v-if="captchaValErr && token == null" class="block text-red-600">
            {{ $t('validation.captcha') }}
          </small>

          <Button
            type="submit"
            class="mt-3 inline-flex text-xl"
            :class="form.success ? 'border-green-600 text-green-600' : (form.success === null ? '' : 'border-red-600 text-red-600')"
            :disabled="form.loading || form.success !== null"
          >
            <svg
              v-if="form.loading"
              class="animate-spin inline-block mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <ChatAltIcon v-else-if="form.success === null" size="20" class="inline mr-2" />
            {{ $t(form.success ? 'formSuccess' : (form.success === null ? 'send' : 'formError')) }}
          </Button>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ChatAltIcon, ChatAlt2Icon } from '@vue-hero-icons/outline'
import { ValidationObserver, ValidationProvider, configure, setInteractionMode, extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import VueRecaptcha from 'vue-recaptcha'
import Button from '../components/Button'

setInteractionMode('eager')
configure({
  classes: {
    valid: 'border-green-600 bg-green-100 dark:border-green-600 dark:bg-green-900',
    invalid: 'border-red-600 bg-red-100 dark:border-red-600 dark:bg-red-900'
  }
})

export default {
  name: 'Contact',
  components: { Button, ChatAltIcon, ChatAlt2Icon, ValidationObserver, ValidationProvider, VueRecaptcha },
  data () {
    return {
      captchaShow: true,
      captchaSiteKey: '6Lf8Wc8ZAAAAAM1a6HZOzAu3io2RbJ9YizvJ74z4',
      captchaId: null,
      captchaToken: null,
      captchaValErr: false,
      form: {
        name: '',
        email: '',
        message: '',
        loading: false,
        success: null
      }
    }
  },
  mounted () {
    const i18n = this.$i18n
    extend('required', {
      ...required,
      message: (_, values) => i18n.t('validation.required', values)
    })
    extend('email', {
      ...email,
      message: (_, values) => i18n.t('validation.email', values)
    })
    extend('min', {
      ...min,
      message: (_, values) => i18n.t('validation.min', values)
    })

    this.$root.$on('colorModeChanged', () => {
      this.captchaShow = false
      setTimeout(() => {
        this.captchaShow = true
      }, 100)
    })
  },
  methods: {
    captchaRendered (id) {
      this.captchaId = id
    },
    setToken (token) {
      this.captchaToken = token
    },
    captchaError (error) {
      console.error(error)
    },
    submit () {
      if (this.captchaToken) {
        this.captchaValErr = false
        this.form.loading = true

        this.$axios.post(process.env.NODE_ENV === 'production' ? 'https://api.rufusmaiwald.de/v1/contact' : 'http://localhost:8000/v1/contact', {
          name: this.form.name,
          token: this.captchaToken,
          email: this.form.email,
          message: this.form.message
        }).then((response) => {
          this.form.success = true
        }).catch((error) => {
          console.error(error)
          this.form.success = false
          this.form.error = error.response ? error.response.data.msg : this.$t('formError')
        }).finally(() => {
          this.form.loading = false
          setTimeout(() => {
            this.$refs.contactForm.reset()
            this.form.success = null
          }, 5000)
        })
      } else {
        this.captchaValErr = true
      }
    }
  }
}
</script>

<style>
iframe {
  @apply rounded-lg;
  width: 302px;
  height: 76px;
}
</style>

<style scoped>
.captcha-wrapper {
  height: 76px;
  width: 302px;
}
.chat-icon path {
  stroke-width: 1.25 !important;
}
</style>
