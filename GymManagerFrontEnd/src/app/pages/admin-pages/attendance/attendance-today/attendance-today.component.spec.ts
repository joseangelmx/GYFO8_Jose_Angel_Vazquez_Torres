import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTodayComponent } from './attendance-today.component';

describe('AttendanceTodayComponent', () => {
  let component: AttendanceTodayComponent;
  let fixture: ComponentFixture<AttendanceTodayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceTodayComponent]
    });
    fixture = TestBed.createComponent(AttendanceTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
