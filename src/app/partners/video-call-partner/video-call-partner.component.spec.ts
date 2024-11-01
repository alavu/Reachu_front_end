import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallPartnerComponent } from './video-call-partner.component';

describe('VideoCallPartnerComponent', () => {
  let component: VideoCallPartnerComponent;
  let fixture: ComponentFixture<VideoCallPartnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoCallPartnerComponent]
    });
    fixture = TestBed.createComponent(VideoCallPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
