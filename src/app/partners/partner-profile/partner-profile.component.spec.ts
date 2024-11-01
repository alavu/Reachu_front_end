import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerProfileComponent } from './partner-profile.component';

describe('PartnerProfileComponent', () => {
  let component: PartnerProfileComponent;
  let fixture: ComponentFixture<PartnerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerProfileComponent]
    });
    fixture = TestBed.createComponent(PartnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
