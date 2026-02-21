import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrequirementComponent } from './viewrequirement.component';

describe('ViewrequirementComponent', () => {
  let component: ViewrequirementComponent;
  let fixture: ComponentFixture<ViewrequirementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewrequirementComponent]
    });
    fixture = TestBed.createComponent(ViewrequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
