import dotenv from 'dotenv'
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer, { Answers } from 'inquirer';
import ora from 'ora'
import { Subject, toArray } from 'rxjs';
import fs from 'fs'
import FileObj, { funcs as fileService} from './fileService'
import ChatGPT from './chatGPTService'

dotenv.config()

const convertContentToParagraph = (content: string) => {
  const codeMatches = [...content.matchAll(/^```.+\n([\s\S]*?)```/gm)]
  const paragraphMatches = content.matchAll(/\n\n/g)
  let startPos = 0
  let codeIndex = 0
  const paragraph: string[] = []
  for(const paragraphMatch of paragraphMatches) {
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
    paragraph.push(content.substring(startPos, endPos))
    startPos = endPos
  }
  paragraph.push(content.substring(startPos))
  return paragraph
}

const translateFiles = async (arrayOfFiles: string[], sourceFolder: string, localeName: string) => {
  for (const filePath of arrayOfFiles) {
    const fileObj = new FileObj(filePath, sourceFolder, localeName)
    const chatAPI = new ChatGPT()
    fileService.createNestedFolder(fileObj)
    fileService.removeFile(fileObj)
    const content = fileObj.getContent()
    const paragraphs = convertContentToParagraph(content)
    const stream = fileService.createStream(fileObj)

    const spinner = ora(`Translating ${filePath}`).start();
    console.log('rrrrr')
    let res = await chatAPI.sendMessage(`I will give you a serial of paragraphs in markdown format, please translate it to ${localeName}, and output unrendered markdown if you received, thanks`)
    console.log(res)
    for (const paragraph of paragraphs) {
      res = await chatAPI.sendMessage(paragraph, res)
      console.log(res.text)
      fileService.writeToFile(stream, res.text)
    }
    stream.end()
    spinner.succeed()
    /*
    const text = await oraPromise(gptService.sendMessage(prompt), {
      text: `Translating ${filePath}`,
      successText: `Finish translating ${filePath}`
    })
    const text = await oraPromise(gptService.sendMessage('Write a poem about cats.'), {
      text: `Translating ${filePath}`,
      successText: `Finish translating ${filePath}`
    })
    fileService.writeToFile(fileObj, text)
     */
  }
}

const rawdata = fs.readFileSync('locale.json');
const locales = JSON.parse(rawdata.toString()) as { "Language Culture Name": string, "Display Name": string, "Culture Code": string, "ISO 639x Value": string }[];

var banner = figlet.textSync('Translate docs');
console.log(gradient.mind.multiline(banner));

const prompts = new Subject<Answers>();

inquirer
  .prompt(prompts)
  .ui.process.pipe(toArray())
  .subscribe(async (answers) => {
    const [fileInfo, localeInfo] = answers
    const allFiles = fileService.getAllFiles(fileInfo.answer, [])
    
    // await translateFiles(allFiles, fileInfo.answer, localeInfo.answer)

    // await translateFiles([allFiles[0]], fileInfo.answer, localeInfo.answer)
    await translateFiles(['/docs/demo.md'], fileInfo.answer, localeInfo.answer)
  });

prompts.next({
  type: 'input',
  name: 'Path',
  default: "/docs",
  message: 'What\'s the doc path?',
});

prompts.next({
  type: 'rawlist',
  name: 'Locale',
  message: 'What\'s the language you want?',
  choices: locales.map(locale => ({ name: `${locale['Display Name']} (${locale['Language Culture Name']})`, value: locale['Language Culture Name']})),
  default: 29
});

prompts.complete();
