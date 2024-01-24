import { Component } from '@angular/core';
import SwiperCore, { Navigation, Pagination, SwiperOptions, Swiper, Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  config: SwiperOptions = {
    slidesPerView: 1,
    breakpoints: {
        768: {
          slidesPerView: 2,
        },
        // 992: {
        //   slidesPerView: 3,
        // }
    },
    spaceBetween: 50,
    speed: 500,
    loop: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: true
    },
    freeMode: true
  };

}
