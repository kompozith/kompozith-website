import { Routes } from '@angular/router';
import { OrderComponent } from '../admin/order/order.component';
import { MessageComponent } from '../admin/message/message.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { OrderDetailComponent } from '../admin/order/detail/detail.component';

// import { AdminGuard } from './shared/guard/auth.guard';

export const adminRoutes: Routes =  [
  { path: '', component: DashboardComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/:key', component: OrderDetailComponent },
  { path: 'message', component: MessageComponent },
  { path: 'user', component: MessageComponent }
];
