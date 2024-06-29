import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PasswordFunctions } from '../../admin/shared/elements/password/functions';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../_services/API/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from "../../shared/shared.module";
import { HttpResponseService } from '../../../_services/http-response.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [PasswordFunctions],
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
      FormControlDirective, 
      ButtonDirective, 
      NgStyle, 
      SharedModule,
      RouterLink
    ]
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  submitted: boolean = false;
  fetching: boolean = false;
  error = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public passwordFunctions: PasswordFunctions,
    public _httpResponseService: HttpResponseService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
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
    this.authService.signIn(this.form.value)
      .then((response: any) => {
        this.submitted = false;
        this.fetching = false;
        this.form.reset();
        this.router.navigate(['/admin']);
      })
      .catch((error: any) => {
        console.log(error)
        if(error.toString().includes('The supplied auth credential is incorrect'))
          this._httpResponseService.response = {status: false, message: 'auth.user.invalidUserCredentials'}; 
        else
          this._httpResponseService.response = {status: false, message: 'errorresponse.unexpectedError'}; 
        this.fetching = false;
        this.error = true;
        this.submitted = false;
      });
  }
  
  ngOnDestroy(){
    this._httpResponseService.response = {status: false, message: ''};
  }
}
