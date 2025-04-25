import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-sensor-modal',
  template: `
    <h1 mat-dialog-title>Edytuj czujnik</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>IP</mat-label>
        <input matInput [(ngModel)]="sensorIp" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Anuluj</button>
      <button mat-button color="primary" (click)="onSave()">Zapisz</button>
    </div>
  `
})
export class EditSensorModalComponent {
  sensorIp: string = ''; // domyślnie może być pusty lub mieć wartość czujnika

  constructor(public dialogRef: MatDialogRef<EditSensorModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { ip: string }) {
    this.sensorIp = data.ip;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.sensorIp); // Przekazanie zmodyfikowanego IP
  }
}
