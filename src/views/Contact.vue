<template>
  <div class="contact">
    <BackButton/>
    <b-form class="text-left mx-auto" @submit.stop.prevent="onSubmit">
      <b-form-group>
        <label class="sr-only" for="input-name">Name</label>
        <b-form-input
          type="text"
          id="input-name"
          v-model="$v.form.name.$model"
          :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
          placeholder="Dein Name"
          trim
          autofocus
        ></b-form-input>

        <b-form-invalid-feedback>
          Bitte gib deinen echten Namen an
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label class="sr-only" for="input-email">E-Mail</label>
        <b-form-input
          type="email"
          id="input-email"
          v-model="$v.form.email.$model"
          :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
          placeholder="Deine E-Mail Adresse"
          trim
        ></b-form-input>

        <b-form-invalid-feedback>
          Bitte gib Deine echte E-Mail Adresse ein
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label class="sr-only" for="input-msg">Nachricht</label>
        <b-form-textarea
          id="input-msg"
          v-model="$v.form.msg.$model"
          :state="$v.form.msg.$dirty ? !$v.form.msg.$error : null"
          placeholder="Deine Nachricht"
          rows="3"
        ></b-form-textarea>

        <b-form-invalid-feedback>
          Bitte gib eine längere Nachricht ein
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="text-center">
        <span class="captcha text-muted">
          This site is protected by reCAPTCHA and the Google
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and
          <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          <br>
        </span>
        <b-button class="text-center mt-3" type="submit" variant="outline-secondary">
          <b-spinner v-if="submit" :disabled="!!submit" small></b-spinner>
          Abschicken
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
    import BackButton from '../components/BackButton.vue'
    import {validationMixin} from 'vuelidate'
    import {required, minLength, email} from 'vuelidate/lib/validators'

    export default {
        components: {
            BackButton
        },
        mixins: [validationMixin],
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    msg: ''
                },
                submit: false
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
        methods: {
            onSubmit() {
                this.$v.form.$touch()

                if (!this.$v.form.$anyError) {
                    this.submit = true

                    this.$recaptcha('login').then((token) => {
                        this.axios.post(process.env.NODE_ENV === 'production' ? 'https://api.rufusmaiwald.de/message' : 'http://localhost:8000/message', {
                            name: this.form.name,
                            token: token,
                            email: this.form.email,
                            msg: this.form.msg
                        }, {
                            validateStatus: function (status) {
                                return status === 200;
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
