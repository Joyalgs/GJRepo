import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IError, ErrorType } from '../models/IError';
import { Observable, observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private _trace: IError[] = [];

  constructor(private http: HttpClient) { }

  public post(trace: IError): Observable<number> {
    // get error logs from local storage
    const localLogs = localStorage.getItem('errLog');
    if (localLogs) {
      this._trace = JSON.parse(localLogs)
    }
    else {
      this._trace = [];
    }

    //Update log in local storage
    if (trace) {
      this._trace.push(trace);
      localStorage.setItem('errLog', JSON.stringify(this._trace));
    }

    //Ignore service call for offline and APIdown errs
    if ((trace && trace.errorType && trace.errorType == ErrorType.Offline) || (trace && trace.errorType && trace.errorType == ErrorType.APIDown))
      return of(0);

    if (this._trace && this._trace.length > 0) {
      return this.http.post<IError[]>('url', this._trace).pipe(map((res: any) => {
        return res;
      }));
    }
    else {
      return of(0);
    }
  }

  public clearLogs() {
    localStorage.removeItem('errLog');
  }

  public checkLogs() {
    const storedLogs = localStorage.getItem('errLog');
    if (storedLogs) {
      return of(true);
    }
    return of(false);
  }
}
