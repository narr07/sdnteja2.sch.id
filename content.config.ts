// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '*.md',
        prefix: '/',
      },
      schema: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    berita: defineCollection({
      type: 'page',
      source: {
        include: 'berita/*.md',
        prefix: '/berita',
      },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
      }),
    }),
    guru: defineCollection({
      type: 'page',
      source: {
        include: 'guru/*.yml',
        prefix: '/guru',
      },
      schema: z.object({
        nama: z.string(),
        lengkap: z.string(),
        catatan: z.string(),
        kelas: z.string(),
        foto: z.string().url(),
        jabatan: z.string(),
        pendidikan: z.string(),
        pelatihan: z.array(z.object({
          title: z.string(),
          tahun: z.string(),
        })),
        sosial: z.array(z.object({
          icon: z.string().editor({ input: 'icon' }),
          link: z.string(),
          alt: z.string(),
        })).max(4).optional(),
      }),
    }),
    artikel: defineCollection({
      type: 'page',
      source: {
        include: 'artikel/*.md',
        prefix: '/artikel',
      },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        date: z.date(),
        image: z.string().url(),
        tags: z.array(z.string()),
      }),
    }),
    kegiatan: defineCollection({
      type: 'page',
      source: {
        include: 'kegiatan/*.yml',
        prefix: '/kegiatan',
      },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        tag: z.string(),
        cover: z.string().url(),
      }),
    }),
    media: defineCollection({
      type: 'data',
      source: {
        include: 'media/**',
        prefix: '/media',
      },
      schema: z.object({
        title: z.string(),
        idVideo: z.string(),
        link: z.string(),
        kelas: z.enum(['1', '2', '3', '4', '5', '6']),
        pelajaran: z.string(),
      }),
    }),
  },
})
