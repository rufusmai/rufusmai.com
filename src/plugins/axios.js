import Vue from 'vue'
import axios from 'axios'

Vue.axios = axios
Object.defineProperties(Vue.prototype, {
  $axios: {
    get() {return axios}
  },
  $http: {
    get() {return axios}
  }
})
