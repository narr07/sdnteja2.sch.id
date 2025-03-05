import { defineCollection, z } from '@nuxt/content'

export const collections = {
  content: defineCollection({
    type: 'page',
    source: {
      include: '*.md',
      exclude: ['berita/**', 'guru/**'],
      prefix: '/',
    },
    schema: z.object({
      title: z.string(),
      description: z.string(),
      seo: z.intersection(
        z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          meta: z.array(z.record(z.string(), z.any())).optional(),
          link: z.array(z.record(z.string(), z.any())).optional(),
        }),
        z.record(z.string(), z.any()),
      ).optional().default({}).editor({ hidden: true }),
      navigation: z.union([
        z.boolean(),
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        }),
      ]).default(true).editor({ hidden: true }),
    }),
  }),

  berita: defineCollection({
    type: 'page',
    source: 'berita/*.md',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      image: z.object({
        src: z.string().editor({ input: 'media' }),
        alt: z.string(),
      }),
      seo: z.intersection(
        z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          meta: z.array(z.record(z.string(), z.any())).optional(),
          link: z.array(z.record(z.string(), z.any())).optional(),
        }),
        z.record(z.string(), z.any()),
      ).optional().default({}).editor({ hidden: true }),
      navigation: z.union([
        z.boolean(),
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        }),
      ]).default(true).editor({ hidden: true }),
    }),
  }),
  guru: defineCollection({
    type: 'page',
    source: 'guru/*.yml',
    schema: z.object({
      title: z.string().editor({ hidden: true }),
      description: z.string().editor({ hidden: true }),
      seo: z.intersection(
        z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          meta: z.array(z.record(z.string(), z.any())).optional(),
          link: z.array(z.record(z.string(), z.any())).optional(),
        }),
        z.record(z.string(), z.any()),
      ).optional().default({}).editor({ hidden: true }),
      navigation: z.union([
        z.boolean(),
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        }),
      ]).default(true).editor({ hidden: true }),
      nama: z.string(),
      catatan: z.string(),
      kelas: z.string(),
      foto: z.string().editor({ input: 'media' }),
      nip: z.string(),
      nuptk: z.string(),
      jabatan: z.string(),
      pendidikan: z.string(),
      pelatihan: z.array(z.object({
        title: z.string(),
        tahun: z.string(),
      })),
    }),
  }),
}
