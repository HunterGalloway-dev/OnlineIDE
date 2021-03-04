import { CodeFile } from "./file";

export class RunConfig {
  lang: string;
  runFile: string;
  files: CodeFile[];
  test: boolean;
  testOption: string;
  testIn: string;
  testOut: string;
}
