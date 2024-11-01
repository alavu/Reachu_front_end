import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/client/services/client.service';

declare var Swiper: any;

@Component({
  selector: 'app-service-items',
  templateUrl: './service-items.component.html',
  styleUrls: ['./service-items.component.scss']
})
export class ServiceItemsComponent implements OnInit, AfterViewInit {
  ads: any = [];
  validateForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      service: [null, [Validators.required]]
    });
    this.getAllAds();
  }

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  getAllAds() {
    this.clientService.getAllAds().subscribe(
      res => {
        console.log("API Response:", res);
        this.ads = res;
        console.log("Processed ads array:", this.ads);
        this.initializeSwiper(); // Reinitialize Swiper after ads are loaded
      },
      error => {
        console.error('Error fetching ads:', error);
      }
    );
  }

  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }

  initializeSwiper() {
    setTimeout(() => {
      new Swiper('.mySwiper', {
        slidesPerView: 5, // Adjust based on how many items you want visible at once
        spaceBetween: 30,
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        },
      });
    }, 0);
  }
}
