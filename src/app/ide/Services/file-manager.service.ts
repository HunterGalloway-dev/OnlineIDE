import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { CodeFile } from '../Models/file';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  private files: CodeFile[];
  private fileSelector: Subject<CodeFile>;

  constructor() {
    this.fileSelector = new Subject<CodeFile>();
  }

  getFileSelector(): Observable<CodeFile> {
    return this.fileSelector;
  }

  selectFile(file: CodeFile) {
    this.fileSelector.next(file);
  }

  setFiles(files: CodeFile[]) {
    this.files = files;
  }

  getFiles(): CodeFile[] {
    return this.files;
  }
}
