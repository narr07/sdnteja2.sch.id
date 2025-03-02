// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({ 
  modules: [   '@nuxt/content', '@nuxt/image', '@nuxthub/core', ],
  
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