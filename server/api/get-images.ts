export default defineEventHandler(async (event) => {
  // Ambil runtimeConfig
  const config = useRuntimeConfig()

  // Ambil parameter query untuk nama tag
  const query = getQuery(event)
  const tagName = query.tag || 'default' // Default tag jika tidak ada query

  // Konfigurasi Cloudinary dari runtimeConfig
  const cloudName = config.cloudinary.cloudName
  const apiKey = config.cloudinary.apiKey
  const apiSecret = config.cloudinary.apiSecret

  // Autentikasi menggunakan Basic Auth
  // eslint-disable-next-line node/prefer-global/buffer
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

  try {
    // Panggil API Cloudinary untuk mendapatkan daftar gambar berdasarkan tag
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/tags/${tagName}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      },
    )

    // Jika response gagal, lemparkan error
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`)
    }

    const data = await response.json()

    // Ambil hanya URL gambar
    return data.resources.map(image => ({
      src: image.secure_url,
    }))
  }
  catch (error) {
    // Tangani error dan kembalikan pesan error
    return {
      error: true,
      message: error.message,
    }
  }
})
