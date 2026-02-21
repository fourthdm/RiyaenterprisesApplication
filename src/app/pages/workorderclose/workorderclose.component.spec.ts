import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkordercloseComponent } from './workorderclose.component';

describe('WorkordercloseComponent', () => {
  let component: WorkordercloseComponent;
  let fixture: ComponentFixture<WorkordercloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkordercloseComponent]
    });
    fixture = TestBed.createComponent(WorkordercloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
