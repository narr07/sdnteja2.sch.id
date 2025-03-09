// server/api/getImagesByTag.ts

import { v2 as cloudinary } from 'cloudinary'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const tag = query.tag as string
  const config = useRuntimeConfig()

  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
    secure: true,
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
