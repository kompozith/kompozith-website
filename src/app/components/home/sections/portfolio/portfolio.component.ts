import { Component } from '@angular/core';
import SwiperCore, { Navigation, Pagination, SwiperOptions, Swiper, Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  config1: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    speed: 100000,
    loop: true,
    parallax: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    freeMode: true
  };
  config2: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    speed: 200000,
    loop: true,
    parallax: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      reverseDirection: true
    },
    freeMode: true
  };
  config3: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    speed: 300000,
    loop: true,
    parallax: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    freeMode: true
  };
  config4: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    speed: 50000,
    loop: true,
    parallax: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      reverseDirection: true
    },
    freeMode: true
  };

}
