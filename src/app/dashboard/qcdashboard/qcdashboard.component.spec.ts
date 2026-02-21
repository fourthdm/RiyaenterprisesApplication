import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcdashboardComponent } from './qcdashboard.component';

describe('QcdashboardComponent', () => {
  let component: QcdashboardComponent;
  let fixture: ComponentFixture<QcdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcdashboardComponent]
    });
    fixture = TestBed.createComponent(QcdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
