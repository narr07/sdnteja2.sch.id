// server/api/chat.ts
import { streamText } from 'ai'
import { createWorkersAI } from 'workers-ai-provider'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  // Ambil data dari semua collection
  let allData = ''

  // Ambil data dari llms.txt yang digenerate otomatis
  let llmsData = ''

  try {
    // Coba ambil data dari /llms.txt
    const llmsResponse = await $fetch('/llms.txt', {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
      },
    })
    if (llmsResponse) {
      llmsData = typeof llmsResponse === 'string' ? llmsResponse : JSON.stringify(llmsResponse)
      console.error('LLMs data loaded, length:', llmsData.length)
    }
  }
  catch (llmsError) {
    console.error('Could not fetch llms.txt:', llmsError)
  }

  try {
    // Data Guru
    console.error('Fetching guru data...')
    const guruResults = await queryCollection(event, 'guru').all()
    console.error('Guru results length:', guruResults?.length || 0)

    if (guruResults && guruResults.length > 0) {
      allData += 'DATA GURU SDN TEJA II:\n'
      allData += guruResults.map((guru: Record<string, any>) =>
        `${guru.nama || ''} (${guru.lengkap || guru.nama || ''}):
- Jabatan: ${guru.jabatan || '-'}
- Kelas: ${guru.kelas || '-'}
- Pendidikan: ${guru.pendidikan || '-'}
- Catatan: ${guru.catatan || '-'}
- Pelatihan: ${guru.pelatihan ? guru.pelatihan.map((p: Record<string, any>) => `${p.title} (${p.tahun})`).join(', ') : 'Tidak ada'}`,
      ).join('\n\n')
      allData += '\n\n'
    }

    // Data Berita
    const beritaResults = await queryCollection(event, 'berita').all()
    if (beritaResults && beritaResults.length > 0) {
      allData += '=== DATA BERITA SDN TEJA II ===\n'
      allData += beritaResults.map((berita: Record<string, any>) =>
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
      allData += artikelResults.map((artikel: Record<string, any>) =>
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
      allData += kegiatanResults.map((kegiatan: Record<string, any>) =>
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
      allData += mediaResults.map((media: Record<string, any>) =>
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
  console.error('Collections data length:', allData.length)
  console.error('LLMs data length:', llmsData.length)
  console.error('Sample collections data:', allData.substring(0, 200))
  console.error('Sample LLMs data:', llmsData.substring(0, 200))

  // Tambahkan informasi dasar sekolah dari konfigurasi
  const schoolInfo = `
=== INFORMASI DASAR SDN TEJA II ===
Nama Sekolah: SDN Teja II - Sekolah Dasar Negeri Teja II
Website: https://sdnteja2.sch.id
Lokasi: Kecamatan Rajagaluh, Kabupaten Majalengka, Jawa Barat
Deskripsi: Website resmi SDN Teja II. Sekolah dasar yang berkomitmen memberikan pendidikan berkualitas dengan tenaga pendidik profesional.

KATEGORI KONTEN WEBSITE:
1. Profil Guru dan Tenaga Pendidik - Daftar lengkap guru dan tenaga pendidik SDN Teja II dengan informasi jabatan, pendidikan, kelas yang diajar, dan pengalaman pelatihan profesional. Termasuk data kepala sekolah, guru kelas, dan staf pendidikan lainnya.

2. Berita dan Pengumuman Sekolah - Berita terbaru, pengumuman resmi, dan informasi penting dari SDN Teja II termasuk kegiatan akademik, kebijakan sekolah, dan perkembangan institusi. Mencakup informasi ANBK, pergantian kepala sekolah, dan jadwal pembelajaran.

3. Kegiatan dan Program Sekolah - Dokumentasi kegiatan sekolah, program ekstrakurikuler, acara khusus, dan berbagai aktivitas yang dilaksanakan di SDN Teja II. Termasuk serah terima jabatan, kegiatan kebersihan, dan program pengembangan karakter siswa.

4. Artikel Pendidikan dan Informasi Umum - Artikel edukatif, panduan pendidikan, informasi PPDB/SPMB, sejarah pendidikan, rapor pendidikan, dan konten informatif lainnya yang relevan dengan dunia pendidikan dasar di Indonesia.

`

  const systemPrompt = `Kamu adalah JADU AI, asisten AI untuk website SDN Teja II. Jawab pertanyaan berdasarkan informasi sekolah dan data lengkap berikut:

${schoolInfo}

=== DATA DARI LLMS.TXT (GENERATED CONTENT) ===
${llmsData}

=== DATA DARI COLLECTIONS ===
${allData}

PENTING - SUMBER DATA:
- DATA DARI LLMS.TXT: Konten yang sudah diproses dan dioptimalkan untuk AI dari semua content collections
- DATA DARI COLLECTIONS: Data mentah dari database/file system
- BERITA: Informasi terkini tentang kegiatan/peristiwa sekolah
- ARTIKEL: Tulisan edukatif/informatif yang lebih mendalam
- GURU: Data lengkap staff pengajar dan jabatan mereka
- KEGIATAN: Event/acara yang dilaksanakan sekolah
- MEDIA: Materi pembelajaran dan media edukatif

PANDUAN MENJAWAB:
- Nama kamu JADU AI, asisten AI untuk website resmi SDN Teja II
- SDN Teja II berlokasi di Kecamatan Rajagaluh, Kabupaten Majalengka, Jawa Barat
- Website resmi: https://sdnteja2.sch.id
- Jawab dalam bahasa Indonesia yang ramah dan informatif
- PRIORITASKAN data dari LLMS.TXT karena sudah dioptimalkan untuk AI
- Gunakan data dari COLLECTIONS sebagai pelengkap jika diperlukan
- WAJIB bedakan antara BERITA dan ARTIKEL - jangan salah kategori!
- Jika menanyakan tentang wali kelas, sebutkan nama lengkap guru dari data di atas
- Jika menanyakan tentang guru tertentu, berikan informasi lengkap dari data guru
- Jika ditanya artikel terbaru, ambil dari bagian "DATA ARTIKEL" saja
- Jika ditanya berita terbaru, ambil dari bagian "DATA BERITA" saja
- Jika ditanya tentang kegiatan sekolah, gunakan data dari "DATA KEGIATAN"
- Jika ditanya tentang materi pembelajaran, gunakan data dari "DATA MEDIA"
- Gunakan kedua sumber data (LLMS.TXT dan COLLECTIONS) untuk menjawab dengan akurat dan detail
- Berikan informasi yang spesifik dan relevan berdasarkan data yang ada
- Jika informasi tidak tersedia di kedua sumber, jelaskan bahwa data tersebut belum tersedia di sistem

KOMITMEN SEKOLAH:
SDN Teja II berkomitmen memberikan pendidikan berkualitas dengan tenaga pendidik profesional.

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
