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
    let resources
    if (tag) {
      resources = await cloudinary.v2.api.resources_by_tag(tag)
    }
    else if (folder) {
      resources = await cloudinary.v2.search.expression(`folder=${folder}`).execute()
    }
    return resources
  }
  catch (error) {
    console.error('Error fetching images:', error)
    return { message: 'An error occurred', error }
  }
})
