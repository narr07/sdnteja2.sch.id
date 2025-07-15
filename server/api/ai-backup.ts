import { getLLMSData } from '../utils/llms-cache'

export default defineEventHandler(async (event) => {
  const { question } = await readBody(event)
  const llmsData = await getLLMSData()
  const ai = hubAI()

  // Data manual guru SDN Teja II (fallback jika queryCollection tidak bekerja)
  const contentData = `DATA GURU SDN TEJA II:
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
- Catatan: Mengajar bukan hanya tentang memberikan pelajaran, tapi juga menanamkan nilai-nilai kehidupan.

Retno Wulandari (Retno Wulandari, S.Pd.):
- Jabatan: Pembina Literasi & Numerasi
- Kelas: Wali Kelas 2
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar
- Catatan: Mengajar adalah seni untuk membuat ilmu menjadi abadi dalam hati murid.

Haris Sunardi (Haris Sunardi, S.Pd.):
- Jabatan: Guru Kelas
- Kelas: Wali Kelas 3
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar
- Catatan: Menjadi guru adalah panggilan jiwa untuk mendidik generasi masa depan.

Maspupah (Maspupah, S.Pd.):
- Jabatan: Guru Kelas
- Kelas: Wali Kelas 4
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar
- Catatan: Kesabaran adalah kunci utama dalam mendidik anak-anak.

Didi Rukmayadi (Didi Rukmayadi, S.Pd.):
- Jabatan: Guru Kelas
- Kelas: Wali Kelas 6
- Pendidikan: S1 - Pendidikan Guru Sekolah Dasar
- Catatan: Pendidikan adalah investasi terbaik untuk masa depan bangsa.

Yana Maulana (Yana Maulana, S.Pd.):
- Jabatan: Guru Olahraga
- Kelas: Guru Mapel
- Pendidikan: S1 - Pendidikan Jasmani
- Catatan: Olahraga mengajarkan disiplin, kerja sama, dan sportivitas.

Putriana Indrawati (Putriana Indrawati, S.Pd.):
- Jabatan: Guru Agama
- Kelas: Guru Mapel
- Pendidikan: S1 - Pendidikan Agama Islam
- Catatan: Mendidik akhlak adalah pondasi utama dalam membentuk karakter siswa.`

  const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: `Kamu adalah asisten AI untuk website SDN Teja II. Jawab pertanyaan berdasarkan data berikut.

DATA LENGKAP SDN TEJA II:
${contentData}

INFORMASI WEBSITE LAINNYA:
${llmsData}

PANDUAN MENJAWAB:
- Jawab dalam bahasa Indonesia yang ramah dan informatif
- Jika menanyakan tentang wali kelas, cari di data guru dan sebutkan nama lengkap guru serta kelasnya
- WALI KELAS 5 adalah DINAR PERMADI Y., bukan Susi Susanti
- WALI KELAS 1 adalah IIS KARTINI
- WALI KELAS 2 adalah RETNO WULANDARI  
- WALI KELAS 3 adalah HARIS SUNARDI
- WALI KELAS 4 adalah MASPUPAH
- WALI KELAS 6 adalah DIDI RUKMAYADI
- Jika menanyakan tentang jabatan guru, berikan informasi lengkap dari data guru
- Jika menanyakan tentang guru tertentu, berikan informasi lengkap termasuk jabatan, pendidikan, dan kelas yang diajar
- Gunakan data yang tersedia di atas untuk menjawab pertanyaan dengan akurat
- Jika informasi tidak tersedia di data, jelaskan bahwa data tersebut belum tersedia

CONTOH JAWABAN YANG BENAR:
- Pertanyaan: "Wali kelas 5 siapa?" 
  Jawaban: "Berdasarkan data guru SDN Teja II, wali kelas 5 adalah Dinar Permadi Y. (Dinar Permadi Yusup, S.Pd.). Beliau bertugas sebagai Operator dengan latar belakang pendidikan S1 Pendidikan Guru Sekolah Dasar."

PERTANYAAN: ${question}

JAWABAN:`,
  })

  return { result: response }
})
