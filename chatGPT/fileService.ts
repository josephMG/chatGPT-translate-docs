import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const createNestedFolder = function(fileObj: FileObject) {
    const folder =  fileObj.getDestinationFolder()
    // allFiles.push(path.join(__dirname, dirPath, "/", file))
    const dirName = path.join(__dirname, folder)
    if (!fs.existsSync(dirName)) {
      console.log('----- create foledr: ', dirName)
      fs.mkdirSync(dirName, { recursive: true });
    }
}

const writeToFile = (fileObj: FileObject, text: string) => {
  try {
    fs.appendFileSync(fileObj.getDestinationFullPath(), text, 'utf8');
  } catch (err) {
    console.error(err);
  }
}

const replaceNullChar = (fileObj: FileObject) => {
  fs.readFile(fileObj.getDestinationFullPath(), 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/\0/g, '')

    fs.writeFile(fileObj.getDestinationFullPath(), result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

const removeFile = (fileObj: FileObject) => {
  try {
    const filePath = path.join(__dirname, fileObj.getDestinationFolder(), fileObj.getFileName())
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  } catch (err) {
    console.error(err);
  }
}

const writeFailedFiles = (files: string[], fileName: string) => {
  const filePath = path.join(__dirname, fileName)
  fs.writeFile(filePath, JSON.stringify(files), 'utf8', function (err) {
    if (err) return console.log(err);
  });
}

class FileObject {
    filePath: string
    sourceFolder: string
    destFolder: string
    constructor(filePath: string, sourceFolder: string, destFolder: string) {
      this.filePath = filePath
      this.sourceFolder = sourceFolder
      this.destFolder = destFolder
    }
    getFolder() {
      return this.filePath.substring(0, this.filePath.lastIndexOf("/")+1);
    }
    getFileName() {
      return this.filePath.replace(/^.*[\\\/]/, '')
    }
    getDestinationFolder() {
      const folder = this.getFolder()
      const regExp = new RegExp(`^${this.sourceFolder}`)
      return folder.replace(regExp, `${this.destFolder}`)
    }
    getContent() {
      return fs.readFileSync(this.filePath, {encoding: 'utf8'})
    }
    getDestinationFullPath() {
      return path.join(__dirname, this.getDestinationFolder(), this.getFileName())
    }
    // ERROR: An implementation cannot be declared in ambient contexts.
}


const funcs = {
  getAllFiles,
  createNestedFolder,
  writeToFile,
  replaceNullChar,
  removeFile,
  writeFailedFiles
}

export { funcs }

export default FileObject
