import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    HeaderComponent
  ],
    imports: [
        SharedModule,
        HttpClientModule,
        RouterLinkActive,
        RouterLink
    ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
