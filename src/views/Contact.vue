<template>
  <div class="contact">
    <back-button/>
    <h4 class="text-center mb-4">{{ $t('contact.sendMessage') }}</h4>
    <b-form class="text-left mx-auto" @submit.stop.prevent="onSubmit">
      <b-form-group>
        <label class="sr-only" for="input-name">Name</label>
        <b-form-input
          type="text"
          id="input-name"
          v-model="$v.form.name.$model"
          :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
          :placeholder="$t('contact.name')"
          trim
          autofocus
        />

        <b-form-invalid-feedback>
          {{ $t('contact.realName') }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label class="sr-only" for="input-email">E-Mail</label>
        <b-form-input
          type="email"
          id="input-email"
          v-model="$v.form.email.$model"
          :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
          :placeholder="$t('contact.email')"
          trim
        />

        <b-form-invalid-feedback>
          {{ $t('contact.realMail') }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label class="sr-only" for="input-msg">Nachricht</label>
        <b-form-textarea
          id="input-msg"
          v-model="$v.form.msg.$model"
          :state="$v.form.msg.$dirty ? !$v.form.msg.$error : null"
          :placeholder="$t('contact.message')"
          rows="3"
        />

        <b-form-invalid-feedback>
          {{ $t('contact.longer') }}
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="text-center">
        <i18n path="contact.privacy" tag="span" class="captcha text-muted">
          <a tabindex="-1" href="#" v-b-modal.privacy-modal @click.stop.prevent>{{ $t('privacy.privacyDeclaration') }}</a>.
        </i18n>
        <br>
        <b-button class="text-center mt-3" type="submit" variant="outline-secondary">
          <b-spinner v-if="submit" :disabled="submit" small/>
          {{ $t('contact.send') }}
        </b-button>
      </div>
    </b-form>

    <b-modal id="privacy-modal" size="xl" ok-only :ok-title="$t('privacy.close')" ok-variant="secondary" :title="$t('privacy.title')">
      <privacy/>
    </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {FormPlugin, FormGroupPlugin, FormInputPlugin, FormTextareaPlugin, ModalPlugin} from 'bootstrap-vue'
  import BackButton from '../components/BackButton.vue'
  import {validationMixin} from 'vuelidate'
  import {required, minLength, email} from 'vuelidate/lib/validators'

  Vue.use(FormPlugin)
  Vue.use(FormGroupPlugin)
  Vue.use(FormInputPlugin)
  Vue.use(FormTextareaPlugin)
  Vue.use(ModalPlugin)

  export default {
    components: {
      'back-button': BackButton,
      'privacy': () => import('./Privacy.vue')
    },
    mixins: [validationMixin],
    data() {
      return {
        form: {
          name: '',
          email: '',
          msg: ''
        },
        submit: false,
        recaptcha: null
      }
    },
    validations: {
      form: {
        name: {
          required,
          minLength: minLength(3)
        },
        email: {
          required,
          email
        },
        msg: {
          required,
          minLength: minLength(7)
        }
      }
    },
    created() {
      this.loadRecaptcha()
    },
    methods: {
      async loadRecaptcha() {
        var recaptcha = await import('recaptcha-v3')
        this.recaptcha = await recaptcha.load('6LfgJLsUAAAAAAADroHUowA4fo_u93q-Au6I47fI', {
          autoHideBadge: true
        })
      },
      onSubmit() {
        this.$v.form.$touch()

        if (!this.$v.form.$anyError) {
          this.submit = true

          this.recaptcha.execute('login').then((token) => {
            this.$axios.post(process.env.NODE_ENV === 'production' ? 'https://api.rufusmaiwald.de/message' : 'http://localhost:8000/message', {
              name: this.form.name,
              token: token,
              email: this.form.email,
              msg: this.form.msg
            }, {
              validateStatus: function (status) {
                return status === 200
              }
            }).then(response => {
              this.$router.push({path: 'sent', query: {success: true, response: response}})
            }).catch(error => {
              /* eslint-disable no-console */
              console.error(error.response)

              this.$router.push({path: 'sent', query: {success: false, response: error}})
            })
          })
        }
      }
    }
  }
</script>

<style>
  .captcha {
    font-size: .75em;
    line-height: 1.5;
  }
</style>
