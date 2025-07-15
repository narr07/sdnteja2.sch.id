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
    'nuxt-charts',
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
    ai: true,
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio',
      dev: true,
    },
    // Hapus konfigurasi database untuk menggunakan file system
    database: {
      type: 'd1',
      bindingName: 'teja2',
    },
  },
  llms: {
    domain: 'https://sdnteja2.sch.id',
    title: 'SDN Teja II - Sekolah Dasar Negeri Teja II',
    description: 'Website resmi SDN Teja II, Kecamatan Rajagaluh, Kabupaten Majalengka, Jawa Barat. Sekolah dasar yang berkomitmen memberikan pendidikan berkualitas dengan tenaga pendidik profesional.',
    sections: [
      {
        title: 'Profil Guru dan Tenaga Pendidik',
        description: 'Daftar lengkap guru dan tenaga pendidik SDN Teja II dengan informasi jabatan, pendidikan, kelas yang diajar, dan pengalaman pelatihan profesional. Termasuk data kepala sekolah, guru kelas, dan staf pendidikan lainnya.',
        contentCollection: 'guru',
        contentFilters: [
          { field: 'extension', operator: '=', value: 'yml' },
        ],
      },
      {
        title: 'Berita dan Pengumuman Sekolah',
        description: 'Berita terbaru, pengumuman resmi, dan informasi penting dari SDN Teja II termasuk kegiatan akademik, kebijakan sekolah, dan perkembangan institusi. Mencakup informasi ANBK, pergantian kepala sekolah, dan jadwal pembelajaran.',
        contentCollection: 'berita',
        contentFilters: [
          { field: 'extension', operator: '=', value: 'md' },
        ],
      },
      {
        title: 'Kegiatan dan Program Sekolah',
        description: 'Dokumentasi kegiatan sekolah, program ekstrakurikuler, acara khusus, dan berbagai aktivitas yang dilaksanakan di SDN Teja II. Termasuk serah terima jabatan, kegiatan kebersihan, dan program pengembangan karakter siswa.',
        contentCollection: 'kegiatan',
        contentFilters: [
          { field: 'extension', operator: '=', value: 'yml' },
        ],
      },
      {
        title: 'Artikel Pendidikan dan Informasi Umum',
        description: 'Artikel edukatif, panduan pendidikan, informasi PPDB/SPMB, sejarah pendidikan, rapor pendidikan, dan konten informatif lainnya yang relevan dengan dunia pendidikan dasar di Indonesia.',
        contentCollection: 'artikel',
        contentFilters: [
          { field: 'extension', operator: '=', value: 'md' },
        ],
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
