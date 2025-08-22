import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyOptions } from './faculty-options';

describe('FacultyOptions', () => {
  let component: FacultyOptions;
  let fixture: ComponentFixture<FacultyOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
