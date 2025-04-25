import {AfterViewInit, Component, OnInit, OnDestroy} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Layout } from 'plotly.js';
import {FormGroup, FormControl} from '@angular/forms';
import * as Plotly from "plotly.js-dist-min";
import {filter, interval, Subscription, tap} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {MeasureDataService} from "../../../../../core/services/measure-data.service";
import {MeasureDataList, MeasureSensor} from "../../../../../core/models/measure.model";
import {MeasureSensorsService} from "../../../../../core/services/measure-sensors.service";
import {SharedService} from "../../../../../core/services/shared.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  sensors: any = [];

  measurements: MeasureDataList = {
    measurDates: [],
    sensor: '',
    temps: [],
    mois: [],
    levels: [],
  };

  loading = false;
  constructor(private measureDataService: MeasureDataService,
              private measureSensorsService: MeasureSensorsService,
              private datePipe: DatePipe,
              private sharedService: SharedService) {}

  today = new Date();

  range = new FormGroup({
    start: new FormControl<Date | null>(this.today),
    end: new FormControl<Date | null>(this.today),
  });

  selectedSensors: string = '';
  temperatureChecked = true;
  humidityChecked = false;
  levelChecked = false;

  ngOnInit(): void {
    const minValue = this.datePipe.transform(this.range.controls.start.getRawValue()?.toString(), 'yyyy-MM-dd') + ' 00:00:00' ?? '';
    const maxValue = this.datePipe.transform(this.range.controls.end.getRawValue()?.toString(), 'yyyy-MM-dd') + ' 23:59:59' ?? '';

    this.measureSensorsService.getAllSensors().subscribe({
      next: (data: MeasureSensor[]) => {
        this.sensors = data;
        this.selectedSensors = this.sensors[0].name;
        this.sharedService.updateSelectValue(this.selectedSensors);
        const sensorName = this.selectedSensors;
        this.fetchMeasurements(sensorName, minValue, maxValue);
        this.loading = false;
      },
      error: (err) => {
        console.error('Błąd pobierania danych', err);
        this.loading = false;
      }
    })

    this.subscription = interval(60000) // 60000 - 1 minuta
      .pipe(
        switchMap(() => this.measureDataService.getLatestData(this.selectedSensors)),
        // tap((data) => console.log(this.selectedSensors)),
        filter((data) => maxValue >= data.measurDate.split("T")[0])
      )
      .subscribe({
        next: (data) => {
          this.measurements.measurDates.push(data.measurDate)
          this.measurements.levels.push(data.level)
          this.measurements.mois.push(data.mois)
          this.measurements.temps.push(data.temp)
          this.renderChart();
        },
        error: (err) => {
          console.error('Błąd pobierania danych', err);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchMeasurements(sensorName: string, minValue: string, maxValue: string) {
    this.loading = true;
    this.measureDataService.getDataList(sensorName, minValue, maxValue).subscribe({
      next: (data) => {
        this.measurements = data;
        this.loading = false;
        this.renderChart();
      },
      error: (err) => {
        console.error('Błąd pobierania danych', err);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    const sensorName = this.selectedSensors;
    const minValue = this.datePipe.transform(this.range.controls.start.getRawValue()?.toString(), 'yyyy-MM-dd') + ' 00:00:00' ?? '';
    const maxValue = this.datePipe.transform(this.range.controls.end.getRawValue()?.toString(), 'yyyy-MM-dd') + ' 23:59:59' ?? '';
    // console.log(minValue)
    // console.log(maxValue)

    this.fetchMeasurements(sensorName, minValue, maxValue)
    // console.log({
    //   startDate: this.range.controls.start.value,
    //   endDate: this.range.controls.end.value,
    //   selectedSensors: this.selectedSensors,
    //   temperature: this.temperatureChecked,
    //   humidity: this.humidityChecked,
    //   level: this.levelChecked,
    //   measurements: this.measurements,
    //   temps: this.measurements.temps,
    // });
  }

  onValueChange(event: any) {
    const newValue = event.value;
    this.sharedService.updateSelectValue(newValue);
  }

  private renderChart(): void {

   let data = [];

   if(this.temperatureChecked) {
     data.push({
       x: this.measurements.measurDates,
       y: this.measurements.temps,
       mode: 'lines+markers',
       name: 'Temperatura',
       line: { color: 'red' },
       yaxis: 'y',
     })
   }
   if(this.humidityChecked && !this.temperatureChecked) {
      data.push({
        x: this.measurements.measurDates,
        y: this.measurements.mois,
        mode: 'lines+markers',
        name: 'Wilgotność',
        line: { color: 'blue' },
        yaxis: 'y',
      })
    }
    else if(this.humidityChecked) {
      data.push({
        x: this.measurements.measurDates,
        y: this.measurements.mois,
        mode: 'lines+markers',
        name: 'Wilgotność',
        line: { color: 'blue' },
        yaxis: 'y2',
      })
    }
    if(this.levelChecked && !this.temperatureChecked) {
      data.push({
        x: this.measurements.measurDates,
        y: this.measurements.levels,
        mode: 'lines+markers',
        name: 'Poziom',
        line: { color: 'green' },
        yaxis: 'y2',
      })
    }
    else if(this.levelChecked) {
      data.push({
        x: this.measurements.measurDates,
        y: this.measurements.levels,
        mode: 'lines+markers',
        name: 'Poziom',
        line: { color: 'green' },
        yaxis: 'y3',
      })
    }

    if(this.temperatureChecked) {
      const layout: Partial<Layout> = {
        title: 'Wykres temperatury, wilgotności i poziomu',
        xaxis: {title: 'Czas'},
        yaxis: {
          tickfont: {color: 'red'},
          showgrid: true,
          position: 0,
          range: [0, 40],
        },
        yaxis2: {
          tickfont: {color: 'blue'},
          side: 'right',
          anchor: 'free',
          overlaying: 'y',
          position: 0.03,
          range: [0, 100],
        },
        yaxis3: {
          tickfont: {color: 'green'},
          side: 'right',
          anchor: 'free',
          overlaying: 'y',
          position: 0.97 ,
          range: [0, 6],
        },
      };
      Plotly.newPlot('chart', data, layout);
    }
    else {
      const layout: Partial<Layout> = {
        title: 'Wykres temperatury, wilgotności i poziomu',
        xaxis: {title: 'Czas'},
        yaxis: {
          tickfont: {color: 'blue'},
          showgrid: true,
          position: 0,
          range: [0, 100],
        },
        yaxis2: {
          tickfont: {color: 'green'},
          side: 'right',
          anchor: 'free',
          overlaying: 'y',
          position: 0.97,
          range: [0, 6],
        },
      };
      Plotly.newPlot('chart', data, layout);
    }
  }
}


