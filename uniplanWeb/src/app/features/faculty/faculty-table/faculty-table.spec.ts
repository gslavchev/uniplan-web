import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyTable } from './faculty-table';

describe('FacultyTable', () => {
  let component: FacultyTable;
  let fixture: ComponentFixture<FacultyTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
