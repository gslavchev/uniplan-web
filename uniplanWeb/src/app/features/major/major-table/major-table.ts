import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class MajorTable implements OnInit {
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

  @Input() searchText = '';
  @Input() faculty: string = '';
  @Input() type: string = '';
  @Input() subtype: string = '';

  constructor(
    private dialog: MatDialog,
    private service: MajorService,
    private facultyService: FacultyService
  ) {}

  ngOnInit(): void {
    this.loadMajors();
    this.loadFaculties();

    this.service.refreshNeeded.subscribe(() => {
      this.loadMajors();
      this.loadFaculties();
    });
  }

  loadMajors(): void {
    this.service.getMajors().subscribe((data) => {
      this.dataSource = data;
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

  get filteredMajors(): MajorElm[] {
    return this.dataSource.filter((major) => {
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

  onEdit(element: MajorElm): void {
    this.dialog.open(MajorEditForm, {
      data: {
        id: element.id,
        majorName: element.majorName,
        facultyId: element.facultyId,
      },
    });
  }

  onDelete(element: MajorElm): void {
    this.dialog.open(MajorDeleteForm, {
      data: {
        id: element.id,
        courseId: element.courseId,
        majorName: element.majorName,
        facultyId: element.facultyId,
      },
    });
  }

  static getFilterOptions(data: MajorElm[], facultyMap: Map<string, string>) {
    const faculties = [...new Set(data.map((e) => e.facultyId))].map((id) => ({
      id,
      name: facultyMap.get(id) || '—',
    }));

    const types = [...new Set(data.map((e) => e.courseType))];
    const subtypes = [...new Set(data.map((e) => e.courseSubtype))];

    return { faculties, types, subtypes };
  }
}
