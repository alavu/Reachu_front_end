import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartnerModalComponent } from './edit-partner-modal.component';

describe('EditPartnerModalComponent', () => {
  let component: EditPartnerModalComponent;
  let fixture: ComponentFixture<EditPartnerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPartnerModalComponent]
    });
    fixture = TestBed.createComponent(EditPartnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
