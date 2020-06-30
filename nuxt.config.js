module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#2076d2', height: '2px' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/font.css',
    '~assets/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/globals'},
    { src: '~/plugins/globals-no-ssr', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    ['vue-yandex-maps/nuxt', {
      /* module options */
      apiKey: '634a4343-4972-4dca-9900-7b71b3494424',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1'
    }],
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '65193604',
        webvisor: true,
      }
    ],
    ['@nuxtjs/pwa']
  ],

  vuetify: {
    treeShake: false,
    defaultAssets: false
  },
  env: {
    host_name: process.env.HOST_NAME || 'https://avtoridel.by',
    site_name: process.env.SITE_NAME || 'Avtoridel',
    site_token: process.env.SITE_TOKEN || 'e9205276-6370-42b7-8424-d31c4bb6a4cf'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:5000',
    // baseURL: 'https://avtoridel.by/'
  },

  pruneHtml: {
    hideErrorsInConsole: false,
    hideGenericMessagesInConsole: false, // Disabled in production
    enabled: false, // Disabled in dev-mode due to the hot reload (is client-side)
    selectors: [ // Css selectors to prune
      'link[rel="preload"][as="script"]',
      'script:not([type="application/ld+json"])',
    ],
    selectorToKeep: null, // Disallow pruning of scripts with this class, N.B.: this selector will be appended to every selectors, `ex. script:not([type="application/ld+json"]):not(__VALUE__)`
    script: [], // Inject custom scripts only for matched UA (BOTS-only)
    link: [], // Inject custom links only for matched UA (BOTS-only)
    cheerio: { // It use Cheerio under the hood, so this is the config passed in the cheerio.load() method
      xmlMode: false,
    },
    ignoreBotOrLighthouse: false, // Remove selectors in any case, not depending on Bot or Lighthouse
    isBot: true, // Remove selectors if is a bot
    isLighthouse: true, // Remove selectors if match the Lighthouse UserAgent
    matchUserAgent: null, // Remove selectors if this userAgent is matched, either as String or RegExp (a string will be converted to a case-insensitive RegExp in the MobileDetect library)
    hookRenderRoute: true, // Activate the prune during the `hook:render:route`
    hookGeneratePage: true, // Activate the prune during the `hook:generate:page`
    lighthouseUserAgent: 'lighthouse', // Value of the Lighthouse UserAgent, either as String or RegExp (a string will be converted to a case-insensitive RegExp in the MobileDetect library)
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}