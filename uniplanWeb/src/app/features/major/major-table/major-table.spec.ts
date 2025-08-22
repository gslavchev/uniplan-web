import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorTable } from './major-table';

describe('MajorTable', () => {
  let component: MajorTable;
  let fixture: ComponentFixture<MajorTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MajorTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
