import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import { ChartComponent } from './components/home/components/chart/chart.component';
import { SensorsComponent } from './components/home/components/sensors/sensors.component';
import { ControllerComponent } from './components/home/components/controller/controller.component';
import {DatePipe} from "@angular/common";
import {AddSensorModalComponent} from "./components/home/components/sensors/dialogs/add-sensor-modal.component";
import {ConfirmDeleteModalComponent} from "./components/home/components/sensors/dialogs/confirm-delete-modal.component";
import {EditSensorModalComponent} from "./components/home/components/sensors/dialogs/edit-sensor-modal.component";
import {Controller2Component} from "./components/home/components/controller2/controller2.component";

@NgModule({
  declarations: [
    HomeComponent,
    ChartComponent,
    SensorsComponent,
    ControllerComponent,
    Controller2Component,
    AddSensorModalComponent,
    ConfirmDeleteModalComponent,
    EditSensorModalComponent
  ],
  imports: [SharedModule, HomeRoutingModule, FormsModule],
  providers: [DatePipe]
})
export class HomeModule { }
