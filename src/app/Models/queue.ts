import { CodeFile } from "../ide/Models/file";

export class Stack<CodeFile> {

  entries: CodeFile[] = [];

  push(val: CodeFile) {
    this.entries.unshift(val);
  }

  pop(): CodeFile | undefined {
    return this.entries.shift();
  }

  peek(): CodeFile | undefined {
    let ret = undefined;

    if(this.entries.length != 0) {
      ret = this.entries[0];
    }

    return ret;
  }

  contains(search: CodeFile): boolean {
    return this.entries.indexOf(search) != -1;
  }
}
