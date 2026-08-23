<template>
  <div ref="container" />
</template>

<script>
/*
** Minimal reCAPTCHA v2 widget.
**
** `vue-recaptcha` has no stable Vue 3 release, and the widget is a thin wrapper
** around grecaptcha's explicit-render API, so it is kept local instead.
*/
let scriptPromise = null

function loadRecaptcha () {
  if (window.grecaptcha?.render) {
    return Promise.resolve(window.grecaptcha)
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      window.__recaptchaOnload = () => resolve(window.grecaptcha)

      const script = document.createElement('script')
      script.id = 'recaptcha-api'
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=__recaptchaOnload'
      script.async = true
      script.defer = true
      script.onerror = () => reject(new Error('Could not load reCAPTCHA'))
      document.head.appendChild(script)
    }).catch((error) => {
      // Do not cache the failure, so a later mount can try again.
      scriptPromise = null
      throw error
    })
  }

  return scriptPromise
}

export default {
  name: 'RecaptchaWidget',
  props: {
    sitekey: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  emits: ['verify', 'expired', 'error', 'render'],
  data () {
    return {
      widgetId: null
    }
  },
  async mounted () {
    try {
      const grecaptcha = await loadRecaptcha()

      // The component can be unmounted while the script is still loading.
      if (!this.$refs.container) {
        return
      }

      this.widgetId = grecaptcha.render(this.$refs.container, {
        'sitekey': this.sitekey,
        'theme': this.theme,
        'callback': token => this.$emit('verify', token),
        'expired-callback': () => this.$emit('expired'),
        'error-callback': () => this.$emit('error', new Error('reCAPTCHA error'))
      })

      this.$emit('render', this.widgetId)
    } catch (error) {
      this.$emit('error', error)
    }
  },
  beforeUnmount () {
    // Release the widget, otherwise every re-render leaves one behind.
    if (this.widgetId !== null) {
      try {
        window.grecaptcha?.reset(this.widgetId)
      } catch {
        // the widget is already gone
      }
      this.widgetId = null
    }
  },
  methods: {
    reset () {
      if (this.widgetId !== null) {
        window.grecaptcha?.reset(this.widgetId)
      }
    }
  }
}
</script>
