/* eslint-disable node/prefer-global/process */
import { v2 as cloudinary } from 'cloudinary'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const tag = query.tag as string

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  try {
    const result = await cloudinary.api.resources_by_tag(tag)
    return result.resources
  }
  catch (error) {
    console.error('Error fetching images:', error)
    return { error: 'Failed to fetch images' }
  }
})
