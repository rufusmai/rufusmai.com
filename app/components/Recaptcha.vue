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
const SCRIPT_ID = 'recaptcha-api'
let scriptPromise = null

function loadRecaptcha () {
  if (window.grecaptcha?.render) {
    return Promise.resolve(window.grecaptcha)
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      window.__recaptchaOnload = () => resolve(window.grecaptcha)

      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=__recaptchaOnload'
      script.async = true
      script.defer = true
      script.onerror = reject
      document.head.appendChild(script)
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
  methods: {
    reset () {
      if (this.widgetId !== null) {
        window.grecaptcha?.reset(this.widgetId)
      }
    }
  }
}
</script>
