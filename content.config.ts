import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
    }),
    guru: defineCollection({
      type: 'data',
      source: 'guru/**.yml',
      schema: z.object({
        name: z.string(),
        mataPelajaran: z.string(),
        kelas: z.string(),
        avatar: z.string(),
        url: z.string(),
      }),
    }),
  },
})
