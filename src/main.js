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

Vue.config.productionTip = false

Vue.use(BootstrapVue, Vuelidate)

Vue.axios = axios;
Object.defineProperties(Vue.prototype, {
  axios: {
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
  render: h => h(App)
}).$mount('#app')
