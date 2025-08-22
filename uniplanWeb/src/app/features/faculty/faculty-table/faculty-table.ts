import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FacultyElm } from '../../../core/interfaces/faculty-elm';
import { FacultyService } from '../faculty-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FacultyEdit } from '../faculty-edit/faculty-edit';
import { FacultyDeleteForm } from '../faculty-delete-form/faculty-delete-form';

@Component({
  selector: 'app-faculty-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './faculty-table.html',
  styleUrl: './faculty-table.scss',
})
export class FacultyTable {
  displayedColumns: string[] = [
    'position',
    'facultyName',
    'location',
    'actions',
  ];
  dataSource: FacultyElm[] = [];

  constructor(
    private facultyService: FacultyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFaculties();

    this.facultyService.refreshNeeded.subscribe(() => {
      this.loadFaculties();
    });
  }

  loadFaculties(): void {
    this.facultyService.getFaculties().subscribe((data) => {
      this.dataSource = data;
    });
  }

  onEdit(element: FacultyElm): void {
    this.dialog.open(FacultyEdit, {
      data: {
        id: element.id,
        facultyName: element.facultyName,
        location: element.location,
        universityId: element.universityId,
      },
    });
  }

  onDelete(element: FacultyElm): void {
    this.dialog.open(FacultyDeleteForm, {
      data: {
        id: element.id,
        facultyName: element.facultyName,
      },
    });
  }
}
