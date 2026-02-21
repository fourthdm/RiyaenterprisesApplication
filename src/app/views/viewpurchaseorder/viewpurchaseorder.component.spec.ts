import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpurchaseorderComponent } from './viewpurchaseorder.component';

describe('ViewpurchaseorderComponent', () => {
  let component: ViewpurchaseorderComponent;
  let fixture: ComponentFixture<ViewpurchaseorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewpurchaseorderComponent]
    });
    fixture = TestBed.createComponent(ViewpurchaseorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
