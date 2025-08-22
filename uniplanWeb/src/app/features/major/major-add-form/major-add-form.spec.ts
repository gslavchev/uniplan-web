import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorAddForm } from './major-add-form';

describe('MajorAddForm', () => {
  let component: MajorAddForm;
  let fixture: ComponentFixture<MajorAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorAddForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MajorAddForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
