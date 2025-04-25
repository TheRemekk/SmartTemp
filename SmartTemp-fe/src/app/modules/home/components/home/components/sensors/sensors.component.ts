import {Component, OnInit} from '@angular/core';
import {MeasureSensorsService} from "../../../../../core/services/measure-sensors.service";
import {MeasureSensor} from "../../../../../core/models/measure.model";
import {ConfirmDeleteModalComponent} from "./dialogs/confirm-delete-modal.component";
import {EditSensorModalComponent} from "./dialogs/edit-sensor-modal.component";
import {AddSensorModalComponent} from "./dialogs/add-sensor-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
  constructor(private measureSensorsService: MeasureSensorsService, public dialog: MatDialog) {}
  sensors: any = [];
  displayedColumns: string[] = ['name', 'ip', 'active', 'action'];

  ngOnInit(): void {
    this.measureSensorsService.getAllSensors().subscribe({
        next: (data: MeasureSensor[]) => {
          this.sensors = data;
        },
        error: (err) => {
          console.error('Błąd pobierania danych', err);
        }
      })
    }

  openDeleteDialog(name: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.measureSensorsService.deleteSensor(name).subscribe({
          next: () => {
            this.ngOnInit();
          }
        })
      }
    });
  }

  openEditDialog(name: string, ip: string): void {
    const dialogRef = this.dialog.open(EditSensorModalComponent, {
      data: { ip }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const resultAsString = String(result);

        this.measureSensorsService.updateSensorIp({ name, ip: resultAsString }).subscribe({
          next: () => {
            this.ngOnInit();
          }
        });
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddSensorModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.measureSensorsService.addSensor(result).subscribe({
          next: () => {
            this.ngOnInit();
          }
        })
      }
    });
  }
}
