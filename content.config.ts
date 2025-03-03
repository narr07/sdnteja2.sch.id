import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {

    content: defineCollection({
      type: 'page',
      source: '**',
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
      type: 'data',
      source: 'guru/*.yml',
      schema: z.object({
        nama: z.string(),
        kelas: z.string(),
        foto: z.object({
          src: z.string().editor({ input: 'media' }),
          alt: z.string().default(function (this: { nama: string }) { return this.nama }), // alt diambil dari nama
        }),
        catatan: z.string(),
        nip: z.string(),
        jabatan: z.string(),
        pendidikan: z.string(),
        pengalaman: z.array(z.object({
          title: z.string(),
          tahun: z.string(),
        })),
      }),
    }),
  },
})
