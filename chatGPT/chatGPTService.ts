import { ChatGPTAPI, ChatMessage } from 'chatgpt'


class ChatGPT {
  api: ChatGPTAPI
  constructor() {
    this.api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY as string,
      completionParams: {
      },
      debug: false,
    })

  }
  async sendMessage(prompt: string, res?: ChatMessage) {
    if (!!res) {
      console.log('has res...')
      return await this.api.sendMessage(prompt, { parentMessageId: res.id })
    }
    console.log('no res...')
    return await this.api.sendMessage(prompt)
  }
}

export default ChatGPT
