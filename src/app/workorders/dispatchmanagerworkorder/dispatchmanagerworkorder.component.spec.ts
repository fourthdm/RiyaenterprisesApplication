import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchmanagerworkorderComponent } from './dispatchmanagerworkorder.component';

describe('DispatchmanagerworkorderComponent', () => {
  let component: DispatchmanagerworkorderComponent;
  let fixture: ComponentFixture<DispatchmanagerworkorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatchmanagerworkorderComponent]
    });
    fixture = TestBed.createComponent(DispatchmanagerworkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
