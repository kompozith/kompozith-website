import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../_services/API/auth.service';
import { HttpResponseService } from '../../../../_services/http-response.service';
import { RecaptchaService } from '../../../../_services/recaptcha.service';
import { PasswordFunctions } from '../../../admin/shared/elements/password/functions';
import { PasswordMatch } from '../../../admin/shared/elements/password/password-match';
import { PasswordHeleper } from '../../../admin/shared/helpers/password-helper';
import { CommonModule, NgStyle } from '@angular/common';
import { FormModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, CardFooterComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ValidatorTemplateComponent } from '../../../admin/shared/elements/password/validator-template/validator-template.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-reset',
  standalone: true,
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
  providers: [PasswordFunctions,PasswordHeleper],
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormModule,
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
      NgxCaptchaModule,
      ValidatorTemplateComponent
  ]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  submitted: boolean = false;
  fetching: boolean = false;
  oobCode!: string;
  error = false;
  errorMsg = '';
  firstNameMinLength = 3;
  lastNameMinLength = 3;
  passwordMinLength = 8;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public passwordFunctions: PasswordFunctions,
    public _httpResponseService: HttpResponseService,
    public recaptchaService: RecaptchaService,
    public passwordHeleper: PasswordHeleper,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.oobCode = this.route.snapshot.queryParams['oobCode'];
  }
  
  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        this.passwordHeleper.pwdPattern
      ]],
      passwordConfirm: ['', [Validators.required]],
    }, { validator: PasswordMatch.MatchingPasswords('password', 'passwordConfirm') });
    this.form.valueChanges.subscribe(() => {
      this._httpResponseService.response = {status: false, message: ''};
    });
  }
  emailChanged() {
    delete this.form.controls['email'].errors?.['used'];
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.fetching = true;    
    this.authService.resetPassword(this.oobCode, this.form.get('password')?.value)
      .then((response: any) => {
        this.form.reset();
        this._httpResponseService.response = {status: true, message: 'auth.passwordReset'}; 
        this.submitted = false;
        this.fetching = false;
      })
      .catch((error: any) => {
        console.log(error)
        if(error.toString().includes('The action code is invalid')) { // Do not translate this
          this._httpResponseService.response = {status: false, message: 'errorResponse.invalidORExpiredResetCode'}; 
        } else
          this._httpResponseService.response = {status: false, message: 'errorResponse.unexpectedError'}; 
        this.fetching = false;
        this.error = true;
        this.submitted = false;
      });
  }
  
  ngOnDestroy(){
    this._httpResponseService.response = {status: false, message: ''};
  }
}
