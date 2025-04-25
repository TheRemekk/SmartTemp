import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  template: `
    <h1 mat-dialog-title>Potwierdzenie usunięcia</h1>
    <div mat-dialog-content>
      <p>Czy na pewno chcesz usunąć czujnik?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Nie</button>
      <button mat-button color="warn" (click)="onConfirm()">Tak</button>
    </div>
  `
})
export class ConfirmDeleteModalComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
