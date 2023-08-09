import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInComponent } from './member-in.component';

describe('MemberInComponent', () => {
  let component: MemberInComponent;
  let fixture: ComponentFixture<MemberInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberInComponent]
    });
    fixture = TestBed.createComponent(MemberInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
