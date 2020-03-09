import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import './plugins/font-awesome'
import i18n from './plugins/i18n'
import router from './plugins/router'
import './plugins/vuelidate'

import './serviceworker/registerServiceWorker'

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
