import { getLLMSData } from '../utils/llms-cache'

export default defineEventHandler(async (event) => {
  const { question } = await readBody(event)
  const llmsData = await getLLMSData()
  const ai = hubAI()

  // Cari data dari content collections
  let contentData = ''

  try {
    // Cari semua guru
    const guruResults = await queryCollection(event, 'guru').all()

    // Debug: Log data guru
    console.error('Data guru yang ditemukan:', JSON.stringify(guruResults, null, 2))

    if (guruResults && guruResults.length > 0) {
      contentData += 'DATA GURU SDN TEJA II:\n'
      contentData += guruResults.map((guru: any) =>
        `${guru.nama || ''} (${guru.lengkap || guru.nama || ''}):
- Jabatan: ${guru.jabatan || '-'}
- Kelas: ${guru.kelas || '-'}
- Pendidikan: ${guru.pendidikan || '-'}
- Catatan: ${guru.catatan || '-'}
- Pelatihan: ${guru.pelatihan ? guru.pelatihan.map((p: any) => `${p.title} (${p.tahun})`).join(', ') : 'Tidak ada'}`,
      ).join('\n\n')
    }

    // Cari semua kegiatan
    const kegiatanResults = await queryCollection(event, 'kegiatan').all()

    if (kegiatanResults && kegiatanResults.length > 0) {
      contentData += '\n\nDATA KEGIATAN SDN TEJA II:\n'
      contentData += kegiatanResults.map((kegiatan: any) =>
        `${kegiatan.title || ''}:
- Deskripsi: ${kegiatan.description || '-'}
- Tanggal: ${kegiatan.date ? new Date(kegiatan.date).toLocaleDateString('id-ID') : '-'}
- Tag: ${kegiatan.tag || '-'}`,
      ).join('\n\n')
    }

    // Cari semua berita
    const beritaResults = await queryCollection(event, 'berita').all()

    if (beritaResults && beritaResults.length > 0) {
      contentData += '\n\nDATA BERITA SDN TEJA II:\n'
      contentData += beritaResults.slice(0, 5).map((berita: any) =>
        `${berita.title || ''}:
- Deskripsi: ${berita.description || '-'}
- Tanggal: ${berita.date ? new Date(berita.date).toLocaleDateString('id-ID') : '-'}`,
      ).join('\n\n')
    }

    // Cari semua artikel
    const artikelResults = await queryCollection(event, 'artikel').all()

    if (artikelResults && artikelResults.length > 0) {
      contentData += '\n\nDATA ARTIKEL SDN TEJA II:\n'
      contentData += artikelResults.slice(0, 3).map((artikel: any) =>
        `${artikel.title || ''}:
- Deskripsi: ${artikel.description || '-'}
- Author: ${artikel.author || '-'}
- Tanggal: ${artikel.date ? new Date(artikel.date).toLocaleDateString('id-ID') : '-'}`,
      ).join('\n\n')
    }
  }
  catch (error) {
    console.error('Error fetching content:', error)
  }

  // Debug: Log contentData yang akan dikirim ke AI
  console.error('Content data yang dikirim ke AI:', contentData)

  const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: `Kamu adalah asisten AI untuk website SDN Teja II. Jawab pertanyaan berdasarkan data berikut.

DATA LENGKAP SDN TEJA II:
${contentData}

INFORMASI WEBSITE LAINNYA:
${llmsData}

PANDUAN MENJAWAB:
- Jawab dalam bahasa Indonesia yang ramah dan informatif
- Jika menanyakan tentang wali kelas, cari di data guru dan sebutkan nama lengkap guru serta kelasnya
- Jika menanyakan tentang jabatan guru, berikan informasi lengkap dari data guru
- Jika menanyakan tentang guru tertentu, berikan informasi lengkap termasuk jabatan, pendidikan, dan kelas yang diajar
- Jika menanyakan tentang kegiatan sekolah, berikan informasi dari data kegiatan
- Jika menanyakan tentang berita, berikan informasi dari data berita
- Gunakan data yang tersedia di atas untuk menjawab pertanyaan dengan akurat
- Jika informasi tidak tersedia di data, jelaskan bahwa data tersebut belum tersedia

CONTOH JAWABAN YANG BENAR:
- Pertanyaan: "Wali kelas 5 siapa?" 
  Jawaban: "Berdasarkan data guru SDN Teja II, wali kelas 5 adalah [nama guru lengkap]. Beliau bertugas sebagai [jabatan] dengan latar belakang pendidikan [pendidikan]."

PERTANYAAN: ${question}

JAWABAN:`,
  })

  return { result: response }
})
