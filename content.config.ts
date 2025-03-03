import { defineCollection, z } from '@nuxt/content'

export const collections = ({

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

})
