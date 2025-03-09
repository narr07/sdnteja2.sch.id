/* eslint-disable no-console */

import cloudinary from 'cloudinary'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Konfigurasi Cloudinary menggunakan runtime config
  cloudinary.v2.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
    secure: true,
  })

  try {
    // Validasi environment variables
    if (!config.cloudinaryCloudName || !config.cloudinaryApiKey || !config.cloudinaryApiSecret) {
      console.error('Missing Cloudinary configuration')
      throw new Error('Cloudinary configuration is missing')
    }

    // Ambil body dari request
    const { tag } = await readBody(event)
    console.log('Tag received:', tag)

    if (!tag) {
      console.error('Tag is required')
      throw new Error('Tag is required')
    }

    // Panggil API Cloudinary
    const result = await cloudinary.v2.api.resources_by_tag(tag)
    console.log('Cloudinary response:', result)

    return { success: true, resources: result.resources }
  }
  catch (error) {
    console.error('Error in /api/getImages:', error)
    return { success: false, message: 'Failed to fetch images', details: (error as Error).message }
  }
})
