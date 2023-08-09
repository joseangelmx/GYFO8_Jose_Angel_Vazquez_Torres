import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitLayoutComponent } from './init-layout.component';

describe('InitLayoutComponent', () => {
  let component: InitLayoutComponent;
  let fixture: ComponentFixture<InitLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitLayoutComponent]
    });
    fixture = TestBed.createComponent(InitLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
