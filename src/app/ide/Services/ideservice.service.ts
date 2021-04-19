import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RunConfig } from '../Models/run-config';

@Injectable({
  providedIn: 'root'
})
export class IDEService {

  constructor(private http: HttpClient, private ideService: IDEService) {

  }

  private consoleObservable = new Subject<string>();

  public getConsoleObservable(): Observable<string> {
    return this.consoleObservable.asObservable();
  }

  public printToConsole(input: string) {
    this.consoleObservable.next(input);
  }

  public printlnToConsole(input: string) {
    this.consoleObservable.next(input + "\n");
  }

  public runCode(runConfig: RunConfig): String {
    let ret = "";
    let req = JSON.stringify(runConfig);
    this.http.post("http://localhost:8080/foo",req).subscribe((res: {Output: string}) => {
      this.printToConsole(res.Output);
    });

    return ret;
  }

}
