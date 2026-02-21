import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderComponent } from './purchaseorder.component';

describe('PurchaseorderComponent', () => {
  let component: PurchaseorderComponent;
  let fixture: ComponentFixture<PurchaseorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseorderComponent]
    });
    fixture = TestBed.createComponent(PurchaseorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
