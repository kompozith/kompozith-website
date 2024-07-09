import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RowComponent, BadgeComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, CardImgDirective, CardTitleDirective, CardTextDirective, ButtonDirective, ColDirective, PlaceholderAnimationDirective, PlaceholderDirective, BgColorDirective } from '@coreui/angular';

@Component({
  selector: 'app-email-verify-loader',
  standalone: true,
  imports: [RowComponent, BadgeComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, CardImgDirective, CardTitleDirective, CardTextDirective, ButtonDirective, ColDirective, RouterLink, PlaceholderAnimationDirective, PlaceholderDirective, BgColorDirective],
  templateUrl: './email-verify-loader.component.html',
  styleUrl: './email-verify-loader.component.scss'
})
export class EmailVerifyLoaderComponent {

}
