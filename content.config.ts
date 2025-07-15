// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Reusable Schema Components
const SEO = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  meta: z.array(z.record(z.string(), z.any())).optional(),
  link: z.array(z.record(z.string(), z.any())).optional(),
})

const Navigation = z.union([
  z.boolean(),
  z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().editor({ input: 'icon' }),
  }),
]).default(true)

const SocialLink = z.object({
  icon: z.string().editor({ input: 'icon' }),
  link: z.string(),
  alt: z.string(),
})

const Pelatihan = z.object({
  title: z.string(),
  tahun: z.string(),
})

// Base Schema untuk semua content
const BaseContentSchema = z.object({
  title: z.string().editor({ hidden: true }),
  description: z.string().editor({ hidden: true }),
  seo: z.intersection(SEO, z.record(z.string(), z.any())).optional().editor({ hidden: true }),
  navigation: Navigation.editor({ hidden: true }),
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '*.md',
        exclude: ['berita/**', 'artikel/**', 'guru/**', 'kegiatan/**', 'media/**'],
        prefix: '/',
      },
      schema: BaseContentSchema.extend({
        title: z.string(), // Override: show title
        description: z.string(), // Override: show description
      }).pick({ title: true, description: true }),
    }),
    berita: defineCollection({
      type: 'page',
      source: {
        include: 'berita/*.md',
        prefix: '/berita',
      },
      schema: BaseContentSchema.extend({
        title: z.string(), // Override: show title
        description: z.string(), // Override: show description
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
        foto: z.string().editor({ input: 'media' }),
        jabatan: z.string(),
        pendidikan: z.string(),
        pelatihan: z.array(Pelatihan),
        sosial: z.array(SocialLink).max(4).optional(),
      }),
    }),
    artikel: defineCollection({
      type: 'page',
      source: {
        include: 'artikel/*.md',
        prefix: '/artikel',
      },
      schema: BaseContentSchema.extend({
        title: z.string(), // Override: show title
        description: z.string(), // Override: show description
        author: z.string(),
        date: z.date(),
        image: z.string().editor({ input: 'media' }),
        tags: z.array(z.string()),
      }),
    }),
    kegiatan: defineCollection({
      type: 'page',
      source: {
        include: 'kegiatan/*.yml',
        prefix: '/kegiatan',
      },
      schema: BaseContentSchema.extend({
        title: z.string(), // Override: show title
        description: z.string(), // Override: show description
        date: z.date(),
        tag: z.string(),
        cover: z.string().editor({ input: 'media' }),
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
