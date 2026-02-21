import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchdashboardComponent } from './dispatchdashboard.component';

describe('DispatchdashboardComponent', () => {
  let component: DispatchdashboardComponent;
  let fixture: ComponentFixture<DispatchdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatchdashboardComponent]
    });
    fixture = TestBed.createComponent(DispatchdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
