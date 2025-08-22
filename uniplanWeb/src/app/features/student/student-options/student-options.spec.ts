import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOptions } from './student-options';

describe('StudentOptions', () => {
  let component: StudentOptions;
  let fixture: ComponentFixture<StudentOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentOptions],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
