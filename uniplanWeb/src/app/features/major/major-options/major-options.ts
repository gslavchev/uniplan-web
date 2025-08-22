import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MajorAddForm } from '../major-add-form/major-add-form';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddButton } from '../../../core/shared/add-button/add-button';

@Component({
  selector: 'app-major-options',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AddButton,
  ],
  standalone: true,
  templateUrl: './major-options.html',
  styleUrl: './major-options.scss',
})
export class MajorOptions {
  constructor(private dialog: MatDialog) {}

  openAddForm() {
    this.dialog.open(MajorAddForm, {
      width: '400px',
    });
  }
}
