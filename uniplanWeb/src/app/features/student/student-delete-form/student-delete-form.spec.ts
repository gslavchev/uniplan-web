import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeleteForm } from './student-delete-form';

describe('StudentDeleteForm', () => {
  let component: StudentDeleteForm;
  let fixture: ComponentFixture<StudentDeleteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDeleteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDeleteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
