import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer, { Answers } from 'inquirer';
import nanospinner from 'nanospinner';
import { Subject, toArray } from 'rxjs';
import fs from 'fs'
import path from 'path'

const getAllFiles = function(dirPath: string, arrayOfFiles: string[]) {
  const files = fs.readdirSync(dirPath)
  const allFiles = [...arrayOfFiles]

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      allFiles.splice(-1, 0, ...(getAllFiles(dirPath + "/" + file, arrayOfFiles)))
    } else {
      allFiles.push(`${dirPath}/${file}`)
    }
  })

  return allFiles
}

const translateFiles = function(arrayOfFiles: string[], localeName: string) {
  arrayOfFiles.forEach((filePath) => {
    const folder =  filePath.substring(0,filePath.lastIndexOf("/")+1);
    const filename = filePath.replace(/^.*[\\\/]/, '')

    // allFiles.push(path.join(__dirname, dirPath, "/", file))
    console.log("folder: ", folder)
    console.log("filename: ", filename)
    const dirname = path.dirname(path.join(__dirname, folder));
    if (!fs.existsSync(dirname)) {
      console.log('----- create foledr: ', dirname)
      fs.mkdirSync(dirname, { recursive: true });
    }
    const content = fs.readFileSync(filePath)

    console.log(
      `translate the following markdown to ${localeName} and output unrendered markdown

${content}
      `
    )
  })
}

const rawdata = fs.readFileSync('locale.json');
const locales = JSON.parse(rawdata.toString()) as { "Language Culture Name": string, "Display Name": string, "Culture Code": string, "ISO 639x Value": string }[];

var banner = figlet.textSync('Translate docs');
console.log(gradient.mind.multiline(banner));

const prompts = new Subject<Answers>();

inquirer
  .prompt(prompts)
  .ui.process.pipe(toArray())
  .subscribe((answers) => {
    const [fileInfo, localeInfo] = answers
    const allFiles = getAllFiles(fileInfo.answer, [])

    const lastFile = allFiles[0]
    translateFiles([lastFile], localeInfo.answer)
    // translateFiles(allFiles)

    const spinner = nanospinner.createSpinner('Rendering').start();
    setTimeout(() => {
        spinner.success({ text: chalk.blue('Done') });
    }, 100)
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
