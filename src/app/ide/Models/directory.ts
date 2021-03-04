import { CodeFile } from "./file";

export class Directory extends CodeFile {

  public files: CodeFile[];

  constructor(fileName: string) {
    super(fileName, null);
    this.isDir = true;
    this.files = new Array<CodeFile>();
  }
}
