import { readdir } from 'node:fs/promises'

export default defineEventHandler(async (event) => {
  const folder = event.context.params?.folder

  if (!folder) {
    return []
  }

  const imageDir = `public/kegiatan/${folder}`

  try {
    const files = await readdir(imageDir)
    // eslint-disable-next-line regexp/no-unused-capturing-group
    const images = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    return images.map(filename => `/kegiatan/${folder}/${filename}`)
  }
  catch {
    return []
  }
})
