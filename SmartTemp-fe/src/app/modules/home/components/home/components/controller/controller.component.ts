import {Component, OnInit} from '@angular/core';
import {MeasureSensorsService} from "../../../../../core/services/measure-sensors.service";
import {SharedService} from "../../../../../core/services/shared.service";

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {
  constructor(private measureSensorService : MeasureSensorsService, private sharedService: SharedService) {
  }

  info = '';
  error = '';
  selectedValue = '';

  max = 6;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  sliderPoints = [0, 1, 2, 3, 4, 5, 6];

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
