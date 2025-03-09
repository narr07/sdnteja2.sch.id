/* eslint-disable no-console */
/* eslint-disable node/prefer-global/process */
import cloudinary from 'cloudinary'
import { defineEventHandler, readBody } from 'h3'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
})

export default defineEventHandler(async (event) => {
  try {
    // Validasi environment variables
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary configuration')
      throw new Error('Cloudinary configuration is missing')
    }

    const { tag } = await readBody(event)
    console.log('Tag received:', tag)

    if (!tag) {
      console.error('Tag is required')
      throw new Error('Tag is required')
    }

    const result = await cloudinary.v2.api.resources_by_tag(tag)
    console.log('Cloudinary response:', result)

    return { success: true, resources: result.resources }
  }
  catch (error) {
    console.error('Error in /api/getImages:', error)
    return { success: false, message: 'Failed to fetch images', details: (error as Error).message }
  }
})
