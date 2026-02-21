import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardnavbarComponent } from './dashboardnavbar.component';

describe('DashboardnavbarComponent', () => {
  let component: DashboardnavbarComponent;
  let fixture: ComponentFixture<DashboardnavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardnavbarComponent]
    });
    fixture = TestBed.createComponent(DashboardnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
