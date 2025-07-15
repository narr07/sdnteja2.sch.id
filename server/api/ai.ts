export default defineEventHandler(async (event) => {
  const { question } = await readBody(event)
  // Skip cache LLMS untuk sementara
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
    else {
      // Fallback data manual jika queryCollection tidak bekerja
      contentData += `DATA GURU SDN TEJA II:
Dinar Permadi Y. (Dinar Permadi Yusup, S.Pd.):
- Jabatan: Operator
- Kelas: Wali Kelas 5
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar
- Catatan: Peran seorang guru akan selalu dikenang, karena guru mengubah kehidupan.

Susi Susanti (Susi Susanti, S.Pd.I., M.Pd.):
- Jabatan: Kepala Sekolah
- Kelas: -
- Pendidikan: S1 - Bahasa Inggris
- Catatan: Sebagai kepala sekolah, saya berkomitmen untuk menciptakan lingkungan belajar yang inspiratif.

Iis Kartini (Hj. Iis Kartini, S.Pd.):
- Jabatan: Bendahara
- Kelas: Wali Kelas 1
- Pendidikan: S1 - Matematika

Retno Wulandari (Retno Wulandari, S.Pd.):
- Jabatan: Pembina Literasi & Numerasi
- Kelas: Wali Kelas 2
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar

Haris Sunardi (Haris Sunardi, S.Pd.):
- Jabatan: Guru Kelas
- Kelas: Wali Kelas 3
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar

Maspupah (Maspupah, S.Pd.):
- Jabatan: Guru Kelas
- Kelas: Wali Kelas 4
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar

Didi Rukmayadi (Didi Rukmayadi, S.Pd.):
- Jabatan: Guru Kelas
- Kelas: Wali Kelas 6
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar`
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
    // Jika error, gunakan data manual
    contentData = `DATA GURU SDN TEJA II:
Dinar Permadi Y. (Dinar Permadi Yusup, S.Pd.):
- Jabatan: Operator
- Kelas: Wali Kelas 5
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar

Susi Susanti (Susi Susanti, S.Pd.I., M.Pd.):
- Jabatan: Kepala Sekolah
- Kelas: -
- Pendidikan: S1 - Bahasa Inggris

Iis Kartini (Hj. Iis Kartini, S.Pd.):
- Jabatan: Bendahara  
- Kelas: Wali Kelas 1
- Pendidikan: S1 - Matematika

Retno Wulandari (Retno Wulandari, S.Pd.):
- Jabatan: Pembina Literasi & Numerasi
- Kelas: Wali Kelas 2
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar

Haris Sunardi (Haris Sunardi, S.Pd.):
- Jabatan: Guru Kelas
- Kelas: Wali Kelas 3
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar

Maspupah (Maspupah, S.Pd.):
- Jabatan: Guru Kelas
- Kelas: Wali Kelas 4
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar

Didi Rukmayadi (Didi Rukmayadi, S.Pd.):
- Jabatan: Guru Kelas
- Kelas: Wali Kelas 6
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar`
  }

  // Debug: Log contentData yang akan dikirim ke AI
  console.error('Content data yang akan dikirim ke AI:', contentData.substring(0, 500))

  const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: `Jawab pertanyaan tentang SDN Teja II berdasarkan data berikut:

${contentData}

WALI KELAS:
- Kelas 1: Iis Kartini
- Kelas 2: Retno Wulandari
- Kelas 3: Haris Sunardi  
- Kelas 4: Maspupah
- Kelas 5: Dinar Permadi Y.
- Kelas 6: Didi Rukmayadi

Jawab dengan format sederhana dan langsung.

Pertanyaan: ${question}
Jawaban:`,
  })

  return { result: response }
})
