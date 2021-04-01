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
      { hid: 'description', name: 'description', content: 'Rufus Maiwald ist Java- und Webentwickler und studiert Informatik in München. Hier erfährst du mehr über ihn.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://rufusmai-analytics.herokuapp.com/umami.js',
        async: true,
        defer: true,
        'data-website-id': 'c2a24943-137f-468a-91a1-d219221f7bf9',
        'data-domains': 'rufusmai.com'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/notifications.client.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: false,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxtjs/auth-next',
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
      theme_color: '#18181b',
      ogHost: 'https://rufusmai.com',
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
      short_name: 'rufusmai',
      description: 'Rufus Maiwald ist Java- und Webentwickler und studiert Informatik in München. Hier erfährst du mehr über ihn.',
      background_color: '#18181b',
      theme_color: '#18181b'
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
    baseUrl: 'https://rufusmai.com',
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
  ** auth module configuration
   */
  auth: {
    strategies: {
      local: false,
      onegamingId: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://id.onegaming.group/api/v1/oauth2/authorize',
          token: 'https://id.onegaming.group/api/v1/oauth2/token',
          userInfo: 'https://id.onegaming.group/api/v1/user'
        },
        clientId: '5f68b682e7db6e447df529f0',
        scope: ['openid', 'profile']
      }
    },
    cookie: false,
    redirect: {
      logout: false
    }
  },
  /*
  ** tailwindcss module configuration
   */
  tailwindcss: {
    jit: false
  },
  /*
  ** color mode module configuration
   */
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    classSuffix: ''
  },
  /*
  ** google fonts module configuration
   */
  googleFonts: {
    families: {
      'Noto+Sans+SC': [400, 600, 700]
    },
    display: 'swap'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ]
  }
}
