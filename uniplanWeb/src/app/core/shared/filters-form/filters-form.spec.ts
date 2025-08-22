import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersForm } from './filters-form';

describe('FiltersForm', () => {
  let component: FiltersForm;
  let fixture: ComponentFixture<FiltersForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
