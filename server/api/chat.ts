// server/api/chat.ts
import { streamText } from 'ai'
import { createWorkersAI } from 'workers-ai-provider'
import { getLLMSData } from '../utils/llms-cache'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)
  const llmsData = await getLLMSData()
  const systemPrompt = `Jawab hanya berdasarkan dokumentasi website SDN Teja 2 berikut:\n${llmsData}\n\nJika pertanyaan di luar data, jawab 'Maaf, saya hanya bisa menjawab seputar website ini.'`
  const fullMessages = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ]
  const workersAI = createWorkersAI({ binding: hubAI() })
  return streamText({
    model: workersAI('@cf/meta/llama-3.1-8b-instruct'),
    messages: fullMessages,
  }).toDataStreamResponse()
})
