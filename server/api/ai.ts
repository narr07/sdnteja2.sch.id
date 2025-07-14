import { getLLMSData } from '../utils/llms-cache'

export default defineEventHandler(async (event) => {
  const { question } = await readBody(event)
  const llmsData = await getLLMSData()
  const ai = hubAI()
  const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: `Jawab hanya berdasarkan dokumentasi website berikut tentang SDN Teja 2:\n${llmsData}\n\nPertanyaan: ${question}`,
  })
  return { result: response }
})
