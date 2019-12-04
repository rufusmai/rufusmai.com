import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faChevronLeft, faExternalLinkAlt, faLink} from '@fortawesome/free-solid-svg-icons'
import {faInstagram, faFacebook, faGithub, faSpotify, faVuejs} from '@fortawesome/free-brands-svg-icons'
import {faTimesCircle, faCheckCircle} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'
import {VueReCaptcha} from "vue-recaptcha-v3";
import {i18n} from './i18n'

Vue.config.productionTip = false

Vue.use(BootstrapVue, Vuelidate)
Vue.use(VueReCaptcha, { siteKey: '6LfgJLsUAAAAAAADroHUowA4fo_u93q-Au6I47fI', loaderOptions: { autoHideBadge: true } })

Vue.axios = axios;
Object.defineProperties(Vue.prototype, {
  $axios: {
    get() {return axios;}
  },
  $http: {
    get() {return axios;}
  }
})

library.add(faChevronLeft, faInstagram, faFacebook, faSpotify, faGithub, faVuejs, faTimesCircle, faCheckCircle, faExternalLinkAlt, faLink)
Vue.component('fai', FontAwesomeIcon)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

// Hot updates
if (module.hot) {
  module.hot.accept(['./locales/en', './locales/de'], function () {
    i18n.setLocaleMessage('en', require('./locales/en').default['en'])
    i18n.setLocaleMessage('de', require('./locales/de').default['de'])
  })
}
