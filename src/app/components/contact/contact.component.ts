import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { BreadcrumbItem } from 'src/app/shared/breadcrump/breadcrump.component';
import { IntouchService } from 'src/app/_services/intouch.service';
import { PreloadService } from 'src/app/_services/preload.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  public submitted: boolean = false;
  contactForm!: FormGroup;
  constructor(
    private _preloadService: PreloadService,
    private  intouchService: IntouchService,
    private fb: FormBuilder,
    private toastr: ToastrService
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
      this.toastr.success('Success', 'Message sent!');
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