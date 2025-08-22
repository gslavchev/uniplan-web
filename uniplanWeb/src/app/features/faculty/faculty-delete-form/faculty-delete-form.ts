import { Component, Inject } from '@angular/core';
import { DeleteForm } from '../../../core/shared/delete-form/delete-form';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FacultyService } from '../faculty-service';

@Component({
  selector: 'app-faculty-delete-form',
  imports: [DeleteForm, MatDialogModule],
  standalone: true,
  templateUrl: './faculty-delete-form.html',
  styleUrl: './faculty-delete-form.scss',
})
export class FacultyDeleteForm {
  constructor(
    private facultyService: FacultyService,
    private dialogRef: MatDialogRef<FacultyDeleteForm>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string; facultyName: string }
  ) {}

  deleteFaculty(): void {
    this.facultyService.deleteFaculty(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        alert('Възникна грешка при изтриването на факултета.');
      },
    });
  }
}
