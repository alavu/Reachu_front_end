import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDashboardComponent } from './partner-dashboard.component';

describe('PartnerDashboardComponent', () => {
  let component: PartnerDashboardComponent;
  let fixture: ComponentFixture<PartnerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerDashboardComponent]
    });
    fixture = TestBed.createComponent(PartnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
