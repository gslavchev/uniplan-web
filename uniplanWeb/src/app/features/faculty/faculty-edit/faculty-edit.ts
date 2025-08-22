import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatLabel } from '@angular/material/form-field';
import { FacultyService } from '../faculty-service';
import { EditForm } from '../../../core/shared/edit-form/edit-form';

@Component({
  selector: 'app-faculty-edit',
  standalone: true,
  templateUrl: './faculty-edit.html',
  styleUrl: './faculty-edit.scss',
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
})
export class FacultyEdit {
  facultyName = '';
  location = '';
  universityId = '';

  constructor(
    private dialogRef: MatDialogRef<EditForm>,
    private facultyService: FacultyService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      facultyName: string;
      location: string;
      universityId: string;
    }
  ) {
    this.facultyName = data.facultyName;
    this.location = data.location;
    this.universityId = data.universityId;
  }

  save() {
    if (!this.facultyName.trim()) {
      alert('Please enter faculty name.');
      return;
    }

    if (!this.location.trim()) {
      alert('Please enter location.');
      return;
    }

    this.facultyService
      .editFaculty(this.data.id, {
        facultyName: this.facultyName,
        location: this.location,
        universityId: this.universityId,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          alert('Failed to update faculty.');
        },
      });
  }
}
