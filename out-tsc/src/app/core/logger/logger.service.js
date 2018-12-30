var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorType } from '../models/IError';
import { of } from 'rxjs';
import { map } from "rxjs/operators";
var LoggerService = /** @class */ (function () {
    function LoggerService(http) {
        this.http = http;
        this._trace = [];
    }
    LoggerService.prototype.post = function (trace) {
        // get error logs from local storage
        var localLogs = localStorage.getItem('errLog');
        if (localLogs) {
            this._trace = JSON.parse(localLogs);
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
            return this.http.post('url', this._trace).pipe(map(function (res) {
                return res;
            }));
        }
        else {
            return of(0);
        }
    };
    LoggerService.prototype.clearLogs = function () {
        localStorage.removeItem('errLog');
    };
    LoggerService.prototype.checkLogs = function () {
        var storedLogs = localStorage.getItem('errLog');
        if (storedLogs) {
            return of(true);
        }
        return of(false);
    };
    LoggerService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], LoggerService);
    return LoggerService;
}());
export { LoggerService };
//# sourceMappingURL=logger.service.js.map