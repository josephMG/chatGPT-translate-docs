import dotenv from 'dotenv'
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer, { Answers } from 'inquirer';
import ora from 'ora'
import { Subject, toArray } from 'rxjs';
import fs from 'fs'
import FileObj, { funcs as fileService} from './fileService'
import ChatGPT from './chatGPTService'
import chalk from 'chalk';

dotenv.config()

const convertContentToParagraph = (content: string) => {
  const codeMatches = [...content.matchAll(/^```.+\n([\s\S]*?)```/gm)]
  let startPos = 0
  const paragraph: string[] = []
  for(const codeMatch of codeMatches) {
    const endPos = codeMatch.index! + codeMatch[0].length
    const paragraphMatches = [...(content.substring(startPos, endPos).matchAll(/\n\n/g))]
    if (paragraphMatches.length < 20) continue
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

    const spinner = ora(chalk.cyan(`Translating ${filePath}`)).start();
    let res = await chatAPI.sendMessage(`I will give you a series of paragraphs in markdown format, please translate to ${localeName} one by one, and output unrendered markdown if you received, thanks`)
    for (const paragraph of paragraphs) {
      spinner.text = chalk.blue('SendMessage...')
      res = await chatAPI.sendMessage(paragraph, res)
      spinner.text = chalk.green('Write to file...')
      fileService.writeToFile(fileObj, res.text)
      spinner.text = chalk.cyan(`Translating ${filePath}`)
    }
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
