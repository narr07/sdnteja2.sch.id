/* eslint-disable node/prefer-global/process */
/* eslint-disable no-console */
// server/api/getImages.get.ts
import cloudinary from 'cloudinary'
import { createError, defineEventHandler, getQuery } from 'h3'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
})

export default defineEventHandler(async (event) => {
  try {
    const { tag } = getQuery(event)
    console.log('Tag received:', tag)

    if (!tag || typeof tag !== 'string') {
      throw createError({ statusCode: 400, statusMessage: 'Tag is required' })
    }

    const result = await cloudinary.v2.api.resources_by_tag(tag)
    console.log('Cloudinary response:', result)

    return { success: true, resources: result.resources }
  }
  catch (error) {
    console.error('Error fetching images:', error)
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
