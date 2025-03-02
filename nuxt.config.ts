// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({ 
  modules: [    ],
    
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