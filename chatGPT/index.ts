import dotenv from 'dotenv'
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer, { Answers } from 'inquirer';
import { Subject, toArray } from 'rxjs';
import fs from 'fs'
import { funcs as fileService } from './fileService'
import { chunkFiles, getSuccessFiles } from './utils';

dotenv.config()
const rawdata = fs.readFileSync('locale.json');
const locales = JSON.parse(rawdata.toString()) as { "Language Culture Name": string, "Display Name": string, "Culture Code": string, "ISO 639x Value": string }[];
const successFileJson = getSuccessFiles()

var banner = figlet.textSync('Translate docs');
console.log(gradient.mind.multiline(banner));

const prompts = new Subject<Answers>();

inquirer
  .prompt(prompts)
  .ui.process.pipe(toArray())
  .subscribe(async (answers) => {
    const [fileInfo, localeInfo] = answers
    const allFiles = fileService.getAllFiles(fileInfo.answer, []).filter(filePath => !successFileJson.includes(filePath))
    
    // await chunkFiles(allFiles, fileInfo.answer, localeInfo.answer)

    await chunkFiles([allFiles[0]], fileInfo.answer, localeInfo.answer)
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
