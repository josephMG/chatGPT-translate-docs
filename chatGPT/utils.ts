import ora from 'ora'
import fs from 'fs'
import FileObj, { funcs as fileService } from './fileService'
import ChatGPT, { funcs as chatGPTService } from './chatGPTService'
import type { TextWithTokens } from './chatGPTService';
import chalk from 'chalk';

export const translateChunks = async (fileObj: FileObj, chunks: TextWithTokens[], localeName: string, cb: (i: number) => void) => {
  const chatAPI = new ChatGPT()
  const greeting = await chatAPI.sendMessage(`please translate my next markdown content to ${localeName}, and only give me unrendered markdown output.`)
  for (const i in chunks) {
    cb(Number(i))
    const chunk = chunks[i]
    const res = await chatAPI.sendMessage("```markdown\n" +
`${chunk.text}\n` +
"```", greeting)
    const text = chatGPTService.removeUselessResponse(res?.response || '')
    fileService.writeToFile(fileObj, text)
  }
  fileService.replaceNullChar(fileObj)
}

export const chunkFiles = async (arrayOfFiles: string[], sourceFolder: string, localeName: string) => {
  const failedFiles: string[] = []
  const successFiles: string[] = getSuccessFiles()
  for (const filePath of arrayOfFiles) {
    const spinner = ora(chalk.bgGrey.red('Preparing and chunking...')).start();
    const fileObj = new FileObj(filePath, sourceFolder, localeName)
    fileService.createNestedFolder(fileObj)
    fileService.removeFile(fileObj)
    const content = fileObj.getContent()
    const paragraphs = chatGPTService.convertContentToParagraph(content, () => spinner.render())
    const chunks = chatGPTService.convertParagraphToChunk(paragraphs) // .filter((_, i) => i < 1) /* for testing */
    
    try {
      spinner.text = chalk.cyan('Sending greeting message')
      await translateChunks(fileObj, chunks, localeName, (i) => {
        spinner.text = chalk.cyan(`${Number(i) + 1}/${chunks.length}, Translating ${filePath}`)
      })  
      successFiles.push(filePath)
      spinner.succeed()
    } catch (err) {
      failedFiles.push(filePath)
      spinner.fail(`Failed to translate file: ${filePath}, err: ${(err as Error).message}`)
    }
  }
  successFiles.length > 0 && fileService.writeFailedFiles(successFiles, 'success-files.json')
  failedFiles.length > 0 && fileService.writeFailedFiles(failedFiles, 'failed-files.json')
}

export const getSuccessFiles = (): string[] => {
  try {
    return JSON.parse(fs.readFileSync('success-files.json').toString()) as string[]
  } catch {
    return []
  }
}
