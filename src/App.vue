<template>
  <div id="app" :class="bg ? 'bg' : ''">
    <b-container fluid class="grid">
      <b-row class="grid align-items-end justify-content-center">
        <b-col md="12" xl="9">
          <b-row>
            <b-col sm="12" md="6" class="d-flex align-items-center justify-content-center p-5 p-md-0">
              <div class="circle"></div>
              <img class="d-flex avatar" alt="Rufus Maiwald" src="@/assets/avatar.svg">
            </b-col>
            <b-col class="d-flex align-items-center justify-content-center">
              <div class="content w-100 text-center">
                <h1>Rufus Maiwald</h1>
                <p class="mb-2">
                  Java- & Webentwickler, DJ
                </p>
                <div class="social-iconbar">
                  <a v-for="icon in socialIcons" v-bind:key="icon.url" :href="icon.url" aria-label="Social Media Profil öffnen" rel="noopener" target="_blank">
                    <fai :icon="icon.icon" class="social-iconbar-icon" :class="icon.name" size="lg"/>
                  </a>
                </div>
                <div class="text-box mx-auto">
                  <transition name="fade" mode="out-in" @beforeLeave="beforeLeave" @enter="enter"
                              @afterEnter="afterEnter">
                    <router-view/>
                  </transition>
                </div>
                <div class="link-box">
                  <router-link to="/contact">Kontakt</router-link>
                  ·
                  <router-link to="/projects">Projekte</router-link>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <div class="footer text-muted">
          <p class="p-3">
            Entwickelt mit
            <a href="https://vuejs.org/" aria-label="Vue.js Seite öffnen" rel="noopener" target="_blank"><fai :icon="['fab', 'vuejs']" style="color: #3c9162"/></a>
            und <span class="text-danger">&hearts;</span> von Rufus Maiwald.
            <wbr>
            <a href="https://github.com/rufusmaiwald/rufusmaiwald.de" rel="noopener" target="_blank">
              <span style="color: #35495e">Auf <fai :icon="['fab', 'github']"/> ansehen</span>
            </a>
          </p>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    export default {
        data: function () {
            return {
                bg: false,
                transitionName: 'slide-left',
                prevHeight: 0,
                prevWidth: 0,
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
                this.prevHeight = getComputedStyle(element).height;
            },
            enter(element) {
                const {height} = getComputedStyle(element);
                element.style.height = this.prevHeight;

                setTimeout(() => {
                    element.style.height = height;
                });
            },
            afterEnter(element) {
                element.style.height = 'auto';
            }
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
    content: "";

    transition: background 1s;

    background-image: url('assets/rufi_bg_avatar_bw_45deg.svg');
    background-attachment: fixed;
    background-position: center;
    background-clip: border-box;
    background-origin: border-box;
    background-repeat: repeat;
    background-size: 300px;

    opacity: 0.15;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -2;

    position: fixed;
  }

  .bg:after {
    background-image: url('assets/rufi_bg_avatar_bw_-45deg.svg') !important;
    transition: background 1s;
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
  }

  .avatar:hover {
    filter: brightness(1.05);
    transition: filter .2s;
  }

  .text-box {
    background-color: rgba(225, 225, 225, 0.3);
    backdrop-filter: blur(7.5px);
    padding: 20px;
    width: 100%;
    max-width: 400px;
    min-height: 280px;
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

    > a {
      margin: 0 5px 0 5px;
      color: $gray-800;
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
