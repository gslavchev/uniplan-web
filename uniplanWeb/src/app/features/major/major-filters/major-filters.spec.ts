import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorFilters } from './major-filters';

describe('MajorFilters', () => {
  let component: MajorFilters;
  let fixture: ComponentFixture<MajorFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(MajorFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
