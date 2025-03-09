import { v2 as cloudinary } from 'cloudinary'
import { defineEventHandler, getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  // Ambil parameter `tag` dari URL
  const tag = getRouterParam(event, 'tag')
  const config = useRuntimeConfig()

  // Konfigurasi Cloudinary
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  })

  try {
    // Ambil gambar berdasarkan tag dari Cloudinary
    const result = await cloudinary.api.resources_by_tag(tag)
    return result.resources
  }
  catch (error) {
    console.error('Error fetching images:', error)
    return { error: 'Failed to fetch images' }
  }
})
