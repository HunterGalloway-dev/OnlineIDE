import { CodeFile } from "./file";

export class IDESession {
  language: string;
  showFileExplorer: boolean = true;
  showSettings: boolean = false;
  showConsole: boolean = true;
  showTesting: boolean = false;
  showTestingMenu: boolean = false;
  test: boolean = false; // CHANGE FOR FINAL
  testingOption: string;
  testFile: string;
  openedFiles: CodeFile[] = [];

  constructor(language: string) {
    this.language = language;
  }
}
