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
import { of } from 'rxjs';
import { Router } from "@angular/router";
import { catchError } from "rxjs/internal/operators";
var TokenInterceptorService = /** @class */ (function () {
    function TokenInterceptorService(router) {
        this.router = router;
    }
    /**
     * intercept all XHR request
     * @param request
     * @param next
     * @returns {Observable<A>}
     */
    TokenInterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        if (localStorage.getItem('jwtToken')) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + localStorage.getItem('jwtToken')
                }
            });
        }
        /**
         * continues request execution
         */
        return next.handle(request).pipe(catchError(function (error, caught) {
            //intercept the respons error and displace it to the console
            console.log(error);
            _this.handleAuthError(error);
            return of(error);
        }));
    };
    /**
     * manage errors
     * @param err
     * @returns {any}
     */
    TokenInterceptorService.prototype.handleAuthError = function (err) {
        //handle your auth error or rethrow
        if (err.status === 401) {
            //navigate /delete cookies or whatever
            console.log('handled error ' + err.status);
            this.router.navigate(["/login"]);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message);
        }
        throw err;
    };
    TokenInterceptorService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Router])
    ], TokenInterceptorService);
    return TokenInterceptorService;
}());
export { TokenInterceptorService };
//# sourceMappingURL=token-interceptor.service.js.map