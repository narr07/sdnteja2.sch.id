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
    'nuxt-booster',
    '@nuxt/scripts',
    'nuxt-google-translate',
    'nuxt-llms',
    'motion-v/nuxt',
  ],
  experimental: {
    componentIslands: true,
  },
  linkChecker: {
    runOnBuild: false,
  },
  googleTranslate: {
    defaultLanguage: 'id',
    supportedLanguages: ['id', 'en', 'es', 'ru'],
  },
  site: {
    url: 'https://sdnteja2.sch.id/',
    name: 'SDN TEJA II',
    description: 'Website resmi SDN Teja II, Kecamatan Rajagaluh, Kabupaten Majalengka, Jawa Barat',
    defaultLocale: 'id', // not needed if you have @nuxtjs/i18n installed
    themeColor: '#F22727',
  },
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
  llms: {
    domain: 'https://sdnteja2.sch.id',
    title: 'SDN Teja II',
    description: 'Website resmi SDN Teja II, Kecamatan Rajagaluh, Kabupaten Majalengka, Jawa Barat',
    sections: [
      {
        title: 'Guru',
        description: 'Daftar Guru SDN Teja II',
        contentCollection: 'guru',
      },
      {
        title: 'Berita',
        description: 'Berita terbaru dari SDN Teja II',
        contentCollection: 'berita',
      },
      {
        title: 'Kegiatan',
        description: 'Kegiatan terbaru dari SDN Teja II',
        contentCollection: 'kegiatan',
      },
      {
        title: 'artikel',
        description: 'Artikel terbaru dari SDN Teja II',
        contentCollection: 'artikel',
      },
    ],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  image: {
    provider: 'ipx',
    format: ['webp', 'avif'],
    quality: 80,
    domains: ['nuxtjs.org', 'res.cloudinary.com', 'img.youtube.com', 'i.vimeocdn.com'],
    alias: {
      youtube: 'https://img.youtube.com',
      vimeo: 'https://i.vimeocdn.com',
    },
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
    presets: {
      hero: {
        modifiers: {
          format: 'webp',
          quality: 85,
          width: 1200,
          height: 675,
          fit: 'cover',
        },
      },
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
  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' },
  // },
  booster: {
    detection: {
      performance: true,
      browserSupport: true,
      battery: true,
    },
    performanceMetrics: {
      timing: {
        fcp: 800,
        dcl: 1200,
      },
    },
    optimizeSSR: {
      cleanPreloads: true,
      cleanPrefetches: true,
      inlineStyles: true,
    },
    /**
     * IntersectionObserver rootMargin for Compoennts and Assets
     */
    lazyOffset: {
      component: '0%',
      asset: '0%',
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
      openAPI: true,
    },
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    cloudinary: {
      apiKey: process.env.NUXT_CLOUDINARY_API_KEY || '747436524922873',
      apiSecret: process.env.NUXT_CLOUDINARY_API_SECRET || 'dunxYcRv6GQls_MqTPycjkJQH3E',
      cloudName: process.env.NUXT_CLOUDINARY_CLOUD_NAME || 'dyy24w5kl',
    },
    public: {
      cloudinaryBaseUrl: `https://res.cloudinary.com/${process.env.NUXT_CLOUDINARY_CLOUD_NAME || 'dyy24w5kl'}`,
    },
  },
})
