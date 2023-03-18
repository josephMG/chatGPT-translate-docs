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
    fs.writeFileSync(path.join(__dirname, fileObj.getDestinationFolder(), fileObj.getFileName()), text)
  } catch (err) {
    console.error(err);
  }
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
    // ERROR: An implementation cannot be declared in ambient contexts.
}


const funcs = {
  getAllFiles,
  createNestedFolder,
  writeToFile
}

export { funcs }

export default FileObject
