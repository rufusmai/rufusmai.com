import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { chevronDoubleLeft } from '@/assets/icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

config.autoAddCss = false

library.add(faGithub, faTwitter, faInstagram, faLinkedin, chevronDoubleLeft)
Vue.component('fai', FontAwesomeIcon)
