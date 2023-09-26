import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HisStudentComponent } from './his-student.component';

describe('HisStudentComponent', () => {
  let component: HisStudentComponent;
  let fixture: ComponentFixture<HisStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HisStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HisStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
