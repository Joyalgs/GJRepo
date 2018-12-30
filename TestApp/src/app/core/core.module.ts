import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlerService } from './errorHandler/error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './handler/token-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgbModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  //providers: []
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {provide: ErrorHandler, useClass: ErrorHandlerService}
  ],
})
export class CoreModule { }
