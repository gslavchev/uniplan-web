import { Component, Inject, INJECTOR } from '@angular/core';
import { DeleteForm } from '../../../core/shared/delete-form/delete-form';
import { StudentService } from '../student-service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-student-delete-form',
  imports: [DeleteForm, MatDialogModule],
  templateUrl: './student-delete-form.html',
  styleUrl: './student-delete-form.scss',
})
export class StudentDeleteForm {
  constructor(
    private studentService: StudentService,
    private dialogRef: MatDialogRef<StudentDeleteForm>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      studentId: string;
      majorId: string;
      courseId: string;
      name: string;
    }
  ) {}

  deleteStudent() {
    this.studentService.deleteStudent(this.data.studentId).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        alert('Delete failed');
      },
    });
  }
}
