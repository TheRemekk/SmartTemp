import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sensor-modal',
  template: `
    <h1 mat-dialog-title>Dodaj nowy czujnik</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Nazwa</mat-label>
        <input matInput [(ngModel)]="sensorName" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>IP</mat-label>
        <input matInput [(ngModel)]="sensorIp" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Anuluj</button>
      <button mat-button color="primary" (click)="onAdd()">Dodaj</button>
    </div>
  `
})
export class AddSensorModalComponent {
  sensorName: string = '';
  sensorIp: string = '';

  constructor(public dialogRef: MatDialogRef<AddSensorModalComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close({ name: this.sensorName, ip: this.sensorIp });
  }
}
