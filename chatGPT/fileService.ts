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
    const folder =  fileObj.getFolder()
    const filename = fileObj.getFileName()

    // allFiles.push(path.join(__dirname, dirPath, "/", file))
    console.log("folder: ", folder)
    console.log("filename: ", filename)
    const dirname = path.dirname(path.join(__dirname, folder));
    if (!fs.existsSync(dirname)) {
      console.log('----- create foledr: ', dirname)
      fs.mkdirSync(dirname, { recursive: true });
    }
}

class FileObject {
    filePath: string
    constructor(filePath: string) {
      this.filePath = filePath
    }
    getFolder() {
      return this.filePath.substring(0, this.filePath.lastIndexOf("/")+1);
    }
    getFileName() {
      return this.filePath.replace(/^.*[\\\/]/, '')
    }
    getContent() {
      return fs.readFileSync(this.filePath)
    }
    // ERROR: An implementation cannot be declared in ambient contexts.
}


const funcs = {
  getAllFiles,
  createNestedFolder
}

export { funcs }

export default FileObject
