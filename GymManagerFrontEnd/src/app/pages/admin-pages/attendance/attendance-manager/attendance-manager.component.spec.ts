import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceManagerComponent } from './attendance-manager.component';

describe('AttendanceManagerComponent', () => {
  let component: AttendanceManagerComponent;
  let fixture: ComponentFixture<AttendanceManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceManagerComponent]
    });
    fixture = TestBed.createComponent(AttendanceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
