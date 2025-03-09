/* eslint-disable node/prefer-global/process */
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
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dyy24w5kl/image/upload',
    },
    format: ['webp'],
    domains: ['nuxtjs.org', 'res.cloudinary.com'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
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
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      ignore: ['/api/**'],
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
  routeRules: {
    'kegiatan/**': { isr: true },
    '/api/**': { cors: true },
  },
  runtimeConfig: {
    // Variabel yang hanya tersedia di server-side
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    // Variabel public yang dapat diakses dari client-side
    public: {
      apiBase: '/api', // Contoh variabel public
    },
  },
})
