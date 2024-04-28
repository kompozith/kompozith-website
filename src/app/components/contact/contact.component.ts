import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { BreadcrumbItem } from 'src/app/shared/breadcrump/breadcrump.component';
import { HttpResponseService } from 'src/app/_services/http-response.service';
import { IntouchService } from 'src/app/_services/intouch.service';
import { PreloadService } from 'src/app/_services/preload.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  submitted: boolean = false;
  contactForm!: FormGroup;
  
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
    this.contactForm.valueChanges.subscribe(changes => {
      this._httpResponseService.response = {status: false, message: ''};
    });
  }
  
  onSubmit(){
    this.submitted = true;
    if (!this.contactForm.valid) {
      return;
    }
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
      this._httpResponseService.response = {status: true, message: 'notification.contact.success'};
    }).catch((err) => {
      console.log(err);
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
  
  
  breadcrumbItems: BreadcrumbItem = {
    title: 'contact.text_0',
    datas: [
      { label: 'home.text_0', route: '/' },
      { label: 'contact.text_0', route: '/contact' },
    ]
  };

}