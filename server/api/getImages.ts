/* eslint-disable node/prefer-global/process */
import cloudinary from 'cloudinary'
import { defineEventHandler, readBody } from 'h3'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
})

interface RequestBody {
  tag?: string
  folder?: string
}

export default defineEventHandler(async (event) => {
  const { tag, folder } = (await readBody(event)) as RequestBody

  try {
    let resources = []

    if (tag) {
      const result = await cloudinary.v2.api.resources_by_tag(tag)
      resources = result.resources
    }
    else if (folder) {
      const result = await cloudinary.v2.search.expression(`folder=${folder}`).execute()
      resources = result.resources
    }
    else {
      throw new Error('Tag or folder must be provided')
    }

    return { resources }
  }
  catch (error) {
    console.error('Error fetching images:', error)
    return { message: 'An error occurred', error }
  }
})
