import Vue from 'vue'
import {library} from "@fortawesome/fontawesome-svg-core"
import {faChevronLeft, faExclamationTriangle, faExternalLinkAlt, faLink} from "@fortawesome/free-solid-svg-icons"
import {faFacebook, faGithub, faInstagram, faSpotify, faVuejs} from "@fortawesome/free-brands-svg-icons"
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-regular-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

library.add(faChevronLeft, faInstagram, faFacebook, faSpotify, faGithub, faVuejs, faTimesCircle, faCheckCircle, faExternalLinkAlt, faLink, faExclamationTriangle)
Vue.component('fai', FontAwesomeIcon)
