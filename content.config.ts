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
        nama: z.string(),
        kelas: z.string(),
        foto: z.string(),
        catatan: z.string(),
        nip: z.string(),
        jabatan: z.string(),
        pendidikan: z.string(),
        pengalaman: z.string(),
      }),
    }),
  },
})
