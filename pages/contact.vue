<template>
  <div class="contact w-full lg:h-full flex justify-center lg:items-center text-center">
    <div class="p-4 sm:p-6 max-w-lg rounded-lg flex-shrink lg:my-4 lg:-mt-4 bg-gray-800 bg-opacity-50">
      <div class="mx-4">
        <ChatAlt2Icon size="100" class="mx-auto hidden sm:block" />

        <h2 class="font-bold text-3xl">
          {{ $t('sendMessage') }}
        </h2>
        <p class="text-gray-400 mb-4">
          {{ $t('messageInfo') }}<br>
          {{ $t('answer') }}
        </p>
      </div>

      <validation-observer v-slot="{ handleSubmit, reset }">
        <form ref="contactForm" class="text-center" @submit.prevent="handleSubmit(submit)" @reset.prevent="reset">
          <label for="name" class="hidden">{{ $t('name') }}</label>
          <div class="my-4">
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <input
                id="name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                :placeholder="$t('name')"
                autofocus
                class="inline w-full mb-1 px-5 py-3 bg-gray-500 bg-opacity-25 placeholder-gray-400 hover:bg-opacity-50 transition duration-300 ease-in-out focus:outline-none rounded"
                :class="classes"
              >
              <small class="text-red-600">{{ errors[0] }}</small>
            </validation-provider>
          </div>

          <label for="email" class="hidden">{{ $t('email') }}</label>
          <div class="my-4">
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                :placeholder="$t('email')"
                class="inline w-full mb-1 px-5 py-3 bg-gray-500 bg-opacity-25 placeholder-gray-400 hover:bg-opacity-50 transition duration-300 ease-in-out focus:outline-none rounded"
                :class="classes"
              >
              <small class="text-red-600">{{ errors[0] }}</small>
            </validation-provider>
          </div>

          <label for="message" class="hidden">{{ $t('message') }}</label>
          <div class="my-4">
            <validation-provider v-slot="{ errors, classes }" rules="required" class="my-2">
              <textarea
                id="message"
                v-model="form.message"
                type="text"
                minlength="10"
                :placeholder="$t('message')"
                class="inline w-full mb-1 px-5 py-3 bg-gray-500 bg-opacity-25 placeholder-gray-400 hover:bg-opacity-50 transition duration-300 ease-in-out focus:outline-none rounded"
                :class="classes"
              ></textarea>
              <small class="text-red-600">{{ errors[0] }}</small>
            </validation-provider>
          </div>

          <div
            class="captcha-wrapper my-2 bg-gray-700 bg-opacity-75 mx-auto rounded-lg"
            :class="captchaId == null ? 'animate-pulse' : ''"
          >
            <vue-recaptcha
              v-if="captchaSize"
              ref="captcha"
              sitekey="6Lf8Wc8ZAAAAAM1a6HZOzAu3io2RbJ9YizvJ74z4"
              theme="dark"
              :size="captchaSize"
              :load-recaptcha-script="true"
              @verify="setToken"
              @render="captchaRendered"
              @error="captchaError"
            />
          </div>
          <small v-if="captchaValErr && token == null" class="block text-red-600">
            {{ $t('validation.captcha') }}
          </small>

          <button
            type="submit"
            class="px-4 py-3 mt-3 bg-opacity-75 hover:bg-opacity-50 focus:outline-none text-white disabled:bg-pink-200 text-xl transition duration-300 ease-in-out font-medium rounded"
            :class="form.success ? 'bg-green-700' : (form.success === null ? 'bg-gray-700' : 'bg-red-700')"
            :disabled="form.loading || form.success !== null"
          >
            <svg
              v-if="form.loading"
              class="animate-spin inline-block -mt-2 mr-1 h-5 w-5 text-white"
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
            <ChatAltIcon v-else-if="form.success === null" size="20" class="inline -mt-1" />
            {{ $t(form.success ? 'formSuccess' : (form.success === null ? 'send' : 'formError')) }}
          </button>
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

setInteractionMode('eager')
configure({
  classes: {
    valid: 'bg-green-700',
    invalid: 'bg-red-600'
  }
})

export default {
  name: 'Contact',
  components: { ChatAltIcon, ChatAlt2Icon, ValidationObserver, ValidationProvider, VueRecaptcha },
  data () {
    return {
      captchaSize: null,
      captchaId: null,
      token: null,
      captchaValErr: false,
      form: {
        name: null,
        email: null,
        message: null,
        loading: false,
        success: null
      }
    }
  },
  mounted () {
    this.captchaSize = window.innerWidth > 400 ? 'normal' : 'compact'
    window.addEventListener('resize', this.resizeHandler, { passive: true })

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
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    captchaRendered (id) {
      this.captchaId = id
    },
    setToken (token) {
      this.token = token
    },
    captchaError (error) {
      console.error(error)
    },
    resizeHandler () {
      if (window.innerWidth >= 400 && this.captchaSize === 'compact') {
        this.captchaSize = null
        this.captchaId = null

        setTimeout(() => {
          this.captchaSize = 'normal'
        }, 1000)
      } else if (window.innerWidth < 400 && this.captchaSize === 'normal') {
        this.captchaSize = null
        this.captchaId = null

        setTimeout(() => {
          this.captchaSize = 'compact'
        })
      }
    },
    submit () {
      if (this.token) {
        this.captchaValErr = false
        this.form.loading = true

        this.$axios.post(process.env.NODE_ENV === 'production' ? 'https://api.rufusmaiwald.de/v1/contact' : 'http://localhost:8000/v1/contact', {
          name: this.form.name,
          token: this.token,
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

<style scoped>
.captcha-wrapper {
  height: 136px;
  width: 156px;
}

@media (min-width: 400px) {
  .captcha-wrapper {
    height: 74px;
    width: 300px;
  }
}
</style>
