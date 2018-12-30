var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Injector } from '@angular/core';
import { ErrorType } from '../models/IError';
import * as StackTraceParser from 'error-stack-parser';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
var ErrorHandlerService = /** @class */ (function () {
    function ErrorHandlerService(injector) {
        this.injector = injector;
        this.trace = {};
    }
    ErrorHandlerService.prototype.handleError = function (error) {
        this.trace.message = error.message || error.tostring();
        this.trace.status = error.status || null;
        this.trace.stack = error.stack ? StackTraceParser.parse(error) : null;
        this.trace.time = moment().format();
        var router = this.injector.get(Router);
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
            this.trace.errorType = ErrorType.Unknown;
        }
        alert(JSON.stringify(this.trace));
        //service call to post error trace
    };
    ErrorHandlerService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Injector])
    ], ErrorHandlerService);
    return ErrorHandlerService;
}());
export { ErrorHandlerService };
//# sourceMappingURL=error-handler.service.js.map