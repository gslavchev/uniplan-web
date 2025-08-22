import { Component, Inject, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { MajorService } from '../major-service';
import { FacultyService } from '../../faculty/faculty-service';
import { FacultyElm } from '../../../core/interfaces/faculty-elm';

@Component({
  selector: 'app-major-edit-form',
  standalone: true,
  imports: [
    EditForm,
    MatDialogModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
  ],
  templateUrl: './major-edit-form.html',
  styleUrl: './major-edit-form.scss',
})
export class MajorEditForm implements OnInit {
  majorName = '';
  facultyId = '';

  faculties: FacultyElm[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditForm>,
    private majorService: MajorService,
    private facultyService: FacultyService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      majorName: string;
      facultyId?: string;
    }
  ) {
    this.majorName = data.majorName;
    this.facultyId = data.facultyId || '';
  }

  ngOnInit(): void {
    this.facultyService.getFaculties().subscribe({
      next: (data) => (this.faculties = data),
      error: (err) => console.error('Failed to load faculties', err),
    });
  }

  save() {
    if (!this.majorName.trim()) {
      alert('Please enter the major name.');
      return;
    }

    this.majorService
      .editMajor(this.data.id, {
        majorName: this.majorName,
        facultyId: this.facultyId,
      })
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: () => alert('Failed to update major.'),
      });
  }
}
