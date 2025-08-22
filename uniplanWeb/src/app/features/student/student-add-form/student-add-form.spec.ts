import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddForm } from './student-add-form';

describe('StudentAddForm', () => {
  let component: StudentAddForm;
  let fixture: ComponentFixture<StudentAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAddForm],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAddForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
