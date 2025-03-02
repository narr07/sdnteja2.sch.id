// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({ 
  modules: ['@nuxt/ui',   '@nuxt/content', '@nuxt/image', '@nuxthub/core', ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
  },
  hub: {
    database: true,
  }, 
  content: {
    database: {
      type: 'd1',
      bindingName: 'teja2',
    },
  }, 
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
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