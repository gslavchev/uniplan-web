import { Component } from '@angular/core';
import { FacultyOptions } from '../../../features/faculty/faculty-options/faculty-options';
import { ViewService } from './view.service';
import { CommonModule } from '@angular/common';
import { MajorOptions } from '../../../features/major/major-options/major-options';
import { FacultyTable } from '../../../features/faculty/faculty-table/faculty-table';
import { MajorTable } from '../../../features/major/major-table/major-table';
import { MajorFilters } from '../../../features/major/major-filters/major-filters';
import { StudentOptions } from '../../../features/student/student-options/student-options';
import {
  ELEMENT_STUDENT_DATA,
  StudentTable,
} from '../../../features/student/student-table/student-table';
import { StudentFilters } from '../../../features/student/student-filters/student-filters';
import { MajorElm } from '../../interfaces/major-elm';

@Component({
  selector: 'app-main-panel',
  imports: [
    CommonModule,
    FacultyOptions,
    MajorOptions,
    FacultyTable,
    MajorTable,
    MajorFilters,
    StudentOptions,
    StudentTable,
    StudentFilters,
  ],
  standalone: true,
  templateUrl: './main-panel.html',
  styleUrl: './main-panel.scss',
})
export class MainPanel {
  currentView = 'home';

  constructor(private viewService: ViewService) {
    this.viewService.currentView$.subscribe((view) => {
      this.currentView = view;
    });
  }

  majors: MajorElm[] = [];
  students = ELEMENT_STUDENT_DATA;

  searchText = '';
  searchFacNum = '';
  searchMajor = '';
  selectedStudentSubtype = '';
  studentSubtypes: string[] = [];

  selectedFaculty = '';
  selectedType = '';
  selectedSubtype = '';

  faculties: string[] = [];
  types: string[] = [];
  subtypes: string[] = [];

  ngOnInit(): void {
    const filterOptionsMajor = MajorTable.getFilterOptions(this.majors);
    this.faculties = filterOptionsMajor.faculties;
    this.types = filterOptionsMajor.types;
    this.subtypes = filterOptionsMajor.subtypes;

    const filterOptionsStudent = StudentTable.getFilterOptions(this.students);
    this.studentSubtypes = filterOptionsStudent.subtypes;
  }
}
