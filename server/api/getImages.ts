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
    const { tag } = await readBody(event)

    if (!tag) {
      throw new Error('Tag is required')
    }

    const result = await cloudinary.v2.api.resources_by_tag(tag)
    return { resources: result.resources }
  }
  catch (error) {
    console.error('Error in /api/getImages:', error)
    return { statusCode: 500, message: 'Internal Server Error', error }
  }
})
