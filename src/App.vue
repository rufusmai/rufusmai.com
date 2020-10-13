<template>
  <div id="app" :class="bg ? 'bg' : ''">
    <b-alert v-model="showAlert" variant="dark" class="alert" dismissible>
      <i18n tag="span" path="outdated">
        <a href="https://rufusmaiwald.de" rel="noopener">{{ $t('newerVersion') }}</a>
      </i18n>
    </b-alert>

    <b-container fluid class="grid position-relative">
      <b-row class="grid align-items-end justify-content-center">
        <b-col md="12" xl="9">
          <b-row>
            <b-col sm="12" md="6" class="d-flex align-items-center justify-content-center py-2 px-5 py-sm-4 p-md-0">
              <div class="circle"></div>
              <img class="d-flex avatar" alt="Rufus Maiwald" src="@/assets/avatar.svg">
            </b-col>
            <b-col class="d-flex align-items-center justify-content-center">
              <div class="content w-100 text-center">
                <h1>Rufus Maiwald</h1>
                <p class="mb-2">
                  {{ $t('subtitle') }}
                </p>
                <div class="social-iconbar">
                  <a v-for="icon in socialIcons" v-bind:key="icon.url" :href="icon.url"
                     aria-label="Social Media Profil öffnen" rel="noopener" target="_blank">
                    <fai :icon="icon.icon" class="social-iconbar-icon" :class="icon.name" size="lg"/>
                  </a>
                </div>
                <div class="text-box mx-auto" :style="`min-height: ${lang === 'de' ? 280 : 240}px;`">
                  <transition name="fade" mode="out-in" @beforeLeave="beforeLeave" @enter="enter"
                              @afterEnter="afterEnter">
                    <router-view/>
                  </transition>
                </div>
                <div class="link-box">
                  <router-link to="/contact">{{ $t('nav.contact') }}</router-link>
                  ·
                  <router-link to="/projects">{{ $t('nav.projects') }}</router-link>
                  <div class="d-inline-block ml-1" v-if="installPrompt">
                    ·
                    <a class="pwa-install" href="#" @click.stop.prevent="installPWA">App Installieren</a>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <div class="footer text-muted">
          <p class="p-3">
            <i18n path="footer.made" tag="span">
              <a href="https://vuejs.org/" aria-label="Vue.js Seite öffnen" rel="noopener" target="_blank">
                <fai :icon="['fab', 'vuejs']" style="color: #3c9162"/>
              </a>
              <span class="text-danger">&hearts;</span>
            </i18n>
            <wbr>
            <i18n path="footer.view" tag="a" href="https://github.com/rufusmaiwald/rufusmaiwald.de/tree/v1"
                  style="color: #35495e" rel="noopener" target="_blank">
              <fai :icon="['fab', 'github']"/>
            </i18n>
            .
            <a href="#" v-on:click="changeLanguage()" v-b-tooltip.hover
               :title="lang === 'en' ? 'In Deutsch ansehen' : 'View in English'">
              <img class="rounded" :alt="lang === 'en' ? 'de' : 'en'"
                   :src="`https://www.countryflags.io/${lang === 'en' ? 'de' : 'gb'}/flat/24.png`">
            </a>
          </p>
        </div>
      </b-row>
    </b-container>

    <b-toast id="update-toast" no-auto-hide toaster="b-toaster-bottom-left">
      <template v-slot:toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#28a745" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Rufus Maiwald PWA</strong>
        </div>
      </template>
      <p>
        Eine neue Version dieser Seite ist verfügbar!
      </p>
      <b-button href="#" size="sm" variant="secondary" @click.stop.prevent="updateWorker">Seite aktualisieren</b-button>
    </b-toast>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {ToastPlugin, AlertPlugin, BAlert} from "bootstrap-vue"
  import {loadLanguageAsync} from "@/plugins/i18n"

  Vue.use(ToastPlugin, AlertPlugin)

  export default {
    components: {
      'b-alert': BAlert
    },
    data() {
      return {
        lang: this.$i18n.locale,
        showAlert: true,
        bg: false,
        transitionName: 'slide-left',
        prevHeight: 0,
        prevWidth: 0,
        installPrompt: false,
        registration: null,
        socialIcons: [
          {
            name: 'github',
            url: 'https://github.com/rufusmaiwald',
            icon: ['fab', 'github']
          },
          {
            name: 'spotify',
            url: 'https://open.spotify.com/user/rufusmaiwald',
            icon: ['fab', 'spotify']
          },
          {
            name: 'facebook',
            url: 'https://www.facebook.com/rufusmaiwald',
            icon: ['fab', 'facebook']
          },
          {
            name: 'instagram',
            url: 'https://instagram.com/rufusmaiwald',
            icon: ['fab', 'instagram']
          }
        ]
      }
    },
    methods: {
      beforeLeave(element) {
        this.prevHeight = getComputedStyle(element).height
      },
      enter(element) {
        const {height} = getComputedStyle(element)
        element.style.height = this.prevHeight;

        setTimeout(() => {
          element.style.height = height
        });
      },
      afterEnter(element) {
        element.style.height = 'auto'
      },
      changeLanguage() {
        this.lang = this.lang === 'en' ? 'de' : 'en'
        loadLanguageAsync(this.lang)
      },
      installPWA() {
        this.installPrompt.prompt()

        this.installPrompt.userChoice.then(result => {
          this.sendInstalledPWAToast(result.outcome === 'accepted')

          if (result.outcome === 'accepted') {
            this.installPrompt = null
          }
        })
      },
      sendInstalledPWAToast(installed) {
        const h = this.$createElement
        const vNodesTitle = h(
          'div',
          {class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2']},
          [
            h('b-img', {
              props: {blank: true, 'blank-color': installed ? '#28a745' : '#dc3545', width: 12, height: 12},
              class: 'mr-2'
            }),
            h('strong', {class: 'mr-2'}, 'Rufus Maiwald PWA'),
          ]
        );

        this.$bvToast.toast(this.$t(installed ? 'home.installedPWA' : 'home.cancelledPWAInstall'), {
          title: [vNodesTitle],
          autoHideDelay: 5000
        })
      },
      updateWorker() {
        if (!this.registration || !this.registration.waiting) return
        this.registration.waiting.postMessage({action: 'skipWaiting'})
      }
    },
    created() {
      window.addEventListener('beforeinstallprompt', e => {
        this.installPrompt = e;
        e.preventDefault()
      });
      document.addEventListener('serviceworkerupdated', e => {
        this.registration = e.detail
        this.$bvToast.show('update-toast')
      })
    },
    mounted: function () {
      this.$router.beforeEach((to, from, next) => {
        this.bg = !this.bg
        next()
      })
    },
    beforeRouteUpdate(to, from, next) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      next()
    }
  }
</script>

<style lang="scss">
  @import "assets/app";

  .alert {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    max-width: 500px;
    margin: 0 auto;
    z-index: 99999;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: height, opacity;
    transition-timing-function: ease;
    overflow: hidden;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  html, body, #app, .grid {
    height: 100%;
  }

  #app {
    display: block;
    position: relative;
  }

  .grid {
    position: initial;
  }

  #app:after {
    content: '';

    @include media-breakpoint-up(sm) {
      background-image: url('assets/rufi_bg_avatar_bw_45deg.svg');
      background-attachment: fixed;
      background-position: top right;
      background-clip: border-box;
      background-origin: border-box;
      background-repeat: repeat;
      background-size: 300px;

      opacity: 0.15;
    }

    @include media-breakpoint-up(md) {
      animation: animate-right 60s linear infinite;
    }

    top: -300px;
    left: -300px;
    bottom: -300px;
    right: -300px;
    z-index: -2;

    position: fixed;
  }

  @keyframes animate-right {
    from {
      transform: scale(1.25) translate(-150px, 150px);
    }
    to {
      transform: scale(1.25) translate(150px, -150px);
    }
  }

  .circle {
    position: absolute;

    background-color: rgba(225, 225, 225, 0.3);
    backdrop-filter: blur(5px);
    z-index: -1;

    border-radius: 50%;

    height: 200px;
    width: 200px;

    @include media-breakpoint-up(md) {
      height: 275px;
      width: 275px;
    }

    @include media-breakpoint-up(lg) {
      height: 350px;
      width: 350px;
    }
  }

  .avatar {
    transition: filter .2s;
    height: 350px;

    @include media-breakpoint-up(md) {
      height: 425px;
    }

    @include media-breakpoint-up(lg) {
      height: 500px;
    }

    &:hover {
      filter: brightness(1.005) drop-shadow(0 0 0.2rem rgba(0, 0, 0, 0.5));
      transition: filter .2s;
    }
  }

  .text-box {
    background-color: rgba(225, 225, 225, 0.3);
    backdrop-filter: blur(7.5px);
    padding: 20px;
    width: 100%;
    max-width: 400px;
    border-radius: $border-radius-lg;
  }

  .social-iconbar {
    margin-bottom: 20px;
  }

  .github:hover {
    color: #000000
  }

  .spotify:hover {
    color: #1db954;
  }

  .facebook:hover {
    color: #3b5998;
  }

  .instagram:hover {
    color: #833ab4;
  }

  .social-iconbar-icon {
    transition: color .2s;

    margin: 10px;
    color: $gray-800;
  }

  .social-iconbar-icon:hover {
    transition: color .2s;
  }

  .link-box {
    margin: 10px;

    > a, > div > a {
      margin: 0 5px 0 5px;
      color: $gray-800;
    }
  }

  .pwa-install {
    animation: fadein 2s;

    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 20px;
    width: 100%;

    > p > a:hover {
      text-decoration: none;
    }
  }
</style>
