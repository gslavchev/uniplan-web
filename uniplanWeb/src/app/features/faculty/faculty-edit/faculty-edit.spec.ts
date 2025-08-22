import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyEdit } from './faculty-edit';

describe('FacultyEdit', () => {
  let component: FacultyEdit;
  let fixture: ComponentFixture<FacultyEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(FacultyEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
