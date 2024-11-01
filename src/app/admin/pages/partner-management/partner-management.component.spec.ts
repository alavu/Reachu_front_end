import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerManagementComponent } from './partner-management.component';

describe('PartnerManagementComponent', () => {
  let component: PartnerManagementComponent;
  let fixture: ComponentFixture<PartnerManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerManagementComponent]
    });
    fixture = TestBed.createComponent(PartnerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
