import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorEditForm } from './major-edit-form';

describe('MajorEditForm', () => {
  let component: MajorEditForm;
  let fixture: ComponentFixture<MajorEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorEditForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MajorEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
