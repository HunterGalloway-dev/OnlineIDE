export class CodeFile {

  fileName: string;
  fileContent: string;
  isDir: boolean;
  public files: CodeFile[];

  constructor(fileName: string, fileContent: string) {
    this.fileName = fileName;
    this.fileContent = fileContent;
    this.isDir = false;
    this.files = new Array<CodeFile>();
  }

  equals(compare: CodeFile) {
    return this.fileName == compare.fileName && this.fileContent == compare.fileContent && this.files == compare.files && this.isDir == compare.isDir;
  }
}
