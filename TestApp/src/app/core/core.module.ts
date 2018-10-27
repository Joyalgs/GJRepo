import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class CoreModule { }
