import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberOutComponent } from './member-out.component';

describe('MemberOutComponent', () => {
  let component: MemberOutComponent;
  let fixture: ComponentFixture<MemberOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberOutComponent]
    });
    fixture = TestBed.createComponent(MemberOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
