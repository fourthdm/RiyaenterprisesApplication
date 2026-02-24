import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemrequirementComponent } from './itemrequirement.component';

describe('ItemrequirementComponent', () => {
  let component: ItemrequirementComponent;
  let fixture: ComponentFixture<ItemrequirementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemrequirementComponent]
    });
    fixture = TestBed.createComponent(ItemrequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
