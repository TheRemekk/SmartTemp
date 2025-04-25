import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class SharedModule { }
