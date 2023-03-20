import { ChatGPTClient, ResponseData } from '@waylaidwanderer/chatgpt-api';
import { encoding_for_model } from "@dqbd/tiktoken";

const CHUNK_TOKENS: number = Number(process.env.CHUNK_TOKENS) || 1300
const CONTEXT_TOKEN = 117
export type TextWithTokens = {tokens: number, text: string}

const convertContentToParagraph = (content: string, cb: VoidFunction) => {
  const codeMatches = [...content.matchAll(/^```.+\n([\s\S]*?)```/gm)]
  const paragraphMatches = content.matchAll(/\n\n/g)
  let startPos = 0
  let codeIndex = 0
  const paragraph: TextWithTokens[] = []
  for (const paragraphMatch of paragraphMatches) {
    cb()
    if (codeMatches.length > 0 && codeIndex < codeMatches.length) {
      const codeMatch = codeMatches[codeIndex]
      if (paragraphMatch.index && codeMatch.index) {
        if (codeMatch.index! < paragraphMatch.index!) {
          if (codeMatch.index + codeMatch[0].length > paragraphMatch.index) {
            continue
          }
          codeIndex += 1
        }
      }
    }
    const endPos = paragraphMatch.index! + paragraphMatch[0].length
    const text = content.substring(startPos, endPos)
    paragraph.push({ tokens: calcToken(text), text })
    startPos = endPos
  }
  const text = content.substring(startPos)
  paragraph.push({ tokens: calcToken(text), text })
  return paragraph
}

const calcToken = (paragraph: string) => {
  const enc = encoding_for_model("gpt-3.5-turbo");
  const tokens = enc.encode(paragraph)
  enc.free()
  return tokens.length
}

const convertParagraphToChunk = (paragraphs: TextWithTokens[]): TextWithTokens[] => {
  return paragraphs.reduce((chunks, paragraph, index) => {
    let s = chunks[chunks.length - 1]
    s.text = `${s.text}${paragraph.text}`
    s.tokens = s.tokens + paragraph.tokens

    if (index === paragraphs.length - 1) {
      return [...chunks]
    }
    if (s.tokens + paragraphs[index + 1].tokens > CHUNK_TOKENS - CONTEXT_TOKEN) {
      return [...chunks, { tokens: 0, text: '' }]
    }
    chunks[chunks.length - 1] = s
    return chunks
  }, [{ tokens: 0, text: '' }])
}

const removeUselessResponse = (text: string) => {
  const re = /^```markdown([\w\W]*)```$/gm
  const match = re.exec(text.replace(/\0/g, ''))
  return match ? match[1] : text
}

export const funcs = {
  convertContentToParagraph,
  calcToken,
  convertParagraphToChunk,
  removeUselessResponse
}

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
        max_tokens: 4097 - CHUNK_TOKENS - CONTEXT_TOKEN,
    },
    // (Optional) Davinci models have a max context length of 4097 tokens, but you may need to change this for other models.
    maxContextTokens: 4097,
    // (Optional) You might want to lower this to save money if using a paid model like `text-davinci-003`.
    // Earlier messages will be dropped until the prompt is within the limit.
    maxPromptTokens: CHUNK_TOKENS + CONTEXT_TOKEN,
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
      return await this.api.sendMessage(prompt, { conversationId: res.conversationId, parentMessageId: res.messageId })
    }
    return await this.api.sendMessage(prompt, {})
  }
}

export default ChatGPT
