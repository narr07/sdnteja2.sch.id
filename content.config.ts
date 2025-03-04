import { defineCollection, z } from '@nuxt/content'

export const collections = {
  content: defineCollection({
    type: 'page',
    source: {
      include: '*.md',
      exclude: ['berita/**', 'guru/**'],
      prefix: '/',
    },
  }),
  berita: defineCollection({
    type: 'page',
    source: 'berita/*.md',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean().default(false),
      category: z.enum(['Alps', 'Himalaya', 'Pyrenees']).optional(),
      date: z.date(),
      image: z.object({
        src: z.string().editor({ input: 'media' }),
        alt: z.string(),
      }),
      icon: z.string().optional().editor({ input: 'icon' }),
      authors: z.array(z.string()).describe('References to guru entries by name'),
    }),
  }),
  guru: defineCollection({
    type: 'data',
    source: 'guru/*.yml',
    schema: z.object({
      name: z.string(),
      class: z.string(),
      photo: z.string().editor({ input: 'media' }),
      notes: z.string(),
      nip: z.string(),
      nuptk: z.string(),
      position: z.string(),
      education: z.string(),
      training: z.array(z.object({
        title: z.string(),
        year: z.string(),
      })),
    }),
  }),
}
