import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerworkorderComponent } from './engineerworkorder.component';

describe('EngineerworkorderComponent', () => {
  let component: EngineerworkorderComponent;
  let fixture: ComponentFixture<EngineerworkorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngineerworkorderComponent]
    });
    fixture = TestBed.createComponent(EngineerworkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
