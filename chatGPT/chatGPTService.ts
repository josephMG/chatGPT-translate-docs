import { ChatGPTAPI } from 'chatgpt'

const sendMessage = async (prompt: string) => {
  const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY as string })
  const res = await api.sendMessage(prompt)
  return res.text
}

const funcs = {
  sendMessage
}

export {
  funcs
}

