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
    slidesPerView: 3,
    spaceBetween: 50,
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true
    },
    freeMode: true
  };

}
