export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const query = getQuery(event)
  const tagName = query.tag || 'default' // Default tag jika tidak ada query

  const cloudName = config.cloudinary.cloudName
  const apiKey = config.cloudinary.apiKey
  const apiSecret = config.cloudinary.apiSecret

  // eslint-disable-next-line node/prefer-global/buffer
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/tags/${tagName}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`)
    }

    const data = await response.json()

    return data.resources.map((image: { secure_url: any }) => ({
      src: image.secure_url,
    }))
  }
  catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    }
  }
})
