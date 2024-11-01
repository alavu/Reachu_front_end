import { AfterViewInit, Component } from '@angular/core';

declare var Swiper: any;
@Component({
  selector: 'app-promotional-banners',
  templateUrl: './promotional-banners.component.html',
  styleUrls: ['./promotional-banners.component.scss']
})
export class PromotionalBannersComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  initializeSwiper() {
    setTimeout(() => {
      new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 16,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }, 0);
}
}
