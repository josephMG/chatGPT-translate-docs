declare module '@waylaidwanderer/chatgpt-api' {
  import Keyv = require('keyv');
  import type { Tiktoken, TiktokenModel } from '@dqbd/tiktoken';

  type ModelOptions = {
    model?: string,
    temperature?: number,
    top_p?: number,
    presence_penalty?: number
    stop?: string
  }
  type Options = {
    maxContextTokens?: number;
    maxPromptTokens?: number;
    userLabel?: string;
    chatGptLabel?: string;
    proxy?: any;
    debug?: any;
    openaiApiKey?: string,
    reverseProxyUrl?: string,
    promptPrefix?: string,
    modelOptions?: ModelOptions,
    replaceOptions?: Options,
    max_tokens?, stream?, messages?, prompt?
  }
  type CacheOption = { namespace?: string }
  type ExtendSpecialTokens = {}
  type UserMessage = {
    id: string,
    parentMessageId?,
    role?: string,
    message?,
  }
  type BotMessage = {
    message,
  }
  type SendMessageOption = {
    clientOptions?: {},
    conversationId?: string,
    parentMessageId?: string,
    shouldGenerateTitle?: boolean,
  }
  type Payload = string | Message[] | Message
  type Message = {
    role: string;
    name?: string;
    content: string;
  }
  type ResponseData = {
    response: string;
    conversationId?: string;
    parentMessageId: string;
    messageId: string,
    details: object
  }

  export class ChatGPTClient {

    startToken: undefined | string
    endToken: undefined | string
    completionsUrl: string
    options: Options;
    apiKey: string;
    conversationsCache: Keyv;
    modelOptions: Partial<{
      max_tokens: number,
      stop: any,
      model: any,
      stream: boolean,
      messages: string,
      prompt: string,
      temperature: number,
      top_p: number,
      presence_penalty: number
    }>;
    isChatGptModel: any;
    isUnofficialChatGptModel: any;
    maxContextTokens: any;
    maxResponseTokens: any;
    maxPromptTokens: any;
    userLabel: any;
    chatGptLabel: any;
    gptEncoder: any;

    constructor(
      apiKey: string,
      options?: Options,
      cacheOptions?: CacheOption);

      /**
       * this function check the options validity and some supplements
       */
      setOptions(options: Partial<Options>): ChatGPTClient

      static getTokenizer(
        encoding: TiktokenModel,
        isModelName: boolean,
        extendSpecialTokens?: ExtendSpecialTokens): Tiktoken

        /**
         * 
         * @param input 
         * @param onProgress 
         * @param abortController 
         */
        getCompletion(input: Payload, onProgress: Function | null, abortController: AbortController | null): Promise<string | Message | Message[]>

        /**
         * format the output
         * @param userMessage 
         * @param botMessage 
         */
        generateTitle(userMessage: UserMessage, botMessage: string): Promise<string>


        sendMessage(message: string, opts?: SendMessageOption): Promise<ResponseData>

        /**
         * 
         * @param messages 
         * @param parentMessageId 
         * @param isChatGptModel 
         */
        buildPrompt(messages: UserMessage[], parentMessageId: string, isChatGptModel: boolean): string


        getTokenCount(text: string): number


        getTokenCountForMessage(message: Payload): number

        static getMessagesForConversation(message: UserMessage[], parentMessageId: string): UserMessage[]
  }

}
