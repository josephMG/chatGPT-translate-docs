import { ChatGPTClient, ResponseData } from '@waylaidwanderer/chatgpt-api';


const clientOptions = {
    // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
    // Warning: This will expose your `openaiApiKey` to a third party. Consider the risks before using this.
    // reverseProxyUrl: 'https://chatgpt.hato.ai/completions',
    // (Optional) Parameters as described in https://platform.openai.com/docs/api-reference/completions
    modelOptions: {
        // You can override the model name and any other parameters here, like so:
        model: 'gpt-3.5-turbo',
        // I'm overriding the temperature to 0 here for demonstration purposes, but you shouldn't need to override this
        // for normal usage.
        temperature: 0,
        // Set max_tokens here to override the default max_tokens of 1000 for the completion.
        // max_tokens: 1000,
    },
    // (Optional) Davinci models have a max context length of 4097 tokens, but you may need to change this for other models.
    // maxContextTokens: 4097,
    // (Optional) You might want to lower this to save money if using a paid model like `text-davinci-003`.
    // Earlier messages will be dropped until the prompt is within the limit.
    // maxPromptTokens: 3097,
    // (Optional) Set custom instructions instead of "You are ChatGPT...".
    // promptPrefix: 'You are Bob, a cowboy in Western times...',
    // (Optional) Set a custom name for the user
    // userLabel: 'User',
    // (Optional) Set a custom name for ChatGPT
    // chatGptLabel: 'ChatGPT',
    // (Optional) Set to true to enable `console.debug()` logging
    debug: false,
};

class ChatGPT {
  api: ChatGPTClient
  constructor() {
    this.api = new ChatGPTClient(process.env.OPENAI_API_KEY as string, clientOptions, {})
  }
  async sendMessage(prompt: string, res?: ResponseData) {
    if (!!res) {
      return await this.api.sendMessage(prompt, { conversationId: res.conversationId, parentMessageId: res.messageId, clientOptions: { max_tokens: 3000 } })
    }
    return await this.api.sendMessage(prompt, {clientOptions: { max_tokens: 3000 }})
  }
}

export default ChatGPT
