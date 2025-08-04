import { Component, Inject } from '@angular/core';
import { EditForm } from '../../../core/shared/edit-form/edit-form';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MajorService } from '../major-service';

@Component({
  selector: 'app-major-edit-form',
  imports: [
    EditForm,
    MatDialogModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './major-edit-form.html',
  styleUrl: './major-edit-form.scss',
})
export class MajorEditForm {
  majorName = '';
  faculty = '';

  constructor(
    private dialogRef: MatDialogRef<EditForm>,
    private majorService: MajorService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      name: string;
      faculty: string;
    }
  ) {
    this.majorName = data.name;
    this.faculty = data.faculty;
  }

  save() {
    if (!this.majorName.trim()) {
      alert('Please enter Name.');
      return;
    }

    if (!this.faculty.trim()) {
      alert('Please enter faculty.');
      return;
    }

    this.majorService
      .editMajor(this.data.id, {
        name: this.majorName,
        faculty: this.faculty,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          alert('Failed to update major.');
        },
      });
  }
}
