import {Component, OnInit} from '@angular/core';
import {MeasureSensorsService} from "../../../../../core/services/measure-sensors.service";
import {SharedService} from "../../../../../core/services/shared.service";
import { NotifierService } from 'angular-notifier';
import {Observable} from "rxjs";
import {selectAuthError} from "../../../../../auth/store/auth.selectors";

@Component({
  selector: 'app-controller2',
  templateUrl: './controller2.component.html',
  styleUrls: ['./controller2.component.scss']
})
export class Controller2Component implements OnInit {
  constructor(private measureSensorService : MeasureSensorsService, private sharedService: SharedService) {
  }
  info = '';
  error = '';
  selectedValue = '';
  value: number = 0; // Domyślna wartość: OFF

  setValue(val: number): void {
    this.value = val;
    // console.log(`Aktualna wartość: ${this.value}`);
  }

  ngOnInit() {
    this.sharedService.selectValue$.subscribe((value) => {
      this.selectedValue = value;
    });
  }

  setLevel() {
    this.measureSensorService.sendMessage(this.selectedValue, String(this.value)).subscribe({
      next: (data) => {
        //console.log(this.selectedValue)
        this.info = 'Pomyślnie ustawiono wartość!';
        this.error = '';
        //console.log(data);
      },
      error: (err) => {
        console.log(err);
        this.info = '';
        this.error = 'Wystąpił błąd!';
      }
    })
  }
}
