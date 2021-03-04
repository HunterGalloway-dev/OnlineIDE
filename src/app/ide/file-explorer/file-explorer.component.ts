import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material';
import { Direct } from 'protractor/built/driverProviders';
import { Stack } from 'src/app/Models/queue';
import { Directory } from '../Models/directory';
import { CodeFile } from '../Models/file';
import { FileManagerService } from '../Services/file-manager.service';


interface FileNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})

export class FileExplorerComponent implements OnInit {

  @ViewChild('tree', {static: false}) tree: MatTree<any>;
  private pdir: CodeFile[] = new Array<CodeFile>();
  private curDir: Directory;
  treeControl = new NestedTreeControl<CodeFile>(node => node.files);
  dataSource = new MatTreeNestedDataSource<CodeFile>();
  private dirQueue: Stack<Directory> = new Stack<Directory>();

  constructor(private fileManagerService: FileManagerService) {
    this.dataSource.data = this.pdir;
    this.fileManagerService.setFiles(this.pdir);
  }

  hasChild = (_: number, node: CodeFile) => !!node.files && node.isDir;

  ngOnInit() {

  }

  addFile() {
    if(this.dirQueue.peek()) {
      this.dirQueue.peek().files.push(new CodeFile("",""))
    } else {
      this.pdir.push(new CodeFile("",""))
    }
    this.refreshTreeData();
    this.fileManagerService.setFiles(this.pdir);
  }

  refreshTreeData() {
    const data = this.dataSource.data;
    this.dataSource.data = null;
    this.dataSource.data = data;
  }

  addDirectory() {
    if(this.dirQueue.peek()) {
      this.dirQueue.peek().files.push(new Directory(""));

    } else {
      this.pdir.push(new Directory(""))

    }
    this.refreshTreeData();
  }

  /*
    Working on creating file structure from menu options.
    You need to work on session for the IDE which should come after serializing the data
    Suck a dick
  */

  keyDown(event, inputField, node) {
    if(event.code == "Enter") {
      node.fileName = inputField;
    }
  }

  select(selectFile: CodeFile) {
    if(selectFile.isDir) {
      if(this.dirQueue.contains(selectFile)) {
        while(!this.dirQueue.peek().equals(selectFile)) {
          this.dirQueue.pop();
        }

        this.dirQueue.pop();
      } else {
        this.dirQueue.push(selectFile);
      }
    } else {
      this.fileManagerService.selectFile(selectFile);
    }

    if(selectFile.isDir && !this.treeControl.isExpanded(selectFile)) {
      this.treeControl.collapseDescendants(selectFile);
    }

  }
}
