import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyOptions } from '../../../features/faculty/faculty-options/faculty-options';
import { ViewService } from './view.service';
import { MajorOptions } from '../../../features/major/major-options/major-options';
import { FacultyTable } from '../../../features/faculty/faculty-table/faculty-table';
import { MajorTable } from '../../../features/major/major-table/major-table';
import { MajorFilters } from '../../../features/major/major-filters/major-filters';
import { StudentOptions } from '../../../features/student/student-options/student-options';
import {
  StudentTable,
  ELEMENT_STUDENT_DATA,
} from '../../../features/student/student-table/student-table';
import { StudentFilters } from '../../../features/student/student-filters/student-filters';
import { MajorElm } from '../../interfaces/major-elm';
import { MajorService } from '../../../features/major/major-service';

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

  constructor(
    private viewService: ViewService,
    private majorService: MajorService
  ) {
    this.viewService.currentView$.subscribe((view) => {
      this.currentView = view;
    });
  }

  ngOnInit(): void {
    this.loadMajorFilters();
    this.loadStudentFilters();

    this.majorService.refreshNeeded.subscribe(() => {
      this.loadMajorFilters();
    });

    this.viewService.currentView$.subscribe((view) => {
      this.currentView = view;
    });
  }

  private loadMajorFilters(): void {
    this.majorService.getMajors().subscribe((data) => {
      this.majors = data;
      const filterOptionsMajor = MajorTable.getFilterOptions(this.majors);
      this.faculties = filterOptionsMajor.faculties;
      this.types = filterOptionsMajor.types;
      this.subtypes = filterOptionsMajor.subtypes;
    });
  }

  private loadStudentFilters(): void {
    const filterOptionsStudent = StudentTable.getFilterOptions(this.students);
    this.studentSubtypes = filterOptionsStudent.subtypes;
  }
}
