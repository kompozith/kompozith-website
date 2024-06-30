import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PasswordHeleper } from '../../../helpers/password-helper';
import { PasswordFunctions } from '../functions';

@Component({
  selector: 'password-validator-template',
  templateUrl: './validator-template.component.html',
  styleUrls: ['./validator-template.component.scss'],
  standalone: true,
  providers: [PasswordFunctions,PasswordHeleper],
  imports: [
    CommonModule,
    TranslateModule
  ],
})
export class ValidatorTemplateComponent implements OnInit {
  @Input() form!: FormGroup;
  
  upperCaseLength = 1;
  specialCharLength = 1;
  numberLength = 1;
  
  constructor(
    public passwordFunctions: PasswordFunctions,
    public translate: TranslateService,
    public passwordHeleper: PasswordHeleper
  ) { }

  ngOnInit(): void {
  
  }

}
