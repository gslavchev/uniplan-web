import { Component, Inject, inject, OnInit } from '@angular/core';
import { EditForm } from '../../../core/shared/edit-form/edit-form';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { CourseElm } from '../../../core/interfaces/course-elm';
import { MajorElm } from '../../../core/interfaces/major-elm';
import { FacultyElm } from '../../../core/interfaces/faculty-elm';
import { FacultyService } from '../../faculty/faculty-service';
import { MajorService } from '../../major/major-service';
import { StudentService } from '../student-service';
import { CourseService } from '../../course/course-service';

@Component({
  selector: 'app-student-edit',
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
  templateUrl: './student-edit.html',
  styleUrl: './student-edit.scss',
})
export class StudentEdit implements OnInit {
  firstName = '';
  lastName = '';
  facultyNumber = '';
  facultyId = '';
  majorId = '';
  courseId = '';

  faculties: FacultyElm[] = [];
  majors: MajorElm[] = [];
  courses: CourseElm[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditForm>,
    private facultyService: FacultyService,
    private majorService: MajorService,
    private courseService: CourseService,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      studentId: string;
      courseId: string;
      firstName: string;
      lastName: string;
      facultyNumber: string;
    }
  ) {
    this.courseId = data.courseId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.facultyNumber = data.facultyNumber;
  }

  ngOnInit(): void {
    this.facultyService.getFaculties().subscribe({
      next: (data) => {
        this.faculties = data;
      },
      error: (err) => console.error('Failed to load faculties', err),
    });
  }

  onFacultyChange(facultyId: string) {
    this.majorId = '';
    this.courseId = '';
    this.courses = [];
    if (!facultyId) {
      this.majors = [];
      return;
    }

    this.majorService.getMajorWithFaculty(facultyId).subscribe({
      next: (data) => ((this.majors = data), console.log(data)),
      error: (err) =>
        console.error('Failed to load majors for this faculty', err),
    });
  }

  onMajorChange(majorId: string) {
    this.courseId = '';

    if (!majorId) {
      this.courses = [];
      return;
    }

    this.courseService.getCoursesByMajor(majorId).subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) =>
        console.error('Failed to load courses for this major', err),
    });
  }

  save() {
    if (
      !this.firstName.trim() ||
      !this.lastName.trim() ||
      !this.facultyNumber.trim() ||
      !this.facultyId ||
      !this.majorId ||
      !this.courseId
    ) {
      alert('Please fill all fields.');
      return;
    }

    this.studentService
      .editStudent(this.data.studentId, {
        firstName: this.firstName,
        lastName: this.lastName,
        facultyNumber: this.facultyNumber,
        courseId: this.courseId,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          alert('Failed to update student.');
        },
      });
  }
}
