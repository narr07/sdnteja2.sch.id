// content.config.ts
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
      navigation:
        z.object({
          icon: z.string().editor({ input: 'icon' }),
        }),

    }),
  }),
  berita: defineCollection({
    type: 'page',
    source: 'berita/*.md',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      tags: z.array(z.string(),
      ),
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
      lengkap: z.string(),
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
      sosial: z.array(z.object({
        icon: z.string().editor({ input: 'icon' }),
        link: z.string(),
        alt: z.string(),
      })).max(4),
    }),
  }),
  artikel: defineCollection({
    type: 'page',
    source: 'artikel/*.md',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      image: z.object({
        src: z.string().editor({ input: 'media' }),
      }),
      tags: z.array(z.string(),
      ),
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
  kegiatan: defineCollection({
    type: 'page',
    source: 'kegiatan/*.yml',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      foto: z.array(z.object({ src: z.string().editor({ input: 'media' }) })),
      cover: z.string().editor({ input: 'media' }),
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
  search: defineCollection({
    type: 'page',
    source: {
      include: '**/*.md',
      exclude: ['*.md'],
      prefix: '/',
    },
    schema: z.object({}),
  }),
}
