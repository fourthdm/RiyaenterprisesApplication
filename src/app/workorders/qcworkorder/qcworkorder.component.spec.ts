import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcworkorderComponent } from './qcworkorder.component';

describe('QcworkorderComponent', () => {
  let component: QcworkorderComponent;
  let fixture: ComponentFixture<QcworkorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcworkorderComponent]
    });
    fixture = TestBed.createComponent(QcworkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
