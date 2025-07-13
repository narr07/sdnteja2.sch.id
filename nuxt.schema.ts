import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    site: group({
      title: 'Site Configuration',
      description: 'Konfigurasi umum website',
      icon: 'i-ph-gear',
      fields: {
        copyright: field({
          type: 'string',
          title: 'Copyright',
          description: 'Teks copyright di footer',
          icon: 'i-ph-copyright',
          default: '© 2025 narr07. All rights reserved.',
        }),
        socialMedia: group({
          title: 'Social Media',
          description: 'Konfigurasi social media',
          icon: 'i-ph-share-network',
          fields: {
            email: group({
              title: 'Email',
              description: 'Konfigurasi email',
              icon: 'i-ph-envelope',
              fields: {
                title: field({
                  type: 'string',
                  title: 'Title',
                  description: 'Judul untuk email',
                  default: 'Email',
                }),
                icon: field({
                  type: 'icon',
                  title: 'Icon',
                  description: 'Icon untuk email',
                  default: 'i-ph-envelope',
                }),
                url: field({
                  type: 'string',
                  title: 'Email Link',
                  description: 'Link email (format: mailto:email@domain.com)',
                  default: 'mailto:sdsnteja2@gmail.com',
                }),
              },
            }),
            instagram: group({
              title: 'Instagram',
              description: 'Konfigurasi Instagram',
              icon: 'i-ph-instagram-logo',
              fields: {
                title: field({
                  type: 'string',
                  title: 'Title',
                  description: 'Judul untuk Instagram',
                  default: 'Instagram',
                }),
                icon: field({
                  type: 'icon',
                  title: 'Icon',
                  description: 'Icon untuk Instagram',
                  default: 'basil:instagram-outline',
                }),
                url: field({
                  type: 'string',
                  title: 'Instagram Link',
                  description: 'Link Instagram',
                  default: 'https://instagram.com/sdnteja2',
                }),
              },
            }),
          },
        }),
        government: group({
          title: 'Link Pemerintah',
          description: 'Konfigurasi link-link pemerintah',
          icon: 'i-ph-buildings',
          fields: {
            disdikMajalengka: group({
              title: 'DISDIK MAJALENGKA',
              description: 'Dinas Pendidikan Majalengka',
              icon: 'i-ph-building',
              fields: {
                title: field({
                  type: 'string',
                  title: 'Judul',
                  description: 'Judul section',
                  default: 'DISDIK MAJALENGKA',
                }),
                links: group({
                  title: 'Links',
                  description: 'Daftar link',
                  icon: 'i-ph-link',
                  fields: {
                    link1: group({
                      title: 'Link 1',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'Website Disdik Majalengka',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://disdik.majalengkakab.go.id/',
                        }),
                      },
                    }),
                    link2: group({
                      title: 'Link 2',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'Aplikasi Dapodik',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://dapo.kemdikbud.go.id/',
                        }),
                      },
                    }),
                    link3: group({
                      title: 'Link 3',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'PPDB Online',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://ppdb.majalengkakab.go.id/',
                        }),
                      },
                    }),
                    link4: group({
                      title: 'Link 4',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'E-Learning',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://elearning.majalengkakab.go.id/',
                        }),
                      },
                    }),
                  },
                }),
              },
            }),
            disdikJabar: group({
              title: 'DISDIK JABAR',
              description: 'Dinas Pendidikan Jawa Barat',
              icon: 'i-ph-building',
              fields: {
                title: field({
                  type: 'string',
                  title: 'Judul',
                  description: 'Judul section',
                  default: 'DISDIK JABAR',
                }),
                links: group({
                  title: 'Links',
                  description: 'Daftar link',
                  icon: 'i-ph-link',
                  fields: {
                    link1: group({
                      title: 'Link 1',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'Website Disdik Jabar',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://disdik.jabarprov.go.id/',
                        }),
                      },
                    }),
                    link2: group({
                      title: 'Link 2',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'Jabar Digital Service',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://digitalservice.jabarprov.go.id/',
                        }),
                      },
                    }),
                    link3: group({
                      title: 'Link 3',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'SIAP Online',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://siap-online.com/',
                        }),
                      },
                    }),
                    link4: group({
                      title: 'Link 4',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'Portal Data Jabar',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://opendata.jabarprov.go.id/',
                        }),
                      },
                    }),
                  },
                }),
              },
            }),
            kemdikdasmen: group({
              title: 'KEMDIKDASMEN',
              description: 'Kementerian Pendidikan Dasar dan Menengah',
              icon: 'i-ph-building',
              fields: {
                title: field({
                  type: 'string',
                  title: 'Judul',
                  description: 'Judul section',
                  default: 'KEMDIKDASMEN',
                }),
                links: group({
                  title: 'Links',
                  description: 'Daftar link',
                  icon: 'i-ph-link',
                  fields: {
                    link1: group({
                      title: 'Link 1',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'Website Kemdikdasmen',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://ditpsd.kemdikbud.go.id/',
                        }),
                      },
                    }),
                    link2: group({
                      title: 'Link 2',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'Merdeka Belajar',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://merdekabelajar.kemdikbud.go.id/',
                        }),
                      },
                    }),
                    link3: group({
                      title: 'Link 3',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'Platform Merdeka Mengajar',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://guru.kemdikbud.go.id/',
                        }),
                      },
                    }),
                    link4: group({
                      title: 'Link 4',
                      fields: {
                        name: field({
                          type: 'string',
                          title: 'Nama',
                          default: 'ANBK',
                        }),
                        url: field({
                          type: 'string',
                          title: 'URL',
                          default: 'https://anbk.kemdikbud.go.id/',
                        }),
                      },
                    }),
                  },
                }),
              },
            }),
          },
        }),
      },
    }),
  },
})
