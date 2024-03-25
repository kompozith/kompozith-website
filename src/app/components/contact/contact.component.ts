import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/breadcrump/breadcrump.component';
import { IntouchService } from 'src/app/_services/intouch.service';
import { PreloadService } from 'src/app/_services/preload.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private _preloadService: PreloadService,
    private  intouchService: IntouchService
  ){
  }
  ngOnInit(): void {
    this._preloadService.preload();
    this.add();
  }
  
  add(){
    this.intouchService.create({
      email: "gillesk@gmail.com", 
      subject : "Test de contact", 
      body : "Je uis Gilles le dev", 
      name: "bmis", 
      phoneNumber : "+237695620020"
    });
  }
  
  getAll(){
    this.intouchService.list().snapshotChanges().subscribe((data: any) => {
      let students: any = [];
      data.forEach((item: any) => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        students.push(a);
      })
      console.log(students);
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