// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  sourcemap: {
    server: false,
    client: true,
  },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/content', '@nuxt/image', '@nuxthub/core'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
  },
  hub: {
    database: true,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  content: {
    database: {
      type: 'd1',
      bindingName: 'teja2',
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
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
})
