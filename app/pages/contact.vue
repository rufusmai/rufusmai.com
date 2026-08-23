<template>
  <div class="content-wrapper block h-full mx-auto w-full">
    <div class="max-w-md mx-auto sm:m-0 text-center sm:text-left">
      <div>
        <ChatBubbleLeftRightIcon class="chat-icon hidden sm:block -m-1.52 mb-3 w-[100px] h-[100px]" />

        <h2 class="font-bold text-3xl">
          {{ $t('sendMessage') }}
        </h2>
        <p class="text-gray-400 mt-2">
          {{ $t('messageInfo') }}<br>
          {{ $t('answer') }}
        </p>
      </div>

      <VeeForm ref="contactForm" @submit="submit">
        <VeeField v-slot="{ field, meta }" name="name" :rules="required">
          <label for="name" class="hidden">{{ $t('name') }}</label>
          <input
            id="name"
            v-bind="field"
            v-model="form.name"
            type="text"
            autocomplete="name"
            :placeholder="$t('name')"
            autofocus
            class="mt-4 bg-white/50 dark:bg-gray-800/50"
            :class="fieldClasses(meta)"
          >
        </VeeField>

        <VeeField v-slot="{ field, meta }" name="email" :rules="required">
          <label for="email" class="hidden">{{ $t('email') }}</label>
          <input
            id="email"
            v-bind="field"
            v-model="form.email"
            type="email"
            autocomplete="email"
            :placeholder="$t('email')"
            class="mt-4 bg-white/50 dark:bg-gray-800/50"
            :class="fieldClasses(meta)"
          >
        </VeeField>

        <VeeField v-slot="{ field, meta }" name="message" :rules="required" class="my-2">
          <label for="message" class="hidden">{{ $t('message') }}</label>
          <textarea
            id="message"
            v-bind="field"
            v-model="form.message"
            minlength="10"
            rows="3"
            :placeholder="$t('message')"
            class="block mt-4 bg-white/50 dark:bg-gray-800/50"
            :class="fieldClasses(meta)"
          />
        </VeeField>

        <div
          class="captcha-wrapper shadow-sm mt-4 bg-gray-300/75 dark:bg-gray-700/75 rounded-lg mx-auto sm:mx-0"
          :class="captchaId == null ? 'animate-pulse' : ''"
        >
          <ClientOnly>
            <Recaptcha
              v-if="captchaShow"
              :key="$colorMode.value"
              ref="captcha"
              :sitekey="captchaSiteKey"
              :theme="$colorMode.value"
              @verify="setToken"
              @render="captchaRendered"
              @error="captchaError"
            />
          </ClientOnly>
        </div>
        <small v-if="captchaValErr && captchaToken == null" class="block text-red-600">
          {{ $t('validation.captcha') }}
        </small>

        <BaseButton
          type="submit"
          class="mt-3 inline-flex text-xl"
          :class="form.success ? 'border-green-500 hover:border-green-500 text-green-600 dark:border-green-500 dark:hover:border-green-500 dark:text-green-600' : (form.success === null ? '' : 'border-red-600 hover:border-red-600 text-red-600 dark:border-red-500 dark:hover:border-red-500 dark:text-red-600')"
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
          <ChatBubbleLeftEllipsisIcon v-else-if="form.success === null" class="inline mr-2 h-5 w-5" />
          {{ $t(form.success ? 'formSuccess' : (form.success === null ? 'send' : 'formError')) }}
        </BaseButton>
      </VeeForm>
    </div>
  </div>
</template>

<script>
import { ChatBubbleLeftEllipsisIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'
import { Field as VeeField, Form as VeeForm } from 'vee-validate'
import BaseButton from '../components/Button.vue'
import Recaptcha from '../components/Recaptcha.vue'

export default {
  name: 'ContactPage',
  components: { BaseButton, Recaptcha, ChatBubbleLeftEllipsisIcon, ChatBubbleLeftRightIcon, VeeForm, VeeField },
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
  computed: {
    required () {
      // vee-validate 4 ships no built-in rules; `required` was the only one used.
      return value => (value !== undefined && value !== null && String(value).trim() !== '') || this.$t('validation.required', { _field_: '' })
    }
  },
  methods: {
    fieldClasses (meta) {
      if (!meta.dirty && !meta.touched) {
        return ''
      }

      return meta.valid
        ? 'border-green-600 bg-green-100 dark:border-green-600 dark:bg-green-900'
        : 'border-red-600 bg-red-100 dark:border-red-600 dark:bg-red-900'
    },
    captchaRendered (id) {
      this.captchaId = id
    },
    setToken (token) {
      this.captchaToken = token
    },
    captchaError (error) {
      console.error(error)
    },
    async submit () {
      if (!this.captchaToken) {
        this.captchaValErr = true
        return
      }

      this.captchaValErr = false
      this.form.loading = true

      try {
        await $fetch('/api/contact', {
          method: 'POST',
          body: {
            name: this.form.name,
            token: this.captchaToken,
            email: this.form.email,
            message: this.form.message
          }
        })
        this.form.success = true
      } catch (error) {
        console.error(error)
        this.form.success = false
        this.form.error = error.data?.msg ?? this.$t('formError')
      } finally {
        this.form.loading = false
        setTimeout(() => {
          this.$refs.contactForm?.resetForm()
          this.form.name = ''
          this.form.email = ''
          this.form.message = ''
          this.form.success = null
        }, 5000)
      }
    }
  }
}
</script>

<style>
iframe {
  border-radius: 0.5rem;
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
