import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AddForm } from '../../../core/shared/add-form/add-form';
import { FacultyService } from '../faculty-service';
import {
  UniversityElm,
  UniversityService,
} from '../../university/university-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faculty-add-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    AddForm,
    CommonModule,
  ],
  templateUrl: './faculty-add-form.html',
  styleUrl: './faculty-add-form.scss',
})
export class FacultyAddForm implements OnInit {
  facultyName = '';
  location = '';
  universityId = '';
  universities: UniversityElm[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddForm>,
    private facultyService: FacultyService,
    private universityService: UniversityService
  ) {}

  ngOnInit(): void {
    this.universityService.getAllUniversities().subscribe({
      next: (data) => {
        this.universities = data;
      },
      error: (err) => {
        console.error('Failed to load universities', err);
      },
    });
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

    const newFaculty = {
      universityId: this.universityId,
      facultyName: this.facultyName,
      location: this.location,
    };

    this.facultyService.createFaculty(newFaculty).subscribe({
      next: (response) => {
        console.log('Faculty created:', response);
        this.dialogRef.close(response);
      },
      error: (err) => {
        console.error('Failed to add faculty', err);
        alert('Failed to add faculty.');
      },
    });
  }
}
