// server/api/chat.ts
import { streamText } from 'ai'
import { createWorkersAI } from 'workers-ai-provider'
import { getLLMSData } from '../utils/llms-cache'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  // Ambil data dari llms.txt menggunakan cache utility
  const llmsData = await getLLMSData()

  // Debug: Log data LLMS
  console.error('=== DEBUG LLMS DATA ===')
  console.error('LLMS data length:', llmsData.length)
  console.error('LLMS data preview (first 500 chars):', llmsData.substring(0, 500))
  console.error('LLMS data contains "guru":', llmsData.toLowerCase().includes('guru'))
  console.error('LLMS data contains "teja":', llmsData.toLowerCase().includes('teja'))
  console.error('LLMS data contains "kartini":', llmsData.toLowerCase().includes('kartini'))

  // Jika LLMS data kosong, berikan fallback data
  let finalData = llmsData
  if (!llmsData || llmsData.length < 100) {
    console.error('WARNING: LLMS data empty or too short, using fallback')
    finalData = `
DATA GURU SDN TEJA II:
Susi Susanti (Susi Susanti, S.Pd.I., M.Pd.):
- Jabatan: Kepala Sekolah
- Kelas: -
- Pendidikan: S1 - Bahasa Inggris
- Catatan: Sebagai kepala sekolah, saya berkomitmen untuk menciptakan lingkungan belajar yang inspiratif dan mendukung perkembangan setiap siswa.

Iis Kartini (Hj. Iis Kartini, S.Pd.):
- Jabatan: Bendahara
- Kelas: Wali Kelas 1
- Pendidikan: S1 - Matematika
- Catatan: Mengajar bukan hanya tentang memberikan pelajaran, tapi juga menanamkan nilai-nilai kehidupan.

Haris Sunardi:
- Jabatan: Guru
- Kelas: Wali Kelas 6
- Pendidikan: -

Maspupah:
- Jabatan: Guru
- Kelas: -
- Pendidikan: -

Retno Wulandari:
- Jabatan: Guru
- Kelas: -
- Pendidikan: -

Didi Rukmayadi:
- Jabatan: Guru
- Kelas: -
- Pendidikan: -

Dinar Permadi:
- Jabatan: Guru
- Kelas: -
- Pendidikan: -

Yana Maulana:
- Jabatan: Guru
- Kelas: -
- Pendidikan: -

Putriana Indrawati:
- Jabatan: Guru
- Kelas: -
- Pendidikan: -
    `
  }

  const systemPrompt = `Kamu adalah JADU AI, asisten AI untuk website SDN Teja II. Jawab pertanyaan berdasarkan data website SDN Teja II berikut:

${finalData}

DAFTAR NAMA GURU YANG VALID:
- Susi Susanti (Kepala Sekolah)
- Hj. Iis Kartini, S.Pd. (Bendahara)
- Haris Sunardi
- Maspupah
- Retno Wulandari
- Didi Rukmayadi
- Dinar Permadi
- Yana Maulana
- Putriana Indrawati

PENTING - INSTRUKSI KHUSUS:
- HANYA gunakan data yang BENAR-BENAR ada dalam data di atas
- HANYA sebutkan nama guru dari daftar valid di atas
- JANGAN buat-buat nama atau informasi yang tidak ada (seperti "Romah Yulianto")
- Untuk pertanyaan tentang bendahara, jawab: "Hj. Iis Kartini, S.Pd."
- Untuk kepala sekolah, jawab: "Susi Susanti, S.Pd.I., M.Pd."

PANDUAN MENJAWAB:
- Nama kamu JADU AI, asisten AI untuk website resmi SDN Teja II
- SDN Teja II berlokasi di Kecamatan Rajagaluh, Kabupaten Majalengka, Jawa Barat
- Website resmi: https://sdnteja2.sch.id
- Jawab dalam bahasa Indonesia yang ramah dan informatif
- Berikan informasi yang spesifik dan akurat HANYA berdasarkan data yang tersedia

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
