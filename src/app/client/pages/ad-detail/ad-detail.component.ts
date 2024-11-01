import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/auth/services/user-stoarge.service';
import { PartnerDTO } from 'src/app/model/PartnerDTO';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent {

  adId= this.activatedroute.snapshot.params['adId'];
  avatarUrl:any;
  ad:any;
  reviews:any;
  partners: PartnerDTO[] = [];
  serviceName: string = '';
  serviceId!: number;
  selectedPartnerId: number | null = null;
  validateForm!: FormGroup;

  durationOptions: string[] = [
    '1 hour', '1.5 hours', '2 hours', '2.5 hours', '3 hours', '3.5 hours', '4 hours', '4.5 hours',
    '5 hours', '5.5 hours', '6 hours', '6.5 hours', '7 hours', '7.5 hours', '8 hours', '8.5 hours',
    '9 hours', '1 day', '2 days', '3 days', '4 days', '5 days', '6 days', '1 week', '2 weeks',
    '3 weeks', '1 month'
  ];

  constructor(private clientService: ClientService,
    private activatedroute: ActivatedRoute,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder){}


    ngOnInit(){
      this.validateForm = this.fb.group({
        bookDate: [null, [Validators.required]],
        timeSlot: [null, [Validators.required]],
        duration: [null, [Validators.required]],
        selectedPartner: [null, [Validators.required]]
      })
      this.getAdDetailsByAdId();
      // this.getPartnersByService();
    }

    disabledDate = (current: Date): boolean => {
      return current && current < new Date();
    }

    getAdDetailsByAdId(){
      this.clientService.getAdDetailsByAdId(this.adId).subscribe(res=>{
        console.log(res);
        this.avatarUrl = 'data:image/jpeg;base64,' + res.adDTO.returnedImg;
        this.ad = res.adDTO;
        this.reviews = res.reviewDTOList;
        this.getPartnersByService(this.ad.serviceName);
        UserStorageService.setAdData(this.ad);
      })
    }

    getPartnersByService(serviceName: string) {
      console.log("Service name", serviceName)
      this.clientService.getPartnersByService(serviceName).subscribe(res => {
        console.log("Partners by service", res);
        this.partners = res;
      });
    }

    selectPartnerId(partnerId: number): void {
        this.selectedPartnerId = partnerId;
        console.log('Selected Partner ID:', this.selectedPartnerId);
    }

    bookService(){
      const bookServiceDTO = {
        bookDate : this.validateForm.get(['bookDate']).value,

        timeSlot: this.validateForm.get('timeSlot')?.value,
        duration: this.validateForm.get('duration')?.value,
        adId : this.adId,
          partnerId: this.selectedPartnerId,
        userId: UserStorageService.getUserId()
      }

      this.clientService.bookService(bookServiceDTO).subscribe(res =>{
        const reservationId = res.reservationId;
        console.log("ftech the reservationId from backend", reservationId)
        // Save the reservationId to local storage
        UserStorageService.saveReservationId(reservationId);
        this.notification
        .success(
          'SUCCESS',
          `Request posted successfully`,
          { nzDuration: 5000 }
        );
        // this.router.navigateByUrl('/client/bookings');
        this.router.navigate(['/client/checkout'],  { queryParams: { reservationId: reservationId } });
      })
    }

    checkoutPage() {
      this.router.navigateByUrl('/client/checkout');
    }
}
