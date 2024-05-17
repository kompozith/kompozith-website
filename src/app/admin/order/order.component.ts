import { Component, OnInit } from '@angular/core';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, BadgeComponent } from '@coreui/angular';
import { OrderService } from '../../_services/order.service';
import { map } from 'rxjs';
import { IconDirective, IconSetService } from '@coreui/icons-angular';


@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  imports: [IconDirective, BadgeComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective],
})
export class OrderComponent implements OnInit {

  public orders:any[] = [];
  
  constructor(
    public iconSet: IconSetService,
    private orderSErvice: OrderService
  ) { }

  ngOnInit(): void {
    this.orderSErvice.list().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data: any) => {
        this.orders = data;
        console.log(data);
    })
  }

}
