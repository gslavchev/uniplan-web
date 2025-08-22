import { Component } from '@angular/core';
import { AddButton } from '../../../core/shared/add-button/add-button';
import { MatDialog } from '@angular/material/dialog';
import { StudentAddForm } from '../student-add-form/student-add-form';

@Component({
  selector: 'app-student-options',
  imports: [AddButton],
  standalone: true,
  templateUrl: './student-options.html',
  styleUrl: './student-options.scss',
})
export class StudentOptions {
  constructor(private dialog: MatDialog) {}

  openAddForm() {
    this.dialog.open(StudentAddForm, {
      width: '400px',
    });
  }
}
