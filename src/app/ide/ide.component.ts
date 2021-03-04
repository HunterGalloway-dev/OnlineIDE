import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as ace from 'ace-builds';
import { Directory } from './Models/directory';
import { CodeFile } from './Models/file';
import { IDESession } from './Models/idesession';
import { RunConfig } from './Models/run-config';
import { FileManagerService } from './Services/file-manager.service';
import { IDEService } from './Services/ideservice.service';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IDEComponent implements OnInit {

  @ViewChild("editor", {static: false}) private editor: ElementRef<HTMLElement>;
  @ViewChild("console", {static: false}) private console: ElementRef<HTMLElement>;

  showFiller = false;
  private curFile: CodeFile;
  private curDirectory: Directory;
  private aceEditor: ace.Ace.Editor;

  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  testingOptions: string[] = ["Output","Input and Ouput","Unit-Testing"];

  public ideSession: IDESession;

  constructor(private ideService: IDEService, private fileManagerService: FileManagerService) {
    this.ideSession = new IDESession("java");

    this.ideSession.openedFiles = new Array<CodeFile>();
    this.fileManagerService.getFileSelector().subscribe(val => {
      if(val && val.isDir) {
        this.curDirectory = val;
      } else {
        if(this.ideSession.openedFiles.indexOf(val) == -1) {
          this.ideSession.openedFiles.push(val);
        }
        this.selectFile(val);
      }
    });
  }

  ngOnInit() {

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    ace.require("ace/ext/language_tools");
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setValue('Please create and open a file...');
    this.aceEditor.session.setMode('ace/mode/' + this.ideSession.language);
    this.aceEditor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: false,
      readOnly: !this.curFile,

    });

    this.aceEditor.on("change", () => {
      this.curFile.fileContent = this.aceEditor.getValue();
    });

    const aceConsole = ace.edit(this.console.nativeElement);
    aceConsole.setOptions({
      readOnly: true,
      showLineNumbers: false,
      showGutter: false,
      highlightActiveLine: false,
      highlightSelectedWord: false,
      showPrintMargin: false
    });

    this.ideService.getConsoleObservable().subscribe(input => {
      aceConsole.setValue(aceConsole.getValue() + input, 1);
    });
  }

  getFiles(): CodeFile[] {
    return this.fileManagerService.getFiles();
  }

  runCode() {
    const runconfig: RunConfig = {
      lang: this.ideSession.language,
      runFile: this.curFile.fileName,
      files: this.fileManagerService.getFiles(),
      test: this.ideSession.test,
      testOption: undefined,
      testIn: undefined,
      testOut: undefined
    }
    this.ideService.runCode(runconfig);
  }
  closeFile(file: CodeFile) {
    const index: number = this.ideSession.openedFiles.indexOf(file);
    this.ideSession.openedFiles.splice(index, 1);

    if(this.ideSession.openedFiles.length > 0) {
      this.selectFile(this.ideSession.openedFiles[0]);
    } else {
      this.selectFile(null);
    }
  }

  selectFile(file: CodeFile) {
    this.curFile = file;

    this.aceEditor.setReadOnly(!file);
    if(file) {
      this.aceEditor.setValue(this.curFile.fileContent, 1);
    } else {
      this.aceEditor.setValue("Please open or create a file...", -1);
    }
  }

  //work the name pal
  toggleFileExplorer() {
    this.ideSession.showSettings = false;
    this.ideSession.showFileExplorer = !this.ideSession.showFileExplorer;
  }

  toggleSettings() {
    this.ideSession.showFileExplorer = false;
    this.ideSession.showSettings = !this.ideSession.showSettings;
  }

  toggleTesting() {
    this.ideSession.showTestingMenu = !this.ideSession.showTestingMenu;
  }

  change(e) {
    this.ideSession.test = e.checked;
    this.ideSession.showTestingMenu = e.checked;
  }

}
