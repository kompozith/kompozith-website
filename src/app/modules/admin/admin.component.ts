import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective, IconSetService } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './shared/elements/layout';
import { navItems } from './shared/elements/layout/default-layout/_nav';
import { Title } from '@angular/platform-browser';
import { iconSubset } from './shared/elements/icons/icon-subset';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
    CommonModule,
    TranslateModule,
  ]
})
export class AdminComponent implements OnInit {

  public adminModule: boolean = true;
  public navItems = navItems;
  title = 'Kompozith Admin';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
   // private navItems: NavService,  // Inject NavService
    private translate: TranslateService  // Inject TranslateService
  ) {
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
  
  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
  
}