/* eslint-disable no-console */
import cloudinary from 'cloudinary'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  cloudinary.v2.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
    secure: true,
  })

  try {
    const { tag } = await readBody(event)
    if (!tag)
      throw new Error('Tag is required')

    const result = await cloudinary.v2.api.resources_by_tag(tag)

    console.log('Cloudinary response:', result) // Log respons Cloudinary

    return { success: true, resources: result.resources }
  }
  catch (error) {
    console.error('Error in /api/getImages:', error)
    return { success: false, message: 'Failed to fetch images', details: (error as Error).message }
  }
})
