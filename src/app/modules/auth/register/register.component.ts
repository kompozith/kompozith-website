import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, FormModule, CardFooterComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PasswordFunctions } from '../../admin/shared/elements/password/functions';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/API/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from "../../shared/shared.module";
import { HttpResponseService } from '../../../_services/http-response.service';
import { PasswordMatch } from '../../admin/shared/elements/password/password-match';
import { ValidatorTemplateComponent } from '../../admin/shared/elements/password/validator-template/validator-template.component';
import { RecaptchaService } from '../../../_services/recaptcha.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PasswordHeleper } from '../../admin/shared/helpers/password-helper';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
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
        FormControlDirective,
        ButtonDirective,
        NgStyle,
        SharedModule,
        RouterLink,
        NgxCaptchaModule,
        ValidatorTemplateComponent
    ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  submitted: boolean = false;
  fetching: boolean = false;
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
    private router: Router
  ) {}
  
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required,Validators.minLength(this.firstNameMinLength)]],
      lastName: ['', [Validators.required,Validators.minLength(this.lastNameMinLength)]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        this.passwordHeleper.pwdPattern
      ]],
      passwordConfirm: ['', [Validators.required]],
      agreeTems: [false, [Validators.requiredTrue]],
      recaptcha: [, Validators.required]
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
      console.log(this.form.get('email')?.errors)
      return;
    }
    this.fetching = true;    
    this.authService.signUp(this.form.value)
      .then((response: any) => {
        this.form.reset();
        this._httpResponseService.response = {status: true, message: 'auth.userCreated'}; 
        this.submitted = false;
        this.fetching = false;
      })
      .catch((error: any) => {
        console.log(error)
        if(error.toString().includes('The email address is already in use by another account')) {
          this._httpResponseService.response = {status: false, message: 'errorResponse.emailAlreadyUsed'}; 
          this.form.controls['email'].setErrors({ used: true });
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
