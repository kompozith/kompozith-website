import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { MessageComponent } from './message/message.component';

// import { AdminGuard } from './shared/guard/auth.guard';

const routes: Routes =  [
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'message',
    component: MessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
