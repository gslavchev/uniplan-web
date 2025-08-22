import { Component } from '@angular/core';
import { AddForm } from '../../../core/shared/add-form/add-form';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MatFormField,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-add-form',
  imports: [
    MatDialogModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    AddForm,
  ],
  standalone: true,
  templateUrl: './student-add-form.html',
  styleUrl: './student-add-form.scss',
})
export class StudentAddForm {
  studentName = '';
  facultyNumber = '';
  faculty = '';
  major = '';
  course = '';
  type = '';

  constructor(private dialogRef: MatDialogRef<AddForm>) {}

  save() {
    if (!this.studentName.trim()) {
      alert('Please enter student name.');
      return;
    }
    if (!this.facultyNumber.trim()) {
      alert('Please enter faculty numbe.');
      return;
    }
    if (!this.faculty.trim()) {
      alert('Please enter faculty.');
      return;
    }
    if (!this.major.trim()) {
      alert('Please enter major.');
      return;
    }
    if (!this.course.trim()) {
      alert('Please enter course.');
      return;
    }
    if (!this.type.trim()) {
      alert('Please enter type.');
      return;
    }

    console.log(
      'Saving Student:',
      this.studentName,
      this.facultyNumber,
      this.faculty,
      this.major,
      this.course,
      this.type
    );

    this.dialogRef.close({
      name: this.studentName,
      facultyNumber: this.facultyNumber,
      faculty: this.faculty,
      major: this.major,
      course: this.course,
      type: this.type,
    });
  }
}
