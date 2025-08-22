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

export const ELEMENT_STUDENT_DATA: StudentElm[] = [
  {
    position: 1,
    name: 'Иван Иванов',
    facultyNumber: '123456',
    majorType: 'бакалавър',
    major: 'Компютърни науки',
    course: '3',
    subtype: 'редовно',
  },
  {
    position: 2,
    name: 'Мария Петрова',
    facultyNumber: '234567',
    majorType: 'бакалавър',
    major: 'История',
    course: '2',
    subtype: 'задочно',
  },
  {
    position: 3,
    name: 'Георги Георгиев',
    facultyNumber: '345678',
    majorType: 'бакалавър',
    major: 'Английска филология',
    course: '1',
    subtype: 'редовно',
  },
  {
    position: 4,
    name: 'Анна Димитрова',
    facultyNumber: '456789',
    majorType: 'магистър',
    major: 'Молекулярна биология',
    course: '4',
    subtype: 'редовно',
  },
  {
    position: 5,
    name: 'Петър Петров',
    facultyNumber: '567890',
    majorType: 'магистър',
    major: 'Органична химия',
    course: '2',
    subtype: 'редовно',
  },
  {
    position: 6,
    name: 'Елена Стоянова',
    facultyNumber: '678901',
    majorType: 'магистър',
    major: 'Астрофизика',
    course: '3',
    subtype: 'задочно',
  },
  {
    position: 7,
    name: 'Димитър Иванов',
    facultyNumber: '789012',
    majorType: 'бакалавър',
    major: 'Начална педагогика',
    course: '1',
    subtype: 'редовно',
  },
  {
    position: 8,
    name: 'Виктория Николова',
    facultyNumber: '890123',
    majorType: 'бакалавър',
    major: 'Специална педагогика',
    course: '4',
    subtype: 'редовно',
  },
  {
    position: 9,
    name: 'Красимир Тодоров',
    facultyNumber: '901234',
    majorType: 'бакалавър',
    major: 'Екология',
    course: '3',
    subtype: 'задочно',
  },
  {
    position: 10,
    name: 'Милена Георгиева',
    facultyNumber: '012345',
    majorType: 'магистър',
    major: 'Прикладна математика',
    course: '2',
    subtype: 'редовно',
  },
];

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

  @Input() subtypes: string[] = [];

  displayedColumns: string[] = [
    'position',
    'name',
    'facultyNumber',
    'major',
    'majorType',
    'subtype',
    'course',
    'actions',
  ];

  originalData: StudentElm[] = ELEMENT_STUDENT_DATA;
  dataSourceFilter: StudentElm[] = ELEMENT_STUDENT_DATA;

  ngOnInit(): void {
    this.subtypes = StudentTable.getFilterOptions(this.originalData).subtypes;
    this.applyFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const name = this.searchText.toLowerCase();
    const major = this.searchMajor.toLowerCase();
    const facNum = this.searchFacNum;

    this.dataSourceFilter = this.originalData.filter((student) => {
      const matchName = !name || student.name.toLowerCase().includes(name);
      const matchMajor = !major || student.major.toLowerCase().includes(major);
      const matchFacNum = !facNum || student.facultyNumber.includes(facNum);
      const matchSubtype = !this.subtype || student.subtype === this.subtype;

      return matchName && matchMajor && matchFacNum && matchSubtype;
    });
  }

  static getFilterOptions(data: StudentElm[]) {
    return {
      subtypes: [...new Set(data.map((e) => e.subtype))],
    };
  }

  onEdit(element: StudentElm): void {
    console.log('Editing:', element);
  }

  onDelete(element: StudentElm): void {
    console.log('Deleting:', element);
  }
}
