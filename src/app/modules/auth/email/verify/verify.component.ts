import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, ButtonDirective, CardFooterComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../_services/API/auth.service';
import { HttpResponseService } from '../../../../_services/http-response.service';
import { EmailVerifyLoaderComponent } from '../../../admin/shared/elements/email-verify-loader/email-verify-loader.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-verify',
  standalone: true,
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
  imports: [
    CommonModule,
    TranslateModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    ButtonDirective,
    NgStyle,
    SharedModule,
    RouterLink,
    EmailVerifyLoaderComponent,
]
})
export class EmailVerificationComponent implements OnInit, OnDestroy {

  success: boolean = false;
  fetching: boolean = true;
  errorMsg = '';

  constructor(
    private authService: AuthService,
    public _httpResponseService: HttpResponseService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    const oobCode = params['oobCode'];  
    this.authService.verifyAccount(oobCode)
      .then((response) => {
        this._httpResponseService.response = {status: true, message: 'auth.account.verified'}; 
        this.success = true;
        this.fetching = false;
      },(error: any) => {
        console.log(error)
        if(error.toString().includes('The action code is invalid')) { // Do not translate this
          this._httpResponseService.response = {status: false, message: 'errorResponse.invalidOrExpiredVerificationCode'}; 
        } else
          this._httpResponseService.response = {status: false, message: 'errorResponse.unexpectedError'}; 
        this.fetching = false;
        this.success = false;
      });
    });
  }
  
  ngOnDestroy(){
    this._httpResponseService.response = {status: false, message: ''};
  }
}
