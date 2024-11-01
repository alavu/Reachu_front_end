import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSalesRevenueComponent } from './partner-sales-revenue.component';

describe('PartnerSalesRevenueComponent', () => {
  let component: PartnerSalesRevenueComponent;
  let fixture: ComponentFixture<PartnerSalesRevenueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerSalesRevenueComponent]
    });
    fixture = TestBed.createComponent(PartnerSalesRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
