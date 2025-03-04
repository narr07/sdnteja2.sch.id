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
      slug: z.string().editor({ hidden: true }),
      icon: z.string().optional().editor({ input: 'icon' }),
      authors: z.array(z.object({
        slug: z.string(),
        username: z.string(),
        name: z.string(),
        to: z.string(),
        avatar: z.object({
          src: z.string(),
          alt: z.string(),
        }),
      })),
    }),
  }),
  guru: defineCollection({
    type: 'page',
    source: 'guru/*.yml',
    schema: z.object({
      nama: z.string(),
      kelas: z.string(),
      foto: z.string().editor({ input: 'media' }),
      catatan: z.string(),
      nip: z.string(),
      nuptk: z.string(),
      jabatan: z.string(),
      pendidikan: z.string(),
      pelatihan: z.array(z.object({
        title: z.string(),
        tahun: z.string(),
      }),
      ),
    }),
  }),
}
