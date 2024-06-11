import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrump',
  templateUrl: './breadcrump.component.html',
  styleUrls: ['./breadcrump.component.scss']
})

export class BreadcrumpComponent {
  @Input() item: BreadcrumbItem = { title: '', datas: []};
  
}

export interface BreadcrumbItem {
  title: string,
  datas: item[]
}

export interface item {
  label: string,
  route: string
}