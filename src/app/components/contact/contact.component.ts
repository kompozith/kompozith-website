import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { BreadcrumbItem } from '../../shared/breadcrump/breadcrump.component';
import { HttpResponseService } from '../../_services/http-response.service';
import { IntouchService } from '../../_services/intouch.service';
import { PreloadService } from '../../_services/preload.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  
  submitted: boolean = false;
  contactForm!: FormGroup;
  public loading: boolean = false;
  
  constructor(
    private _preloadService: PreloadService,
    private  intouchService: IntouchService,
    private fb: FormBuilder,
    public _httpResponseService: HttpResponseService,
  ){
  }
  ngOnInit(): void {
    this._preloadService.preload();
    this.contactForm = this.fb.group({
      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      body:['', [Validators.required, Validators.minLength]],
      phoneNumber:[''],
      subject:[''],
    });
    this.contactForm.valueChanges.subscribe(() => {
      this._httpResponseService.response = {status: false, message: ''};
    });
  }
  
  onSubmit(){
    this.submitted = true;
    if (!this.contactForm.valid) {
      return;
    }
    this.loading = true;
    this.intouchService.create({
      subject : this.contactForm.value.subject, 
      body : this.contactForm.value.body, 
      author: {
        email: this.contactForm.value.email, 
        name: this.contactForm.value.name, 
        phoneNumber : this.contactForm.value.phoneNumber
      }
    }).then(() => {
      this.submitted = false;
      this.contactForm.reset();
      this.loading = false;
      this._httpResponseService.response = {status: true, message: 'notification.contact.success'};
    }).catch((err: any) => {
      console.log(err);
      this.loading = false;
      this._httpResponseService.response = {status: false, message: 'notification.contact.error'};
    }) 
  }
  
  getAll(){
    this.intouchService.list().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((messages: any) => {
      console.log(messages);
    })
  }
  
  ngOnDestroy(){
    this.loading = false;
    this._httpResponseService.response = {status: false, message: ''};
  }
  
  breadcrumbItems: BreadcrumbItem = {
    title: 'contact.text_0',
    datas: [
      { label: 'home.text_0', route: '/' },
      { label: 'contact.text_0', route: '/contact' },
    ]
  };

}