
export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Rufus Maiwald | Portfolio',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Rufus Maiwald ist Java- und Webentwickler und studiert Informatik in München. Hier erfährst du mehr über ihn.' },
      { name: 'color-scheme', content: 'dark' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/fontawesome.js',
    '@/plugins/notifications.client.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-i18n'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** pwa module configuration
   */
  pwa: {
    icon: {
      fileName: 'icon.png'
    },
    meta: {
      mobileAppIOS: true,
      name: 'Rufus Maiwald | Portfolio',
      author: 'Rufus Maiwald',
      description: 'Rufus Maiwald ist Java- und Webentwickler und studiert Informatik in München. Hier erfährst du mehr über ihn.',
      theme_color: '#1a202c',
      ogHost: 'https://rufusmaiwald.de',
      nativeUI: true,
      ogImage: {
        path: '/og_img.png',
        width: '1200',
        height: '630',
        type: 'image/png'
      },
      twitterCard: 'summary_large_image',
      twitterCreator: '@rufusmai'
    },
    manifest: {
      name: 'Rufus Maiwald Portfolio',
      short_name: 'RM Portfolio',
      description: 'Rufus Maiwald ist Java- und Webentwickler und studiert Informatik in München. Hier erfährst du mehr über ihn.',
      background_color: '#1a202c',
      theme_color: '#1a202c'
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://api.github.com/users/rufusmaiwald/.*',
          handler: 'StaleWhileRevalidate',
          strategyOptions: {
            cacheName: 'gh-projects'
          },
          strategyPlugins: [{
            use: 'BroadcastUpdate',
            config: {
              headersToCheck: ['content-length', 'etag', 'last-modified']
            }
          }]
        }
      ],
      skipWaiting: true,
      autoRegister: true
    }
  },
  /*
  ** i18n module configuration
   */
  i18n: {
    baseUrl: 'https://rufusmaiwald.de',
    locales: [
      {
        code: 'de',
        name: 'Deutsch',
        file: 'de.js',
        iso: 'de'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.js',
        iso: 'en'
      }
    ],
    defaultLocale: 'de',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    lazy: true,
    langDir: 'lang/',
    seo: false
  },
  /*
  ** i18n module configuration
   */
  auth: {
    strategies: {
      local: false,
      social: {
        _scheme: 'oauth2',
        authorization_endpoint: 'https://id.onegaming.group/oauth2/authorize',
        userinfo_endpoint: 'https://id.onegaming.group/api/v1/user',
        scope: ['identify'],
        access_type: undefined,
        access_token_endpoint: undefined,
        response_type: 'token',
        token_type: 'Bearer',
        redirect_uri: undefined,
        client_id: '5f68b682e7db6e447df529f0',
        token_key: 'access_token'
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    extend (config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
