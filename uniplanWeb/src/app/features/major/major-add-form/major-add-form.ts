import { Component, OnInit } from '@angular/core';
import { AddForm } from '../../../core/shared/add-form/add-form';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MajorService } from '../major-service';
import { FacultyElm } from '../../../core/interfaces/faculty-elm';
import { FacultyService } from '../../faculty/faculty-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-major-add-form',
  imports: [
    MatDialogModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    AddForm,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './major-add-form.html',
  styleUrl: './major-add-form.scss',
})
export class MajorAddForm implements OnInit {
  majorName = '';
  faculty = '';
  type = '';
  subtype = '';

  faculties: FacultyElm[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddForm>,
    private majorService: MajorService,
    private facultyService: FacultyService
  ) {}

  ngOnInit(): void {
    this.facultyService.getFaculties().subscribe({
      next: (data) => {
        this.faculties = data;
      },
      error: (err) => console.error('Failed to load faculties', err),
    });
  }

  save() {
    if (
      !this.majorName.trim() ||
      !this.faculty ||
      !this.type ||
      !this.subtype
    ) {
      alert('Please fill all fields.');
      return;
    }

    this.majorService
      .createMajorWithCourse({
        facultyId: this.faculty,
        majorName: this.majorName,
        type: this.type,
        subtype: this.subtype,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => alert('Failed to create major or course.'),
      });
  }
}
