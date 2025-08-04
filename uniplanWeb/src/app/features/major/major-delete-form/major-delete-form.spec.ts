import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorDeleteForm } from './major-delete-form';

describe('MajorDeleteForm', () => {
  let component: MajorDeleteForm;
  let fixture: ComponentFixture<MajorDeleteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorDeleteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MajorDeleteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
