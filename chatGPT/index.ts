import dotenv from 'dotenv'
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer, { Answers } from 'inquirer';
import { oraPromise } from 'ora'
import { Subject, toArray } from 'rxjs';
import fs from 'fs'
import FileObj, { funcs as fileService} from './fileService'
import { funcs as gptService} from './chatGPTService'

dotenv.config()

const translateFiles = async (arrayOfFiles: string[], sourceFolder: string, localeName: string) => {
  for (const filePath of arrayOfFiles) {
    const fileObj = new FileObj(filePath, sourceFolder, localeName)
    fileService.createNestedFolder(fileObj)
    const content = fileObj.getContent()

    const prompt = `translate the following markdown to ${localeName} and output unrendered markdown

${content}
      `
    console.log(prompt)
    const text = await oraPromise(gptService.sendMessage(prompt), {
      text: `Translating ${filePath}`,
      successText: `Finish translating ${filePath}`
    })
    /*
    const text = await oraPromise(gptService.sendMessage('Write a poem about cats.'), {
      text: `Translating ${filePath}`,
      successText: `Finish translating ${filePath}`
    })
     */
    fileService.writeToFile(fileObj, text)
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
