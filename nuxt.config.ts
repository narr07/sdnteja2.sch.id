// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/image',
    'nuxt-aos',
  ],

  experimental: {
    componentIslands: true,
    viewTransition: true,
  },
  linkChecker: {
    runOnBuild: false,
  },
  site: {
    url: 'https://sdnteja2.sch.id/',
    name: 'SDN TEJA II',
    description: 'Website resmi SDN Teja II, Kecamatan Rajagaluh, Kabupaten Majalengka, Jawa Barat',
    defaultLocale: 'id', // not needed if you have @nuxtjs/i18n installed
    themeColor: '#F22727',
  },

  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    storageKey: 'nuxt-color-mode', // key used to store the color mode preference
    classSuffix: '',
    classPrefix: '',
    dataValue: 'light',
  },
  hub: {
    database: true,

  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio',
      dev: true,
    },
    database: {
      type: 'd1',
      bindingName: 'teja2',
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  image: {

    format: ['webp'],
    domains: ['nuxtjs.org', 'res.cloudinary.com'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
  },
  icon: {
    customCollections: [
      {
        prefix: 'narr',
        dir: './app/assets/icons',
      },
    ],
  },
  app: {
    head: {
      titleTemplate: '%s %separator %siteName',
      templateParams: {
        separator: '—', // choose a separator
        siteName: 'SDN Teja II', // set a site name
      },
    },
  },
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      // ignore: ['/api/**', '/kegiatan/**'],
    },
    experimental: {
      websocket: true,
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

})
