import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { IError, ErrorType } from '../models/IError';
import * as StackTraceParser from 'error-stack-parser'
import * as moment from 'moment';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  trace: IError = {};
  constructor(private injector: Injector) { }

  handleError(error: any) {
    this.trace.message = error.message || error.tostring();
    this.trace.status = error.status || null;
    this.trace.stack = error.stack ? StackTraceParser.parse(error) : null;
    this.trace.time = moment().format();

    let router = this.injector.get(Router);
    this.trace.url = router.url;

    if (!navigator.onLine) {
      this.trace.errorType = ErrorType.Offline;
    }
    else if (this.trace.message.includes('unknown url')) {
      this.trace.errorType = ErrorType.APIDown;
    }
    else if (error instanceof HttpErrorResponse) {
      this.trace.errorType = ErrorType.APIError;
    }
    else if (this.trace.stack != null) {
      //client side err
      this.trace.errorType = ErrorType.UIError;
    }
    else {
      this.trace.errorType = ErrorType.Unknown
    }

//alert(JSON.stringify(this.trace));
    //service call to post error trace

  }
}
