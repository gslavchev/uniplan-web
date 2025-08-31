import { Component, Inject } from '@angular/core';
import { DeleteForm } from '../../../core/shared/delete-form/delete-form';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MajorService } from '../major-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-major-delete-form',
  imports: [DeleteForm, MatDialogModule],
  templateUrl: './major-delete-form.html',
  styleUrl: './major-delete-form.scss',
})
export class MajorDeleteForm {
  constructor(
    private majorService: MajorService,
    private dialogRef: MatDialogRef<MajorDeleteForm>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string; courseId: string; name: string }
  ) {}

  deleteMajor(): void {
    this.majorService
      .deleteCourse(this.data.courseId)
      .pipe(switchMap(() => this.majorService.deleteMajor(this.data.id)))
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          alert('Delete failed');
        },
      });
  }
}
