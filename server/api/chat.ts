// server/api/chat.ts
import { streamText } from 'ai'
import { createWorkersAI } from 'workers-ai-provider'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  // Ambil data dari semua collection
  let allData = ''

  try {
    // Data Guru
    const guruResults = await queryCollection(event, 'guru').all()
    if (guruResults && guruResults.length > 0) {
      allData += 'DATA GURU SDN TEJA II:\n'
      allData += guruResults.map((guru: any) =>
        `${guru.nama || ''} (${guru.lengkap || guru.nama || ''}):
- Jabatan: ${guru.jabatan || '-'}
- Kelas: ${guru.kelas || '-'}
- Pendidikan: ${guru.pendidikan || '-'}
- Catatan: ${guru.catatan || '-'}
- Pelatihan: ${guru.pelatihan ? guru.pelatihan.map((p: any) => `${p.title} (${p.tahun})`).join(', ') : 'Tidak ada'}`,
      ).join('\n\n')
      allData += '\n\n'
    }

    // Data Berita
    const beritaResults = await queryCollection(event, 'berita').all()
    if (beritaResults && beritaResults.length > 0) {
      allData += '=== DATA BERITA SDN TEJA II ===\n'
      allData += beritaResults.map((berita: any) =>
        `BERITA: ${berita.title || ''}
- Deskripsi: ${berita.description || '-'}
- Tanggal: ${berita.date ? new Date(berita.date).toLocaleDateString('id-ID') : '-'}
- Author: ${berita.author || '-'}
- Kategori: BERITA`,
      ).join('\n\n')
      allData += '\n\n'
    }

    // Data Artikel
    const artikelResults = await queryCollection(event, 'artikel').all()
    if (artikelResults && artikelResults.length > 0) {
      allData += '=== DATA ARTIKEL SDN TEJA II ===\n'
      allData += artikelResults.map((artikel: any) =>
        `ARTIKEL: ${artikel.title || ''}
- Deskripsi: ${artikel.description || '-'}
- Author: ${artikel.author || '-'}
- Tanggal: ${artikel.date ? new Date(artikel.date).toLocaleDateString('id-ID') : '-'}
- Kategori: ARTIKEL`,
      ).join('\n\n')
      allData += '\n\n'
    }

    // Data Kegiatan
    const kegiatanResults = await queryCollection(event, 'kegiatan').all()
    if (kegiatanResults && kegiatanResults.length > 0) {
      allData += 'DATA KEGIATAN SDN TEJA II:\n'
      allData += kegiatanResults.map((kegiatan: any) =>
        `${kegiatan.title || ''}:
- Deskripsi: ${kegiatan.description || '-'}
- Tanggal: ${kegiatan.date ? new Date(kegiatan.date).toLocaleDateString('id-ID') : '-'}
- Tag: ${kegiatan.tag || '-'}`,
      ).join('\n\n')
      allData += '\n\n'
    }

    // Data Media
    const mediaResults = await queryCollection(event, 'media').all()
    if (mediaResults && mediaResults.length > 0) {
      allData += 'DATA MEDIA SDN TEJA II:\n'
      allData += mediaResults.map((media: any) =>
        `${media.title || ''}:
- Deskripsi: ${media.description || '-'}
- Kelas: ${media.kelas || '-'}
- Mata Pelajaran: ${media.mapel || '-'}`,
      ).join('\n\n')
      allData += '\n\n'
    }
  }
  catch (error) {
    console.error('Error fetching collections:', error)
    allData = 'Maaf, terjadi kesalahan saat mengambil data sekolah.'
  }

  // Debug: Log data yang berhasil diambil
  console.error('Data yang akan dikirim ke AI:', allData.substring(0, 500))

  const systemPrompt = `Kamu adalah JADU AI, asisten AI untuk website SDN Teja II. Jawab pertanyaan berdasarkan data lengkap sekolah berikut:

${allData}

PENTING - PERBEDAAN DATA:
- BERITA: Informasi terkini tentang kegiatan/peristiwa sekolah
- ARTIKEL: Tulisan edukatif/informatif yang lebih mendalam
- GURU: Data lengkap staff pengajar dan jabatan mereka
- KEGIATAN: Event/acara yang dilaksanakan sekolah
- MEDIA: Materi pembelajaran dan media edukatif

PANDUAN MENJAWAB:
- Nama kamu JADU AI, asisten AI untuk website SDN Teja II
- Jawab dalam bahasa Indonesia yang ramah dan informatif
- WAJIB bedakan antara BERITA dan ARTIKEL - jangan salah kategori!
- Jika menanyakan tentang wali kelas, sebutkan nama lengkap guru dari data di atas
- Jika menanyakan tentang guru tertentu, berikan informasi lengkap
- Jika ditanya artikel terbaru, ambil dari bagian "DATA ARTIKEL" saja
- Jika ditanya berita terbaru, ambil dari bagian "DATA BERITA" saja
- Gunakan data yang tersedia di atas untuk menjawab dengan akurat
- Jika informasi tidak tersedia, jelaskan bahwa data tersebut belum tersedia di sistem

Jika pertanyaan di luar data sekolah, jawab 'Maaf, saya hanya bisa menjawab seputar SDN Teja II.'`

  const fullMessages = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ]
  const workersAI = createWorkersAI({ binding: hubAI() })
  return streamText({
    model: workersAI('@cf/meta/llama-3.1-8b-instruct'),
    messages: fullMessages,
  }).toDataStreamResponse()
})
