import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewchallanComponent } from './viewchallan.component';

describe('ViewchallanComponent', () => {
  let component: ViewchallanComponent;
  let fixture: ComponentFixture<ViewchallanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewchallanComponent]
    });
    fixture = TestBed.createComponent(ViewchallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
