import { ChatGPTAPI, ChatMessage } from 'chatgpt'


class ChatGPT {
  api: ChatGPTAPI
  constructor() {
    this.api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY as string,
      completionParams: {
      },
      debug: true,
    })

  }
  async sendMessage(prompt: string, res?: ChatMessage) {
    const result = !!res ? 
      await this.api.sendMessage(prompt, { parentMessageId: res.id }) : 
      await this.api.sendMessage(prompt)
    return result
  }
}

export default ChatGPT
