/* eslint-disable node/prefer-global/process */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@nuxtjs/color-mode', // Tambahkan eksplisit untuk color mode
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
    payloadExtraction: false,
    // Optimasi untuk mengurangi network requests
    writeEarlyHints: true,
    // Reduce initial bundle size
    treeshakeClientOnly: true,
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
    dataValue: 'theme',
    // Tambahkan konfigurasi untuk menghindari hydration mismatch
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    storage: 'localStorage',
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
    // Reduce icon API requests dengan bundling
    clientBundle: {
      // Pre-bundle commonly used icons
      icons: [
        'heroicons:chat-bubble-left-right',
        'solar:sun-2-linear',
        'lucide:check',
        'heroicons:bars-3',
        'heroicons:x-mark',
        'heroicons:chevron-down',
        'heroicons:chevron-up',
        'heroicons:chevron-right',
        'heroicons:chevron-left',
      ],
      // Scan components for icons to prebundle
      scan: true,
      // Bundle size limit
      sizeLimitKb: 256,
    },
  },

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
     * IntersectionObserver rootMargin for Components and Assets
     */
    lazyOffset: {
      component: '0%',
      asset: '0%',
    },
    // Optimasi untuk target format images
    targetFormats: ['webp', 'avif', 'jpg', 'png', 'gif'],
  },
  ssr: true,
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
    // Bundle splitting untuk mengurangi ukuran JavaScript
    rollupConfig: {
      output: {
        manualChunks: {
          vendor: ['vue', '@vue/runtime-core'],
          ui: ['@nuxt/ui'],
          content: ['@nuxt/content'],
          icons: ['@iconify/vue', '@nuxt/icon'],
        },
      },
    },
    // Konfigurasi cache headers untuk meningkatkan performa
    routeRules: {
      // Static assets cache untuk 1 tahun
      '/_nuxt/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
      // Public assets cache untuk 1 bulan
      '/assets/**': {
        headers: {
          'cache-control': 'public, max-age=2592000',
        },
      },
      // Images cache untuk 1 bulan
      '/*.png': {
        headers: {
          'cache-control': 'public, max-age=2592000',
        },
      },
      '/*.jpg': {
        headers: {
          'cache-control': 'public, max-age=2592000',
        },
      },
      '/*.jpeg': {
        headers: {
          'cache-control': 'public, max-age=2592000',
        },
      },
      '/*.webp': {
        headers: {
          'cache-control': 'public, max-age=2592000',
        },
      },
      '/*.svg': {
        headers: {
          'cache-control': 'public, max-age=2592000',
        },
      },
      '/*.ico': {
        headers: {
          'cache-control': 'public, max-age=2592000',
        },
      },
      // JavaScript dan CSS files cache untuk 1 bulan
      '/*.js': {
        headers: {
          'cache-control': 'public, max-age=2592000',
        },
      },
      '/*.css': {
        headers: {
          'cache-control': 'public, max-age=2592000',
        },
      },
      // Fonts cache untuk 1 tahun
      '/*.woff': {
        headers: {
          'cache-control': 'public, max-age=31536000',
        },
      },
      '/*.woff2': {
        headers: {
          'cache-control': 'public, max-age=31536000',
        },
      },
      '/*.ttf': {
        headers: {
          'cache-control': 'public, max-age=31536000',
        },
      },
      // Homepage dan halaman utama cache untuk 1 jam dengan revalidation
      '/': {
        headers: {
          'cache-control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
      // Halaman konten cache untuk 1 jam
      '/artikel/**': {
        headers: {
          'cache-control': 'public, max-age=3600, s-maxage=3600',
        },
      },
      '/berita/**': {
        headers: {
          'cache-control': 'public, max-age=3600, s-maxage=3600',
        },
      },
      '/guru/**': {
        headers: {
          'cache-control': 'public, max-age=3600, s-maxage=3600',
        },
      },
      '/kegiatan/**': {
        headers: {
          'cache-control': 'public, max-age=3600, s-maxage=3600',
        },
      },
      // SQL dump files - cache lebih lama untuk mengurangi requests
      '/**/*.sql_dump.txt': {
        headers: {
          'cache-control': 'public, max-age=86400',
        },
      },
    },
  },
  css: ['~/assets/css/main.css'],
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
