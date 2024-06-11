import { Component } from '@angular/core';
import SwiperCore, { Navigation, Pagination, SwiperOptions, Swiper, Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);

// install Swiper modules
SwiperCore.use([Pagination]);
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  config: SwiperOptions = {
    slidesPerView: 1,
    breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
    },
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
