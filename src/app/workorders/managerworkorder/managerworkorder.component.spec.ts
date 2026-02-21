import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerworkorderComponent } from './managerworkorder.component';

describe('ManagerworkorderComponent', () => {
  let component: ManagerworkorderComponent;
  let fixture: ComponentFixture<ManagerworkorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerworkorderComponent]
    });
    fixture = TestBed.createComponent(ManagerworkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
