import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantdashboardComponent } from './accountantdashboard.component';

describe('AccountantdashboardComponent', () => {
  let component: AccountantdashboardComponent;
  let fixture: ComponentFixture<AccountantdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantdashboardComponent]
    });
    fixture = TestBed.createComponent(AccountantdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
