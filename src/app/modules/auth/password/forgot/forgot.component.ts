import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../_services/API/auth.service';
import { HttpResponseService } from '../../../../_services/http-response.service';
import { CommonModule, NgStyle } from '@angular/common';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
    selector: 'app-forgot',
    standalone: true,
    templateUrl: './forgot.component.html',
    styleUrl: './forgot.component.scss',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        ContainerComponent,
        RowComponent,
        ColComponent,
        CardGroupComponent,
        TextColorDirective,
        CardComponent,
        CardBodyComponent,
        FormDirective,
        InputGroupComponent,
        InputGroupTextDirective,
        IconDirective,
        ButtonDirective,
        NgStyle,
        SharedModule,
        RouterLink,
    ]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  submitted: boolean = false;
  fetching: boolean = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public _httpResponseService: HttpResponseService,
  ) {}
  
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.form.valueChanges.subscribe(() => {
      this._httpResponseService.response = {status: false, message: ''};
    });
  }
  
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.fetching = true;    
    this.authService.forgotPassword(this.form.get('email')?.value)
      .then((response) => {
        this._httpResponseService.response = {status: true, message: 'auth.password.linkSent'}; 
        this.submitted = false;
        this.fetching = false;
        this.form.reset();
      },(error: any) => {
        console.log(error)
        if(error.toString().includes('Email not found in database')) // Do not translate this
          this._httpResponseService.response = {status: false, message: 'auth.user.notFound'}; 
        else
          this._httpResponseService.response = {status: false, message: 'errorresponse.unexpectedError'}; 
        this.fetching = false;
        this.submitted = false;
      });
  }
  
  ngOnDestroy(){
    this._httpResponseService.response = {status: false, message: ''};
  }
}
