import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MajorElm } from '../../../core/interfaces/major-elm';
import { MajorEditForm } from '../major-edit-form/major-edit-form';
import { MatDialog } from '@angular/material/dialog';
import { MajorDeleteForm } from '../major-delete-form/major-delete-form';
import { MajorService } from '../major-service';
import { FacultyService } from '../../faculty/faculty-service';

@Component({
  selector: 'app-major-table',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  standalone: true,
  templateUrl: './major-table.html',
  styleUrl: './major-table.scss',
})
export class MajorTable implements OnChanges {
  displayedColumns: string[] = [
    'position',
    'name',
    'faculty',
    'type',
    'subtype',
    'actions',
  ];
  dataSource: MajorElm[] = [];
  facultyMap = new Map<string, string>();

  constructor(
    private dialog: MatDialog,
    private service: MajorService,
    private facultyService: FacultyService
  ) {}

  onEdit(element: MajorElm): void {
    this.dialog.open(MajorEditForm, {
      data: {
        name: element.majorName,
        faculty: element.facultyId,
      },
    });
  }

  onDelete(element: MajorElm): void {
    this.dialog.open(MajorDeleteForm, {
      data: {
        id: element.majorId,
        name: element.majorName,
      },
    });
  }

  @Input() searchText = '';

  @Input() faculty: string = '';
  @Input() type: string = '';
  @Input() subtype: string = '';

  @Input() faculties: string[] = [];
  @Input() types: string[] = [];
  @Input() subtypes: string[] = [];

  originalData: MajorElm[] = [];
  dataSourceFilter: MajorElm[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
  }

  ngOnInit(): void {
    this.loadMajors();
    this.loadFaculties();
  }

  loadMajors(): void {
    this.service.getMajors().subscribe((data) => {
      this.dataSource = data;
      this.originalData = data;
      this.applyFilters();
    });
  }

  loadFaculties(): void {
    this.facultyService.getFaculties().subscribe((faculties) => {
      this.facultyMap = new Map(faculties.map((f) => [f.id, f.facultyName]));
    });
  }

  getFacultyName(id: string): string {
    return this.facultyMap.get(id) || '—';
  }

  applyFilters(): void {
    this.dataSourceFilter = this.originalData.filter((el) => {
      const matchesFaculty = !this.faculty || el.facultyId === this.faculty;
      const matchesType = !this.type || el.courseType === this.type;
      const matchesSubtype = !this.subtype || el.courseSubtype === this.subtype;
      const matchesSearch =
        !this.searchText ||
        el.majorName.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesFaculty && matchesType && matchesSubtype && matchesSearch;
    });
  }
  static getFilterOptions(data: MajorElm[]) {
    return {
      faculties: [...new Set(data.map((e) => e.facultyId))],
      types: [...new Set(data.map((e) => e.courseType))],
      subtypes: [...new Set(data.map((e) => e.courseSubtype))],
    };
  }

  get filteredMajors(): MajorElm[] {
    return this.originalData.filter((major) => {
      const matchesFaculty = !this.faculty || major.facultyId === this.faculty;
      const matchesType = !this.type || major.courseType === this.type;
      const matchesSubtype =
        !this.subtype || major.courseSubtype === this.subtype;
      const matchesSearch =
        !this.searchText ||
        major.majorName.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesFaculty && matchesType && matchesSubtype && matchesSearch;
    });
  }
}
