import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faInstagram, faLinkedin, faXing } from '@fortawesome/free-brands-svg-icons'
import { chevronDoubleLeft } from '@/assets/icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGithub, faInstagram, faLinkedin, faXing, chevronDoubleLeft)
Vue.component('fai', FontAwesomeIcon)
