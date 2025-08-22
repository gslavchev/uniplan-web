import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyDeleteForm } from './faculty-delete-form';

describe('FacultyDeleteForm', () => {
  let component: FacultyDeleteForm;
  let fixture: ComponentFixture<FacultyDeleteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyDeleteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FacultyDeleteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
