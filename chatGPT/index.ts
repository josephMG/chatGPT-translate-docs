import dotenv from 'dotenv'
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer, { Answers } from 'inquirer';
import { oraPromise } from 'ora'
import { Subject, toArray } from 'rxjs';
import fs from 'fs'
import FileObj, { funcs as fileService} from './fileService'
import { funcs as gptService} from './chatGPTService'

dotenv.config()

const translateFiles = async (arrayOfFiles: string[], localeName: string) => {
  for (const filePath of arrayOfFiles) {
    const fileObj = new FileObj(filePath)
    fileService.createNestedFolder(fileObj)
    const content = fileObj.getContent()

    const prompt = `translate the following markdown to ${localeName} and output unrendered markdown

${content}
      `
    console.log(prompt)
    const text = await oraPromise(gptService.sendMessage('Write a poem about cats.'), {
      text: `Translating ${filePath}`,
      successText: `Finish translating ${filePath}`
    })
    console.log(text)
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
    
    // translateFiles(allFiles, localeInfo.answer)

    await translateFiles(['/docs/demo.md'], localeInfo.answer)
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
  choices: locales.map(locale => ({ name: `${locale['Display Name']} (${locale['Language Culture Name']})`, value: locale['Language Culture Name']}))
});

prompts.complete();
