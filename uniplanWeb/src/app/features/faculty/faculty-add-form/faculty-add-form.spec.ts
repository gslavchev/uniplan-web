import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAddForm } from './faculty-add-form';

describe('FacultyAddForm', () => {
  let component: FacultyAddForm;
  let fixture: ComponentFixture<FacultyAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyAddForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FacultyAddForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
