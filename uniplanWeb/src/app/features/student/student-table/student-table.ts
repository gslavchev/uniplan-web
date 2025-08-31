import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
} from '@angular/core';
import { StudentElm } from '../../../core/interfaces/student-elm';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { StudentEdit } from '../student-edit/student-edit';
import { StudentDeleteForm } from '../student-delete-form/student-delete-form';
import { StudentService } from '../student-service';

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './student-table.html',
  styleUrl: './student-table.scss',
})
export class StudentTable implements OnInit, OnChanges {
  @Input() searchText = '';
  @Input() searchFacNum = '';
  @Input() searchMajor = '';
  @Input() subtype = '';

  displayedColumns: string[] = [
    'position',
    'name',
    'facultyNumber',
    'majorName',
    'courseType',
    'courseSubType',
    'courseYear',
    'actions',
  ];

  originalData: StudentElm[] = [];
  dataSourceFilter: StudentElm[] = [];

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudent();

    this.studentService.refreshNeeded.subscribe(() => {
      this.loadStudent();
    });
  }

  loadStudent(): void {
    this.studentService.getStudent().subscribe((students) => {
      this.originalData = students;
      this.applyFilters();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const name = this.searchText.toLowerCase();
    const major = this.searchMajor.toLowerCase();
    const facNum = this.searchFacNum;

    this.dataSourceFilter = this.originalData.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      const matchName = !name || fullName.includes(name);
      const matchMajor =
        !major || student.majorName.toLowerCase().includes(major);
      const matchFacNum = !facNum || student.facultyNumber.includes(facNum);
      const matchSubtype =
        !this.subtype || student.courseSubType === this.subtype;

      return matchName && matchMajor && matchFacNum && matchSubtype;
    });
  }

  static getFilterOptions(data: StudentElm[]) {
    return {
      subtypes: [...new Set(data.map((e) => e.courseSubType))],
    };
  }

  onEdit(element: StudentElm): void {
    this.dialog.open(StudentEdit, {
      data: {
        studentId: element.studentId,
        firstName: element.firstName,
        lastName: element.lastName,
        facultyNumber: element.facultyNumber,
        courseId: element.courseId,
      },
    });
  }

  onDelete(element: StudentElm): void {
    this.dialog.open(StudentDeleteForm, {
      data: {
        studentId: element.studentId,
        name: element.firstName,
      },
    });
  }
}
