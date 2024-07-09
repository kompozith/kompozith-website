import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, ButtonDirective, CardFooterComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../_services/API/auth.service';
import { HttpResponseService } from '../../../../_services/http-response.service';
import { SharedModule } from '../../../shared/shared.module';
import { EmailVerifyLoaderComponent } from "../../../admin/shared/elements/email-verify-loader/email-verify-loader.component";

@Component({
  selector: 'app-link',
  standalone: true,
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  imports: [
    CommonModule,
    TranslateModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardFooterComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    ButtonDirective,
    NgStyle,
    SharedModule,
    RouterLink,
    EmailVerifyLoaderComponent
]
})
export class EmailLinkComponent implements OnInit, OnDestroy {

  success: boolean = false;
  fetching: boolean = false;
  errorMsg = '';

  constructor(
    private authService: AuthService,
    public _httpResponseService: HttpResponseService,
  ) {}
  
  ngOnInit() {
  
  }
  
  submit() {
    this.fetching = true;    
    this.authService.verificationLink()
      .then((response) => {
        this._httpResponseService.response = {status: true, message: 'auth.verification.linkSent'}; 
        this.success = true;
        this.fetching = false;
      },(error: any) => {
        console.log(error)
        if(error.toString().includes('Email not found in database')) // Do not translate this
          this._httpResponseService.response = {status: false, message: 'auth.user.notFound'}; 
        else
          this._httpResponseService.response = {status: false, message: 'errorresponse.unexpectedError'}; 
        this.fetching = false;
        this.success = false;
      });
  }
  
  ngOnDestroy(){
    this._httpResponseService.response = {status: false, message: ''};
  }
}
