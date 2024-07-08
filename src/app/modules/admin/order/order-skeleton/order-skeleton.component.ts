import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, CardImgDirective, CardTitleDirective, CardTextDirective, ButtonDirective, ColDirective, PlaceholderAnimationDirective, PlaceholderDirective, BgColorDirective, BadgeComponent } from '@coreui/angular';

@Component({
  selector: 'app-order-skeleton',
  standalone: true,
  imports: [RowComponent, BadgeComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, CardImgDirective, CardTitleDirective, CardTextDirective, ButtonDirective, ColDirective, RouterLink, PlaceholderAnimationDirective, PlaceholderDirective, BgColorDirective],
  templateUrl: './order-skeleton.component.html',
  styleUrl: './order-skeleton.component.scss'
})
export class OrderSkeletonComponent {

}
