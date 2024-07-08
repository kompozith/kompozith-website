import { Routes } from '@angular/router';
import { OrderComponent } from '../modules/admin/order/order.component';
import { MessageComponent } from '../modules/admin/message/message.component';
import { DashboardComponent } from '../modules/admin/dashboard/dashboard.component';
import { OrderDetailComponent } from '../modules/admin/order/detail/detail.component';

// import { AdminGuard } from './shared/guard/auth.guard';

export const adminRoutes: Routes =  [
  { path: '', component: DashboardComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/:key', component: OrderDetailComponent },
  { path: 'message', component: MessageComponent },
  { path: 'user', component: MessageComponent }
];
