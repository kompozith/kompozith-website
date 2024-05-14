import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations()
  ]
};
